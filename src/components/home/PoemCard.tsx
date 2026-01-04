import React from "react";

type CornerDotsProps = {
  className?: string;
  rotate?: number;
};

type EdgeLineProps = {
  className?: string;
  horizontal?: boolean;
};

const CornerDots: React.FC<CornerDotsProps> = ({
  className = "",
  rotate = 0,
}) => (
  <div
    className={className}
    style={{
      transform: `rotate(${rotate}deg)`,
      transformOrigin: "center",
    }}>
    <svg viewBox="0 0 50 50" className="w-12 h-12 text-[#d4a574]">
      <circle cx="17" cy="29" r="2" fill="currentColor" />
      <circle cx="19" cy="21" r="2" fill="currentColor" />
      <circle cx="27" cy="17" r="2" fill="currentColor" />
    </svg>
  </div>
);

const EdgeLine: React.FC<EdgeLineProps> = ({
  className = "",
  horizontal = true,
}) => (
  <div className={className}>
    {horizontal ? (
      <svg
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        className="w-full h-full text-[#d4a574]">
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
        className="w-full h-full text-[#d4a574]">
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    )}
  </div>
);

const PoemCard: React.FC = () => {
  return (
    <div>
      <div className="relative rounded-lg border-4 border-[#d4a574] bg-[#2c5f5d] p-6">
        {/* Corner dots */}
        <CornerDots className="absolute top-0 left-0" rotate={0} />
        <CornerDots className="absolute top-0 right-0" rotate={90} />
        <CornerDots className="absolute bottom-0 right-0" rotate={180} />
        <CornerDots className="absolute bottom-0 left-0" rotate={270} />

        {/* Edge connectors */}
        <EdgeLine className="absolute top-[16px] left-10 right-10 h-[1px]" />
        <EdgeLine className="absolute bottom-[16px] left-10 right-10 h-[1px]" />
        <EdgeLine
          className="absolute left-[16px] top-10 bottom-10 w-[1px]"
          horizontal={false}
        />
        <EdgeLine
          className="absolute right-[16px] top-10 bottom-10 w-[1px]"
          horizontal={false}
        />

        {/* Content */}
        <div className="pt-2 text-center">
          <h2 className="mb-1 text-xl text-[#e8dcc8]">"Eternal Echoes"</h2>
          <p className="mb-3 text-sm text-[#a8c4c2]">@Bharatlhi</p>
          <p className="text-sm text-[#e8dcc8]">
            "What whispers through time, weave the threads of memory..."
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
