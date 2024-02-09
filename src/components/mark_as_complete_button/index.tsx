"use client";
import * as React from "react";
import CheckIcon from "../check_icon";
import XIcon from "../x_icon";

const MarkAsCompleteButton = ({
  taskId,
  isComplete,
  toggleComplete,
}: {
  taskId: number;
  isComplete: boolean;
  toggleComplete: (taskId: number, complete: boolean) => Promise<void>;
}) => {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        setIsPending(true);

        toggleComplete(taskId, !isComplete).finally(() => {
          setIsPending(false);
        });
      }}
      className={isComplete ? "text-green-500" : ""}
    >
      {isComplete ? <CheckIcon /> : <XIcon />}
    </button>
  );
};

export default MarkAsCompleteButton;
