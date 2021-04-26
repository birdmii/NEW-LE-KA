import cardsStyles from '../styles/Cards.module.css';
import cardStyles from '../styles/Card.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonUI = () => {
  return (
    <>
      <h3 className="bold pt-32">
        <Skeleton height={70} width={200}/>
      </h3>
      {
        <div className={`mt-16 mb-120 ${cardsStyles['Cards--grid']}`}>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
          <Skeleton variant="rect" className={cardStyles['Card--skeleton']} height={584}/>
        </div>
      }
    </>
  );
};

export default SkeletonUI;
