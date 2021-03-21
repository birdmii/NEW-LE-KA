import navBtnStyles from '../styles/NavBtn.module.css';
import { useState } from 'react';
import Modal from './Modal';

const NavBtn = ({ content, name }) => {
  const [showModal, setShowModal] = useState(false);

  return name === 'donation' ? (
    <button className={`${navBtnStyles.navBtn} ${navBtnStyles.btnDonSm}`}>
      {content}
    </button>
  ) : (
    <>
      <button
        className={`${navBtnStyles.navBtn} ${navBtnStyles.btnSuggestSm}`}
        onClick={() => setShowModal(true)}
      >
        {content}
      </button>
      <Modal onClose={() => setShowModal(false)} show={showModal} />
    </>
  );
};

export default NavBtn;
