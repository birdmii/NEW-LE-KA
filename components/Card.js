import cardStyles from '../styles/Card.module.css';
import { Icon, InlineIcon } from '@iconify/react';
import arrowLine from '@iconify/icons-clarity/arrow-line';

const Card = ({ newsletter }) => {
  const categoryArr = [
    { code: 'design', name: '디자인' },
    // { code: 'develop', name: '개발' },
    { code: 'career', name: '커리어' },
    { code: 'marketing', name: '마케팅' },
    { code: 'sci-tech', name: '과학과 기술' },
    { code: 'lifestyle', name: '라이프스타일' },
    { code: 'news', name: '뉴스' },
    { code: 'travel', name: '여행' },
    { code: 'society', name: '사회' },
    { code: 'economy', name: '경제' },
    { code: 'culture', name: '문화' },
  ];

  const sendingTermArr = [
    { code: 'daily', name: '매일' },
    { code: 'weekly', name: '매주' },
    { code: '10 days', name: '10일' },
    { code: 'biweekly', name: '격주' },
    { code: 'monthly', name: '매달' },
    { code: '?', name: '?' },
  ];

  const sendingDayArr = [
    { code: 'Mon', name: '월' },
    { code: 'Tue', name: '화' },
    { code: 'Wed', name: '수' },
    { code: 'Thu', name: '목' },
    { code: 'Fri', name: '금' },
    { code: 'Sat', name: '토' },
    { code: 'Sun', name: '일' },
  ];

  let categoryTitle;
  categoryArr.forEach((item) => {
    if (newsletter.categoriesCode === item.code) {
      categoryTitle = item.name;
    }
  });

  let sendingTerm;
  sendingTermArr.forEach((item) => {
    if (item.code === newsletter.sendingTerm) {
      sendingTerm = item.name;
    }
  });

  return (
    <div className={`${cardStyles.card} shadow1`}>
      <div className="row mb-8">
        <span className={`${cardStyles.category} ${newsletter.categoriesCode}`}>
          {categoryTitle}
        </span>
      </div>
      <h2 className={cardStyles.title}>{newsletter.title}</h2>
      <p className={`bodyText2 ${cardStyles.description}`}>
        {newsletter.description}
      </p>

      <div className={cardStyles.tagSection}>
        <h6 className="caption">발행 주기</h6>
        <div className="mt-8">
          <span className={cardStyles.sendingTermTag}>{sendingTerm}</span>
        </div>
        <div className="mt-8">
          {newsletter.sendingTerm === 'daily'
            ? sendingDayArr.map((day) => {
                return (
                  <span
                    key={day.code}
                    className={`${cardStyles.sendingDayTag} ${cardStyles.on}`}
                  >
                    {day.name}
                  </span>
                );
              })
            : sendingDayArr.map((day) => {
                if (newsletter.sendingDay.includes(day.code)) {
                  return (
                    <span
                      key={day.code}
                      className={`${cardStyles.sendingDayTag} ${cardStyles.on}`}
                    >
                      {day.name}
                    </span>
                  );
                }
                return (
                  <span key={day.code} className={cardStyles.sendingDayTag}>{day.name}</span>
                );
              })}
        </div>

        <div className="mt-24">
          <h6 className="caption">관련 태그</h6>
          <div className="mt-8 mb-24">
            {newsletter.tags.map((tag) => {
              return (
                <span
                  key={tag}
                  className={`caption mr-8 ${cardStyles.relatedTag}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <a
        target="_blank"
        href={newsletter.subscriptionLink}
        rel="noopener noreferrer"
      >
        <div className={cardStyles.subscriptionBtn}>
          구독하기
          <Icon icon={arrowLine} rotate="90deg" />
        </div>
      </a>
    </div>
  );
};

export default Card;
