import { FC, ReactNode } from "react";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

interface ZoomImageProps {
  children: ReactNode;
}

const ZoomImage: FC<ZoomImageProps> = ({ children }) => {
  return <Zoom>{children}</Zoom>;
};

export default ZoomImage;
