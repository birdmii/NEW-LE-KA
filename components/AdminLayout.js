import Meta from "./Meta";

const MainLayout = ({ children }) => {
  return (
    <>
      <Meta />
      {children}
    </>
  );
};

export default MainLayout;
