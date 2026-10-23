import {brand,products,issues} from './shared/data.js';
import {icon,escapeHTML as esc,toast} from './shared/ui.js';

const storageKey='brandcare:brand-setup:v1';
const categories=['ขนมและเบเกอรี่','อาหารและเครื่องดื่ม','แฟชั่นและเครื่องประดับ','ความงามและสุขภาพ','บ้านและไลฟ์สไตล์','อื่น ๆ'];
const tones=[{id:'friendly',name:'เป็นกันเอง',detail:'อบอุ่น เหมือนคุยกับคนรู้จัก',icon:'heart'},{id:'polite',name:'สุภาพ',detail:'ใส่ใจ ชัดเจน และน่าเชื่อถือ',icon:'shield'},{id:'playful',name:'สนุก',detail:'สดใส มีพลัง และเข้าถึงง่าย',icon:'sparkles'}];
const limits={products:60,competitors:100,keywords:50};
let state;
function readDraft(){
 const fallback={name:brand.name,category:categories[0],products:products.map(p=>p.name),audience:'',competitors:[],keywords:[brand.name,'#'+brand.name],tone:'friendly',logo:''};
 try{const saved=JSON.parse(localStorage.getItem(storageKey));if(!saved||typeof saved!=='object')return fallback;
  for(const key of ['name','audience'])if(typeof saved[key]==='string')fallback[key]=saved[key].slice(0,key==='name'?80:300);
  if(typeof saved.logo==='string'&&saved.logo.length<600000&&/^data:image\/(png|jpeg|webp);base64,/.test(saved.logo))fallback.logo=saved.logo;
  if(saved.category===''||categories.includes(saved.category))fallback.category=saved.category;
  if(tones.some(t=>t.id===saved.tone))fallback.tone=saved.tone;
  for(const key of Object.keys(limits))if(Array.isArray(saved[key]))fallback[key]=[...new Set(saved[key].filter(v=>typeof v==='string').map(v=>v.trim().slice(0,limits[key])).filter(Boolean))].slice(0,12);
 }catch{/* A draft is optional when browser storage is unavailable. */}return fallback;
}
export function setupHeader(active=1){return `<header class="bc-setup-header"><a class="bc-setup-logo" href="#/login"><span>${icon('leaf')}</span>BrandCare <em>AI</em></a><ol class="bc-setup-steps" aria-label="ขั้นตอนเริ่มใช้งาน">${['ข้อมูลร้าน','เชื่อมต่อช่องทาง','ให้ AI วิเคราะห์'].map((label,i)=>`<li class="${i+1===active?'is-current':i+1<active?'is-complete':''}"${i+1===active?' aria-current="step"':''}><span>${i+1<active?icon('check'):i+1}</span><strong>${label}</strong></li>`).join('')}</ol><span class="bc-setup-header-note">เริ่มต้นไปด้วยกัน</span></header>`;}
function chipGroup(key,label,hint){return `<div class="bc-setup-field"><label for="setup-${key}">${label}</label><div class="bc-setup-chipbox"><div class="bc-setup-chips" data-chip-list="${key}" aria-label="${label}"></div><div class="bc-setup-chip-entry"><input id="setup-${key}" data-chip-input="${key}" maxlength="${limits[key]}" placeholder="${hint}" aria-describedby="setup-${key}-hint setup-${key}-error"><button type="button" data-chip-add="${key}" aria-label="เพิ่ม${label}">${icon('plus')}</button></div></div><small id="setup-${key}-hint">พิมพ์แล้วกด Enter หรือปุ่ม + เพื่อเพิ่ม · สูงสุด 12 รายการ</small><p id="setup-${key}-error" class="bc-setup-error" hidden></p></div>`;}
export function brandSetupPage(){
 state=readDraft();const editing=location.hash.includes('from=settings');
 return `<div class="bc-setup-page">${setupHeader()}<div class="bc-setup-content"><div class="bc-setup-intro"><span class="bc-setup-eyebrow">ขั้นตอนที่ 1 · ตั้งค่าร้าน</span><h1>แนะนำร้านของคุณให้ผู้ช่วย AI รู้จัก</h1><p>เพิ่มข้อมูลร้านและลูกค้า เพื่อให้ผู้ช่วยสรุปเสียงจากโซเชียลและแนะนำสิ่งที่ควรทำได้ตรงกับร้านคุณ</p></div>
 <div class="bc-setup-grid"><form id="bc-brand-form" class="bc-setup-form" novalidate>
  <section class="bc-setup-card" aria-labelledby="setup-basics"><div class="bc-setup-section-title"><span>${icon('box')}</span><div><h2 id="setup-basics">ข้อมูลร้าน</h2><p>ข้อมูลที่ใช้แสดงชื่อร้าน รูปประจำร้าน และรายการสินค้า</p></div><b>01</b></div>
   <div class="bc-setup-logo-upload"><div class="bc-setup-upload-avatar" data-logo-image>${icon('leaf')}</div><div class="bc-setup-upload-copy"><strong>รูปประจำร้าน</strong><p>ใช้โลโก้หรือรูปที่บอกว่าเป็นร้านของคุณ</p><div><label for="setup-logo" class="bc-setup-upload-button">${icon('plus')}เลือกรูป</label><input id="setup-logo" type="file" accept="image/png,image/jpeg,image/webp" class="bc-sr-only" aria-label="เลือกรูปประจำร้าน" aria-describedby="setup-logo-hint setup-logo-error"><button type="button" data-remove-logo hidden>ลบรูป</button></div><small id="setup-logo-hint">JPG, PNG หรือ WebP · ไม่เกิน 2 MB</small><p id="setup-logo-error" class="bc-setup-error" role="alert" hidden></p></div></div>
   <div class="bc-setup-fields-row"><div class="bc-setup-field"><label for="setup-name">ชื่อร้าน <span>*</span></label><input id="setup-name" name="brandName" maxlength="80" required value="${esc(state.name)}" placeholder="เช่น ขนมบ้านสวน" autocomplete="organization" aria-describedby="setup-name-error"><p id="setup-name-error" class="bc-setup-error" hidden></p></div><div class="bc-setup-field"><label id="setup-category-label" for="setup-category-trigger">ประเภทสินค้า <span>*</span></label><input type="hidden" id="setup-category" value="${esc(state.category)}"><button type="button" id="setup-category-trigger" class="bc-setup-select" role="combobox" aria-labelledby="setup-category-label" aria-required="true" aria-describedby="setup-category-error" aria-haspopup="listbox" aria-controls="setup-category-list" aria-expanded="false"><span data-category-label>${esc(state.category||'เลือกประเภทสินค้า')}</span>${icon('down')}</button><div id="setup-category-list" class="bc-setup-select-menu" popover="auto" role="listbox" aria-labelledby="setup-category-label">${categories.map((c,i)=>`<div id="setup-category-option-${i}" role="option" aria-selected="${c===state.category}" data-category-index="${i}"><span>${esc(c)}</span>${icon('check')}</div>`).join('')}</div><p id="setup-category-error" class="bc-setup-error" hidden></p></div></div>
   ${chipGroup('products','สินค้าของร้าน *','เพิ่มชื่อสินค้า เช่น ทองม้วนรสเนยสด')}
  </section>
  <section class="bc-setup-card" aria-labelledby="setup-audience"><div class="bc-setup-section-title"><span>${icon('target')}</span><div><h2 id="setup-audience">ลูกค้าและคู่แข่ง</h2><p>ผู้ช่วยใช้ข้อมูลนี้ทำความเข้าใจเสียงลูกค้าและเปรียบเทียบกับร้านคู่แข่ง</p></div><b>02</b></div>
   <div class="bc-setup-field"><label for="setup-audience-input">ลูกค้าของร้านคุณคือใคร <small>ไม่บังคับ</small></label><textarea id="setup-audience-input" maxlength="300" rows="3" placeholder="เช่น คนทำงานที่ชอบขนมไทย และคนที่กำลังมองหาของฝาก">${esc(state.audience)}</textarea><small>เช่น อายุ ความสนใจ หรือซื้อไปใช้เองหรือเป็นของฝาก</small></div>
   ${chipGroup('competitors','ร้านคู่แข่งที่อยากติดตาม','ใส่ชื่อแบรนด์หรือลิงก์เพจ')}
  </section>
  <section class="bc-setup-card" aria-labelledby="setup-personality"><div class="bc-setup-section-title"><span>${icon('message')}</span><div><h2 id="setup-personality">สไตล์การคุยของผู้ช่วย AI</h2><p>เลือกสไตล์ที่คุณชอบ แล้วดูตัวอย่างการสรุปและคำแนะนำด้านล่าง</p></div><b>03</b></div>
   <fieldset class="bc-setup-tone"><legend>อยากให้ผู้ช่วยคุยกับคุณแบบไหน?</legend><div>${tones.map(t=>`<label><input type="radio" name="brandTone" value="${t.id}"${state.tone===t.id?' checked':''}><span>${icon(t.icon)}<strong>${t.name}</strong><small>${t.detail}</small><i>${icon('check')}</i></span></label>`).join('')}</div></fieldset>
   <div class="bc-setup-voice" aria-busy="false"><span>${icon('message')}ตัวอย่างผู้ช่วยสรุปให้คุณฟัง</span><div class="bc-setup-chat-request"><span data-tone-request></span></div><div class="bc-setup-chat-reply"><span class="bc-setup-chat-avatar" aria-label="ผู้ช่วย AI">${icon('sparkles')}</span><div class="bc-setup-chat-bubble"><i class="bc-setup-thinking-dots" data-tone-dots hidden aria-hidden="true"><b></b><b></b><b></b></i><div class="bc-setup-stream-text"><p data-tone-measure aria-hidden="true"></p><p data-tone-example></p></div></div></div><span class="bc-sr-only" data-tone-announcement role="status" aria-live="polite" aria-atomic="true"></span></div>
   ${chipGroup('keywords','คำที่อยากให้ผู้ช่วยติดตาม','ชื่อร้าน ชื่อสินค้า หรือ #แฮชแท็ก')}
  </section>
 </form>
 <aside class="bc-setup-aside" aria-label="สรุปข้อมูลร้านและการตั้งค่า AI"><div class="bc-setup-preview"><button type="button" class="bc-setup-summary-toggle" aria-expanded="false" aria-controls="setup-summary-details" aria-label="ดูสรุปข้อมูลร้าน"><span class="bc-setup-summary-avatar" data-logo-image>${icon('leaf')}</span><span class="bc-setup-summary-copy"><small>สรุปข้อมูลร้าน</small><strong data-summary-name></strong><span data-summary-meta></span></span><span class="bc-setup-summary-affordance"><span data-summary-action>ดูรายละเอียด</span>${icon('down')}</span></button><div class="bc-setup-preview-top"><span>${icon('leaf')}</span><span>สรุปข้อมูลร้าน<br><small>อัปเดตตามข้อมูลที่คุณกรอก</small></span><i>${icon('sparkles')}</i></div><div class="bc-setup-preview-body" id="setup-summary-details"><span class="bc-setup-shop-avatar" data-logo-image>${icon('leaf')}</span><h2 data-preview-name></h2><span class="bc-setup-category-pill" data-preview-category></span><div class="bc-setup-preview-divider"></div><div class="bc-setup-preview-label">สินค้าของร้าน</div><div class="bc-setup-preview-products" data-preview-products></div><div class="bc-setup-preview-label">สไตล์การคุยของผู้ช่วย</div><div class="bc-setup-preview-tone">${icon('heart')}<span data-preview-tone></span></div><div class="bc-setup-preview-label">คำที่ให้ผู้ช่วยติดตาม</div><p data-preview-keywords></p></div><div class="bc-setup-preview-bottom">${icon('check')}คุณแก้ไขข้อมูลเหล่านี้ได้ภายหลัง</div></div></aside></div>
 </div>
 <footer class="bc-setup-actions"><div><a href="${editing?'#/settings':'#/login'}">${icon('arrow')}กลับ</a><p id="setup-status" role="status" aria-live="polite"></p><button type="button" class="bc-setup-draft" data-save-brand>บันทึกฉบับร่าง</button><button type="submit" form="bc-brand-form" class="bc-button bc-button--primary">${editing?'บันทึกการเปลี่ยนแปลง':'ถัดไป: เชื่อมต่อข้อมูล'}${icon('arrow')}</button></div></footer></div>`;
}

