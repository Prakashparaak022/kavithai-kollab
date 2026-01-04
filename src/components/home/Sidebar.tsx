const Sidebar = () => {
  return (
    <div>
      <div className="bg-[#2c5f5d] border-4 border-[#d4a574] rounded-lg p-6 relative">
        <div className="absolute top-0 left-0 w-12 h-12">
          <svg viewBox="0 0 50 50" className="text-[#d4a574]">
            <path
              d="M 10 10 L 10 40 M 10 10 L 20 10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-12 h-12">
          <svg viewBox="0 0 50 50" className="text-[#d4a574]">
            <path
              d="M 40 10 L 40 40 M 30 10 L 40 10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <svg viewBox="0 0 50 50" className="text-[#d4a574]">
            <path
              d="M 10 40 L 10 10 M 10 40 L 20 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <svg viewBox="0 0 50 50" className="text-[#d4a574]">
            <path
              d="M 40 40 L 40 10 M 30 40 L 40 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="text-center pt-2">
          <h2 className="text-[#e8dcc8] text-xl mb-1">"Eternal Echoes"</h2>
          <p className="text-[#a8c4c2] text-sm mb-3">@Bharatlhi</p>
          <p className="text-[#e8dcc8] text-sm">
            "What whispers through time, weave the threads of memory..."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
