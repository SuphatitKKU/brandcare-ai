import {brand,metrics,categories,comments,issues,products,navigation} from './shared/data.js';
import {shell,icon,button,card,emptyState,listRow,escapeHTML,openDialog,closeDialog,toast,reveal,countTo,mobileMenu,mobileDestinations} from './shared/ui.js';
import {dashboard,intro} from './dashboard.js';
import {componentGallery} from './components.js';
import {loginPage,googleAccountChooser} from './login.js';
import {brandSetupPage,mountBrandSetup} from './brand-setup.js?v=14';
import {connectDataPage,mountConnectData} from './connect-data.js?v=9';
import {analysisPage,mountAnalysis} from './analysis.js?v=4';
import {issueDetailPage,approvalModalContent} from './issue-detail.js?v=1';
import {commentsPage,setupComments,relatedIssueSummaryPage,showCommentDetail,resetCommentDetailDialog,handleCommentAction} from './comments.js?v=4';
import {salesPage,aiSalesPage,salesReviewDetailPage} from './sales.js?v=15';

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
document.querySelector('#app').innerHTML=shell();
const root=$('#bc-main');
let cleanupReveal;
let cleanupPage;
let route='today';
let loginTransitionTimer;
let commentsListScrollY=null;
let previousRouteHash=location.hash;

// หน้า Login, Dashboard, หน้ารายละเอียดปัญหา (กล่องบุบ) และหน้าอนุมัติพร้อมใช้งาน ส่วนหน้าอื่นเป็นจุดเชื่อมต่อรอพัฒนา
const futureRoutes={
 issues:{title:'รายการปัญหา',page:6,owner:'ภูมิ',next:{href:'#/issues/packaging',label:'ไปหน้า 7 รายละเอียดปัญหา'}},
 comments:{title:'คอมเมนต์',page:9,owner:'หยุ่น',next:{href:'#/comments/1',label:'ไปหน้า 10 รายละเอียดคอมเมนต์'}},
 sales:{title:'ยอดขายและรีวิว',page:11,owner:'หยุ่น',next:{href:'#/sales/butter',label:'ไปหน้า 12 รายละเอียดสินค้า'}},
 festivals:{title:'ปฏิทินเทศกาล',page:13,owner:'เจด้า',next:{href:'#/festivals/11-11',label:'ไปหน้า 14 แผนคอนเทนต์ 11.11'}},
 ai:{title:'ถาม AI',page:15,owner:'เจด้า',next:{href:'#/issues/packaging',label:'ดูหลักฐานปัญหา (หน้า 7)'}},
 line:{title:'แจ้งเตือนทาง LINE',page:16,owner:'เจด้า',next:{href:'#/issues/packaging',label:'เปิดดูรายละเอียดในแอป (หน้า 7)'}},
 settings:{title:'ตั้งค่า',page:17,owner:'เจด้า',next:{href:'#/brand-setup?from=settings',label:'แก้ไขข้อมูลแบรนด์ (หน้า 2)'}}
};

function destinationPage(parts){
 const name=parts[0];
 if(name==='comments'&&parts[1])return {title:'รายละเอียดคอมเมนต์: #'+parts[1],page:10,owner:'หยุ่น',next:{href:'#/issues/packaging',label:'ดูปัญหาที่เกี่ยวข้อง (หน้า 7)'}};
 if(name==='sales'&&parts[1])return {title:'รายละเอียดสินค้า: ทองม้วนกรอบ',page:12,owner:'หยุ่น',next:{href:'#/sales',label:'กลับยอดขายและรีวิว (หน้า 11)'}};
 if(name==='festivals'&&parts[1])return {title:'แผนคอนเทนต์เทศกาล: 11.11',page:14,owner:'เจด้า',next:{href:'#/festivals',label:'กลับปฏิทินเทศกาล (หน้า 13)'}};
 return futureRoutes[name];
}

