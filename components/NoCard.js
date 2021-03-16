import Image from 'next/image';
import cardsStyles from '../styles/Cards.module.css';
import Btn from './Btn';

const NoCard = () => {
  return (
    <div className={`flexCenter ${cardsStyles.full}`}>
      <Image
        src="/no-result.png"
        alt="No newsletters"
        width={387}
        height={335}
        layout="fixed"
      />
      <div className="textCenter mt-24">
        <h3>등록된 뉴스레터가 없어요 ㅠㅠ</h3>
        <p className="bodyText1">알고있는 뉴스레터를 제보해주세요!</p>
        <Btn content={"제보하기"}/>
      </div>
    </div>
  );
};

export default NoCard;
