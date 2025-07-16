"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "대사관 비자 발급", href: "/service/visa/embassy" },
  { label: "전자비자", href: "/service/visa/evisa" },
  { label: "비자 변경", href: "/service/visa/change" },
];

export default function VisaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-5xl py-10 px-0">
        <section className="bg-[#FFA726] rounded-xl p-6 mb-8 mx-8">
          <h1 className="text-2xl font-bold text-white mb-2">비자 서비스 <span className="text-base font-normal align-middle ml-2 text-white/80">Visa Services</span></h1>
          <p className="text-white">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다. 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</p>
        </section>
        <div className="flex gap-3 mb-8 px-8">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-6 py-2 rounded border text-base font-semibold transition
                ${pathname === tab.href ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:bg-gray-100"}
              `}
              style={{ minWidth: 140, textAlign: 'center' }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="bg-white px-8 pb-16">{children}</div>
      </div>
    </div>
  );
} 