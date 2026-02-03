import { getUserImageSrc } from "@/utils/imageUtils";

export const PoemCardSkeleton = () => {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-card rounded-2xl flex flex-col animate-pulse">
      {/* Image */}
      <div className="h-44 w-full rounded-t-2xl p-2">
        <div className="h-full w-full bg-gray-200 rounded-xl" />
      </div>

      {/* Content */}
      <div className="pt-2 px-4 pb-4 flex flex-col h-40 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 rounded" />

        <div className="flex items-center gap-2">
          <img
            src={getUserImageSrc("")}
            alt="placeholder-user"
            className="w-5 h-5 rounded-full object-cover"
          />

          <div className="h-3 w-24 bg-blue-200 rounded" />
        </div>

        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="h-3 w-10 bg-gray-300 rounded" />
          <div className="h-3 w-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};
