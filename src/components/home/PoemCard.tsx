import { CurvedDots } from "@/components/CurvedDots";
import { FrameLine } from "@/components/FrameLine";

type PoemCardProps = {
  title: string;
  username: string;
  content: string;
};

const PoemCard: React.FC<PoemCardProps> = ({ title, username, content }) => {
  return (
    <div className="relative rounded-lg border-4 border-[#d4a574] bg-[#2c5f5d] p-6 overflow-hidden">
      {/* Corner dots */}
      <CurvedDots className="absolute top-0 left-0" rotate={0} />
      <CurvedDots className="absolute top-0 right-0" rotate={90} />
      <CurvedDots className="absolute bottom-0 right-0" rotate={180} />
      <CurvedDots className="absolute bottom-0 left-0" rotate={270} />

      {/* Edge connectors */}
      <FrameLine className="absolute top-[16px] left-10 right-10 h-[1px]" />
      <FrameLine className="absolute bottom-[16px] left-10 right-10 h-[1px]" />
      <FrameLine className="absolute left-[16px] top-10 bottom-10 w-[1px]" orientation="vertical" />
      <FrameLine className="absolute right-[16px] top-10 bottom-10 w-[1px]" orientation="vertical" />

      {/* Content */}
      <div className="pt-2 text-center">
        <h2 className="mb-1 text-xl text-[#e8dcc8]">{title}</h2>
        <p className="mb-3 text-sm text-[#a8c4c2]">{username}</p>
        <p className="text-sm text-[#e8dcc8]">{content}</p>
      </div>
    </div>
  );
};

export default PoemCard;
