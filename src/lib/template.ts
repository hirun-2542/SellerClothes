import type { ClothingItem } from "@/types/item";

export function generateItemComment(item: ClothingItem): string {
  const hasManySizes = item.sizes.length > 1;
  const sizeLines = item.sizes.map(
    (size) => `Sz. ${size.label} อก ${size.chest} ยาว ${size.length}`,
  );

  return [
    `${item.brand} ${item.name} ${item.color}${hasManySizes ? " (มีหลายตัวหลายไซส์)" : ""}`,
    `สภาพ${item.conditionLevel} ${item.flawNote}`,
    ...sizeLines,
    `ราคา${hasManySizes ? "(ตัวละ)" : ""} ${item.price}`,
  ].join("\n");
}

export function generateMainPost(items: ClothingItem[]): string {
  return `🛍️ เปิดล็อตใหม่! เสื้อผ้ามือสอง ${items.length} ชุด
ราคาและรายละเอียดดูในคอมเมนต์ด้านล่างได้เลยค่ะ 👇`;
}
