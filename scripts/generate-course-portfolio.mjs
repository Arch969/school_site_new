import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const colors = ['blue', 'violet', 'orange'];

const configs = [
  { folder:'Scratch', file:'12-scratch-projects.html', id:'scratch-projects', badge:'Портфолио курса Scratch', title:'Портфолио <span>учеников Scratch</span>', text:'Настоящие проекты детей: игры, аркады и интерактивные истории, которые ребёнок собирает на занятиях.', ratio:'4-3' },
  { folder:'comp_gram', file:'13-comp-projects.html', id:'comp-projects', badge:'Портфолио курса компьютерной грамотности', title:'Что делают <span>дети на курсе</span>', text:'Ученики готовят документы, презентации и первые цифровые работы, которые можно сразу использовать в учёбе.' },
  { folder:'unity', file:'14-unity-projects.html', id:'unity-projects', badge:'Портфолио курса Unity', title:'Портфолио <span>учеников Unity</span>', text:'Примеры игр и 3D-сцен, где дети пробуют механику, физику, уровни и финальную сборку проекта.' },
  { folder:'roblox_program', file:'15-roblox-projects.html', id:'roblox-projects', badge:'Портфолио курса Roblox', title:'Игры, которые <span>создают дети</span>', text:'Работы учеников в Roblox Studio: obby, игровые события, интерактивные миры и собственные правила.' },
  { folder:'ScratchJR', file:'16-scratchjr-projects.html', id:'scratchjr-projects', badge:'Портфолио курса Scratch Junior', title:'Первые проекты <span>в Scratch Junior</span>', text:'Самые младшие ученики создают интерактивные истории, простые игры и анимации с понятной логикой действий.' },
  { folder:'blockbench', file:'17-blockbench-projects.html', id:'blockbench-projects', badge:'Портфолио курса Blockbench', title:'3D-модели <span>учеников</span>', text:'Дети создают персонажей, предметы и игровые объекты, которые можно использовать в Minecraft и других проектах.' },
  { folder:'minecraft_mod', file:'18-minecraft-projects.html', id:'minecraft-projects', badge:'Портфолио курса Minecraft-моддинга', title:'Игровые предметы <span>учеников</span>', text:'Ученики придумывают и оформляют собственные предметы, блоки и элементы для Minecraft-проектов.' },
  {
    folder:'python_base',
    file:'19-python-projects.html',
    id:'python-projects',
    badge:'Портфолио курса Python',
    title:'Первые проекты <span>на Python</span>',
    text:'Курс Python Start показывает разные направления Python: базовый код, Pygame, Django, Tkinter и Telegram-ботов.',
    items:[
      { folder:'python_base', index:0, title:'Проект "Угадай число"' },
      { folder:'pygame', index:2, title:'Робо платформер' },
      { folder:'django', index:0, title:'Сайт - киберспорт' },
      { folder:'python_base', index:1, title:'Звезда' },
      { folder:'tkinter', index:1, title:'Список покупок' },
      { folder:'bot', index:1, title:'Бот викторина' },
    ],
  },
  { folder:'roblox_design', file:'20-roblox-design-projects.html', id:'roblox-design-projects', badge:'Портфолио курса Roblox гейм-дизайна', title:'Миры, которые <span>проектируют дети</span>', text:'Работы учеников показывают, как идея превращается в локацию, маршрут, атмосферу и понятную игровую задачу.' },
  { folder:'web_design', file:'21-web-design-projects.html', id:'web-design-projects', badge:'Портфолио курса веб-дизайна', title:'Дизайн-макеты <span>учеников</span>', text:'Дети собирают первые экраны, страницы и интерфейсы, учатся композиции, цвету и аккуратной подаче идеи.' },
  { folder:'web_program', file:'22-web-projects.html', id:'web-projects', badge:'Портфолио курса создания сайтов', title:'Сайты, которые <span>создают дети</span>', text:'Примеры ученических страниц: от простых лендингов до творческих сайтов с собственным стилем.' },
  { folder:'blender', file:'23-blender-projects.html', id:'blender-projects', badge:'Портфолио курса Blender', title:'3D-работы <span>учеников</span>', text:'Дети создают персонажей, аксессуары и композиции, осваивая форму, материалы, сцену и первые 3D-навыки.' },
  { folder:'django', file:'24-django-flask-projects.html', id:'django-flask-projects', badge:'Портфолио курса Django и Flask', title:'Веб-проекты <span>на Python</span>', text:'Ученики собирают сайты и веб-приложения, где Python работает уже не в учебной задаче, а в настоящем проекте.' },
  { folder:'tkinter', file:'25-tkinter-projects.html', id:'tkinter-projects', badge:'Портфолио курса Tkinter', title:'Приложения <span>учеников на Python</span>', text:'Дети создают оконные программы: калькуляторы, списки, планировщики и интерфейсы для работы с данными.' },
  { folder:'bot', file:'26-bot-projects.html', id:'bot-projects', badge:'Портфолио курса Telegram-ботов', title:'Боты, которые <span>создают дети</span>', text:'Ученики программируют ботов с командами, меню, викторинами и полезными сценариями автоматизации.' },
  { folder:'pygame', file:'27-pygame-projects.html', id:'pygame-projects', badge:'Портфолио курса Python Pygame', title:'Игры учеников <span>на Python</span>', text:'Дети собирают 2D-игры с персонажами, очками, препятствиями, уровнями и финальной игровой логикой.' },
  { folder:'design', file:'28-design-projects.html', id:'design-projects', badge:'Портфолио курса графического дизайна', title:'Дизайн-работы <span>учеников</span>', text:'Постеры, карточки, комиксы и иллюстрации, где ребёнок учится работать с композицией, цветом и стилем.' },
];

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (ch) => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
  })[ch]);
}

