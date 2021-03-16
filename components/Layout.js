// import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Alert from './Alert';

const Layout = ({ children, query, handleQuery, handleSubmit }) => {
  return (
    <>
      <Meta />
      <Nav query={query} handleQuery={handleQuery} handleSubmit={handleSubmit} />
      <div className="container flexHorizontal">
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
