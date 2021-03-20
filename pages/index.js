import Cards from '../components/Cards';
import Alert from '../components/Alert';

export default function Home({ newsletters, query }) {
  return (
    <div>
      <Alert />
      <Cards category={'랜덤모두보기'} newsletters={newsletters} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();

  let m = newsletters.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = newsletters[m];
    newsletters[m] = newsletters[i];
    newsletters[i] = t;
  }
  return {
    props: {
      newsletters,
    },
  };
};
