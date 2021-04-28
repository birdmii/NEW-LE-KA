import Cards from '../components/Cards';
import Alert from '../components/Alert';
import MediaQuery from 'react-responsive';
import SkeletonGrid from '../components/SkeletonGrid';
import SkeletonAlert from '../components/SkeletonAlert';

export default function Home({ newsletters, alertContent }) {
  return (
    <div className="mt-40">
      <MediaQuery minWidth={1051}>
        {alertContent ? (
          <Alert alertContent={alertContent} />
        ) : (
          <SkeletonAlert />
        )}

        {newsletters ? (
          <Cards category={'랜덤모두보기'} newsletters={newsletters} />
        ) : (
          <SkeletonGrid />
        )}
      </MediaQuery>
      <MediaQuery maxWidth={1050}>
        {newsletters ? (
          <Cards category={'랜덤모두보기'} newsletters={newsletters} />
        ) : (
          <SkeletonGrid />
        )}
      </MediaQuery>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://newleka.herokuapp.com/newsletters?_limit=-1`,
  );
  const newsletters = await res.json();

  const resAlert = await fetch(`https://newleka.herokuapp.com/alerts/1`);
  const alertContent = await resAlert.json();

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
      alertContent,
    },
  };
};
