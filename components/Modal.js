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
    if(cardId === "suggestNewleka" && !isClickedB) {
      setIsClickedA(true);
    } else if(cardId === "suggestNewsletter" && !isClickedA) {
      setIsClickedB(true);
    } else if(cardId === "suggestNewleka") {
      let setClicked = !isClickedA;
      setIsClickedA(setClicked) 
      setIsClickedB(!setClicked)
    }
    else if(cardId === "suggestNewsletter") {
      let setClicked = !isClickedB;
      setIsClickedA(!setClicked) 
      setIsClickedB(setClicked)
    }
  }

  const modalContent = show ? (
    <div className={`${modalStyles.backgroundBlack} flexCenter`}>
      <div className={modalStyles.backgroundCard}>
        <div className={modalStyles.textArea}>
          <h3>제보하기</h3>
          <p className={`${modalStyles.suggestionText} bodyText2 mt-16`}>
            제보해주셔서 감사합니다! <br />
            여러분의 소중한 제보 하나하나가 더 나은 뉴레카를 만들어 갑니다!
          </p>
        </div>
        <div className="flexCenter">
          <a onClick={handleCardClick}>
            <div
              className={`flexCenter flexColumn ${modalStyles.modalCard} shadow1 ${isClickedA ? modalStyles.selected : ""}`}
              id="suggestNewleka"
            >
              <Image
                src="/peep-1.png"
                id="suggestNewleka"
                alt="Suggest about NEW・LE・KA"
                width={210}
                height={246}
                layout="fixed"
              />
              <span className="buttonText mt-24" id="suggestNewleka">뉴레카에 대해 제보하기</span>
            </div>
          </a>

          <a onClick={handleCardClick}>
            <div
              className={`flexCenter flexColumn ${modalStyles.modalCard} shadow1 ${isClickedB ? modalStyles.selected : ""}`}
              id="suggestNewsletter"
            >
              <Image
                src="/peep-2.png"
                id="suggestNewsletter"
                alt="Suggest about NEW・LE・KA"
                width={210}
                height={246}
                layout="fixed"
              />
              <span className="buttonText mt-24" id="suggestNewsletter">새로운 뉴스레터 제보하기</span>
            </div>
          </a>
        </div>
        <div className={modalStyles.btnArea}>
          <Btn content={'취소'} name={'cancel'} onClick={handleCloseClick} />
          <Btn content={'제보하기'} name={`${isClickedA || isClickedB ? 'suggest-link': 'suggest-disable'}`} link={`${isClickedA ? 'https://www.google.com' : isClickedB ? 'https://www.naver.com' : ''}`}/>
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
  // return (
  //   <div className={`${modalStyles.backgroundBlack} flexCenter`}>
  //     <div className={modalStyles.backgroundCard}>
  //       <div className={modalStyles.textArea}>
  //         <h3>제보하기</h3>
  //         <p className={`${modalStyles.suggestionText} bodyText2 mt-16`}>
  //           제보해주셔서 감사합니다! <br />
  //           여러분의 소중한 제보 하나하나가 더 나은 뉴레카를 만들어 갑니다!
  //         </p>
  //       </div>
  //       <div className="flexCenter">
  //       <div className={`flexCenter flexColumn ${modalStyles.modalCard} shadow1`}>
  //           <Image
  //             src="/peep-1.png"
  //             alt="Suggest about NEW・LE・KA"
  //             width={210}
  //             height={246}
  //             layout="fixed"
  //           />
  //           <span className="buttonText mt-24">뉴레카에 대해 제보하기</span>
  //         </div>

  //         <div className={`flexCenter flexColumn ${modalStyles.modalCard} shadow1`}>
  //           <Image
  //             src="/peep-2.png"
  //             alt="Suggest about NEW・LE・KA"
  //             width={210}
  //             height={246}
  //             layout="fixed"
  //           />
  //           <span className="buttonText mt-24">새로운 뉴스레터 제보하기</span>
  //         </div>
  //       </div>
  //       <div className={modalStyles.btnArea}>
  //         <Btn content={'취소'} name={'cancel'} />
  //         <Btn content={'제보하기'} name={'suggest-disable'}/>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Modal;
