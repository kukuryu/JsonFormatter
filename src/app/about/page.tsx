export const metadata = {
  title: "소개",
  description: "JSON Formatter 서비스 소개",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">소개</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        JSON Formatter는 브라우저에서 동작하는 무료 JSON 유틸리티로, 데이터를 서버로 전송하지 않고
        로컬에서 안전하게 포맷팅/검증/미니파이할 수 있도록 돕습니다.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>클라이언트 사이드 처리로 개인정보 보호</li>
        <li>들여쓰기 선택, 키 정렬, 미니파이 지원</li>
        <li>업로드/다운로드, 복사 기능 제공</li>
      </ul>
    </main>
  );
}


