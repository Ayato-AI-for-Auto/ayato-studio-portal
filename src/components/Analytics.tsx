"use client";

import Script from "next/script";

export default function Analytics() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
    const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;

    if (!GA_MEASUREMENT_ID && !ADS_ID) return null;

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics / Ads */}
            {(GA_MEASUREMENT_ID || ADS_ID) && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || ADS_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
              ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
            `}
                    </Script>
                </>
            )}
        </>
    );
}
