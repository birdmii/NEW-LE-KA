import cardStyles from '../styles/Card.module.css';

const SkeletonCard = () => {
  return (
    <div className={cardStyles['Card--skltn']}>
      <div className="flex mb-8">
        <span className={cardStyles['Card__category--skltn']}></span>
      </div>
      <h2 className={cardStyles['Card__title--skltn']}></h2>
      <div className={cardStyles['Card__description--skltn']}>
        <span className={cardStyles['Card__desciprtionText--skltn']}></span>
        <span className={cardStyles['Card__desciprtionText--skltn']}></span>
        <span className={cardStyles['Card__desciprtionText--skltn']}></span>
        <span className={cardStyles['Card__desciprtionText--skltn']}></span>
        <span className={cardStyles['Card__desciprtionText--skltn']}></span>
      </div>
      <div className={cardStyles['Card__subscriptionBtn--skltn']}></div>
    </div>
  );
};

export default SkeletonCard;
