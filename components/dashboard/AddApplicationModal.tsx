/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApplicationAdded: () => Promise<void>;
  application?: Application | null;
};

export default function AddApplicationModal({
  isOpen,
  onClose,
  onApplicationAdded,
  application,
}: Props) {

    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState("");
    const [packageValue, setPackageValue] = useState("");
    const [status, setStatus] = useState("Applied");
    const [appliedDate, setAppliedDate] = useState("");
    const [notes, setNotes] = useState("");
    const [oaDate, setOaDate] = useState("");
    const [interviewDate, setInterviewDate] = useState("");


    useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]);



    useEffect(() => {
  if (application) {
    setCompanyName(application.company_name);
    setRole(application.role);
    setPackageValue(application.package);
    setStatus(application.status);
    setAppliedDate(application.applied_date || "");
    setNotes(application.notes || "");
    setOaDate(application.oa_date || "");
    setInterviewDate(application.interview_date || "");
  } else {
    setCompanyName("");
setRole("");
setPackageValue("");
setStatus("Applied");
setAppliedDate("");
setOaDate("");
setInterviewDate("");
setNotes("");
  }
}, [application, isOpen]);

    const isFormValid =
  companyName.trim() &&
  role.trim() &&
  packageValue.trim() &&
  status &&
  appliedDate;

    const handleSave = async () => {

        if (!isFormValid) {
  toast.error("Please fill all required fields.");
  return;
}

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    toast.error("Please login first.");
    return;
  }

  let error;

if (application) {
  const result = await supabase
    .from("applications")
    .update({
  company_name: companyName,
  role,
  package: packageValue,
  status,
  applied_date: appliedDate || null,
  oa_date: oaDate || null,
  interview_date: interviewDate || null,
  notes,
})
    .eq("id", application.id);

  error = result.error;
} else {
  const result = await supabase
    .from("applications")
    .insert({
  user_id: user.id,
  company_name: companyName,
  role,
  package: packageValue,
  status,
  applied_date: appliedDate || null,
  oa_date: oaDate || null,
  interview_date: interviewDate || null,
  notes,
})

  error = result.error;
}
  if (error) {
    console.error(error);
    toast.error(error.message);
    return;
  }

toast.success(
  application
    ? "Application updated successfully!"
    : "Application added successfully!"
);

  setCompanyName("");
  setRole("");
  setPackageValue("");
  setStatus("Applied");
setAppliedDate("");
setOaDate("");
setInterviewDate("");
setNotes("");
  await onApplicationAdded();

  onClose();
};

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
  className="
    modal-scroll
    bg-[#1E293B]
    w-[600px]
    max-h-[85vh]
    overflow-y-auto
    rounded-2xl
    p-8
    border
    border-slate-700
  "
>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Add Application
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

  <input
    type="text"
    placeholder="Company Name"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
  />

  <input
    type="text"
    placeholder="Role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
  />

  <input
    type="text"
    placeholder="Package (e.g. 12 LPA)"
    value={packageValue}
    onChange={(e) => setPackageValue(e.target.value)}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
  >
    <option>Applied</option>
    <option>OA</option>
    <option>Interview</option>
    <option>Offer</option>
    <option>Rejected</option>
  </select>

  <input
    type="date"
    value={appliedDate}
    onChange={(e) => setAppliedDate(e.target.value)}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
  />

{status !== "Applied" && (
  <div>
    <label className="block text-sm text-slate-300 mb-2">
      OA Date
    </label>

    <input
      type="date"
      value={oaDate}
      onChange={(e) => setOaDate(e.target.value)}
      className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
    />
  </div>
)}

{["Interview", "Offer", "Rejected"].includes(status) && (
  <div>
    <label className="block text-sm text-slate-300 mb-2">
      Interview Date
    </label>

    <input
      type="date"
      value={interviewDate}
      onChange={(e) => setInterviewDate(e.target.value)}
      className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white"
    />
  </div>
)}

  <textarea
    placeholder="Notes..."
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    rows={4}
    className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-white resize-none"
  />

</div>
<div className="flex justify-end gap-4 pt-4">

  <button
    onClick={onClose}
    className="px-5 py-2 rounded-xl border border-slate-600 text-white"
  >
    Cancel
  </button>

  <button
  onClick={handleSave}
  disabled={!isFormValid}
  className={`px-6 py-2 rounded-xl font-semibold transition
    ${
      isFormValid
        ? "bg-[#D1A0D0] text-[#28445D] hover:bg-[#c48ec4]"
        : "bg-slate-600 text-slate-400 cursor-not-allowed"
    }`}
>
  Save
</button>

</div>
      </div>
    </div>
  );
}