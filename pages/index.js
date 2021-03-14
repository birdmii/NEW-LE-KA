import Cards from '../components/Cards'

export default function Home({ newsletters }) {
  return (
    <div>
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
