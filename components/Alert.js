import alertStyles from '../styles/Alert.module.css';

const Alert = () => {
  return (
    <div className={`body-text2 shadow-1 border-rad-8 ${alertStyles.alert}`}>
      오픈 준비 중입니다! 조금만 더 기다려주세요:) 
    </div>
  );
};

export default Alert;