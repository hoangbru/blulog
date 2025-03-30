import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";
import "./footer.css";

const FooterContainer = () => {
  return (
    <footer className="bb-footer margin-t-50">
      <div className="footer-container">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default FooterContainer;
