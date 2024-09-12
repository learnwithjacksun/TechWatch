import { useContext, useEffect } from "react";
import { ThemeContext } from "../Contexts/ThemeProvider";

const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { darkMode, setDarkMode } = themeContext;

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#20212d");
    } else {
      document.body.classList.remove("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#fefefe");
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};

export default useTheme;
