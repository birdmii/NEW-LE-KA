import Cards from '../components/Cards';
import Alert from '../components/Alert';
import MediaQuery from 'react-responsive';

export default function Home({ newsletters, query }) {

  return (
    <div className="mt-40">
      <MediaQuery minWidth={1051}>
        <Alert />
        <Cards category={'랜덤모두보기'} newsletters={newsletters} />
      </MediaQuery>
      <MediaQuery maxWidth={1050}>
        <Cards category={'랜덤모두보기'} newsletters={newsletters} />
      </MediaQuery>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();

  let m = newsletters.length;
  let t;
  let i;
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
    revalidate: 1,
  };
};
