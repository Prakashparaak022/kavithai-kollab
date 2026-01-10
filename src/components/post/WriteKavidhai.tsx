"use client";

import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

const categories = ["Love", "Nature", "Fantasy", "Existential", "Freestyle"];
const TAG_REGEX = /^#[a-z0-9]+$/;

export default function WriteKavidhai() {
  const [selectedCategory, setSelectedCategory] = useState("Nature");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLTextAreaElement | null>(null);

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const addTags = () => {
    if (!tagInput.trim()) return;

    const incoming = tagInput
      .trim()
      .split(/\s+/)
      .map((t) => t.toLowerCase())
      .filter((t) => TAG_REGEX.test(t));

    if (incoming.length === 0) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, ...incoming.filter((t) => !prev.includes(t))]);
    setTagInput("");
  };

  return (
    <div className="w-full p-4 space-y-2">
      <div className="flex items-center gap-2">
        <button className="px-4 py-1 rounded-full bg-[#f8f5e4] text-green text-sm font-medium">
          Write Kavidhai
        </button>
        <span className="text-sm text-gray-600">• Seed Collaboration</span>
      </div>

      <p className="text-xs text-gray-500">7 minutes</p>

      <div className="space-y-3">
        <InputWithIcon placeholder="Title (Optional)" />

        <div className="space-y-3 rounded-xl p-3 bg-[#f8f5e4]">
          <textarea
            placeholder="Write your thoughts..."
            className="w-full h-36 resize-none bg-transparent outline-none text-sm text-primary"
          />

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    selectedCategory === cat
                      ? "bg-secondary text-white"
                      : "bg-[#e6e1c9] text-gray-700 hover:bg-[#CCE0AB]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="mb-2 text-sm font-medium text-gray-600">#Tags</p>
            <div className="border-t border-black/10" />

            <div className="flex items-end gap-2">
              <textarea
                ref={tagRef}
                rows={1}
                placeholder="Add optional tags..."
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  autoGrow(e.target);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    addTags();
                  }
                }}
                onBlur={addTags}
                className="w-full resize-none bg-transparent outline-none text-sm text-primary"
              />
              <span className="text-xs text-gray-500">{tags.length}</span>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-white rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        setTags((prev) => prev.filter((t) => t !== tag))
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button className="flex-1 rounded-xl border border-gray-300 bg-[#f8f5e4] py-2 text-sm text-gray-600">
          Save as Draft
        </button>
        <button className="flex-1 rounded-xl bg-[#1e4f4f] py-2 text-sm text-white">
          Publish
        </button>
      </div>
    </div>
  );
}

function InputWithIcon({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center rounded-xl bg-[#f8f5e4] px-3 py-2">
      <input
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-primary"
      />
      <Camera className="text-green" fill="currentColor" stroke="white" />
    </div>
  );
}
