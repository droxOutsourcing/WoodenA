"use client";
export default function TranslationService() {
  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <section className="bg-[#1976D2] rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">번역·인증 서비스 <span className="text-base font-normal align-middle ml-2 text-white/80">Translation & Notarization</span></h1>
        <p className="text-white">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다. 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</p>
      </section>
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 border rounded bg-white text-[#222] font-semibold">번역문·번역자 확인서</button>
        <button className="px-4 py-2 border rounded bg-white text-[#222] font-semibold">공증·사실확인서</button>
        <button className="px-4 py-2 border rounded border-[#1976D2] text-[#1976D2] font-semibold">기타 인증서</button>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">기타 인증서</h2>
        <p className="mb-6 text-gray-700">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다. 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</p>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#E53935] mb-2">구비서류</h3>
          <div className="bg-gray-100 rounded p-4 mb-2">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">안내사항</h3>
          <div className="bg-gray-100 rounded p-4 mb-2">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">비용</h3>
          <div className="bg-gray-100 rounded p-4 mb-2">소녀가 가입히 보조개를 떠올리며, 그래 이게 무슨 물 같나. 소년은 스웨터 앞자락만 바라다보고 있었다.</div>
        </div>
      </section>
      <section className="w-full bg-[#1976D2] py-8 mt-8 rounded-xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-white">
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