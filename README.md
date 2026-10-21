# BrandCare AI — Dashboard รวมและไฟล์กลาง

งานรอบปัจจุบันของ B: ทำเฉพาะชุดคอมโพเนนต์กลางและหน้า 5 สรุปวันนี้ ตาม `MOCKUP-PAGES.md`

Repository ของทีม: https://github.com/SuphatitKKU/brandcare-ai (Private)

เพื่อนและ AI ของเพื่อนเริ่มจาก `TEAM-GIT-WORKFLOW.md` แล้ว clone ด้วย `gh repo clone SuphatitKKU/brandcare-ai` เข้าโฟลเดอร์บนเครื่องของตนเอง ใช้ branch แยกและ rebase กับ `origin/main` ก่อน merge ผ่าน PR

## เปิดใช้งาน

รัน `npm run dev` ใน `D:\token-free` หรือดับเบิลคลิก `start.cmd` แล้วเปิด http://localhost:4174/

ไม่ต้องติดตั้งแพ็กเกจ ใช้ Python ที่มีอยู่แล้วสำหรับ static server

- Dashboard: http://localhost:4174/#/today
- ชุดคอมโพเนนต์กลาง: http://localhost:4174/#/components
- คู่มือทีม: `shared/README.md`
- คู่มือให้ AI ติดตั้ง GitHub CLI / สร้าง branch / push / rebase / merge: `TEAM-GIT-WORKFLOW.md`
- แผนที่ปรับแล้ว: `MOCKUP-PAGES.md` (สำเนาของไฟล์ต้นทางที่ผู้ใช้ระบุ)

## ไฟล์หลัก

- `app.js`: ติดตั้ง shell, router, ค้นหาทั้งร้าน, แจ้งเตือน และจุดเชื่อมต่อของหน้าที่จะทำภายหลัง
- `dashboard.js`: หน้า 5 สำหรับ BrandCare AI / ขนมบ้านสวน
- `components.js`: ตัวอย่างคอมโพเนนต์กลางให้ทีมกดดูพฤติกรรม
- `shared/data.js`: ข้อมูลจากข้อ 6 ในแผน
- `shared/ui.js`: ฟังก์ชัน markup และพฤติกรรมที่ใช้ร่วมกัน
- `shared/tokens.css`, `shared/components.css`, `shared/brandcare.css`: ฟอนต์ SF Pro, พื้นขาวเทา ปุ่มสีน้ำเงินตามธีมเดิม การ์ดมุมโค้ง Header บน Desktop และ Bottom nav บนมือถือ

ตัวเลขใน Dashboard: 23 คอมเมนต์, +340%, ยอดขาย ฿48,200 ลดลง 18%, คะแนน 4.8 เป็น 4.5, งานวันนี้ 3 ข้อ และ 11.11 อีก 20 วัน

ทุกข้อมูลเป็น mockup ร้านและลูกค้าเป็นข้อมูลสมมติ หน้าอื่นมีเพียงจุดเชื่อมต่อ ยังไม่ได้พัฒนา ไม่มีการเชื่อม API เรียก AI ส่งข้อความ หรือโพสต์จริง ไม่มีการ deploy
