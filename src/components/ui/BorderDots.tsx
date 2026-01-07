import { CurvedDots } from "./CurvedDots";
import { FrameLine } from "./FrameLine";

const BorderDots = () => {
  return (
    <>
      {/* Corner dots */}
      <CurvedDots className="absolute top-0 left-0" rotate={0} />
      <CurvedDots className="absolute top-0 right-0" rotate={90} />
      <CurvedDots className="absolute bottom-0 right-0" rotate={180} />
      <CurvedDots className="absolute bottom-0 left-0" rotate={270} />

      {/* Edge connectors */}
      <FrameLine className="absolute top-[16px] left-10 right-10 h-[1px]" />
      <FrameLine className="absolute bottom-[16px] left-10 right-10 h-[1px]" />
      <FrameLine
        className="absolute left-[16px] top-10 bottom-10 w-[1px]"
        orientation="vertical"
      />
      <FrameLine
        className="absolute right-[16px] top-10 bottom-10 w-[1px]"
        orientation="vertical"
      />
    </>
  );
};

export default BorderDots;
