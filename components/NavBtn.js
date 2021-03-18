import navBtnStyles from '../styles/NavBtn.module.css';
import Link from 'next/link';

const NavBtn = ({ content, name }) => {
  return name === 'coffee' ? (
    <a>
      <span className={`${navBtnStyles.navBtn} ${navBtnStyles.coffee}`}>
        {content}
      </span>
    </a>
  ) : (
    <Link href={`/${name}`}>
      <a>
        <span className={`${navBtnStyles.navBtn} ${navBtnStyles.suggest}`}>
          {content}
        </span>
      </a>
    </Link>
  );
};

export default NavBtn;
