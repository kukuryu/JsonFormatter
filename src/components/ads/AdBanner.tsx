"use client";

import { useEffect, useRef } from "react";

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
  const insRef = useRef<HTMLDivElement>(null);
  const hasClient = typeof window !== "undefined";
  const isProd = hasClient && process.env.NODE_ENV === "production";
  const testMode = hasClient && process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === "true";
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9152326797358801";
  const shouldRender = (isProd || testMode) && !!adsClient && !!dataAdSlot && !!canShow;

  useEffect(() => {
    if (!hasClient) return;
    if (!shouldRender) return;
    // Ensure AdSense script exists (for manual unit rendering)
    const SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`;
    const present = Array.from(document.getElementsByTagName("script")).some(
      (s) => s.getAttribute("src") === SRC
    );
    if (!present) {
      const s = document.createElement("script");
      s.async = true;
      s.src = SRC;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
      s.onload = () => {
        // @ts-expect-error AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };
      return;
    }
    // @ts-expect-error AdSense global
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [hasClient, shouldRender, adsClient]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={className} ref={insRef}>
      <ins
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


