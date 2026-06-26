"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
} from "lucide-react";



type NavbarProps = {
  user: User | null;
  onSignUp: () => void;
};

export default function Navbar({
  user,
  onSignUp,
}: NavbarProps) {
  

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);



const signOut = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};

  return (
    <>
    <nav
  className="
  sticky
  top-0
  z-50
  flex
  justify-between
  items-center
  px-16
  py-6
  backdrop-blur-md
  bg-[#0F172A]/40
"
>
      <div
  className="
  flex
  items-center
  gap-3
  animate-fade-up
  cursor-pointer
  hover:scale-105
  transition-transform
  duration-300
"
>
        <Image
          src="/logo.png"
          alt="PlacePrep"
          width={40}
          height={40}
        />

        <h1 className="text-2xl font-bold">
  <span className="text-white">Place</span>
  <span
  className="
  bg-gradient-to-r
  from-[#719DBC]
  to-[#D1A0D0]
  bg-clip-text
  text-transparent
"
>
  Prep
</span>
</h1>
      </div>

      <div className="flex items-center gap-8">
        <a
  href="#features"
  className="
text-slate-300
hover:text-[#719DBC]
transition-all
duration-300
"
>
  Features
</a>

        <a
  href="#how-it-works"
  className="
text-slate-300
hover:text-[#719DBC]
transition-all
duration-300
"
>
  How It Works
</a>



       {user ? (
  <div className="relative">

    <button
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className="flex items-center gap-3"
    >
      {user.user_metadata?.avatar_url ? (
        <Image
          src={user.user_metadata.avatar_url}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div
          className="
          w-10
          h-10
          rounded-full
          bg-[#D1A0D0]
          text-[#28445D]
          font-bold
          flex
          items-center
          justify-center
          "
        >
          {user.user_metadata?.full_name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      <span className="text-white">
        {user.user_metadata?.full_name || user.email}
      </span>

      <ChevronDown
        size={18}
        className={`transition-transform ${
          showProfileMenu ? "rotate-180" : ""
        }`}
      />
    </button>

    {showProfileMenu && (
      <div
        className="
        absolute
        right-0
        mt-3
        w-56
        rounded-xl
        bg-[#1E293B]
        border
        border-white/10
        shadow-xl
        overflow-hidden
        "
      >

        <a
          href="/dashboard/profile"
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white"
        >
          <UserIcon size={18} />
          Profile
        </a>

        <a
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-white"
        >
          <Settings size={18} />
          Settings
        </a>

        <button
  onClick={() => setShowLogoutModal(true)}
  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10"
>
  <LogOut size={18} />
  Logout
</button>

      </div>
    )}

  </div>

) : (
  <button
    onClick={onSignUp}
    className="
      bg-[#D1A0D0]
      hover:bg-[#c58cc3]
      text-[#28445D]
      font-semibold
      px-5
      py-2
      rounded-lg
    "
  >
    Sign Up
  </button>
)}
      </div>
    
    </nav>

{showLogoutModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="w-[420px] rounded-2xl bg-[#1E293B] border border-white/10 p-8">

      <h2 className="text-2xl font-bold text-white">
        Logout
      </h2>

      <p className="mt-4 text-slate-300">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-5 py-2 rounded-xl border border-slate-600 text-white hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          onClick={signOut}
          className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </button>

      </div>

    </div>
  </div>
)}


</>
  );
}