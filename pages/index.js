import Head from 'next/head';
import Cards from '../components/Cards'

export default function Home({ newsletters }) {
  return (
    <div>
      <Head>
        <title>NEW・LE・KA | Find new newsletters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cards category={'모두보기'} newsletters={newsletters}/>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();
  return {
    props: {
      newsletters,
    },
  };
};