function parseDescription(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s*/, '').trim();
      const match = cleaned.match(/^(.*?)\s+([^\s]+)\s+(\d+)\s+лет$/u);
      if (!match) return null;
      return {
        title: match[1].trim(),
        name: match[2].trim(),
        age: `${match[3].trim()} лет`,
      };
    })
    .filter(Boolean);
}

function mediaFor(folderPath, index) {
  const base = String(index + 1);
  const candidates = ['webp', 'gif', 'png', 'jpg', 'jpeg'].map((ext) => `${base}.${ext}`);

  return candidates.find((name) => fs.existsSync(path.join(folderPath, name))) || null;
}

function cardHtml(config, entry, index) {
  const { item, mediaName } = entry;
  const color = colors[index % colors.length];
  const ext = path.extname(mediaName).toLowerCase();
  const folderUrl = `media/portfolio/${entry.folder || config.folder}`;
  const isGif = ext === '.gif';
  const poster = isGif ? `${folderUrl}/${path.basename(mediaName, ext)}-poster.webp` : `${folderUrl}/${mediaName}`;
  const gifAttr = isGif ? ` data-gif-src="${folderUrl}/${mediaName}"` : '';
  const ratioClass = (entry.ratio || config.ratio) === '4-3' ? ' ku-project-card__preview--ratio-4-3' : '';

  return `          <article class="ku-project-card ku-project-card--${color} ku-projects__reveal">
            <div class="ku-project-card__preview${ratioClass}">
              <img src="${poster}"${gifAttr} alt="${escapeHtml(item.title)} — ${escapeHtml(item.name)}, ${escapeHtml(item.age)}" loading="lazy" decoding="async">
            </div>
            <div class="ku-project-card__body">
              <h3>${escapeHtml(item.title)}</h3>
              <div class="ku-project-card__meta"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.age)}</span></div>
            </div>
          </article>`;
}

function blockHtml(config, items) {
  const cards = items.map((entry, index) => cardHtml(config, entry, index)).join('\n');

  return `<section class="ku-projects ku-projects--student-portfolio" id="${config.id}">
  <div class="ku-projects__gridbg"></div>
  <div class="ku-projects__glow ku-projects__glow--blue"></div>
  <div class="ku-projects__glow ku-projects__glow--red"></div>

  <div class="ku-projects__container">
    <div class="ku-projects__head ku-projects__reveal">
      <div class="ku-projects__badge">${config.badge}</div>
      <h2 class="ku-projects__title">${config.title}</h2>
      <p class="ku-projects__text">${config.text}</p>
    </div>

    <div class="ku-projects__slider ku-projects__reveal">
      <button class="ku-projects__nav ku-projects__nav--prev" type="button" aria-label="Предыдущая работа"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 5.3a1 1 0 0 1 0 1.4L9.41 12l5.3 5.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z"/></svg></button>
      <div class="ku-projects__viewport">
        <div class="ku-projects__track">
${cards}
        </div>
      </div>
      <button class="ku-projects__nav ku-projects__nav--next" type="button" aria-label="Следующая работа"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.3 18.7a1 1 0 0 1 0-1.4l5.29-5.3L9.3 6.7a1 1 0 1 1 1.42-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.41 0Z"/></svg></button>
    </div>
    <div class="ku-projects__dots" aria-label="Навигация по работам"></div>
  </div>
</section>
`;
}

function entryFor(config, folder, index, override = {}) {
  const folderPath = path.join(root, 'media', 'portfolio', folder);
  const descPath = path.join(folderPath, 'описание.md');
  if (!fs.existsSync(descPath)) return null;

  const item = parseDescription(descPath)[index];
  const mediaName = mediaFor(folderPath, index);
  if (!item || !mediaName) return null;

  return {
    item: { ...item, ...override },
    mediaName,
    folder,
    ratio: override.ratio,
  };
}

for (const config of configs) {
  const folderPath = path.join(root, 'media', 'portfolio', config.folder);
  const descPath = path.join(folderPath, 'описание.md');
  if (!fs.existsSync(descPath)) continue;

  const entries = config.items
    ? config.items
      .map((spec) => entryFor(config, spec.folder || config.folder, spec.index, spec))
      .filter(Boolean)
    : [];

  if (!config.items) {
    const desc = parseDescription(descPath);

    for (let i = 0; i < desc.length; i += 1) {
      const mediaName = mediaFor(folderPath, i);
      if (mediaName) entries.push({ item: desc[i], mediaName, folder: config.folder });
    }
  }

  if (!entries.length) continue;

  const outPath = path.join(root, 'src', 'blocks', config.file);
  fs.writeFileSync(outPath, blockHtml(config, entries), 'utf8');
  console.log(`${config.file}: ${entries.length}`);
}