export function mountBrandSetup(root){
 const page=root.querySelector('.bc-setup-page'),form=page.querySelector('form');
 const find=s=>page.querySelector(s);
 function status(message){find('#setup-status').textContent=message;}
 const summaryToggle=find('.bc-setup-summary-toggle');
 summaryToggle.addEventListener('click',()=>{const expanded=summaryToggle.getAttribute('aria-expanded')!=='true';summaryToggle.setAttribute('aria-expanded',String(expanded));summaryToggle.setAttribute('aria-label',expanded?'ย่อสรุปข้อมูลร้าน':'ดูสรุปข้อมูลร้าน');find('.bc-setup-preview').classList.toggle('is-open',expanded);find('[data-summary-action]').textContent=expanded?'ย่อรายละเอียด':'ดูรายละเอียด';});
 const categoryTrigger=find('#setup-category-trigger'),categoryMenu=find('#setup-category-list');
 const categoryOptions=[...categoryMenu.querySelectorAll('[role="option"]')];
 const dropdownEvents=new AbortController();let activeCategory=0;
 const categoryOpen=()=>categoryMenu.matches(':popover-open');
 function placeCategoryMenu(){
  const r=categoryTrigger.getBoundingClientRect(),gap=7,viewport=window.visualViewport;
  const top=(viewport?.offsetTop||0)+12,bottom=Math.min((viewport?.offsetTop||0)+(viewport?.height||innerHeight),find('.bc-setup-actions').getBoundingClientRect().top)-10;
  const spaceBelow=Math.max(0,bottom-r.bottom-gap),spaceAbove=Math.max(0,r.top-gap-top),above=spaceBelow<240&&spaceAbove>spaceBelow;
  categoryMenu.style.width=r.width+'px';categoryMenu.style.left=Math.max(12,Math.min(r.left,document.documentElement.clientWidth-r.width-12))+'px';
  categoryMenu.style.maxHeight=Math.max(48,Math.min(300,above?spaceAbove:spaceBelow))+'px';
  categoryMenu.style.top=(above?Math.max(top,r.top-gap-categoryMenu.getBoundingClientRect().height):r.bottom+gap)+'px';
 }
 function highlightCategory(index){activeCategory=index;categoryOptions.forEach((option,i)=>option.classList.toggle('is-active',i===index));categoryTrigger.setAttribute('aria-activedescendant',categoryOptions[index].id);categoryOptions[index].scrollIntoView({block:'nearest'});}
 function openCategory(){categoryMenu.showPopover();placeCategoryMenu();categoryTrigger.setAttribute('aria-expanded','true');highlightCategory(Math.max(0,categories.indexOf(find('#setup-category').value)));}
 function chooseCategory(index){find('#setup-category').value=categories[index];find('[data-category-label]').textContent=categories[index];categoryOptions.forEach((option,i)=>option.setAttribute('aria-selected',String(i===index)));categoryMenu.hidePopover();categoryTrigger.focus({preventScroll:true});sync();setError('category','');status('มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก');}
 categoryTrigger.addEventListener('click',()=>categoryOpen()?categoryMenu.hidePopover():openCategory());
 categoryMenu.addEventListener('toggle',()=>{categoryTrigger.setAttribute('aria-expanded',String(categoryOpen()));if(!categoryOpen())categoryTrigger.removeAttribute('aria-activedescendant');});
 categoryMenu.addEventListener('pointerdown',event=>event.preventDefault());
 categoryMenu.addEventListener('click',event=>{const option=event.target.closest('[data-category-index]');if(option)chooseCategory(Number(option.dataset.categoryIndex));});
 categoryTrigger.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey)return;const key=event.key;if(['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(key)){event.preventDefault();if(!categoryOpen()){openCategory();return;}if(key==='Enter'||key===' ')chooseCategory(activeCategory);else highlightCategory(key==='Home'?0:key==='End'?categories.length-1:(activeCategory+(key==='ArrowDown'?1:-1)+categories.length)%categories.length);}else if(key==='Tab'&&categoryOpen())categoryMenu.hidePopover();});
 window.addEventListener('resize',()=>{if(categoryOpen())placeCategoryMenu();},{signal:dropdownEvents.signal});
 window.visualViewport?.addEventListener('resize',()=>{if(categoryOpen())placeCategoryMenu();},{signal:dropdownEvents.signal});
 window.addEventListener('scroll',event=>{if(categoryOpen()&&!categoryMenu.contains(event.target))placeCategoryMenu();},{capture:true,signal:dropdownEvents.signal});
 let uploading=false,submitting=false,nextStepTimer;
 let voiceText='',thinkingTimer,streamFrame;
 let bubbleAnimations=[];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 function cancelStream(){clearTimeout(thinkingTimer);cancelAnimationFrame(streamFrame);bubbleAnimations.forEach(animation=>animation.cancel());bubbleAnimations=[];}
 function completeVoice(){cancelStream();find('[data-tone-example]').textContent=voiceText;find('.bc-setup-voice').classList.remove('is-thinking','is-writing');find('.bc-setup-voice').setAttribute('aria-busy','false');find('[data-tone-dots]').hidden=true;find('[data-tone-announcement]').textContent=voiceText;}
 function updateVoice(text,animate){
  if(text===voiceText)return;voiceText=text;cancelStream();find('[data-tone-measure]').textContent=text;
  if(!animate||reducedMotion.matches){completeVoice();return;}
  const box=find('.bc-setup-voice');box.classList.remove('is-writing');box.classList.add('is-thinking');box.setAttribute('aria-busy','true');find('[data-tone-dots]').hidden=false;find('[data-tone-example]').textContent='';find('[data-tone-announcement]').textContent='';
  const parts=Array.from(new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text),part=>part.segment);
  thinkingTimer=setTimeout(()=>{if(!page.isConnected)return;
   const bubble=find('.bc-setup-chat-bubble'),reply=find('.bc-setup-chat-reply');const small=bubble.getBoundingClientRect(),smallReply=reply.getBoundingClientRect();
   box.classList.remove('is-thinking');box.classList.add('is-writing');find('[data-tone-dots]').hidden=true;
   const expanded=bubble.getBoundingClientRect(),expandedReply=reply.getBoundingClientRect();const timing={duration:300,easing:'cubic-bezier(.22,1,.36,1)'};
   bubbleAnimations=[bubble.animate([{width:small.width+'px',height:small.height+'px'},{width:expanded.width+'px',height:expanded.height+'px'}],timing),reply.animate([{height:smallReply.height+'px'},{height:expandedReply.height+'px'}],timing)];
   let start;const duration=Math.min(1400,parts.length*18);
   function tick(now){if(!page.isConnected)return;if(start===undefined)start=now;const progress=Math.min(1,(now-start)/duration);find('[data-tone-example]').textContent=parts.slice(0,Math.max(1,Math.ceil(progress*parts.length))).join('');if(progress<1)streamFrame=requestAnimationFrame(tick);else completeVoice();}streamFrame=requestAnimationFrame(tick);
  },350);
 }
 const onReducedMotion=()=>{if(reducedMotion.matches)completeVoice();};reducedMotion.addEventListener('change',onReducedMotion);
 function logoError(message){const error=find('#setup-logo-error');error.textContent=message;error.hidden=!message;}
 function setError(key,message){const input=find(key==='category'?'#setup-category-trigger':'#setup-'+key),error=find('#setup-'+key+'-error');error.hidden=!message;error.textContent=message;if(message)input.setAttribute('aria-invalid','true');else input.removeAttribute('aria-invalid');}
 function sync(){
  const previousTone=state.tone;
  state.name=find('#setup-name').value;state.category=find('#setup-category').value;state.audience=find('#setup-audience-input').value;state.tone=form.elements.brandTone.value;
  page.querySelectorAll('[data-logo-image]').forEach(el=>{el.innerHTML=state.logo?`<img src="${esc(state.logo)}" alt="รูปประจำร้าน">`:icon('leaf');});find('[data-remove-logo]').hidden=!state.logo;
  find('[data-summary-name]').textContent=state.name.trim()||'ชื่อร้านของคุณ';find('[data-summary-meta]').textContent=`${state.category||'ยังไม่เลือกประเภทสินค้า'} · สินค้า ${state.products.length} รายการ`;find('[data-preview-name]').textContent=state.name.trim()||'ชื่อร้านของคุณ';find('[data-preview-category]').textContent=state.category||'ประเภทธุรกิจ';
  find('[data-preview-products]').innerHTML=state.products.length?state.products.slice(0,3).map(p=>`<span>${esc(p)}</span>`).join('')+(state.products.length>3?`<small>และอีก ${state.products.length-3} รายการ</small>`:''):'<p>เพิ่มสินค้าเพื่อเริ่มรู้จักร้านของคุณ</p>';
  find('[data-preview-tone]').textContent=tones.find(t=>t.id===state.tone).name;find('[data-tone-request]').textContent='ช่วงนี้ลูกค้าพูดถึงร้านยังไง และควรเริ่มแก้ตรงไหน?';find('[data-preview-keywords]').textContent=state.keywords.length?state.keywords.join(' · '):'ชื่อร้าน สินค้า และเรื่องที่สำคัญกับคุณ';
  const name=state.name.trim()||'ร้านของคุณ';const signal=issues.find(issue=>issue.id==='packaging');
  const finding=`ในช่วง ${signal.period==='7 วัน'?'7 วันที่ผ่านมา':signal.period} มี ${signal.count} คอมเมนต์พูดถึงเรื่อง “${signal.title}”`;
  const example=state.tone==='polite'?`สำหรับ ${name} ${finding} ค่ะ แนะนำให้เริ่มตรวจบรรจุภัณฑ์และวิธีแพ็กสินค้า เพื่อหาจุดที่อาจทำให้สินค้าเสียหาย ก่อนตัดสินใจปรับปรุงค่ะ`:state.tone==='playful'?`มาดูเสียงลูกค้าของ ${name} กันค่ะ! ${finding} ลองเริ่มเช็กกล่องกับวิธีแพ็กก่อนนะคะ จะได้รู้ว่าควรปรับตรงไหนเป็นอันดับแรก ✨`:`สรุปเสียงลูกค้าของ ${name} ให้ฟังนะคะ ${finding} ลองเริ่มดูเรื่องกล่องกับวิธีแพ็กก่อนค่ะ จะได้หาสาเหตุและเลือกแก้ได้ตรงจุด`;updateVoice(example,state.tone!==previousTone);
 }
 function drawChips(key){find(`[data-chip-list="${key}"]`).innerHTML=state[key].map((v,i)=>`<span class="bc-setup-chip">${esc(v)}<button type="button" data-chip-remove="${key}" data-index="${i}" aria-label="ลบ ${esc(v)}">${icon('close')}</button></span>`).join('');}
 function addChip(key){const input=find(`[data-chip-input="${key}"]`),value=input.value.trim();if(!value)return true;if(state[key].includes(value)){setError(key,'มีรายการนี้แล้ว');return false;}if(state[key].length>=12){setError(key,'เพิ่มได้สูงสุด 12 รายการ');return false;}state[key].push(value);input.value='';setError(key,'');drawChips(key);sync();status('เพิ่มรายการแล้ว · ยังไม่ได้บันทึก');return true;}
 function save(notify=true){try{localStorage.setItem(storageKey,JSON.stringify(state));status('บันทึกฉบับร่างในเบราว์เซอร์นี้แล้ว');if(notify)toast('บันทึกฉบับร่างในเบราว์เซอร์นี้แล้ว');return true;}catch{status('บันทึกไม่ได้ เบราว์เซอร์ไม่อนุญาตให้เก็บข้อมูล กรุณาเปิดการจัดเก็บข้อมูลแล้วลองอีกครั้ง');toast('บันทึกไม่ได้ กรุณาตรวจการอนุญาตจัดเก็บข้อมูลของเบราว์เซอร์');return false;}}

 find('#setup-logo').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;logoError('');
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2*1024*1024){logoError('กรุณาเลือกไฟล์ JPG, PNG หรือ WebP ขนาดไม่เกิน 2 MB');event.target.value='';return;}
  uploading=true;find('[data-save-brand]').disabled=true;page.querySelector('[type="submit"]').disabled=true;event.target.disabled=true;
  const objectURL=URL.createObjectURL(file);
  try{const image=new Image();image.src=objectURL;await image.decode();const scale=Math.min(1,512/Math.max(image.naturalWidth,image.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);const logo=canvas.toDataURL('image/webp',.85);if(logo.length>=600000)throw Error('Image too large');if(!page.isConnected)return;state.logo=logo;sync();status('เลือกรูปประจำร้านแล้ว · กดบันทึกเพื่อเก็บรูป');}
  catch{if(page.isConnected)logoError('เปิดรูปนี้ไม่ได้ กรุณาลองรูปอื่น');}
  finally{URL.revokeObjectURL(objectURL);uploading=false;if(page.isConnected){find('[data-save-brand]').disabled=false;page.querySelector('[type="submit"]').disabled=false;event.target.disabled=false;event.target.value='';}}
 });
 for(const key of Object.keys(limits))drawChips(key);sync();
 form.addEventListener('input',event=>{if(event.target.matches('[data-chip-input]')){if(event.target.getAttribute('aria-invalid'))setError(event.target.dataset.chipInput,'');return;}sync();if(event.target.id==='setup-name'&&state.name.trim())setError('name','');status('มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก');});
 form.addEventListener('change',()=>{sync();if(state.category)setError('category','');});
 form.addEventListener('keydown',event=>{if(event.target.matches('[data-chip-input]')&&event.key==='Enter'&&!event.isComposing){event.preventDefault();addChip(event.target.dataset.chipInput);}});
 page.addEventListener('click',event=>{if(submitting)return;const add=event.target.closest('[data-chip-add]'),remove=event.target.closest('[data-chip-remove]');if(add){addChip(add.dataset.chipAdd);find(`[data-chip-input="${add.dataset.chipAdd}"]`).focus();}if(remove){const key=remove.dataset.chipRemove;state[key].splice(Number(remove.dataset.index),1);drawChips(key);sync();find(`[data-chip-input="${key}"]`).focus();status('ลบรายการแล้ว · ยังไม่ได้บันทึก');}if(event.target.closest('[data-remove-logo]')&&!uploading){state.logo='';find('#setup-logo').value='';logoError('');sync();status('ลบรูปแล้ว · ยังไม่ได้บันทึก');}if(event.target.closest('[data-save-brand]')){if(uploading)return;for(const key of Object.keys(limits))if(!addChip(key))return;sync();save();}});
 form.addEventListener('submit',event=>{event.preventDefault();if(uploading||submitting)return;for(const key of Object.keys(limits))if(!addChip(key)){find('#setup-'+key).focus();return;}sync();setError('name',state.name.trim()?'':'กรุณากรอกชื่อร้าน');setError('category',state.category?'':'กรุณาเลือกประเภทสินค้า');setError('products',state.products.length?'':'กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ');const invalid=form.querySelector('[aria-invalid="true"]');if(invalid){invalid.focus();status('กรุณาตรวจสอบช่องที่ระบุ');return;}if(!save(false))return;
  submitting=true;const editing=location.hash.includes('from=settings'),submit=page.querySelector('[type="submit"]');
  submit.style.minWidth=submit.getBoundingClientRect().width+'px';submit.classList.add('is-loading');submit.setAttribute('aria-busy','true');
  submit.innerHTML=`<span class="bc-login-spinner" aria-hidden="true"></span><span>${editing?'กำลังกลับหน้าตั้งค่า…':'กำลังไปขั้นตอนถัดไป…'}</span>`;
  form.setAttribute('aria-busy','true');for(const control of form.elements)control.disabled=true;submit.disabled=true;find('[data-save-brand]').disabled=true;
  status(editing?'บันทึกข้อมูลแล้ว กำลังกลับหน้าตั้งค่า':'บันทึกข้อมูลแล้ว กำลังไปขั้นตอนถัดไป');
  nextStepTimer=setTimeout(()=>{if(!page.isConnected)return;location.hash=editing?'/settings':'/connect-data';},reducedMotion.matches?150:750);});
 return ()=>{clearTimeout(nextStepTimer);dropdownEvents.abort();cancelStream();reducedMotion.removeEventListener('change',onReducedMotion);};
}
