"use client";
import useToastState from "@/hooks/use_toast_state";
import * as React from "react";

const TaskForm = ({
  saveTask,
}: {
  saveTask: (title: string) => Promise<void>;
}) => {
  const [title, setTitle] = React.useState("");

  const [isSaving, setIsSaving] = React.useState(false);

  const [isOpen, openToast] = useToastState();

  return (
    <div className="w-full space-y-4">
      <div>
        <input
          type="text"
          placeholder="Task Name"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-full"
        disabled={isSaving || !title}
        onClick={() => {
          setIsSaving(true);
          saveTask(title)
            .then(() => {
              openToast();
              setTitle("");
            })
            .finally(() => setIsSaving(false));
        }}
      >
        Save Task
      </button>
      {isOpen && (
        <div className="toast">
          <div className="alert alert-info">
            <span className="text-white">Task Saved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
