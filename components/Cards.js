import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';

const Cards = ({ category, newsletters }) => {
  let count = newsletters.length;
  return (
    <>
      <h3 className="bold pt-32 flexVertical">{category} <span className="subtitle ml-4"> ({count})</span></h3>
      <div className={`mt-16 ${cardsStyles.grid}`}>
        {newsletters.map((newsletter) => (
          <Card key={newsletter.id} newsletter={newsletter} />
        ))}
      </div>
    </>
  );
};

export default Cards;
