import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';
import NoCard from './NoCard';

const Cards = ({ category, newsletters }) => {
  let count = newsletters.length;
  return (
    <>
      <h3 className="bold pt-32">
        {category} <span className="subtitle"> ({count})</span>
      </h3>
      {newsletters.length !== 0 ? (
        <div className={`mt-16 mb-120 ${cardsStyles.grid}`}>
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      ) : (
        <div className={`mt-16 mb-120`}>
          <NoCard />
        </div>
      )}
    </>
  );
};

export default Cards;
