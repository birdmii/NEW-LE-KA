import sideBarStyles from '../styles/Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={`mt-40 ${sideBarStyles.sideBar}`}>
      <div className="subtitle bold px-16">
        카테고리
      </div>
      <ul className={`btnText medium ${sideBarStyles}`}>
        <li className={`${sideBarStyles.li} ${sideBarStyles.filter} bodyText2`}>필터</li>
        <li className={`${sideBarStyles.li}`}>디자인</li>
        <li className={`${sideBarStyles.li}`}>개발</li>
        <li className={`${sideBarStyles.li}`}>커리어</li>
        <li className={`${sideBarStyles.li}`}>마케팅</li>
        <li className={`${sideBarStyles.li}`}>과학과 기술</li>
        <li className={`${sideBarStyles.li}`}>라이프스타일</li>
        <li className={`${sideBarStyles.li}`}>뉴스</li>
        <li className={`${sideBarStyles.li}`}>여행</li>
        <li className={`${sideBarStyles.li}`}>사회</li>
        <li className={`${sideBarStyles.li}`}>경제</li>
        <li className={`${sideBarStyles.li}`}>문화</li>
      </ul>
    </div>
  )
}

export default Sidebar
