import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const mediaSrcDir = path.join(root, 'media');
const mediaDistDir = path.join(distDir, 'media');

const htmlOrder = [
  '01-header.html',
  '02-hero.html',
  '02-badges.html',
  '08-trust.html',
  '03-courses.html',
  '09-start.html',
  '05-membership.html',
  '06-projects.html',
  '03-benefits.html',
  '07-stats.html',
  '04-teachers.html',
  '04-reviews.html',
  '05-faq.html',
  '10-contact.html',
  '11-footer.html',
];

const scratchHtmlOrder = [
  '12-scratch-header.html',
  '12-scratch-hero.html',
  '12-scratch-plan.html',
  '12-scratch-why.html',
  '12-scratch-softskills.html',
  '12-scratch-projects.html',
  '05-membership.html',
  '09-start.html',
  '03-benefits.html',
  '08-trust.html',
  '04-teachers.html',
  '04-reviews.html',
  '05-faq.html',
  '10-contact.html',
  '12-scratch-footer.html',
];

const compHtmlOrder = [
  '13-comp-header.html',
  '13-comp-hero.html',
  '13-comp-plan.html',
  '13-comp-why.html',
  '13-comp-softskills.html',
  '13-comp-projects.html',
  '05-membership.html',
  '09-start.html',
  '03-benefits.html',
  '08-trust.html',
  '04-teachers.html',
  '04-reviews.html',
  '05-faq.html',
  '10-contact.html',
  '12-scratch-footer.html',
];

const unityHtmlOrder = [
  '14-unity-header.html',
  '14-unity-hero.html',
  '14-unity-plan.html',
  '14-unity-why.html',
  '14-unity-softskills.html',
  '14-unity-projects.html',
  '05-membership.html',
  '09-start.html',
  '03-benefits.html',
  '08-trust.html',
  '04-teachers.html',
  '04-reviews.html',
  '05-faq.html',
  '10-contact.html',
  '12-scratch-footer.html',
];

// This keeps the original cascade and script execution order from the old file.
const assetOrder = [
  '10-contact',
  '11-footer',
  '05-faq',
  '08-trust',
  '07-stats',
  '06-projects',
  '09-start',
  '04-teachers',
  '04-reviews',
  '05-membership',
  '03-courses',
  '03-benefits',
  '02-badges',
  '02-hero',
  '01-header',
];

const scratchAssetOrder = [
  ...assetOrder,
  '12-scratch',
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8').trim();
}

function withSourceComment(type, file, content) {
  return '/* ' + type + ': ' + file + ' */\n' + content;
}

function buildBlocks(order) {
  return order
    .map((file) => '<!-- block: ' + file + ' -->\n' + read('src/blocks/' + file))
    .join('\n\n');
}

function buildCss(order) {
  return order
    .map((name) => withSourceComment('css', name + '.css', read('src/css/' + name + '.css')))
    .join('\n\n');
}

function buildJs(order) {
  return order
    .map((name) => withSourceComment('js', name + '.js', read('src/js/' + name + '.js')))
    .join('\n\n');
}

const heroPreload = '  <link rel="preload" as="image" href="media/hero3.png" fetchpriority="high">\n';
const scratchPreload = '  <link rel="preload" as="image" href="media/course_page/scratch/4.webp" fetchpriority="high">\n';
const compPreload = '  <link rel="preload" as="image" href="media/course_page/comp_gram/4.jpg" fetchpriority="high">\n';
const unityPreload = '  <link rel="preload" as="image" href="media/hero3.png" fetchpriority="high">\n';
const fontPreloads =
  '  <link rel="preload" as="font" type="font/woff2" href="media/fonts/inter-cyrillic.woff2" crossorigin>\n' +
  '  <link rel="preload" as="font" type="font/woff2" href="media/fonts/inter-latin.woff2" crossorigin>\n' +
  '  <link rel="preload" as="font" type="font/woff2" href="media/fonts/montserrat-cyrillic.woff2" crossorigin>\n' +
  '  <link rel="preload" as="font" type="font/woff2" href="media/fonts/montserrat-latin.woff2" crossorigin>\n';
const fontHeadLinks =
  fontPreloads;
