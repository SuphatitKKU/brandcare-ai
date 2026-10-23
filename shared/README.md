# BrandCare AI — ไฟล์กลางสำหรับทีม

ชุดนี้ใช้กับ Dashboard ของ B และหน้าที่ทีมจะต่อในรอบถัดไป ไม่ต้องติดตั้งแพ็กเกจ

## เปิดดู

- `npm run dev` จากโฟลเดอร์หลักของโปรเจกต์ (โฟลเดอร์ที่มี `package.json`)
- Dashboard รวม: http://localhost:4174/#/today
- ตัวอย่างคอมโพเนนต์: http://localhost:4174/#/components

## ไฟล์และสัญญาร่วมกัน

| ไฟล์ | หน้าที่ |
|---|---|
| `tokens.css` | สี ฟอนต์ ระยะห่าง มุมโค้ง ระยะเวลาและ easing ของ animation |
| `components.css` | หน้าตาคอมโพเนนต์ทุกชนิด รวม responsive และ reduced motion |
| `brandcare.css` | ส่วนปรับ responsive, Bottom nav และแผงเมนูบนมือถือ |
| `data.js` | ชื่อร้าน ตัวเลขกลาง คอมเมนต์ 12 ตัวอย่าง ปัญหา 4 ตัวอย่าง สินค้า และเมนู อ้างอิงข้อ 6 ในแผน |
| `ui.js` | ฟังก์ชันสร้าง markup และพฤติกรรมกลาง เช่น dialog, toast, animation |

Header ชั้นบนมีโลโก้ ชื่อร้าน ค้นหา แจ้งเตือนและโปรไฟล์ ชั้นล่างเป็น sticky navigation แบบแนวนอนและปุ่มถาม AI ไม่มี Sidebar บนมือถือไม่แสดง Header ชั้นล่าง แต่ใช้ Bottom nav: วันนี้ / ปัญหา / ปุ่มเมนูตรงกลาง / คอมเมนต์ / ถาม AI ปุ่มกลางเปิดกล่อง popover ลอยเหนือแถบเมนู มี ยอดขายและรีวิว / เทศกาล / ตั้งค่า และลิงก์ชุดคอมโพเนนต์ ขนาดมาตรฐาน Desktop 1440 × 900 และ Mobile 390 × 844

## เรียกใช้คอมโพเนนต์

```js
import { comments, issues, metrics } from './shared/data.js';
import {
  button, badge, platform, severity, status, sparkline,
  card, metricCard, issueCard, commentCard, listRow, mobileNav, mobileMenu,
  emptyState, skeleton, openDialog, closeDialog, toast,
  reveal, countTo
} from './shared/ui.js';

const content = card({
  title: 'คอมเมนต์เด่นวันนี้',
  content: commentCard(comments[0]),
  action: button('ดูทั้งหมด', { href: '#/comments', variant: 'text' })
});

issueCard(issues[0]);
badge('urgent');
platform('shopee');
button('ดู', { action: 'your-action', variant: 'secondary' });
toast('บันทึกแล้ว');
openDialog('<h2>รายละเอียด</h2>', { drawer: true, label: 'รายละเอียด' });
```

`variant`: `primary`, `secondary`, `soft`, `text`, `danger` · `size`: `small` · `disabled: true` สำหรับปุ่มปิดใช้งาน

`badge`: `urgent`, `drama`, `idea`, `praise`, `intent`, `competitor` · `platform`: `shopee`, `tiktok`, `facebook`, `instagram`, `youtube`

`severity`: `critical`, `medium`, `low`, `opportunity` · `status` ใช้ tone `neutral`, `red`, `orange`, `gold`, `blue`, `green`

`card.content` และ `openDialog.content` เป็น markup ภายในที่แอปควบคุม ห้ามใส่ข้อมูลภายนอกโดยตรง ต้องใช้ `escapeHTML()` ก่อนเสมอ ฟังก์ชันสำหรับ comment/issue จัดการ escape ข้อความข้อมูลให้แล้ว

## เพิ่มหน้ารอบถัดไป

Shell ติดตั้งครั้งเดียวใน `app.js` หน้าลูกคืนเฉพาะเนื้อหาสำหรับ `#bc-main` ห้ามวาด Header ใหม่ นำหน้าใหม่ไปแทน branch ใน `render()` และเอาป้ายจุดเชื่อมต่อออกเมื่อหน้านั้นทำครบจริง

