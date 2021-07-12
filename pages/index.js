import MediaQuery from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Alert from "../components/Alert";
import SkeletonCard from "../components/SkeletonCard";
import cardsStyles from "../styles/Cards.module.css";
import { getAlert, getAllData, getCnt } from "./api/newsletter";

export default function Home({ newsletters, newslettersCnt, alertContent }) {
  const [newsletterList, setNewsletterList] = useState(newsletters.slice(0, 18));
  const [hasMore, setHasMore] = useState(true);

  const loadingSkltnComponent = (
    <div className={cardsStyles["Cards--grid"]}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );

  const getMoreNewsletters = async () => {
    const newNewsletterList = newsletters.slice(newsletterList.length, newsletterList.length + 18);

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
      <Cards category={"랜덤모두보기"} newsletters={newsletterList} />
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

export const getStaticProps = async () => {
  const newsletters = await getAllData();
  const alertContent = await getAlert();

  let m = newsletters.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = newsletters[m];
    newsletters[m] = newsletters[i];
    newsletters[i] = t;
  };

  const newslettersCnt = await getCnt();

  return {
    props: {
      newsletters,
      newslettersCnt: +newslettersCnt,
      alertContent,
    },
    revalidate: 10,
  };
};
