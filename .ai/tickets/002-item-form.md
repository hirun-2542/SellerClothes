# Ticket 002: Item Entry Form with Multi-Size Support

## Owner

Codex

## Goal

สร้าง form คีย์ข้อมูลเสื้อผ้า 1 ชุด รองรับหลาย size พร้อม measurement ต่อ size

## Scope

Codex may change:

- `src/app/page.tsx`
- `src/components/ItemForm.tsx` (สร้างใหม่)
- `src/components/SizeTable.tsx` (สร้างใหม่)
- `src/hooks/useItemList.ts` (สร้างใหม่)

Codex must not change:

- `src/types/item.ts`
- `.ai/`

## Context

Seller ใช้แอปขณะถ่ายภาพบนมือถือ ต้องกดได้เร็ว เสื้อผ้า 1 ชุดอาจมีหลาย size (S/M/L/XL/XXL)
ตัวอย่างข้อมูลที่ต้องคีย์:
- brand: "ยูนิโคล"
- name: "เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย"
- color: "สีน้ำตาลอ่อน"
- condition: ใหม่ / ไม่มีตำหนิ
- sizes: S อก 42 ยาว 26.5 | M อก 44 ยาว 28 | L อก 46 ยาว 28.5
- price: 340

## Requirements

### Fields หลัก

- [ ] **brand** — text input + `<datalist>` จาก brands ที่เคยพิมพ์ (เก็บใน localStorage key `"sc-brands"`)
- [ ] **name** — text input, free text (เช่น "เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย")
- [ ] **color** — text input (เช่น "สีขาวออฟไวท์")
- [ ] **conditionLevel** — 3 ปุ่ม toggle: `ใหม่` / `ดีสวย` / `พอใช้` (default: ใหม่)
- [ ] **flawNote** — 2 ปุ่ม toggle + text input: `ไม่มีตำหนิ` / `มีตำหนิ...` (ถ้าเลือก "มีตำหนิ" ให้แสดง text input)
- [ ] **price** — number input (บาท)

### SizeTable component

- [ ] แสดง rows: [Sz. label] [อก] [ยาว] [ลบ]
- [ ] ปุ่ม `+ เพิ่มไซส์` — append row ใหม่ (empty)
- [ ] เริ่มต้น 1 row ว่าง
- [ ] ลบ row ได้ แต่ต้องเหลือ min 1 row
- [ ] label field: text input ("S", "M", "L", "XL", "XXL", "F" etc.)
- [ ] chest field: text input — รองรับ "42", "48-50"
- [ ] length field: text input — รองรับ "28", "28.5"
- [ ] touch target ทุก input/button >= 44px

### Submit

- [ ] ปุ่ม `เพิ่มรายการ` — validate แล้ว call `addItem()` + reset form
- [ ] Required: brand, name, color, conditionLevel, flawNote, price, และ sizes ทุก row ต้องมี label + chest + length
- [ ] หลัง add สำเร็จ → form reset, brand field ยังคง brand เดิมไว้ (เพราะมักถ่ายหลาย item brand เดียวกัน)

### hook `useItemList`

- [ ] `{ items, addItem, removeItem, clearAll }`
- [ ] เก็บใน React state (localStorage จะทำใน ticket 005)

## Acceptance criteria

- [ ] กรอกครบ 1 size → เพิ่มรายการ → form reset, brand คงอยู่, counter +1
- [ ] กรอก 3 sizes → เพิ่มรายการ → ทั้ง 3 sizes อยู่ใน item
- [ ] กรอกไม่ครบ required → ไม่ submit + error message
- [ ] size row ที่มี chest ว่าง → validate error
- [ ] ทำงานบน mobile viewport 375px
- [ ] ปุ่ม touch target >= 44px

## Test plan

```bash
npm run dev
# manual: กรอก form + เพิ่ม 3 sizes → add → ตรวจ state
npx tsc --noEmit
```

## Risk notes

- Brand `<datalist>` ต้อง populate จาก localStorage ตั้งแต่ mount — ใช้ `useEffect`
- `flawNote` toggle: ถ้าเปลี่ยนจาก "มีตำหนิ..." กลับ "ไม่มีตำหนิ" ให้ reset text input

## Suggested branch name

`ai/task-002-item-form`

## Suggested PR title

`feat: add clothing item form with multi-size support`

---
