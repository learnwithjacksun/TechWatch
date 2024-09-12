import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface MenuContextType {
  menu: boolean;
  toggleMenu: () => void;
  setMenu: (value: boolean) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);
const MenuProvider: React.FC<Props> = ({ children }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <MenuContext.Provider value={{ menu, setMenu, toggleMenu }}>
        {children}
      </MenuContext.Provider>
    </>
  );
};

export default MenuProvider;
