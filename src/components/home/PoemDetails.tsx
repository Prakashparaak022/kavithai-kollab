import { useState } from "react";

const PoemDetails = () => {
  const [requireApproval, setRequireApproval] = useState(true);
  return (
    <div>
      <div className="bg-[#f8f5e4] rounded-xl p-6 shadow-lg space-y-4">
        <div>
          <p className="text-[#6a7a78] text-sm mb-1">Poem Name</p>
          <p className="text-[#3a4a48]">Eternal Echoes</p>
        </div>
        <div>
          <p className="text-[#6a7a78] text-sm mb-1">Original Poet:</p>
          <p className="text-[#3a4a48]">@Bhronohi</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Time Remaining:</p>
          <p className="text-[#3a4a48]">11 hours</p>
        </div>
        <div>
          <p className="text-[#6a7a78] text-sm mb-1">Participants</p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-[#3a4a48] text-sm">Original Poet Approval</p>
          <button
            onClick={() => setRequireApproval(!requireApproval)}
            className={`w-12 h-6 rounded-full transition-colors ${
              requireApproval ? "bg-[#2c5f5d]" : "bg-[#9a9a8a]"
            }`}>
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                requireApproval ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoemDetails;
