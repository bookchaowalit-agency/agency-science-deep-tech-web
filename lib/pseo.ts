export type PseoService = Readonly<{
  kind: 'service';
  slug: string;
  name: string;
  title: string;
  description: string;
  intent: string;
  buyer: string;
  context: string;
  workflow: readonly string[];
  deliverables: readonly string[];
  evidence: readonly string[];
  readiness: string;
  agencySlug: string;
  agencyName: string;
  agencyThaiName: string;
  agencyStatus: 'incubating' | 'target' | 'locked';
  agencyStage: string;
}>;

export const pseoService: PseoService = {
  "kind": "service",
  "slug": "deep-tech-commercialization-map",
  "name": "Technical diligence and commercialization map",
  "title": "Deep-Tech Commercialization Map สำหรับเทคโนโลยีที่ต้องพิสูจน์ตลาด",
  "description": "ประเมินเทคโนโลยีหนึ่งรายการ พร้อมแผน IP, partner, product และ evidence ที่ต้องเพิ่ม",
  "intent": "ต้องการเชื่อมงานวิจัยกับ IP, product, partner และตลาดโดยแยกสิ่งที่พิสูจน์แล้วออกจากสมมติฐาน",
  "buyer": "Founder, researcher และ technology buyer",
  "context": "เริ่มจาก technical review และ commercialization map ก่อนลงทุนหรือสร้าง venture ไม่ใช่การรับรองผลวิจัย",
  "workflow": [
    "กำหนด technology claim และ intended use",
    "ตรวจ evidence, maturity, dependency และ IP question",
    "ทำ partner, product และ market hypothesis map",
    "จัดลำดับ experiment และ evidence ที่ต้องเพิ่ม"
  ],
  "deliverables": [
    "technical claim/evidence register",
    "IP และ dependency question map",
    "partner/product hypothesis map",
    "commercialization next-step plan"
  ],
  "evidence": [
    "ไม่อ้าง scientific validation, patent ownership หรือ market traction โดยไม่มีหลักฐาน",
    "ไม่เก็บ confidential research หรือ unpublished IP ใน public repo",
    "การรับรองทางเทคนิคและกฎหมายทรัพย์สินทางปัญญาต้องใช้ผู้เชี่ยวชาญที่เหมาะสม"
  ],
  "readiness": "ต้องมี science/technology lead, evidence owner, IP boundary และ research reviewer ก่อนเปิด inquiry",
  "agencySlug": "science-deep-tech",
  "agencyName": "Science & Deep Tech",
  "agencyThaiName": "วิทยาศาสตร์และ Deep Tech",
  "agencyStatus": "target",
  "agencyStage": "P3"
};
