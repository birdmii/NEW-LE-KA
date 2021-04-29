import SkeletonCard from './SkeletonCard';
import SkeletonAlert from './SkeletonAlert';
import cardsStyles from '../styles/Cards.module.css';
import MediaQuery from 'react-responsive';

const SkeletonGrid = ({ category }) => {
  const gridTitle = (
    <h3 className="pt-32">
      <span className={`${cardsStyles['Category__title--skltn']}`}></span>
    </h3>
  );
  const gridBody = (
    <div className={`mt-16 mb-120 ${cardsStyles['Cards--grid']}`}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );

  return (
    <div>
      <MediaQuery minWidth={1051}>
        <div className={category === 'home' ? 'mt-40' : ''}>
          {category === 'home' ? <SkeletonAlert /> : null}
          {gridTitle}
          {gridBody}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1050}>
        <div>
          {gridTitle}
          {gridBody}
        </div>
      </MediaQuery>
    </div>
  );
};

export default SkeletonGrid;
