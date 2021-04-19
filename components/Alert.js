import alertStyles from '../styles/Alert.module.css';

const Alert = ({alertContent}) => {
  return (
    <div className={`body-text2 ${alertStyles.Alert}`}>
      {alertContent.content}
    </div>
  );
};

export default Alert;