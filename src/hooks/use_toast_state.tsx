import * as React from "react";

const useToastState = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return [
    isOpen,
    () => {
      setIsOpen(true);
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsOpen(false), 5000);
    },
  ] as const;
};

export default useToastState;
