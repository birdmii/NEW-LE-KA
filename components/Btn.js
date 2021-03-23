import btnStyles from '../styles/Btn.module.css';
import Link from 'next/link';

const Btn = ({ content, name, link, onClick }) => {
  let btn;
  let btnClass = `${btnStyles.btn} mt-16 ml-8`

  if (name === 'suggest') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles.btnMdDefault}`}
      >
        {content}
      </button>
    );
  } else if (name === 'cancel') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles.btnCancelMdDefault}`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  } else if (name === 'footer') {
    btn = (
      <a href={link}>
        <button className={`${btnClass} ${btnStyles.btnMdDefault} ml-0`}>
          {content}
        </button>
      </a>
    );
  } else if (name === 'suggest-disable') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles.btnMdDisable}`}
      >
        {content}
      </button>
    );
  } else if (name === 'suggest-link') {
    btn = (
      <a href={link} target="_blank">
        <button
          className={`${btnClass} ${btnStyles.btnMdDefault}`}
        >
          {content}
        </button>
      </a>
    );
  } else if (name === 'go-back') {
    btn = (
      <Link href={link}>
        <button
          className={`${btnClass} ${btnStyles.btnMdDefault}`}
        >
          {content}
        </button>
      </Link>
    );
  }
  return <>{btn}</>;
};

export default Btn;
