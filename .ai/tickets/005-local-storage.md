# Ticket 005: Session Persistence (localStorage)

## Owner

Codex

## Goal

เก็บ items + brands ที่เคยใช้ใน localStorage เพื่อไม่หายเมื่อ refresh

## Scope

Codex may change:

- `src/hooks/useItemList.ts` (แก้ hook ที่มีอยู่)

Codex must not change:

- `src/types/item.ts`
- `src/lib/template.ts`
- `src/components/`
- `.ai/`

## Context

มี 2 ชุดข้อมูลที่ต้อง persist:
1. **items** (`"sc-items"`) — รายการเสื้อในล็อตปัจจุบัน
2. **brands** (`"sc-brands"`) — brands ที่เคยพิมพ์ สำหรับ `<datalist>` autocomplete ใน ItemForm

brands persist ข้าม session (ใช้ซ้ำได้ตลอด)
items ควรถาม confirm ก่อน clear เพราะอาจ clear ผิด

## Requirements

- [ ] `useItemList` persist items ใน `localStorage["sc-items"]` (JSON)
- [ ] โหลดหน้าใหม่ → items กลับมาจาก localStorage
- [ ] `addItem()` → save brand ลง `localStorage["sc-brands"]` (dedup array)
- [ ] `clearAll()` ล้างทั้ง state และ `"sc-items"` (แต่ไม่ล้าง `"sc-brands"`)
- [ ] handle JSON parse error gracefully: ถ้า parse ไม่ได้ → เริ่ม state ใหม่ empty (ไม่ crash)
- [ ] ปุ่ม "ล้างรายการทั้งหมด" ใน `/` พร้อม `window.confirm()` ก่อน clear

## Acceptance criteria

- [ ] เพิ่ม 3 ชุด → refresh → ยังมี 3 ชุด
- [ ] กด "ล้างรายการ" → confirm → items หาย, brand suggestions ยังอยู่
- [ ] DevTools: เซ็ต `localStorage["sc-items"]` เป็น `"INVALID"` → refresh → app ไม่ crash, items ว่าง
- [ ] พิมพ์ brand "ยูนิโคล" → add item → refresh → datalist แนะนำ "ยูนิโคล"

## Test plan

```bash
npm run dev
# manual: เพิ่มชุด → refresh → ตรวจ
# manual: corrupt localStorage → refresh → ตรวจไม่ crash
npx tsc --noEmit
```

## Risk notes

- `"sc-brands"` ไม่ควรล้างตาม items เพราะ seller ใช้ brand เดิมซ้ำข้ามล็อต
- ระวัง `localStorage` ไม่มีใน SSR (Next.js) — ต้องเรียกใน `useEffect` เท่านั้น

## Suggested branch name

`ai/task-005-local-storage`

## Suggested PR title

`feat: persist items and brand history to localStorage`

---
