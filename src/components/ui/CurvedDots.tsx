import React from "react";

type CurvedDotsProps = {
  className?: string;
  size?: number;
  color?: string;
  rotate?: number;
};

export const CurvedDots: React.FC<CurvedDotsProps> = ({
  className = "",
  size = 48,
  color = "var(--bg-primary)",
  rotate = 0,
}) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      transform: `rotate(${rotate}deg)`,
      transformOrigin: "center",
    }}>
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <circle cx="17" cy="29" r="2" fill={color} />
      <circle cx="19" cy="21" r="2" fill={color} />
      <circle cx="27" cy="17" r="2" fill={color} />
    </svg>
  </div>
);
