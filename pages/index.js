import MediaQuery from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Alert from '../components/Alert';
import SkeletonCard from '../components/SkeletonCard';
import cardsStyles from '../styles/Cards.module.css';

export default function Home({ newsletters, newslettersCnt, alertContent }) {
  const [newsletterList, setNewsletterList] = useState(newsletters);
  const [hasMore, setHasMore] = useState(true);

  const loadingSkltnComponent = (
    <div className={cardsStyles['Cards--grid']}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );

  const getMoreNewsletters = async () => {
    const res = await fetch(
      `https://newleka.herokuapp.com/newsletters?_start=${newsletterList.length}&_limit=18`,
    );
    const newNewsletterList = await res.json();

    let m = newNewsletterList.length;
    let t;
    let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = newNewsletterList[m];
      newNewsletterList[m] = newNewsletterList[i];
      newNewsletterList[i] = t;
    }

    setNewsletterList((newsletterList) => [
      ...newsletterList,
      ...newNewsletterList,
    ]);
  };

  useEffect(() => {
    setHasMore(newslettersCnt > newsletterList.length ? true : false);
  }, [newsletterList]);

  const inifiniteScrollComponent = (
    <InfiniteScroll
      dataLength={newsletterList.length}
      next={getMoreNewsletters}
      hasMore={hasMore}
      loader={loadingSkltnComponent}
    >
      <Cards category={'랜덤모두보기'} newsletters={newsletterList} />
    </InfiniteScroll>
  );

  return (
    <div>
      <MediaQuery minWidth={1051}>
        <div className="mt-40">
          <Alert alertContent={alertContent} />
          {inifiniteScrollComponent}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1050}>
        <div>{inifiniteScrollComponent}</div>
      </MediaQuery>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://newleka.herokuapp.com/newsletters?_limit=18`,
  );
  const newsletters = await res.json();

  const resAlert = await fetch(`https://newleka.herokuapp.com/alerts/1`);
  const alertContent = await resAlert.json();

  const resNewslettersCnt = await fetch(
    `https://newleka.herokuapp.com/newsletters/count`,
  );
  const newslettersCnt = await resNewslettersCnt.json();

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
      newslettersCnt: +newslettersCnt,
      alertContent,
    },
  };
};
