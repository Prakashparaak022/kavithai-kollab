import { CurvedDots } from "@/components/CurvedDots";
import { FrameLine } from "@/components/FrameLine";

const PoemCard: React.FC = () => {
  return (
    <div>
      <div className="relative rounded-lg border-4 border-[#d4a574] bg-[#2c5f5d] p-6">
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
