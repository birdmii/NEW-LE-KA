import styles from '../styles/Layout.module.css';
import Nav from './Nav';
import Card from './Card';
import Sidebar from './Sidebar';
import Alert from './Alert';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container flex">
        <Sidebar />
        <div>
          <Alert />
          <h3 className={`bold ${styles.title}`}>디자인</h3>
          <div className={`mt-16 ${styles.cards}`}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
