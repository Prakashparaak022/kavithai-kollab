type CustomSwitchProps = {
  checked: boolean;
  onChange: () => void;
};

export const CustomSwitch = ({ checked, onChange }: CustomSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-[44px] items-center cursor-pointer rounded-full transition-colors duration-300 
        ${checked ? "bg-secondary" : "bg-highlight"}`}>
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-md transition-transform duration-300
          ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}`}
      />
    </button>
  );
};
