import {icon,shopLogo} from './shared/ui.js';
import {brand} from './shared/data.js';

const googleMark=()=>`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.6Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4H3v2.7A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.4H3a10 10 0 0 0 0 9.2l3.4-2.7Z"/><path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-3A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7c.8-2.3 3-4 5.6-4Z"/></svg>`;

export function loginPage(){
 return `<div class="bc-login-page">
  <div class="bc-login-layout">
   <section class="bc-login-welcome" aria-labelledby="login-heading">
    <a class="bc-brand bc-login-brand" href="#/login" aria-label="BrandCare AI เข้าสู่ระบบ">
     <span class="bc-brand-symbol">${icon('leaf')}</span>
     <span>BrandCare<span class="bc-brand-ai"> AI</span></span>
    </a>
    <h1 id="login-heading">ยินดีต้อนรับกลับมา</h1>
    <p class="bc-login-description">ให้ทุกวันของการดูแลร้าน เป็นเรื่องง่ายขึ้น</p>
    <div class="bc-login-tabs" role="group" aria-label="เลือกเข้าสู่ระบบหรือสมัครสมาชิก">
     <button type="button" data-action="login-mode" data-mode="signin" aria-pressed="true">เข้าสู่ระบบ</button>
     <button type="button" data-action="login-mode" data-mode="signup" aria-pressed="false">สมัครสมาชิก</button>
    </div>
    <form id="bc-login-form" class="bc-login-form" novalidate>
     <p id="bc-login-validation" class="bc-sr-only" aria-live="polite" aria-atomic="true"></p>
     <div class="bc-login-field"><label class="bc-login-input"><span class="bc-sr-only">อีเมล</span><input id="bc-login-address" type="email" placeholder="อีเมลของคุณ" autocomplete="off" required maxlength="254">${icon('message')}</label><p class="bc-login-error" id="bc-login-address-error" hidden>${icon('alert')}<span></span></p></div>
     <div class="bc-login-field"><label class="bc-login-input"><span class="bc-sr-only">รหัสผ่าน</span><input id="bc-login-password" type="password" placeholder="รหัสผ่านของคุณ" autocomplete="off" required maxlength="128"><button type="button" data-action="login-password" aria-label="แสดงรหัสผ่าน" aria-pressed="false">${icon('eye')}</button></label><p class="bc-login-error" id="bc-login-password-error" hidden>${icon('alert')}<span></span></p></div>
     <div class="bc-login-options"><label><input type="checkbox" id="bc-login-remember">จดจำฉัน</label><button type="button" data-action="login-forgot">ลืมรหัสผ่าน?</button></div>
     <button class="bc-button bc-button--primary bc-login-submit" type="submit">เข้าสู่ระบบ</button>
    </form>
    <div class="bc-login-divider"><span>หรือ</span></div>
    <button class="bc-login-provider" data-action="login-google">${googleMark()}เข้าสู่ระบบด้วย Google</button>
   </section>

   <section class="bc-login-art" aria-labelledby="bc-login-art-heading">
    <div class="bc-login-art-tag">${icon('sparkles')} A little care. A bigger tomorrow.</div>

    <div class="bc-login-preview-card" aria-hidden="true">
     <div class="bc-preview-card-head">
      <div class="bc-preview-shop">
       ${shopLogo()}
       <div>
        <strong>${brand.name}</strong>
        <small>สรุปสุขภาพแบรนด์วันนี้ · ข้อมูลจำลอง</small>
       </div>
      </div>
      <span class="bc-preview-live-badge"><span class="bc-live-dot"></span>อัปเดตสด</span>
     </div>

     <div class="bc-preview-metrics-grid">
      <div class="bc-preview-metric">
       <span class="bc-prev-metric-label">คะแนนความพึงพอใจ</span>
       <div class="bc-prev-metric-num"><strong>4.8</strong><span>/ 5.0</span></div>
       <span class="bc-prev-metric-meta green">+0.3 จากเดือนก่อน</span>
      </div>
      <div class="bc-preview-metric">
       <span class="bc-prev-metric-label">ปัญหาที่ควรดูแลด่วน</span>
       <div class="bc-prev-metric-num urgent"><strong>23</strong><span>คอมเมนต์</span></div>
       <span class="bc-prev-metric-meta red">+340% ใน 7 วัน</span>
      </div>
     </div>

     <div class="bc-preview-alert">
      <span class="bc-prev-alert-icon">${icon('alert')}</span>
      <div>
       <strong>ตรวจพบ: ขนส่ง B โยนกล่องจนทองม้วนแตก</strong>
       <p>AI เสนอ: เปลี่ยนเป็นกล่องลูกฟูก 2 ชั้น พร้อมส่งคูปอง ฿20 ชดเชย</p>
      </div>
     </div>

     <div class="bc-preview-comment">
      <div class="bc-prev-comment-user">
       <span class="bc-prev-avatar">ป</span>
       <strong>ปุ๊ก*** · Shopee</strong>
       <span class="bc-prev-time">2 ชม. ที่แล้ว</span>
      </div>
      <p class="bc-prev-comment-text">“สั่งรอบ 3 แล้วค่ะ รสชาติอร่อยเหมือนเดิม แต่รอบนี้กล่องบุบมาเลย ขนมข้างในแตกไปครึ่งกระปุก เสียดายมากค่ะ”</p>
     </div>
    </div>

    <div class="bc-login-art-copy">
     <span>YOUR BRAND, IN GOOD HANDS</span>
     <h2 id="bc-login-art-heading">คุณสร้างแบรนด์ด้วยใจ<br>ให้เราช่วยดูแลทุกวัน</h2>
     <p>ผู้ช่วยอัจฉริยะที่ช่วยฟังเสียงลูกค้า วิเคราะห์ปัญหา<br>และแนะนำแนวทางดูแลแบรนด์ให้อย่างตรงจุด</p>
    </div>
   </section>
  </div>
  <footer class="bc-login-footer"><span>BrandCare AI</span><span>คู่คิดสำหรับคนทำแบรนด์</span></footer>
 </div>`;
}

export function googleAccountChooser(){
 return `<div class="bc-google-chooser">
  <div class="bc-google-heading">${googleMark()}<span>เข้าสู่ระบบด้วย Google</span></div>
  <div class="bc-google-body">
   <div class="bc-google-intro"><span class="bc-brand-symbol" style="width:36px;height:36px;transform:rotate(-9deg);display:inline-flex">${icon('leaf')}</span><h2>เลือกบัญชี</h2><p>เพื่อดำเนินการต่อไปยัง <strong>BrandCare AI</strong></p></div>
   <div class="bc-google-accounts">
    <a class="bc-google-account" href="#/brand-setup"><span class="bc-google-avatar">พ</span><span><strong>คุณแพร</strong><small>praew@example.com</small></span>${icon('chevron')}</a>
    <button class="bc-google-other" data-action="login-use-email"><span class="bc-google-other-icon">${icon('message')}</span><span>เข้าสู่ระบบด้วยอีเมลอื่น</span>${icon('arrow')}</button>
   </div>
   <div class="bc-google-service">${icon('shield')}<p>ดูแลแบรนด์ของคุณต่อได้ใน BrandCare AI<br><span>เลือกบัญชีที่คุณต้องการใช้จัดการร้าน</span></p></div>
  </div>
  <div class="bc-google-footer"><span>ไทย</span><button data-action="close-dialog">ยกเลิก</button></div>
 </div>`;
}
