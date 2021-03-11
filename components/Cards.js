import cardsStyles from '../styles/Cards.module.css';
import Card from './Card';

const Cards = ({ newsletters }) => {
  return (
    <>
      <h3 className="bold pt-32">디자인</h3>
      <div className={`mt-16 ${cardsStyles.grid}`}>
        {newsletters.map((newsletter) => (
          <Card key={newsletter.id} newsletter={newsletter} />
        ))}
      </div>
    </>
  );
};

export default Cards;
