const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image optimization configurations
const CONFIGS = {
  webp: {
    quality: 80,
    format: 'webp'
  },
  avif: {
    quality: 70,
    format: 'avif'
  },
  jpeg: {
    quality: 85,
    format: 'jpeg'
  }
};

// Responsive breakpoints
const BREAKPOINTS = [
  { width: 640, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1280, suffix: '-xl' },
  { width: 1920, suffix: '-2xl' }
];

async function optimizeImage(inputPath, outputDir, filename) {
  const baseName = path.parse(filename).name;
  const extension = path.parse(filename).ext;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generate responsive images
    for (const breakpoint of BREAKPOINTS) {
      if (metadata.width <= breakpoint.width) continue;

      // WebP format
      await image
        .resize(breakpoint.width)
        .webp({ quality: CONFIGS.webp.quality })
        .toFile(path.join(outputDir, `${baseName}${breakpoint.suffix}.webp`));

      // AVIF format (modern browsers)
      await image
        .resize(breakpoint.width)
        .avif({ quality: CONFIGS.avif.quality })
        .toFile(path.join(outputDir, `${baseName}${breakpoint.suffix}.avif`));
    }

    // Generate original size optimized versions
    await image
      .webp({ quality: CONFIGS.webp.quality })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    await image
      .avif({ quality: CONFIGS.avif.quality })
      .toFile(path.join(outputDir, `${baseName}.avif`));

  } catch (error) {
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(PUBLIC_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );


  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    await optimizeImage(inputPath, OUTPUT_DIR, file);
  }

}

// Run optimization
optimizeAllImages().catch(error => {
  // Handle error silently
});
