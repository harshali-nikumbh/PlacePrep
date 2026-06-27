"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  User,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

const handleLogout = async () => {
  await supabase.auth.signOut();
  setShowLogoutModal(false);
  router.replace("/");

};


const linkClass = (path: string) =>
  `relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
    pathname === path
      ? "bg-[#D1A0D0]/15 text-[#D1A0D0] border-l-4 border-[#D1A0D0] font-medium"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;


  return (
<aside
className={`
fixed
top-0
left-0
z-50
w-60
h-screen
overflow-y-auto
bg-[#111827]
border-r
border-white/10
p-6
flex-col
transform
transition-transform
duration-300
md:translate-x-0
md:relative
md:flex
${
  isOpen
    ? "translate-x-0 flex"
    : "-translate-x-full md:flex"
}
`}
>
      <h1 className="text-3xl font-bold mb-10">
        <span className="text-white">Place</span>
        <span className="text-[#D1A0D0]">Prep</span>
      </h1>

      <nav className="flex flex-col gap-3">

        <Link
          href="/dashboard"
          onClick={onClose}
          className={linkClass("/dashboard")}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/applications"
          onClick={onClose}
          className={linkClass("/dashboard/applications")}
        >
          <Briefcase size={20} />
          Applications
        </Link>

        <Link
          href="/dashboard/calendar"
          onClick={onClose}
          className={linkClass("/dashboard/calendar")}
        >
          <Calendar size={20} />
          Calendar
        </Link>

        <Link
          href="/dashboard/profile"
          onClick={onClose}
          className={linkClass("/dashboard/profile")}
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className={linkClass("/dashboard/settings")}
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

      <div className="mt-auto flex flex-col gap-4">

  <button
    onClick={() => {
  router.push("/");
  onClose();
}}
    className="flex items-center gap-3 text-slate-300 hover:text-white transition"
  >
    <ArrowLeft size={20} />
    Back to Home
  </button>

  <button
  onClick={() => setShowLogoutModal(true)}
  className="flex items-center gap-3 text-red-400 hover:text-red-300 transition"
>
  <LogOut size={20} />
  Logout
</button>

</div>


{showLogoutModal &&
  createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">

      <div className="w-[420px] rounded-2xl bg-[#1E293B] border border-slate-700 p-8">

        <h2 className="text-2xl font-bold text-red-400">
          Logout
        </h2>

        <p className="mt-4 text-slate-300">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-5 py-2 rounded-xl border border-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>

        </div>

      </div>

    </div>,
    document.body
  )}


    </aside>
  );
}