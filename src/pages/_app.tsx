import "../../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@/styles/globals.css";
import "@/styles/index.scss";
import { AppProps } from "next/app";
import { WordPressBlocksProvider, fromThemeJson } from "@faustwp/blocks";
import blocks from "@/wp-blocks";
import { Poppins } from "next/font/google";
import SiteWrapperProvider from "@/container/SiteWrapperProvider";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import themeJson from "../../theme.json";
import Head from "next/head";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  return (
    <>
      <Head>
      <link
rel="stylesheet"
href="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/css/frontend.min.css"
/>
         <link
rel="stylesheet"
        href="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/css/frontend-rtl.min.css"
/>
         <link
rel="stylesheet"
        href="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/css/frontend-rtl.css"
/>
         <link
rel="stylesheet"
        href="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/css/frontend.css"
/>
<script
src="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/js/frontend.min.js"
defer
></script>  
        <script
  src="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/js/frontend-modules.min.js"
defer
></script>
        <script
  src="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/js/frontend-modules.js"
defer
></script>
        <script
  src="https://worldnomad.iprofiit.pro/wp-content/plugins/elementor/assets/js/frontend-modules.js"
defer
></script>  
      </Head>

      

      <FaustProvider pageProps={pageProps}>
        <WordPressBlocksProvider
          config={{
            blocks,
            theme: themeJson,
          }}
        >
          <SiteWrapperProvider {...pageProps}>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
            <NextNProgress color="#818cf8" />
            <Component {...pageProps} key={router.asPath} />
            <Toaster
              position="bottom-left"
              toastOptions={{
                style: {
                  fontSize: "14px",
                  borderRadius: "0.75rem",
                },
              }}
              containerClassName="text-sm"
            />
          </SiteWrapperProvider>
        </WordPressBlocksProvider>
      </FaustProvider>
    </>
  );
}
