import {brand,metrics,comments,issues,products,categories,platforms,replyDraft} from './shared/data.js';
import {icon,button,badge,platform,severity,status,sparkline,card,commentCard,metricCard,emptyState,escapeHTML,openDialog,closeDialog,toast,countTo} from './shared/ui.js';
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

/**
 * หน้า 7: รายละเอียดปัญหา "กล่องบุบ" (โอ๊ค)
 * รองรับทั้งสถานะเริ่มต้น (22 ต.ค.) และสถานะติดตามผล (29 ต.ค. ผลจำลอง)
 */
export function issueDetailPage(issueId='packaging', {tracking=false}={}){
 const issue = issues.find(i=>i.id===issueId)||issues[0];
 const currentTracking = Boolean(tracking);

 // สวิตช์สลับดูสถานะ เพื่อให้กรรมการและผู้ตรวจทดสอบได้ทั้ง 2 เฟรม
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

 // แถบติดตามผล (สำหรับสถานะหลังอนุมัติ) อ้างอิงข้อ 6.5
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

 // ข้อมูลตัวเลข (แปรผันตามสถานะจริง หรือผลจำลอง 29 ต.ค.)
 const statComplaints = currentTracking ? {val:'4', change:'−83%', note:'จาก 23 คอมเมนต์ (ผลจำลอง)', tone:'green'} : {val:'23', change:'+340%', note:'จากเฉลี่ย 5.2 ต่อสัปดาห์', tone:'red'};
 const statButter = currentTracking ? {val:'฿28,900', change:'+31%', note:'ฟื้นตัวจาก ฿22,000 (ผลจำลอง)', tone:'green'} : {val:'฿22,000', change:'−32%', note:'จาก ฿32,400 สัปดาห์ก่อน', tone:'red'};
 const statRating = currentTracking ? {val:'4.7', change:'จาก 4.5', note:'คะแนน Shopee ฟื้นตัว (ผลจำลอง)', tone:'green'} : {val:'4.5', change:'จาก 4.8', note:'คะแนนร้านบน Shopee', tone:'red'};

 // กราฟเปรียบเทียบคำบ่นกับยอดขายทองม้วน (Dual-Series)
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
    <svg viewBox="0 0 700 180" preserveAspectRatio="none" role="img" aria-label="กราฟแสดงคำบ่นเรื่องกล่องบุบพุ่งสูงขึ้นสอดคล้องกับยอดขายทองม้วนที่ลดลง">
     <g class="bc-chart-grid">
      <line x1="20" y1="30" x2="680" y2="30" vector-effect="non-scaling-stroke" />
      <line x1="20" y1="80" x2="680" y2="80" vector-effect="non-scaling-stroke" />
      <line x1="20" y1="130" x2="680" y2="130" vector-effect="non-scaling-stroke" />
     </g>
     <!-- จุดเปลี่ยน 14 ต.ค. -->
     <line x1="240" y1="15" x2="240" y2="160" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>
     
     <!-- เส้นคำบ่น (สีแดง พุ่งขึ้น) -->
     <path class="bc-chart-complaints" d="M30 145 C150 142 220 140 280 120 C360 90 480 50 670 35" fill="none" stroke="#ff3b30" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
     <!-- เส้นยอดขายทองม้วน (สีทองม้วน ดิ่งลง) -->
     <path class="bc-chart-butter-line" d="M30 45 C150 48 220 50 280 75 C360 110 480 135 670 142" fill="none" stroke="#d19471" stroke-width="2.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
     
     <!-- จุดสำคัญ -->
     <circle cx="280" cy="120" r="4.5" fill="white" stroke="#ff3b30" stroke-width="2"/>
     <circle cx="670" cy="35" r="5" fill="#ff3b30"/>
     <circle cx="670" cy="142" r="5" fill="#d19471"/>
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

 // ลำดับเวลาเหตุการณ์ (Incident Timeline Breadcrumbs)
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

 // คลิป TikTok ไวรัล (Evidence Card)
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
      <a href="#/comments/2" class="bc-button bc-button--soft bc-button--small">
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

 // คอมเมนต์ตัวอย่างที่เกี่ยวข้องกับปัญหากล่องบุบ
 const packagingComments = [comments[0], comments[2], comments[7], comments[9]];

 // การ์ด 3 ทางแก้ที่ AI เสนอ + ทางเลือกขนส่ง A
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
   <!-- Header & Breadcrumbs -->
   <nav class="bc-breadcrumbs bc-reveal" aria-label="เส้นทางนำทาง">
    <a href="#/today">${icon('home')}<span>สรุปวันนี้</span></a>
    ${icon('chevron')}
    <a href="#/issues">รายการปัญหา</a>
    ${icon('chevron')}
    <span aria-current="page">กล่องบุบ ทองม้วนแตก</span>
   </nav>

   ${stateSwitcher}
   ${trackingBanner}

   <!-- หัวข้อหลักและสถานะ -->
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

   <!-- สรุปตัวเลขผลกระทบ 3 กล่อง -->
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

   <!-- AI Root Cause Analysis Section -->
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

   <!-- ผลกระทบต่อยอดขายและกราฟคู่ (Impact Analysis) -->
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

   <!-- Evidence Hub: คลิป TikTok ไวรัล และ คอมเมนต์ตัวอย่าง -->
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

    <!-- คลิป TikTok ไวรัล -->
    ${viralTiktok}

    <!-- ตารางคอมเมนต์ตัวอย่าง 4 รายการสำคัญ -->
    <div class="bc-sample-comments-head">
     <h3>ตัวอย่างคอมเมนต์ที่มีผลต่อคะแนนร้าน</h3>
     <span>คัดกรอง 4 คอมเมนต์สำคัญตาม MOCKUP-PAGES.md ข้อ 6.7</span>
    </div>
    <div class="bc-comments-grid">
     ${packagingComments.map(c=>`<div class="bc-reveal">${commentCard(c)}</div>`).join('')}
    </div>
   </section>

   <!-- 3 แนวทางแก้ที่ AI เสนอ -->
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

   <!-- Bottom Action Floating/Sticky Bar -->
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

/**
 * หน้า 8: แผ่นซ้อนอนุมัติและส่งข้อความ (โอ๊ค)
 * แสดงใน Dialog บน Desktop หรือ Sheet บน Mobile
 */
export function approvalModalContent(){
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

   <!-- สรุปจำนวนผู้รับแยกตามช่องทาง -->
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

   <!-- รายชื่อลูกค้า 23 คน (แบบเลื่อนดูได้) -->
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

   <!-- กล่องข้อความร่างตอบลูกค้า (แก้ไขได้) -->
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

   <!-- เช็กบ็อกซ์เลือกสิ่งที่ต้องการทำ -->
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

   <!-- ตัวอย่างโพสต์ประกาศบนโซเชียลมีเดีย -->
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

   <!-- ปุ่มดำเนินการ -->
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
