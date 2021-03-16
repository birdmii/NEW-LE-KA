import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';
import NoCard from './NoCard';

const Cards = ({ category, newsletters }) => {
  return (
    <>
      <h3 className="bold pt-32">{category}</h3>
      {newsletters.length !== 0 ?
        <div className={`mt-16 ${cardsStyles.grid} mb-120`}>
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
        :
        <div className={`mt-16 mb-120`}>
          <NoCard />
        </div>
      }
    </>
  );
};

export default Cards;
