import sharp from 'sharp'

const src = 'public/logo.png'
const meta = await sharp(src).metadata()

// Sample the corner colour so derived canvases blend with the logo's own bg.
const { data } = await sharp(src).extract({ left: 0, top: 0, width: 6, height: 6 }).raw().toBuffer({ resolveWithObject: true })
const bg = { r: data[0], g: data[1], b: data[2] }
console.log('logo', meta.width + 'x' + meta.height, 'cornerBG', bg)

// 1) Mascot only — crop off the bottom "CLEANING NINJA" wordmark, then trim the
//    cream border tight. Used in the header/footer where the full wordmark would
//    be illegible. ~top 64% holds the ninja + extraction wand.
const topBuf = await sharp(src)
  .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.64) })
  .png()
  .toBuffer()
const markBuf = await sharp(topBuf)
  .trim({ background: bg, threshold: 12 })
  .png()
  .toBuffer()
// Downscale to a sane delivery size (header ~36px, loader ~96px; 480w covers @2x).
// Large 2048px sources make the dev image optimizer hang, so we ship small.
await sharp(markBuf).resize({ width: 480 }).png().toFile('public/logo-mark.png')

// Full logo lockup for the footer, delivery-sized.
await sharp(src).resize({ width: 640 }).png().toFile('public/logo-wordmark.png')

// 2) OG / Twitter share image — full logo centred on a 1200x630 cream canvas.
const logoForOg = await sharp(src).resize(540, 540, { fit: 'inside' }).png().toBuffer()
await sharp({ create: { width: 1200, height: 630, channels: 3, background: bg } })
  .composite([{ input: logoForOg, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png')

// 3) Favicon + Apple touch icon.
await sharp(src).resize(256, 256, { fit: 'contain', background: bg }).png().toFile('public/favicon.png')
await sharp(src).resize(180, 180, { fit: 'contain', background: bg }).png().toFile('public/apple-touch-icon.png')

const m2 = await sharp('public/logo-mark.png').metadata()
console.log('logo-mark', m2.width + 'x' + m2.height)
console.log('generated: logo-mark.png, og-image.png, favicon.png, apple-touch-icon.png')
