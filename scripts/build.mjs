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
  '29-course-more.html',
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
  '29-course-more.html',
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
  '29-course-more.html',
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

const robloxHtmlOrder = [
  '15-roblox-header.html',
  '15-roblox-hero.html',
  '15-roblox-plan.html',
  '15-roblox-why.html',
  '15-roblox-softskills.html',
  '15-roblox-projects.html',
  '29-course-more.html',
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

const scratchJrHtmlOrder = [
  '16-scratchjr-header.html',
  '16-scratchjr-hero.html',
  '16-scratchjr-plan.html',
  '16-scratchjr-why.html',
  '16-scratchjr-softskills.html',
  '16-scratchjr-projects.html',
  '29-course-more.html',
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

const blockbenchHtmlOrder = [
  '17-blockbench-header.html',
  '17-blockbench-hero.html',
  '17-blockbench-plan.html',
  '17-blockbench-why.html',
  '17-blockbench-softskills.html',
  '17-blockbench-projects.html',
  '29-course-more.html',
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

const minecraftHtmlOrder = [
  '18-minecraft-header.html',
  '18-minecraft-hero.html',
  '18-minecraft-plan.html',
  '18-minecraft-why.html',
  '18-minecraft-softskills.html',
  '18-minecraft-projects.html',
  '29-course-more.html',
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

const pythonHtmlOrder = [
  '19-python-header.html',
  '19-python-hero.html',
  '19-python-plan.html',
  '19-python-why.html',
  '19-python-softskills.html',
  '19-python-projects.html',
  '29-course-more.html',
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

const robloxDesignHtmlOrder = [
  '20-roblox-design-header.html',
  '20-roblox-design-hero.html',
  '20-roblox-design-plan.html',
  '20-roblox-design-why.html',
  '20-roblox-design-softskills.html',
  '20-roblox-design-projects.html',
  '29-course-more.html',
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

const webDesignHtmlOrder = [
  '21-web-design-header.html',
  '21-web-design-hero.html',
  '21-web-design-plan.html',
  '21-web-design-why.html',
  '21-web-design-softskills.html',
  '21-web-design-projects.html',
  '29-course-more.html',
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

const webHtmlOrder = [
  '22-web-header.html',
  '22-web-hero.html',
  '22-web-plan.html',
  '22-web-why.html',
  '22-web-softskills.html',
  '22-web-projects.html',
  '29-course-more.html',
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

const blenderHtmlOrder = [
  '23-blender-header.html',
  '23-blender-hero.html',
  '23-blender-plan.html',
  '23-blender-why.html',
  '23-blender-softskills.html',
  '23-blender-projects.html',
  '29-course-more.html',
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

const djangoFlaskHtmlOrder = [
  '24-django-flask-header.html',
  '24-django-flask-hero.html',
  '24-django-flask-plan.html',
  '24-django-flask-why.html',
  '24-django-flask-softskills.html',
  '24-django-flask-projects.html',
  '29-course-more.html',
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

const tkinterHtmlOrder = [
  '25-tkinter-header.html',
  '25-tkinter-hero.html',
  '25-tkinter-plan.html',
  '25-tkinter-why.html',
  '25-tkinter-softskills.html',
  '25-tkinter-projects.html',
  '29-course-more.html',
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

const botHtmlOrder = [
  '26-bot-header.html',
  '26-bot-hero.html',
  '26-bot-plan.html',
  '26-bot-why.html',
  '26-bot-softskills.html',
  '26-bot-projects.html',
  '29-course-more.html',
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

const pygameHtmlOrder = [
  '27-pygame-header.html',
  '27-pygame-hero.html',
  '27-pygame-plan.html',
  '27-pygame-why.html',
  '27-pygame-softskills.html',
  '27-pygame-projects.html',
  '29-course-more.html',
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

const designHtmlOrder = [
  '28-design-header.html',
  '28-design-hero.html',
  '28-design-plan.html',
  '28-design-why.html',
  '28-design-softskills.html',
  '28-design-projects.html',
  '29-course-more.html',
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
const scratchPreload = '  <link rel="preload" as="image" href="media/course_page/scratch/hero-scratch3.png" fetchpriority="high">\n';
const compPreload = '  <link rel="preload" as="image" href="media/course_page/comp_gram/hero.webp" fetchpriority="high">\n';
const unityPreload = '  <link rel="preload" as="image" href="media/course_page/unity/hero.webp" fetchpriority="high">\n';
const robloxPreload = '  <link rel="preload" as="image" href="media/course_page/roblox_program/roblox_hero (1).webp" fetchpriority="high">\n';
const scratchJrPreload = '  <link rel="preload" as="image" href="media/course_page/scratch_junior/hero.webp" fetchpriority="high">\n';
const blockbenchPreload = '  <link rel="preload" as="image" href="media/course_page/blockbench/hero.webp" fetchpriority="high">\n';
const minecraftPreload = '  <link rel="preload" as="image" href="media/course_page/minecraft_mod/hero.webp" fetchpriority="high">\n';
const pythonPreload = '  <link rel="preload" as="image" href="media/course_page/python/hero.webp" fetchpriority="high">\n';
const robloxDesignPreload = '  <link rel="preload" as="image" href="media/course_page/roblox_design/hero.webp" fetchpriority="high">\n';
const webDesignPreload = '  <link rel="preload" as="image" href="media/course_page/web_design/hero.webp" fetchpriority="high">\n';
const webPreload = '  <link rel="preload" as="image" href="media/course_page/web/hero.webp" fetchpriority="high">\n';
const blenderPreload = '  <link rel="preload" as="image" href="media/course_page/blender/hero.webp" fetchpriority="high">\n';
const djangoFlaskPreload = '  <link rel="preload" as="image" href="media/course_page/django_flask/hero.webp" fetchpriority="high">\n';
const tkinterPreload = '  <link rel="preload" as="image" href="media/course_page/tkinter/hero.webp" fetchpriority="high">\n';
const botPreload = '  <link rel="preload" as="image" href="media/course_page/bot/hero.webp" fetchpriority="high">\n';
const pygamePreload = '  <link rel="preload" as="image" href="media/course_page/pygame/hero.webp" fetchpriority="high">\n';
const designPreload = '  <link rel="preload" as="image" href="media/course_page/design/hero.webp" fetchpriority="high">\n';
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
const robloxBlocks = buildBlocks(robloxHtmlOrder);
const robloxCss = buildCss(scratchAssetOrder);
const robloxJs = buildJs(scratchAssetOrder);
const scratchJrBlocks = buildBlocks(scratchJrHtmlOrder);
const scratchJrCss = buildCss(scratchAssetOrder);
const scratchJrJs = buildJs(scratchAssetOrder);
const blockbenchBlocks = buildBlocks(blockbenchHtmlOrder);
const blockbenchCss = buildCss(scratchAssetOrder);
const blockbenchJs = buildJs(scratchAssetOrder);
const minecraftBlocks = buildBlocks(minecraftHtmlOrder);
const minecraftCss = buildCss(scratchAssetOrder);
const minecraftJs = buildJs(scratchAssetOrder);
const pythonBlocks = buildBlocks(pythonHtmlOrder);
const pythonCss = buildCss(scratchAssetOrder);
const pythonJs = buildJs(scratchAssetOrder);
const robloxDesignBlocks = buildBlocks(robloxDesignHtmlOrder);
const robloxDesignCss = buildCss(scratchAssetOrder);
const robloxDesignJs = buildJs(scratchAssetOrder);
const webDesignBlocks = buildBlocks(webDesignHtmlOrder);
const webDesignCss = buildCss(scratchAssetOrder);
const webDesignJs = buildJs(scratchAssetOrder);
const webBlocks = buildBlocks(webHtmlOrder);
const webCss = buildCss(scratchAssetOrder);
const webJs = buildJs(scratchAssetOrder);
const blenderBlocks = buildBlocks(blenderHtmlOrder);
const blenderCss = buildCss(scratchAssetOrder);
const blenderJs = buildJs(scratchAssetOrder);
const djangoFlaskBlocks = buildBlocks(djangoFlaskHtmlOrder);
const djangoFlaskCss = buildCss(scratchAssetOrder);
const djangoFlaskJs = buildJs(scratchAssetOrder);
const tkinterBlocks = buildBlocks(tkinterHtmlOrder);
const tkinterCss = buildCss(scratchAssetOrder);
const tkinterJs = buildJs(scratchAssetOrder);
const botBlocks = buildBlocks(botHtmlOrder);
const botCss = buildCss(scratchAssetOrder);
const botJs = buildJs(scratchAssetOrder);
const pygameBlocks = buildBlocks(pygameHtmlOrder);
const pygameCss = buildCss(scratchAssetOrder);
const pygameJs = buildJs(scratchAssetOrder);
const designBlocks = buildBlocks(designHtmlOrder);
const designCss = buildCss(scratchAssetOrder);
const designJs = buildJs(scratchAssetOrder);

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
const robloxPreview = buildPreview({
  title: 'Roblox \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u0434\u0435\u0442\u0435\u0439 | \u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: robloxPreload,
  bodyClass: 'ku-page ku-page--roblox',
  blocks: robloxBlocks,
  css: robloxCss,
  js: robloxJs,
});
const scratchJrPreview = buildPreview({
  title: 'Scratch Junior \u0434\u043b\u044f \u0434\u0435\u0442\u0435\u0439 | \u041a\u0438\u0431\u0435\u0440\u0423\u043c',
  preload: scratchJrPreload,
  bodyClass: 'ku-page ku-page--scratchjr',
  blocks: scratchJrBlocks,
  css: scratchJrCss,
  js: scratchJrJs,
});
const blockbenchPreview = buildPreview({
  title: 'Blockbench для детей | КиберУм',
  preload: blockbenchPreload,
  bodyClass: 'ku-page ku-page--blockbench',
  blocks: blockbenchBlocks,
  css: blockbenchCss,
  js: blockbenchJs,
});
const minecraftPreview = buildPreview({
  title: 'Создание модов Minecraft для детей | КиберУм',
  preload: minecraftPreload,
  bodyClass: 'ku-page ku-page--minecraft',
  blocks: minecraftBlocks,
  css: minecraftCss,
  js: minecraftJs,
});
const pythonPreview = buildPreview({
  title: 'Python для детей | КиберУм',
  preload: pythonPreload,
  bodyClass: 'ku-page ku-page--python',
  blocks: pythonBlocks,
  css: pythonCss,
  js: pythonJs,
});
const robloxDesignPreview = buildPreview({
  title: 'Roblox гейм-дизайн для детей | КиберУм',
  preload: robloxDesignPreload,
  bodyClass: 'ku-page ku-page--roblox-design',
  blocks: robloxDesignBlocks,
  css: robloxDesignCss,
  js: robloxDesignJs,
});
const webDesignPreview = buildPreview({
  title: 'Веб-дизайн для детей | КиберУм',
  preload: webDesignPreload,
  bodyClass: 'ku-page ku-page--web-design',
  blocks: webDesignBlocks,
  css: webDesignCss,
  js: webDesignJs,
});
const webPreview = buildPreview({
  title: 'Веб-разработка для детей | КиберУм',
  preload: webPreload,
  bodyClass: 'ku-page ku-page--web',
  blocks: webBlocks,
  css: webCss,
  js: webJs,
});
const blenderPreview = buildPreview({
  title: 'Blender для детей | КиберУм',
  preload: blenderPreload,
  bodyClass: 'ku-page ku-page--blender',
  blocks: blenderBlocks,
  css: blenderCss,
  js: blenderJs,
});
const djangoFlaskPreview = buildPreview({
  title: 'Django и Flask для детей | КиберУм',
  preload: djangoFlaskPreload,
  bodyClass: 'ku-page ku-page--django-flask',
  blocks: djangoFlaskBlocks,
  css: djangoFlaskCss,
  js: djangoFlaskJs,
});
const tkinterPreview = buildPreview({
  title: 'Tkinter для детей | КиберУм',
  preload: tkinterPreload,
  bodyClass: 'ku-page ku-page--tkinter',
  blocks: tkinterBlocks,
  css: tkinterCss,
  js: tkinterJs,
});
const botPreview = buildPreview({
  title: 'Telegram-боты для детей | КиберУм',
  preload: botPreload,
  bodyClass: 'ku-page ku-page--bot',
  blocks: botBlocks,
  css: botCss,
  js: botJs,
});
const pygamePreview = buildPreview({
  title: 'Python Pygame для детей | КиберУм',
  preload: pygamePreload,
  bodyClass: 'ku-page ku-page--pygame',
  blocks: pygameBlocks,
  css: pygameCss,
  js: pygameJs,
});
const designPreview = buildPreview({
  title: 'Графический дизайн для детей | КиберУм',
  preload: designPreload,
  bodyClass: 'ku-page ku-page--design',
  blocks: designBlocks,
  css: designCss,
  js: designJs,
});

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'tilda.html'), tilda, 'utf8');
fs.writeFileSync(path.join(distDir, 'preview.html'), preview, 'utf8');
fs.writeFileSync(path.join(distDir, 'scratch.html'), scratchPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'comp_gram.html'), compPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'unity.html'), unityPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'roblox_program.html'), robloxPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'scratch_junior.html'), scratchJrPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'blockbench.html'), blockbenchPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'minecraft_mod.html'), minecraftPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'python.html'), pythonPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'roblox_design.html'), robloxDesignPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'web_design.html'), webDesignPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'web.html'), webPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'blender.html'), blenderPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'django_flask.html'), djangoFlaskPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'tkinter.html'), tkinterPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'bot.html'), botPreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'pygame.html'), pygamePreview, 'utf8');
fs.writeFileSync(path.join(distDir, 'design.html'), designPreview, 'utf8');
fs.writeFileSync(path.join(root, 'index.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + preview, 'utf8');
fs.writeFileSync(path.join(root, 'scratch.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + scratchPreview, 'utf8');
fs.writeFileSync(path.join(root, 'comp_gram.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + compPreview, 'utf8');
fs.writeFileSync(path.join(root, 'unity.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + unityPreview, 'utf8');
fs.writeFileSync(path.join(root, 'roblox_program.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + robloxPreview, 'utf8');
fs.writeFileSync(path.join(root, 'scratch_junior.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + scratchJrPreview, 'utf8');
fs.writeFileSync(path.join(root, 'blockbench.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + blockbenchPreview, 'utf8');
fs.writeFileSync(path.join(root, 'minecraft_mod.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + minecraftPreview, 'utf8');
fs.writeFileSync(path.join(root, 'python.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + pythonPreview, 'utf8');
fs.writeFileSync(path.join(root, 'roblox_design.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + robloxDesignPreview, 'utf8');
fs.writeFileSync(path.join(root, 'web_design.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + webDesignPreview, 'utf8');
fs.writeFileSync(path.join(root, 'web.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + webPreview, 'utf8');
fs.writeFileSync(path.join(root, 'blender.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + blenderPreview, 'utf8');
fs.writeFileSync(path.join(root, 'django_flask.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + djangoFlaskPreview, 'utf8');
fs.writeFileSync(path.join(root, 'tkinter.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + tkinterPreview, 'utf8');
fs.writeFileSync(path.join(root, 'bot.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + botPreview, 'utf8');
fs.writeFileSync(path.join(root, 'pygame.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + pygamePreview, 'utf8');
fs.writeFileSync(path.join(root, 'design.html'), '<!-- Generated by scripts/build.mjs. Edit src/ and run npm run build. -->\n' + designPreview, 'utf8');

// Keep local previews in dist working with relative media paths.
if (fs.existsSync(mediaSrcDir)) {
  fs.mkdirSync(mediaDistDir, { recursive: true });
  fs.cpSync(mediaSrcDir, mediaDistDir, { recursive: true });
}

console.log('Built all static pages, including pygame.html and design.html');