function futurePage(parts){
 const target=destinationPage(parts);
 if(!target) return `<div class="bc-page">${intro('ไม่พบหน้าที่ต้องการ','เลือกเมนูด้านบนเพื่อกลับไปดูแลร้าน',{date:false})}${emptyState({title:'ลิงก์นี้ยังไม่มีในแผน',action:button('กลับสรุปวันนี้',{href:'#/today'})})}</div>`;
 const actions=`<div class="bc-dialog-actions" style="justify-content:center;margin-top:20px;gap:12px">${target.next?button(target.next.label,{href:target.next.href,iconName:'arrow',variant:'primary'}):''}${target.page===15?button('ดูหลักฐานคอมเมนต์ตัวอย่าง',{href:'#/comments/2?from=ai',iconName:'message',variant:'soft'}):''}${button('กลับสรุปวันนี้',{href:'#/today',variant:'secondary',iconName:'arrow'})}</div>`;
 return `<div class="bc-page">${intro(target.title,'เตรียมโครงหน้าร่วมและจุดเชื่อมต่อไว้แล้ว สำหรับงานของทีม',{eyebrow:'BrandCare AI · จุดเชื่อมต่อหน้า '+target.page+(target.owner?' ('+target.owner+')':''),date:false})}${card({title:'หน้านี้จะทำในรอบถัดไป',eyebrow:'ขอบเขต: จุดเชื่อมต่อระบบและโครงสร้างร่วม',content:emptyState({title:'Header และ Shared UI พร้อมแล้ว รอพัฒนาเนื้อหาในรอบถัดไป',description:target.owner?('ผู้รับผิดชอบ: '+target.owner+' · ลิงก์นี้เชื่อมต่อตาม Flow ข้อ 3 ใน MOCKUP-PAGES.md เรียบร้อยแล้ว'):'ปุ่มนี้พามาถูกตำแหน่งตามแผน',iconName:parts[0]==='ai'?'sparkles':parts[0]==='line'?'bell':parts[0]==='festivals'?'calendar':parts[0]==='sales'?'box':'link',action:actions})})}${target.page===17?button('แก้ไขข้อมูลแบรนด์',{href:'#/brand-setup?from=settings',variant:'soft'})+button('จัดการบัญชีที่เชื่อม',{href:'#/connect-data?from=settings',variant:'soft'}):''}<div class="bc-context-note">${icon('shield')}หน้า ${target.page}${target.owner?' ('+target.owner+')':''} ยังไม่ถือว่าเสร็จ · โครงสร้างและจุดเชื่อมต่อพร้อมส่งต่อให้ทีม</div></div>`;
}

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

