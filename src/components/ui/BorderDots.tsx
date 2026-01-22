import { CurvedDots } from "./CurvedDots";
import { FrameLine } from "./FrameLine";

type Props = {
  color?: string;
};
const BorderDots = ({ color = "var(--bg-highlight)" }: Props) => {
  return (
    <>
      {/* Corner dots */}
      <CurvedDots className="absolute top-0 left-0" color={color} rotate={0} />
      <CurvedDots
        className="absolute top-0 right-0"
        color={color}
        rotate={90}
      />
      <CurvedDots
        className="absolute bottom-0 right-0"
        color={color}
        rotate={180}
      />
      <CurvedDots
        className="absolute bottom-0 left-0"
        color={color}
        rotate={270}
      />

      {/* Edge connectors */}
      <FrameLine
        color={color}
        className="absolute top-[16px] left-10 right-10 h-[1px]"
      />
      <FrameLine
        color={color}
        className="absolute bottom-[16px] left-10 right-10 h-[1px]"
      />
      <FrameLine
        color={color}
        className="absolute left-[16px] top-10 bottom-10 w-[1px]"
        orientation="vertical"
      />
      <FrameLine
        color={color}
        className="absolute right-[16px] top-10 bottom-10 w-[1px]"
        orientation="vertical"
      />
    </>
  );
};

export default BorderDots;