const fontFaceCss =
  '@font-face{font-family:"Inter";font-style:normal;font-weight:400 900;font-display:optional;src:url("media/fonts/inter-cyrillic.woff2") format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;}\n' +
  '@font-face{font-family:"Inter";font-style:normal;font-weight:400 900;font-display:optional;src:url("media/fonts/inter-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}\n' +
  '@font-face{font-family:"Montserrat";font-style:normal;font-weight:700 900;font-display:optional;src:url("media/fonts/montserrat-cyrillic.woff2") format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;}\n' +
  '@font-face{font-family:"Montserrat";font-style:normal;font-weight:700 900;font-display:optional;src:url("media/fonts/montserrat-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}\n\n';

function buildPreview({ title, preload, bodyClass, blocks, css, js }) {
  const bodyAttr = bodyClass ? ' class="' + bodyClass + '"' : '';
  return '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + title + '</title>\n' + preload + fontHeadLinks + '  <style>\n    body { margin: 0; }\n' + fontFaceCss + css + '\n  </style>\n</head>\n<body' + bodyAttr + '>\n' + blocks + '\n\n<script>\n' + js + '\n</script>\n</body>\n</html>\n';
}

const blocks = buildBlocks(htmlOrder);
const css = buildCss(assetOrder);
const js = buildJs(assetOrder);
const scratchBlocks = buildBlocks(scratchHtmlOrder);
const scratchCss = buildCss(scratchAssetOrder);
const scratchJs = buildJs(scratchAssetOrder);
const compBlocks = buildBlocks(compHtmlOrder);
const compCss = buildCss(scratchAssetOrder);
const compJs = buildJs(scratchAssetOrder);
const unityBlocks = buildBlocks(unityHtmlOrder);
const unityCss = buildCss(scratchAssetOrder);
const unityJs = buildJs(scratchAssetOrder);

const tilda = '<style>\n' + fontFaceCss + css + '\n</style>\n\n' + blocks + '\n\n<script>\n' + js + '\n</script>\n';
const preview = buildPreview({
  title: '\u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: heroPreload,
  bodyClass: '',
  blocks,
  css,
  js,
});
const scratchPreview = buildPreview({
  title: 'Scratch \u0434\u043b\u044f \u0434\u0435\u0442\u0435\u0439 | \u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: scratchPreload,
  bodyClass: 'ku-page ku-page--scratch',
  blocks: scratchBlocks,
  css: scratchCss,
  js: scratchJs,
});
const compPreview = buildPreview({
  title: '\u041a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440\u043d\u0430\u044f \u0433\u0440\u0430\u043c\u043e\u0442\u043d\u043e\u0441\u0442\u044c \u0434\u043b\u044f \u0434\u0435\u0442\u0435\u0439 | \u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: compPreload,
  bodyClass: 'ku-page ku-page--comp',
  blocks: compBlocks,
  css: compCss,
  js: compJs,
});
const unityPreview = buildPreview({
  title: 'Unity \u0434\u043b\u044f \u0434\u0435\u0442\u0435\u0439 | \u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: unityPreload,
  bodyClass: 'ku-page ku-page--unity',
  blocks: unityBlocks,
  css: unityCss,
  js: unityJs,
});

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'tilda.html'), tilda, 'utf8');
fs.writeFileSync(path.join(distDir, 'preview.html'), preview, 'utf8');
fs.writeFileSync(path.join(distDir, 'scratch.html'), scratchPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'comp_gram.html'), compPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'unity.html'), unityPreview, 'utf8');
fs.writeFileSync(path.join(root, 'index.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + preview, 'utf8');
fs.writeFileSync(path.join(root, 'scratch.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + scratchPreview, 'utf8');
fs.writeFileSync(path.join(root, 'comp_gram.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + compPreview, 'utf8');
fs.writeFileSync(path.join(root, 'unity.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + unityPreview, 'utf8');

// Keep local previews in dist working with relative media paths.
if (fs.existsSync(mediaSrcDir)) {
  fs.mkdirSync(mediaDistDir, { recursive: true });
  fs.cpSync(mediaSrcDir, mediaDistDir, { recursive: true });
}

console.log('Built dist/tilda.html, dist/preview.html, dist/scratch.html, dist/comp_gram.html, dist/unity.html, index.html, scratch.html, comp_gram.html, and unity.html');
