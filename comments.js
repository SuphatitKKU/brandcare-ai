import {brand,categories,comments,issues,metrics,platforms,products,replyDraft} from './shared/data.js';
import {badge,button,emptyState,escapeHTML,icon,openDialog,platform,severity,sparkline,toast} from './shared/ui.js';
import {intro} from './dashboard.js';

const replyDrafts=new Map([[1,replyDraft],[2,'ขอบคุณที่รีวิวและบอกกันนะคะ บ้านสวนขออภัยที่กล่องไปถึงในสภาพไม่เรียบร้อย ขออนุญาตทักไปดูแลและตรวจสอบรายละเอียดเพิ่มเติมนะคะ']]);

const sentimentByCategory={urgent:'เชิงลบ',drama:'ผสม',idea:'สนใจสินค้าใหม่',praise:'เชิงบวก',intent:'สนใจซื้อ',competitor:'เชิงลบ'};

function analysisFor(comment){
 if(comment.id===1)return {sentiment:'เชิงลบ',rationale:'ลูกค้าระบุว่าทองม้วนแตกและกล่องบุบ พร้อมบอกว่าเสียดาย จึงจัดเป็นเรื่องที่ควรตอบด่วน'};
 if(comment.id===2)return {sentiment:'ผสม',rationale:'คลิปกล่าวถึงกล่องยับและขนมแตก แต่ยังชมรสชาติ จึงติดป้ายเสี่ยงดราม่าเพื่อให้ร้านตรวจบทสนทนาสาธารณะนี้'};
 const topic=comment.topic||'สินค้า';
 const rationale=comment.category==='praise'
  ?`ลูกค้าชม${topic}และเล่าประสบการณ์ที่ดี จึงจัดเป็นคำชม`
  :comment.category==='intent'
   ?`ลูกค้าถามข้อมูลเพื่อซื้อ จึงจัดเป็นความต้องการซื้อ`
   :comment.category==='idea'
    ?`ลูกค้าเสนอความคิดเห็นเกี่ยวกับ${topic} จึงจัดเป็นไอเดียสินค้า`
    :comment.category==='competitor'
     ?'ข้อความเปรียบเทียบสินค้ากับร้านอื่น จึงจัดเป็นการพูดถึงคู่แข่ง'
     :`ข้อความระบุปัญหาเกี่ยวกับ${topic} จึงจัดเป็นเรื่องที่ควรตรวจสอบ`;
 return {sentiment:sentimentByCategory[comment.category]||'ยังไม่ระบุ',rationale};
}

function commentHref(comment,{issueId='',category=''}={}){
 const query=new URLSearchParams({from:'comments'});
 if(issueId)query.set('issue',issueId);
 if(category)query.set('category',category);
 return `#/comments/${comment.id}?${query.toString()}`;
}

