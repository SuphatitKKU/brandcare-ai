import {brand,metrics} from './shared/data.js';
import {icon,escapeHTML as esc,toast,shopLogo} from './shared/ui.js';
import {setupHeader} from './brand-setup.js?v=14';

// These milestones follow page 4 in MOCKUP-PAGES.md and the three dashboard tasks.
const stages=[
 {title:'รวบรวมคอมเมนต์',description:'ฟังสิ่งที่ลูกค้าพูดถึงร้าน',icon:'message',total:brand.commentsRead,end:2400,unit:'คอมเมนต์'},
 {title:'อ่านเสียงจากรีวิว',description:'มองหาคำชมและสิ่งที่ควรปรับ',icon:'star',total:brand.reviewsRead,end:4500,unit:'รีวิว'},
 {title:'เทียบกับยอดขาย',description:'เชื่อมเรื่องที่ลูกค้าพูดกับผลลัพธ์ของร้าน',icon:'up',end:6500},
 {title:'สรุปเรื่องที่ควรทำ',description:'จัดลำดับสิ่งที่ช่วยให้คุณเริ่มลงมือได้',icon:'sparkles',total:3,end:8200,unit:'เรื่อง'}
];
function currentShop(){try{const saved=JSON.parse(localStorage.getItem('brandcare:brand-setup:v1'));if(typeof saved?.name==='string'&&saved.name.trim())return saved.name.trim().slice(0,80);}catch{/* The shared brand remains available without browser storage. */}return brand.name;}

export function analysisPage(){return `<div class="bc-setup-page bc-analysis-page">${setupHeader(3)}<section class="bc-analysis-main" aria-labelledby="analysis-heading"><div class="bc-analysis-intro"><span class="bc-setup-eyebrow">ขั้นตอนสุดท้าย · ให้ผู้ช่วยรู้จักร้าน</span><h1 id="analysis-heading">กำลังเปลี่ยนเสียงลูกค้า<br>ให้เป็นแนวทางสำหรับร้านคุณ</h1><p data-analysis-subtitle>ผู้ช่วยกำลังทำความเข้าใจ <strong>${esc(currentShop())}</strong></p></div><div class="bc-analysis-workspace"><div class="bc-analysis-visual" aria-hidden="true"><div class="bc-analysis-halo"></div><div class="bc-analysis-orbit bc-analysis-orbit--outer"></div><div class="bc-analysis-orbit bc-analysis-orbit--inner"></div><span class="bc-analysis-satellite bc-analysis-satellite--message">${icon('message')}<i></i><i></i></span><span class="bc-analysis-satellite bc-analysis-satellite--star">${icon('star')}<small>${metrics.rating.toFixed(1)}</small></span><span class="bc-analysis-satellite bc-analysis-satellite--trend">${icon('up')}<i></i><i></i><i></i></span><span class="bc-analysis-particle bc-analysis-particle--one"></span><span class="bc-analysis-particle bc-analysis-particle--two"></span><div class="bc-analysis-core"><span data-analysis-core>${shopLogo()}</span><div class="bc-analysis-core-light"></div></div><span class="bc-analysis-visual-caption" data-visual-caption>${icon('sparkles')}กำลังเชื่อมทุกข้อมูลเข้าด้วยกัน</span></div><ol class="bc-analysis-stages" aria-label="ขั้นตอนการวิเคราะห์">${stages.map((stage,i)=>`<li data-analysis-stage="${i}" class="${i===0?'is-active':''}"${i===0?' aria-current="step"':''}><span class="bc-analysis-stage-mark" data-stage-mark>${i===0?'<i class="bc-analysis-mini-spinner"></i>':icon(stage.icon)}</span><div><strong>${stage.title}</strong><p>${stage.description}</p></div><span class="bc-analysis-stage-value" data-stage-value>${i===0?'0':'—'}</span><span class="bc-sr-only" data-stage-status>${i===0?'กำลังดำเนินการ':'รอดำเนินการ'}</span></li>`).join('')}</ol></div><div class="bc-analysis-progress-wrap"><div class="bc-analysis-progress-label"><span data-progress-label>กำลังรวบรวมข้อมูล</span><strong data-progress-percent aria-hidden="true">0%</strong></div><div class="bc-analysis-progress" role="progressbar" aria-label="ความคืบหน้าการเตรียมข้อมูล" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></div><div class="bc-analysis-bottom"><p data-analysis-bottom>อีกนิดเดียว ภาพรวมร้านของคุณกำลังจะพร้อม</p><a class="bc-analysis-back" href="#/connect-data">${icon('arrow')}กลับไปเลือกข้อมูล</a><a class="bc-button bc-button--primary bc-analysis-continue" href="#/today" hidden>ดูสรุปวันนี้${icon('arrow')}</a></div><span class="bc-sr-only" role="status" aria-live="polite" aria-atomic="true" data-analysis-announcement>เริ่มรวบรวมคอมเมนต์ของร้าน</span></section></div>`;}

