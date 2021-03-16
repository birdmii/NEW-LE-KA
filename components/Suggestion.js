import suggestionStyles from '../styles/Suggestion.module.css';
import Image from 'next/image';
import Btn from './Btn';

const Suggestion = () => {
  return (
    <div className={suggestionStyles.full}>
      <div className={suggestionStyles.textArea}>
        <h3>제보하기</h3>
        <p>
          제보해주셔서 감사합니다! <br />
          여러분의 소중한 제보 하나하나가 더 나은 뉴레카를 만들어 갑니다!
        </p>
      </div>
      <div className="flexCenter">
        <div
          className={`flexCenter flexColumn ${suggestionStyles.suggestionCard}`}
        >
          <Image
            src="/peep-1.png"
            alt="Suggest about NEW・LE・KA"
            width={210}
            height={246}
            layout="fixed"
          />
          <p className="buttonText mt-24">뉴레카에 대해 제보하기</p>
        </div>

        <div
          className={`flexCenter flexColumn ${suggestionStyles.suggestionCard}`}
        >
          <Image
            src="/peep-2.png"
            alt="Suggest about NEW・LE・KA"
            width={167}
            height={236}
            layout="fixed"
          />
          <p className="buttonText mt-24">뉴레카에 대해 제보하기</p>
        </div>
      </div>
      <div className={`flexVertical ${suggestionStyles.btnArea}`}>
        <Btn content={'제보하기'} />
      </div>
    </div>
  );
};

export default Suggestion;
