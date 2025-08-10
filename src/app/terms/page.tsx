export const metadata = {
  title: "이용약관",
  description: "JSON Formatter 이용약관",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">이용약관</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        본 서비스는 현 상태 그대로(AS-IS) 제공되며, 서비스 이용 중 발생할 수 있는 직접적 또는 간접적 손해에 대해
        법이 허용하는 범위 내에서 책임을 지지 않습니다.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>불법적인 용도로 사용 금지</li>
        <li>서비스 제공 및 콘텐츠는 예고 없이 변경될 수 있음</li>
        <li>제공되는 기능은 개인/업무용으로 자유롭게 사용 가능</li>
      </ul>
    </main>
  );
}


