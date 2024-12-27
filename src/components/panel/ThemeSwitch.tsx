'use client';

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };


  return (
    <div className="theme">
      <button onClick={toggleTheme}>
        {theme === "light" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};
 export default ThemeSwitch;