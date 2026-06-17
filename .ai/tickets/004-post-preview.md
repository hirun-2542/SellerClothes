# Ticket 004: Post Preview & Copy UI

## Owner

Codex

## Goal

สร้างหน้า `/preview` แสดงโพสต์หลัก + comment แต่ละชุด พร้อมปุ่ม copy ทีละก้อน

## Scope

Codex may change:

- `src/app/preview/page.tsx` (สร้างใหม่)
- `src/components/PostPreview.tsx` (สร้างใหม่)
- `src/components/CopyButton.tsx` (สร้างใหม่)
- `src/app/page.tsx` (เพิ่มปุ่ม "ดูโพสต์ →")

Codex must not change:

- `src/lib/template.ts`
- `src/types/item.ts`
- `src/hooks/useItemList.ts`
- `.ai/`

## Context

Seller จะ:
1. คีย์ข้อมูลจนครบทุกชุดในหน้าหลัก
2. กด "ดูโพสต์" ไปหน้า preview
3. Copy โพสต์หลักไปวางใน Facebook
4. Loop copy comment ทีละอัน วางใน comment ของโพสต์นั้น

## Requirements

- [ ] ปุ่ม "ดูโพสต์ →" ในหน้า `/` (disabled ถ้า items ว่าง)
- [ ] Route `/preview` — อ่าน items จาก `useItemList`
- [ ] ถ้า items ว่าง → redirect กลับ `/`

### Section: โพสต์หลัก

- [ ] แสดง text จาก `generateMainPost(items)` ใน `<pre>` หรือ whitespace-preserved element
- [ ] ปุ่ม "คัดลอกโพสต์" → copy ไป clipboard

### Section: รายการ comments

- [ ] วน loop items ทีละ item แสดง:
  - header เล็กๆ "ชุดที่ {n}" หรือ "รายการ {n}"
  - text จาก `generateItemComment(item)` ใน whitespace-preserved element
  - ปุ่ม "คัดลอก" ข้างๆ
- [ ] หลัง copy → ปุ่มเปลี่ยนเป็น "✓ คัดลอกแล้ว" นาน 2 วินาที แล้วกลับ

### CopyButton component

- [ ] รับ `text: string` prop
- [ ] ใช้ `navigator.clipboard.writeText(text)`
- [ ] fallback: ถ้า clipboard API ไม่ available → `document.execCommand('copy')` บน selected text
- [ ] แสดง visual feedback 2 วินาที

## Acceptance criteria

- [ ] copy โพสต์หลัก → clipboard ถูกต้อง
- [ ] copy comment ชุดที่ 3 → clipboard มีข้อมูลชุดที่ 3 เท่านั้น
- [ ] visual feedback ทำงาน
- [ ] items ว่าง → redirect / ไม่แสดงหน้าว่าง
- [ ] ทำงานบน mobile 375px

## Test plan

```bash
npm run dev
# manual: คีย์ 3 ชุด → ดูโพสต์ → copy ทีละอัน → วางใน text editor ตรวจ format
npx tsc --noEmit
```

## Risk notes

- `navigator.clipboard.writeText` ต้องการ HTTPS หรือ localhost
- iOS Safari clipboard อาจต้องการ user gesture โดยตรง — ห้าม call ใน async setTimeout

## Suggested branch name

`ai/task-004-post-preview`

## Suggested PR title

`feat: add post preview page with per-item copy`

---
