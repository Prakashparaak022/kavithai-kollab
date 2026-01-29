"use client";
import { useRef, useEffect } from "react";

type AutoResizeTextareaProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className: string;
  maxHeight?: string;
  readOnly?: boolean;
};

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  className,
  maxHeight = "200px",
  readOnly = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className={`border-none outline-none resize-none ${className}`}
      value={value}
      onChange={onChange}
      onInput={adjustHeight}
      style={{
        maxHeight,
      }}
      readOnly={readOnly}
    />
  );
};

export default AutoResizeTextarea;
