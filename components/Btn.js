import Link from 'next/link';
import navBtnStyles from '../styles/NavBtn.module.css';

const Btn = ({ content }) => {
  return (
    <span className={`${navBtnStyles.bodyBtn} mt-16`} >
      {content}
    </span>
  );
};

export default Btn;
