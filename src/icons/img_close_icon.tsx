import { FC } from "react";

type ImgCloseIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
};

const ImgCloseIcon: FC<ImgCloseIconProps> = ({
  width = 18,
  height = 18,
  className = "",
  fill = "#404040",
}) => (
  <svg
    width={className ? undefined : width}
    height={className ? undefined : height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={className ? undefined : fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ImgCloseIcon;
