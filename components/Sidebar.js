import sideBarStyles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Alert from './Alert';
import NavBtn from './NavBtn';
import closeLine from '@iconify/icons-clarity/close-line';
import MediaQuery from 'react-responsive';

// import Filter from './Filter';
// import { Icon, InlineIcon } from '@iconify/react';
// import angleLine from '@iconify/icons-clarity/angle-line';

const Sidebar = ({ isSideBarOpen, handleShowSideNav }) => {
  const router = useRouter();
  const { category } = router.query;

  const categories = [
    { code: 'economy', title: '경제' },
    { code: 'education', title: '교육' },
    { code: 'news', title: '뉴스' },
    { code: 'design', title: '디자인' },
    { code: 'lifestyle', title: '라이프스타일' },
    { code: 'marketing', title: '마케팅' },
    { code: 'culture', title: '문화' },
    { code: 'work', title: '일과 노동' },
    // { code: 'society', title: '사회' },
    { code: 'tech', title: '테크' },
    { code: 'trend', title: '트렌드' },
  ];

  let desktopSideBar = (
    <div className={`mt-40 ${sideBarStyles.sideBar}`}>
      <div
        className={`subtitle bold flex-vertical-center flex-space-between ${sideBarStyles.categoryTitle}`}
      >
        <span>카테고리</span>
        {/* <span className="body-text2">
      필터
      <Icon icon={angleLine} className="ml-4"/>
    </span> */}
      </div>
      {/* <Filter /> */}

      <ul className={`btn-text medium ${sideBarStyles.categoryItem}`}>
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

  let mobileSideBar = isSideBarOpen ? (
    <div
      className={
        isSideBarOpen
          ? `${sideBarStyles.background} ${sideBarStyles.active}`
          : `${sideBarStyles.background}`
      }
    >
      <div className={sideBarStyles.closeBtn}>
        <Icon
          icon={closeLine}
          style={{ fontSize: '32px' }}
          onClick={handleShowSideNav}
        />
      </div>
      <div
        className={
          isSideBarOpen
            ? `${sideBarStyles.sideBarMobile} ${sideBarStyles.active}`
            : `${sideBarStyles.sideBarMobile}`
        }
      >
        <Alert />
        <div className={`${sideBarStyles.navBtnsMobile}`}>
          <NavBtn
            content="커피한잔"
            name="donation"
            link="https://donaricano.com/mypage/1679663183_mMG77l"
          />
          <NavBtn content="제보하기" name="suggest" />
        </div>
        <div
          className={`subtitle bold mt-24 ${sideBarStyles.categoryTitleMobile}`}
        >
          <span>카테고리</span>
        </div>
        <ul className={`btn-text medium ${sideBarStyles.categoryItem}`}>
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
                <li
                  className={`${sideBarStyles.liItem} flex-vertical-center`}
                  onClick={handleShowSideNav}
                >
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
                  <a href="" onClick={handleShowSideNav}>
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
      <div className={sideBarStyles.background}>
        <div className={sideBarStyles.closeBtn}>
          <Icon
            icon={closeLine}
            style={{ fontSize: '32px' }}
            onClick={handleShowSideNav}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div>
      <MediaQuery minWidth={1051}>{desktopSideBar}</MediaQuery>
      <MediaQuery maxWidth={1050}>{mobileSideBar}</MediaQuery>
    </div>
  );
};

export default Sidebar;
