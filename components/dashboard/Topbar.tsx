"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      console.log(user?.user_metadata);
    };

    getUser();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 17) {
  greeting = "Good Afternoon";
}

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-4 md:px-8 py-5">
      <div className="flex items-center gap-4">

  <button
    onClick={onMenuClick}
    className="md:hidden text-white"
  >
    <Menu size={28} />
  </button>

  <div>
        <h1 className="text-xl md:text-3xl font-bold text-white">
  {greeting},{" "}
          {user?.user_metadata?.full_name?.split(" ")[0] ||
            user?.email?.split("@")[0] ||
            "User"}
          
        </h1>

        <p className="text-slate-400 mt-1">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user?.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="Profile"
            width={45}
            height={45}
            className="rounded-full"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#D1A0D0] text-[#28445D] font-bold flex items-center justify-center">
            {(user?.user_metadata?.full_name || user?.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}