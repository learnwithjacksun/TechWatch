import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuProvider";

const useMenu = () => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  const { menu, setMenu, toggleMenu } = menuContext;

  return { menu, setMenu, toggleMenu };
};

export default useMenu;