function commentReturnHref(){
 const [path,query='']=location.hash.replace(/^#\/?/,'').split('?');
 const [rootPath,commentId]=path.split('/');
 const params=new URLSearchParams(query);
 if(rootPath!=='comments'||!commentId)return '#/comments';
 const origin=params.get('from');
 if(origin==='issues/packaging')return '#/issues/packaging';
 if(origin==='ai')return '#/ai';
 const listParams=new URLSearchParams();
 for(const key of ['issue','category'])if(params.has(key))listParams.set(key,params.get(key));
 return '#/comments'+(listParams.size?'?'+listParams.toString():'');
}

function closeActiveDialog(){
 const dialog=$('#bc-dialog');
 const isCommentDetail=dialog.classList.contains('bc-dialog--comment-detail');
 const returnHref=isCommentDetail?commentReturnHref():'';
 if(isCommentDetail)resetCommentDetailDialog();
 if(dialog.open)closeDialog();
 if(isCommentDetail&&location.hash!==returnHref)location.hash=returnHref;
}

function render(){
 const cameFromCommentDetail=previousRouteHash.replace(/^#\/?/,'').startsWith('comments/');
 previousRouteHash=location.hash;
 clearTimeout(loginTransitionTimer);cleanupPage?.();cleanupPage=undefined;
 closeMobileMenu();cleanupReveal?.();if($('#bc-dialog').open)closeDialog();resetCommentDetailDialog();closeNotifications();
 const hash=decodeURIComponent(location.hash.replace(/^#\/?/,''));
 const [rawPath,queryString]=hash.split('?');
 const parts=(rawPath||'login').split('/');
 route=parts[0];
 const subId=parts[1];
 const isApprove=parts[2]==='approve';
 const params=new URLSearchParams(queryString||'');
 const isTracking=params.get('status')==='tracking';
 const isPackagingIssue=route==='issues'&&subId==='packaging';

 if(route==='login') {
  root.innerHTML=loginPage();
 } else if(route==='brand-setup') {
  root.innerHTML=brandSetupPage();
  cleanupPage=mountBrandSetup(root);
 } else if(route==='connect-data') {
  root.innerHTML=connectDataPage();
  cleanupPage=mountConnectData(root);
 } else if(route==='analyzing') {
  root.innerHTML=analysisPage();
  cleanupPage=mountAnalysis(root);
 } else if(route==='today') {
  root.innerHTML=dashboard();
 } else if(route==='sales'&&!subId) {
  if(params.get('view')==='reviews'&&params.get('channel')==='line'){
   params.set('channel','all');
   history.replaceState(history.state,'',`#/${route}?${params.toString()}`);
  }
  root.innerHTML=salesPage(params);
 } else if(route==='ai'&&params.get('from')==='sales') {
  root.innerHTML=aiSalesPage(params);
 } else if(route==='components') {
  root.innerHTML=componentGallery();
  } else if(route==='comments') {
   if(subId&&params.get('from')==='sales-review') root.innerHTML=salesReviewDetailPage(subId,params);
   else if(subId&&params.get('from')==='issues/packaging') root.innerHTML=issueDetailPage();
   else if(subId&&params.get('from')==='ai') root.innerHTML=futurePage(['ai']);
   else {root.innerHTML=commentsPage(params);setupComments(root);}
   if(subId&&params.get('from')!=='sales-review')showCommentDetail(subId);
  } else if(isPackagingIssue) {
  root.innerHTML=issueDetailPage({status:isTracking?'tracking':'new'});
  if(isApprove) {
   setTimeout(()=>{
    openDialog(approvalModalContent(),{label:'อนุมัติแนวทางแก้และส่งข้อความ',sheet:window.innerWidth<=650});
   },60);
   }
  } else if(route==='issues'&&subId&&issues.some(issue=>issue.id===subId)) {
   root.innerHTML=relatedIssueSummaryPage(subId);
 } else if(futureRoutes[route]||destinationPage(parts)) {
  root.innerHTML=futurePage(parts);
 } else {
  root.innerHTML=`<div class="bc-page">${intro('ไม่พบหน้าที่ต้องการ','เลือกเมนูด้านบนเพื่อกลับไปดูแลร้าน',{date:false})}${emptyState({title:'ลิงก์นี้ยังไม่มีในแผน',action:button('กลับสรุปวันนี้',{href:'#/today'})})}</div>`;
 }

 const pageTitle=route==='login'?'เข้าสู่ระบบ':route==='brand-setup'?'ตั้งค่าแบรนด์':route==='connect-data'?'เชื่อมต่อข้อมูล':route==='analyzing'?'วิเคราะห์ข้อมูล':route==='today'?'สรุปวันนี้':route==='components'?'ชุดคอมโพเนนต์':route==='comments'?(subId?(params.get('from')==='sales-review'?'รายละเอียดรีวิว':'รายละเอียดคอมเมนต์'):'คอมเมนต์'):route==='issues'&&subId?issues.find(issue=>issue.id===subId)?.title||'รายละเอียดปัญหา':isPackagingIssue?(isTracking?'ติดตามผล: กล่องบุบ (ผลจำลอง)':'รายละเอียดปัญหา: กล่องบุบ'):futureRoutes[route]?.title||'ไม่พบหน้า';
 document.title=pageTitle+' · BrandCare AI';

 $$('.bc-nav-link').forEach(link=>{const active=link.getAttribute('href')==='#/'+route;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 $$('.bc-bottom-link').forEach(link=>{const active=link.dataset.route===route;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 $('.bc-bottom-menu').classList.toggle('is-active',!mobileDestinations.some(n=>n.id===route));
 moveIndicator();cleanupReveal=reveal(root);
 if(route==='comments'&&!subId&&cameFromCommentDetail&&commentsListScrollY!==null){window.scrollTo({top:commentsListScrollY,behavior:'instant'});commentsListScrollY=null;}
 else window.scrollTo({top:0,behavior:'instant'});
 if(route==='today'){const values=$$('.bc-metric-number>strong');countTo(values[0],metrics.complaints);countTo(values[1],metrics.revenue,{prefix:'฿'});countTo(values[2],metrics.rating,{decimals:1});countTo($('[data-count]'),metrics.carrierShare);}
 if(isPackagingIssue){
  const compVal=$('#issue-count-val');if(compVal)countTo(compVal,isTracking?4:23);
  const revVal=$('#issue-rev-val');if(revVal)countTo(revVal,isTracking?28900:22000,{prefix:'฿'});
  const rateVal=$('#issue-rate-val');if(rateVal)countTo(rateVal,isTracking?4.7:4.5,{decimals:1});
 }
 if(new URLSearchParams(location.search).get('menu')==='open'){
  setTimeout(()=>{
   $('#bc-mobile-menu').innerHTML=mobileMenu(route);
   positionMobileMenu();
   try{$('#bc-mobile-menu').showPopover();}catch(e){}
  },150);
 }
}

const searchable=[
 ...navigation.map(n=>({title:n.label,detail:'เมนูหลัก · หน้า '+n.page,href:'#/'+n.id,icon:'link'})),
 ...issues.map(i=>({title:i.title,detail:i.count+' คอมเมนต์ · '+i.subtitle,href:'#/issues/'+i.id,icon:'alert'})),
 ...comments.map(c=>({title:c.user+' · '+c.text,detail:c.topic+' · '+categories[c.category].label,href:'#/comments/'+c.id,icon:'message'})),
 ...products.map(p=>({title:p.name,detail:p.size+' · ฿'+p.price,href:'#/sales/'+p.id,icon:'box'})),
 {title:'11.11',detail:'อีก 20 วัน · เทศกาลที่ใกล้ถึง · หน้า 13-14',href:'#/festivals/11-11',icon:'calendar'},
 {title:'กล่องบุบ ทองม้วนแตก',detail:'คำบ่นเพิ่ม 340% (23 คอมเมนต์) · หน้า 7',href:'#/issues/packaging',icon:'alert'},
 {title:'อนุมัติและส่งข้อความ',detail:'ส่งข้อความขอโทษ 23 คน · หน้า 8',href:'#/issues/packaging/approve',icon:'arrow'},
 {title:'แจ้งเตือนทาง LINE',detail:'ข้อความสรุปเช้า 08:00 · หน้า 16',href:'#/line',icon:'bell'}
];
function searchResults(query){const q=query.toLocaleLowerCase('th').trim();const found=q?searchable.filter(item=>(item.title+' '+item.detail).toLocaleLowerCase('th').includes(q)):searchable.slice(0,7);$('#bc-search-count').textContent=q?`พบ ${found.length} รายการในข้อมูลจำลอง`:'เลือกเมนู หรือพิมพ์คำค้น เช่น “กล่องบุบ”';$('#bc-search-results').innerHTML=found.length?found.map(item=>`<a class="bc-search-result" href="${item.href}" data-search-result>${icon(item.icon)}<span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.detail)}</small></span>${icon('chevron')}</a>`).join(''):emptyState({title:'ไม่พบผลการค้นหา',description:'ลองค้นหาชื่อสินค้า คอมเมนต์ หรือคำว่า กล่องบุบ',iconName:'search'});}
function openSearch(){closeMobileMenu();closeNotifications();openDialog(`<h2>ค้นหาในร้าน</h2><label class="bc-search-field">${icon('search')}<input id="bc-global-search" type="search" placeholder="ค้นหาปัญหา คอมเมนต์ หรือสินค้า" aria-label="ค้นหาปัญหา คอมเมนต์ หรือสินค้า" autocomplete="off"></label><p id="bc-search-count" class="bc-notice-title" role="status"></p><div class="bc-search-results" id="bc-search-results"></div>`,{label:'ค้นหาในร้าน'});searchResults('');$('#bc-global-search').addEventListener('input',event=>searchResults(event.target.value));$('#bc-global-search').focus();}
function demoDialog(drawer=false){openDialog(`<h2>${drawer?'แผงรายละเอียด':'ตรวจทานก่อนยืนยัน'}</h2><p class="bc-dialog-description">หน้าต่างนี้ใช้รูปแบบเดียวกันได้ทุกหน้า รองรับการปิดด้วย Esc การจัดการโฟกัส และการใช้งานด้วยคีย์บอร์ด</p><div class="bc-state-message">${icon('shield')}เป็นการสาธิต UI ไม่มีการส่งข้อความหรือเปลี่ยนข้อมูลจริง</div><label class="bc-field-label" for="bc-demo-note">บันทึกตัวอย่าง</label><textarea class="bc-textarea" id="bc-demo-note" placeholder="พิมพ์ข้อความเพื่อทดลองคอมโพเนนต์"></textarea><div class="bc-dialog-actions">${button('ยกเลิก',{action:'close-dialog',variant:'secondary'})}${button('ยืนยันตัวอย่าง',{action:'demo-confirm'})}</div>`,{drawer,label:drawer?'ตัวอย่างแผงรายละเอียด':'ตัวอย่างหน้าต่างยืนยัน'});}

document.addEventListener('click',event=>{
 if(event.target.closest('.bc-skip')){event.preventDefault();root.focus({preventScroll:true});root.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const commentLink=event.target.closest('a[href^="#/comments/"]');
 if(commentLink&&route==='comments'&&!$$('.bc-dialog--comment-detail[open]').length)commentsListScrollY=window.scrollY;
 const action=event.target.closest('[data-action]')?.dataset.action;
  if(handleCommentAction(action,event))return;
  if(action==='close-comment-detail'){closeActiveDialog();return;}
 if(action==='login-mode'){if(event.target.closest('[data-mode]').getAttribute('aria-pressed')==='true')return;const signup=event.target.closest('[data-mode]').dataset.mode==='signup';$$('[data-action="login-mode"]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.mode===(signup?'signup':'signin'))));$('#login-heading').textContent=signup?'เริ่มต้นดูแลแบรนด์ของคุณ':'ยินดีต้อนรับกลับมา';$('.bc-login-description').textContent=signup?'สร้างบัญชี แล้วมารู้จักร้านของคุณกัน':'ให้ทุกวันของการดูแลร้าน เป็นเรื่องง่ายขึ้น';$('.bc-login-submit').textContent=signup?'สมัครสมาชิก':'เข้าสู่ระบบ';$('.bc-login-options').hidden=signup;$('#bc-login-form').reset();$('#bc-login-password').type='password';$('[data-action="login-password"]').setAttribute('aria-label','แสดงรหัสผ่าน');$('[data-action="login-password"]').setAttribute('aria-pressed','false');if(!matchMedia('(prefers-reduced-motion: reduce)').matches){[$('#login-heading'),$('.bc-login-description'),$('#bc-login-form')].forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});});}}
 if(action==='login-password'){const input=$('#bc-login-password');const visible=input.type==='password';input.type=visible?'text':'password';const trigger=event.target.closest('[data-action]');trigger.setAttribute('aria-label',visible?'ซ่อนรหัสผ่าน':'แสดงรหัสผ่าน');trigger.setAttribute('aria-pressed',String(visible));}
 if(action==='login-forgot')openDialog(`<h2>ลืมรหัสผ่าน?</h2><p class="bc-dialog-description">การกู้คืนรหัสผ่านยังไม่เปิดให้บริการ</p><div class="bc-dialog-actions">${button('กลับไปเข้าสู่ระบบ',{action:'close-dialog'})}</div>`,{label:'ลืมรหัสผ่าน'});
 if(action==='login-google')openDialog(googleAccountChooser(),{label:'เลือกบัญชีเพื่อเข้าสู่ระบบด้วย Google'});
 if(action==='mobile-menu'){closeNotifications();$('#bc-mobile-menu').innerHTML=mobileMenu(route);positionMobileMenu();}
 if(action==='close-mobile-menu')closeMobileMenu();
 if(action==='search')openSearch();
 if(action==='notifications'){const el=$('#bc-notifications');el.hidden=!el.hidden;$('.bc-notification-trigger').setAttribute('aria-expanded',String(!el.hidden));}
 if(action==='close-notifications')closeNotifications();
 if(action==='profile'){closeNotifications();openDialog(`<h2>${brand.name}</h2><p class="bc-dialog-description">${brand.location} · ขายออนไลน์ตั้งแต่ปี 2022</p><div class="bc-detail-row"><span>เจ้าของร้าน</span><strong>${brand.owner}</strong></div><div class="bc-detail-row"><span>น้ำเสียงของแบรนด์</span><strong>${brand.tone}</strong></div><div class="bc-detail-row"><span>คอมเมนต์ที่ AI อ่านในตัวอย่าง</span><strong>1,284 รายการ</strong></div><p class="bc-dialog-description">ร้านและผู้ใช้เป็นข้อมูลสมมติตามแผน ข้อมูลอ้างอิงทั้งหมดอยู่ในไฟล์กลาง</p><div class="bc-dialog-actions">${button('ออกจากระบบ',{href:'#/login',variant:'danger'})}${button('ไปตั้งค่า',{href:'#/settings',variant:'soft'})}${button('ปิด',{action:'close-dialog',variant:'secondary'})}</div>`,{label:'ข้อมูลร้านขนมบ้านสวน'});}
 if(action==='login-use-email'){closeDialog();$('#bc-login-address').focus();}
  if(action==='close-dialog')closeActiveDialog();
 if(action==='open-approval'){
  closeNotifications();
  closeMobileMenu();
  openDialog(approvalModalContent(),{label:'อนุมัติแนวทางแก้และส่งข้อความ',sheet:window.innerWidth<=650});
 }
 if(action==='confirm-approval'){
  closeDialog();
  toast('ส่งแล้ว 23 ข้อความ');
  location.hash='#/issues/packaging?status=tracking';
 }
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

$('#bc-mobile-menu').addEventListener('toggle',event=>{const open=event.newState==='open';if(open)positionMobileMenu();$('.bc-bottom-menu').setAttribute('aria-expanded',String(open));$('.bc-bottom-nav').classList.toggle('has-open-menu',open);});
$('#bc-dialog').addEventListener('click',event=>{const d=event.currentTarget;if(event.target!==d)return;const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeActiveDialog();});
$('#bc-dialog').addEventListener('close',event=>{const dialog=event.currentTarget;const id=dialog.dataset.commentDetailId;if(!id)return;const [path]=location.hash.replace(/^#\/?/,'').split('?');if(path===`comments/${id}`)location.hash=commentReturnHref();resetCommentDetailDialog();});
$('#bc-dialog').addEventListener('cancel',event=>{const preview=$('#bc-dialog [data-comment-source-preview]');if(preview&&!preview.hidden){event.preventDefault();handleCommentAction('close-comment-source');}});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();}if(event.key==='Escape')closeNotifications();});

function setLoginFieldError(input,message){
 const error=document.getElementById(input.id+'-error');
 error.hidden=!message;error.querySelector('span').textContent=message;
 if(message){input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby',error.id);}
 else{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');}
}
function validateLoginField(input){
 let message='';
 if(!input.value.trim())message=input.id==='bc-login-address'?'กรุณากรอกอีเมลของคุณ':'กรุณากรอกรหัสผ่านของคุณ';
 else if(input.type==='email'&&input.validity.typeMismatch)message='กรุณากรอกอีเมลให้ถูกต้อง เช่น name@example.com';
 setLoginFieldError(input,message);return !message;
}
document.addEventListener('input',event=>{if(event.target.matches('#bc-login-form input[aria-invalid="true"]'))validateLoginField(event.target);});
document.addEventListener('reset',event=>{if(event.target.id!=='bc-login-form')return;$$('.bc-login-field input',event.target).forEach(input=>setLoginFieldError(input,''));$('#bc-login-validation').textContent='';});
document.addEventListener('submit',event=>{
 if(event.target.id!=='bc-login-form')return;
 event.preventDefault();const form=event.target;
 if(form.getAttribute('aria-busy')==='true')return;
 const invalid=$$('.bc-login-field input',form).filter(input=>!validateLoginField(input));
 if(invalid.length){$('#bc-login-validation').textContent=`กรุณาตรวจสอบข้อมูล ${invalid.length} ช่องที่ระบุ`;invalid[0].focus();return;}
 $('#bc-login-validation').textContent='';
 const signup=$('[data-mode="signup"]').getAttribute('aria-pressed')==='true';
 form.setAttribute('aria-busy','true');
 $$('.bc-login-welcome button,.bc-login-welcome input').forEach(el=>el.disabled=true);
 $('.bc-login-submit').innerHTML=`<span class="bc-login-spinner" aria-hidden="true"></span><span role="status">${signup?'กำลังสร้างบัญชี…':'กำลังเข้าสู่ระบบ…'}</span>`;
 loginTransitionTimer=setTimeout(()=>{
  if(!form.isConnected||route!=='login')return;
  form.reset();$('.bc-login-page').classList.add('is-leaving');
  loginTransitionTimer=setTimeout(()=>{if(form.isConnected&&route==='login')location.hash='/brand-setup';},180);
 },650);
});

window.addEventListener('hashchange',render);window.addEventListener('resize',()=>{moveIndicator();if(window.innerWidth>650)closeMobileMenu();else if($('#bc-mobile-menu').matches(':popover-open'))positionMobileMenu();});render();document.fonts.ready.then(moveIndicator);
