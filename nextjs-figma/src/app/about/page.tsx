"use client";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  { label: "회사 개요", value: "overview" },
  { label: "연혁·비전", value: "history" },
  { label: "조직도", value: "org" },
  { label: "Offices / 사무소 안내", value: "offices" },
];

export default function About() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-7xl py-10 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#2B3A55]">SUNWAY 회사소개</h1>
        <div className="w-full h-56 md:h-72 rounded-xl overflow-hidden mb-8">
          <Image src="/about-main.jpg" alt="회사소개" width={900} height={300} className="object-cover w-full h-full" />
        </div>
        {/* 탭 메뉴 */}
        <div className="flex gap-2 mb-6 border-b">
          {tabs.map((t) => (
            <button
              key={t.value}
              className={`px-4 py-2 font-semibold border-b-2 transition-all ${tab === t.value ? "border-[#2B3A55] text-[#2B3A55]" : "border-transparent text-gray-500"}`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* 탭 내용 */}
        <div className="bg-white rounded-xl shadow p-6">
          {tab === "overview" && (
            <div>
              <h2 className="font-bold text-lg mb-2">회사 개요</h2>
              <p className="text-gray-700 mb-4">계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 아무런 걱정도 없이 가을 속의 별들을 다 헤일 듯합니다. 많은 밤을 새워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.</p>
              <p className="text-gray-700">나는 무언지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써보고 흙으로 덮어 버리었습니다. 계절이 지나가는 하늘에는 가을로 가득 차 있습니다.</p>
            </div>
          )}
          {tab === "history" && (
            <div>
              <h2 className="font-bold text-lg mb-2">연혁·비전</h2>
              <p className="text-gray-700 mb-4">연혁 및 비전 내용이 들어갑니다. (예시 텍스트)</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>2010년 설립</li>
                <li>2015년 베트남 현지 법인 설립</li>
                <li>2020년 서비스 확장</li>
                <li>비전: 글로벌 인증/번역/유학 서비스 리더</li>
              </ul>
            </div>
          )}
          {tab === "org" && (
            <div>
              <h2 className="font-bold text-lg mb-2">조직도</h2>
              <Image src="/org-chart.png" alt="조직도" width={600} height={200} className="my-4 mx-auto" />
              <p className="text-gray-700">조직도 설명이 들어갑니다.</p>
            </div>
          )}
          {tab === "offices" && (
            <div>
              <h2 className="font-bold text-lg mb-2">Offices / 사무소 안내</h2>
              <div className="mb-4">
                <h3 className="font-semibold">한국 사무소</h3>
                <p className="text-gray-700">서울특별시 종로구 종로 19, B동 1215호 (종로1가, 르메이에르 종로타운)</p>
              </div>
              <div>
                <h3 className="font-semibold">베트남 사무소</h3>
                <p className="text-gray-700">베트남 하노이시 등 현지 사무소 안내</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 