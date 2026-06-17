"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "คัดลอก" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className="min-h-11 rounded bg-slate-900 px-4 text-white" type="button" onClick={copy}>
      {copied ? "✓ คัดลอกแล้ว" : label}
    </button>
  );
}
