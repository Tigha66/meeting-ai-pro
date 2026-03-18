const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const inputSvg = path.join(__dirname, 'icons', 'icon.svg');
const outputDir = path.join(__dirname, 'icons');

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated icon-${size}x${size}.png`);
  }
  
  // Generate badge icon
  await sharp(inputSvg)
    .resize(72, 72)
    .png()
    .toFile(path.join(outputDir, 'badge-72x72.png'));
  console.log('✓ Generated badge-72x72.png');
  
  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
