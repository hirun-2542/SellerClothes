"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostPreview } from "@/components/PostPreview";
import { useItemList } from "@/hooks/useItemList";

export default function PreviewPage() {
  const router = useRouter();
  const { items, ready } = useItemList();

  useEffect(() => {
    if (ready && items.length === 0) router.replace("/");
  }, [items.length, ready, router]);

  if (!ready || items.length === 0) return null;

  return <PostPreview items={items} />;
}
