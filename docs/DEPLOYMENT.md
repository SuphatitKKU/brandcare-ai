# เผยแพร่ BrandCare AI บน Cloudflare Pages

เดโม: **https://brandcare-ai.pages.dev/#/today**

Cloudflare Pages project: `brandcare-ai` · production branch: `main`

เว็บที่เผยแพร่เป็น UI mockup และข้อมูลสมมติชุดเดียวกับใน repository รายละเอียดขอบเขตอยู่ใน [README](../README.md)

## Deploy ผ่าน CLI

ต้องมี Node.js/npm และบัญชี Cloudflare ที่มีสิทธิ์เข้าถึง project นี้ หากยังไม่ได้เข้าสู่ระบบ ให้รัน `npx --yes wrangler@4.152.0 login` และยืนยันบัญชีใน browser

```powershell
git switch main
git pull --ff-only origin main
npm run deploy
```

คำสั่งนี้ build ไฟล์สาธารณะไปยัง `dist/` แล้ว upload ผ่าน Wrangler ไปยัง production โดยตรง การ push GitHub เพียงอย่างเดียวไม่ได้ deploy เว็บอัตโนมัติ

`scripts/build-site.mjs` คัดลอก HTML, CSS, JavaScript, รูปภาพ และฟอนต์ที่ใช้กับเว็บ โฟลเดอร์ Git เอกสาร เครื่องมือ และไฟล์ตั้งค่าในเครื่องไม่ถูกรวมในผล build

ตรวจผล build อย่างเดียวด้วย `npm run build` ส่วน `dist/` ไม่ต้อง commit

## ลิงก์และ QR code

- GitHub About → Website ใช้ `https://brandcare-ai.pages.dev/`
- README ลิงก์ตรงไปหน้า `#/today` และใช้ภาพ [demo-qr.png](images/demo-qr.png) ซึ่งเข้ารหัส URL เดียวกัน
- หากเปลี่ยนโดเมน ต้องเปลี่ยนทั้งลิงก์ README, GitHub About, เอกสารนี้ และสร้าง QR code ใหม่

วิดีโอแนะนำโปรเจกต์ยังอยู่ต้น README และเปิดดูผ่าน GitHub ได้เหมือนเดิม
