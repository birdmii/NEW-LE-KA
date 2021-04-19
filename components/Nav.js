import navStyles from '../styles/Nav.module.css';
import Image from 'next/image';
import Search from './Search';
import NavBtn from './NavBtn';
import { Icon } from '@iconify/react';
import barsLine from '@iconify/icons-clarity/bars-line';
import searchLine from '@iconify/icons-clarity/search-line';
import MediaQuery from 'react-responsive';

const Nav = ({ query, handleQuery, handleSubmit, handleShowSideNav, handleShowSearchBar, isSearchShow }) => {

  const desktopNav = (
    <>
      <div className={navStyles['Nav__logo']}>
        <a href="https://www.newleka.xyz/">
          <Image
            src="/logo.png"
            alt="NEW・LE・KA Logo"
            width={127}
            height={32}
            layout="fixed"
            priority="true"
          />
        </a>
      </div>
      <Search
        query={query}
        handleQuery={handleQuery}
        handleSubmit={handleSubmit}
      />
      <div className={`flex-vertical-center ${navStyles['Nav__btnContainer']}`}>
        <NavBtn
          content="커피한잔"
          name="donation"
          link="https://donaricano.com/mypage/1679663183_mMG77l"
        />
        <NavBtn content="제안하기" name="suggest" />
      </div>
    </>
  );

  const mobileNav = (
    <>
      <Icon
        icon={barsLine}
        style={{ fontSize: '24px' }}
        onClick={handleShowSideNav}
      />
      <div className={navStyles['Nav__logo--mobile']}>
        <a href="https://www.newleka.xyz/">
          <Image
            src="/logo.png"
            alt="NEW・LE・KA Logo"
            width={127}
            height={32}
            layout="fixed"
          />
        </a>
      </div>
      <Icon icon={searchLine} style={{ fontSize: '24px' }} onClick={handleShowSearchBar}/>
      <Search
        query={query}
        handleQuery={handleQuery}
        handleSubmit={handleSubmit}
        handleShowSearchBar={handleShowSearchBar}
        isSearchShow={isSearchShow}
      />
    </>
  );

  return (
    <nav className={`${navStyles.Nav} shadow-2`}>
      <div className={`container flex-vertical-center`}>
        <MediaQuery minWidth={1051}>{desktopNav}</MediaQuery> 
        <MediaQuery maxWidth={1050}>{mobileNav}</MediaQuery> 
      </div>
    </nav>
  );
};

export default Nav;
