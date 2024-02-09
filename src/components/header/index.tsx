import Link from "next/link";
import ClipboardIcon from "../clipboard_icon";

const Header = () => (
  <div className="navbar bg-base-100 shadow-sm mb-8 text-primary">
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost text-xl">
        <ClipboardIcon /> My Task Manager App
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
