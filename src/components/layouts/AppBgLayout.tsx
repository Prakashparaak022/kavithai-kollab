type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  layout?: string;
};

const layoutClasses: Record<string, string> = {
  "2/10": "lg:grid-cols-[2fr_16px_10fr]",
  "9/3": "lg:grid-cols-[9fr_16px_3fr]",
  "6fr_16px_6fr": "lg:grid-cols-[6fr_16px_6fr]",
};

const AppBgLayout = ({ left, right, layout = "2/10" }: Props) => {
  return (
    <div
      className="
          m-4 
          bg-app 
          rounded-xl
          overflow-hidden">
      <div
        className={`
          grid
          grid-cols-1
          min-h-[78vh]
          ${layoutClasses[layout]}
        `}>
        {left}
        <div className="hidden lg:block bg-secondary" />
        {right}
      </div>
    </div>
  );
};

export default AppBgLayout;
