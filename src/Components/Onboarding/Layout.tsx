import useMenu from "../../Hooks/useMenu";
import Menu from "../Global/Menu";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

interface prop {
  children: React.ReactNode;
}

const Layout: React.FC<prop> = ({ children }) => {
  const {menu}= useMenu()
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="pb-6">{children}</div>
        <div className="ms-0 mt-auto">
          <Footer />
        </div>
      </div>

      {menu && <Menu/>}
    </>
  );
};

export default Layout;
