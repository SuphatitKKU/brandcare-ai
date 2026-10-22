import {icon} from './shared/ui.js';

const googleMark=()=>`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.6Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4H3v2.7A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.4H3a10 10 0 0 0 0 9.2l3.4-2.7Z"/><path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-3A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7c.8-2.3 3-4 5.6-4Z"/></svg>`;

export function loginPage(){
 return `<div class="bc-login-page">
  <div class="bc-login-layout">
   <section class="bc-login-welcome" aria-labelledby="login-heading">
    <a class="bc-login-brand" href="#/login"><span class="bc-brand-symbol">${icon('leaf')}</span>BrandCare <span>AI</span></a>
    <h1 id="login-heading">ยินดีต้อนรับกลับมา</h1>
    <p class="bc-login-description">ให้ทุกวันของการดูแลร้าน เป็นเรื่องง่ายขึ้น</p>
    <div class="bc-login-tabs" role="group" aria-label="เลือกเข้าสู่ระบบหรือสมัครสมาชิก">
     <button type="button" data-action="login-mode" data-mode="signin" aria-pressed="true">เข้าสู่ระบบ</button>
     <button type="button" data-action="login-mode" data-mode="signup" aria-pressed="false">สมัครสมาชิก</button>
    </div>
    <form id="bc-login-form" class="bc-login-form">
     <label class="bc-login-input"><span class="bc-sr-only">อีเมล</span><input id="bc-login-address" type="email" placeholder="อีเมลของคุณ" autocomplete="off" required maxlength="254">${icon('message')}</label>
     <label class="bc-login-input"><span class="bc-sr-only">รหัสผ่าน</span><input id="bc-login-password" type="password" placeholder="รหัสผ่านของคุณ" autocomplete="off" required maxlength="128"><button type="button" data-action="login-password" aria-label="แสดงรหัสผ่าน" aria-pressed="false">${icon('eye')}</button></label>
     <div class="bc-login-options"><label><input type="checkbox" id="bc-login-remember">จดจำฉัน</label><button type="button" data-action="login-forgot">ลืมรหัสผ่าน?</button></div>
     <button class="bc-button bc-button--primary bc-login-submit" type="submit">เข้าสู่ระบบ</button>
    </form>
    <div class="bc-login-divider"><span>หรือ</span></div>
     <button class="bc-login-provider" data-action="login-google">${googleMark()}เข้าสู่ระบบด้วย Google</button>
   </section>
   <section class="bc-login-art" aria-labelledby="bc-login-art-heading">
    <div class="bc-login-art-tag">${icon('sparkles')} A little care. A bigger tomorrow.</div>
    <div class="bc-login-scene" aria-hidden="true">
     <div class="bc-login-orbit bc-login-orbit--outer"></div><div class="bc-login-orbit bc-login-orbit--inner"></div>
     <span class="bc-login-art-dot bc-login-art-dot--one"></span><span class="bc-login-art-dot bc-login-art-dot--two"></span>
     <svg class="bc-login-store-art" viewBox="0 0 400 360" fill="none">
      <defs><linearGradient id="bc-art-wall" x1="120" y1="120" x2="300" y2="320" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="#dceaff"/></linearGradient><linearGradient id="bc-art-roof" x1="100" y1="100" x2="300" y2="180" gradientUnits="userSpaceOnUse"><stop stop-color="#bcdcff"/><stop offset="1" stop-color="#6ba9fb"/></linearGradient><linearGradient id="bc-art-glass" x1="130" y1="205" x2="250" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#87b7f3"/><stop offset="1" stop-color="#d5eaff"/></linearGradient><filter id="bc-art-shadow" x="0" y="0" width="400" height="400" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="12"/></filter></defs>
      <ellipse cx="206" cy="315" rx="114" ry="14" fill="#001944" opacity=".25" filter="url(#bc-art-shadow)"/>
      <path d="M101 155 270 131 315 157V294L145 321 101 294Z" fill="url(#bc-art-wall)"/>
      <path d="m270 131 45 26v137l-45-24Z" fill="#aac9f3"/>
      <path d="m91 143 170-26 61 28-172 29Z" fill="#eaf4ff"/>
      <path d="m95 143 55 31 168-28-49-44-164 24Z" fill="url(#bc-art-roof)"/>
      <path d="m105 126 164-24-4-20-164 24Z" fill="#f6faff"/>
      <path d="m101 106 164-24 12 7-164 25Z" fill="white"/>
      <path d="m95 143 55 31v22l-55-30Z" fill="#a7ceff"/>
      <path d="m150 174 168-28v22l-168 28Z" fill="#7eb3f5"/>
      <path d="m150 174 28-5v22c0 14-28 18-28 5Z" fill="#f7fbff"/>
      <path d="m206 165 28-5v22c0 14-28 18-28 5Z" fill="#f7fbff"/>
      <path d="m262 155 28-4v22c0 14-28 18-28 5Z" fill="#f7fbff"/>
      <path d="m163 213 66-11v71l-66 11Z" fill="url(#bc-art-glass)" stroke="white" stroke-width="6" stroke-linejoin="round"/>
      <path d="m196 208v70m-33-30 66-11" stroke="white" stroke-width="4"/>
      <path d="m246 200 40-7v102l-40 7Z" fill="#689be0" stroke="white" stroke-width="6" stroke-linejoin="round"/>
      <path d="m254 209 24-4v50l-24 4Z" fill="#b6d6ff"/><path d="M277 269v7" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="m239 304 57-9 9 7-57 9Z" fill="#f6faff"/><path d="m248 311 57-9v7l-57 10Z" fill="#98bdec"/>
      <path d="m109 208 24 14v51l-24-14Z" fill="#96beef"/><path d="m113 213 16 9v42l-16-9Z" fill="#c4deff"/>
      <path d="m119 282 14 8-2 20-11-7Z" fill="#86b0e5"/>
      <path d="M126 289c-22-5-22-26-10-26 0-18 14-13 12-1 15-12 21 6 1 24" fill="#b1d9df"/>
      <path d="m190 119 39-6" stroke="white" stroke-width="6" stroke-linecap="round"/>
      <path d="m278 78 3-10m7 15 9-5" stroke="#dcf0ff" stroke-width="3" stroke-linecap="round"/>
     </svg>
     <span class="bc-login-float bc-login-float--heart">${icon('heart')}</span>
     <span class="bc-login-float bc-login-float--chat">${icon('message')}<i></i><i></i><i></i></span>
     <span class="bc-login-float bc-login-float--spark">${icon('sparkles')}</span>
     <span class="bc-login-float bc-login-float--leaf">${icon('leaf')}</span>
    </div>
    <div class="bc-login-art-copy"><span>YOUR BRAND, IN GOOD HANDS</span><h2 id="bc-login-art-heading">คุณสร้างแบรนด์ด้วยใจ<br>ให้เราช่วยดูแลทุกวัน</h2><p>พื้นที่เล็ก ๆ สำหรับความฝันที่เติบโต<br>พร้อมคู่คิดที่เข้าใจร้านของคุณ</p></div>
    <div class="bc-login-art-bottom"><span></span><span></span><span></span></div>
   </section>
  </div><footer class="bc-login-footer"><span>BrandCare AI</span><span>คู่คิดสำหรับคนทำแบรนด์</span></footer>
 </div>`;
}

