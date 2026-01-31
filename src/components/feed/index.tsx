"use client";
import { useState } from "react";
import FeedCardList from "./FeedCardList";
import Filterbar from "./Filterbar";
import { Camera, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import useRequireAuth from "@/hooks/useRequireAuth";
import AppBgLayout from "../layouts/AppBgLayout";
import { usePlayerDetails } from "@/utils/UserSession";
import ApiFeedCardList from "./ApiFeedCardList";

export type FilterType = "all" | "liked" | "recent";
export type FeedType = "private" | "public";
export type FilterItem = {
  name: string;
  value: FilterType;
  helperText: string;
};

const Feed = () => {
  const { requireAuth } = useRequireAuth();
  const { playerDetails } = usePlayerDetails();
  const [showFilters, setShowFilters] = useState(false);
  const [feedType, setFeedType] = useState<FeedType>("public");
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
        <div className="pt-4 px-4 lg:p-4 flex justify-end lg:justify-start">
          <div className="relative">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 text-sm font-semibold text-green bg-card px-3 py-1 rounded-lg">
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {showFilters && (
              <div className="absolute right-0 lg:left-0 mt-3 z-30 min-w-40">
                <Filterbar
                  filterList={filterList}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            )}
          </div>
        </div>
      }
      right={
        <div className="p-4 flex flex-col gap-2">
          <Link
            href={"/post"}
            onClick={requireAuth}
            className="w-auto lg:w-md bg-card p-2 flex items-center justify-between rounded-lg text-green">
            <p>Share a kavithai...</p>
            <Camera fill="currentColor" stroke="white" />
          </Link>

          {/* Publish filter badges */}
          {playerDetails && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFeedType("public")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${
                feedType === "public"
                  ? "bg-secondary text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}>
                PUBLIC
              </button>

              <button
                onClick={() => setFeedType("private")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${
                feedType === "private"
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
                PRIVATE
              </button>
            </div>
          )}

          <p className="px-2 text-green text-sm font-semibold">
            {filterList.find((item) => item.value === filter)?.helperText}
          </p>

          {/* <FeedCardList feedType={feedType} filter={filter} /> */}

          {/* APi */}
          <ApiFeedCardList filter={filter} feedType={feedType} />
        </div>
      }
    />
  );
};

export default Feed;
