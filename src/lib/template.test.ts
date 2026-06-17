import { describe, expect, it } from "vitest";
import { generateItemComment, generateMainPost } from "./template";
import type { ClothingItem } from "@/types/item";

const baseItem: ClothingItem = {
  id: "1",
  brand: "ยูนิโคล",
  name: "เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย",
  color: "สีขาวออฟไวท์",
  conditionLevel: "ใหม่",
  flawNote: "ไม่มีตำหนิ",
  sizes: [{ label: "M", chest: "44", length: "28" }],
  price: 320,
};

describe("template", () => {
  it("generates a single-size comment", () => {
    expect(generateItemComment(baseItem)).toBe(`ยูนิโคล เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย สีขาวออฟไวท์
สภาพใหม่ ไม่มีตำหนิ
Sz. M อก 44 ยาว 28
ราคา 320`);
  });

  it("generates a multi-size comment", () => {
    expect(
      generateItemComment({
        ...baseItem,
        color: "สีน้ำตาลอ่อน",
        sizes: [
          { label: "S", chest: "42", length: "26.5" },
          { label: "XL", chest: "48-50", length: "29.5" },
        ],
        price: 340,
      }),
    ).toBe(`ยูนิโคล เสื้อเชิ้ตฮาวายคอเปิดผู้ชาย สีน้ำตาลอ่อน (มีหลายตัวหลายไซส์)
สภาพใหม่ ไม่มีตำหนิ
Sz. S อก 42 ยาว 26.5
Sz. XL อก 48-50 ยาว 29.5
ราคา(ตัวละ) 340`);
  });

  it("keeps chest ranges as text", () => {
    expect(
      generateItemComment({
        ...baseItem,
        sizes: [{ label: "XL", chest: "48-50", length: "29.5" }],
      }),
    ).toContain("อก 48-50");
  });

  it("keeps condition and flaw text together", () => {
    expect(
      generateItemComment({
        ...baseItem,
        conditionLevel: "ดีสวย",
        flawNote: "ไม่มีตำหนิ",
      }),
    ).toContain("สภาพดีสวย ไม่มีตำหนิ");
  });

  it("generates the main post count", () => {
    expect(generateMainPost([baseItem, baseItem, baseItem])).toContain("3 ชุด");
  });

  it("handles empty main posts", () => {
    expect(generateMainPost([])).toContain("0 ชุด");
  });
});
