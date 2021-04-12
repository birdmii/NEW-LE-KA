import btnStyles from '../styles/Btn.module.css';
import Link from 'next/link';

const Btn = ({ content, name, link, onClick }) => {
  const btnClass = `${btnStyles.Btn} mt-16 ml-8`
  let btn;

  if (name === 'suggest') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles['Btn--md--default']}`}
      >
        {content}
      </button>
    );
  } else if (name === 'cancel') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles['Btn--cancel--md--default']}`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  } else if (name === 'footer') {
    btn = (
      <a href={link}>
        <button className={`${btnClass} ${btnStyles['Btn--md--default']} ml-0`}>
          {content}
        </button>
      </a>
    );
  } else if (name === 'suggest-disable') {
    btn = (
      <button
        className={`${btnClass} ${btnStyles['Btn--md--default']}`}
      >
        {content}
      </button>
    );
  } else if (name === 'suggest-link') {
    btn = (
      <a href={link} target="_blank">
        <button
          className={`${btnClass} ${btnStyles['Btn--md--default']}`}
        >
          {content}
        </button>
      </a>
    );
  } else if (name === 'go-back') {
    btn = (
      <Link href={link}>
        <button
          className={`${btnClass} ${btnStyles['Btn--md--default']}`}
        >
          {content}
        </button>
      </Link>
    );
  }
  return <>{btn}</>;
};

export default Btn;