const categoryOrder=['urgent','drama','idea','praise','intent','competitor'];
const commentFilterDefaults={category:'all',platform:'all',product:'all',period:'all',sort:'important'};
const periodHours={'24h':24,'7d':168,'30d':720};
function commentFilters(params){return Object.fromEntries(Object.entries(commentFilterDefaults).map(([key,fallback])=>{const value=params.get(key);const allowed=key==='category'?['all',...categoryOrder]:key==='platform'?['all',...Object.keys(platforms)]:key==='product'?['all',...products.map(product=>product.id)]:key==='period'?['all',...Object.keys(periodHours)]:['important','newest','oldest'];return [key,allowed.includes(value)?value:fallback];}));}
function scopedComments(filters){return comments.filter(item=>(filters.platform==='all'||item.platform===filters.platform)&&(filters.product==='all'||item.productId===filters.product)&&(filters.period==='all'||(item.ageHours??Infinity)<=periodHours[filters.period]));}
function commentSelect(label,name,options,value){return `<label class="bc-comments-select"><span>${label}</span><select data-comment-filter="${name}" aria-label="${label}">${options.map(([id,text])=>`<option value="${id}"${value===id?' selected':''}>${escapeHTML(text)}</option>`).join('')}</select></label>`;}
function commentFiltersMarkup(filters){
 const items=scopedComments(filters), counts=Object.fromEntries(categoryOrder.map(category=>[category,items.filter(item=>item.category===category).length]));
 const chips=`<div class="bc-comment-categories" role="group" aria-label="กรองตามประเภท"><button class="bc-comment-chip${filters.category==='all'?' is-selected':''}" data-comment-category="all" aria-pressed="${filters.category==='all'}">ทั้งหมด <span>${items.length}</span></button>${categoryOrder.map(key=>`<button class="bc-comment-chip${filters.category===key?' is-selected':''}" data-comment-category="${key}" aria-pressed="${filters.category===key}">${badge(key)} <span>${counts[key]}</span></button>`).join('')}</div>`;
 const selects=`${commentSelect('แพลตฟอร์ม','platform',[['all','ทุกแพลตฟอร์ม'],...Object.entries(platforms).map(([id,item])=>[id,item.name])],filters.platform)}${commentSelect('สินค้า','product',[['all','สินค้าทั้งหมด'],...products.map(item=>[item.id,item.name])],filters.product)}${commentSelect('ช่วงเวลา','period',[['all','ทั้งหมด'],['24h','24 ชั่วโมง'],['7d','7 วัน'],['30d','30 วัน']],filters.period)}${commentSelect('เรียงตาม','sort',[['important','สำคัญที่สุด'],['newest','ใหม่ที่สุด'],['oldest','เก่าที่สุด']],filters.sort)}`;
 return {chips,selects};
}
function sortedComments(items,sort){return [...items].sort((a,b)=>sort==='newest'?(a.ageHours??Infinity)-(b.ageHours??Infinity):sort==='oldest'?(b.ageHours??-Infinity)-(a.ageHours??-Infinity):categoryOrder.indexOf(a.category)-categoryOrder.indexOf(b.category)||(b.likesCount??0)-(a.likesCount??0)||(a.ageHours??Infinity)-(b.ageHours??Infinity));}
function commentRow(item){return `<a class="bc-comment-row" href="${commentHref(item)}" aria-label="เปิดคอมเมนต์จาก ${escapeHTML(item.user)}"><div class="bc-comment-row-top">${platform(item.platform)}<span>${escapeHTML(item.time)}</span></div><div class="bc-comment-row-body"><strong>${escapeHTML(item.user)}</strong><p>${escapeHTML(item.text)}</p></div><div class="bc-comment-row-bottom">${badge(item.category)}<span class="bc-comment-topic">${icon('sparkles')}หัวข้อ · ${escapeHTML(item.topic||'ยังไม่ระบุ')}</span><span class="bc-comment-likes">${icon('heart')}${escapeHTML(item.likes)}</span>${icon('chevron')}</div></a>`;}
export function commentsPage(searchParams=new URLSearchParams()){
 const filters=commentFilters(searchParams),available=scopedComments(filters),visible=sortedComments(available.filter(item=>filters.category==='all'||item.category===filters.category),filters.sort),{chips,selects}=commentFiltersMarkup(filters);
 const cards=visible.length?`<div class="bc-comments-list">${visible.map(commentRow).join('')}</div>`:emptyState({title:'ไม่พบคอมเมนต์ที่ตรงกับตัวกรอง',description:'ลองเปลี่ยนตัวกรองหรือแสดงรายการทั้งหมด',iconName:'filter',action:button('ล้างตัวกรอง',{action:'comments-clear',variant:'secondary'})});
 return `<div class="bc-page bc-comments-page"><div class="bc-intro"><div><div class="bc-intro-topline">BrandCare AI · เสียงลูกค้าจากทุกช่องทาง</div><h1>คอมเมนต์</h1><p>ติดตามสิ่งที่ลูกค้าพูดถึงขนมบ้านสวน</p></div><div class="bc-intro-side"><span class="bc-date">${escapeHTML(brand.date)}</span></div></div>${chips}<div class="bc-comments-filterbar"><div class="bc-comments-desktop-filters"><div class="bc-comments-controls">${selects}</div></div><div class="bc-comments-result"><strong>${visible.length} รายการ</strong><button class="bc-filter-trigger" data-action="comments-filter" aria-haspopup="dialog">${icon('filter')}ตัวกรอง</button>${button('ล้างตัวกรอง',{action:'comments-clear',variant:'text',size:'small'})}</div></div>${cards}<p class="bc-context-note">ข้อมูลผู้ใช้และโพสต์เป็นข้อมูลจำลอง · ไม่มีการเชื่อมบัญชีหรือส่งข้อความจริง</p></div>`;
}
export function setupComments(root){
 if(root.dataset.commentsEventsReady)return;root.dataset.commentsEventsReady='true';
 const update=changes=>{const filters=commentFilters(new URLSearchParams(location.hash.split('?')[1]||''));const next={...filters,...changes};const params=new URLSearchParams();Object.entries(commentFilterDefaults).forEach(([key,fallback])=>{if(next[key]!==fallback)params.set(key,next[key]);});location.hash='#/comments'+(params.size?'?'+params.toString():'');};
 root.addEventListener('change',event=>{const key=event.target.dataset.commentFilter;if(key)update({[key]:event.target.value});});
 root.addEventListener('click',event=>{const chip=event.target.closest('[data-comment-category]');if(chip)update({category:chip.dataset.commentCategory});if(event.target.closest('[data-action="comments-clear"]'))location.hash='#/comments';if(event.target.closest('[data-action="comments-filter"]')){const filters=commentFilters(new URLSearchParams(location.hash.split('?')[1]||''));const {selects}=commentFiltersMarkup(filters);openDialog(`<h2>ตัวกรองคอมเมนต์</h2><div class="bc-comments-sheet"><div class="bc-comments-controls">${selects}</div></div><div class="bc-dialog-actions">${button('ล้างตัวกรอง',{action:'comments-clear',variant:'secondary'})}${button('เสร็จแล้ว',{action:'close-dialog'})}</div>`,{sheet:true,label:'ตัวกรองคอมเมนต์'});}});
}

