/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";


export default function ProfilePage() {
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");





const loadProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  setEmail(user.email || "");

  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .single();

  if (data) {
    setFullName(data.full_name || "");
  }

  
};

useEffect(() => {
  loadProfile();
}, []);

const saveProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .upsert({
      user_id: user.id,
      full_name: fullName,
    });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Profile updated successfully!");
};

return (
  <div>
    <h2 className="text-3xl font-bold text-white">
      Profile
    </h2>

    <p className="text-slate-400 mt-2">
      Manage your account information.
    </p>

    <div className="mt-8 w-full max-w-lg rounded-2xl border border-slate-700 bg-[#1E293B] p-8 space-y-6">
        

      <div>
        <label className="block text-slate-300 mb-2">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
        />
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-slate-400 cursor-not-allowed"
        />
      </div>

      <button
        onClick={saveProfile}
        className="w-full bg-[#D1A0D0] hover:bg-[#c48ec4] text-[#28445D] font-semibold py-3 rounded-xl transition"
      >
        Save Changes
      </button>

    </div>
  </div>
);
}