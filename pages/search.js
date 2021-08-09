import Cards from '../components/Cards';
import qs from 'qs';
import { getSearchResult } from './api/newsletter';

const search = ({ newsletters }) => {

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

  const newsletters = await getSearchResult(query);

  return {
    props: {
      newsletters,
    },
  };
};

export default search;
