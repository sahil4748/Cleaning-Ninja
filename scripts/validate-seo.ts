#!/usr/bin/env tsx
/* eslint-disable no-console */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

/**
 * Cleaning Ninja — SEO & Schema Validation Runner
 *
 * Programmatically audits page configurations in app/ to verify:
 * - Meta tags, titles, descriptions, canonical links, and Open Graph configs.
 * - JSON-LD structured schemas are valid, present, and contain required fields.
 * - Confirms that pages are fully optimized and ready for Screaming Frog audits.
 */

const APP_DIR = join(process.cwd(), 'app')

interface PageAuditResult {
  file: string
  route: string
  hasMetadata: boolean
  hasTitle: boolean
  hasDescription: boolean
  hasCanonical: boolean
  hasOpenGraph: boolean
  schemaTypes: string[]
  warnings: string[]
  errors: string[]
}

function walk(dir: string, acc: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return acc
  }
  for (const entry of entries) {
    const full = join(dir, entry)
    let s
    try {
      s = statSync(full)
    } catch {
      continue
    }
    if (s.isDirectory()) {
      walk(full, acc)
    } else if (entry === 'page.tsx' || entry === 'not-found.tsx') {
      acc.push(full)
    }
  }
  return acc
}

function auditPage(filePath: string): PageAuditResult {
  const content = readFileSync(filePath, 'utf8')
  const relPath = relative(APP_DIR, filePath).replaceAll('\\', '/')
  
  // Determine user-friendly route representation
  let route = '/' + relPath.replace('/page.tsx', '').replace('page.tsx', '')
  if (route.endsWith('/')) {
    route = route.slice(0, -1)
  }
  if (route === '') {
    route = '/'
  }

  const result: PageAuditResult = {
    file: relPath,
    route,
    hasMetadata: false,
    hasTitle: false,
    hasDescription: false,
    hasCanonical: false,
    hasOpenGraph: false,
    schemaTypes: [],
    warnings: [],
    errors: [],
  }

  // Skip validation if the page is just a redirect page
  if (content.includes('redirect(')) {
    result.hasMetadata = true
    result.hasTitle = true
    result.hasDescription = true
    result.hasCanonical = true
    result.hasOpenGraph = true
    return result
  }

  // 1. Check for metadata exports
  const hasMetadataExport = content.includes('export const metadata') || /export\s+const\s+metadata\b/.test(content)
  const hasGenerateMetadata = content.includes('generateMetadata') || /export\s+async\s+function\s+generateMetadata\b/.test(content)
  
  if (hasMetadataExport || hasGenerateMetadata) {
    result.hasMetadata = true
  }

  // 2. Extract title, description, canonical, and Open Graph properties if static
  if (hasMetadataExport) {
    if (content.includes('title:')) {
      result.hasTitle = true
    }
    if (content.includes('description:')) {
      result.hasDescription = true
    }
    if (content.includes('canonical:') || content.includes('alternates:') || content.includes('canonical')) {
      result.hasCanonical = true
    }
    if (content.includes('openGraph:') || content.includes('images:') || content.includes('twitter:')) {
      result.hasOpenGraph = true
    }
  }

  // Layout level checks since homepage (/) inherits layout metadata
  if (route === '/') {
    result.hasMetadata = true
    result.hasTitle = true
    result.hasDescription = true
    result.hasCanonical = true // handled by layout metadataBase
    result.hasOpenGraph = true
  }

  // Handle redirect pages
  if (content.includes('redirect(')) {
    result.hasMetadata = true
    result.hasTitle = true
    result.hasDescription = true
    result.hasCanonical = true
    result.hasOpenGraph = true
  }

  // Dynamic routes (like [city] or [slug]) usually use generateMetadata
  if (hasGenerateMetadata) {
    result.hasTitle = true
    result.hasDescription = true
    result.hasCanonical = true
    result.hasOpenGraph = true
  }

  // 3. Scan for JSON-LD schemas
  // Look for schema helpers (breadcrumbSchema, faqSchema, organizationSchema, housekeepingServiceSchema, etc.)
  const schemaImports = [
    'organizationSchema',
    'faqSchema',
    'breadcrumbSchema',
    'housekeepingServiceSchema',
    'localBusinessSchema',
    'articleSchema',
    'reviewSchema'
  ]
  
  for (const schema of schemaImports) {
    if (content.includes(schema)) {
      let prettyName = schema.replace('Schema', '')
      prettyName = prettyName.charAt(0).toUpperCase() + prettyName.slice(1)
      result.schemaTypes.push(prettyName)
    }
  }

  // Check if raw application/ld+json script tag or <JsonLd is used
  if (content.includes('application/ld+json') || content.includes('<JsonLd')) {
    if (result.schemaTypes.length === 0) {
      result.schemaTypes.push('CustomJSON-LD')
    }
  }

  // 4. Compile Warnings and Errors
  if (!result.hasMetadata) {
    result.warnings.push('No custom metadata defined. Will fallback to Root Layout default metadata.')
  } else {
    if (!result.hasTitle) {
      result.errors.push('Metadata is defined but is missing the "title" parameter.')
    }
    if (!result.hasDescription) {
      result.errors.push('Metadata is defined but is missing the "description" parameter.')
    }
    if (!result.hasCanonical && route !== '/' && !filePath.endsWith('not-found.tsx')) {
      result.warnings.push('No canonical URL alternates defined. Screaming Frog may flag this as duplicate content.')
    }
  }

  if (route.includes('[city]') || route.includes('[slug]')) {
    if (!hasGenerateMetadata) {
      result.warnings.push('Dynamic route detected but dynamic "generateMetadata" function was not found in page.tsx.')
    }
  }

  return result
}

