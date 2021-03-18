import { useState } from 'react';
import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';
import NavBtn from './NavBtn';

const Nav = ({ query, handleQuery, handleSubmit }) => {
  return (
    <nav className={`${navStyles.nav}`}>
      <div className="container flexVertical navContainer">
        <Link href="/">
          <a>
            <Image
              src="/logo.png"
              alt="NEW・LE・KA Logo"
              width={127}
              height={32}
              layout="fixed"
            />
          </a>
        </Link>
        <Search
          query={query}
          handleQuery={handleQuery}
          handleSubmit={handleSubmit}
        />
        <div className="flexCenter ml-10">
          <NavBtn content="커피한잔" name="coffee" />
          <NavBtn content="제보하기" name="suggest" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
