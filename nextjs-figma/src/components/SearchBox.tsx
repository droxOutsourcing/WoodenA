"use client";
export default function SearchBox() {
  return (
    <div className="flex items-center bg-[#ededed] rounded-full px-4 py-2 w-60">
      <input
        type="text"
        placeholder="검색어를 입력하세요!"
        className="bg-transparent flex-1 outline-none border-none text-base placeholder-gray-400"
      />
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="ml-2 text-gray-500">
        <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
} 