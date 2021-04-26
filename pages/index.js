import Cards from '../components/Cards';
import Alert from '../components/Alert';
import alertStyles from '../styles/Alert.module.css';
import MediaQuery from 'react-responsive';
import SkeletonUI from '../components/SkeletonUI';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Home({ newsletters, alertContent, query }) {
  return (
    <div className="mt-40">
      <MediaQuery minWidth={1051}>
        {alertContent ? (
          <Alert alertContent={alertContent} />
        ) : (
          <Skeleton
            variant="rect"
            height={50}
            className={alertStyles['Alert--skeleteon']}
          />
        )}

        {newsletters ? (
          <Cards category={'랜덤모두보기'} newsletters={newsletters} />
          ) : (
          <SkeletonUI />
        )}
      </MediaQuery>
      <MediaQuery maxWidth={1050}>
        {newsletters ? (
          <SkeletonUI />
          ) : (
          <Cards category={'랜덤모두보기'} newsletters={newsletters} />
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
