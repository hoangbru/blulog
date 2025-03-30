import HeaderBottom from "./HeaderBottom";
import HeaderMain from "./HeaderMain";
import HeaderTop from "./HeaderTop";
import "./header.css";

const HeaderContainer = () => {
  return (
    <header className="bb-header">
      <HeaderTop />
      <HeaderBottom />
      <HeaderMain />
    </header>
  );
};

export default HeaderContainer;
