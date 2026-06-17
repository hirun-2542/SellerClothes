"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ClothingItem, SizeEntry } from "@/types/item";
import { SizeTable } from "./SizeTable";

type Props = {
  addItem: (item: ClothingItem) => void;
};

const emptySize: SizeEntry = { label: "", chest: "", length: "" };

export function ItemForm({ addItem }: Props) {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [conditionLevel, setConditionLevel] = useState("ใหม่");
  const [flawMode, setFlawMode] = useState<"none" | "custom">("none");
  const [flawText, setFlawText] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState<SizeEntry[]>([emptySize]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sc-brands");
      setBrands(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setBrands([]);
    }
  }, []);

  const flawNote = flawMode === "none" ? "ไม่มีตำหนิ" : flawText.trim();

  function submit(event: FormEvent) {
    event.preventDefault();
    const cleanSizes = sizes.map((size) => ({
      label: size.label.trim(),
      chest: size.chest.trim(),
      length: size.length.trim(),
    }));

    if (
      !brand.trim() ||
      !name.trim() ||
      !color.trim() ||
      !conditionLevel ||
      !flawNote ||
      !price ||
      cleanSizes.some((size) => !size.label || !size.chest || !size.length)
    ) {
      setError("กรอกข้อมูลให้ครบก่อนเพิ่มรายการ");
      return;
    }

    addItem({
      id: crypto.randomUUID(),
      brand: brand.trim(),
      name: name.trim(),
      color: color.trim(),
      conditionLevel,
      flawNote,
      sizes: cleanSizes,
      price: Number(price),
    });
    setName("");
    setColor("");
    setConditionLevel("ใหม่");
    setFlawMode("none");
    setFlawText("");
    setPrice("");
    setSizes([emptySize]);
    setError("");
  }

  return (
    <form className="space-y-5" onSubmit={submit}>
      {error ? <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <label className="block space-y-1">
        <span className="text-sm font-medium">แบรนด์</span>
        <input
          className="min-h-11 w-full rounded border border-slate-300 px-3"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          list="brand-list"
        />
        <datalist id="brand-list">
          {brands.map((savedBrand) => (
            <option value={savedBrand} key={savedBrand} />
          ))}
        </datalist>
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">ชื่อสินค้า</span>
        <input
          className="min-h-11 w-full rounded border border-slate-300 px-3"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">สี</span>
        <input
          className="min-h-11 w-full rounded border border-slate-300 px-3"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </label>
      <div className="space-y-2">
        <span className="text-sm font-medium">สภาพ</span>
        <div className="grid grid-cols-3 gap-2">
          {["ใหม่", "ดีสวย", "พอใช้"].map((value) => (
            <button
              className={`min-h-11 rounded border px-3 ${conditionLevel === value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
              type="button"
              onClick={() => setConditionLevel(value)}
              key={value}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">ตำหนิ</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`min-h-11 rounded border px-3 ${flawMode === "none" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
            type="button"
            onClick={() => {
              setFlawMode("none");
              setFlawText("");
            }}
          >
            ไม่มีตำหนิ
          </button>
          <button
            className={`min-h-11 rounded border px-3 ${flawMode === "custom" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white"}`}
            type="button"
            onClick={() => setFlawMode("custom")}
          >
            มีตำหนิ...
          </button>
        </div>
        {flawMode === "custom" ? (
          <input
            className="min-h-11 w-full rounded border border-slate-300 px-3"
            value={flawText}
            onChange={(event) => setFlawText(event.target.value)}
            placeholder="มีตำหนิเล็กน้อย..."
          />
        ) : null}
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-medium">ราคา</span>
        <input
          className="min-h-11 w-full rounded border border-slate-300 px-3"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          type="number"
          min="0"
        />
      </label>
      <SizeTable sizes={sizes} onChange={setSizes} />
      <button className="min-h-11 w-full rounded bg-emerald-700 px-4 font-medium text-white" type="submit">
        เพิ่มรายการ
      </button>
    </form>
  );
}
