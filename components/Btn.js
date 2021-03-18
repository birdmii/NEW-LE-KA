import Link from 'next/link';
import btnStyles from '../styles/Btn.module.css';

const Btn = ({ content, name }) => {
  return (
    <>
      {name === 'suggest' ? (
        <Link href="/suggest">
          <a>
          <span
            className={`${btnStyles.suggest} ${btnStyles.bodyBtn} mt-16 ml-8`}
          >
            {content}
          </span>
          </a>
        </Link>
      ) : (
        <Link href="/">
          <a>
          <span
            className={`${btnStyles.cancel} ${btnStyles.bodyBtn} mt-16 ml-8`}
          >
            {content}
          </span>
          </a>
        </Link>
      )}
    </>
  );
};

export default Btn;