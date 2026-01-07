type LeftSidebarProps = {
  imageUrl?: string;
};

const FilterPanel: React.FC<LeftSidebarProps> = ({ imageUrl }) => {
  return (
    <div className="bg-[#f8f5e4] rounded-2xl p-2 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <img
          src={imageUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt="User"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="text-sm font-semibold text-gray-800">Recent Poems</div>
      </div>

      <div className="border-t border-black/10" />

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <span className="font-medium">All Poems</span>
        <span className="text-gray-600">Active Kollabs</span>
        <span className="text-gray-600">Completed Works</span>
      </div>
    </div>
  );
};

export default FilterPanel;
