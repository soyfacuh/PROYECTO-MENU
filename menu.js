'use strict';

const { categories, products } = window.MENU_DATA;
const categoryNav = document.querySelector('#categories');
const list = document.querySelector('#products');
const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
let activeCategory = 'all';
const photoDialog = document.querySelector('#photo-dialog');
let photoTrigger = null;
function openPhoto(product, trigger) {
    photoTrigger = trigger;
    const image = photoDialog.querySelector('img');
    image.src = product.image || visualMarkup(product);
    image.alt = product.name;
    photoDialog.querySelector('h2').textContent = product.name;
    photoDialog.querySelector('.photo-description').textContent = product.description;
    photoDialog.querySelector('.photo-price').textContent = money.format(product.price);
    photoDialog.showModal();
}
photoDialog.querySelector('.photo-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
photoDialog.addEventListener('close', () => { if (photoTrigger) photoTrigger.focus({ preventScroll: true }); });


function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

// Imágenes ilustrativas locales. Se pueden reemplazar por fotos desde productos.js.
function svgDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function drawDog(v, duo = false) {
  const bun = v.bun || '#efb26c';
  const sausage = v.sausage || '#8c3426';
  const sauces = v.sauces || ['#ffd532', '#e43a2e'];
  const xShift = duo ? 70 : 0;
  const scale = duo ? 0.74 : 1;

  function singleDog(x, y, rotate = 0) {
    const crunch = v.topping === 'crunch'
      ? '<g fill="#f9df8b">' + Array.from({ length: 14 }, (_, i) => `<rect x="${178 + i * 15}" y="${180 + (i % 2) * 5}" width="9" height="12" rx="2" transform="rotate(${i % 2 ? 14 : -14} ${178 + i * 15} ${180 + (i % 2) * 5})"/>`).join('') + '</g>'
      : '';

    const bacon = v.topping === 'bacon'
      ? '<path d="M167 183 C194 166 222 203 248 185 S299 164 324 185 S377 205 407 186" stroke="#7a281d" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M168 184 C194 168 224 202 249 186 S302 165 325 186 S378 203 407 188" stroke="#d47b53" stroke-width="7" fill="none" stroke-linecap="round"/>'
      : '';

    const jalapenos = v.topping === 'jalapenos'
      ? Array.from({ length: 6 }, (_, i) => `<ellipse cx="${195 + i * 34}" cy="176" rx="14" ry="9" fill="#2f8c3b" transform="rotate(${i % 2 ? 12 : -18} ${195 + i * 34} 176)"/>`).join('')
      : '';

    const criolla = v.topping === 'criolla'
      ? '<g>' + Array.from({ length: 9 }, (_, i) => `<circle cx="${185 + i * 26}" cy="176" r="6" fill="${i % 3 === 0 ? '#e43a2e' : i % 3 === 1 ? '#8fbf4c' : '#f5f0df'}"/>`).join('') + '</g>'
      : '';

    const cheese = v.topping === 'cheese'
      ? '<path d="M164 180 C210 167 271 174 319 181 C349 185 371 189 405 181 L405 195 C370 207 339 201 310 198 C267 194 220 196 164 208 Z" fill="#ffb400" opacity=".92"/>'
      : '';

    return `
      <g transform="translate(${x}, ${y}) scale(${scale}) rotate(${rotate} 300 230)">
        <ellipse cx="300" cy="305" rx="164" ry="18" fill="#00000022"/>
        <rect x="126" y="142" width="348" height="142" rx="71" fill="${bun}"/>
        <rect x="143" y="159" width="314" height="108" rx="54" fill="#ffdca0" opacity=".95"/>
        <rect x="133" y="171" width="334" height="68" rx="34" fill="${sausage}"/>
        ${cheese}
        ${bacon}
        ${jalapenos}
        ${criolla}
        ${crunch}
        ${sauces.map((color, index) => `<path d="M166 ${188 + index * 18} Q186 ${166 + index * 18} 206 ${188 + index * 18} T246 ${188 + index * 18} T286 ${188 + index * 18} T326 ${188 + index * 18} T366 ${188 + index * 18} T406 ${188 + index * 18}" stroke="${color}" stroke-width="${index === 0 ? 13 : 8}" fill="none" stroke-linecap="round"/>`).join('')}
      </g>`;
  }

  return duo
    ? `${singleDog(-54, 12, -7)}${singleDog(78, -6, 8)}`
    : singleDog(xShift, 0, -9);
}

function drawFries(v) {
  const fries = v.fries || '#ffd66a';
  const cup = v.cup || '#e43a2e';
  const topping = v.topping === 'cheese'
    ? '<path d="M194 163 C215 148 253 151 276 164 C295 175 326 170 343 158 L343 194 C330 206 304 204 279 196 C251 187 224 188 194 199 Z" fill="#ffb500"/>'
    : '';

  return `
    <g>
      <ellipse cx="300" cy="340" rx="150" ry="18" fill="#00000020"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${188 + i * 22}" y="${112 + (i % 2) * 8}" width="18" height="122" rx="6" fill="${fries}" transform="rotate(${i % 2 ? 6 : -7} ${188 + i * 22} ${112 + (i % 2) * 8})"/>`).join('')}
      <path d="M180 165 H420 L382 315 H218 Z" fill="${cup}"/>
      <path d="M180 165 Q300 224 420 165" fill="#ba2a22" opacity=".45"/>
      ${topping}
      <text x="300" y="268" text-anchor="middle" font-family="Arial,sans-serif" font-size="52" font-weight="900" fill="#ffce35">P.</text>
    </g>`;
}

function drawDrink(v) {
  const cup = v.cup || '#e43a2e';
  const liquid = v.liquid || '#ffce35';
  const straw = v.accent || '#20201d';

  return `
    <g>
      <ellipse cx="300" cy="350" rx="96" ry="14" fill="#00000018"/>
      <path d="M336 118 L376 54" stroke="${straw}" stroke-width="12" stroke-linecap="round"/>
      <path d="M336 118 L376 54" stroke="#fffaf0" stroke-width="6" stroke-linecap="round"/>
      <rect x="205" y="120" width="190" height="28" rx="14" fill="#fffaf0" stroke="#20201d" stroke-width="4"/>
      <path d="M220 145 H380 L358 330 H242 Z" fill="${cup}" stroke="#20201d" stroke-width="4"/>
      <path d="M242 196 C275 178 327 178 358 196 V242 C327 224 275 224 242 242 Z" fill="${liquid}" opacity=".92"/>
      <text x="300" y="274" text-anchor="middle" font-family="Arial,sans-serif" font-size="46" font-weight="900" fill="#20201d">P.</text>
    </g>`;
}

function drawCombo(v, duo = false) {
  const dog = drawDog(v, duo);
  const fries = `
    <g transform="translate(244 95) scale(.62)">
      ${drawFries(v)}
    </g>`;
  const drink = `
    <g transform="translate(316 106) scale(.50)">
      ${drawDrink({ ...v, cup: v.cup || '#e43a2e', liquid: '#ffce35' })}
    </g>`;
  return `${dog}${fries}${drink}`;
}

function visualMarkup(product, transparent = false) {
  const v = product.visual || {};
  let content = '';
  if (v.type === 'dog') content = drawDog(v, false);
  if (v.type === 'fries') content = drawFries(v);
  if (v.type === 'drink') content = product.category === 'bebidas' && product.name.toLowerCase().includes('agua')
    ? `<g><ellipse cx="300" cy="370" rx="85" ry="13" fill="#20201d20"/><rect x="275" y="62" width="50" height="30" rx="7" fill="#2173ab"/><path d="M277 92H323V124Q323 140 348 155Q365 166 365 195V330Q365 350 344 350H256Q235 350 235 330V195Q235 166 252 155Q277 140 277 124Z" fill="#d4efff" stroke="#5294bd" stroke-width="4"/><rect x="236" y="202" width="128" height="72" rx="5" fill="#6eb1df"/><path d="M246 190Q260 181 267 176V318" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" opacity=".7"/><text x="300" y="243" text-anchor="middle" font-family="Arial" font-weight="900" font-size="22" fill="#fff">AGUA</text></g>`
    : drawDrink(v);
  if (v.type === 'combo') content = drawCombo(v, false);
  if (v.type === 'combo-duo') content = drawCombo(v, true);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 430">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${v.bg || '#ffce35'}"/>
          <stop offset="100%" stop-color="#fff6d8"/>
        </linearGradient>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill="${v.accent || '#20201d'}" opacity=".12"/>
        </pattern>
      </defs>
      ${transparent ? '' : `<rect width="600" height="430" fill="url(#bg)"/><rect width="600" height="430" fill="url(#dots)"/><circle cx="470" cy="95" r="130" fill="#ffffff55"/><circle cx="130" cy="350" r="110" fill="#ffffff44"/>`}
      ${content}
    </svg>`;

  return svgDataUri(svg);
}


function createImage(product, hero = false) {
    const img = el('img');
    img.src = hero ? visualMarkup(product, true) : (product.image || visualMarkup(product));
    if (product.image && !hero) img.addEventListener('error', () => { img.src = visualMarkup(product, hero); }, { once: true });
    img.alt = hero ? '' : product.name;
    img.width = hero ? 600 : 225;
    img.height = hero ? 430 : 225;
    img.loading = hero ? 'eager' : 'lazy';
    img.decoding = 'async';
    return img;
}

function makeProduct(product) {
    const row = el('article', 'product');
    const thumb = el('div', 'thumb');
    const picture = createImage(product);
    const photoButton = el('button', 'photo-button');
    photoButton.type = 'button';
    photoButton.setAttribute('aria-label', `Ver imagen de ${product.name}`);
    photoButton.append(picture);
    photoButton.addEventListener('click', () => openPhoto(product, photoButton));
    thumb.append(photoButton);
    const info = el('div', 'product-info');
    info.append(el('h4', 'product-name', product.name));
    info.append(el('p', 'product-description', product.description));
    const bottom = el('div', 'product-bottom');
    bottom.append(el('strong', 'price', money.format(product.price)));
    if (['Bacon Boom', 'Combo Callejero', 'Fuego Lento'].includes(product.name) && product.badge) bottom.append(el('span', 'product-tag', product.badge));
    info.append(bottom);
    row.append(thumb, info);
    return row;
}

function render() {
    list.replaceChildren();
    categories.forEach((category, index) => {
        if (activeCategory !== 'all' && activeCategory !== category.id) return;
        const items = products.filter(product => product.category === category.id);
        if (!items.length) return;
        const section = el('section', 'category');
        const heading = el('div', 'category-head');
        heading.append(el('span', 'category-num', String(index + 1).padStart(2, '0')));
        heading.append(el('h3', '', category.name));
        const grid = el('div', 'product-grid');
        items.forEach(product => grid.append(makeProduct(product)));
        section.append(heading, grid);
        list.append(section);
    });
}

[{ id: 'all', name: 'Todo', icon: '✳' }, ...categories].forEach(category => {
    const button = el('button', 'chip');
    button.type = 'button';
    button.dataset.category = category.id;
    button.setAttribute('aria-pressed', String(activeCategory === category.id));
    const icon = el('span', 'chip-icon', category.icon);
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon, el('span', '', category.name));
    button.addEventListener('click', () => {
        activeCategory = category.id;
        categoryNav.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.category === activeCategory)));
        render();
        if (document.querySelector('.menu').getBoundingClientRect().top < 55) {
            window.scrollTo({ top: document.querySelector('.navigation').offsetTop });
        }
    });
    categoryNav.append(button);
});
const hero = products.find(product => product.name === 'El Original') || products[0];
if (hero) document.querySelector('#hero-art').append(createImage(hero, true));
render();
