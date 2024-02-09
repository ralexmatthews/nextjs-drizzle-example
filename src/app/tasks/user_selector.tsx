"use client";
import useToastState from "@/hooks/use_toast_state";
import * as React from "react";

type User = {
  id: number;
  name: string;
};

const NONE = "∂none";

const UserSelector = ({
  taskId,
  user,
  setUser,
  users,
}: {
  taskId: number;
  user: number | null;
  setUser: (taskId: number, user: number | null) => Promise<void>;
  users: User[];
}) => {
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    user
  );

  const [isOpen, openToast] = useToastState();

  React.useEffect(() => {
    if (selectedUserId !== user) {
      setUser(taskId, selectedUserId).then(() => openToast());
    }
  }, [selectedUserId]);

  return (
    <>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => {
          const id = e.target.value === NONE ? null : Number(e.target.value);
          setSelectedUserId(id);
        }}
      >
        <option value={NONE} disabled selected>
          None
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {isOpen && (
        <div className="toast">
          <div className="alert alert-info">
            <span className="text-white">Assigned User Saved</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSelector;
