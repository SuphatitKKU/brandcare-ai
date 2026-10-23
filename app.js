import {brand,metrics,categories,comments,issues,products,navigation} from './shared/data.js';
import {shell,icon,button,card,emptyState,listRow,escapeHTML,openDialog,closeDialog,toast,reveal,countTo,mobileMenu,mobileDestinations} from './shared/ui.js';
import {dashboard,intro} from './dashboard.js';
import {componentGallery} from './components.js';
import {commentsPage,setupComments} from './comments.js';

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
document.querySelector('#app').innerHTML=shell();
const root=$('#bc-main');
let cleanupReveal;
let route='today';

// หน้าจริงรอบนี้มีเฉพาะหน้า 5 และพื้นที่แสดงไฟล์กลาง หน้าอื่นเป็นจุดเชื่อมต่อรอพัฒนา
const futureRoutes={issues:{title:'รายการปัญหา',page:6},comments:{title:'คอมเมนต์',page:9},sales:{title:'ยอดขายและรีวิว',page:11},festivals:{title:'ปฏิทินเทศกาล',page:13},ai:{title:'ถาม AI',page:15},settings:{title:'ตั้งค่า',page:17}};
function destinationPage(parts){const name=parts[0];if(name==='issues'&&parts[2]==='approve')return {title:'อนุมัติและส่งข้อความ',page:8};if(name==='issues'&&parts[1])return {title:'รายละเอียดปัญหา',page:7};if(name==='comments'&&parts[1])return {title:'รายละเอียดคอมเมนต์',page:10};return futureRoutes[name];}
function futurePage(parts){const target=destinationPage(parts);return `<div class="bc-page">${intro(target.title,'เตรียมโครงหน้าร่วมไว้แล้ว สำหรับงานลำดับถัดไป',{eyebrow:'BrandCare AI · จุดเชื่อมต่อหน้า '+target.page,date:false})}${card({title:'หน้านี้จะทำในรอบถัดไป',eyebrow:'ขอบเขตรอบนี้: ไฟล์กลางและ Dashboard รวม',content:emptyState({title:'Header พร้อมแล้ว รอเติมเนื้อหาของหน้านี้',description:'ปุ่มนี้พามาถูกตำแหน่งตามแผน หน้าอื่นยังไม่ได้เริ่มพัฒนาในรอบนี้ จึงไม่มีการอนุมัติ ส่งข้อความ หรือเรียก AI จริง',iconName:parts[0]==='ai'?'sparkles':'link',action:button('กลับสรุปวันนี้',{href:'#/today',iconName:'arrow'})})})}<div class="bc-context-note">${icon('shield')}หน้า ${target.page} ยังไม่ถือว่าเสร็จ · ดูขอบเขตและคอมโพเนนต์กลางได้จากลิงก์ท้ายหน้า</div></div>`;}
function moveIndicator(){const active=$('.bc-nav-link.is-active');const indicator=$('.bc-nav-indicator');if(!active){indicator.style.opacity='0';return;}indicator.style.opacity='1';indicator.style.width=active.offsetWidth+'px';indicator.style.transform=`translateX(${active.offsetLeft-4}px)`;}
function closeMobileMenu(){const menu=$('#bc-mobile-menu');if(menu.matches(':popover-open'))menu.hidePopover();$('.bc-bottom-menu').setAttribute('aria-expanded','false');}
function positionMobileMenu(){
 const menu=$('#bc-mobile-menu'),trigger=$('.bc-bottom-menu'),nav=$('.bc-bottom-nav');
 const width=Math.min(310,document.documentElement.clientWidth-32);
 const anchor=trigger.getBoundingClientRect();
 const center=anchor.left+anchor.width/2;
 const left=Math.max(16,Math.min(center-width/2,document.documentElement.clientWidth-width-16));
 const bottom=window.innerHeight-nav.getBoundingClientRect().top+14;
 menu.style.width=width+'px';menu.style.left=left+'px';menu.style.bottom=bottom+'px';
 menu.style.setProperty('--bc-bubble-tip',Math.max(28,Math.min(width-28,center-left))+'px');
}
function closeNotifications(){$('#bc-notifications').hidden=true;$('.bc-notification-trigger').setAttribute('aria-expanded','false');}
function render(){
 closeMobileMenu();cleanupReveal?.();if($('#bc-dialog').open)closeDialog();closeNotifications();
 const hash=decodeURIComponent(location.hash.replace(/^#\/?/,''));const path=hash.split('?')[0];const parts=(path||'today').split('/');route=parts[0];
 if(route==='today')root.innerHTML=dashboard();
 else if(route==='comments'&&!parts[1]){root.innerHTML=commentsPage(new URLSearchParams(hash.split('?')[1]||''));setupComments(root);}
 else if(route==='components')root.innerHTML=componentGallery();
 else if(futureRoutes[route])root.innerHTML=futurePage(parts);
 else root.innerHTML=`<div class="bc-page">${intro('ไม่พบหน้าที่ต้องการ','เลือกเมนูด้านบนเพื่อกลับไปดูแลร้าน',{date:false})}${emptyState({title:'ลิงก์นี้ยังไม่มีในแผน',action:button('กลับสรุปวันนี้',{href:'#/today'})})}</div>`;
 document.title=(route==='today'?'สรุปวันนี้':route==='components'?'ชุดคอมโพเนนต์':futureRoutes[route]?.title||'ไม่พบหน้า')+' · BrandCare AI';
 $$('.bc-nav-link').forEach(link=>{const active=link.getAttribute('href')==='#/'+route;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 $$('.bc-bottom-link').forEach(link=>{const active=link.dataset.route===route;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 $('.bc-bottom-menu').classList.toggle('is-active',!mobileDestinations.some(n=>n.id===route));
 moveIndicator();cleanupReveal=reveal(root);window.scrollTo({top:0,behavior:'instant'});
 if(route==='today'){const values=$$('.bc-metric-number>strong');countTo(values[0],metrics.complaints);countTo(values[1],metrics.revenue,{prefix:'฿'});countTo(values[2],metrics.rating,{decimals:1});countTo($('[data-count]'),metrics.carrierShare);}
}

const searchable=[...navigation.map(n=>({title:n.label,detail:'เมนูหลัก · หน้า '+n.page,href:'#/'+n.id,icon:'link'})),...issues.map(i=>({title:i.title,detail:i.count+' คอมเมนต์ · '+i.subtitle,href:'#/issues/'+i.id,icon:'alert'})),...comments.map(c=>({title:c.user+' · '+c.text,detail:c.topic+' · '+categories[c.category].label,href:'#/comments/'+c.id,icon:'message'})),...products.map(p=>({title:p.name,detail:p.size+' · ฿'+p.price,href:'#/sales',icon:'box'})),{title:'11.11',detail:'อีก 20 วัน · เทศกาลที่ใกล้ถึง',href:'#/festivals',icon:'calendar'}];
function searchResults(query){const q=query.toLocaleLowerCase('th').trim();const found=q?searchable.filter(item=>(item.title+' '+item.detail).toLocaleLowerCase('th').includes(q)):searchable.slice(0,7);$('#bc-search-count').textContent=q?`พบ ${found.length} รายการในข้อมูลจำลอง`:'เลือกเมนู หรือพิมพ์คำค้น เช่น “กล่องบุบ”';$('#bc-search-results').innerHTML=found.length?found.map(item=>`<a class="bc-search-result" href="${item.href}" data-search-result>${icon(item.icon)}<span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.detail)}</small></span>${icon('chevron')}</a>`).join(''):emptyState({title:'ไม่พบผลการค้นหา',description:'ลองค้นหาชื่อสินค้า คอมเมนต์ หรือคำว่า กล่องบุบ',iconName:'search'});}
function openSearch(){closeMobileMenu();closeNotifications();openDialog(`<h2>ค้นหาในร้าน</h2><label class="bc-search-field">${icon('search')}<input id="bc-global-search" type="search" placeholder="ค้นหาปัญหา คอมเมนต์ หรือสินค้า" aria-label="ค้นหาปัญหา คอมเมนต์ หรือสินค้า" autocomplete="off"></label><p id="bc-search-count" class="bc-notice-title" role="status"></p><div class="bc-search-results" id="bc-search-results"></div>`,{label:'ค้นหาในร้าน'});searchResults('');$('#bc-global-search').addEventListener('input',event=>searchResults(event.target.value));$('#bc-global-search').focus();}
function demoDialog(drawer=false){openDialog(`<h2>${drawer?'แผงรายละเอียด':'ตรวจทานก่อนยืนยัน'}</h2><p class="bc-dialog-description">หน้าต่างนี้ใช้รูปแบบเดียวกันได้ทุกหน้า รองรับการปิดด้วย Esc การจัดการโฟกัส และการใช้งานด้วยคีย์บอร์ด</p><div class="bc-state-message">${icon('shield')}เป็นการสาธิต UI ไม่มีการส่งข้อความหรือเปลี่ยนข้อมูลจริง</div><label class="bc-field-label" for="bc-demo-note">บันทึกตัวอย่าง</label><textarea class="bc-textarea" id="bc-demo-note" placeholder="พิมพ์ข้อความเพื่อทดลองคอมโพเนนต์"></textarea><div class="bc-dialog-actions">${button('ยกเลิก',{action:'close-dialog',variant:'secondary'})}${button('ยืนยันตัวอย่าง',{action:'demo-confirm'})}</div>`,{drawer,label:drawer?'ตัวอย่างแผงรายละเอียด':'ตัวอย่างหน้าต่างยืนยัน'});}

document.addEventListener('click',event=>{
 if(event.target.closest('.bc-skip')){event.preventDefault();root.focus({preventScroll:true});root.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const action=event.target.closest('[data-action]')?.dataset.action;
 if(action==='mobile-menu'){closeNotifications();$('#bc-mobile-menu').innerHTML=mobileMenu(route);positionMobileMenu();}
 if(action==='close-mobile-menu')closeMobileMenu();
 if(action==='search')openSearch();
 if(action==='notifications'){const el=$('#bc-notifications');el.hidden=!el.hidden;$('.bc-notification-trigger').setAttribute('aria-expanded',String(!el.hidden));}
 if(action==='close-notifications')closeNotifications();
 if(action==='profile'){closeNotifications();openDialog(`<h2>${brand.name}</h2><p class="bc-dialog-description">${brand.location} · ขายออนไลน์ตั้งแต่ปี 2022</p><div class="bc-detail-row"><span>เจ้าของร้าน</span><strong>${brand.owner}</strong></div><div class="bc-detail-row"><span>น้ำเสียงของแบรนด์</span><strong>${brand.tone}</strong></div><div class="bc-detail-row"><span>คอมเมนต์ที่ AI อ่านในตัวอย่าง</span><strong>1,284 รายการ</strong></div><p class="bc-dialog-description">ร้านและผู้ใช้เป็นข้อมูลสมมติตามแผน ข้อมูลอ้างอิงทั้งหมดอยู่ในไฟล์กลาง</p><div class="bc-dialog-actions">${button('ไปตั้งค่า',{href:'#/settings',variant:'soft'})}${button('ปิด',{action:'close-dialog',variant:'secondary'})}</div>`,{label:'ข้อมูลร้านขนมบ้านสวน'});}
 if(action==='close-dialog')closeDialog();
 if(action==='demo-toast')toast('ตัวอย่างแจ้งเตือนสำเร็จ · ไม่มีการเปลี่ยนข้อมูลจริง');
 if(action==='demo-dialog')demoDialog();
 if(action==='demo-drawer')demoDialog(true);
 if(action==='demo-confirm'){closeDialog();toast('ยืนยันตัวอย่างแล้ว · ไม่มีการส่งข้อความจริง');}
 if(action==='demo-retry')toast('ลองโหลดอีกครั้งในตัวอย่างแล้ว');
 if(action==='demo-motion'){$$('.bc-sparkline path',root).forEach(path=>{path.style.animation='none';void path.getBoundingClientRect();path.style.animation='';});toast('เล่นแอนิเมชันเส้นแนวโน้มอีกครั้ง');}
 const filter=event.target.closest('[data-kit-filter]');if(filter){$$('[data-kit-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===filter)));$('#bc-kit-filter-result').innerHTML=filter.dataset.kitFilter==='done'?emptyState({title:'ยังไม่มีรายการที่แก้แล้ว',description:'ตัวอย่างสถานะไม่มีข้อมูลของคอมโพเนนต์กลาง'}):listRow({title:'เปลี่ยนกล่องให้หนาขึ้น',detail:'ต้นทุนเพิ่ม ฿3 ต่อออเดอร์',iconName:'box',label:'ดู',action:'demo-dialog'});}
 if(event.target.closest('[data-search-result]'))closeDialog();
 if(event.target.closest('[data-sheet-link]'))closeMobileMenu();
 if(!event.target.closest('#bc-notifications,.bc-notification-trigger'))closeNotifications();
 if(event.target.closest('.bc-nav-link,.bc-notice'))closeNotifications();
});
$('#bc-mobile-menu').addEventListener('toggle',event=>{const open=event.newState==='open';$('.bc-bottom-menu').setAttribute('aria-expanded',String(open));$('.bc-bottom-nav').classList.toggle('has-open-menu',open);});
$('#bc-dialog').addEventListener('click',event=>{const d=event.currentTarget;if(event.target!==d)return;const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();}if(event.key==='Escape')closeNotifications();});
window.addEventListener('hashchange',render);window.addEventListener('resize',()=>{moveIndicator();if(window.innerWidth>650)closeMobileMenu();else if($('#bc-mobile-menu').matches(':popover-open'))positionMobileMenu();});render();document.fonts.ready.then(moveIndicator);
