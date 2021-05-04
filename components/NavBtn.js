import navBtnStyles from '../styles/NavBtn.module.css';
import { useState } from 'react';
import Modal from './Modal';

const NavBtn = ({ content, name, link }) => {
  const [showModal, setShowModal] = useState(false);
  return name === 'donation' ? (
    <a href={link} target="_blank" rel="noopener">
      <button className={`${navBtnStyles.NavBtn} ${navBtnStyles['NavBtn--donation--sm']}`}>
        {content}
      </button>
    </a>
  ) : (
    <>
      <button
        className={`${navBtnStyles.NavBtn} ${navBtnStyles['NavBtn--suggest--sm']}`}
        onClick={() => setShowModal(true)}
      >
        {content}
      </button>
      <Modal onClose={() => setShowModal(false)} show={showModal} />
    </>
  );
};

export default NavBtn;
