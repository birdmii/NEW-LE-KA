import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';
import NoCard from './NoCard';

const Cards = ({ category, newsletters }) => {
  const count = newsletters ? newsletters.length : 0;
  return (
    <>
      <h3 className="bold pt-32">
        {category}{' '}
        {category !== '랜덤모두보기' ? (
          <span className="subtitle"> ({count})</span>
        ) : null}
      </h3>
      {count > 0 ? (
        <div className={`mt-16 ${cardsStyles['Cards--grid']}`}>
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
