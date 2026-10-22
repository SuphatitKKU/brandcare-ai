# BrandCare AI — Dashboard รวมและไฟล์กลาง

หน้าที่พร้อมในชุดนี้: หน้า 1 ยินดีต้อนรับ / Login, หน้า 5 สรุปวันนี้ และชุดคอมโพเนนต์กลาง ตาม `MOCKUP-PAGES.md`

งานที่ 1 ของภูมิ: **UI Login mockup เสร็จและตรวจ responsive แล้ว** · รุ่นแรก [PR #2](https://github.com/SuphatitKKU/brandcare-ai/pull/2) · ปรับ responsive/validation [PR #3](https://github.com/SuphatitKKU/brandcare-ai/pull/3) · ดูผลตรวจและงานที่ยังไม่รวมในตารางติดตามหน้า 1 ของ `MOCKUP-PAGES.md`

Repository ของทีม: https://github.com/SuphatitKKU/brandcare-ai (Private)

เพื่อนและ AI ของเพื่อนเริ่มจาก `TEAM-GIT-WORKFLOW.md` แล้ว clone ด้วย `gh repo clone SuphatitKKU/brandcare-ai` เข้าโฟลเดอร์บนเครื่องของตนเอง ใช้ branch แยกและ rebase กับ `origin/main` ก่อน merge ผ่าน PR

## เปิดใช้งาน

เปิด Terminal ที่โฟลเดอร์โปรเจกต์ แล้วรัน:

```powershell
npm run dev
```

หรือดับเบิลคลิก `start.cmd` แล้วเปิด http://localhost:4174/ กด `Ctrl+C` ใน Terminal เพื่อหยุดเซิร์ฟเวอร์

ต้องมี Node.js / npm สำหรับคำสั่ง `npm run dev` และ Python 3 สำหรับ static server ไม่ต้องรัน `npm install` เพราะโปรเจกต์ไม่มี dependencies หากต้องการรันโดยไม่ใช้ npm ให้ใช้ `python -m http.server 4174 --bind 127.0.0.1` จากโฟลเดอร์โปรเจกต์

- Dashboard: http://localhost:4174/#/today
- หน้าแรก / Login mockup: http://localhost:4174/#/login (เปิดเว็บโดยไม่มี route จะเข้าหน้านี้)
- ทดลองเข้าสู่ระบบด้วย Google หรืออีเมลสมมติ เพื่อไปยัง `#/brand-setup` ซึ่งเป็นจุดเชื่อมต่อหน้า 2 ที่ยังรอพัฒนา ไม่มีการเชื่อมบัญชีหรือบันทึกข้อมูลจริง
- ชุดคอมโพเนนต์กลาง: http://localhost:4174/#/components
- คู่มือทีม: `shared/README.md`
- คู่มือให้ AI ติดตั้ง GitHub CLI / สร้าง branch / push / rebase / merge: `TEAM-GIT-WORKFLOW.md`
- แผนที่ปรับแล้ว: `MOCKUP-PAGES.md` (สำเนาของไฟล์ต้นทางที่ผู้ใช้ระบุ)

## ไฟล์หลัก

- `app.js`: ติดตั้ง shell, router, ค้นหาทั้งร้าน, แจ้งเตือน และจุดเชื่อมต่อของหน้าที่จะทำภายหลัง
- `dashboard.js`: หน้า 5 สำหรับ BrandCare AI / ขนมบ้านสวน
- `login.js`, `login.css`: หน้า 1 ยินดีต้อนรับ / Login mockup และจุดเชื่อมต่อหน้าตั้งค่าแบรนด์
- `components.js`: ตัวอย่างคอมโพเนนต์กลางให้ทีมกดดูพฤติกรรม
- `shared/data.js`: ข้อมูลจากข้อ 6 ในแผน
- `shared/ui.js`: ฟังก์ชัน markup และพฤติกรรมที่ใช้ร่วมกัน
- `shared/tokens.css`, `shared/components.css`, `shared/brandcare.css`: ฟอนต์ SF Pro, พื้นขาวเทา ปุ่มสีน้ำเงินตามธีมเดิม การ์ดมุมโค้ง Header บน Desktop และ Bottom nav บนมือถือ

ตัวเลขใน Dashboard: 23 คอมเมนต์, +340%, ยอดขาย ฿48,200 ลดลง 18%, คะแนน 4.8 เป็น 4.5, งานวันนี้ 3 ข้อ และ 11.11 อีก 20 วัน

ทุกข้อมูลเป็น mockup ร้านและลูกค้าเป็นข้อมูลสมมติ มีหน้า Login และ Dashboard พร้อมชุดคอมโพเนนต์ หน้าอื่นมีเพียงจุดเชื่อมต่อ ยังไม่ได้พัฒนา ไม่มีการเชื่อม API ล็อกอินจริง เรียก AI ส่งข้อความ หรือโพสต์จริง ไม่มีการ deploy