export function brandSetupHandoff(){
 return `<section class="bc-page bc-login-handoff"><span class="bc-eyebrow">ขั้นตอนถัดไป · ข้อมูลจำลอง</span><h1>มารู้จักแบรนด์ของคุณกัน</h1><p>คุณมาถึงหน้าตั้งค่าแบรนด์แล้ว หน้า 2 จะพัฒนาในฟีเจอร์ถัดไป</p><p>การเข้าสู่ระบบเมื่อสักครู่เป็นการจำลอง ไม่มีบัญชีหรือเซสชันจริง</p><div>${'<a class="bc-button bc-button--primary" href="#/today">สำรวจ Dashboard ตัวอย่าง</a>'}<a class="bc-button bc-button--secondary" href="#/login">กลับหน้าเข้าสู่ระบบ</a></div></section>`;
}

export function googleAccountChooser(){
 return `<div class="bc-google-chooser">
  <div class="bc-google-heading">${googleMark()}<span>เข้าสู่ระบบด้วย Google</span></div>
  <div class="bc-google-body">
   <div class="bc-google-intro"><span class="bc-google-app">${icon('leaf')}</span><h2>เลือกบัญชี</h2><p>เพื่อดำเนินการต่อไปยัง <strong>BrandCare AI</strong></p></div>
   <div class="bc-google-accounts">
    <a class="bc-google-account" href="#/brand-setup"><span class="bc-google-avatar">พ</span><span><strong>คุณแพร</strong><small>praew@example.com</small></span>${icon('chevron')}</a>
    <button class="bc-google-other" data-action="login-use-email"><span class="bc-google-other-icon">${icon('message')}</span><span>เข้าสู่ระบบด้วยอีเมลอื่น</span>${icon('arrow')}</button>
   </div>
   <div class="bc-google-service">${icon('shield')}<p>ดูแลแบรนด์ของคุณต่อได้ใน BrandCare AI<br><span>เลือกบัญชีที่คุณต้องการใช้จัดการร้าน</span></p></div>
  </div>
  <div class="bc-google-footer"><span>ไทย</span><button data-action="close-dialog">ยกเลิก</button></div>
 </div>`;
}
