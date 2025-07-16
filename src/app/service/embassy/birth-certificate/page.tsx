export default function BirthCertificatePage() {
  return (
    <div className="p-8">
      <div className="bg-red-600 text-white p-6 rounded mb-6">
        <h1 className="text-2xl font-bold mb-2">아기 출생증명서·여권</h1>
        <p>병원의 출생증명서, 부모의 여권 원본, 부의 베트남 신분증 사본, 아기의 사진 2장, 아기 이름</p>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold text-red-600 mb-2">구비서류</h2>
        <ul className="bg-gray-50 p-4 rounded mb-4">
          <li>병원의 출생증명서 1부</li>
          <li>부모의 여권 원본</li>
          <li>부의 베트남 신분증 사본 1부</li>
          <li>아기의 사진 2장</li>
          <li>아기 이름</li>
        </ul>
        <h2 className="text-lg font-bold mb-2">안내사항</h2>
        <div className="bg-gray-50 p-4 rounded mb-4">한국에서 혼인 또는 이혼 신고후 대사관에서 발급하는 서류 선 베트남 혼인신고 결혼서류 작성</div>
        <h2 className="text-lg font-bold mb-2">비용</h2>
        <div className="bg-gray-50 p-4 rounded mb-4">
          결혼확인서: 60만원<br />
          이혼확인서: 70만원
        </div>
      </div>
      <div className="bg-blue-700 text-white p-8 rounded text-center mt-8">
        <div className="text-xl font-bold mb-2">자세한 상담을 원하시나요?</div>
        <div className="text-lg mb-2">고객센터 02 734 7420</div>
        <div className="text-base">문의 시간 : 평일 오전 9시 ~ 오후 6시<br />주말 오전 9시 ~ 오후 3시 (공휴일 휴무)</div>
      </div>
    </div>
  );
} 