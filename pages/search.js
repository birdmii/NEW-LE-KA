import { useRouter } from 'next/router';
import Cards from '../components/Cards';
import SkeletonGrid from '../components/SkeletonGrid';

const search = ({ newsletters }) => {
  const router = useRouter();
  const searchQuery = router.query.q;
  // const filterQuery = router.query.filter;

  if (searchQuery !== undefined) {
    newsletters = newsletters.filter((item) => {
      const tags = item.tag.tag;
      let isQueryIncluded = false;
      if (
        item.title.includes(searchQuery) ||
        item.description.includes(searchQuery)
      ) {
        isQueryIncluded = true;
      }
      tags.forEach((tag) => {
        if (tag.includes(searchQuery)) {
          isQueryIncluded = true;
        }
      });

      if (isQueryIncluded) {
        return item;
      }
    });
  }

  // if(filterQuery !== undefined) {
  //   let filterQuaryArr = filterQuery.split('|');
  //   newsletters = newsletters.filter((item) => {
  //     let isFiltered = false;
  //     filterQuaryArr.forEach((filter) => {
  //       if (item.sendingTerm === filter) {
  //         isFiltered = true;
  //       }
  //     });

  //     if (isFiltered) {
  //       return item;
  //     }
  //   });
  // }

  return (
    <div>
      {newsletters ? (
        <Cards category={'검색 결과'} newsletters={newsletters} />
      ) : (
        <SkeletonGrid />
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://newleka.herokuapp.com/newsletters?_limit=-1`,
  );
  const newsletters = await res.json();

  return {
    props: {
      newsletters,
    },
    revalidate: 1,
  };
};

export default search;