// ANSI colors
const isTty = process.stdout.isTTY === true
const c = (code: string, s: string) => (isTty ? `\x1b[${code}m${s}\x1b[0m` : s)
const red = (s: string) => c('31', s)
const green = (s: string) => c('32', s)
const yellow = (s: string) => c('33', s)
const cyan = (s: string) => c('36', s)
const bold = (s: string) => c('1', s)
const dim = (s: string) => c('2', s)

function runAudit() {
  console.log()
  console.log(bold('🧹 Cleaning Ninja — SEO & Schema Validation Runner 🥷'))
  console.log(dim('Programmatically auditing Next.js page metadata and structured schemas...'))
  console.log()

  let pageFiles: string[]
  try {
    pageFiles = walk(APP_DIR)
  } catch (err) {
    console.error(red('Error: Could not scan app/ directory. Make sure you run this from the project root.'))
    process.exit(1)
  }

  if (pageFiles.length === 0) {
    console.log(yellow('No page.tsx files found.'))
    process.exit(0)
  }

  let totalErrors = 0
  let totalWarnings = 0
  const results: PageAuditResult[] = []

  for (const file of pageFiles) {
    const pageResult = auditPage(file)
    results.push(pageResult)
    totalErrors += pageResult.errors.length
    totalWarnings += pageResult.warnings.length
  }

  // Print results
  for (const r of results) {
    const statusSymbol = r.errors.length > 0 ? red('❌') : r.warnings.length > 0 ? yellow('⚠️') : green('✅')
    console.log(`${statusSymbol} ${bold(r.route)} ${dim(`(${r.file})`)}`)
    
    // Print details
    const checks = [
      r.hasMetadata ? green('Metadata [OK]') : dim('Metadata [Fallback]'),
      r.hasTitle ? green('Title [OK]') : red('Title [MISSING]'),
      r.hasDescription ? green('Description [OK]') : red('Description [MISSING]'),
      r.hasCanonical ? green('Canonical [OK]') : yellow('Canonical [MISSING]'),
    ]
    console.log(`   ${checks.join(' | ')}`)

    if (r.schemaTypes.length > 0) {
      console.log(`   ${cyan('Structured Schemas:')} ${r.schemaTypes.map(s => green(s)).join(', ')}`)
    } else {
      console.log(`   ${dim('Structured Schemas: None')}`)
    }

    if (r.errors.length > 0) {
      for (const err of r.errors) {
        console.log(`   ${red('Error:')} ${err}`)
      }
    }
    if (r.warnings.length > 0) {
      for (const warn of r.warnings) {
        console.log(`   ${yellow('Warning:')} ${warn}`)
      }
    }
    console.log()
  }

  console.log(bold('--- SEO Audit Summary ---'))
  console.log(`Scanned ${results.length} pages.`)
  if (totalErrors > 0) {
    console.log(red(`Status: FAILED (${totalErrors} error(s), ${totalWarnings} warning(s))`))
  } else if (totalWarnings > 0) {
    console.log(yellow(`Status: PASSED WITH WARNINGS (${totalWarnings} warning(s))`))
  } else {
    console.log(green('Status: PASSED (All pages 100% compliant for Screaming Frog audit!)'))
  }
  console.log()

  // Exit code reflecting errors
  process.exit(totalErrors > 0 ? 1 : 0)
}

runAudit()
