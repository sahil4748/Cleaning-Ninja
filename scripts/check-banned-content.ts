#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Cleaning Ninja — Banned-content scanner
 *
 * Scans app/, components/, content/, lib/ for content that violates the
 * blueprint (placeholder phones, fake addresses, unsupported claims, fake
 * urgency, discount-led copy, US-only English, etc.).
 *
 * Phase 1 behaviour: warn only. Exits 0 regardless of findings.
 * Phase 8: this script is promoted to a hard build failure.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'content', 'lib']
const FILE_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx', '.css']
const IGNORE_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  'out',
  '.turbo',
  '.vercel',
])

type Severity = 'critical' | 'high' | 'medium'

interface Rule {
  pattern: RegExp
  label: string
  severity: Severity
}

const RULES: Rule[] = [
  // Phone placeholders
  { pattern: /1300\s?000\s?123/g, label: 'Placeholder phone "1300 000 123"', severity: 'critical' },
  { pattern: /1800[-\s]?NINJA/gi, label: 'Placeholder phone "1800-NINJA"', severity: 'critical' },
  { pattern: /tel:180064652/g, label: 'Placeholder phone link "tel:180064652"', severity: 'critical' },
  { pattern: /tel:1300000123/g, label: 'Placeholder phone link "tel:1300000123"', severity: 'critical' },

  // Address placeholders
  { pattern: /123\s?Clean\s?Street/gi, label: 'Placeholder address "123 Clean Street"', severity: 'critical' },
  { pattern: /Sydney\s+NSW\s+2000/gi, label: 'Possibly placeholder address "Sydney NSW 2000"', severity: 'high' },

  // Outdated dates
  { pattern: /©\s?2024/g, label: 'Outdated copyright "© 2024"', severity: 'high' },

  // Unsupported customer-count claims
  { pattern: /5,?000\+?\s*Happy\s*Families/gi, label: 'Unsupported claim "5,000+ Happy Families"', severity: 'critical' },
  { pattern: /5,?000\+?\s*Families/gi, label: 'Unsupported claim "5,000+ Families"', severity: 'critical' },
  { pattern: /Trusted\s+by\s+5,?000/gi, label: 'Unsupported claim "Trusted by 5,000+"', severity: 'high' },
  { pattern: /500\+?\s+reviews/gi, label: 'Unsupported claim "500+ reviews"', severity: 'high' },
  { pattern: /4\.9\/5\s+from\s+500/gi, label: 'Unsupported rating "4.9/5 from 500"', severity: 'high' },
  { pattern: /Rated\s+4\.[0-9]\/5/gi, label: 'Unsupported aggregate rating claim', severity: 'high' },

  // Fabricated credentials and over-claims
  { pattern: /REA[-\s]?approved/gi, label: 'Misleading credential "REA-approved"', severity: 'high' },
  { pattern: /hospital[-\s]?grade/gi, label: 'Empty claim "hospital-grade"', severity: 'high' },
  { pattern: /military[-\s]?grade/gi, label: 'Empty claim "military-grade"', severity: 'medium' },
  { pattern: /industrial[-\s]?strength/gi, label: 'Empty claim "industrial-strength"', severity: 'medium' },
  { pattern: /Fully\s+Insured/g, label: '"Fully Insured" stated as fact (requires policy)', severity: 'medium' },
  { pattern: /Bond[-\s]?Back\s+Guarantee/gi, label: '"Bond-Back Guarantee" — requires written terms', severity: 'medium' },
  { pattern: /Award[-\s]?winning/gi, label: '"Award-winning" (only if real)', severity: 'medium' },
  { pattern: /world[-\s]?class/gi, label: 'Empty intensifier "world-class"', severity: 'medium' },
  { pattern: /cutting[-\s]?edge/gi, label: 'Empty intensifier "cutting-edge"', severity: 'medium' },
  { pattern: /state[-\s]?of[-\s]?the[-\s]?art/gi, label: 'Empty intensifier "state-of-the-art"', severity: 'medium' },

  // Discount-led and fake urgency
  { pattern: /\$\s?50\s?Off/gi, label: 'Discount-led copy "$50 Off"', severity: 'high' },
  { pattern: /Limited\s+Slots\s+This\s+Week/gi, label: 'Fake urgency "Limited Slots This Week"', severity: 'high' },
  { pattern: /Only\s+\d+\s+(spots|slots|left)/gi, label: 'Fake urgency "Only N left"', severity: 'high' },
  { pattern: /Hurry[!,.]/gi, label: 'Pressure copy "Hurry"', severity: 'medium' },
  { pattern: /Today\s+only/gi, label: 'Fake urgency "Today only"', severity: 'medium' },

  // Placeholders
  { pattern: /Coming\s+Soon/gi, label: 'Placeholder content "Coming Soon"', severity: 'medium' },
  { pattern: /Lorem\s+ipsum/gi, label: 'Placeholder "Lorem ipsum"', severity: 'medium' },
  { pattern: /\bTODO\b/g, label: '"TODO" left in production code', severity: 'medium' },
  { pattern: /\bFIXME\b/g, label: '"FIXME" left in production code', severity: 'medium' },

  // AU brand voice — slang in editorial copy (acceptable inside real reviews only)
  { pattern: /\bfair\s+dinkum\b/gi, label: 'Slang in brand voice "fair dinkum"', severity: 'medium' },
  { pattern: /\bno\s+dramas\b/gi, label: 'Slang in brand voice "no dramas"', severity: 'medium' },

  // US English — Cleaning Ninja is AU English.
  // Lookbehind/lookahead excludes CSS-variable, Tailwind-utility, and CSS-property
  // contexts (e.g. --color-ink, transition-colors, color:, scroll-behavior, optimizeLegibility).
  { pattern: /(?<![\w-])odors?\b/g, label: 'US English "odor(s)" — use "odour(s)"', severity: 'medium' },
  { pattern: /(?<![\w-])colors?(?![\w\-:])/g, label: 'US English "color(s)" — use "colour(s)"', severity: 'medium' },
  { pattern: /(?<![\w-])colored\b/g, label: 'US English "colored" — use "coloured"', severity: 'medium' },
  { pattern: /(?<![\w-])coloring\b/g, label: 'US English "coloring" — use "colouring"', severity: 'medium' },
  { pattern: /(?<![\w-])favorite[ds]?\b/g, label: 'US English "favorite" — use "favourite"', severity: 'medium' },
  { pattern: /(?<![\w-])organize[ds]?\b/g, label: 'US English "organize/d" — use "organise/d"', severity: 'medium' },
  { pattern: /(?<![\w-])organizing\b/g, label: 'US English "organizing" — use "organising"', severity: 'medium' },
  { pattern: /(?<![\w-])organization[s]?\b/g, label: 'US English "organization(s)" — use "organisation(s)"', severity: 'medium' },
  { pattern: /(?<![\w-])optimize[ds]?\b/g, label: 'US English "optimize/d" — use "optimise/d"', severity: 'medium' },
  { pattern: /(?<![\w-])optimizing\b/g, label: 'US English "optimizing" — use "optimising"', severity: 'medium' },
  { pattern: /(?<![\w-])optimization\b/g, label: 'US English "optimization" — use "optimisation"', severity: 'medium' },
  { pattern: /(?<![\w-])behavior(?![\w\-:])/g, label: 'US English "behavior" — use "behaviour"', severity: 'medium' },
  { pattern: /(?<![\w-])behaviors\b/g, label: 'US English "behaviors" — use "behaviours"', severity: 'medium' },

  // Hot-linked image hosts (blueprint requires first-party only post-launch)
  { pattern: /images\.unsplash\.com/g, label: 'Hot-linked Unsplash image (replace pre-launch)', severity: 'medium' },
  { pattern: /media\.giphy\.com/g, label: 'Hot-linked Giphy asset (replace pre-launch)', severity: 'medium' },
  { pattern: /i\.pravatar\.cc/g, label: 'Random-face avatar service (banned)', severity: 'high' },
]

