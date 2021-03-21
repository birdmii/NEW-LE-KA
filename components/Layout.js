// import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Alert from './Alert';
import Footer from './Footer';

const Layout = ({ children, query, handleQuery, handleSubmit }) => {
  return (
    <>
      <Meta />
      <Nav query={query} handleQuery={handleQuery} handleSubmit={handleSubmit} />
      <div className="container flex-horizontal-center">
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
