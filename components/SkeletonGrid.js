import SkeletonCard from './SkeletonCard';
import cardsStyles from '../styles/Cards.module.css';

const SkeletonGrid = () => {
  return (
    <>
      <h3 className="pt-32">
        <span className={`${cardsStyles['Category__title--skltn']}`}></span>
      </h3>

      <div className={`mt-16 mb-120 ${cardsStyles['Cards--grid']}`}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
};

export default SkeletonGrid;
