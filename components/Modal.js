import modalStyles from '../styles/Modal.module.css';
import Image from 'next/image';
import Btn from './Btn';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClickedA, setIsClickedA] = useState(false);
  const [isClickedB, setIsClickedB] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    const cardId = e.target.id;
    if (cardId === 'suggestNewleka' && !isClickedB) {
      setIsClickedA(true);
    } else if (cardId === 'suggestNewsletter' && !isClickedA) {
      setIsClickedB(true);
    } else if (cardId === 'suggestNewleka') {
      let setClicked = !isClickedA;
      setIsClickedA(setClicked);
      setIsClickedB(!setClicked);
    } else if (cardId === 'suggestNewsletter') {
      let setClicked = !isClickedB;
      setIsClickedA(!setClicked);
      setIsClickedB(setClicked);
    }
  };

  const modalContent = show ? (
    <div className={`${modalStyles['Modal--background']} flex-center`}>
      <div className={modalStyles.Modal}>
        <div className={modalStyles['Modal__textContainer']}>
          <h3>제안하기</h3>
          <p className={`${modalStyles['textContainer__suggestion']} body-text2 mt-16`}>
            제안해주셔서 감사합니다! <br />
            여러분의 소중한 피드백 하나하나가 더 나은 뉴레카를 만들어 갑니다!
          </p>
        </div>
        <div className="flex-center">
          <a onClick={handleCardClick}>
            <div
              className={`flex-center flex-col ${
                modalStyles['Modal__card']
              } shadow-1 ${isClickedA ? modalStyles.selected : ''}`}
              id="suggestNewleka"
            >
              <Image
                src="/peep-1.png"
                id="suggestNewleka"
                alt="Suggest about NEW・LE・KA"
                width={210}
                height={246}
                layout="intrinsic"
              />
              <span className="buttonText mt-24" id="suggestNewleka">
                뉴레카에 대해 제안하기
              </span>
            </div>
          </a>

          <a onClick={handleCardClick}>
            <div
              className={`flex-center flex-col ${
                modalStyles['Modal__card']
              } shadow-1 ${isClickedB ? modalStyles.selected : ''}`}
              id="suggestNewsletter"
            >
              <Image
                src="/peep-2.png"
                id="suggestNewsletter"
                alt="Suggest about NEW・LE・KA"
                width={210}
                height={246}
                layout="intrinsic"
              />
              <span className="buttonText mt-24" id="suggestNewsletter">
                새로운 뉴스레터 알려주기
              </span>
            </div>
          </a>
        </div>
        <div className={modalStyles['Modal__btnContainer']}>
          <Btn content={'취소'} name={'cancel'} onClick={handleCloseClick} />
          <Btn
            content={`${
              isClickedA
                ? '제안하기'
                : isClickedB
                ? '알려주기'
                : '제안하기'
            }`}
            name={`${
              isClickedA || isClickedB ? 'suggest-link' : 'suggest-disable'
            }`}
            link={`${
              isClickedA
                ? 'https://forms.gle/S8rcCoCvxAYA6YbGA'
                : isClickedB
                ? 'https://forms.gle/jYrE9TeSnXEnfk7S6'
                : ''
            }`}
          />
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root'),
    );
  } else {
    return null;
  }
};

export default Modal;
