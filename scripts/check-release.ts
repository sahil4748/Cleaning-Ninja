import readiness from '../content/release-readiness.json'

const releaseAttempt = process.env.VERCEL_ENV === 'production' || process.argv.includes('--release')
if (releaseAttempt && (readiness.status !== 'APPROVED' || readiness.blockers.length > 0)) {
  console.error('Production release blocked: ' + readiness.blockers.join('; '))
  process.exitCode = 1
} else {
  console.log('Readiness check: preview only; production release remains blocked.')
}
