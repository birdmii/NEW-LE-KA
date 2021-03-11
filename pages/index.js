import Head from 'next/head';
import Cards from '../components/Cards'

export default function Home({ newsletters }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cards newsletters={newsletters}/>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();
  console.log(newsletters);
  return {
    props: {
      newsletters,
    },
  };
};
