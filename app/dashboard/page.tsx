"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import StatCard from "@/components/dashboard/StatCard";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";

import { Application } from "@/types/application";
import StatusChart from "@/components/dashboard/StatusChart";

export default function DashboardPage() {

    const [showModal, setShowModal] = useState(false);

    const [applications, setApplications] = useState<Application[]>([]);

useEffect(() => {
  const loadApplications = async () => {
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

  loadApplications();
}, []);

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


const stats = [
  {
    title: "Applications",
    value: applications.length,
  },
  {
    title: "OA",
    value: applications.filter(
      (app) => app.status === "OA"
    ).length,
  },
  {
    title: "Interviews",
    value: applications.filter(
      (app) => app.status === "Interview"
    ).length,
  },
  {
    title: "Offers",
    value: applications.filter(
      (app) => app.status === "Offer"
    ).length,
  },
  {
    title: "Rejected",
    value: applications.filter(
      (app) => app.status === "Rejected"
    ).length,
  },
];

    

const chartData = [
  {
    name: "Applied",
    value: applications.filter(
      (app) => app.status === "Applied"
    ).length,
  },
  {
    name: "OA",
    value: applications.filter(
      (app) => app.status === "OA"
    ).length,
  },
  {
    name: "Interview",
    value: applications.filter(
      (app) => app.status === "Interview"
    ).length,
  },
  {
    name: "Offer",
    value: applications.filter(
      (app) => app.status === "Offer"
    ).length,
  },
  {
    name: "Rejected",
    value: applications.filter(
      (app) => app.status === "Rejected"
    ).length,
  },
];

  return (
    <>
  <div className="flex items-center justify-between">
  <div>
    <h2 className="text-2xl font-semibold text-white">
      Dashboard Overview
    </h2>

    <p className="text-slate-400 mt-2">
      Welcome back! Here&apos;s a quick overview of your placement journey.
    </p>
  </div>

  <button
  onClick={() => setShowModal(true)}
  className="
    bg-[#D1A0D0]
    hover:bg-[#c48ec4]
    text-[#28445D]
    font-semibold
    px-5
    py-3
    rounded-xl
    transition-all
  "
>
    + Add Application
  </button>
</div>

  <div className="grid grid-cols-5 gap-6 mt-10">
  {stats.map((stat) => (
    <StatCard
      key={stat.title}
      title={stat.title}
      value={stat.value}
    />
  ))}
</div>

<div className="mt-10">
  <StatusChart data={chartData} />
</div>

<AddApplicationModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onApplicationAdded={refreshApplications}
/>
</>
  );
}