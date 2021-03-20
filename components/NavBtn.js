import navBtnStyles from '../styles/NavBtn.module.css';
import { useState } from 'react';
import Modal from './Modal';

const NavBtn = ({ content, name }) => {
  const [showModal, setShowModal] = useState(false);

  return name === 'coffee' ? (
    <a>
      <span className={`${navBtnStyles.navBtn} ${navBtnStyles.btnDonSm}`}>
        {content}
      </span>
    </a>
  ) : (
    <>
      <a onClick={() => setShowModal(true)}>
        <span className={`${navBtnStyles.navBtn} ${navBtnStyles.btnSuggestSm}`}>
          {content}
        </span>
      </a>
      <Modal onClose={() => setShowModal(false)} show={showModal} />
    </>
  );
};

export default NavBtn;
