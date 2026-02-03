const InviteUserSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-xl animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gray-300" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="w-20 h-8 bg-gray-300 rounded-full" />
    </div>
  );
};

export default InviteUserSkeleton;
