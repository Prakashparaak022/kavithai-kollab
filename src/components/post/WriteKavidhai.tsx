"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, X } from "lucide-react";

const categories = ["Love", "Nature", "Fantasy", "Existential", "Freestyle"];
const TAG_REGEX = /^#[a-z0-9]+$/;

type FormValues = {
  title: string;
  content: string;
  category: string;
  image: File | null;
};

export default function WriteKavidhai() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      category: "Nature",
    },
  });
  // image upload
  register("image");

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const selectedCategory = watch("category");

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

    setTags((prev) => [...prev, ...incoming.filter((t) => !prev.includes(t))]);
    setTagInput("");
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      tags,
    };

    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-4 py-1 rounded-full bg-[#f8f5e4] text-green text-sm font-medium">
          Write Kavidhai
        </button>
        <span className="text-sm text-gray-600">• Seed Collaboration</span>
      </div>

      <p className="text-xs text-gray-500">7 minutes</p>

      <div className="space-y-3">
        <div className="flex items-center rounded-xl bg-[#f8f5e4] px-3 py-2">
          <input
            {...register("title")}
            placeholder="Title (Optional)"
            className="flex-1 bg-transparent outline-none text-sm text-primary"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Camera className="text-green" fill="currentColor" stroke="white" />
          </label>

          <input
            type="file"
            accept="image/*"
            id="file-upload"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue("image", file);

              if (file) {
                const url = URL.createObjectURL(file);
                setImagePreview(url);
              }
            }}
          />
        </div>

        {imagePreview && (
          <div className="flex justify-center">
            <div className="relative w-full rounded-xl bg-[#f8f5e4] p-2">
              <img
                src={imagePreview}
                alt="preview"
                className="max-h-80 w-auto mx-auto object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setValue("image", null);
                }}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3 rounded-xl p-3 bg-[#f8f5e4]">
          <textarea
            {...register("content")}
            placeholder="Write your thoughts..."
            className="w-full h-36 resize-none bg-transparent outline-none text-sm text-primary"
          />

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setValue("category", cat)}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    selectedCategory === cat
                      ? "bg-secondary text-white"
                      : "bg-[#e6e1c9] text-gray-700 hover:bg-[#CCE0AB]"
                  }`}>
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
                rows={1}
                placeholder="#love #nature"
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
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-white rounded-full">
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags((prev) => prev.filter((t) => t !== tag))
                      }>
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
        <button
          type="button"
          className="flex-1 rounded-xl border border-gray-300 bg-[#f8f5e4] py-2 text-sm text-gray-600">
          Save as Draft
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-[#1e4f4f] py-2 text-sm text-white">
          Publish
        </button>
      </div>
    </form>
  );
}
