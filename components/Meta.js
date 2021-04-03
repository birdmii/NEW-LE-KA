import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="eKuO8qwY0TSHjwS20pJVPHsxlNEuUg3sJzginrPca9c" />
      <meta name="naver-site-verification" content="0eb9c28596583cafe3efb2ce1f0ecb972080f5a7" />
      <meta charSet="utf-8" />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'NEW・LE・KA | Find Your Newsletter',
  keywords: 'newsletter',
  description:
    '새로운 뉴스레터를 찾고 계신가요? NEW・LE・KA(뉴레카)에서 원하는 뉴스레터를 손쉽게 찾아보세요!',
};

export default Meta;
