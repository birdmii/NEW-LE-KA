import searchStyles from '../styles/Search.module.css';
import Image from 'next/image';

const Search = () => {
  return (
    <div className={searchStyles.searchBar}>
      <Image src="/i_search.png" height={16} width={16} />
      <input
        type="text"
        className={searchStyles.input}
        placeholder="관심있는 주제를 검색해보세요. (예: 음악, 와인, 커피 등)"
      />
    </div>
  );
};

export default Search;