export function mountAnalysis(root){
 const page=root.querySelector('.bc-analysis-page'),find=selector=>page.querySelector(selector),items=[...page.querySelectorAll('[data-analysis-stage]')];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let frame,redirectTimer,start,lastStage=-1,lastPercent=-1,finished=false,alive=true;
 const format=value=>value.toLocaleString('en-US');
 function finish(){
  if(finished||!alive)return;finished=true;
  page.classList.add('is-complete');find('.bc-analysis-workspace').removeAttribute('aria-busy');
  find('[data-analysis-core]').innerHTML=icon('check');const finalStep=find('.bc-setup-steps li:last-child');finalStep.classList.remove('is-current');finalStep.classList.add('is-complete');finalStep.removeAttribute('aria-current');finalStep.querySelector('span').innerHTML=icon('check');
  find('#analysis-heading').textContent='พร้อมแล้ว มาดูภาพรวมร้านกัน';
  find('[data-analysis-subtitle]').textContent=`พบ ${stages[3].total} เรื่องที่ควรทำ พร้อมให้คุณเลือกเริ่มได้เลย`;
  find('[data-visual-caption]').innerHTML=icon('check')+'ทำความเข้าใจข้อมูลเรียบร้อย';
  find('[data-progress-label]').textContent='เตรียมภาพรวมเสร็จแล้ว';
  find('[data-analysis-bottom]').textContent='กำลังพาคุณไปหน้าสรุปวันนี้…';
  find('.bc-analysis-continue').hidden=false;find('.bc-analysis-back').hidden=true;
  find('[data-analysis-announcement]').textContent=`เตรียมภาพรวมเสร็จแล้ว พบ ${stages[3].total} เรื่องที่ควรทำ กำลังไปหน้าสรุปวันนี้`;
  redirectTimer=setTimeout(()=>{if(!alive||!page.isConnected)return;location.hash='/today';toast('ตั้งค่าร้านเรียบร้อยแล้ว');},1800);
 }
 function render(elapsed){
  const index=stages.findIndex(stage=>elapsed<stage.end),complete=index===-1;
  const progressTime=reducedMotion.matches?(complete?stages[3].end:index?stages[index-1].end:0):elapsed;
  const percent=Math.max(lastPercent,Math.min(100,Math.floor(progressTime/stages[3].end*100)));
  if(percent!==lastPercent){lastPercent=percent;find('.bc-analysis-progress').setAttribute('aria-valuenow',String(percent));find('.bc-analysis-progress>span').style.width=percent+'%';find('[data-progress-percent]').textContent=percent+'%';}
  items.forEach((item,i)=>{
   const done=complete||i<index,active=i===index;
   const value=item.querySelector('[data-stage-value]');
   if(index!==lastStage){item.classList.toggle('is-done',done);item.classList.toggle('is-active',active);if(active)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');item.querySelector('[data-stage-mark]').innerHTML=done?icon('check'):active?'<i class="bc-analysis-mini-spinner"></i>':icon(stages[i].icon);item.querySelector('[data-stage-status]').textContent=done?'เสร็จแล้ว':active?'กำลังดำเนินการ':'รอดำเนินการ';}
   if(stages[i].total!==undefined&&(done||active)){const begin=i?stages[i-1].end:0,progress=done||reducedMotion.matches?1:Math.min(1,Math.max(0,(elapsed-begin)/(stages[i].end-begin)));const count=Math.floor(stages[i].total*(1-(1-progress)**2));const text=format(count);if(value.textContent!==text){value.textContent=text;value.setAttribute('aria-label',`${text} ${stages[i].unit}`);}}else value.textContent=done?'พร้อมแล้ว':active?'กำลังเทียบ…':'—';
  });
  if(index!==lastStage){lastStage=index;if(!complete){find('[data-progress-label]').textContent=stages[index].title;find('[data-analysis-announcement]').textContent=`ขั้นตอนที่ ${index+1} จาก ${stages.length}: ${stages[index].title}`;}}
  if(complete)finish();
 }
 function tick(now){if(!alive||!page.isConnected)return;if(start===undefined)start=now;render(Math.min(stages[3].end,now-start));if(!finished)frame=requestAnimationFrame(tick);}
 find('.bc-analysis-workspace').setAttribute('aria-busy','true');frame=requestAnimationFrame(tick);
 return ()=>{alive=false;cancelAnimationFrame(frame);clearTimeout(redirectTimer);};
}
