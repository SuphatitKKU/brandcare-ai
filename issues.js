import {issues,comments,platforms} from './shared/data.js';
import {icon,issueCard,emptyState,escapeHTML,button,commentCard,severity} from './shared/ui.js';

const states=[['all','ทั้งหมด'],['new','ใหม่'],['working','กำลังแก้'],['tracking','ติดตามผล'],['done','แก้แล้ว']];
const levels={critical:'รุนแรง',medium:'ปานกลาง',low:'ต่ำ',opportunity:'โอกาส'};
// The shared dataset contains four new issues. Do not invent resolved work.
const issueState=()=> 'new';
export function issuesPage(){
 return `<div class="bc-page bc-issues-page"><header class="bc-issues-intro"><div><span class="bc-issues-eyebrow">ฟังเสียงลูกค้า แล้วดูแลให้ตรงจุด</span><h1>รายการปัญหา</h1><p>เห็นเรื่องที่ควรดูแล และโอกาสดี ๆ ของร้านในที่เดียว</p></div><a class="bc-issues-back" href="#/today">สรุปวันนี้ ${icon('arrow')}</a></header>
 <section class="bc-issues-overview" aria-label="ภาพรวมรายการ"><div><span class="bc-issues-stat-icon">${icon('message')}</span><span><strong>${issues.length}</strong><small>เรื่องที่พบ</small></span></div><div><span class="bc-issues-stat-icon urgent">${icon('alert')}</span><span><strong>${issues.filter(i=>i.severity==='critical').length}</strong><small>ควรดูแลก่อน</small></span></div><div><span class="bc-issues-stat-icon opportunity">${icon('bulb')}</span><span><strong>${issues.filter(i=>i.severity==='opportunity').length}</strong><small>โอกาสของร้าน</small></span></div></section>
 <a class="bc-issues-focus" href="#/issues/packaging"><span class="bc-issues-focus-icon">${icon('sparkles')}</span><div><span>ผู้ช่วยแนะนำให้เริ่มตรงนี้</span><h2>${escapeHTML(issues[0].title)}</h2><p>${issues[0].count} คอมเมนต์ใน ${issues[0].period} · คำบ่นเพิ่มขึ้น ${issues[0].growth}</p></div><span class="bc-issues-focus-cta">ดูแนวทางแก้ ${icon('arrow')}</span></a>
 <section class="bc-issues-workspace" aria-label="ค้นหาและกรองรายการปัญหา"><div class="bc-issues-tabs" role="group" aria-label="สถานะปัญหา">${states.map(([value,label])=>`<button type="button" data-issue-state="${value}" aria-pressed="${value==='all'}">${label}<span>${value==='all'?issues.length:issues.filter(i=>issueState(i)===value).length}</span></button>`).join('')}</div>
 <div class="bc-issues-filters"><label class="bc-issues-search">${icon('search')}<input type="search" id="issues-search" aria-label="ค้นหาปัญหา" placeholder="ค้นหาปัญหาหรือสิ่งที่ลูกค้าพูดถึง" autocomplete="off"></label><label class="bc-issues-select"><span>ระดับ</span><select id="issues-level" aria-label="ระดับความรุนแรง"><option value="all">ทุกระดับ</option>${Object.entries(levels).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>${icon('down')}</label><label class="bc-issues-select"><span>ช่องทาง</span><select id="issues-platform" aria-label="ช่องทาง"><option value="all">ทุกช่องทาง</option>${Object.entries(platforms).map(([v,p])=>`<option value="${v}">${p.name}</option>`).join('')}</select>${icon('down')}</label></div>
 <div class="bc-issues-result-head"><p id="issues-count" role="status" aria-live="polite"></p><button type="button" id="issues-reset" hidden>ล้างตัวกรอง</button><label class="bc-issues-sort">เรียงตาม<select id="issues-sort" aria-label="เรียงรายการ"><option value="priority">ควรดูแลก่อน</option><option value="comments">คอมเมนต์มากที่สุด</option></select>${icon('down')}</label></div><div id="issues-results" class="bc-issues-grid"></div></section></div>`;
}
export function mountIssues(root){
 const page=root.querySelector('.bc-issues-page');
 const query=page.querySelector('#issues-search'),level=page.querySelector('#issues-level'),channel=page.querySelector('#issues-platform'),sort=page.querySelector('#issues-sort'),reset=page.querySelector('#issues-reset');
 let state='all';
 function update(){
  const term=query.value.trim().toLocaleLowerCase('th');
  const matching=issues.filter(i=>(state==='all'||issueState(i)===state)&&(level.value==='all'||i.severity===level.value)&&(channel.value==='all'||i.platforms.includes(channel.value))&&`${i.title} ${i.subtitle}`.toLocaleLowerCase('th').includes(term));
  if(sort.value==='comments')matching.sort((a,b)=>b.count-a.count);
  page.querySelector('#issues-count').textContent=`${matching.length} เรื่อง${matching.length!==issues.length?` จากทั้งหมด ${issues.length} เรื่อง`:''}`;
  reset.hidden=!(term||state!=='all'||level.value!=='all'||channel.value!=='all');
  page.querySelector('#issues-results').innerHTML=matching.length?matching.map(i=>issueCard(i)).join(''):emptyState({title:state!=='all'&&!term&&level.value==='all'&&channel.value==='all'?`ยังไม่มีเรื่องที่${states.find(s=>s[0]===state)[1]}`:'ไม่พบเรื่องที่ตรงกับตัวกรอง',description:'ลองเปลี่ยนสถานะ คำค้นหา หรือล้างตัวกรองเพื่อดูเรื่องอื่น',iconName:'search'});
 }
 function onClick(event){
  const tab=event.target.closest('[data-issue-state]');
  if(tab){state=tab.dataset.issueState;page.querySelectorAll('[data-issue-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));update();}
  if(event.target.closest('#issues-reset')){state='all';query.value='';level.value=channel.value='all';page.querySelectorAll('[data-issue-state]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.issueState==='all')));update();}
 }
 page.addEventListener('click',onClick);query.addEventListener('input',update);[level,channel,sort].forEach(el=>el.addEventListener('change',update));update();
 return ()=>{page.removeEventListener('click',onClick);query.removeEventListener('input',update);[level,channel,sort].forEach(el=>el.removeEventListener('change',update));};
}

// Supporting evidence for the other shared issues; packaging keeps the team's full detail page.
export function issueEvidencePage(id){
 const issue=issues.find(i=>i.id===id);
 if(!issue)return `<div class="bc-page">${emptyState({title:'ไม่พบเรื่องนี้',action:button('กลับรายการปัญหา',{href:'#/issues'})})}</div>`;
 const evidence=comments.filter(c=>c.issue===id);
 return `<div class="bc-page bc-issues-evidence">${button('กลับรายการปัญหา',{href:'#/issues',variant:'text'})}<header>${severity(issue.severity)}<h1>${escapeHTML(issue.title)}</h1><p>${escapeHTML(issue.subtitle)}</p></header><section aria-label="เสียงจากลูกค้า"><div class="bc-section-heading"><h2>เสียงจากลูกค้าที่เกี่ยวข้อง</h2><span>${issue.count} คอมเมนต์ / ${issue.period}</span></div><div class="bc-comments-grid">${evidence.length?evidence.map(c=>commentCard(c)).join(''):emptyState({title:'ยังไม่มีข้อความที่แสดงได้',description:'กลับไปดูเรื่องอื่นในรายการปัญหา'})}</div></section></div>`;
}
