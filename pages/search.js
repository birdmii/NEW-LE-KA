import Cards from '../components/Cards';
import qs from 'qs';

const search = ({ newsletters }) => {
  // const filterQuery = router.query.filter;

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

export const getServerSideProps = async (context) => {
  const searchQuery = `${context.query.q}`;
  const query = qs.stringify({
    _where: {
      _or: [
        { title_contains: searchQuery },
        { description_contains: searchQuery },
        { tag_contains: searchQuery },
      ],
    },
  });

  const res = await fetch(
    `https://newleka.herokuapp.com/newsletters?${query}`,
  );
  const newsletters = await res.json();

  return {
    props: {
      newsletters,
    },
  };
};

export default search;
