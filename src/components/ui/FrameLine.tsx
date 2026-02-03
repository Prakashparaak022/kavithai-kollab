import React from "react";

type FrameLineProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
};

export const FrameLine: React.FC<FrameLineProps> = ({
  className = "",
  orientation = "horizontal",
  color = "var(--bg-primary)",
  thickness = 1,
}) => (
  <div className={className}>
    {orientation === "horizontal" ? (
      <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="w-full h-full">
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg viewBox="0 0 1 100" preserveAspectRatio="none" className="w-full h-full">
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
      </svg>
    )}
  </div>
);
