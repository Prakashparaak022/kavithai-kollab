import MyPoemsList from "./MyPoemsList";

const MyPoems = () => {
  return (
    <div
      className="
          m-4
          p-4
          bg-app 
          min-h-[78vh]
          rounded-xl
          overflow-hidden">
      <MyPoemsList />
    </div>
  );
};

export default MyPoems;
