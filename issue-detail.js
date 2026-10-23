import {brand,metrics,comments,issues,products,categories,platforms,replyDraft} from './shared/data.js';
import {icon,button,badge,platform,severity,status,sparkline,card,commentCard,metricCard,emptyState,escapeHTML,openDialog,closeDialog,toast,countTo} from './shared/ui.js?v=2';
import {intro} from './dashboard.js';

// ข้อมูลจำลองผู้รับ 23 รายชื่อสำหรับหน้า 8 อ้างอิง MOCKUP-PAGES.md ข้อ 6.5 (Shopee 14, TikTok 6, Facebook 3)
export const packagingRecipients = Object.freeze([
 {id:'SP-8821',platform:'shopee',user:'ปุ๊ก***',time:'2 ชม.',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-01'},
 {id:'SP-8804',platform:'shopee',user:'nat***',time:'5 ชม.',order:'ทองม้วนกรอบ รสเนยสด × 3',coupon:'BC-BOX20-02'},
 {id:'SP-8792',platform:'shopee',user:'bank***',time:'2 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-03'},
 {id:'SP-8755',platform:'shopee',user:'fon***',time:'8 ชม.',order:'ทองม้วน รสเนยสด + งาดำ',coupon:'BC-BOX20-04'},
 {id:'SP-8742',platform:'shopee',user:'cherry***',time:'1 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-05'},
 {id:'SP-8731',platform:'shopee',user:'nook***',time:'1 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-06'},
 {id:'SP-8719',platform:'shopee',user:'golf***',time:'2 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-07'},
 {id:'SP-8698',platform:'shopee',user:'aom***',time:'3 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-08'},
 {id:'SP-8680',platform:'shopee',user:'boy***',time:'3 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-09'},
 {id:'SP-8664',platform:'shopee',user:'kwan***',time:'4 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-10'},
 {id:'SP-8651',platform:'shopee',user:'ploy***',time:'4 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-11'},
 {id:'SP-8633',platform:'shopee',user:'tao***',time:'5 วัน',order:'ทองม้วนกรอบ รสเนยสด × 3',coupon:'BC-BOX20-12'},
 {id:'SP-8620',platform:'shopee',user:'earn***',time:'5 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-13'},
 {id:'SP-8608',platform:'shopee',user:'benz***',time:'6 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-14'},
 {id:'TT-9901',platform:'tiktok',user:'@กินไปเรื่อยกับมิ้นท์',time:'4 วัน',order:'คลิปรีวิว 48k วิว',coupon:'BC-BOX20-15'},
 {id:'TT-9882',platform:'tiktok',user:'@som_review',time:'2 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-16'},
 {id:'TT-9861',platform:'tiktok',user:'@user4491',time:'3 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-17'},
 {id:'TT-9840',platform:'tiktok',user:'@khun_mew',time:'4 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-18'},
 {id:'TT-9822',platform:'tiktok',user:'@aroi_bkk',time:'5 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'BC-BOX20-19'},
 {id:'TT-9805',platform:'tiktok',user:'@dew_snack',time:'6 วัน',order:'ทองม้วนกรอบ รสเนยสด × 1',coupon:'BC-BOX20-20'},
 {id:'FB-7711',platform:'facebook',user:'สมศ***',time:'1 วัน',order:'ทองม้วน รสเนยสด × 2',coupon:'BC-BOX20-21'},
 {id:'FB-7703',platform:'facebook',user:'กิตติ***',time:'3 วัน',order:'ทองม้วน รสเนยสด × 1',coupon:'BC-BOX20-22'},
 {id:'FB-7690',platform:'facebook',user:'นงนุช***',time:'5 วัน',order:'ทองม้วน รสเนยสด × 2',coupon:'BC-BOX20-23'}
]);

// ข้อมูลจำลองผู้รับสำหรับปัญหาจัดส่งช้า (35 ออเดอร์ค้างส่ง)
export const deliveryRecipients = Object.freeze([
 {id:'SP-9101',platform:'shopee',user:'สมศ***',time:'1 วัน',order:'ทองม้วน + กล้วยตาก',coupon:'TH-B-89101 (ค้าง 4 วัน)'},
 {id:'SP-9102',platform:'shopee',user:'กฤษณะ***',time:'18 ชม.',order:'ทองม้วนกรอบ รสเนยสด × 3',coupon:'TH-B-89102 (ค้าง 3 วัน)'},
 {id:'SP-9103',platform:'shopee',user:'รัชนก***',time:'3 วัน',order:'กล้วยตากอบน้ำผึ้ง × 2',coupon:'TH-B-89103 (ค้าง 4 วัน)'},
 {id:'SP-9104',platform:'shopee',user:'สุภาภรณ์***',time:'2 วัน',order:'ทองม้วนกรอบ รสงาดำ × 2',coupon:'TH-B-89104 (ค้าง 3 วัน)'},
 {id:'SP-9105',platform:'shopee',user:'ธนพล***',time:'2 วัน',order:'ชุดของขวัญขนมไทย × 1',coupon:'TH-B-89105 (ค้าง 4 วัน)'},
 {id:'SP-9106',platform:'shopee',user:'ชลธิชา***',time:'3 วัน',order:'ข้าวแต๋นน้ำแตงโม × 4',coupon:'TH-B-89106 (ค้าง 5 วัน)'},
 {id:'FB-8201',platform:'facebook',user:'พิมพ์ใจ***',time:'1 วัน',order:'ทองม้วนกรอบ รสเนยสด × 2',coupon:'TH-B-89201 (ค้าง 3 วัน)'},
 {id:'FB-8202',platform:'facebook',user:'วิชัย***',time:'2 วัน',order:'กล้วยตากอบน้ำผึ้ง × 3',coupon:'TH-B-89202 (ค้าง 4 วัน)'},
 {id:'TT-9951',platform:'tiktok',user:'@pim_snack',time:'2 วัน',order:'ทองม้วน รสเนยสด × 2',coupon:'TH-B-89301 (ค้าง 4 วัน)'},
 {id:'TT-9952',platform:'tiktok',user:'@bank_review',time:'3 วัน',order:'ทองม้วน รสงาดำ × 1',coupon:'TH-B-89302 (ค้าง 3 วัน)'}
]);

// ข้อมูลจำลองผู้รับสำหรับปัญหากล้วยตากหวานเกินไป (8 ฟีดแบ็กจากลูกค้า)
export const sweetRecipients = Object.freeze([
 {id:'FB-601',platform:'facebook',user:'ต่อ***',time:'9 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 2',coupon:'สูตรหวานนำ (แสบคอ)'},
 {id:'IG-602',platform:'instagram',user:'@clean_eating_bkk',time:'4 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 4',coupon:'ขอสูตรหวานธรรมชาติ 100%'},
 {id:'SP-603',platform:'shopee',user:'รุ่งทิพย์***',time:'12 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 3',coupon:'หวานกว่าล็อตที่แล้ว'},
 {id:'FB-604',platform:'facebook',user:'นภัส***',time:'15 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 1',coupon:'อยากได้แบบไม่ใส่น้ำผึ้ง'},
 {id:'SP-605',platform:'shopee',user:'วนิดา***',time:'18 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 2',coupon:'ให้ 4 ดาว อยากให้หวานน้อยกว่านี้'},
 {id:'FB-606',platform:'facebook',user:'ประนอม***',time:'20 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 2',coupon:'ทานกับชาแล้วพอดี แต่กินเปล่าๆ หวานไปนิด'},
 {id:'IG-607',platform:'instagram',user:'@healthy_life_th',time:'22 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 5',coupon:'ลูกค้าสูงวัยชอบหวานน้อย'},
 {id:'SP-608',platform:'shopee',user:'ศิริพร***',time:'25 วัน',order:'กล้วยตากอบน้ำผึ้ง 200g × 1',coupon:'หวานฉ่ำเกินไปสำหรับคนคุมน้ำตาล'}
]);

// ข้อมูลจำลองผู้รับสำหรับโอกาสทองม้วนรสทุเรียน (15 รายชื่อผู้แสดงความสนใจ)
export const durianRecipients = Object.freeze([
 {id:'IG-701',platform:'instagram',user:'mew***',time:'6 วัน',order:'สนใจของฝากสิงคโปร์ (20 กล่อง)',coupon:'กดไลก์ 56'},
 {id:'TT-702',platform:'tiktok',user:'@eat_with_me',time:'5 วัน',order:'อยากรีวิวรสทุเรียนหมอนทอง',coupon:'กดไลก์ 48'},
 {id:'YT-703',platform:'youtube',user:'Krit***',time:'8 วัน',order:'พร้อมสั่งชุดของขวัญปีใหม่',coupon:'กดไลก์ 32'},
 {id:'FB-704',platform:'facebook',user:'นารีรัตน์***',time:'11 วัน',order:'ขอรสผลไม้ไทยแท้',coupon:'กดไลก์ 15'},
 {id:'IG-705',platform:'instagram',user:'@snack_bkk',time:'12 วัน',order:'เสนอขายหน้าร้านสนามบิน',coupon:'กดไลก์ 24'},
 {id:'TT-706',platform:'tiktok',user:'@foodie_joy',time:'14 วัน',order:'รอพรีออเดอร์ 11.11',coupon:'กดไลก์ 19'}
]);

/**
 * หน้า 7 และหน้ารายละเอียดปัญหาทั้งหมด (โอ๊ค)
 * รองรับ: packaging, delivery, sweet, durian
 */
export function issueDetailPage(issueId='packaging', {tracking=false}={}){
 if(issueId === 'delivery') return renderDeliveryDetail({tracking});
 if(issueId === 'sweet') return renderSweetDetail({tracking});
 if(issueId === 'durian') return renderDurianDetail({tracking});
 return renderPackagingDetail({tracking});
}

// -------------------------------------------------------------
// 1. รายละเอียดปัญหา: กล่องบุบ ทองม้วนแตก (Packaging)
// -------------------------------------------------------------
function renderPackagingDetail({tracking=false}={}){
 const issue = issues.find(i=>i.id==='packaging')||issues[0];
 const currentTracking = Boolean(tracking);

 const stateSwitcher = `
  <div class="bc-state-switcher bc-reveal" role="group" aria-label="สลับสถานะเพื่อทดสอบ Flow">
   <span class="bc-switcher-label">มุมมองสำหรับตรวจงาน:</span>
   <div class="bc-switcher-pills">
    <a href="#/issues/packaging" class="bc-switcher-pill ${!currentTracking?'is-active':''}" aria-pressed="${!currentTracking}">
     ${icon('flame')}<span>สถานะเริ่มต้น (22 ต.ค. วันนี้)</span>
    </a>
    <a href="#/issues/packaging?status=tracking" class="bc-switcher-pill ${currentTracking?'is-active':''}" aria-pressed="${currentTracking}">
     ${icon('check')}<span>สถานะติดตามผล (29 ต.ค. ผลจำลอง)</span>
    </a>
   </div>
  </div>
 `;

 const trackingBanner = currentTracking ? `
  <section class="bc-tracking-banner bc-reveal" role="region" aria-label="สถานะติดตามผล">
   <div class="bc-tracking-icon">${icon('check')}</div>
   <div class="bc-tracking-content">
    <div class="bc-tracking-head">
     <strong>ติดตามผล · จะเช็กผลอีกครั้ง 29 ต.ค.</strong>
     <span class="bc-sim-tag">ผลจำลอง</span>
    </div>
    <p>คุณแพรได้อนุมัติแนวทางแก้และส่งข้อความไปแล้วเมื่อ 22 ต.ค. ข้อมูลด้านล่างแสดงผลลัพธ์จำลองหลังผ่านไป 7 วัน: คำบ่นลดลง 83% ยอดขายทองม้วนฟื้นตัว +31%</p>
   </div>
   <div class="bc-tracking-action">
    <a href="#/issues/packaging" class="bc-button bc-button--soft bc-button--small">
     ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
    </a>
   </div>
  </section>
 ` : '';

 const statComplaints = currentTracking ? {val:'4', change:'−83%', note:'จาก 23 คอมเมนต์ (ผลจำลอง)', tone:'green'} : {val:'23', change:'+340%', note:'จากเฉลี่ย 5.2 ต่อสัปดาห์', tone:'red'};
 const statButter = currentTracking ? {val:'฿28,900', change:'+31%', note:'ฟื้นตัวจาก ฿22,000 (ผลจำลอง)', tone:'green'} : {val:'฿22,000', change:'−32%', note:'จาก ฿32,400 สัปดาห์ก่อน', tone:'red'};
 const statRating = currentTracking ? {val:'4.7', change:'จาก 4.5', note:'คะแนน Shopee ฟื้นตัว (ผลจำลอง)', tone:'green'} : {val:'4.5', change:'จาก 4.8', note:'คะแนนร้านบน Shopee', tone:'red'};

 const impactChart = `
  <div class="bc-dual-chart-card">
   <div class="bc-dual-chart-header">
    <div>
     <span class="bc-chart-eyebrow">ความสัมพันธ์ของข้อมูล (Correlation)</span>
     <h3>คำบ่นเรื่องกล่องบุบ vs ยอดขายทองม้วนรสเนยสด</h3>
    </div>
    <div class="bc-dual-legend">
     <span><i style="background:#ff3b30"></i>คำบ่นกล่องบุบ (+340%)</span>
     <span><i style="background:#d19471"></i>ยอดขายทองม้วน (−32%)</span>
    </div>
   </div>
   <div class="bc-dual-chart-body">
    <div class="bc-chart-annotation" aria-hidden="true">
     14 ต.ค. เปลี่ยนเป็นขนส่ง B
    </div>
    <svg viewBox="0 0 840 220" role="img" aria-label="กราฟแสดงคำบ่นเรื่องกล่องบุบพุ่งสูงขึ้นสอดคล้องกับยอดขายทองม้วนที่ลดลง">
     <g class="bc-chart-grid" stroke="#f0f0f4" stroke-width="1" stroke-dasharray="4 5">
      <line x1="20" y1="35" x2="820" y2="35" />
      <line x1="20" y1="95" x2="820" y2="95" />
      <line x1="20" y1="155" x2="820" y2="155" />
     </g>
     <line x1="286" y1="20" x2="286" y2="195" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="3 3"/>
     <path class="bc-chart-complaints" d="M30 175 C160 172 240 170 310 150 C420 115 580 65 810 40" fill="none" stroke="#ff3b30" stroke-width="2.6" stroke-linecap="round"/>
     <path class="bc-chart-butter-line" d="M30 45 C160 48 240 50 310 75 C420 120 580 155 810 168" fill="none" stroke="#d19471" stroke-width="2.4" stroke-linecap="round"/>
     <circle cx="310" cy="150" r="4.5" fill="white" stroke="#ff3b30" stroke-width="2"/>
     <circle cx="810" cy="40" r="4.5" fill="#ff3b30"/>
     <circle cx="810" cy="168" r="4.5" fill="#d19471"/>
    </svg>
    <div class="bc-chart-timeline-labels">
     <span>สัปดาห์ก่อน (7–13 ต.ค.)<br><strong>คำบ่นปกติ ~5 ข้อความ</strong><small>ยอดทองม้วน ฿32,400</small></span>
     <span style="text-align:center">14–18 ต.ค.<br><strong>เริ่มเปลี่ยนขนส่ง B</strong><small>คลิปไวรัล 48k วิว</small></span>
     <span style="text-align:right">สัปดาห์นี้ (16–22 ต.ค.)<br><strong>คำบ่นพุ่ง 23 ข้อความ</strong><small>ยอดทองม้วนดิ่งเหลือ ฿22,000</small></span>
    </div>
   </div>
   <div class="bc-dual-chart-footer">
    <p>${icon('sparkles')}<strong>ข้อค้นพบสำคัญ:</strong> สินค้าอื่น เช่น กล้วยตากอบน้ำผึ้ง ยอดขายคงที่ ฿26,200 (แทบไม่ลด) แสดงว่าปัญหาเกิดจากความเปราะบางของทองม้วนร่วมกับแรงกระแทกของขนส่ง B</p>
    <a href="#/sales/butter" class="bc-button bc-button--text bc-button--small">
     <span>ดูหน้ารายละเอียดสินค้าทองม้วน (หน้า 12)</span>${icon('chevron')}
    </a>
   </div>
  </div>
 `;

 const incidentTimeline = `
  <div class="bc-timeline-wrap">
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">14 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>เปลี่ยนเป็นขนส่ง B</strong>
     <p>เพื่อลดต้นทุนค่าส่ง ฿4 ต่อกล่อง</p>
    </div>
   </div>
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">16 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>เริ่มพบคำบ่นแรก</strong>
     <p>ลูกค้า Shopee แจ้งว่ากล่องบุบและขนมแตก</p>
    </div>
   </div>
   <div class="bc-timeline-step is-highlight">
    <span class="bc-timeline-marker">18 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>คลิป TikTok เริ่มไวรัล</strong>
     <p>@กินไปเรื่อยกับมิ้นท์ คนดูพุ่ง 48,000 ครั้ง</p>
    </div>
   </div>
   <div class="bc-timeline-step ${!currentTracking?'is-now':'is-done'}">
    <span class="bc-timeline-marker">22 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>BrandCare AI แจ้งเตือน 08:00</strong>
     <p>สรุปพบ 23 คอมเมนต์ เสนอ 3 ทางแก้</p>
    </div>
   </div>
   ${currentTracking ? `
   <div class="bc-timeline-step is-simulated">
    <span class="bc-timeline-marker">29 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>นัดตรวจผลซ้ำ (ผลจำลอง)</strong>
     <p>คำบ่นลดเหลือ 4 · ยอดขายฟื้นตัว +31%</p>
    </div>
   </div>
   `:''}
  </div>
 `;

 const viralTiktok = `
  <article class="bc-viral-card">
   <div class="bc-viral-badge-row">
    ${badge('drama')}
    <span class="bc-viral-views">${icon('play')}ยอดชม 48,000 ครั้ง · 3.1k ไลก์</span>
   </div>
   <div class="bc-viral-inner">
    <div class="bc-video-thumb">
     <div class="bc-thumb-player">
      ${icon('play')}
     </div>
     <span class="bc-video-duration">0:42</span>
     <span class="bc-video-source">${platform('tiktok')}</span>
    </div>
    <div class="bc-viral-meta">
     <div class="bc-viral-author">
      <strong>@กินไปเรื่อยกับมิ้นท์</strong>
      <span>ครีเอเตอร์สายกิน (สมมติ) · 4 วันที่แล้ว</span>
     </div>
     <blockquote class="bc-viral-quote">
      “กล่องยับมาก ข้างในแตกเป็นผง แต่รสชาติคือดีนะ”
     </blockquote>
     <div class="bc-viral-note">
      ${icon('sparkles')}<strong>สิ่งที่ AI วิเคราะห์:</strong> ใต้คลิปนี้มีคนถาม “ซื้อที่ไหน” ถึง 37 คน แต่เริ่มมีผู้ซื้อรายอื่นเข้ามาคอมเมนต์กังวลเรื่องการแพ็กของ
     </div>
     <div class="bc-viral-actions">
      <a href="#/comments/2?from=issues/packaging" class="bc-button bc-button--soft bc-button--small">
       ${icon('message')}<span>ดูรายละเอียดคอมเมนต์คลิปนี้ (หน้า 10)</span>
      </a>
      <a href="#/comments?category=intent" class="bc-button bc-button--text bc-button--small">
       <span>ดู 37 คนที่ถามซื้อ</span>${icon('chevron')}
      </a>
     </div>
    </div>
   </div>
  </article>
 `;

 const packagingComments = [comments[0], comments[2], comments[7], comments[9]];

 const solutions = `
  <div class="bc-solutions-grid">
   <article class="bc-solution-card is-recommended">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag">${icon('star')}แนะนำสูงสุด</span>
     <span class="bc-cost-tag">+฿3 / ออเดอร์</span>
    </div>
    <h3>1. เปลี่ยนเป็นกล่องลูกฟูก 2 ชั้น พร้อมห่อกันกระแทก</h3>
    <p class="bc-solution-desc">อัปเกรดความแข็งแรงของกล่องพัสดุและใส่บับเบิลรอบกระปุกทองม้วน ป้องกันแรงกระแทกเพิ่มขึ้น 4 เท่า</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุนเพิ่ม</span><strong>+฿3</strong><small>ต่อชิ้น</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">คำบ่นลดลง</strong><small>ใน 1 สัปดาห์</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ อนุมัติแล้วเมื่อ 22 ต.ค.':'พร้อมนำไปแจ้งทีมแพ็ก'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag blue">${icon('message')}รักษาลูกค้าเก่า</span>
     <span class="bc-cost-tag">~฿460 รวม</span>
    </div>
    <h3>2. ส่งข้อความขอโทษ 23 คน พร้อมคูปองส่วนลด ฿20</h3>
    <p class="bc-solution-desc">ส่งข้อความตามน้ำเสียงแบรนด์ “บ้านสวน” ขออภัยและมอบโค้ดลด ฿20 เพื่อกู้คะแนนรีวิวและสร้างความประทับใจ</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุนรวม</span><strong>~฿460</strong><small>(฿20 × 23 คน)</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">กู้คะแนน 4.7</strong><small>ป้องกันการเสียลูกค้า</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ส่งครบ 23 คนแล้ว':'ร่างข้อความ AI พร้อมส่ง'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag green">${icon('sparkles')}สร้างความมั่นใจ</span>
     <span class="bc-cost-tag">฿0 ฟรี</span>
    </div>
    <h3>3. โพสต์คลิปแพ็กของแบบใหม่บน TikTok และ Facebook</h3>
    <p class="bc-solution-desc">ถ่ายคลิปสั้นโชว์กล่อง 2 ชั้นและกระบวนการแพ็กใหม่ เพื่อสร้างความมั่นใจให้ผู้ซื้อรายใหม่ที่เห็นคลิปดราม่า</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุน</span><strong>฿0</strong><small>ทำเองได้ทันที</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">สร้างความมั่นใจ</strong><small>ให้ผู้ชม 48,000 คน</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ โพสต์คลิปแล้ว':'ร่างแคปชันพร้อมโพสต์'}</span>
    </div>
   </article>

   <article class="bc-solution-card is-alternative">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag gray">${icon('shield')}ทางเลือกเพิ่มเติม</span>
     <span class="bc-cost-tag">+฿4 / ออเดอร์</span>
    </div>
    <h3>ทางเลือก: สลับกลับไปใช้ขนส่ง A</h3>
    <p class="bc-solution-desc">ขนส่งเดิมมีความระมัดระวังพัสดุดีกว่า แต่ต้นทุนสูงกว่ากล่อง 2 ชั้น ฿1 ต่อชิ้น</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุนเพิ่ม</span><strong>+฿4</strong><small>ต่อชิ้น</small></div>
     <div><span>ผลที่คาดไว้</span><strong>แก้ที่ต้นเหตุ</strong><small>แต่ต้นทุนแพงกว่า</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>สำรองไว้หากยังพบปัญหา</span>
    </div>
   </article>
  </div>
 `;

 return `
  <div class="bc-page bc-issue-detail-page">
   <nav class="bc-breadcrumbs bc-reveal" aria-label="เส้นทางนำทาง">
    <a href="#/today">${icon('home')}<span>สรุปวันนี้</span></a>
    ${icon('chevron')}
    <a href="#/issues">รายการปัญหา</a>
    ${icon('chevron')}
    <span aria-current="page">กล่องบุบ ทองม้วนแตก</span>
   </nav>

   ${stateSwitcher}
   ${trackingBanner}

   <header class="bc-issue-hero bc-reveal">
    <div class="bc-issue-hero-tags">
     ${severity(issue.severity)}
     ${status(currentTracking?'ติดตามผล (29 ต.ค.)':'ใหม่ (22 ต.ค.)', currentTracking?'green':'neutral')}
     <span class="bc-channel-pills">
      ${issue.platforms.map(p=>platform(p,{label:true})).join('')}
     </span>
    </div>
    <h1 class="bc-issue-heading">
     ${currentTracking ? `ติดตามผล: คำบ่นกล่องบุบลดลง <span class="bc-highlight-green">−83%</span>` : `ลูกค้าบ่นเรื่องกล่องบุบ <span class="bc-highlight-red">+340%</span>`}
    </h1>
    <p class="bc-issue-subhead">
     ${currentTracking ? `พบคำบ่นลดเหลือ <strong>4 คอมเมนต์</strong> ใน 7 วันล่าสุด (−83%) · ยอดขายทองม้วนรสเนยสดฟื้นตัว +31% เป็น ฿28,900 (ผลจำลอง 29 ต.ค.)` : `พบคำบ่น <strong>23 คอมเมนต์</strong> ใน 7 วันล่าสุด (+340%) · ยอดขายทองม้วนรสเนยสดลดลง 32% หลังเปลี่ยนเจ้าขนส่งเมื่อ 14 ต.ค.`}
    </p>

    <div class="bc-issue-hero-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแนวทางแก้และส่งข้อความ (หน้า 8)</span>
      </button>
      <a href="#/issues/packaging/approve" class="bc-button bc-button--secondary">
       ${icon('arrow')}<span>เปิดหน้าตรวจทานข้อความ</span>
      </a>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับหน้ารวมสรุปวันนี้</span>
      </a>
      <a href="#/issues/packaging" class="bc-button bc-button--secondary">
       ${icon('refresh')}<span>สลับกลับไปดูสถานะก่อนอนุมัติ</span>
      </a>
     `}
     <a href="#/comments?issue=packaging" class="bc-button bc-button--soft">
      ${icon('message')}<span>ดูคอมเมนต์ทั้งหมด 23 อัน (หน้า 10)</span>
     </a>
    </div>
   </header>

   <section class="bc-metric-grid" aria-label="ตัวเลขผลกระทบ">
    ${metricCard({
     title:'คำบ่นเรื่องแพ็กเกจ',
     value:statComplaints.val,
     unit:'คอมเมนต์',
     change:statComplaints.change,
     note:statComplaints.note,
     tone:statComplaints.tone,
     changeTone:statComplaints.tone,
     iconName:'message',
     trend:issue.trend,
     href:'#/comments?issue=packaging'
    })}
    ${metricCard({
     title:'ยอดขายทองม้วนเนยสด',
     value:statButter.val,
     change:statButter.change,
     note:statButter.note,
     tone:statButter.tone,
     changeTone:statButter.tone,
     iconName:'box',
     href:'#/sales/butter'
    })}
    ${metricCard({
     title:'คะแนนรีวิวบน Shopee',
     value:statRating.val,
     unit:'/ 5',
     change:statRating.change,
     note:statRating.note,
     tone:statRating.tone,
     changeTone:statRating.tone,
     iconName:'star',
     href:'#/sales/butter'
    })}
   </section>

   <section class="bc-card bc-root-cause-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}การวิเคราะห์หาสาเหตุเชิงลึกโดย AI</span>
      <h2>สาเหตุหลัก: เริ่มหลังเปลี่ยนเจ้าขนส่ง 14 ต.ค.</h2>
     </div>
     <span class="bc-accuracy-badge">${icon('check')}ความมั่นใจ 98%</span>
    </div>

    <div class="bc-root-cause-content">
     <div class="bc-cause-callout">
      <div class="bc-callout-icon">${icon('alert')}</div>
      <div class="bc-callout-text">
       <strong>“คำบ่นเรื่องกล่องบุบเริ่มเพิ่มหลังวันที่ 14 ต.ค. ซึ่งเป็นวันที่เปลี่ยนเป็นขนส่ง B และ 91% ของออเดอร์ที่มีคำบ่นส่งด้วยขนส่ง B ส่วนสินค้าที่ไม่แตกง่าย เช่น กล้วยตาก ไม่มีคำบ่นเพิ่ม”</strong>
       <p>อ้างอิงข้อมูลคำสั่งซื้อ 513 ออเดอร์ และคอมเมนต์ 23 รายการในช่วง 16–22 ต.ค. 2026</p>
      </div>
     </div>

     <div class="bc-cause-stats-row">
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">91%</span>
       <span class="bc-cause-lbl">ของคำบ่นมาจากขนส่ง B<br><small>(21 จาก 23 ออเดอร์)</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">฿4</span>
       <span class="bc-cause-lbl">ส่วนต่างค่าส่งที่ประหยัดได้<br><small>แต่กระทบยอดขาย ฿10,400</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">0%</span>
       <span class="bc-cause-lbl">คำบ่นของสินค้าที่ไม่เปราะบาง<br><small>(กล้วยตาก และ ข้าวแต๋น)</small></span>
      </div>
     </div>

     <div class="bc-timeline-container">
      <h3 class="bc-timeline-title">${icon('clock')}ลำดับเหตุการณ์สำคัญ (Timeline)</h3>
      ${incidentTimeline}
     </div>
    </div>
   </section>

   <section class="bc-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">วิเคราะห์ผลกระทบเชิงธุรกิจ</span>
      <h2>ผลกระทบต่อยอดขายและคะแนนร้าน</h2>
     </div>
     <a href="#/sales/butter" class="bc-button bc-button--text">
      <span>เจาะลึกสินค้า</span>${icon('chevron')}
     </a>
    </div>
    ${impactChart}
   </section>

   <section class="bc-evidence-section bc-reveal">
    <div class="bc-section-heading">
     <div>
      <span class="bc-eyebrow">หลักฐานและเสียงสะท้อนจากลูกค้า</span>
      <h2>หลักฐานที่ตรวจพบ (Evidence Hub)</h2>
      <p>พบคำบ่น 23 รายการจาก 3 แพลตฟอร์ม (Shopee 14 · TikTok 6 · Facebook 3)</p>
     </div>
     <a href="#/comments?issue=packaging" class="bc-button bc-button--secondary">
      ${icon('message')}<span>ดูทั้งหมด 23 อัน (หน้า 10)</span>
     </a>
    </div>

    ${viralTiktok}

    <div class="bc-sample-comments-head">
     <h3>ตัวอย่างคอมเมนต์ที่มีผลต่อคะแนนร้าน</h3>
     <span>คัดกรอง 4 คอมเมนต์สำคัญตาม MOCKUP-PAGES.md ข้อ 6.7</span>
    </div>
    <div class="bc-comments-grid">
     ${packagingComments.map(c=>`<div class="bc-reveal">${commentCard(c,{from:'issues/packaging'})}</div>`).join('')}
    </div>
   </section>

   <section class="bc-card bc-solutions-section bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}แผนปฏิบัติการแก้ไข</span>
      <h2>3 แนวทางแก้ที่ AI เสนอ (พร้อมต้นทุนและผลที่คาดไว้)</h2>
     </div>
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแนวทางแก้ (หน้า 8)</span>
      </button>
     ` : `
      <span class="bc-badge bc-badge--green">${icon('check')}ดำเนินการแก้ไขแล้ว</span>
     `}
    </div>
    ${solutions}
   </section>

   <div class="bc-issue-bottom-bar bc-reveal">
    <div class="bc-bar-info">
     <strong>${currentTracking?'อยู่ในสถานะติดตามผล (เช็กซ้ำ 29 ต.ค.)':'พร้อมส่งข้อความขอโทษและคูปองให้ลูกค้า 23 คน'}</strong>
     <span>${currentTracking?'ผลจำลองแสดงคำบ่นลดลง 83%':'ตรวจทานร่างข้อความและภาพประกาศก่อนส่งจริง'}</span>
    </div>
    <div class="bc-bar-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary bc-button--large" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแนวทางแก้และส่งข้อความ</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับสรุปวันนี้</span>
      </a>
     `}
    </div>
   </div>

   <div class="bc-context-note">
    ${icon('shield')}ข้อมูลร้านขนมบ้านสวนและคอมเมนต์เป็นชุดข้อมูลจำลองตาม MOCKUP-PAGES.md ข้อ 6 · ไม่มีการเชื่อมต่อบัญชีจริง
   </div>
  </div>
 `;
}

// -------------------------------------------------------------
// 2. รายละเอียดปัญหา: ส่งช้ากว่าเดิม (Delivery)
// -------------------------------------------------------------
function renderDeliveryDetail({tracking=false}={}){
 const issue = issues.find(i=>i.id==='delivery')||issues[1];
 const currentTracking = Boolean(tracking);

 const stateSwitcher = `
  <div class="bc-state-switcher bc-reveal" role="group" aria-label="สลับสถานะเพื่อทดสอบ Flow">
   <span class="bc-switcher-label">มุมมองสำหรับตรวจงาน:</span>
   <div class="bc-switcher-pills">
    <a href="#/issues/delivery" class="bc-switcher-pill ${!currentTracking?'is-active':''}" aria-pressed="${!currentTracking}">
     ${icon('flame')}<span>สถานะเริ่มต้น (22 ต.ค. วันนี้)</span>
    </a>
    <a href="#/issues/delivery?status=tracking" class="bc-switcher-pill ${currentTracking?'is-active':''}" aria-pressed="${currentTracking}">
     ${icon('check')}<span>สถานะติดตามผล (29 ต.ค. ผลจำลอง)</span>
    </a>
   </div>
  </div>
 `;

 const trackingBanner = currentTracking ? `
  <section class="bc-tracking-banner bc-reveal" role="region" aria-label="สถานะติดตามผล">
   <div class="bc-tracking-icon">${icon('check')}</div>
   <div class="bc-tracking-content">
    <div class="bc-tracking-head">
     <strong>ติดตามผล · สลับขนส่งด่วนเรียบร้อย (ผลจำลอง 29 ต.ค.)</strong>
     <span class="bc-sim-tag">ผลจำลอง</span>
    </div>
    <p>หลังส่งแจ้งเตือนและสลับออเดอร์ขนมสดเป็นขนส่งด่วน: ระยะเวลาจัดส่งเฉลี่ยลดเหลือ 1.8 วัน อัตราลูกค้ายกเลิกคำสั่งซื้อลดลงเหลือ 0.9% ไม่พบพัสดุตกค้าง</p>
   </div>
   <div class="bc-tracking-action">
    <a href="#/issues/delivery" class="bc-button bc-button--soft bc-button--small">
     ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
    </a>
   </div>
  </section>
 ` : '';

 const statDays = currentTracking ? {val:'1.8 วัน', change:'−57%', note:'ส่งถึงวันรุ่งขึ้น (ผลจำลอง)', tone:'green'} : {val:'4.2 วัน', change:'+110%', note:'จากเดิมเฉลี่ย 2.0 วัน', tone:'red'};
 const statCancel = currentTracking ? {val:'0.9%', change:'−85%', note:'กลับสู่ระดับปกติ (ผลจำลอง)', tone:'green'} : {val:'6.8%', change:'+460%', note:'ปกติเฉลี่ย 1.2% (ยกเลิก 4 ออเดอร์)', tone:'red'};
 const statComplaints = currentTracking ? {val:'1', change:'−89%', note:'จาก 9 คอมเมนต์ (ผลจำลอง)', tone:'green'} : {val:'9', change:'+110%', note:'บ่นเรื่องส่งช้าใน 7 วัน', tone:'red'};

 const impactChart = `
  <div class="bc-dual-chart-card">
   <div class="bc-dual-chart-header">
    <div>
     <span class="bc-chart-eyebrow">ความสัมพันธ์ของข้อมูล (Correlation)</span>
     <h3>ระยะเวลาจัดส่งเฉลี่ย vs อัตราการกดยกเลิกออเดอร์</h3>
    </div>
    <div class="bc-dual-legend">
     <span><i style="background:#ff3b30"></i>ระยะเวลาส่งพัสดุ (+110%)</span>
     <span><i style="background:#d97706"></i>อัตรากดยกเลิกออเดอร์ (+460%)</span>
    </div>
   </div>
   <div class="bc-dual-chart-body">
    <div class="bc-chart-annotation" aria-hidden="true">
     14 ต.ค. เปลี่ยนเป็นขนส่ง B
    </div>
    <svg viewBox="0 0 840 220" role="img" aria-label="กราฟแสดงเวลาจัดส่งที่ยืดเยื้อส่งผลให้อัตรายกเลิกออเดอร์พุ่งสูง">
     <g class="bc-chart-grid" stroke="#f0f0f4" stroke-width="1" stroke-dasharray="4 5">
      <line x1="20" y1="35" x2="820" y2="35" />
      <line x1="20" y1="95" x2="820" y2="95" />
      <line x1="20" y1="155" x2="820" y2="155" />
     </g>
     <line x1="286" y1="20" x2="286" y2="195" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="3 3"/>
     <path class="bc-chart-complaints" d="M30 160 C180 158 240 155 310 135 C420 100 580 60 810 45" fill="none" stroke="#ff3b30" stroke-width="2.6" stroke-linecap="round"/>
     <path class="bc-chart-butter-line" d="M30 170 C180 168 240 165 310 148 C420 115 580 80 810 55" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
     <circle cx="310" cy="135" r="4.5" fill="white" stroke="#ff3b30" stroke-width="2"/>
     <circle cx="810" cy="45" r="4.5" fill="#ff3b30"/>
     <circle cx="810" cy="55" r="4.5" fill="#d97706"/>
    </svg>
    <div class="bc-chart-timeline-labels">
     <span>14 ต.ค. (ขนส่งเดิม)<br><strong>เฉลี่ย 2.0 วัน</strong><small>ยกเลิก 1.2%</small></span>
     <span style="text-align:center">17–19 ต.ค.<br><strong>ศูนย์บางแคคอขวด</strong><small>พัสดุค้างสะสม</small></span>
     <span style="text-align:right">สัปดาห์นี้ (20–22 ต.ค.)<br><strong>เฉลี่ย 4.2 วัน</strong><small>ยกเลิก 6.8% (฿8,400)</small></span>
    </div>
   </div>
   <div class="bc-dual-chart-footer">
    <p>${icon('sparkles')}<strong>ข้อค้นพบสำคัญ:</strong> พัสดุติดค้างกระจุกตัวที่ศูนย์กระจายสินค้าปลายทาง (DC บางแคและ DC รังสิต) เฉลี่ย 2.4 วัน ส่งผลให้ออเดอร์ขนมสดเสี่ยงหมดอายุ</p>
   </div>
  </div>
 `;

 const timeline = `
  <div class="bc-timeline-wrap">
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">14 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>เริ่มใช้ขนส่ง B</strong>
     <p>ย้ายออเดอร์เข้าระบบขนส่ง B เพื่อลดต้นทุน</p>
    </div>
   </div>
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">17 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ศูนย์บางแคคัดแยกช้า</strong>
     <p>พัสดุ Standard เริ่มตกค้างเกิน 24 ชม.</p>
    </div>
   </div>
   <div class="bc-timeline-step is-highlight">
    <span class="bc-timeline-marker">19 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ลูกค้าเริ่มทักถามสถานะ</strong>
     <p>ลูกค้า Shopee และ Facebook แชตถามพัสดุ 18 ครั้ง</p>
    </div>
   </div>
   <div class="bc-timeline-step ${!currentTracking?'is-now':'is-done'}">
    <span class="bc-timeline-marker">22 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>BrandCare AI ตรวจพบปัญหา</strong>
     <p>พัสดุค้าง 35 ชิ้น · กดยกเลิกแล้ว 4 ออเดอร์</p>
    </div>
   </div>
   ${currentTracking ? `
   <div class="bc-timeline-step is-simulated">
    <span class="bc-timeline-marker">29 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ติดตามผล (ผลจำลอง)</strong>
     <p>ส่งเฉลี่ยเหลือ 1.8 วัน · ยกเลิกเหลือ 0.9%</p>
    </div>
   </div>
   `:''}
  </div>
 `;

 const deliveryCommentsList = comments.filter(c=>c.issue==='delivery');

 const solutions = `
  <div class="bc-solutions-grid">
   <article class="bc-solution-card is-recommended">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag">${icon('star')}แนะนำสูงสุด</span>
     <span class="bc-cost-tag">+฿5 / ออเดอร์</span>
    </div>
    <h3>1. สลับออเดอร์ขนมสดเป็นขนส่งด่วน Express (1 วันถึง)</h3>
    <p class="bc-solution-desc">สำหรับขนมที่มีอายุสั้น ให้สลับไปใช้บริการ Next-Day Delivery เพื่อรับประกันส่งถึงภายใน 24 ชม.</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุนเพิ่ม</span><strong>+฿5</strong><small>ต่อชิ้น</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">ส่งใน 1.8 วัน</strong><small>ลดการยกเลิก 85%</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ดำเนินการแล้วเมื่อ 22 ต.ค.':'พร้อมนำไปตั้งค่าระบบ'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag blue">${icon('message')}แจ้งเตือนล่วงหน้า</span>
     <span class="bc-cost-tag">฿0 ฟรี</span>
    </div>
    <h3>2. ส่งแจ้งสถานะพัสดุล่วงหน้าผ่าน LINE OA / แชต 35 คน</h3>
    <p class="bc-solution-desc">ส่งข้อความอัตโนมัติแจ้งว่าพัสดุอยู่ที่ศูนย์คัดแยก พร้อมขออภัยและแจ้งวันส่งมอบที่ชัดเจนก่อนลูกค้าจะทักมาถาม</p>
    <div class="bc-solution-metrics">
     <div><span>ส่งทันที</span><strong>35 ออเดอร์</strong><small>ในระบบ</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">ระงับการยกเลิก</strong><small>รักษาความประทับใจ</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ส่งข้อความครบแล้ว':'ร่างข้อความ AI พร้อมส่ง'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag green">${icon('shield')}เจรจาขนส่ง B</span>
     <span class="bc-cost-tag">ชดเชยค่าปรับ</span>
    </div>
    <h3>3. ยื่นเคลมค่าปรับความล่าช้าเกิน SLA กับขนส่ง B</h3>
    <p class="bc-solution-desc">รวบรวมรายงานพัสดุค้างเกิน 3 วัน 35 ชิ้น ยื่นต่อผู้จัดการสาขาเพื่อขอส่วนลดค่าส่งและเร่งคัดแยกเป็นพิเศษ</p>
    <div class="bc-solution-metrics">
     <div><span>เคลมได้</span><strong>~฿1,400</strong><small>ค่าปรับล่าช้า</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">ได้รับช่องทางด่วน</strong><small>แก้ที่ต้นตอ</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ส่งเอกสารแล้ว':'เอกสารรายงานพร้อมส่ง'}</span>
    </div>
   </article>
  </div>
 `;

 return `
  <div class="bc-page bc-issue-detail-page">
   <nav class="bc-breadcrumbs bc-reveal" aria-label="เส้นทางนำทาง">
    <a href="#/today">${icon('home')}<span>สรุปวันนี้</span></a>
    ${icon('chevron')}
    <a href="#/issues">รายการปัญหา</a>
    ${icon('chevron')}
    <span aria-current="page">ส่งช้ากว่าเดิม</span>
   </nav>

   ${stateSwitcher}
   ${trackingBanner}

   <header class="bc-issue-hero bc-reveal">
    <div class="bc-issue-hero-tags">
     ${severity(issue.severity)}
     ${status(currentTracking?'ติดตามผล (29 ต.ค.)':'ใหม่ (22 ต.ค.)', currentTracking?'green':'neutral')}
     <span class="bc-channel-pills">
      ${issue.platforms.map(p=>platform(p,{label:true})).join('')}
     </span>
    </div>
    <h1 class="bc-issue-heading">
     ${currentTracking ? `ติดตามผล: ระยะเวลาส่งลดเหลือ <span class="bc-highlight-green">1.8 วัน</span>` : `ลูกค้าบ่นเรื่องส่งช้ากว่าเดิม <span class="bc-highlight-red">+110%</span>`}
    </h1>
    <p class="bc-issue-subhead">
     ${currentTracking ? `ระยะเวลาจัดส่งเฉลี่ยลดเหลือ <strong>1.8 วัน</strong> (−57%) · อัตรายกเลิกคำสั่งซื้อลดลงเหลือ 0.9% ไม่พบพัสดุตกค้าง (ผลจำลอง 29 ต.ค.)` : `ขนส่ง B ใช้เวลาเฉลี่ย <strong>4.2 วัน</strong> จากเดิม 2.0 วัน · พบพัสดุค้างคลัง 35 ชิ้น และลูกค้ากดยกเลิกแล้ว 4 ออเดอร์ (฿8,400)`}
    </p>

    <div class="bc-issue-hero-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแจ้งเตือนลูกค้า 35 ออเดอร์</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับหน้ารวมสรุปวันนี้</span>
      </a>
      <a href="#/issues/delivery" class="bc-button bc-button--secondary">
       ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
      </a>
     `}
     <a href="#/comments?issue=delivery" class="bc-button bc-button--soft">
      ${icon('message')}<span>ดูคอมเมนต์เรื่องจัดส่ง</span>
     </a>
    </div>
   </header>

   <section class="bc-metric-grid" aria-label="ตัวเลขผลกระทบ">
    ${metricCard({
     title:'ระยะเวลาจัดส่งเฉลี่ย',
     value:statDays.val,
     change:statDays.change,
     note:statDays.note,
     tone:statDays.tone,
     changeTone:statDays.tone,
     iconName:'clock',
     trend:issue.trend,
     href:'#/comments?issue=delivery'
    })}
    ${metricCard({
     title:'อัตรากดยกเลิกออเดอร์',
     value:statCancel.val,
     change:statCancel.change,
     note:statCancel.note,
     tone:statCancel.tone,
     changeTone:statCancel.tone,
     iconName:'alert',
     href:'#/comments?issue=delivery'
    })}
    ${metricCard({
     title:'คำบ่นเรื่องจัดส่ง',
     value:statComplaints.val,
     unit:'คอมเมนต์',
     change:statComplaints.change,
     note:statComplaints.note,
     tone:statComplaints.tone,
     changeTone:statComplaints.tone,
     iconName:'message',
     href:'#/comments?issue=delivery'
    })}
   </section>

   <section class="bc-card bc-root-cause-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}การวิเคราะห์หาสาเหตุเชิงลึกโดย AI</span>
      <h2>สาเหตุหลัก: ศูนย์คัดแยกขนส่ง B ปลายทางคอขวด</h2>
     </div>
     <span class="bc-accuracy-badge">${icon('check')}ความมั่นใจ 96%</span>
    </div>

    <div class="bc-root-cause-content">
     <div class="bc-cause-callout">
      <div class="bc-callout-icon">${icon('alert')}</div>
      <div class="bc-callout-text">
       <strong>“หลังย้ายมาใช้ขนส่ง B พัสดุ Standard ค้างสะสมที่ศูนย์กระจายสินค้าปลายทาง (DC บางแคและ DC รังสิต) เฉลี่ย 2.4 วัน ส่งผลให้ระยะเวลาส่งมอบปลายทางยืดเยื้อจาก 2 วันเป็น 4.2 วัน ลูกค้า 4 รายขอยกเลิกออเดอร์”</strong>
       <p>อ้างอิงข้อมูลสแกนบาร์โค้ดพัสดุ 513 รายการและแชตสอบถาม 18 ครั้ง</p>
      </div>
     </div>

     <div class="bc-cause-stats-row">
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">100%</span>
       <span class="bc-cause-lbl">ของคำบ่นส่งช้ามาจากขนส่ง B<br><small>(ศูนย์บางแค 72% · รังสิต 28%)</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">35 ชิ้น</span>
       <span class="bc-cause-lbl">พัสดุที่ค้างเกิน 3 วัน<br><small>เสี่ยงถูกลูกค้ายกเลิกเพิ่ม</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">฿8,400</span>
       <span class="bc-cause-lbl">มูลค่าออเดอร์ที่ถูกยกเลิกแล้ว<br><small>(4 ออเดอร์ใหญ่)</small></span>
      </div>
     </div>

     <div class="bc-timeline-container">
      <h3 class="bc-timeline-title">${icon('clock')}ลำดับเหตุการณ์สำคัญ (Timeline)</h3>
      ${timeline}
     </div>
    </div>
   </section>

   <section class="bc-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">วิเคราะห์ผลกระทบเชิงธุรกิจ</span>
      <h2>ผลกระทบต่อเวลาจัดส่งและอัตราการยกเลิก</h2>
     </div>
    </div>
    ${impactChart}
   </section>

   <section class="bc-evidence-section bc-reveal">
    <div class="bc-section-heading">
     <div>
      <span class="bc-eyebrow">หลักฐานและเสียงสะท้อนจากลูกค้า</span>
      <h2>หลักฐานที่ตรวจพบ (Evidence Hub)</h2>
      <p>พบคำบ่น 9 รายการจาก Facebook (4), Shopee (3) และ TikTok (2)</p>
     </div>
     <a href="#/comments?issue=delivery" class="bc-button bc-button--secondary">
      ${icon('message')}<span>ดูทั้งหมดในหน้ารวม</span>
     </a>
    </div>

    <div class="bc-sample-comments-head">
     <h3>ตัวอย่างคอมเมนต์สอบถามและขอยกเลิกออเดอร์</h3>
     <span>คัดกรอง 4 คอมเมนต์สำคัญจากลูกค้าจริง</span>
    </div>
    <div class="bc-comments-grid">
     ${deliveryCommentsList.map(c=>`<div class="bc-reveal">${commentCard(c)}</div>`).join('')}
    </div>
   </section>

   <section class="bc-card bc-solutions-section bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}แผนปฏิบัติการแก้ไข</span>
      <h2>3 แนวทางแก้ที่ AI เสนอ</h2>
     </div>
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>ดำเนินการแก้ไข</span>
      </button>
     ` : `
      <span class="bc-badge bc-badge--green">${icon('check')}ดำเนินการแก้ไขแล้ว</span>
     `}
    </div>
    ${solutions}
   </section>

   <div class="bc-issue-bottom-bar bc-reveal">
    <div class="bc-bar-info">
     <strong>${currentTracking?'อยู่ในสถานะติดตามผล (สลับขนส่งด่วนแล้ว)':'พร้อมส่งข้อความอัปเดตสถานะพัสดุให้ลูกค้า 35 คน'}</strong>
     <span>${currentTracking?'ระยะเวลาจัดส่งลดลงเหลือ 1.8 วัน':'ลดการยกเลิกออเดอร์และรักษาความเชื่อมั่น'}</span>
    </div>
    <div class="bc-bar-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary bc-button--large" data-action="open-approval">
       ${icon('check')}<span>ส่งแจ้งเตือน 35 ออเดอร์</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับสรุปวันนี้</span>
      </a>
     `}
    </div>
   </div>
  </div>
 `;
}

