"use client";
import useToastState from "@/hooks/use_toast_state";
import * as React from "react";

const UserForm = ({
  saveUser,
}: {
  saveUser: (userName: string) => Promise<void>;
}) => {
  const [name, setName] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const [isOpen, openToast] = useToastState();

  return (
    <div className="w-full space-y-4">
      <div>
        <input
          type="text"
          placeholder="User Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        className="btn btn-neutral w-full"
        disabled={isSaving || !name}
        onClick={() => {
          setIsSaving(true);
          saveUser(name)
            .then(() => {
              openToast();
              setName("");
            })
            .finally(() => setIsSaving(false));
        }}
      >
        Save User
      </button>
      {isOpen && (
        <div className="toast">
          <div className="alert alert-info">
            <span className="text-white">User Saved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
