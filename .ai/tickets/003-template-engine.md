# Ticket 003: Post Template Engine

## Owner

Codex

## Goal

สร้าง pure functions ที่ generate text โพสต์ Facebook จาก ClothingItem ให้ตรงกับ format จริงที่ seller ใช้

## Scope

Codex may change:

- `src/lib/template.ts` (สร้างใหม่)
- `src/lib/template.test.ts` (สร้างใหม่)

Codex must not change:

- `src/types/item.ts`
- `src/components/`
- `.ai/`

## Context

Format จริงจากตัวอย่าง seller:

```
ยูนิโคล เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย สีขาวออฟไวท์
สภาพใหม่ ไม่มีตำหนิ
Sz. M อก 44 ยาว 28
ราคา 320
```

กรณี multi-size (ราคาใช้ "ตัวละ"):

```
ยูนิโคล เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย สีน้ำตาลอ่อน (มีหลายตัวหลายไซส์)
สภาพใหม่ ไม่มีตำหนิ
Sz. S อก 42 ยาว 26.5
Sz. M อก 44 ยาว 28
Sz. L อก 46 ยาว 28.5
Sz. XL อก 48-50 ยาว 29.5
Sz. XXL อก 50-52 ยาว 30
ราคา(ตัวละ) 340
```

## Requirements

### `generateItemComment(item: ClothingItem): string`

Format:

```
{brand} {name} {color}{multiSizeNote}
สภาพ{conditionLevel} {flawNote}
Sz. {size.label} อก {size.chest} ยาว {size.length}   ← repeat per size, each on new line
ราคา{priceLabel} {price}
```

Rules:
- [ ] `multiSizeNote` = ` (มีหลายตัวหลายไซส์)` ถ้า `sizes.length > 1`, ไม่งั้นไม่มี
- [ ] `priceLabel` = `(ตัวละ)` ถ้า `sizes.length > 1`, ไม่งั้นเป็น string ว่าง
- [ ] แต่ละ size = `Sz. {label} อก {chest} ยาว {length}` (ขึ้นบรรทัดใหม่แต่ละ size)
- [ ] ไม่มี trailing whitespace

### `generateMainPost(items: ClothingItem[]): string`

สำหรับโพสต์หลัก (สั้น ๆ):

```
🛍️ เปิดล็อตใหม่! เสื้อผ้ามือสอง {n} ชุด
ราคาและรายละเอียดดูในคอมเมนต์ด้านล่างได้เลยค่ะ 👇
```

- [ ] แทน `{n}` ด้วยจำนวน items

### Unit tests ใน `template.test.ts`

- [ ] single size item → ไม่มี "(มีหลายตัวหลายไซส์)" และใช้ "ราคา" (ไม่มี ตัวละ)
- [ ] multi-size item → มี "(มีหลายตัวหลายไซส์)" และใช้ "ราคา(ตัวละ)"
- [ ] chest "48-50" (range) → output มี "อก 48-50" ตามตัวอย่าง
- [ ] conditionLevel "ดีสวย" + flawNote "ไม่มีตำหนิ" → "สภาพดีสวย ไม่มีตำหนิ"
- [ ] generateMainPost([...3 items]) → output มี "3 ชุด"
- [ ] generateMainPost([]) → ไม่ crash, return empty message

## Acceptance criteria

- [ ] output ของ `generateItemComment` ตรงกับตัวอย่าง seller ทุก character
- [ ] unit tests ทั้งหมดผ่าน
- [ ] ไม่มี external dependency

## Test plan

```bash
npx vitest run src/lib/template.test.ts
npx tsc --noEmit
```

## Risk notes

- ห้ามใส่ emoji หรือ newline พิเศษนอกเหนือจาก format ด้านบน — ต้องตรงกับที่ seller ใช้จริง
- ถ้าต้องเปลี่ยน format ในอนาคต ให้แก้ที่ template.ts ที่เดียว

## Suggested branch name

`ai/task-003-template-engine`

## Suggested PR title

`feat: add Facebook post template engine`

---
