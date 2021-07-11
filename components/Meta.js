import Head from "next/head";
import Link from "next/link";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <!-- Primary Meta Tags --> */}
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>

      <link
        rel="preload"
        href="/fonts/NotoSans-Regular.woff2"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/NotoSans-Medium.woff2"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/NotoSans-Bold.woff2"
        as="font"
        crossOrigin=""
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.newleka.xyz/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://www.newleka.xyz/metadata-img.png"
      />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.newleka.xyz/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content="https://www.newleka.xyz/metadata-img.png"
      ></meta>

      <meta
        name="google-site-verification"
        content="pdHrVJAlANrHtBrWZwh8UXmDEjHPkGkuhor1Fd_4DU0"
      />
      <meta
        name="naver-site-verification"
        content="0eb9c28596583cafe3efb2ce1f0ecb972080f5a7"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "NEW・LE・KA | 새로운 뉴스레터를 찾아보세요!",
  keywords: "newsletter,뉴스레터,뉴레카,newleka",
  description:
    "새로운 뉴스레터를 찾고 계신가요? NEW・LE・KA(뉴레카)에서 원하는 뉴스레터를 손쉽게 찾아보세요!",
};

export default Meta;
