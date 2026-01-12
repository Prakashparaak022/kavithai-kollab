"use client";
import { useState } from "react";
import FeedCardList from "./FeedCardList";
import Filterbar from "./Filterbar";
import { Camera } from "lucide-react";
import Link from "next/link";
import { usePlayerDetails } from "@/utils/UserSession";
import { useModal } from "@/context/ModalContext";

export type FilterType = "all" | "liked" | "recent";
export type FilterItem = {
  name: string;
  value: FilterType;
  helperText: string;
};

const Feed = () => {
  const { playerDetails } = usePlayerDetails();
  const { openLogin } = useModal();

  const [filter, setFilter] = useState<FilterType>("all");
  const filterList: FilterItem[] = [
    {
      name: "All Poems",
      value: "all",
      helperText: "Showing all poems",
    },
    {
      name: "Most Liked",
      value: "liked",
      helperText: "Based on user likes",
    },
    {
      name: "Recent",
      value: "recent",
      helperText: "7 minutes ago",
    },
  ];

  return (
    <div className="bg-secondary p-4">
      <div className="grid grid-cols-12 gap-4 rounded-xl overflow-hidden">
        <div className="bg-primary col-span-12 lg:col-span-2">
          <Filterbar
            filterList={filterList}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="min-h-[80vh] bg-primary col-span-12 lg:col-span-10 p-4 space-y-2">
          {/* Share kavithai */}
          <Link
            href={"/post"}
            onClick={(e) => {
              if (!playerDetails) {
                e.preventDefault();
                openLogin();
              }
            }}
            className="w-md bg-[#f8f5e4] p-2 flex items-center justify-between rounded-lg text-green ">
            <p>Share a kavithai...</p>
            <Camera fill="currentColor" stroke="white" />
          </Link>

          <p className="px-2 text-green text-sm font-semibold">
            {filterList.find((item) => item.value === filter)?.helperText}
          </p>

          <FeedCardList filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
