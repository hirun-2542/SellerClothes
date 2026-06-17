"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "คัดลอก" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let didCopy = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      didCopy = document.execCommand("copy");
      area.remove();
    }

    if (!didCopy) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className="min-h-11 rounded bg-slate-900 px-4 text-white" type="button" onClick={copy}>
      {copied ? "✓ คัดลอกแล้ว" : label}
    </button>
  );
}
