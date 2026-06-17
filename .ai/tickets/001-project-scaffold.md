# Ticket 001: Project Scaffold + Data Types

## Owner

Codex

## Goal

สร้าง Next.js 14 project พร้อม Tailwind และกำหนด data types ที่ถูกต้องสำหรับทั้งโปรเจกต์

## Scope

Codex may change:

- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/types/item.ts` (สร้างใหม่)

Codex must not change:

- `.ai/`
- `CLAUDE.md`
- `AGENTS.md`

## Context

Greenfield project — ยังไม่มีโค้ด ต้องสร้างใหม่ทั้งหมด
Data model ต้องรองรับ 1 item มีได้หลาย size และ measurement ต่อ size

## Requirements

- [ ] Init Next.js 14 App Router + TypeScript (strict mode)
- [ ] Install + config Tailwind CSS
- [ ] สร้าง `src/types/item.ts` ตาม spec ด้านล่าง
- [ ] หน้า root `/` แสดงข้อความ "SellerClothes" เพื่อยืนยัน app รันได้

### Types spec

```ts
// src/types/item.ts

export type SizeEntry = {
  label: string   // "S", "M", "L", "XL", "XXL" etc.
  chest: string   // อก — string เพราะรองรับ range เช่น "48-50"
  length: string  // ยาว — string เพราะรองรับ decimal เช่น "28.5"
}

export type ClothingItem = {
  id: string
  brand: string          // "ยูนิโคล"
  name: string           // "เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย"
  color: string          // "สีขาวออฟไวท์"
  conditionLevel: string // "ใหม่" | "ดีสวย" | "พอใช้"
  flawNote: string       // "ไม่มีตำหนิ" | "มีตำหนิเล็กน้อย..."
  sizes: SizeEntry[]     // min 1 entry
  price: number
}
```

**สำคัญ:** `chest` และ `length` เป็น `string` ไม่ใช่ `number` เพราะตัวอย่างจริงมี "48-50" (range)

## Acceptance criteria

- [ ] `npm run dev` รันได้ ไม่มี error
- [ ] `npm run build` ผ่าน
- [ ] `npx tsc --noEmit` ผ่าน (strict mode)
- [ ] `src/types/item.ts` export `SizeEntry` และ `ClothingItem`

## Test plan

```bash
npm run dev
npm run build
npx tsc --noEmit
```

## Risk notes

- `chest` และ `length` ต้องเป็น `string` ไม่ใช่ `number` — ห้ามเปลี่ยนเป็น number เพราะ "48-50" จะ parse ไม่ได้

## Suggested branch name

`ai/task-001-project-scaffold`

## Suggested PR title

`feat: init Next.js 14 project with data types`

---
