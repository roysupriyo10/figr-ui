import React from "react";

import { FC } from "react";

type ImgCheckIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
};

const ImgCheckIcon: FC<ImgCheckIconProps> = ({
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
      d="M20 6L9 17L4 12"
      stroke={className ? undefined : fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ImgCheckIcon;
