# Science & Deep Tech — วิทยาศาสตร์และ Deep Tech

แยกเป็น showcase site สำหรับ Science & Deep Tech ของ Solo Empire ใช้เพื่อแสดง positioning และทดสอบ message เท่านั้น

- Visual world: Lab notebook for commercialization
- Suggested Vercel project: `solo-agency-science-deep-tech`
- Route: \/
- สถานะ commercial: `target` / P3
- ไม่มี database, authentication, API, payment, lead form หรือข้อมูลลูกค้า

## Local

```bash
npm install
npm run check
npm run dev
```

Build ใช้ Next.js static export และสร้าง artifact ที่ `out/` สำหรับ deploy แบบ static บน Vercel

ข้อมูล public-safe มาจาก agency brief/control-plane; งาน freelance/client เดิมไม่ถูกนับเป็น agency customer หรือ case study ในเว็บนี้

## pSEO service page

เว็บนี้มีหน้า service แบบ static ที่ /services/deep-tech-commercialization-map/ สำหรับ intent ของ Science & Deep Tech โดยแยก workflow, deliverables, evidence boundary และ readiness gate ไว้ชัดเจน หน้าเริ่มต้นเป็น noindex และไม่มีการรับ inquiry หรือข้อมูลลูกค้า
