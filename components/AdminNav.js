import navStyles from "../styles/Nav.module.css";
// import Image from 'next/image';
import barsLine from "@iconify/icons-clarity/bars-line";
import MediaQuery from "react-responsive";

const Nav = () => {
  const desktopNav = (
    <>
      <div className={navStyles["Nav__logo"]}>
        <a href="https://www.newleka.xyz/">
          {/* <Image
            src="/logo.png"
            alt="NEW・LE・KA Logo"
            width={127}
            height={32}
            layout="fixed"
            priority="true"
          /> */}
          <img src="/logo.png" alt="NEW・LE・KA Logo" width={127} height={32} />
        </a>
        <div className={navStyles["Nav__logout"]}>Logout</div>
      </div>
    </>
  );

  const mobileNav = (
    <>
      <div className={navStyles["Nav__logo--mobile"]}>
        <a href="https://www.newleka.xyz/">
          {/* <Image
            src="/logo.png"
            alt="NEW・LE・KA Logo"
            width={127}
            height={32}
            layout="fixed"
          /> */}
          <img src="/logo.png" alt="NEW・LE・KA Logo" width={127} height={32} />
        </a>
      </div>
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
