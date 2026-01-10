import { CustomSwitch } from "../ui/CustomSwitch";

type Props = {
  allowCollab: boolean;
  setAllowCollab: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostSettings = ({
  allowCollab,
  setAllowCollab,
  isPrivate,
  setIsPrivate,
}: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-green">Post Settings</h3>

      <div className="bg-[#f8f5e4] rounded-xl p-6 shadow-lg space-y-4">
        <h4 className="text-md font-semibold text-green">Collaboration</h4>
        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Allow Collaboration</p>
          <CustomSwitch
            checked={allowCollab}
            onChange={() => setAllowCollab((p) => !p)}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Make Private</p>
          <CustomSwitch
            checked={isPrivate}
            onChange={() => setIsPrivate((p) => !p)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostSettings;
