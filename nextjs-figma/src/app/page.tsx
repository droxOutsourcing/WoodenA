"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-white w-full min-h-screen">
      {/* 비주얼 배너 */}
      <section className="w-full bg-[#E3F0FF] flex flex-col md:flex-row items-center justify-between px-4 md:px-0 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#2B3A55] font-bold text-lg md:text-2xl">대사관 접수 대행 인증 회사</span>
          <span className="text-[#6B2B90] font-bold text-2xl md:text-3xl">SUNWAY</span>
          <span className="text-[#2B3A55] text-base md:text-lg">Keep up with your dream</span>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="bg-[#6B2B90] rounded-xl px-8 py-6 text-white font-bold text-lg shadow-md">
            SUNWAY 유학원 홈페이지 바로가기
          </div>
        </div>
      </section>

      {/* 주요 서비스 바로가기 - 캐러셀 */}
      <section className="max-w-7xl mx-auto w-full py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-[#222]">주요 서비스 바로가기</h2>
        <Slider {...sliderSettings}>
          <div className="px-2">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition">
              <Image src="/service-embassy.png" alt="대사관 업무 대행" width={120} height={120} />
              <span className="mt-2 font-semibold">대사관 업무 대행</span>
            </div>
          </div>
          <div className="px-2">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition">
              <Image src="/service-translation.png" alt="번역·인증 서비스" width={120} height={120} />
              <span className="mt-2 font-semibold">번역·인증 서비스</span>
            </div>
          </div>
          <div className="px-2">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition">
              <Image src="/service-vietnam.png" alt="베트남 현지 서비스" width={120} height={120} />
              <span className="mt-2 font-semibold">베트남 현지 서비스</span>
            </div>
          </div>
          <div className="px-2">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition">
              <Image src="/service-visa.png" alt="비자 서비스" width={120} height={120} />
              <span className="mt-2 font-semibold">비자 서비스</span>
            </div>
          </div>
        </Slider>
      </section>

      {/* 공지사항 & 알림 */}
      <section className="max-w-7xl mx-auto w-full py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-[#222]">공지 사항 · 알림 <span className="text-sm font-normal text-gray-400 ml-2">Notice</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 공지 카드 예시 */}
          <div className="bg-[#F8FAFC] rounded-lg p-4 shadow-sm">
            연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.
          </div>
          <div className="bg-[#F8FAFC] rounded-lg p-4 shadow-sm">
            연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.
          </div>
          <div className="bg-[#F8FAFC] rounded-lg p-4 shadow-sm">
            연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.
          </div>
        </div>
      </section>

      {/* 가장 궁금해 하시는 질문 */}
      <section className="max-w-7xl mx-auto w-full py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-[#222]">가장 궁금해 하시는 질문</h2>
        <div className="bg-[#F3F6FB] rounded-xl p-6 mb-4">
          <ul className="list-disc pl-5 text-base text-[#222]">
            <li>연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.</li>
            <li>문의시 곧바로 메타무엇이 종로3 원활주관에 해결처리.</li>
            <li>가깝기에 바이거, 거야~ 타시라이유즈다, 가긴시도.</li>
            <li>조치아는 성에 보내주신다거나 자주찾으실 즐거움을.</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <Image src="/faq-1.png" alt="FAQ1" width={48} height={48} />
            <span>연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <Image src="/faq-2.png" alt="FAQ2" width={48} height={48} />
            <span>연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.</span>
          </div>
        </div>
      </section>

      {/* 안내 사항 */}
      <section className="max-w-7xl mx-auto w-full py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-[#222]">안내 사항</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <Image src="/notice-1.png" alt="안내1" width={48} height={48} />
            <span>연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
            <Image src="/notice-2.png" alt="안내2" width={48} height={48} />
            <span>연합엄마다 소재건가 대해주제바
d 담당담호린링 견단아.</span>
          </div>
        </div>
      </section>

      {/* 고객센터 안내 */}
      <section className="w-full bg-[#3B82F6] py-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-white">
          <div className="flex-1">
            <span className="font-bold text-2xl">자세한 상담을 원하시나요?</span>
            <div className="mt-2 text-lg">고객센터 02 734 7420</div>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <span className="text-base">문의 시간 :</span>
            <span className="text-base">평일 오전 9시 ~ 오후 6시</span>
            <span className="text-base">주말 오전 9시 ~ 오후 3시 (공휴일 휴무)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