export function relatedIssueSummaryPage(issueId){
 const issue=issues.find(item=>item.id===issueId);
 if(!issue)return `<div class="bc-page">${intro('ไม่พบปัญหา','ปัญหานี้ไม่มีในข้อมูลตัวอย่าง',{date:false})}<a class="bc-button bc-button--secondary" href="#/comments">กลับรายการคอมเมนต์</a></div>`;
 return `<div class="bc-page bc-related-issue-page">${intro(issue.title,issue.subtitle,{eyebrow:'รายละเอียดปัญหาที่เชื่อมจากคอมเมนต์',date:false})}<section class="bc-related-summary-card"><div class="bc-related-summary-status">${severity(issue.severity)}<span>${issue.count} คอมเมนต์ · ${escapeHTML(issue.period)}</span></div><div class="bc-related-summary-platforms"><span>ช่องทางที่พบ</span>${issue.platforms.map(id=>platform(id,{label:true})).join('')}</div><div class="bc-related-summary-trend">${sparkline(issue.trend,{color:issue.severity==='critical'?'red':'blue'})}<span>${escapeHTML(issue.subtitle)}</span></div><a class="bc-button bc-button--secondary" href="#/comments">กลับรายการคอมเมนต์</a></section></div>`;
}

function commentCardMarkup(comment){
 return `<article class="bc-comment"><div class="bc-comment-top">${platform(comment.platform)}<span>${escapeHTML(comment.time)}</span></div><div class="bc-comment-person"><span class="bc-person-avatar">${escapeHTML(comment.user.replace('@','')[0])}</span><strong>${escapeHTML(comment.user)}</strong>${comment.video?`<span class="bc-inline-video">${icon('play')}คลิปวิดีโอ</span>`:''}</div><a class="bc-comment-text" href="${commentHref(comment,{issueId:new URLSearchParams(location.hash.split('?')[1]||'').get('issue')||'',category:new URLSearchParams(location.hash.split('?')[1]||'').get('category')||''})}">${escapeHTML(comment.text)}</a><div class="bc-comment-bottom">${badge(comment.category)}<span class="bc-like">${icon('heart')}${escapeHTML(comment.likes)}</span></div><div class="bc-comment-foot"><span>หัวข้อ · ${escapeHTML(comment.topic||'ยังไม่ระบุ')}</span><a href="${commentHref(comment,{issueId:new URLSearchParams(location.hash.split('?')[1]||'').get('issue')||'',category:new URLSearchParams(location.hash.split('?')[1]||'').get('category')||''})}" aria-label="ดูคอมเมนต์ของ ${escapeHTML(comment.user)}">ดูรายละเอียด ${icon('chevron')}</a></div></article>`;
}