| Route | หน้าในแผน | สถานะรอบนี้ |
|---|---:|---|
| `#/today` | 5 | Dashboard รวมพร้อมใช้ |
| `#/components` | พื้นที่ทีม | ตัวอย่างไฟล์กลางพร้อมใช้ |
| `#/issues` | 6 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/issues/packaging` | 7 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/issues/packaging/approve` | 8 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/comments` / `#/comments/:id` | 9 / 10 | หน้า 9 พร้อมใช้ / หน้า 10 จุดเชื่อมต่อรอรอบถัดไป |
| `#/sales` | 11 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/festivals` | 13 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/ai` | 15 | จุดเชื่อมต่อรอรอบถัดไป |
| `#/settings` | 17 | จุดเชื่อมต่อรอรอบถัดไป |

## กติกาข้อมูลและการเคลื่อนไหว

- ตัวเลขอ้างอิง `data.js` และข้อ 6 ใน `MOCKUP-PAGES.md` เท่านั้น
- กราฟหน้า 5 ใช้ตัวเลขก่อน/หลังสองสัปดาห์ที่มีจริงในชุด demo เส้น sparkline เป็นภาพแนวโน้มประกอบการสาธิตและมีข้อความกำกับ
- ไม่ใช้ชื่อหรือภาพคนจริง ไม่ใช้หน้าตา marketplace จริงทั้งหน้าจอ
- ทุกข้อมูลเป็น mockup ไม่มีการส่งข้อความ เชื่อมบัญชี เรียก AI หรืออนุมัติการกระทำจริง
- Animation ประกอบด้วย reveal, count-up, sparkline draw, pill transition, headline clip reveal, แถบสัดส่วนขนส่ง, bottom sheet พร้อม stagger, modal/drawer และ toast รองรับ `prefers-reduced-motion`
- เมื่อเปลี่ยนเนื้อหา เรียก `reveal(root)` ใหม่ ฟังก์ชันคืน cleanup สำหรับ disconnect observer
- สีไม่เป็นตัวบอกสถานะเพียงอย่างเดียว ทุก badge มีไอคอนและชื่อเสมอ

ทำเฉพาะ Localhost ตามคำขอผู้ใช้ ไม่มีการ deploy ในรอบนี้

## ปรับงานด้วย Impeccable

- ใช้ข้อความบอกข้อมูลและงานตรงๆ ตัดคำโปรยเหนือหัวข้อ
- รักษาฟอนต์ SF Pro เดิม คืนพื้นขาวเทา `#f5f5f7` ปุ่มน้ำเงิน `#0071e3` และสีการ์ดเดิมตามคำขอผู้ใช้
- `--bc-action` ใช้กับปุ่ม/โฟกัส/การเลือก ส่วน `--bc-blue` เป็น alias เพื่อรองรับคอมโพเนนต์เดิม สีป้ายประเภทคอมเมนต์ยังคงแยกตามความหมาย
- `openDialog(content, { sheet: true, label })` ใช้เปิดแผงจากขอบล่าง คืนโฟกัสเมื่อปิดด้วย Esc หรือแตะด้านนอก
- Bottom nav มีช่องปลอดภัยตาม `safe-area-inset-bottom` และ footer เว้นระยะให้เนื้อหาท้ายหน้า

โลโก้ร้านที่เจนใหม่: `assets/images/baansuan-logo.png` เรียกด้วย `shopLogo()` วางข้างชื่อร้านใน Header, บรรทัดร้านบน Dashboard และแผงเมนูมือถือ

## Bottom nav แบบ Apple

บนมือถือใช้แถบลอยพื้นกระจกขาว มุมมนแบบ capsule เว้น safe area เมนูปัจจุบันขยายแสดงไอคอนพร้อมชื่อบนพื้นดำ เมนูอื่นเป็นปุ่มวงกลม ปุ่มกลางเปิดเมนูเพิ่มเติมเป็นกล่องลอยทรงฟองอากาศ ไม่บังแถบเมนูหรือเบลอทั้งหน้า ทุกปุ่มมี accessible name แม้ไม่มีชื่อแสดงอยู่ รองรับ reduced motion และ reduced transparency

การส่งงานผ่าน GitHub ให้อ่าน `../TEAM-GIT-WORKFLOW.md` ให้ AI ติดตั้ง GitHub CLI และทำงานบน feature branch ของตนเองก่อนส่ง PR

เมนูมือถือใช้ native `popover="auto"` ใน `#bc-mobile-menu` แยกจาก `#bc-dialog` เปิด/ปิดจากปุ่มกลาง วางตำแหน่งอิงปุ่มจริง มีหางฟองอากาศ ปิดด้วย Esc/แตะด้านนอก/เลือกเมนู รองรับ reduced motion และกลับเป็นปิดเมื่อหน้าจอขยายเป็น Desktop
