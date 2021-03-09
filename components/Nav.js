import navStyles from '../styles/Nav.module.css';
import Image from 'next/image';
import Search from './Search';
import NavBtn from './NavBtn';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <Image src="/logo.png" alt="NEW・LE・KA Logo" width={127} height={32} layout="fixed" className={navStyles.logo}/>
      <Search />
      <NavBtn content="커피한잔" name="coffee" />
      <NavBtn content="제보하기" name="report" />
    </nav>
  );
};

export default Nav;
