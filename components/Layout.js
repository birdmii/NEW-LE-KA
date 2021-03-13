import styles from '../styles/Layout.module.css';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Alert from './Alert';
import Cards from './Cards';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container flex">
        <Sidebar />
        <div>
          <Alert />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
