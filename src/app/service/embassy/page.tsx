import Link from "next/link";

const tabs = [
  { label: "여권 갱신", href: "/service/embassy/passport-renewal" },
  { label: "혼인관계인증서", href: "/service/embassy/marriage-certificate" },
  { label: "아기 출생증명서·여권", href: "/service/embassy/birth-certificate" },
  { label: "이중국적", href: "/service/embassy/dual-citizenship" },
  { label: "각종 위임장", href: "/service/embassy/power-of-attorney" },
  { label: "영사 확인", href: "/service/embassy/consular-confirmation" },
  { label: "운전면허증 인증", href: "/service/embassy/driver-license" },
  { label: "국적 포기 신청·확인서 발급", href: "/service/embassy/renunciation" },
];

export default function EmbassyServicePage() {
  return (
    <div className="p-8">
      <div className="bg-red-600 text-white p-6 rounded mb-6">
        <h1 className="text-2xl font-bold mb-2">대사관 업무 대행 <span className="text-base font-normal">Embassy Services</span></h1>
        <p>소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다. 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <Link key={tab.href} href={tab.href} className="px-4 py-2 border rounded font-semibold hover:bg-gray-100">
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="border rounded p-8 bg-gray-50 text-center text-gray-400">
        탭을 선택하면 상세 페이지로 이동합니다.
      </div>
    </div>
  );
} 