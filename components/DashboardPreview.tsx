"use client";


import {
  BriefcaseBusiness,
  Users,
  Trophy,
} from "lucide-react";

import { User } from "@supabase/supabase-js";
import { Application } from "@/types/application";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";


type Props = {
  user: User | null;
};


export default function DashboardPreview({ user }: Props) {



  const [applications, setApplications] = useState<Application[]>([]);


  useEffect(() => {
  const loadData = async () => {
    if (!user) {
  setApplications([]);
  return;
}

    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setApplications(data || []);
  };

  loadData();
}, [user]);


const demoApplications = [
  {
    company_name: "Google",
    role: "Software Engineer",
    status: "Interview",
  },
  {
    company_name: "Amazon",
    role: "SDE Intern",
    status: "Applied",
  },
  {
    company_name: "Microsoft",
    role: "Software Engineer",
    status: "OA",
  },
  {
    company_name: "TCS",
    role: "System Engineer",
    status: "Offer",
  },
];


const displayedApplications = user
  ? applications.slice(0, 4)
  : demoApplications;

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#D1A0D0] font-semibold mb-3">
            DASHBOARD PREVIEW
          </p>

          <h2 className="text-4xl md:text-[3.2rem] font-bold text-white">
            Track Every Application
            <br />
            In One Place
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Stay on top of applications, interviews, and offers with a clean,
            centralized dashboard.
          </p>
        </div>

        <div
  className="
  absolute
  left-1/2
  -translate-x-1/2
  w-[700px]
  h-[300px]
  bg-[#719DBC]/10
  blur-[120px]
  rounded-full
  -z-10
  "
/>

        <div
          className="
          relative
          z-10
          bg-white/5
          backdrop-blur-md
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          "
        >
          {/* Top Stats */}
          {/* Top Stats */}
<div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="
bg-[#28445D]/50
rounded-2xl
p-8
flex
justify-between
items-center
border
border-[#719DBC]/10
hover:-translate-y-1
hover:shadow-lg
hover:shadow-[#719DBC]/20
transition-all
duration-300
">
    <div>
      <p className="text-slate-400 text-sm">
        Applications
      </p>

      <h3 className="text-4xl font-bold text-white mt-2">
        {user ? applications.length : 24}
      </h3>
    </div>

    <BriefcaseBusiness
      size={40}
      className="text-[#719DBC] opacity-90"
    />
  </div>

  <div className="
bg-[#719DBC]/15
rounded-2xl
p-8
flex
justify-between
items-center
border
border-[#719DBC]/20
hover:-translate-y-1
hover:shadow-lg
hover:shadow-[#719DBC]/20
transition-all
duration-300
">
    <div>
      <p className="text-slate-400 text-sm">
        Interviews
      </p>

      <h3 className="text-4xl font-bold text-[#719DBC] mt-2">
        {
  user
    ? applications.filter(
        (app) => app.status === "Interview"
      ).length
    : 8
}
      </h3>
    </div>

    <Users
      size={40}
      className="text-[#719DBC] opacity-90"
    />
  </div>

  <div className="
bg-[#D1A0D0]/15
rounded-2xl
p-8
flex
justify-between
items-center
border
border-[#D1A0D0]/20
hover:-translate-y-1
hover:shadow-lg
hover:shadow-[#D1A0D0]/20
transition-all
duration-300
">
    <div>
      <p className="text-slate-400 text-sm">
        Offers
      </p>

      <h3 className="text-4xl font-bold text-[#D1A0D0] mt-2">
        {
  user
    ? applications.filter(
        (app) => app.status === "Offer"
      ).length
    : 2
}
      </h3>
    </div>

    <Trophy
      size={40}
      className="text-[#D1A0D0] opacity-90"
    />
  </div>

</div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-slate-300">
                    Company
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Role
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Status
                  </th>
                </tr>
              </thead>

<tbody>
  {displayedApplications.map((app, index) => (
    <tr
      key={index}
      className="
      border-t
      border-white/10
      hover:bg-[#719DBC]/5
      transition-all
      duration-300
      "
    >
      <td className="p-4 text-white">
        {app.company_name}
      </td>

      <td className="p-4 text-slate-300">
        {app.role}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            app.status === "Offer"
              ? "bg-[#D1A0D0]/20 text-[#D1A0D0]"
              : "bg-[#719DBC]/20 text-[#719DBC]"
          }`}
        >
          {app.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}