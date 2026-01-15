type Layout = "2fr_16px_10fr" | "9fr_16px_3fr";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  layout?: Layout;
};

const AppBgLayout = ({ left, right, layout = "2fr_16px_10fr" }: Props) => {
  return (
    <div className="bg-secondary p-4">
      <div
        className={`
          grid
          grid-cols-1
          min-h-[80vh]
          bg-app
          rounded-xl
          overflow-hidden
          lg:grid-cols-[${layout}]
        `}>
        {left}
        <div className="hidden lg:block bg-secondary" />
        {right}
      </div>
    </div>
  );
};

export default AppBgLayout;
