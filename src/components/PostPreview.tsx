"use client";

import type { ClothingItem } from "@/types/item";
import { generateItemComment, generateMainPost } from "@/lib/template";
import { CopyButton } from "./CopyButton";

type Props = {
  items: ClothingItem[];
};

export function PostPreview({ items }: Props) {
  const mainPost = generateMainPost(items);

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">โพสต์หลัก</h1>
          <CopyButton text={mainPost} label="คัดลอกโพสต์" />
        </div>
        <pre className="whitespace-pre-wrap rounded border border-slate-200 bg-white p-4 text-sm">{mainPost}</pre>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {items.map((item, index) => {
          const comment = generateItemComment(item);
          return (
            <article className="space-y-3 rounded border border-slate-200 bg-white p-4" key={item.id}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">ชุดที่ {index + 1}</h3>
                <CopyButton text={comment} />
              </div>
              <pre className="whitespace-pre-wrap text-sm">{comment}</pre>
            </article>
          );
        })}
      </section>
    </main>
  );
}
