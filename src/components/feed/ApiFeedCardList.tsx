"use client";

import { useEffect, useMemo } from "react";
import { FilterType } from "./index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loadPoems } from "@/store/slices/poemsSlice";

const ApiFeedCardList = ({ filter }: { filter: FilterType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { poems, loading } = useSelector((state: RootState) => state.poems);

  useEffect(() => {
    if (!poems.length) {
      dispatch(loadPoems());
    }
  }, [dispatch, poems.length]);

  const displayList = useMemo(() => {
    if (filter === "recent") {
      return [...poems].reverse();
    }

    return poems;
  }, [filter, poems]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading poems...</div>
    );
  }

  return (
    <>
      {displayList.map((poem, index) => (
        <div
          key={poem.id}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-[#f8f5e4] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="relative h-44 w-full">
            <Image
              src={`data:image/jpeg;base64,${poem.imageUrl}`}
              alt={poem.title}
              fill
              unoptimized
              className="p-2 object-cover rounded-2xl"
            />
          </div>

          <div className="p-4 flex flex-col h-40">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                {poem.title}
              </h3>
              <span className="text-xs text-gray-500">@{poem.author}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mt-2">
              {poem.content}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApiFeedCardList;
