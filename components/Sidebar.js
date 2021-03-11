import sideBarStyles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const categories = [
    '디자인',
    '개발',
    '커리어',
    '마케팅',
    '과학과 기술',
    '라이프스타일',
    '뉴스',
    '여행',
    '사회',
    '경제',
    '문화',
  ];
  return (
    <div className={`mt-40 ${sideBarStyles.sideBar}`}>
      <div className="subtitle bold px-16">카테고리</div>
      <ul className={`btnText medium ${sideBarStyles}`}>
        <li className={`${sideBarStyles.li} ${sideBarStyles.filter} bodyText2`}>
          필터
        </li>
        {categories.map((category, index) => {
          return (
            <li key={index} className={`${sideBarStyles.li}`}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