interface Hit {
  rule: Rule
  line: number
  text: string
}

// ---- ANSI helpers ----
const isTty = process.stdout.isTTY === true
const c = (code: string, s: string) => (isTty ? `\x1b[${code}m${s}\x1b[0m` : s)
const red = (s: string) => c('31', s)
const yellow = (s: string) => c('33', s)
const dim = (s: string) => c('2', s)
const bold = (s: string) => c('1', s)
const cyan = (s: string) => c('36', s)

// ---- File walk ----
function walk(dir: string, acc: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return acc
  }
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry)) continue
    const full = join(dir, entry)
    let s
    try {
      s = statSync(full)
    } catch {
      continue
    }
    if (s.isDirectory()) {
      walk(full, acc)
    } else if (FILE_EXTS.some((e) => full.endsWith(e))) {
      acc.push(full)
    }
  }
  return acc
}

function shouldSkipFile(file: string): boolean {
  // The scanner itself contains every banned string by definition.
  if (file.includes('check-banned-content')) return true
  // The blueprint and supersession marker document the rules themselves.
  if (file.endsWith('BRAND_BLUEPRINT.md')) return true
  if (file.endsWith('00-SUPERSEDED.md')) return true
  return false
}

// ---- Scan ----
const allFiles = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)))
const fileHits = new Map<string, Hit[]>()
let totalHits = 0
let criticalHits = 0
let highHits = 0
let mediumHits = 0

