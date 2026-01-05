type Poem = {
  title: string;
  author: string;
  image: string;
  text?: string;
};

type PoemCommentsListProps = {
  poems: Poem[];
  onSelectPoem: (poem: Poem) => void;
};

export default function PoemCommentsList({
  poems,
  onSelectPoem,
}: PoemCommentsListProps) {
  return (
    <div className="flex flex-col gap-1">
      {poems.map((poem, idx) => (
        <div
          key={idx}
          onClick={() => onSelectPoem(poem)}
          className="cursor-pointer bg-[#f8f5e4] p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-[#e7e1c7] transition">
          <img
            src={poem.image}
            alt="Author Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-gray-600">{poem.title}</span>
            {poem.author && (
              <span className="text-[#6a7a78] text-xs">{poem.author}</span>
            )}
          </div>

          {/* Dropdown arrow */}
          <div className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-[#e7e1c7]">
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
          </div>
        </div>
      ))}
    </div>
  );
}
