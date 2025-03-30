import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

import "./header.css";

const HeaderContainer = () => {
  return (
    <header className="bb-header">
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
};

export default HeaderContainer;
