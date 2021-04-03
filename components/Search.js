import searchStyles from '../styles/Search.module.css';
import { Icon } from '@iconify/react';
import searchLine from '@iconify/icons-clarity/search-line';
import closeLine from '@iconify/icons-clarity/close-line';
import MediaQuery from 'react-responsive';

const Search = ({
  query,
  handleQuery,
  handleSubmit,
  handleShowSearchBar,
  isSearchShow,
}) => {
  let desktopSearch = (
    <div className={`${searchStyles.searchBar}`}>
      <Icon icon={searchLine} style={{ fontSize: '16px' }} />

      <form
        onSubmit={handleSubmit}
        id="searchForm"
        className={searchStyles.form}
      >
        <input
          type="text"
          name="search"
          value={query}
          id="searchBox"
          className={`${searchStyles.input} pl-20`}
          placeholder="관심있는 주제를 검색해보세요. (예: 음악, 스타트업, 마케팅 등)"
          onChange={handleQuery}
        />
      </form>
    </div>
  );

  let mobileSearch = isSearchShow ? (
    <div className={searchStyles.background}>
      <div className={searchStyles.mobileSearchBar}>
        <div className={`${searchStyles.mobileSearch}`}>
          <Icon
            icon={searchLine}
            style={{ fontSize: '16px' }}
            className="ml-8"
          />

          <form
            onSubmit={handleSubmit}
            id="searchForm"
            className={searchStyles.mobileForm}
          >
            <input
              type="text"
              name="search"
              value={query}
              id="searchBox"
              className={`${searchStyles.mobileInput} body-text1 pl-20`}
              placeholder="관심있는 주제를 검색해보세요. (예: 책, 마케팅 등)"
              onChange={handleQuery}
            />
          </form>
        </div>
        <Icon
          icon={closeLine}
          style={{ color: '#000', fontSize: '32px' }}
          className="ml-8"
          onClick={handleShowSearchBar}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <MediaQuery minWidth={1051}>{desktopSearch}</MediaQuery>
      <MediaQuery maxWidth={1050}>{mobileSearch}</MediaQuery>
    </>
  );

  // return
};

export default Search;
