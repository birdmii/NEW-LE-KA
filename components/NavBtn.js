import navBtnStyles from '../styles/NavBtn.module.css'

const NavBtn = ({content, name}) => {
  return (
    name === 'coffee' ? 
    <span className={`${navBtnStyles.btn} ${navBtnStyles.coffee}`}> 
      {content}
    </span>
    :
    <span className={`${navBtnStyles.btn} ${navBtnStyles.report}`}> 
      {content}
    </span>
  )
}

export default NavBtn
