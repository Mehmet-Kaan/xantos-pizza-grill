import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "../hooks/icons";

function ToggleThemeButton({ setClass = "modern-theme-toggle" }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      className={setClass}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Skift tema"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ToggleThemeButton;
