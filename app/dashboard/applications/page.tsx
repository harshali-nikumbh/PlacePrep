/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";
import { toast } from "sonner";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] =
  useState<Application | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [applicationToDelete, setApplicationToDelete] =
  useState<Application | null>(null);


  const refreshApplications = async () => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setApplications(data);
};

 
useEffect(() => {
  refreshApplications();
}, []);

const deleteApplication = async () => {
  if (!applicationToDelete) return;

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", applicationToDelete.id);

  if (error) {
    console.error(error);
toast.error(error.message);
return;
  }

  await refreshApplications();
  toast.success("Application deleted successfully!");

  setShowDeleteModal(false);
  setApplicationToDelete(null);
};


const getStatusStyle = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-500/20 text-blue-400";

    case "OA":
      return "bg-purple-500/20 text-purple-400";

    case "Interview":
      return "bg-yellow-500/20 text-yellow-400";

    case "Offer":
      return "bg-green-500/20 text-green-400";

    case "Rejected":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-slate-500/20 text-slate-300";
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
  


const filteredApplications = applications.filter((application) => {
  const matchesSearch =
    application.company_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    application.role
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    application.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  return (
  <>
    <div>
      <h2 className="text-2xl font-semibold text-white">
        Applications
      </h2>

      <p className="text-slate-400 mt-2">
        View and manage all your job applications.
      </p>
    </div>


<div className="mt-6 mb-4 flex gap-4">

  <input
    type="text"
    placeholder="Search by company or role..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 rounded-xl bg-[#0F172A] border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D1A0D0]"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-40 rounded-xl bg-[#0F172A] border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-[#D1A0D0]"
  >
    <option value="All">All Status</option>
    <option value="Applied">Applied</option>
    <option value="OA">OA</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>

</div>


    {filteredApplications.length > 0 && (
<div className="mt-8 overflow-hidden rounded-2xl border border-slate-700">
      <table className="w-full">
        <thead className="bg-[#1E293B]">
          <tr>
            <th className="px-6 py-4 text-left text-slate-300">
              Company
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Role
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Package
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Applied
            </th>

            <th className="px-6 py-4 text-center text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications.map((application) => (
            <tr
              key={application.id}
              className="border-t border-slate-700"
            >
              <td className="px-6 py-4 text-white">
                {application.company_name}
              </td>

              <td className="px-6 py-4 text-white">
                {application.role}
              </td>

              <td className="px-6 py-4 text-white">
                {application.package}
              </td>

              <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
      application.status
    )}`}
  >
    {application.status}
  </span>
</td>

              <td className="px-6 py-4 text-white">
  {formatDate(application.applied_date)}
</td>

              <td className="px-6 py-4 text-center">
  <button
  onClick={() => {
    setSelectedApplication(application);
    setShowModal(true);
  }}
  className="text-blue-400 hover:text-blue-300"
>
  Edit
</button>

  <span className="mx-2 text-slate-500">|</span>

  <button
  onClick={() => {
    setApplicationToDelete(application);
    setShowDeleteModal(true);
  }}
  className="text-red-400 hover:text-red-300"
>
  Delete
</button>
</td>
            </tr>
          ))}


        


        </tbody>
      </table>
    </div>
    )}


{filteredApplications.length === 0 && (
  <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-[#1E293B] p-14 text-center">
    <div className="text-6xl mb-4">📄</div>

    <h3 className="text-2xl font-semibold text-white">
      No Applications Yet
    </h3>

    <p className="mt-3 text-slate-400">
      Start tracking your placement journey by adding your first application.
    </p>

    <button
      onClick={() => setShowModal(true)}
      className="
      mt-8
      bg-[#D1A0D0]
      hover:bg-[#c48ec4]
      text-[#28445D]
      font-semibold
      px-6
      py-3
      rounded-xl
      transition
      "
    >
      + Add Your First Application
    </button>
  </div>
)}


<AddApplicationModal
  isOpen={showModal}
  application={selectedApplication}
  onClose={() => {
    setShowModal(false);
    setSelectedApplication(null);
  }}
  onApplicationAdded={refreshApplications}
/>

{showDeleteModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="w-[450px] rounded-2xl bg-[#1E293B] border border-slate-700 p-8">

      <h2 className="text-2xl font-bold text-red-400">
        Delete Application
      </h2>

      <p className="mt-4 text-slate-300">
        Are you sure you want to delete
      </p>

      <p className="font-semibold text-white mt-2">
        {applicationToDelete?.company_name}
      </p>

      <p className="text-sm text-slate-500 mt-4">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setApplicationToDelete(null);
          }}
          className="px-5 py-2 rounded-xl border border-slate-600 text-white"
        >
          Cancel
        </button>

        <button
          onClick={deleteApplication}
          className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
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