"use client";
import { useState } from "react";
import { CustomSwitch } from "../ui/CustomSwitch";

type InfoItem = {
  label: string;
  value: string | number;
  inline?: boolean;
};

const AboutPoem = () => {
  const [requireApproval, setRequireApproval] = useState(true);

  const infoList: InfoItem[] = [
    { label: "Poem Name", value: "Eternal Echoes" },
    { label: "Original Poet", value: "@Bhronohi" },
    { label: "Time Remaining", value: "11 hours", inline: true },
    { label: "Participants", value: 6 },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-green">Account Info</h3>

      <div className="bg-card rounded-xl p-6 shadow-lg space-y-4">
        {infoList.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[#6a7a78] text-sm">{label}</p>
            <p className="text-[#3a4a48]">{value}</p>
          </div>
        ))}

        {/* Poet Approval */}
        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Original Poet Approval</p>
          <CustomSwitch
            checked={requireApproval}
            onChange={() => setRequireApproval((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPoem;
