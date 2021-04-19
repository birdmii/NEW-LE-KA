import Image from 'next/image';
import cardsStyles from '../styles/Cards.module.css';
import Btn from './Btn';
import { useState } from 'react';
import Modal from './Modal';

const NoCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`flex-center ${cardsStyles['Cards--full']}`}>
      <Image
        src="/no-result.png"
        alt="No newsletters"
        width={387}
        height={335}
        layout="intrinsic"
      />
      <div className="text-center mt-24">
        <h3>등록된 뉴스레터가 없어요 ㅠㅠ</h3>
        <p className="body-text1">알고있는 뉴스레터를 알려주세요!</p>
        <a onClick={() => setShowModal(true)}>
          <Btn content={'알려주기'} name={'suggest'} />
        </a>
        <Modal onClose={() => setShowModal(false)} show={showModal} />
      </div>
    </div>
  );
};

export default NoCard;
