import { useContext } from "react";
import AppContext from "../context/appContext";

function Header() {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <div className="flex w-full bg-[#f8fafc] dark:bg-[#04111d] p-4 items-center justify-between shadow-md">
      <div className="flex flex-row items-center">
        <img
          src="/gelato.png"
          alt="Gelato Logo"
          className="h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] rounded-sm -rotate-1"
        />
        <h1 className="text-lg lg:text-3xl font-extrabold ml-4">
          Gelato Kitties
        </h1>
      </div>
      <p
        className="text-2xl lg:text-3xl cursor-pointer select-none"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </p>
    </div>
  );
}

export default Header;
