import alertStyles from '../styles/Alert.module.css';

const Alert = ({alertContent}) => {
  return (
    <div className={`body-text2 ${alertStyles.Alert}`}>
      <span>{alertContent.content}</span>
    </div>
  );
};

export default Alert;