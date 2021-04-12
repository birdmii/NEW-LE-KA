import footerStyles from '../styles/Footer.module.css';
import Image from 'next/image';
import Btn from './Btn';

const Footer = () => {
  return (
    <div className={`${footerStyles.Footer} text-center`}>
      <div className={` ${footerStyles['Footer--flexColumn']}`}>
        <div className={footerStyles['Footer__imgContainer']}>
          <Image
            src="/peeps.png"
            alt="Suggest about NEW・LE・KA"
            width={430}
            height={359}
            layout="intrinsic"
          />
        </div>
        <div className={`${footerStyles['Footer__textContainer']}`}>
          <p className={`${footerStyles['textContainer__introduction']} bold`}>
            개발자 누나와 디자이너 동생이 한팀인 <br />
            LIFEGUARD STUDIO 입니다.
            <br />
            우당탕탕 일합니다.
          </p>
          <Btn
            content={'함께 일해요!'}
            name={'footer'}
            link={'mailto:newleka.contact@gmail.com'}
          />
        </div>
      </div>
      <div className="caption mt-16">
        ©LIFEGUARD STUDIO PRODUCT. <br />
        All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