function sourceImage(comment){
 if(comment.id===2)return './assets/images/mock-tiktok-clip.svg';
 if(comment.issue==='packaging')return './assets/images/mock-packaging-post.svg';
 return './assets/images/mock-snack-post.svg';
}

function rationaleMarkup(comment){
 const analysis=analysisFor(comment);
 const highlighted=comment.id===2?'กล่องยับมาก ข้างในแตกเป็นผง':comment.id===1?'ทองม้วนแตกหมดเลยค่ะ กล่องบุบมาทั้งด้าน':'';
 const safeText=escapeHTML(comment.text);
 const safeHighlighted=escapeHTML(highlighted);
 const transcript=highlighted?safeText.replace(safeHighlighted,`<mark>${safeHighlighted}</mark>`):safeText;
 return {analysis,transcript};
}

export function commentDetailMarkup(comment){
 const {analysis,transcript}=rationaleMarkup(comment);
 const draft=replyDrafts.get(comment.id)||`ขอบคุณที่แบ่งปันความคิดเห็นนะคะ บ้านสวนจะนำไปตรวจสอบและดูแลต่อค่ะ`;
 const relatedIssue=comment.issue?issues.find(issue=>issue.id===comment.issue):null;
 const sourceName=platforms[comment.platform]?.name||'ช่องทางอื่น';
 const video=Boolean(comment.video);
 const mediaLabel=video?'คลิปต้นทาง':'โพสต์ต้นทาง';
 const sourcePreview=`<div class="bc-source-preview-layer" data-comment-source-preview hidden><div class="bc-source-preview-card" role="dialog" aria-modal="true" aria-labelledby="bc-source-preview-title"><div class="bc-source-preview-head"><div><span class="bc-demo-chip">ข้อมูลจำลอง</span><h2 id="bc-source-preview-title">${mediaLabel}</h2></div><button class="bc-icon-button" data-action="close-comment-source" aria-label="ปิดตัวอย่างโพสต์">${icon('close')}</button></div><img class="bc-source-preview-image ${video?'is-video':''}" src="${sourceImage(comment)}" alt="ภาพจำลองประกอบ${video?'คลิป':'โพสต์'}เกี่ยวกับ ${escapeHTML(comment.topic||'ขนมบ้านสวน')}"><div class="bc-source-preview-meta">${platform(comment.platform)}<span>${escapeHTML(comment.user)}</span></div><blockquote>${escapeHTML(comment.text)}</blockquote><p>ตัวอย่างโพสต์ภายใน BrandCare AI · ไม่ใช่โพสต์จริง</p></div></div>`;
 return `<section class="bc-comment-detail" data-comment-detail="${comment.id}">
  <header class="bc-detail-header"><div><span class="bc-detail-kicker">รายละเอียดคอมเมนต์</span><h2>${escapeHTML(comment.user)}</h2></div><div class="bc-detail-platform">${platform(comment.platform)}</div></header>
  <div class="bc-detail-tags">${badge(comment.category)}<span class="bc-topic-tag">หัวข้อ · ${escapeHTML(comment.topic||'ยังไม่ระบุ')}</span></div>
  <article class="bc-detail-comment-card"><p class="bc-detail-comment-text">${escapeHTML(comment.text)}</p><div class="bc-detail-meta"><span>${icon('clock')}${escapeHTML(comment.time)}</span><span>${icon('heart')}${escapeHTML(comment.likes)} ไลก์</span></div></article>
  <section class="bc-detail-section"><div class="bc-detail-section-heading"><div><span class="bc-detail-eyebrow">หลักฐานต้นทาง</span><h3>${mediaLabel}</h3></div>${video?`<span class="bc-view-count">${icon('play')}${metrics.videoViews.toLocaleString('th-TH')} ผู้ชม</span>`:''}</div><button class="bc-source-trigger" data-action="open-comment-source"><img src="${sourceImage(comment)}" alt="ภาพย่อ${video?'คลิป':'โพสต์'}จำลอง"><span class="bc-source-trigger-copy"><strong>${sourceName} · ${mediaLabel}</strong><small>${video?'เปิดดูคลิปและบทถอดเสียงจำลอง':'เปิดดูโพสต์ต้นทางภายในแอป'}</small></span><span class="bc-source-open">ดูโพสต์ ${icon('chevron')}</span></button>${video?`<div class="bc-transcript"><div><span>${icon('play')}บทถอดเสียง</span><small>ข้อมูลจำลอง</small></div><p>“${transcript}”</p></div>`:''}</section>
  <section class="bc-detail-section bc-ai-analysis"><div class="bc-analysis-heading">${icon('sparkles')}<div><span class="bc-detail-eyebrow">ผลวิเคราะห์จาก AI</span><h3>ความรู้สึก${analysis.sentiment==='ผสม'?'โดยรวม':''} · ${escapeHTML(analysis.sentiment)}</h3></div></div><p>${escapeHTML(analysis.rationale)}</p><div class="bc-analysis-labels">${badge(comment.category)}<span class="bc-topic-tag">${escapeHTML(comment.topic||'ยังไม่ระบุหัวข้อ')}</span></div></section>
  ${relatedIssue?`<section class="bc-detail-section bc-related-issue"><span class="bc-detail-eyebrow">ปัญหาที่เกี่ยวข้อง</span><a class="bc-related-issue-link" href="#/issues/${encodeURIComponent(relatedIssue.id)}"><span class="bc-related-issue-icon">${icon('alert')}</span><span><strong>${escapeHTML(relatedIssue.title)}</strong><small>${escapeHTML(relatedIssue.subtitle)}</small></span>${icon('chevron')}</a></section>`:''}
  <section class="bc-detail-section bc-reply-section"><div class="bc-detail-section-heading"><div><span class="bc-detail-eyebrow">ร่างคำตอบ · ยังไม่ส่ง</span><h3>${video?'ร่างตอบสาธารณะ':'ร่างตอบคุณลูกค้า'}</h3></div><span class="bc-draft-status">ฉบับร่าง</span></div><label class="bc-sr-only" for="bc-reply-draft">ข้อความร่างตอบ</label><textarea class="bc-textarea bc-reply-draft" id="bc-reply-draft" data-comment-draft readonly>${escapeHTML(draft)}</textarea><div class="bc-reply-actions"><button class="bc-button bc-button--soft" data-action="edit-comment-draft">แก้ไข</button><button class="bc-button bc-button--secondary" data-action="cancel-comment-draft" hidden>ยกเลิก</button><button class="bc-button bc-button--primary" data-action="save-comment-draft" hidden>บันทึกร่าง</button></div><div class="bc-approval-handoff">${icon('shield')}ร่างจะยังไม่ถูกส่งจากหน้านี้ ${button('ไปอนุมัติ',{href:'#/issues/packaging/approve',iconName:'arrow',size:'small'})}</div></section>
  ${sourcePreview}
 </section>`;
}

