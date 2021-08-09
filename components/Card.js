import cardStyles from "../styles/Card.module.css";
import { Icon } from "@iconify/react";
import arrowLine from "@iconify/icons-clarity/arrow-line";
import fileGroupLine from "@iconify/icons-clarity/file-group-line";

const Card = ({ newsletter }) => {
  const categoryArr = [
    { code: "economy", title: "경제" },
    { code: "education", title: "교육" },
    { code: "news", title: "뉴스" },
    { code: "design", title: "디자인" },
    { code: "lifestyle", title: "라이프스타일" },
    { code: "marketing", title: "마케팅" },
    { code: "culture", title: "문화" },
    { code: "work", title: "일과 노동" },
    { code: "tech", title: "테크" },
    { code: "trend", title: "트렌드" },
    { code: "society", title: "사회" },
  ];

  const sendingTermArr = [
    { code: "daily", name: "매일" },
    { code: "weekly", name: "매주" },
    { code: "tendays", name: "10일" },
    { code: "biweekly", name: "격주" },
    { code: "monthly", name: "매달" },
    { code: "?", name: "?" },
  ];

  const sendingDayArr = [
    { code: "Mon", name: "월" },
    { code: "Tue", name: "화" },
    { code: "Wed", name: "수" },
    { code: "Thu", name: "목" },
    { code: "Fri", name: "금" },
    { code: "Sat", name: "토" },
    { code: "Sun", name: "일" },
  ];

  const tagArr = newsletter.tag.tag;
  const sendingDays = newsletter.sendingday.day;
  const sampleLink = newsletter.samplelink !== '-' ? newsletter.samplelink : '';
  let categoryTitle;
  categoryArr.forEach((item) => {
    if (newsletter.category === item.code) {
      categoryTitle = item.title;
    }
  });

  let sendingTerm;
  sendingTermArr.forEach((item) => {
    if (item.code === newsletter.sendingterm) {
      sendingTerm = item.name;
    }
  });

  return (
    <div className={`${cardStyles.Card} shadow-1`}>
      <div className="flex mb-8">
        <span
          className={`${cardStyles["Card__category"]} ${newsletter.category}`}
        >
          {categoryTitle}
        </span>
      </div>
      <h2 className={cardStyles["Card__title"]}>
        {newsletter.title}

        {sampleLink && (
          <a target="_blank" href={sampleLink} rel="noopener noreferrer">
            <Icon className={`ml-4`} icon={fileGroupLine} style={{ fontSize: '18px'}} color='#9799a2'/>
          </a>
        )}
      </h2>

      <p className={`body-text2 ${cardStyles["Card__description"]}`}>
        {newsletter.description}
      </p>

      <div className={cardStyles["Card__tagSection"]}>
        <div className="caption">발행 주기</div>
        <div className="mt-8">
          <span className={cardStyles["tagSection__sendingTermTag"]}>
            {sendingTerm}
          </span>
        </div>
        <div className="mt-8">
          {newsletter.sendingterm === "daily"
            ? sendingDayArr.map((day) => {
                return (
                  <span
                    key={day.code}
                    className={`${cardStyles["tagSection__sendingDayTag"]} ${cardStyles.on}`}
                  >
                    {day.name}
                  </span>
                );
              })
            : sendingDayArr.map((day) => {
                if (sendingDays.includes(day.code)) {
                  return (
                    <span
                      key={day.code}
                      className={`${cardStyles["tagSection__sendingDayTag"]} ${cardStyles.on}`}
                    >
                      {day.name}
                    </span>
                  );
                }
                return (
                  <span
                    key={day.code}
                    className={cardStyles["tagSection__sendingDayTag"]}
                  >
                    {day.name}
                  </span>
                );
              })}
        </div>

        <div className="mt-24">
          <div className="caption">관련 태그</div>
          <div className="mt-8 mb-24">
            {tagArr.map((tag) => {
              return (
                <span
                  key={tag}
                  className={`caption mr-8 ${cardStyles["tagSection__relatedTag"]}`}
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
        href={newsletter.subscriptionlink}
        rel="noopener noreferrer"
      >
        <div className={cardStyles["Card__subscriptionBtn"]}>
          구독하기
          <Icon icon={arrowLine} rotate="90deg" />
        </div>
      </a>
    </div>
  );
};

export default Card;
