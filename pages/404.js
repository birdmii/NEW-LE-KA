import cardsStyles from '../styles/Cards.module.css'
// import Image from 'next/image'
import Btn from '../components/Btn'

const FourOFour = () => {
  return (
    <div className={`${cardsStyles['Cards--full']} flex-vertical-center mt-80`}>
      {/* <Image
        src="/404.png"
        alt="No newsletters"
        width={519}
        height={409}
      /> */}
      <img src="/404.png" alt="No newsletters" className={cardsStyles['Error404__img']} />
      <div className="text-center mt-24">
        <h3>이런! 찾을 수 없는 페이지네요...</h3>
        
        <p className="body-text1">
          존재하지 않는 주소를 입력하셨거나 잘못된 경로를 이용하셨네요...
        </p>
          <Btn content={"홈 화면으로 가기"} name={"go-back"} link={"/"}/>
      </div>
    </div>
  )
}

export default FourOFour
