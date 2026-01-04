type Item = {
  image: string;
  author: string;
  handle: string;
  text?: string;
};

const comments: Item[] = [
  {
    author: "Eternal Echoes",
    handle: "@herondhi",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    author: '"The morning sky, painted in grey."',
    handle: "@kaviirathi",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    author: '"The morning...',
    handle: "@kaviirathi",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    author: "Where fear...",
    handle: "@user13",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
  },
  {
    author: "Comments(12)",
    handle: "",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
];

export default function PoemCommentsList() {
  return (
    <div className="flex flex-col gap-1">
      {comments.map((comment, idx) => (
        <div
          key={idx}
          className="bg-[#f8f5e4] p-4 rounded-lg shadow-md flex items-center gap-4">
          <img
            src={comment.image}
            alt="Author Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-gray-600">
              {comment.author}
            </span>

            {comment.handle && (
              <span className="text-[#6a7a78] text-xs">{comment.handle}</span>
            )}
          </div>

          {/* Select Icon */}
          <button
            className="
            ml-auto
            w-5 h-5
            flex items-center justify-center
            rounded-full
            bg-[#e7e1c7]
            hover:bg-[#ddd6b8]
            transition
          ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
