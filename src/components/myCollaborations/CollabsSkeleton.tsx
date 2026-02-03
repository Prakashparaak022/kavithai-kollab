import { getUserImageSrc } from "@/utils/imageUtils";

const CollabSkeleton = () => {
  return (
    <div className="p-3 rounded-lg bg-card animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              src={getUserImageSrc("")}
              alt="placeholder-user"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="h-3 w-24 bg-blue-200 rounded" />
          </div>

          <div className="mt-2 space-y-1">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="w-6 h-6 bg-gray-300 rounded-full shrink-0" />
      </div>
    </div>
  );
};

export default CollabSkeleton;
