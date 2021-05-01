import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';
import NoCard from './NoCard';

const Cards = ({ category, newsletters }) => {
  const count = newsletters.length;
  return (
    <>
      <h3 className="bold pt-32">
        {category} <span className="subtitle"> ({count})</span>
      </h3>
      {count ? (
        <div className={`mt-16 mb-120 ${cardsStyles['Cards--grid']}`}>
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
