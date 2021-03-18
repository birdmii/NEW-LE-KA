import modalStyles from '../styles/Modal.module.css';
import Image from 'next/image';
import Btn from './Btn';

const Modal = () => {
  return (
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
        <div className={`flexCenter flexColumn ${modalStyles.modalCard}`}>
            <Image
              src="/peep-1.png"
              alt="Suggest about NEW・LE・KA"
              width={210}
              height={246}
              layout="fixed"
            />
            <span className="buttonText mt-24">뉴레카에 대해 제보하기</span>
          </div>

          <div className={`flexCenter flexColumn ${modalStyles.modalCard}`}>
            <Image
              src="/peep-2.png"
              alt="Suggest about NEW・LE・KA"
              width={210}
              height={246}
              layout="fixed"
            />
            <span className="buttonText mt-24">새로운 뉴스레터 제보하기</span>
          </div>
        </div>
        <div className={modalStyles.btnArea}>
          <Btn content={'취소'} name={'cancel'} />
          <Btn content={'제보하기'} name={'suggest'}/>
        </div>
      </div>
    </div>
  );
};

export default Modal;
