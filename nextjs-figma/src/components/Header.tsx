import Image from "next/image";
import ServiceDropdown from "./ServiceDropdown";
import LangSelect from "./LangSelect";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-24 px-8">
        {/* 로고+텍스트+슬로건 */}
        <div className="flex items-center gap-4 min-w-[260px]">
          <Image src="/logo-color.svg" alt="SUNWAY" width={56} height={56} className="object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-3xl tracking-tight text-black">SUNWAY</span>
            <span className="text-xs text-[#888] font-medium -mt-1">Keep up with your dream</span>
          </div>
        </div>
        {/* 네비게이션 */}
        <nav className="flex gap-10 text-lg font-semibold items-center">
          <a href="/about" className="text-black hover:text-blue-600 transition">회사소개</a>
          <ServiceDropdown />
          <a href="/notice" className="text-black hover:text-blue-600 transition">뉴스·공지</a>
          <a href="/faq" className="text-black hover:text-blue-600 transition">FAQs</a>
          <a href="/contact" className="text-black hover:text-blue-600 transition">문의·상담</a>
        </nav>
        {/* 우측: 언어선택, 검색 */}
        <div className="flex items-center gap-4 min-w-[320px] justify-end">
          <LangSelect />
          <SearchBox />
        </div>
      </div>
    </header>
  );
} 