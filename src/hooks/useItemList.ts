"use client";

import { useEffect, useState } from "react";
import type { ClothingItem } from "@/types/item";

const ITEMS_KEY = "sc-items";
const BRANDS_KEY = "sc-brands";

function readItems(): ClothingItem[] {
  try {
    const raw = localStorage.getItem(ITEMS_KEY);
    return raw ? (JSON.parse(raw) as ClothingItem[]) : [];
  } catch {
    return [];
  }
}

function saveBrand(brand: string) {
  try {
    const raw = localStorage.getItem(BRANDS_KEY);
    const brands = raw ? (JSON.parse(raw) as string[]) : [];
    localStorage.setItem(BRANDS_KEY, JSON.stringify(Array.from(new Set([...brands, brand]))));
  } catch {
    localStorage.setItem(BRANDS_KEY, JSON.stringify([brand]));
  }
}

export function useItemList() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readItems());
    setReady(true);
  }, []);

  function addItem(item: ClothingItem) {
    setItems((current) => {
      const next = [...current, item];
      localStorage.setItem(ITEMS_KEY, JSON.stringify(next));
      saveBrand(item.brand);
      return next;
    });
  }

  function removeItem(id: string) {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      localStorage.setItem(ITEMS_KEY, JSON.stringify(next));
      return next;
    });
  }

  function clearAll() {
    setItems([]);
    localStorage.removeItem(ITEMS_KEY);
  }

  return { items, addItem, removeItem, clearAll, ready };
}
