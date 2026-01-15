import { myCollaborations } from "@/data/myCollaborations";
import AboutPoem from "../poem/AboutPoem";
import Collaborations from "./Collaborations";
import AppBgLayout from "../layouts/AppBgLayout";

const MyCollaborations = () => {
  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4">
          <Collaborations collaborations={myCollaborations ?? []} />
        </div>
      }
      right={
        <div className="p-4">
          <AboutPoem />
        </div>
      }
    />
  );
};

export default MyCollaborations;
