import Script from "next/script";

export default function AdsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script
        id="adsense-auto"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9152326797358801"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}



