import { FilterItem, FilterType } from "./index";

type Props = {
  filter: FilterType;
  setFilter: (v: FilterType) => void;
  filterList: FilterItem[];
};

const Filterbar = ({ filter, setFilter, filterList }: Props) => {
  return (
    <div className="rounded-xl bg-card p-4">
      <div className="space-y-1">
        {filterList.map((item) => {
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              onClick={() => {
                setFilter(item.value);
                // setShowFilters(false);
              }}
              className={`relative w-full text-left p-1 text-sm rounded-md transition
                ${
                  active
                    ? "bg-secondary text-white font-medium"
                    : "text-green hover:bg-secondary/60"
                }`}>
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r bg-green" />
              )}
              <span className="ml-2">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filterbar;