// -------------------------------------------------------------
// 3. รายละเอียดปัญหา: กล้วยตากหวานเกินไป (Sweet)
// -------------------------------------------------------------
function renderSweetDetail({tracking=false}={}){
 const issue = issues.find(i=>i.id==='sweet')||issues[2];
 const currentTracking = Boolean(tracking);

 const stateSwitcher = `
  <div class="bc-state-switcher bc-reveal" role="group" aria-label="สลับสถานะเพื่อทดสอบ Flow">
   <span class="bc-switcher-label">มุมมองสำหรับตรวจงาน:</span>
   <div class="bc-switcher-pills">
    <a href="#/issues/sweet" class="bc-switcher-pill ${!currentTracking?'is-active':''}" aria-pressed="${!currentTracking}">
     ${icon('flame')}<span>สถานะเริ่มต้น (22 ต.ค. วันนี้)</span>
    </a>
    <a href="#/issues/sweet?status=tracking" class="bc-switcher-pill ${currentTracking?'is-active':''}" aria-pressed="${currentTracking}">
     ${icon('check')}<span>สถานะติดตามผล (29 ต.ค. ผลจำลอง)</span>
    </a>
   </div>
  </div>
 `;

 const trackingBanner = currentTracking ? `
  <section class="bc-tracking-banner bc-reveal" role="region" aria-label="สถานะติดตามผล">
   <div class="bc-tracking-icon">${icon('check')}</div>
   <div class="bc-tracking-content">
    <div class="bc-tracking-head">
     <strong>ติดตามผล · ปรับสูตรลดเวลาอบน้ำผึ้งแล้ว (ผลจำลอง 29 ต.ค.)</strong>
     <span class="bc-sim-tag">ผลจำลอง</span>
    </div>
    <p>หลังส่งแจ้งแผนกครัวและปรับลดเวลาอบลง 15%: คะแนนรีวิวกล้วยตากฟื้นตัวขึ้นเป็น 4.9 ดาว และผลตอบรับจากลูกค้าสายคลีนชื่นชมรสชาติกลมกล่อม 96%</p>
   </div>
   <div class="bc-tracking-action">
    <a href="#/issues/sweet" class="bc-button bc-button--soft bc-button--small">
     ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
    </a>
   </div>
  </section>
 ` : '';

 const statRating = currentTracking ? {val:'4.9 / 5', change:'+0.3', note:'คะแนนฟื้นตัวหลังปรับสูตร (ผลจำลอง)', tone:'green'} : {val:'4.6 / 5', change:'−0.3', note:'ลดจาก 4.9 เมื่อเดือนก่อน', tone:'red'};
 const statShare = currentTracking ? {val:'4%', change:'−24%', note:'เหลือฟีดแบ็กหวานนำเพียงเล็กน้อย', tone:'green'} : {val:'28%', change:'+22%', note:'ของคอมเมนต์กล้วยตากระบุว่าหวานเกิน', tone:'red'};
 const statRev = currentTracking ? {val:'฿19,400', change:'+15%', note:'ยอดขายกล้วยตากเพิ่มขึ้น (ผลจำลอง)', tone:'green'} : {val:'฿16,800', change:'คงที่', note:'ยอดขายไม่ลดลงรุนแรง ลูกค้าเก่าซ้ำ 78%', tone:'neutral'};

 const impactChart = `
  <div class="bc-dual-chart-card">
   <div class="bc-dual-chart-header">
    <div>
     <span class="bc-chart-eyebrow">ความสัมพันธ์ของข้อมูล (Correlation)</span>
     <h3>สัดส่วนความเห็นเรื่องความหวาน vs คะแนนรีวิวกล้วยตาก</h3>
    </div>
    <div class="bc-dual-legend">
     <span><i style="background:#ff3b30"></i>ข้อเสนอแนะหวานเกิน (+22%)</span>
     <span><i style="background:#24834b"></i>คะแนนความพึงพอใจกล้วยตาก</span>
    </div>
   </div>
   <div class="bc-dual-chart-body">
    <div class="bc-chart-annotation" aria-hidden="true">
     25 ก.ย. กล้วยน้ำว้าฤดูฝนหวานธรรมชาติสูง
    </div>
    <svg viewBox="0 0 840 220" role="img" aria-label="กราฟแสดงสัดส่วนข้อเสนอแนะความหวานและคะแนนรีวิว">
     <g class="bc-chart-grid" stroke="#f0f0f4" stroke-width="1" stroke-dasharray="4 5">
      <line x1="20" y1="35" x2="820" y2="35" />
      <line x1="20" y1="95" x2="820" y2="95" />
      <line x1="20" y1="155" x2="820" y2="155" />
     </g>
     <line x1="286" y1="20" x2="286" y2="195" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="3 3"/>
     <path class="bc-chart-complaints" d="M30 170 C180 168 240 162 310 145 C420 120 580 85 810 65" fill="none" stroke="#ff3b30" stroke-width="2.6" stroke-linecap="round"/>
     <path class="bc-chart-butter-line" d="M30 40 C180 42 240 45 310 55 C420 75 580 95 810 110" fill="none" stroke="#24834b" stroke-width="2.4" stroke-linecap="round"/>
     <circle cx="310" cy="145" r="4.5" fill="white" stroke="#ff3b30" stroke-width="2"/>
     <circle cx="810" cy="65" r="4.5" fill="#ff3b30"/>
     <circle cx="810" cy="110" r="4.5" fill="#24834b"/>
    </svg>
    <div class="bc-chart-timeline-labels">
     <span>กันยายน (สูตรเดิม)<br><strong>หวาน 6%</strong><small>เรตติ้ง 4.9</small></span>
     <span style="text-align:center">5–12 ต.ค.<br><strong>เริ่มมีฟีดแบ็กหวานนำ</strong><small>กล้วยฉ่ำน้ำผึ้ง</small></span>
     <span style="text-align:right">สัปดาห์นี้ (16–22 ต.ค.)<br><strong>หวาน 28%</strong><small>เรตติ้งลดเหลือ 4.6</small></span>
    </div>
   </div>
   <div class="bc-dual-chart-footer">
    <p>${icon('sparkles')}<strong>ข้อค้นพบสำคัญ:</strong> ลูกค้าเก่า 78% ยังชอบรสหวานดั้งเดิม แต่ลูกค้าสายสุขภาพวัย 25–35 ปีต้องการความหวานน้อย หากปรับสมดุลจะดึงดูดลูกค้ากลุ่มใหม่ได้มหาศาล</p>
   </div>
  </div>
 `;

 const timeline = `
  <div class="bc-timeline-wrap">
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">25 ก.ย.</span>
    <div class="bc-timeline-body">
     <strong>เริ่มใช้กล้วยน้ำว้าฤดูฝน</strong>
     <p>กล้วยมีความชื้นสูงและความหวาน Brix เพิ่มขึ้น 18%</p>
    </div>
   </div>
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">5 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>รีวิว 3 ดาวแรกบน Shopee</strong>
     <p>ลูกค้าระบุ "หวานกว่ารอบที่แล้ว ทานได้ทีละนิด"</p>
    </div>
   </div>
   <div class="bc-timeline-step is-highlight">
    <span class="bc-timeline-marker">13 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ลูกค้า Facebook แนะนำสูตร</strong>
     <p>อยากได้แบบหวานน้อย ไม่เติมน้ำผึ้งเพิ่ม</p>
    </div>
   </div>
   <div class="bc-timeline-step ${!currentTracking?'is-now':'is-done'}">
    <span class="bc-timeline-marker">22 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>BrandCare AI สรุปคุณภาพรสชาติ</strong>
     <p>พบ 8 คอมเมนต์ แนะนำปรับลดเวลาอบน้ำผึ้ง</p>
    </div>
   </div>
   ${currentTracking ? `
   <div class="bc-timeline-step is-simulated">
    <span class="bc-timeline-marker">29 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ติดตามผล (ผลจำลอง)</strong>
     <p>ปรับสูตรใหม่ ลูกค้าพึงพอใจ 96% เรตติ้ง 4.9</p>
    </div>
   </div>
   `:''}
  </div>
 `;

 const sweetCommentsList = comments.filter(c=>c.issue==='sweet');

 const solutions = `
  <div class="bc-solutions-grid">
   <article class="bc-solution-card is-recommended">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag">${icon('star')}แนะนำสูงสุด</span>
     <span class="bc-cost-tag">฿0 ฟรี</span>
    </div>
    <h3>1. ปรับลดเวลาแช่และอบน้ำผึ้งลง 15% สำหรับล็อตฤดูฝน</h3>
    <p class="bc-solution-desc">ลดระยะเวลาจาก 4 ชั่วโมง เหลือ 3 ชั่วโมง 20 นาที เพื่อดึงความหวานธรรมชาติของกล้วยน้ำว้าออกมาให้พอดี ไม่แสบคอ</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุน</span><strong>฿0</strong><small>ปรับสูตรการทำ</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">หวานกลมกล่อม</strong><small>กู้เรตติ้ง 4.9 ดาว</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ส่งแผนกครัวแล้วเมื่อ 22 ต.ค.':'พร้อมส่งต่อหัวหน้าครัว'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag blue">${icon('bulb')}โอกาสสินค้าใหม่</span>
     <span class="bc-cost-tag">~฿2,000 ค่าพิมพ์ซอง</span>
    </div>
    <h3>2. เปิดตัวสูตรย่อย "กล้วยตากหวานธรรมชาติ 100% (ไม่ใส่น้ำผึ้ง)"</h3>
    <p class="bc-solution-desc">ตอบสนองกลุ่มลูกค้าคลีนและผู้สูงวัยที่คุมน้ำตาล สร้างทางเลือกสุขภาพเพื่อขยายฐานลูกค้าใหม่</p>
    <div class="bc-solution-metrics">
     <div><span>กลุ่มเป้าหมาย</span><strong>สายสุขภาพ</strong><small>เพิ่มยอดขาย +20%</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">ขยายตลาด</strong><small>เจาะกลุ่มเฮลตี้</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ อนุมัติทำซองทดลองแล้ว':'พร้อมร่างแบบฉลาก'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag green">${icon('message')}ขอบคุณลูกค้า</span>
     <span class="bc-cost-tag">~฿120 รวม</span>
    </div>
    <h3>3. ส่งคูปอง ฿15 ให้ลูกค้า 8 คน พร้อมชวนชิมทองม้วนงาดำ</h3>
    <p class="bc-solution-desc">ขอบคุณสำหรับฟีดแบ็กจริงใจ และแนะนำขนมทองม้วนงาดำ (สูตรหวานน้อยของร้าน) ให้ทดลองทาน</p>
    <div class="bc-solution-metrics">
     <div><span>ส่งให้</span><strong>8 ลูกค้า</strong><small>ที่แนะนำ</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">รักษาความประทับใจ</strong><small>กระตุ้นยอดซื้อซ้ำ</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ส่งคูปองแล้ว':'ร่างข้อความ AI พร้อมส่ง'}</span>
    </div>
   </article>
  </div>
 `;

 return `
  <div class="bc-page bc-issue-detail-page">
   <nav class="bc-breadcrumbs bc-reveal" aria-label="เส้นทางนำทาง">
    <a href="#/today">${icon('home')}<span>สรุปวันนี้</span></a>
    ${icon('chevron')}
    <a href="#/issues">รายการปัญหา</a>
    ${icon('chevron')}
    <span aria-current="page">กล้วยตากหวานเกินไป</span>
   </nav>

   ${stateSwitcher}
   ${trackingBanner}

   <header class="bc-issue-hero bc-reveal">
    <div class="bc-issue-hero-tags">
     ${severity(issue.severity)}
     ${status(currentTracking?'ติดตามผล (29 ต.ค.)':'ข้อเสนอแนะ (22 ต.ค.)', currentTracking?'green':'neutral')}
     <span class="bc-channel-pills">
      ${issue.platforms.map(p=>platform(p,{label:true})).join('')}
     </span>
    </div>
    <h1 class="bc-issue-heading">
     ${currentTracking ? `ติดตามผล: ปรับสูตรหวานกลมกล่อม <span class="bc-highlight-green">4.9 ดาว</span>` : `ข้อเสนอแนะ: กล้วยตากหวานนำ <span class="bc-highlight-neutral">4.6 ดาว</span>`}
    </h1>
    <p class="bc-issue-subhead">
     ${currentTracking ? `ปรับลดเวลาแช่น้ำผึ้งลง 15% คะแนนรีวิวฟื้นตัว <strong>4.9 ดาว</strong> · ลูกค้าสายคลีนชื่นชอบรสชาติธรรมชาติ 96% (ผลจำลอง 29 ต.ค.)` : `ลูกค้าสายสุขภาพ <strong>28%</strong> สะท้อนว่าหวานเกินไป · กล้วยน้ำว้าฤดูฝนหวานธรรมชาติสูงขึ้น 18% ทำให้การอบน้ำผึ้งตามสูตรเดิมหวานจัด`}
    </p>

    <div class="bc-issue-hero-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>ส่งโน้ตปรับสูตรไปยังแผนกครัว</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับหน้ารวมสรุปวันนี้</span>
      </a>
      <a href="#/issues/sweet" class="bc-button bc-button--secondary">
       ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
      </a>
     `}
     <a href="#/comments?issue=sweet" class="bc-button bc-button--soft">
      ${icon('message')}<span>ดูคอมเมนต์รสชาติ</span>
     </a>
    </div>
   </header>

   <section class="bc-metric-grid" aria-label="ตัวเลขผลกระทบ">
    ${metricCard({
     title:'คะแนนรีวิวกล้วยตาก',
     value:statRating.val,
     change:statRating.change,
     note:statRating.note,
     tone:statRating.tone,
     changeTone:statRating.tone,
     iconName:'star',
     trend:issue.trend,
     href:'#/comments?issue=sweet'
    })}
    ${metricCard({
     title:'สัดส่วนข้อเสนอแนะหวานเกิน',
     value:statShare.val,
     change:statShare.change,
     note:statShare.note,
     tone:statShare.tone,
     changeTone:statShare.tone,
     iconName:'message',
     href:'#/comments?issue=sweet'
    })}
    ${metricCard({
     title:'ยอดขายกล้วยตาก (30 วัน)',
     value:statRev.val,
     change:statRev.change,
     note:statRev.note,
     tone:statRev.tone,
     changeTone:statRev.tone,
     iconName:'box',
     href:'#/comments?issue=sweet'
    })}
   </section>

   <section class="bc-card bc-root-cause-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}การวิเคราะห์หาสาเหตุเชิงลึกโดย AI</span>
      <h2>สาเหตุหลัก: กล้วยน้ำว้าฤดูฝนมีค่า Brix สูงกว่าปกติ</h2>
     </div>
     <span class="bc-accuracy-badge">${icon('check')}ความมั่นใจ 94%</span>
    </div>

    <div class="bc-root-cause-content">
     <div class="bc-cause-callout">
      <div class="bc-callout-icon">${icon('bulb')}</div>
      <div class="bc-callout-text">
       <strong>“กล้วยน้ำว้าพันธุ์มะลิอ่องล็อตเดือน ก.ย.–ต.ค. มีความชื้นและระดับน้ำตาลธรรมชาติสูงขึ้น 18% เมื่ออบน้ำผึ้ง 4 ชั่วโมงตามสูตรมาตรฐานเดิม ทำให้ความหวานรวมเข้มข้นจนลูกค้าสายคลีนรู้สึกว่าหวานแสบคอ”</strong>
       <p>อ้างอิงข้อมูลรีวิว 8 รายการ และการทดสอบค่าความหวานวัตถุดิบ</p>
      </div>
     </div>

     <div class="bc-cause-stats-row">
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">+18%</span>
       <span class="bc-cause-lbl">ความหวานธรรมชาติสูงขึ้น<br><small>ในผลผลิตกล้วยล็อตหน้าฝน</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">78%</span>
       <span class="bc-cause-lbl">ลูกค้าเก่ายังซื้อซ้ำตามปกติ<br><small>ชอบรสเข้มข้นดั้งเดิม</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">28%</span>
       <span class="bc-cause-lbl">ลูกค้าใหม่ขอแบบหวานน้อย<br><small>โอกาสขยายตลาดสุขภาพ</small></span>
      </div>
     </div>

     <div class="bc-timeline-container">
      <h3 class="bc-timeline-title">${icon('clock')}ลำดับเหตุการณ์สำคัญ (Timeline)</h3>
      ${timeline}
     </div>
    </div>
   </section>

   <section class="bc-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">วิเคราะห์ผลกระทบเชิงธุรกิจ</span>
      <h2>สัดส่วนความเห็นและคะแนนรีวิว</h2>
     </div>
    </div>
    ${impactChart}
   </section>

   <section class="bc-evidence-section bc-reveal">
    <div class="bc-section-heading">
     <div>
      <span class="bc-eyebrow">หลักฐานและเสียงสะท้อนจากลูกค้า</span>
      <h2>หลักฐานที่ตรวจพบ (Evidence Hub)</h2>
      <p>พบข้อเสนอแนะ 8 รายการจาก Facebook, Shopee และ Instagram</p>
     </div>
     <a href="#/comments?issue=sweet" class="bc-button bc-button--secondary">
      ${icon('message')}<span>ดูทั้งหมดในหน้ารวม</span>
     </a>
    </div>

    <div class="bc-sample-comments-head">
     <h3>ตัวอย่างคอมเมนต์จากลูกค้าสายสุขภาพ</h3>
     <span>คัดกรอง 4 คอมเมนต์สำคัญ</span>
    </div>
    <div class="bc-comments-grid">
     ${sweetCommentsList.map(c=>`<div class="bc-reveal">${commentCard(c)}</div>`).join('')}
    </div>
   </section>

   <section class="bc-card bc-solutions-section bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}แผนปฏิบัติการแก้ไข</span>
      <h2>3 แนวทางปรับปรุงสูตรที่ AI เสนอ</h2>
     </div>
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>ส่งโน้ตปรับสูตร</span>
      </button>
     ` : `
      <span class="bc-badge bc-badge--green">${icon('check')}ส่งต่อฝ่ายผลิตแล้ว</span>
     `}
    </div>
    ${solutions}
   </section>

   <div class="bc-issue-bottom-bar bc-reveal">
    <div class="bc-bar-info">
     <strong>${currentTracking?'อยู่ในสถานะติดตามผล (ปรับเวลาอบน้ำผึ้งแล้ว)':'พร้อมส่งโน้ตปรับสูตรไปยังแผนกครัวสามพราน'}</strong>
     <span>${currentTracking?'คะแนนรีวิวฟื้นตัว 4.9 ดาว':'รักษารสชาติกลมกล่อมและขยายฐานลูกค้าสุขภาพ'}</span>
    </div>
    <div class="bc-bar-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary bc-button--large" data-action="open-approval">
       ${icon('check')}<span>ส่งโน้ตปรับสูตร</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับสรุปวันนี้</span>
      </a>
     `}
    </div>
   </div>
  </div>
 `;
}

// -------------------------------------------------------------
// 4. รายละเอียดปัญหา/โอกาส: ลูกค้าขอรสทุเรียน (Durian)
// -------------------------------------------------------------
function renderDurianDetail({tracking=false}={}){
 const issue = issues.find(i=>i.id==='durian')||issues[3];
 const currentTracking = Boolean(tracking);

 const stateSwitcher = `
  <div class="bc-state-switcher bc-reveal" role="group" aria-label="สลับสถานะเพื่อทดสอบ Flow">
   <span class="bc-switcher-label">มุมมองสำหรับตรวจงาน:</span>
   <div class="bc-switcher-pills">
    <a href="#/issues/durian" class="bc-switcher-pill ${!currentTracking?'is-active':''}" aria-pressed="${!currentTracking}">
     ${icon('flame')}<span>สถานะเริ่มต้น (22 ต.ค. วันนี้)</span>
    </a>
    <a href="#/issues/durian?status=tracking" class="bc-switcher-pill ${currentTracking?'is-active':''}" aria-pressed="${currentTracking}">
     ${icon('check')}<span>สถานะติดตามผล (29 ต.ค. ผลจำลอง)</span>
    </a>
   </div>
  </div>
 `;

 const trackingBanner = currentTracking ? `
  <section class="bc-tracking-banner bc-reveal" role="region" aria-label="สถานะติดตามผล">
   <div class="bc-tracking-icon">${icon('check')}</div>
   <div class="bc-tracking-content">
    <div class="bc-tracking-head">
     <strong>ติดตามผล · เปิดพรีออเดอร์ล็อตทดลองแล้ว (ผลจำลอง 29 ต.ค.)</strong>
     <span class="bc-sim-tag">ผลจำลอง</span>
    </div>
    <p>หลังเปิดพรีออเดอร์ทองม้วนรสทุเรียนหมอนทอง 100 กล่องแรก: ยอดจองเต็มใน 3 ชั่วโมง สร้างยอดขายล่วงหน้า ฿12,900 และเตรียมบรรจุลงชุดของขวัญ 11.11</p>
   </div>
   <div class="bc-tracking-action">
    <a href="#/issues/durian" class="bc-button bc-button--soft bc-button--small">
     ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
    </a>
   </div>
  </section>
 ` : '';

 const statLikes = currentTracking ? {val:'540+ ไลก์', change:'+134%', note:'ยอดแชร์และจองพุ่งสูง (ผลจำลอง)', tone:'green'} : {val:'230+ ไลก์', change:'+320%', note:'Engagement สูงกว่าโพสต์ปกติ 3.2 เท่า', tone:'green'};
 const statRev = currentTracking ? {val:'฿12,900', change:'ล็อตแรกเต็ม', note:'ยอดพรีออเดอร์ 100 กล่อง (ผลจำลอง)', tone:'green'} : {val:'+฿45,000', change:'คาดการณ์', note:'ยอดขายเพิ่มช่วงเทศกาล 60 วัน', tone:'blue'};
 const statMargin = currentTracking ? {val:'52%', change:'กำไรดีเยี่ยม', note:'วัตถุดิบทุเรียนแท้จากสวนจันทบุรี', tone:'green'} : {val:'48%', change:'มาร์จิ้นสูง', note:'ตั้งราคาพรีเมียมได้ ฿129 (เนยสด ฿89)', tone:'blue'};

 const impactChart = `
  <div class="bc-dual-chart-card">
   <div class="bc-dual-chart-header">
    <div>
     <span class="bc-chart-eyebrow">วิเคราะห์แนวโน้มตลาด (Market Trend)</span>
     <h3>ยอดพูดถึงรสทุเรียน vs ยอดค้นหาสินค้าในร้าน</h3>
    </div>
    <div class="bc-dual-legend">
     <span><i style="background:#24834b"></i>ยอดพูดถึงและกดไลก์ (+320%)</span>
     <span><i style="background:#0071e3"></i>ยอดค้นหา "ทองม้วน ทุเรียน" (+480%)</span>
    </div>
   </div>
   <div class="bc-dual-chart-body">
    <div class="bc-chart-annotation" aria-hidden="true">
     8 ต.ค. คอมเมนต์ขอทุเรียน 56 ไลก์
    </div>
    <svg viewBox="0 0 840 220" role="img" aria-label="กราฟแสดงยอดพูดถึงและความต้องการรสทุเรียนพุ่งสูง">
     <g class="bc-chart-grid" stroke="#f0f0f4" stroke-width="1" stroke-dasharray="4 5">
      <line x1="20" y1="35" x2="820" y2="35" />
      <line x1="20" y1="95" x2="820" y2="95" />
      <line x1="20" y1="155" x2="820" y2="155" />
     </g>
     <line x1="286" y1="20" x2="286" y2="195" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="3 3"/>
     <path class="bc-chart-complaints" d="M30 180 C180 178 240 170 310 140 C420 100 580 55 810 35" fill="none" stroke="#24834b" stroke-width="2.6" stroke-linecap="round"/>
     <path class="bc-chart-butter-line" d="M30 185 C180 182 240 176 310 150 C420 110 580 65 810 45" fill="none" stroke="#0071e3" stroke-width="2.4" stroke-linecap="round"/>
     <circle cx="310" cy="140" r="4.5" fill="white" stroke="#24834b" stroke-width="2"/>
     <circle cx="810" cy="35" r="4.5" fill="#24834b"/>
     <circle cx="810" cy="45" r="4.5" fill="#0071e3"/>
    </svg>
    <div class="bc-chart-timeline-labels">
     <span>28 ก.ย.<br><strong>เริ่มมีคนถามใน IG</strong><small>ไลก์ประปราย</small></span>
     <span style="text-align:center">8–14 ต.ค.<br><strong>คลิป TikTok ไวรัล</strong><small>ทักขอสั่ง 20 กล่อง</small></span>
     <span style="text-align:right">สัปดาห์นี้ (16–22 ต.ค.)<br><strong>ยอดค้นหา +480%</strong><small>สนใจ 230+ ไลก์</small></span>
    </div>
   </div>
   <div class="bc-dual-chart-footer">
    <p>${icon('sparkles')}<strong>ข้อค้นพบสำคัญ:</strong> ผู้บริโภค 80% ระบุว่าต้องการซื้อทองม้วนรสทุเรียนหมอนทองเพื่อเป็นของฝากปลายปี สามารถตั้งราคาพรีเมียม ฿129 (มาร์จิ้น 48%) สูงกว่ารสปกติ</p>
   </div>
  </div>
 `;

 const timeline = `
  <div class="bc-timeline-wrap">
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">28 ก.ย.</span>
    <div class="bc-timeline-body">
     <strong>คอมเมนต์แรกใน Instagram</strong>
     <p>ลูกค้าถามหารสทุเรียนเพื่อซื้อฝากเพื่อนต่างชาติ</p>
    </div>
   </div>
   <div class="bc-timeline-step">
    <span class="bc-timeline-marker">8 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>คลิป TikTok เบื้องหลังขนม</strong>
     <p>มีคนเม้นท์ "ขอรสทุเรียนหมอนทองค่ะ" ไลก์พุ่ง 56</p>
    </div>
   </div>
   <div class="bc-timeline-step is-highlight">
    <span class="bc-timeline-marker">14 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ลูกค้าทักแชตสั่งพิเศษ 20 กล่อง</strong>
     <p>ต้องการนำไปฝากเพื่อนร่วมงานที่สิงคโปร์</p>
    </div>
   </div>
   <div class="bc-timeline-step ${!currentTracking?'is-now':'is-done'}">
    <span class="bc-timeline-marker">22 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>BrandCare AI จับสัญญาณโอกาส</strong>
     <p>จัดเป็นโอกาสสินค้าใหม่ดาวเด่นรับเทศกาล</p>
    </div>
   </div>
   ${currentTracking ? `
   <div class="bc-timeline-step is-simulated">
    <span class="bc-timeline-marker">29 ต.ค.</span>
    <div class="bc-timeline-body">
     <strong>ติดตามผล (ผลจำลอง)</strong>
     <p>พรีออเดอร์ 100 กล่องเต็มใน 3 ชม. ยอดขาย ฿12,900</p>
    </div>
   </div>
   `:''}
  </div>
 `;

 const durianCommentsList = comments.filter(c=>c.issue==='durian');

 const solutions = `
  <div class="bc-solutions-grid">
   <article class="bc-solution-card is-recommended">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag">${icon('star')}แนะนำสูงสุด</span>
     <span class="bc-cost-tag">วัตถุดิบ ฿5,500</span>
    </div>
    <h3>1. ทำล็อตทดลองสูตร (Test Batch) 100 กล่อง ใช้ทุเรียนแท้</h3>
    <p class="bc-solution-desc">ใช้เนื้อทุเรียนหมอนทองแท้จากจันทบุรี ไม่แต่งกลิ่นสังเคราะห์ ต้นทุนวัตถุดิบ ฿55/กล่อง ขายราคา ฿129</p>
    <div class="bc-solution-metrics">
     <div><span>ต้นทุนล็อตแรก</span><strong>฿5,500</strong><small>(100 กล่อง)</small></div>
     <div><span>รายรับคาดการณ์</span><strong class="bc-good">฿12,900</strong><small>กำไร 57%</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ อนุมัติสั่งวัตถุดิบแล้วเมื่อ 22 ต.ค.':'พร้อมส่งสูตรให้ครัวทดลอง'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag blue">${icon('calendar')}แคมเปญ 11.11</span>
     <span class="bc-cost-tag">฿0 ฟรี</span>
    </div>
    <h3>2. เปิดพรีออเดอร์ในแคมเปญ 11.11 ราคาพิเศษ ฿109</h3>
    <p class="bc-solution-desc">เชื่อมโยงกับแผนคอนเทนต์ 11.11 (หน้า 14 ของเจด้า) เพื่อสร้างกระแสและเปิดให้จองล่วงหน้า 7 วัน</p>
    <div class="bc-solution-metrics">
     <div><span>เป้าหมายยอดจอง</span><strong>200 กล่อง</strong><small>ใน 7 วัน</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">สร้างกระแสไวรัล</strong><small>ดึงลูกค้าใหม่</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ เพิ่มในแผนคอนเทนต์แล้ว':'พร้อมบรรจุลงปฏิทิน 11.11'}</span>
    </div>
   </article>

   <article class="bc-solution-card">
    <div class="bc-solution-badge">
     <span class="bc-pill-tag green">${icon('box')}ชุดของขวัญปีใหม่</span>
     <span class="bc-cost-tag">+฿100 มูลค่าชุด</span>
    </div>
    <h3>3. บรรจุลง "ชุดของขวัญขนมไทยพรีเมียม 2027"</h3>
    <p class="bc-solution-desc">จัดเซ็ตรวมทองม้วนทุเรียน + เนยสด + กล้วยตาก + ข้าวแต๋น อัปเกรดราคาชุดของขวัญจาก ฿390 เป็น ฿490</p>
    <div class="bc-solution-metrics">
     <div><span>ราคาชุดใหม่</span><strong>฿490</strong><small>(จาก ฿390)</small></div>
     <div><span>ผลที่คาดไว้</span><strong class="bc-good">+฿45,000</strong><small>ยอดขายของฝากปลายปี</small></div>
    </div>
    <div class="bc-solution-footer">
     <span>${currentTracking?'✓ ออกแบบกล่องของขวัญแล้ว':'พร้อมพัฒนาแพ็กเกจ'}</span>
    </div>
   </article>
  </div>
 `;

 return `
  <div class="bc-page bc-issue-detail-page">
   <nav class="bc-breadcrumbs bc-reveal" aria-label="เส้นทางนำทาง">
    <a href="#/today">${icon('home')}<span>สรุปวันนี้</span></a>
    ${icon('chevron')}
    <a href="#/issues">รายการปัญหา</a>
    ${icon('chevron')}
    <span aria-current="page">ลูกค้าขอรสทุเรียน</span>
   </nav>

   ${stateSwitcher}
   ${trackingBanner}

   <header class="bc-issue-hero bc-reveal">
    <div class="bc-issue-hero-tags">
     ${severity(issue.severity)}
     ${status(currentTracking?'ติดตามผล (29 ต.ค.)':'โอกาสใหม่ (22 ต.ค.)', currentTracking?'green':'neutral')}
     <span class="bc-channel-pills">
      ${issue.platforms.map(p=>platform(p,{label:true})).join('')}
     </span>
    </div>
    <h1 class="bc-issue-heading">
     ${currentTracking ? `ติดตามผล: เปิดพรีออเดอร์ล็อตทดลอง <span class="bc-highlight-green">ยอดจองเต็ม</span>` : `โอกาสสินค้าใหม่: ทองม้วนรสทุเรียน <span class="bc-highlight-blue">+45k บ.</span>`}
    </h1>
    <p class="bc-issue-subhead">
     ${currentTracking ? `พรีออเดอร์ 100 กล่องแรกยอดเต็มใน 3 ชม. สร้างยอดขายล่วงหน้า <strong>฿12,900</strong> · พร้อมจัดส่งในแคมเปญ 11.11 (ผลจำลอง 29 ต.ค.)` : `ลูกค้าเรียกร้อง <strong>15 คอมเมนต์</strong> ไลก์รวม 230+ ครั้ง · โอกาสสร้างยอดขายของฝากปลายปีช่วง 11.11 และปีใหม่ (+฿45,000)`}
    </p>

    <div class="bc-issue-hero-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแผนเปิดพรีออเดอร์ 100 กล่อง</span>
      </button>
      <a href="#/festivals/11-11" class="bc-button bc-button--secondary">
       ${icon('calendar')}<span>ดูแผนเทศกาล 11.11 (หน้า 14)</span>
      </a>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับหน้ารวมสรุปวันนี้</span>
      </a>
      <a href="#/issues/durian" class="bc-button bc-button--secondary">
       ${icon('refresh')}<span>ดูสถานะก่อนอนุมัติ</span>
      </a>
     `}
     <a href="#/comments?issue=durian" class="bc-button bc-button--soft">
      ${icon('message')}<span>ดูคอมเมนต์ขอสินค้าใหม่</span>
     </a>
    </div>
   </header>

   <section class="bc-metric-grid" aria-label="ตัวเลขผลกระทบ">
    ${metricCard({
     title:'ยอดกดไลก์และสนใจ',
     value:statLikes.val,
     change:statLikes.change,
     note:statLikes.note,
     tone:statLikes.tone,
     changeTone:statLikes.tone,
     iconName:'heart',
     trend:issue.trend,
     href:'#/comments?issue=durian'
    })}
    ${metricCard({
     title:'ยอดขายคาดการณ์ช่วงเทศกาล',
     value:statRev.val,
     change:statRev.change,
     note:statRev.note,
     tone:statRev.tone,
     changeTone:statRev.tone,
     iconName:'up',
     href:'#/festivals/11-11'
    })}
    ${metricCard({
     title:'มาร์จิ้นกำไรคาดการณ์',
     value:statMargin.val,
     change:statMargin.change,
     note:statMargin.note,
     tone:statMargin.tone,
     changeTone:statMargin.tone,
     iconName:'star',
     href:'#/festivals/11-11'
    })}
   </section>

   <section class="bc-card bc-root-cause-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}การวิเคราะห์โอกาสทางธุรกิจโดย AI</span>
      <h2>ความต้องการสินค้าของฝากพรีเมียมรับเทศกาลปลายปี</h2>
     </div>
     <span class="bc-accuracy-badge">${icon('check')}ความมั่นใจ 95%</span>
    </div>

    <div class="bc-root-cause-content">
     <div class="bc-cause-callout">
      <div class="bc-callout-icon">${icon('sparkles')}</div>
      <div class="bc-callout-text">
       <strong>“ผู้บริโภคใน Instagram และ TikTok ถามหาทองม้วนรสทุเรียนหมอนทองอย่างต่อเนื่อง โดย 80% ระบุว่าต้องการซื้อเป็นของฝากเพื่อนและผู้ใหญ่ช่วงปลายปี ถือเป็นโอกาสสร้างกำไรสูงถึง 48–52%”</strong>
       <p>อ้างอิงข้อมูลคอมเมนต์ 15 รายการ ยอดไลก์ 230+ ครั้ง และการค้นหาคำสำคัญ</p>
      </div>
     </div>

     <div class="bc-cause-stats-row">
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">230+</span>
       <span class="bc-cause-lbl">ยอดกดไลก์และสนใจ<br><small>Engagement สูงกว่าปกติ 3.2x</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">80%</span>
       <span class="bc-cause-lbl">ต้องการซื้อเป็นของฝาก<br><small>ช่วงเทศกาล พ.ย.–ม.ค.</small></span>
      </div>
      <div class="bc-cause-stat-item">
       <span class="bc-cause-num">฿129</span>
       <span class="bc-cause-lbl">ราคาขายพรีเมียมต่อกล่อง<br><small>(มาร์จิ้นกำไร 48%)</small></span>
      </div>
     </div>

     <div class="bc-timeline-container">
      <h3 class="bc-timeline-title">${icon('clock')}ลำดับการเกิดโอกาส (Timeline)</h3>
      ${timeline}
     </div>
    </div>
   </section>

   <section class="bc-card bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">วิเคราะห์แนวโน้มตลาด</span>
      <h2>กระแสความสนใจและยอดค้นหา</h2>
     </div>
     <a href="#/festivals/11-11" class="bc-button bc-button--text">
      <span>ดูแผนเทศกาล</span>${icon('chevron')}
     </a>
    </div>
    ${impactChart}
   </section>

   <section class="bc-evidence-section bc-reveal">
    <div class="bc-section-heading">
     <div>
      <span class="bc-eyebrow">หลักฐานและเสียงสะท้อนจากลูกค้า</span>
      <h2>หลักฐานที่ตรวจพบ (Evidence Hub)</h2>
      <p>พบข้อเสนอแนะ 15 รายการจาก Instagram, TikTok และ YouTube</p>
     </div>
     <a href="#/comments?issue=durian" class="bc-button bc-button--secondary">
      ${icon('message')}<span>ดูทั้งหมดในหน้ารวม</span>
     </a>
    </div>

    <div class="bc-sample-comments-head">
     <h3>ตัวอย่างคอมเมนต์เรียกร้องรสทุเรียนหมอนทอง</h3>
     <span>คัดกรอง 4 คอมเมนต์สำคัญที่มีผู้กดไลก์สูงสุด</span>
    </div>
    <div class="bc-comments-grid">
     ${durianCommentsList.map(c=>`<div class="bc-reveal">${commentCard(c)}</div>`).join('')}
    </div>
   </section>

   <section class="bc-card bc-solutions-section bc-reveal">
    <div class="bc-card-head">
     <div>
      <span class="bc-eyebrow">${icon('sparkles')}แผนปฏิบัติการต่อยอด</span>
      <h2>3 แนวทางพัฒนาผลิตภัณฑ์ที่ AI เสนอ</h2>
     </div>
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแผนเปิดพรีออเดอร์</span>
      </button>
     ` : `
      <span class="bc-badge bc-badge--green">${icon('check')}อนุมัติแผนพรีออเดอร์แล้ว</span>
     `}
    </div>
    ${solutions}
   </section>

   <div class="bc-issue-bottom-bar bc-reveal">
    <div class="bc-bar-info">
     <strong>${currentTracking?'อยู่ในสถานะติดตามผล (เปิดพรีออเดอร์แล้ว)':'พร้อมเปิดพรีออเดอร์ล็อตทดลอง 100 กล่อง'}</strong>
     <span>${currentTracking?'ยอดจองเต็ม 100 กล่อง (฿12,900)':'สร้างกระแสเปิดตัวรับเทศกาล 11.11'}</span>
    </div>
    <div class="bc-bar-actions">
     ${!currentTracking ? `
      <button class="bc-button bc-button--primary bc-button--large" data-action="open-approval">
       ${icon('check')}<span>อนุมัติแผนพรีออเดอร์</span>
      </button>
     ` : `
      <a href="#/today" class="bc-button bc-button--primary">
       ${icon('home')}<span>กลับสรุปวันนี้</span>
      </a>
     `}
    </div>
   </div>
  </div>
 `;
}

/**
 * หน้า 8: แผ่นซ้อนอนุมัติและส่งข้อความ / บันทึกแผน (โอ๊ค)
 * รองรับทั้ง packaging, delivery, sweet, durian
 */
export function approvalModalContent(issueId='packaging'){
 if(issueId === 'delivery'){
  return `
   <div class="bc-approval-modal">
    <div class="bc-sheet-handle-bar"><span class="bc-sheet-handle"></span></div>
    <div class="bc-approval-header">
     <div>
      <span class="bc-eyebrow">${icon('shield')}ตรวจทานก่อนดำเนินการ · อัปเดตสถานะจัดส่ง</span>
      <h2>อนุมัติข้อความแจ้งสถานะพัสดุ 35 ออเดอร์</h2>
      <p class="bc-dialog-description">
       ส่งข้อความแจ้งเตือนความคืบหน้าล่วงหน้าให้ลูกค้า 35 คนที่พัสดุค้างศูนย์คัดแยก พร้อมแจ้งวันนำจ่ายที่ชัดเจน
      </p>
     </div>
    </div>

    <div class="bc-recipient-summary">
     <div class="bc-recipient-stat">
      <span>รวมออเดอร์ค้างส่ง</span>
      <strong>35 ออเดอร์</strong>
     </div>
     <div class="bc-channel-badges">
      <span class="bc-chan-badge shopee">${platform('shopee')} 22 คน</span>
      <span class="bc-chan-badge facebook">${platform('facebook')} 9 คน</span>
      <span class="bc-chan-badge tiktok">${platform('tiktok')} 4 คน</span>
     </div>
    </div>

    <div class="bc-recipients-box">
     <div class="bc-recipients-head">
      <span>ตัวอย่างรายชื่อออเดอร์และเลขพัสดุที่ค้างส่ง</span>
      <small>ข้อมูลจำลองปิดบังชื่อ</small>
     </div>
     <div class="bc-recipients-list" tabindex="0" aria-label="รายชื่อออเดอร์ที่ค้างส่ง">
      ${deliveryRecipients.map((r,idx)=>`
       <div class="bc-recipient-item">
        <span class="bc-rec-num">${idx+1}</span>
        <span class="bc-rec-platform">${platform(r.platform,{label:false})}</span>
        <strong class="bc-rec-user">${escapeHTML(r.user)}</strong>
        <span class="bc-rec-order">${escapeHTML(r.order)}</span>
        <span class="bc-rec-coupon"><code>${escapeHTML(r.coupon)}</code></span>
        <span class="bc-rec-time">${escapeHTML(r.time)}</span>
       </div>
      `).join('')}
     </div>
    </div>

    <div class="bc-draft-editor-section">
     <div class="bc-draft-head">
      <label class="bc-field-label" for="bc-approval-message">
       ${icon('sparkles')}<strong>ร่างข้อความแจ้งเตือนลูกค้า</strong>
       <span>(AI ปรับโทน: อบอุ่น เป็นห่วงลูกค้า อัปเดตอย่างโปร่งใส)</span>
      </label>
      <span class="bc-badge bc-badge--blue">โทนเสียง: อบอุ่น</span>
     </div>
     <textarea id="bc-approval-message" class="bc-textarea" rows="4">สวัสดีค่ะคุณลูกค้า 🙏 ขนมบ้านสวนตรวจสอบพบว่าพัสดุของคุณลูกค้าค้างอยู่ที่ศูนย์คัดแยกนานกว่าปกติ ทางร้านได้ประสานงานเร่งรัดขนส่งให้เป็นกรณีพิเศษแล้วนะคะ คาดว่าจะนำจ่ายภายในวันพรุ่งนี้ค่ะ หากได้รับแล้วขนมมีปัญหา สามารถทักแจ้งบ้านสวนเพื่อเปลี่ยนใหม่ได้ทันทีเลยนะคะ ขอบคุณที่เข้าใจและรอรับขนมของเราค่ะ ❤️</textarea>
    </div>

    <div class="bc-approval-checklist">
     <label class="bc-check-row">
      <input type="checkbox" id="check-delivery-send" checked>
      <div>
       <strong>ส่งข้อความแจ้งสถานะพัสดุและขออภัยลูกค้า 35 คน</strong>
       <p>ส่งผ่านแชท Shopee (22), Facebook (9) และ TikTok (4) · ต้นทุน ฿0</p>
      </div>
     </label>
     <label class="bc-check-row">
      <input type="checkbox" id="check-delivery-express" checked>
      <div>
       <strong>สลับออเดอร์ขนมสดล็อตถัดไปเป็นขนส่งด่วน Express ทันที</strong>
       <p>รับประกันส่งถึงภายใน 24 ชม. ป้องกันขนมตกค้าง · ต้นทุนเพิ่ม ฿5/ออเดอร์</p>
      </div>
     </label>
    </div>

    <div class="bc-dialog-actions bc-approval-actions">
     <button class="bc-button bc-button--secondary" data-action="close-dialog">ยกเลิก</button>
     <button class="bc-button bc-button--primary bc-button--large" data-action="confirm-approval">
      ${icon('send')}<span>ส่งแจ้งเตือน (35 ข้อความ)</span>
     </button>
    </div>
   </div>
  `;
 }

 if(issueId === 'sweet'){
  return `
   <div class="bc-approval-modal">
    <div class="bc-sheet-handle-bar"><span class="bc-sheet-handle"></span></div>
    <div class="bc-approval-header">
     <div>
      <span class="bc-eyebrow">${icon('shield')}ตรวจทานก่อนดำเนินการ · บันทึกสูตรฝ่ายผลิต</span>
      <h2>ส่งโน้ตปรับปรุงสูตรกล้วยตากไปยังแผนกครัว</h2>
      <p class="bc-dialog-description">
       ปรับลดระยะเวลาแช่และอบน้ำผึ้งลง 15% สำหรับผลผลิตล็อตฤดูฝน พร้อมมอบคูปองขอบคุณลูกค้าที่ให้ฟีดแบ็ก
      </p>
     </div>
    </div>

    <div class="bc-draft-editor-section">
     <div class="bc-draft-head">
      <label class="bc-field-label" for="bc-approval-message">
       ${icon('sparkles')}<strong>บันทึกแจ้งหัวหน้าครัว (สามพราน)</strong>
      </label>
      <span class="bc-badge bc-badge--blue">บันทึกภายใน</span>
     </div>
     <textarea id="bc-approval-message" class="bc-textarea" rows="4">แจ้งหัวหน้าฝ่ายผลิตครัวสามพราน: ผลการวิเคราะห์เสียงลูกค้าพบว่ากล้วยตากล็อตฤดูฝนมีความหวาน Brix สูงขึ้น 18% ทำให้การอบน้ำผึ้ง 4 ชม. ตามสูตรเดิมหวานจัดเกินไป ขอให้ปรับลดเวลาแช่และอบน้ำผึ้งลง 15% (เหลือ 3 ชม. 20 นาที) เริ่มตั้งแต่ล็อตวันพรุ่งนี้เป็นต้นไป พร้อมคัดเลือกกล้วยเพื่อเตรียมทดลองสูตรหวานธรรมชาติ 100% ค่ะ</textarea>
    </div>

    <div class="bc-approval-checklist">
     <label class="bc-check-row">
      <input type="checkbox" id="check-sweet-kitchen" checked>
      <div>
       <strong>ส่งโน้ตและอัปเดตคู่มือการผลิตให้แผนกครัว</strong>
       <p>ปรับลดเวลาอบน้ำผึ้งเหลือ 3 ชม. 20 นาที ทันที</p>
      </div>
     </label>
     <label class="bc-check-row">
      <input type="checkbox" id="check-sweet-coupon" checked>
      <div>
       <strong>ส่งคูปองส่วนลด ฿15 ขอบคุณลูกค้า 8 ท่านที่ให้คำแนะนำ</strong>
       <p>แนบคูปองพร้อมแนะนำขนมทองม้วนงาดำ (สูตรหวานน้อย)</p>
      </div>
     </label>
    </div>

    <div class="bc-dialog-actions bc-approval-actions">
     <button class="bc-button bc-button--secondary" data-action="close-dialog">ยกเลิก</button>
     <button class="bc-button bc-button--primary bc-button--large" data-action="confirm-approval">
      ${icon('check')}<span>บันทึกและส่งต่อสูตรใหม่</span>
     </button>
    </div>
   </div>
  `;
 }

 if(issueId === 'durian'){
  return `
   <div class="bc-approval-modal">
    <div class="bc-sheet-handle-bar"><span class="bc-sheet-handle"></span></div>
    <div class="bc-approval-header">
     <div>
      <span class="bc-eyebrow">${icon('shield')}ตรวจทานก่อนดำเนินการ · อนุมัติแผนสินค้าใหม่</span>
      <h2>อนุมัติแผนเปิดพรีออเดอร์ทองม้วนรสทุเรียนหมอนทอง</h2>
      <p class="bc-dialog-description">
       เปิดจองล็อตทดลอง 100 กล่องแรกรับแคมเปญ 11.11 พร้อมโพสต์เปิดตัวบน TikTok และ Instagram
      </p>
     </div>
    </div>

    <div class="bc-draft-editor-section">
     <div class="bc-draft-head">
      <label class="bc-field-label" for="bc-approval-message">
       ${icon('sparkles')}<strong>แคปชันโพสต์เปิดพรีออเดอร์ (TikTok / IG)</strong>
      </label>
      <span class="bc-badge bc-badge--blue">โพสต์โซเชียล</span>
     </div>
     <textarea id="bc-approval-message" class="bc-textarea" rows="4">ตามคำเรียกร้องแล้วค่ะ! 💛 ทองม้วนกรอบรสใหม่ 'ทุเรียนหมอนทองแท้' หอม กรอบ ละมุน ใช้เนื้อทุเรียนแท้จากจันทบุรี ไม่แต่งกลิ่นสังเคราะห์ บ้านสวนเปิดพรีออเดอร์ล็อตพิเศษเพียง 100 กล่องแรกรับเทศกาลปลายปี ในราคาพิเศษ ฿109 (ปกติ ฿129) จองได้ตั้งแต่วันนี้ จัดส่งพร้อมกัน 11.11 ค่ะ! ✨</textarea>
    </div>

    <div class="bc-approval-checklist">
     <label class="bc-check-row">
      <input type="checkbox" id="check-durian-batch" checked>
      <div>
       <strong>อนุมัติสั่งวัตถุดิบทุเรียนหมอนทองแท้ 100 กล่องแรก</strong>
       <p>งบประมาณวัตถุดิบ ฿5,500 · คาดการณ์รายรับ ฿12,900</p>
      </div>
     </label>
     <label class="bc-check-row">
      <input type="checkbox" id="check-durian-plan" checked>
      <div>
       <strong>บรรจุเข้าแผนคอนเทนต์และปฏิทินเทศกาล 11.11 (หน้า 14)</strong>
       <p>ตั้งเวลาโปรโมตล่วงหน้า 7 วัน</p>
      </div>
     </label>
    </div>

    <div class="bc-dialog-actions bc-approval-actions">
     <button class="bc-button bc-button--secondary" data-action="close-dialog">ยกเลิก</button>
     <button class="bc-button bc-button--primary bc-button--large" data-action="confirm-approval">
      ${icon('send')}<span>อนุมัติแผนและเปิดพรีออเดอร์</span>
     </button>
    </div>
   </div>
  `;
 }

 // Default Packaging modal
 return `
  <div class="bc-approval-modal">
   <div class="bc-sheet-handle-bar"><span class="bc-sheet-handle"></span></div>
   <div class="bc-approval-header">
    <div>
     <span class="bc-eyebrow">${icon('shield')}ตรวจทานก่อนดำเนินการ · หน้า 8</span>
     <h2>อนุมัติแนวทางแก้และส่งข้อความ</h2>
     <p class="bc-dialog-description">
      ส่งข้อความขอโทษพร้อมคูปองลด ฿20 ให้ลูกค้าที่ได้รับผลกระทบ 23 คน และเตรียมโพสต์ประกาศอัปเกรดกล่องใหม่
     </p>
    </div>
   </div>

   <div class="bc-recipient-summary">
    <div class="bc-recipient-stat">
     <span>รวมผู้รับทั้งหมด</span>
     <strong>23 คน</strong>
    </div>
    <div class="bc-channel-badges">
     <span class="bc-chan-badge shopee">${platform('shopee')} 14 คน</span>
     <span class="bc-chan-badge tiktok">${platform('tiktok')} 6 คน</span>
     <span class="bc-chan-badge facebook">${platform('facebook')} 3 คน</span>
    </div>
   </div>

   <div class="bc-recipients-box">
    <div class="bc-recipients-head">
     <span>รายชื่อลูกค้า 23 คนและรหัสคูปอง ฿20 ที่จะได้รับ</span>
     <small>ข้อมูลจำลองปิดบังชื่อ</small>
    </div>
    <div class="bc-recipients-list" tabindex="0" aria-label="รายชื่อลูกค้า 23 คน">
     ${packagingRecipients.map((r,idx)=>`
      <div class="bc-recipient-item">
       <span class="bc-rec-num">${idx+1}</span>
       <span class="bc-rec-platform">${platform(r.platform,{label:false})}</span>
       <strong class="bc-rec-user">${escapeHTML(r.user)}</strong>
       <span class="bc-rec-order">${escapeHTML(r.order)}</span>
       <span class="bc-rec-coupon"><code>${escapeHTML(r.coupon)}</code></span>
       <span class="bc-rec-time">${escapeHTML(r.time)}</span>
      </div>
     `).join('')}
    </div>
   </div>

   <div class="bc-draft-editor-section">
    <div class="bc-draft-head">
     <label class="bc-field-label" for="bc-approval-message">
      ${icon('sparkles')}<strong>ร่างข้อความตอบลูกค้า</strong>
      <span>(AI ปรับตามน้ำเสียงบ้านสวน: อบอุ่น เป็นกันเอง ขอโทษอย่างจริงใจ)</span>
     </label>
     <span class="bc-badge bc-badge--blue">โทนเสียง: อบอุ่น</span>
    </div>
    <textarea id="bc-approval-message" class="bc-textarea" rows="4" aria-label="ร่างข้อความตอบลูกค้า">${escapeHTML(replyDraft)}</textarea>
    <div class="bc-draft-footer">
     <span>${icon('check')}แนบรหัสคูปองลด ฿20 อัตโนมัติต่อท้ายข้อความ</span>
     <small id="bc-draft-count">175 ตัวอักษร</small>
    </div>
   </div>

   <div class="bc-approval-checklist">
    <label class="bc-check-row">
     <input type="checkbox" id="check-send-customers" checked>
     <div>
      <strong>ส่งข้อความขอโทษและมอบคูปองลด ฿20 ให้ลูกค้า 23 คน</strong>
      <p>ส่งเข้าแชท Shopee (14), TikTok (6) และ Facebook (3) · ต้นทุนประมาณ ฿460</p>
     </div>
    </label>

    <label class="bc-check-row">
     <input type="checkbox" id="check-post-social" checked>
     <div>
      <strong>โพสต์คลิปและประกาศเรื่องกล่องใหม่บน TikTok และ Facebook</strong>
      <p>ชี้แจงการเปลี่ยนเป็นกล่องลูกฟูก 2 ชั้นเพื่อความมั่นใจ · ต้นทุน ฿0</p>
     </div>
    </label>

    <label class="bc-check-row">
     <input type="checkbox" id="check-update-packaging" checked>
     <div>
      <strong>แจ้งทีมแพ็กขนมเปลี่ยนเป็นกล่องลูกฟูก 2 ชั้นทันที</strong>
      <p>เพิ่มบับเบิลกันกระแทกรอบกระปุกทองม้วน · ต้นทุนเพิ่ม ฿3 ต่อออเดอร์</p>
     </div>
    </label>
   </div>

   <div class="bc-announcement-preview">
    <div class="bc-announce-head">
     <span>${icon('sparkles')}ตัวอย่างโพสต์ประกาศบนโซเชียลมีเดีย (TikTok / Facebook)</span>
    </div>
    <div class="bc-post-mockup">
     <div class="bc-post-user">
      <div class="bc-post-avatar">บ</div>
      <div>
       <strong>ขนมบ้านสวน Baan Suan Snack</strong>
       <small>โพสต์ประกาศ · ทันทีหลังยืนยัน</small>
      </div>
     </div>
     <p class="bc-post-caption">
      🙏 บ้านสวนขออภัยในปัญหาการจัดส่งที่ผ่านมาค่ะ! เราได้รับฟังทุกข้อเสนอแนะและอัปเกรดเป็น <strong>“กล่องลูกฟูก 2 ชั้นหนาพิเศษ + ห่อกันกระแทกทุกกระปุก”</strong> ตั้งแต่วันนี้เป็นต้นไป เพื่อให้ทองม้วนกรอบหอมเนยสดส่งถึงมือคุณลูกค้าอย่างสมบูรณ์ที่สุดนะคะ ขอบคุณที่รักและสนับสนุนบ้านสวนเสมอมาค่ะ ❤️✨
     </p>
     <div class="bc-post-image-placeholder">
      <div class="bc-post-img-content">
       ${icon('box')}
       <strong>กล่องลูกฟูก 2 ชั้นใหม่ แข็งแรงกว่าเดิม 4 เท่า</strong>
       <span>บ้านสวนใส่ใจในทุกออเดอร์ ขนมแตกเปลี่ยนใหม่ให้ฟรี</span>
      </div>
     </div>
    </div>
   </div>

   <div class="bc-dialog-actions bc-approval-actions">
    <button class="bc-button bc-button--secondary" data-action="close-dialog">
     <span>ยกเลิก</span>
    </button>
    <button class="bc-button bc-button--primary bc-button--large" data-action="confirm-approval">
     ${icon('send')}<span>ส่งทั้งหมด (23 ข้อความ)</span>
    </button>
   </div>
  </div>
 `;
}
