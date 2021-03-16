import searchStyles from '../styles/Search.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import searchLine from '@iconify/icons-clarity/search-line';


const Search = ({query, handleQuery, handleSubmit}) => {

  return (
    <div className={searchStyles.searchBar}>
      <Icon icon={searchLine} style={{ fontSize: '16px' }} />

      <form onSubmit={handleSubmit} id="searchForm">
        <input
          type="text"
          name="search"
          value={query}
          id="searchBox"
          className={searchStyles.input}
          placeholder="관심있는 주제를 검색해보세요. (예: 음악, 스타트업, 마케팅 등)"
          onChange={handleQuery}
          // onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Search;
