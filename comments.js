import { brand, categories, comments, platforms, products } from './shared/data.js';
import { badge, button, emptyState, escapeHTML, icon, openDialog, platform } from './shared/ui.js';

const categoryOrder = ['urgent', 'drama', 'idea', 'praise', 'intent', 'competitor'];
const valid = {
  category: ['all', ...categoryOrder],
  platform: ['all', ...Object.keys(platforms)],
  product: ['all', ...products.map(product => product.id)],
  period: ['all', '24h', '7d', '30d'],
  sort: ['important', 'newest', 'oldest']
};
const defaults = { category: 'all', platform: 'all', product: 'all', period: 'all', sort: 'important' };
const paramsFrom = params => Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => {
  const value = params.get(key);
  return [key, valid[key].includes(value) ? value : fallback];
}));
const periodHours = { '24h': 24, '7d': 168, '30d': 720 };
const baseFiltered = (items, filters) => items.filter(item =>
  (filters.platform === 'all' || item.platform === filters.platform) &&
  (filters.product === 'all' || item.productId === filters.product) &&
  (filters.period === 'all' || item.ageHours <= periodHours[filters.period])
);
function sortComments(items, sort) {
  return [...items].sort((a, b) => {
    if (sort === 'newest') return a.ageHours - b.ageHours || a.id - b.id;
    if (sort === 'oldest') return b.ageHours - a.ageHours || a.id - b.id;
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) || b.likesCount - a.likesCount || a.ageHours - b.ageHours || a.id - b.id;
  });
}
const filtersURL = filters => {
  const params = new URLSearchParams();
  Object.entries(defaults).forEach(([key, fallback]) => { if (filters[key] !== fallback) params.set(key, filters[key]); });
  return '#/comments' + (params.size ? '?' + params.toString() : '');
};
function optionList(items, current, allLabel) {
  return `<option value="all">${allLabel}</option>` + items.map(item => `<option value="${escapeHTML(item.id)}"${current === item.id ? ' selected' : ''}>${escapeHTML(item.name || item.label)}</option>`).join('');
}
function selectControl(label, name, options, value) {
  return `<label class="bc-comments-select"><span>${label}</span><select data-comment-filter="${name}" aria-label="${label}">${options(value)}</select></label>`;
}
function filterControls(filters) {
  return `<div class="bc-comments-controls">${selectControl('แพลตฟอร์ม', 'platform', value => optionList(Object.entries(platforms).map(([id, item]) => ({id, name:item.name})), value, 'ทุกแพลตฟอร์ม'), filters.platform)}${selectControl('สินค้า', 'product', value => optionList(products, value, 'สินค้าทั้งหมด'), filters.product)}${selectControl('ช่วงเวลา', 'period', value => `<option value="all"${value==='all'?' selected':''}>ทั้งหมด</option><option value="24h"${value==='24h'?' selected':''}>24 ชั่วโมง</option><option value="7d"${value==='7d'?' selected':''}>7 วัน</option><option value="30d"${value==='30d'?' selected':''}>30 วัน</option>`, filters.period)}${selectControl('เรียงตาม', 'sort', value => `<option value="important"${value==='important'?' selected':''}>สำคัญที่สุด</option><option value="newest"${value==='newest'?' selected':''}>ใหม่ที่สุด</option><option value="oldest"${value==='oldest'?' selected':''}>เก่าที่สุด</option>`, filters.sort)}</div>`;
}
function categoryChips(filters) {
  const available = baseFiltered(comments, filters);
  const counts = Object.fromEntries(categoryOrder.map(key => [key, available.filter(item => item.category === key).length]));
  return `<div class="bc-comment-categories" role="group" aria-label="กรองตามประเภท"><button class="bc-comment-chip${filters.category==='all'?' is-selected':''}" data-comment-category="all" aria-pressed="${filters.category==='all'}">ทั้งหมด <span>${available.length}</span></button>${categoryOrder.map(key => `<button class="bc-comment-chip${filters.category===key?' is-selected':''}" data-comment-category="${key}" aria-pressed="${filters.category===key}">${badge(key)} <span>${counts[key]}</span></button>`).join('')}</div>`;
}
function commentRow(item) {
  return `<a class="bc-comment-row" href="#/comments/${item.id}" aria-label="เปิดคอมเมนต์จาก ${escapeHTML(item.user)}"><div class="bc-comment-row-top">${platform(item.platform)}<span>${escapeHTML(item.time)}</span></div><div class="bc-comment-row-body"><strong>${escapeHTML(item.user)}</strong><p>${escapeHTML(item.text)}</p></div><div class="bc-comment-row-bottom">${badge(item.category)}<span class="bc-comment-topic">${icon('sparkles')}หัวข้อ · ${escapeHTML(item.topic)}</span><span class="bc-comment-likes">${icon('heart')}${escapeHTML(item.likes)}</span>${icon('chevron')}</div></a>`;
}
export function commentsPage(searchParams = new URLSearchParams()) {
  const filters = paramsFrom(searchParams);
  const scoped = baseFiltered(comments, filters);
  const visible = sortComments(scoped.filter(item => filters.category === 'all' || item.category === filters.category), filters.sort);
  const cards = visible.length ? `<div class="bc-comments-list">${visible.map(commentRow).join('')}</div>` : emptyState({title:'ไม่พบคอมเมนต์ที่ตรงกับตัวกรอง',description:'ลองเปลี่ยนตัวกรองหรือแสดงรายการทั้งหมด',iconName:'filter',action:button('ล้างตัวกรอง',{action:'comments-clear',variant:'secondary'})});
  return `<div class="bc-page bc-comments-page"><div class="bc-intro"><div><div class="bc-intro-topline">BrandCare AI · เสียงลูกค้าจากทุกช่องทาง</div><h1>คอมเมนต์</h1><p>ติดตามสิ่งที่ลูกค้าพูดถึงขนมบ้านสวน</p></div><div class="bc-intro-side"><span class="bc-date">${escapeHTML(brand.date)}</span></div></div>${categoryChips(filters)}<div class="bc-comments-filterbar"><div class="bc-comments-desktop-filters">${filterControls(filters)}</div><div class="bc-comments-result"><strong>${visible.length} รายการ</strong><button class="bc-filter-trigger" data-action="comments-filter" aria-haspopup="dialog">${icon('filter')}ตัวกรอง</button>${button('ล้างตัวกรอง',{action:'comments-clear',variant:'text',size:'small'})}</div></div>${cards}</div>`;
}
export function setupComments(root) {
  if (root.dataset.commentsEventsReady) return;
  root.dataset.commentsEventsReady = 'true';
  const update = changes => {
    const filters = paramsFrom(new URLSearchParams(location.hash.split('?')[1] || ''));
    location.hash = filtersURL({...filters, ...changes});
  };
  root.addEventListener('change', event => {
    const name = event.target.dataset.commentFilter;
    if (name) update({[name]: event.target.value});
  });
  root.addEventListener('click', event => {
    const category = event.target.closest('[data-comment-category]');
    if (category) update({category: category.dataset.commentCategory});
    if (event.target.closest('[data-action="comments-clear"]')) location.hash = '#/comments';
    if (event.target.closest('[data-action="comments-filter"]')) {
      const filters = paramsFrom(new URLSearchParams(location.hash.split('?')[1] || ''));
      openDialog(`<h2>ตัวกรองคอมเมนต์</h2><div class="bc-comments-sheet">${filterControls(filters)}</div><div class="bc-dialog-actions">${button('ล้างตัวกรอง',{action:'comments-clear',variant:'secondary'})}${button('เสร็จแล้ว',{action:'close-dialog'})}</div>`, {sheet:true,label:'ตัวกรองคอมเมนต์'});
    }
  });
}
