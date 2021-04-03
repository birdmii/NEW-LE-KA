import { useRouter } from 'next/router';
import Cards from '../components/Cards';

const search = ({ newsletters }) => {
  const router = useRouter();
  const searchQuery = router.query.q;
  // const filterQuery = router.query.filter;

  if (searchQuery !== undefined) {
    newsletters = newsletters.filter((item) => {
      let isQueryIncluded = false;
      if (
        item.title.includes(searchQuery) ||
        item.description.includes(searchQuery)
      ) {
        isQueryIncluded = true;
      }
      item.tag.forEach((tag) => {
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
      <Cards category={'검색 결과'} newsletters={newsletters} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
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
