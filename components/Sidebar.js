import sideBarStyles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const { category } = router.query;

  const categories = [
    { code: 'design', title: '디자인' },
    // { code: 'develop', title: '개발' },
    { code: 'career', title: '커리어' },
    { code: 'marketing', title: '마케팅' },
    { code: 'sci-tech', title: '과학과 기술' },
    { code: 'lifestyle', title: '라이프스타일' },
    { code: 'news', title: '뉴스' },
    { code: 'travel', title: '여행' },
    { code: 'society', title: '사회' },
    { code: 'economy', title: '경제' },
    { code: 'culture', title: '문화' },
  ];
  return (
    <div className={`mt-40 ${sideBarStyles.sideBar}`}>
      <div className="subtitle bold px-16">카테고리</div>
      <ul className={`btnText medium ${sideBarStyles}`}>
        <li className={`${sideBarStyles.li} ${sideBarStyles.filter} bodyText2`}>
          필터
        </li>

        <Link href="/">
          {category === undefined ? (
            <li className={`${sideBarStyles.li} ${sideBarStyles.selected} flexVertical`}>
              {' '}
              랜덤모두보기
            </li>
          ) : (
            <li className={`${sideBarStyles.li} flexVertical`}>
              {' '}
              랜덤모두보기
            </li>
          )}
        </Link>
        {categories.map((item) => {
          if (item.code === category) {
            return (
              <Link key={item.code} href="/[category]" as={`/${item.code}`}>
                <li
                  className={`${sideBarStyles.li} ${sideBarStyles.selected}`}
                  id={item.code}
                >
                  {item.title}
                </li>
              </Link>
            );
          } else {
            return (
              <Link key={item.code} href="/[category]" as={`/${item.code}`}>
                <li className={`${sideBarStyles.li}`} id={item.code}>
                  {item.title}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
