import { myCollaborations } from "@/data/myCollaborations";
import AboutPoem from "../poem/AboutPoem";
import Collaborations from "./Collaborations";

const MyCollaborations = () => {
  return (
    <div className="bg-secondary p-4">
      <div className="bg-secondary grid grid-cols-12 gap-4 rounded-xl overflow-hidden">
        {/* Left bar */}
        <div className="bg-primary col-span-12 lg:col-span-9 space-y-4 p-4">
          {/* Collaboration List */}
          <Collaborations collaborations={myCollaborations ?? []} />
        </div>

        {/* Notifications */}
        <div className="bg-primary col-span-12 lg:col-span-3 p-4">
          <AboutPoem />
        </div>
      </div>
    </div>
  );
};

export default MyCollaborations;
