"use client";
import { useState } from "react";
import FeedCardList from "./FeedCardList";
import Filterbar from "./Filterbar";
import { Camera } from "lucide-react";
import Link from "next/link";
import useRequireAuth from "@/hooks/useRequireAuth";
import AppBgLayout from "../layouts/AppBgLayout";

export type FilterType = "all" | "liked" | "recent";
export type FilterItem = {
  name: string;
  value: FilterType;
  helperText: string;
};

const Feed = () => {
  const { requireAuth } = useRequireAuth();

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
    <AppBgLayout
      layout="2/10"
      left={
        <div className="p-4">
          <Filterbar
            filterList={filterList}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      }
      right={
        <div className="p-4 space-y-2">
          <Link
            href={"/post"}
            onClick={requireAuth}
            className="w-auto lg:w-md bg-card p-2 flex items-center justify-between rounded-lg text-green">
            <p>Share a kavithai...</p>
            <Camera fill="currentColor" stroke="white" />
          </Link>

          <p className="px-2 text-green text-sm font-semibold">
            {filterList.find((item) => item.value === filter)?.helperText}
          </p>

          <FeedCardList filter={filter} />
        </div>
      }
    />
  );
};

export default Feed;
