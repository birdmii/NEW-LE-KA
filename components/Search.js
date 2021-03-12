import searchStyles from '../styles/Search.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import searchLine from '@iconify/icons-clarity/search-line';

const Search = () => {
  return (
    <div className={searchStyles.searchBar}>
      <Icon icon={searchLine} style={{fontSize: '16px'}} />

      <input
        type="text"
        className={`bodyText1 ${searchStyles.input}`}
        placeholder="관심있는 주제를 검색해보세요. (예: 음악, 와인, 커피 등)"
      />
    </div>
  );
};

export default Search;