export function showCommentDetail(commentId){
 const comment=comments.find(item=>String(item.id)===String(commentId));
 const dialog=document.querySelector('#bc-dialog');
 if(!comment){
  dialog.dataset.commentDetailId=String(commentId);
  openDialog(`<div class="bc-comment-not-found">${icon('alert')}<h2>ไม่พบคอมเมนต์นี้</h2><p>รายการอาจถูกลบหรือไม่มีในข้อมูลตัวอย่าง</p><button class="bc-button bc-button--secondary" data-action="close-comment-detail">กลับหน้าก่อน</button></div>`,{drawer:true,label:'ไม่พบคอมเมนต์'});
 }else{
  dialog.dataset.commentDetailId=String(comment.id);
  openDialog(commentDetailMarkup(comment),{drawer:true,label:`รายละเอียดคอมเมนต์ ${comment.user}`});
 }
 dialog.classList.add('bc-dialog--comment-detail');
 const heading=dialog.querySelector('.bc-comment-detail .bc-detail-header h2,.bc-comment-not-found h2');
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
}

export function resetCommentDetailDialog(){
 const dialog=document.querySelector('#bc-dialog');
 dialog.classList.remove('bc-dialog--comment-detail');
 delete dialog.dataset.commentDetailId;
}

export function handleCommentAction(action){
 const dialog=document.querySelector('#bc-dialog');
 const panel=dialog.querySelector('.bc-comment-detail');
 if(!panel)return false;
 const textarea=panel.querySelector('[data-comment-draft]');
 if(action==='open-comment-source'){
  const preview=panel.querySelector('[data-comment-source-preview]');
  preview.hidden=false;
  [...panel.children].filter(child=>child!==preview).forEach(child=>{child.inert=true;});
  dialog.querySelector('.bc-dialog-close').inert=true;
  preview.querySelector('[data-action="close-comment-source"]').focus();
  return true;
 }
 if(action==='close-comment-source'){
  const preview=panel.querySelector('[data-comment-source-preview]');
  preview.hidden=true;
  [...panel.children].filter(child=>child!==preview).forEach(child=>{child.inert=false;});
  dialog.querySelector('.bc-dialog-close').inert=false;
  panel.querySelector('[data-action="open-comment-source"]').focus();
  return true;
 }
 if(action==='edit-comment-draft'){
  textarea.dataset.savedDraft=textarea.value;
  textarea.readOnly=false;
  textarea.focus();
  panel.querySelector('[data-action="edit-comment-draft"]').hidden=true;
  panel.querySelector('[data-action="cancel-comment-draft"]').hidden=false;
  panel.querySelector('[data-action="save-comment-draft"]').hidden=false;
  return true;
 }
 if(action==='cancel-comment-draft'){
  textarea.value=textarea.dataset.savedDraft||textarea.value;
  textarea.readOnly=true;
  panel.querySelector('[data-action="edit-comment-draft"]').hidden=false;
  panel.querySelector('[data-action="cancel-comment-draft"]').hidden=true;
  panel.querySelector('[data-action="save-comment-draft"]').hidden=true;
  return true;
 }
 if(action==='save-comment-draft'){
  const id=Number(panel.dataset.commentDetail);
  replyDrafts.set(id,textarea.value.trim()||textarea.dataset.savedDraft||'');
  textarea.value=replyDrafts.get(id);
  textarea.readOnly=true;
  panel.querySelector('[data-action="edit-comment-draft"]').hidden=false;
  panel.querySelector('[data-action="cancel-comment-draft"]').hidden=true;
  panel.querySelector('[data-action="save-comment-draft"]').hidden=true;
  toast('บันทึกร่างแล้ว · ยังไม่ส่งข้อความ');
  return true;
 }
 return false;
}
