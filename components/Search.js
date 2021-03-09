import searchStyles from '../styles/Search.module.css';

const Search = () => {
  return (
    <>
      <input
        type="text"
        className={searchStyles.input}
        placeholder="관심있는 주제를 검색해보세요. (예: 음악, 와인, 커피 등)"
      />
    </>
  );
};

export default Search;
