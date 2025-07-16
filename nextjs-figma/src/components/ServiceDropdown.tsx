"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  { label: "비자 서비스", href: "/service/visa" },
  { label: "번역·인증 서비스", href: "/service/translation" },
  { label: "베트남 현지 서비스", href: "/service/vietnam" },
];

export default function ServiceDropdown() {
  const [open, setOpen] = useState(false);
  let closeTimeout: NodeJS.Timeout | null = null;

  // 팝업이 바로 닫히지 않도록 mouseleave 시 약간의 delay 적용
  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`px-3 py-2 font-semibold transition text-[#2B3A55] hover:text-[#6B2B90]`}
        style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
      >
        서비스
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block px-4 py-2 hover:bg-gray-100 text-[#2B3A55] hover:text-[#6B2B90] transition"
              onClick={() => setOpen(false)}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 