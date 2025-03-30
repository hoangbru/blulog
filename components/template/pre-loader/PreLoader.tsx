import Image from "next/image";
import "./pre-loader.css";

const PreLoader = () => {
  return (
    <div className="bb-loader">
      <Image
        src="/assets/img/logo/loader.png"
        alt="loader"
        width={60}
        height={60}
      />
      <span className="loader"></span>
    </div>
  );
};

export default PreLoader;
