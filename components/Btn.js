import btnStyles from '../styles/Btn.module.css';

const Btn = ({ content, name, link, onClick }) => {
  let btn;

  console.log(link);
  if (name === 'suggest') {
    btn = (
      <a>
        <span
          className={`${btnStyles.btnMdDefault} ${btnStyles.btn} mt-16 ml-8`}
        >
          {content}
        </span>
      </a>
    );
  } else if (name === 'cancel') {
    btn = (
      <a onClick={onClick}>
        <span
          className={`${btnStyles.btnCancelMdDefault} ${btnStyles.btn} mt-16 ml-8`}
        >
          {content}
        </span>
      </a>
    );
  } else if (name === 'footer') {
    btn = (
      <a href={link}>
        <span className={`${btnStyles.btnMdDefault} ${btnStyles.btn} mt-16`}>
          {content}
        </span>
      </a>
    );
  } else if (name === 'suggest-disable') {
    btn = (
      <a>
        <span
          className={`${btnStyles.btn} ${btnStyles.btnMdDisable} ml-8 mt-16`}
        >
          {content}
        </span>
      </a>
    );
  } else if(name === 'suggest-link') {
    btn = (
      <a href={link} target="_blank">
        <span
          className={`${btnStyles.btnMdDefault} ${btnStyles.btn} mt-16 ml-8`}
        >
          {content}
        </span>
      </a>
    );
  }
  return <>{btn}</>;
};

export default Btn;
