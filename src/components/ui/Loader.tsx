import React from "react";

type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";
type LoaderType = "spinner" | "dots" | "bars";

const sizeMap: Record<LoaderSize, string> = {
  xs: "h-4 w-4",
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

type LoaderProps = {
  type?: LoaderType;
  size?: LoaderSize;
  ariaLabel?: string;
  className?: string;
  withText?: boolean;
};

export default function Loader({
  type = "spinner",
  size = "md",
  ariaLabel = "Loading",
  className = "",
  withText = false,
}: LoaderProps) {
  const sizeClass = sizeMap[size];

  if (type === "dots") {
    return (
      <div
        role="status"
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-2 ${className}`}>
        <div className={`flex items-center ${sizeClass}`}>
          <div className="flex space-x-1 items-end">
            <span className="inline-block rounded-full animate-bounce h-2 w-2" />
            <span className="inline-block rounded-full animate-bounce200 h-2 w-2" />
            <span className="inline-block rounded-full animate-bounce400 h-2 w-2" />
          </div>
        </div>
        {withText && <span className="sr-only">{ariaLabel}</span>}
      </div>
    );
  }

  if (type === "bars") {
    return (
      <div
        role="status"
        aria-label={ariaLabel}
        className={`inline-flex items-center ${className}`}>
        <div className="flex items-end space-x-1">
          <span className="block max-h-3 w-1 rounded-sm animate-pulse" />
          <span className="block max-h-4 w-1 rounded-sm animate-pulse200" />
          <span className="block max-h-5 w-1 rounded-sm animate-pulse400" />
        </div>
        {withText && <span className="sr-only">{ariaLabel}</span>}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`thick-spinner ${sizeClass} ${className}`}
    />
  );
}
