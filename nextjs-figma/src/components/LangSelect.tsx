"use client";
import { useState } from "react";

const langs = [
  { label: "한국어", value: "ko" },
  { label: "Tiếng Việt", value: "vi" },
];

export default function LangSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("ko");
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-1 rounded text-base font-medium text-[#222] hover:text-blue-600 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        언어 선택
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-30 p-3 flex flex-col items-center">
          {langs.map((l) => (
            <button
              key={l.value}
              className={`w-full text-center py-1 rounded font-medium ${selected === l.value ? "text-blue-600" : "text-black"}`}
              onClick={() => { setSelected(l.value); setOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 