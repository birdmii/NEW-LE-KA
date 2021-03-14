// import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Alert from './Alert';

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
