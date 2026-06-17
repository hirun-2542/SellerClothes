"use client";

import Link from "next/link";
import { ItemForm } from "@/components/ItemForm";
import { useItemList } from "@/hooks/useItemList";

export default function Home() {
  const { items, addItem, removeItem, clearAll } = useItemList();

  function confirmClear() {
    if (window.confirm("ล้างรายการทั้งหมด?")) clearAll();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">SellerClothes</h1>
          <p className="text-sm text-slate-600">รายการ {items.length} ชุด</p>
        </div>
        <Link
          className={`min-h-11 rounded px-4 py-3 text-sm font-medium ${items.length ? "bg-slate-900 text-white" : "pointer-events-none bg-slate-200 text-slate-500"}`}
          href="/preview"
          aria-disabled={!items.length}
        >
          ดูโพสต์ →
        </Link>
      </header>

      <ItemForm addItem={addItem} />

      {items.length ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">รายการในล็อต</h2>
            <button className="min-h-11 rounded border border-red-200 px-4 text-red-700" type="button" onClick={confirmClear}>
              ล้างรายการทั้งหมด
            </button>
          </div>
          <div className="space-y-2">
            {items.map((item) => (
              <article className="flex items-center justify-between gap-3 rounded border border-slate-200 bg-white p-3" key={item.id}>
                <div>
                  <p className="font-medium">{item.brand} {item.name}</p>
                  <p className="text-sm text-slate-600">{item.sizes.length} ไซส์ · {item.price} บาท</p>
                </div>
                <button className="min-h-11 rounded border border-slate-300 px-3" type="button" onClick={() => removeItem(item.id)}>
                  ลบ
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
