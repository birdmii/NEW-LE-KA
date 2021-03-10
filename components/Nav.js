import navStyles from '../styles/Nav.module.css';
import Image from 'next/image';
import Search from './Search';
import NavBtn from './NavBtn';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <div className="container flexCenter">
        <Image
          src="/logo.png"
          alt="NEW・LE・KA Logo"
          width={127}
          height={32}
          layout="fixed"
        />
        <Search />
        <div className='flexCenter ml-10'>
          <NavBtn content="커피한잔" name="coffee" />
          <NavBtn content="제보하기" name="report" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
