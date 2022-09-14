import Header from "./common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>this is footer</footer>
    </>
  );
};

export default Layout;
