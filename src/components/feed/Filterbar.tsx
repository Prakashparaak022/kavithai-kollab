import { FilterItem, FilterType } from "./index";
import { SlidersHorizontal } from "lucide-react";

type Props = {
  filter: FilterType;
  setFilter: (v: FilterType) => void;
  filterList: FilterItem[];
};

const Filterbar = ({ filter, setFilter, filterList }: Props) => {
  return (
    <div className="rounded-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-green">Filters</div>
        <SlidersHorizontal size={16} className="text-gray-600" />
      </div>

      <div className="border-t border-black/10" />

      {filterList.map((item) => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`text-left text-sm px-3 py-1 rounded-lg transition ${
            filter === item.value
              ? "bg-secondary font-medium shadow-lg"
              : "text-green hover:bg-secondary/60"
          }`}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Filterbar;