for (const file of allFiles) {
  if (shouldSkipFile(file)) continue

  let content: string
  try {
    content = readFileSync(file, 'utf8')
  } catch {
    continue
  }
  const lines = content.split(/\r?\n/)
  const hits: Hit[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const rule of RULES) {
      // Reset lastIndex for the global flag on each test.
      rule.pattern.lastIndex = 0
      if (rule.pattern.test(line)) {
        hits.push({ rule, line: i + 1, text: line.trim().slice(0, 140) })
        if (rule.severity === 'critical') criticalHits++
        else if (rule.severity === 'high') highHits++
        else mediumHits++
        totalHits++
      }
      rule.pattern.lastIndex = 0
    }
  }

  if (hits.length) {
    fileHits.set(file, hits)
  }
}

// ---- Output ----
console.log()
console.log(bold('Cleaning Ninja — banned-content scanner'))
console.log(dim('Phase 1 mode: warn only. Will fail the build in Phase 8.'))
console.log()

if (totalHits === 0) {
  console.log(cyan('No banned content detected.'))
  console.log()
  process.exit(0)
}

const sortedFiles = Array.from(fileHits.keys()).sort()
for (const file of sortedFiles) {
  const rel = relative(ROOT, file).replaceAll('\\', '/')
  const hits = fileHits.get(file)!
  console.log(bold(rel))
  for (const h of hits) {
    const sevLabel = `[${h.rule.severity}]`
    const tag =
      h.rule.severity === 'critical'
        ? red(sevLabel)
        : h.rule.severity === 'high'
          ? yellow(sevLabel)
          : dim(sevLabel)
    console.log(`  ${tag} line ${h.line} — ${h.rule.label}`)
    console.log(dim(`        > ${h.text}`))
  }
  console.log()
}

console.log(
  dim(
    `Total: ${totalHits} occurrence(s) across ${fileHits.size} file(s). ` +
      `(${criticalHits} critical, ${highHits} high, ${mediumHits} medium)`,
  ),
)
console.log(dim('Phase 1: warning only — build will not fail.'))
console.log()

// Phase 1: always exit 0.
process.exit(0)
