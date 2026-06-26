/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function SettingsPage() {

const [email, setEmail] = useState("");
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);



const loadUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  setEmail(user.email || "");
};


useEffect(() => {
  loadUser();
}, []);

const changePassword = async () => {
  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  if (newPassword.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Password updated successfully!");

  setShowPasswordModal(false);
  setNewPassword("");
  setConfirmPassword("");
};



const deleteAllApplications = async () => {


  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("All applications deleted successfully!");
  setShowDeleteModal(false);
};

return (
  <>
    <div>
    <h2 className="text-3xl font-bold text-white">
      Settings
    </h2>

    <p className="text-slate-400 mt-2">
      Manage your account settings.
    </p>

    <div className="mt-8 max-w-xl rounded-2xl border border-slate-700 bg-[#1E293B] p-8">

      <h3 className="text-xl font-semibold text-white mb-6">
        Account
      </h3>

      <div className="space-y-5">

        <div>
          <p className="text-slate-400 text-sm mb-2">
            Email
          </p>

          <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-slate-300">
            {email}
          </div>
        </div>

        <button
  onClick={() => setShowPasswordModal(true)}
          className="w-full bg-[#D1A0D0] text-[#28445D] py-3 rounded-xl font-semibold hover:bg-[#c48ec4]"
        >
          Change Password
        </button>

      </div>

      <div className="mt-10 border-t border-slate-700 pt-8">

        <h3 className="text-red-400 text-xl font-semibold">
          Danger Zone
        </h3>

        <p className="text-slate-400 mt-2 mb-5">
          Permanently delete all your applications.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Delete All Applications
        </button>

      </div>

    </div>
    </div>

 {showPasswordModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="w-[450px] rounded-2xl bg-[#1E293B] border border-slate-700 p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Change Password
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
        />

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => {
            setShowPasswordModal(false);
            setNewPassword("");
            setConfirmPassword("");
          }}
          className="px-5 py-2 border border-slate-600 rounded-xl text-white"
        >
          Cancel
        </button>

        <button
          onClick={changePassword}
          className="px-6 py-2 rounded-xl bg-[#D1A0D0] text-[#28445D] font-semibold hover:bg-[#c48ec4]"
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}


{showDeleteModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="w-[450px] rounded-2xl bg-[#1E293B] border border-slate-700 p-8">

      <h2 className="text-2xl font-bold text-red-400">
        Delete All Applications
      </h2>

      <p className="mt-4 text-slate-300">
        Are you sure you want to delete all your applications?
      </p>

      <p className="mt-2 text-sm text-slate-500">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-5 py-2 rounded-xl border border-slate-600 text-white"
        >
          Cancel
        </button>

        <button
          onClick={deleteAllApplications}
          className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}


</>
);
}