import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { ActiveContext } from "../../Сontext/Context";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const [active, setActive] = useState(false);
  const { theme } = useSelector((state) => state.themeInStoreConfiguration);
  // const themeValue  = useSelector((state) => state.themeInStoreConfiguration.theme);

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);
  return (
    <ActiveContext.Provider
      value={{ isActive: active, SetIsActive: setActive }}
    >
      <Header />
      <Navbar />
      <Outlet />
      <div>footer</div>
    </ActiveContext.Provider>
  );
};
export default Layout;
