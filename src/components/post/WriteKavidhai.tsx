"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, X } from "lucide-react";
import { toast } from "react-toastify";
import { usePlayerDetails } from "@/utils/UserSession";
import { useCategories } from "@/hooks/useCategories";
import LoadingSpinner from "../ui/LoadingSpinner";
import { createPoem } from "@/store/poems";
import { useAppDispatch } from "@/store";

const TAG_REGEX = /^#[a-z0-9]+$/;

type Props = {
  allowCollab: boolean;
  isPrivate: boolean;
};

type FormValues = {
  title: string;
  content: string;
  category: number;
  image: File | null;
};

export default function WriteKavidhai({ allowCollab, isPrivate }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { playerDetails, accessToken } = usePlayerDetails();
  const {
    data: categoryData,
    loading: categoryLoading,
    error,
  } = useCategories();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        title: "",
        content: "",
        image: null,
      },
    });

  const dispatch = useAppDispatch();
  const isSaveMode = allowCollab || isPrivate;

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedCategory = watch("category");
  const imageFile = watch("image");

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.minHeight = "9rem";
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

  const onSubmit = async (data: FormValues) => {
    if (!playerDetails?.id) {
      toast.error("Player not found");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("categoryId", String(data.category));

      if (tags.length) {
        formData.append("tags", tags.map((t) => t.replace(/^#/, "")).join(","));
      }

      formData.append("allowCollaboration", String(allowCollab));
      formData.append("isPrivate", isSaveMode ? "1" : "0");
      formData.append("isPublish", isSaveMode ? "0" : "1");
      formData.append("userId", String(playerDetails.id));

      if (imageFile) formData.append("image", imageFile, imageFile.name);

      await dispatch(createPoem(formData)).unwrap();

      toast.success("Kavidhai created successfully");
      reset();
      setTags([]);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      {/* Image upload */}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          if (!file) return;

          if (file.size > 1 * 1024 * 1024) {
            toast.error("File size exceeds 1MB limit.");
            return;
          }

          setValue("image", file);

          if (file) {
            setImagePreview(URL.createObjectURL(file));
          }
        }}
      />

      {/* Title Badge */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-4 py-1 rounded-full bg-card text-green text-sm font-medium">
          Write Kavidhai
        </button>
        <span className="text-sm text-gray-600">• Seed Collaboration</span>
      </div>

      {/* Title */}
      <div className="flex items-center rounded-xl bg-card px-3 py-2">
        <input
          {...register("title")}
          placeholder="Title (Optional)"
          className="flex-1 bg-transparent outline-none text-sm text-primary"
        />
        <button type="button" onClick={() => fileRef.current?.click()}>
          <Camera className="text-green" fill="currentColor" stroke="white" />
        </button>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative w-full rounded-xl bg-card p-2">
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
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Text Area */}
      <div className="space-y-6 rounded-xl p-3 bg-card">
        <textarea
          {...register("content")}
          placeholder="Write your thoughts..."
          onInput={(e) => autoGrow(e.currentTarget)}
          className="w-full h-36 resize-none bg-transparent outline-none text-sm text-primary"
        />

        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">Category</p>
          <div className="flex flex-wrap gap-2">
            {categoryLoading ? (
              <LoadingSpinner color="var(--bg-secondary)" />
            ) : (
              categoryData?.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setValue("category", cat.id)}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    selectedCategory === cat.id
                      ? "bg-secondary text-white"
                      : "bg-card text-gray-700 hover:bg-[#CCE0AB]"
                  }`}>
                  {cat.name}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="mb-2 text-sm font-medium text-gray-600">#Tags</p>
          <div className="border-t border-black/10" />

          <div className="flex items-end gap-2">
            <textarea
              rows={1}
              placeholder="Add optional tags..."
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  addTags();
                }
              }}
              onBlur={addTags}
              className="w-full resize-none bg-transparent outline-none text-sm text-primary py-[6px]"
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

      {/* Bottom Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex-1 rounded-xl border border-gray-300 bg-card py-2 text-sm text-gray-600">
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-[#1e4f4f] py-2 text-sm text-white disabled:opacity-60">
          {isSaveMode ? "Save" : "Publish"}
        </button>
      </div>
    </form>
  );
}
