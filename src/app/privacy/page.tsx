export const metadata = {
  title: "개인정보처리방침",
  description: "JSON Formatter 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">개인정보처리방침</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        본 서비스는 사용자가 입력한 JSON 데이터를 서버로 전송하거나 저장하지 않습니다. 모든 처리는 사용자의
        브라우저(클라이언트) 내에서만 이루어집니다.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">수집하는 개인정보 항목</h2>
      <p className="mb-2">본 서비스는 별도의 개인정보를 수집하지 않습니다.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">쿠키 및 광고</h2>
      <p className="mb-2">
        본 서비스는 Google AdSense 등 제3자 광고 네트워크를 사용할 수 있습니다. 광고 파트너는 쿠키를 활용하여
        사용자의 관심사에 기반한 맞춤형 광고를 제공할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키를 차단하거나
        삭제할 수 있습니다.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">문의</h2>
      <p>개인정보 보호 관련 문의는 문의 페이지를 이용해 주세요.</p>
    </main>
  );
}


