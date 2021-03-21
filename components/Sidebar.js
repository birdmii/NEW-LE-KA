import sideBarStyles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Filter from './Filter';

const Sidebar = () => {
  const router = useRouter();
  const { category } = router.query;

  const categories = [
    { code: 'design', title: '디자인' },
    { code: 'career', title: '커리어' },
    { code: 'marketing', title: '마케팅' },
    { code: 'sci-tech', title: '과학과 기술' },
    { code: 'lifestyle', title: '라이프스타일' },
    { code: 'news', title: '뉴스' },
    { code: 'travel', title: '여행' },
    { code: 'education', title: '교육' },
    { code: 'society', title: '사회' },
    { code: 'economy', title: '경제' },
    { code: 'culture', title: '문화' },
  ];
  return (
    <div className={`mt-40 ${sideBarStyles.sideBar}`}>
      <div
        className={`subtitle bold px-16 flex-vertical-center flex-space-between`}
      >
        <span>카테고리</span>
        {/* <span className="body-text2">
          필터
          <Icon icon={angleLine} className="ml-4"/>
        </span> */}
      </div>
      {/* <Filter /> */}
      <ul className={`btn-text medium ${sideBarStyles}`}>
        <Link href="/">
          {category === undefined ? (
            <a href="">
              <li
                className={`${sideBarStyles.liItem} ${sideBarStyles.selected} flex-vertical-center`}
              >
                {' '}
                랜덤모두보기
              </li>
            </a>
          ) : (
            <a href="">
              <li className={`${sideBarStyles.liItem} flex-vertical-center`}>
                {' '}
                랜덤모두보기
              </li>
            </a>
          )}
        </Link>
        {categories.map((item) => {
          if (item.code === category) {
            return (
              <Link key={item.code} href="/[category]" as={`/${item.code}`}>
                <a href="">
                  <li
                    className={`${sideBarStyles.liItem} ${sideBarStyles.selected}`}
                    id={item.code}
                  >
                    {item.title}
                  </li>
                </a>
              </Link>
            );
          } else {
            return (
              <Link key={item.code} href="/[category]" as={`/${item.code}`}>
                <a href="">
                  <li className={`${sideBarStyles.liItem}`} id={item.code}>
                    {item.title}
                  </li>
                </a>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
