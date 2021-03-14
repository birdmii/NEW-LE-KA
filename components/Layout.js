import styles from '../styles/Layout.module.css';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Alert from './Alert';
import Cards from './Cards';
import Meta from './Meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
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
