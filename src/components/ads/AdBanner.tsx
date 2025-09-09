"use client";

import { useEffect, useRef } from "react";

// AdSense global 타입 선언
declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
  // Additional policy gate: when false, ads will not render regardless of env
  canShow?: boolean;
};

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  className,
  canShow = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLElement>(null);
  const hasClient = typeof window !== "undefined";
  const isProd = hasClient && process.env.NODE_ENV === "production";
  const testMode = hasClient && process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === "true";
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9152326797358801";
  const shouldRender = (isProd || testMode) && !!adsClient && !!dataAdSlot && !!canShow;

  useEffect(() => {
    if (!hasClient || !shouldRender || !adRef.current) return;
    
    try {
      // 애드센스 스크립트는 이미 layout.tsx에서 로드되므로 바로 광고 초기화
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense 초기화 오류:', error);
    }
  }, [hasClient, shouldRender, dataAdSlot]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsClient}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
        {...(testMode ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
}


