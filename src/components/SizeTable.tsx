"use client";

import type { SizeEntry } from "@/types/item";

type Props = {
  sizes: SizeEntry[];
  onChange: (sizes: SizeEntry[]) => void;
};

export function SizeTable({ sizes, onChange }: Props) {
  function update(index: number, field: keyof SizeEntry, value: string) {
    onChange(sizes.map((size, i) => (i === index ? { ...size, [field]: value } : size)));
  }

  function remove(index: number) {
    if (sizes.length === 1) return;
    onChange(sizes.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_1fr_1fr_52px] gap-2 text-sm font-medium text-slate-700">
        <span>Sz.</span>
        <span>อก</span>
        <span>ยาว</span>
        <span />
      </div>
      {sizes.map((size, index) => (
        <div className="grid grid-cols-[1fr_1fr_1fr_52px] gap-2" key={index}>
          <input
            className="min-h-11 rounded border border-slate-300 px-3"
            value={size.label}
            onChange={(event) => update(index, "label", event.target.value)}
            placeholder="M"
          />
          <input
            className="min-h-11 rounded border border-slate-300 px-3"
            value={size.chest}
            onChange={(event) => update(index, "chest", event.target.value)}
            placeholder="44"
          />
          <input
            className="min-h-11 rounded border border-slate-300 px-3"
            value={size.length}
            onChange={(event) => update(index, "length", event.target.value)}
            placeholder="28"
          />
          <button
            className="min-h-11 rounded border border-slate-300 px-2 text-sm disabled:opacity-40"
            type="button"
            onClick={() => remove(index)}
            disabled={sizes.length === 1}
          >
            ลบ
          </button>
        </div>
      ))}
      <button
        className="min-h-11 rounded bg-slate-900 px-4 text-white"
        type="button"
        onClick={() => onChange([...sizes, { label: "", chest: "", length: "" }])}
      >
        + เพิ่มไซส์
      </button>
    </div>
  );
}
