import Image from 'next/image';
import cardStyles from '../styles/Card.module.css';

const Card = () => {
  return (
    <div className={cardStyles.card}>
      <div className="row mb-8">
        <span className={cardStyles.category}>디자인</span>
      </div>
      <h2 className={cardStyles.title}>Weekly D</h2>
      <p className={`bodyText2 ${cardStyles.description}`}>
        "주로 국내 디자이너가 쓴 글이나 디자인 관련 글을 수집합니다. 매주 수요일
        오전 8시에 만나요"
      </p>

      <div className={cardStyles.tagSection}>
        <h6 className={cardStyles.smallHeading}>발행 주기</h6>
        <div className="mt-8">
          <span className={cardStyles.sendingTermTag}>매주</span>
        </div>
        <div className="mt-8">
          <span className={cardStyles.sendingDayTag}>일</span>
          <span className={cardStyles.sendingDayTag}>월</span>
          <span className={cardStyles.sendingDayTag}>화</span>
          <span className={`${cardStyles.sendingDayTag} ${cardStyles.on}`}>
            수
          </span>
          <span className={cardStyles.sendingDayTag}>목</span>
          <span className={cardStyles.sendingDayTag}>금</span>
          <span className={cardStyles.sendingDayTag}>토</span>
        </div>

        <div className="mt-24">
          <h6 className={cardStyles.smallHeading}>관련 태그</h6>
          <div className="mt-8 mb-24">
            <span className={`caption mr-8 ${cardStyles.relatedTag}`}>
              디자인
            </span>
            <span className={`caption mr-8 ${cardStyles.relatedTag}`}>
              디자이너
            </span>
            <span className={`caption mr- ${cardStyles.relatedTag}`}>
              아티클
            </span>
          </div>
        </div>
      </div>
      <div className={cardStyles.subscriptionBtn}>
        구독하기
        <Image
          src="/i_arrow-right.png"
          alt="arrow"
          width={24}
          height={24}
          layout="fixed"
        />
      </div>
    </div>
  );
};

export default Card;
