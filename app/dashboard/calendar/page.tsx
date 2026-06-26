"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";


export default function CalendarPage() {

    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedApplication, setSelectedApplication] =
  useState<Application | null>(null);


    useEffect(() => {
  const loadApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setApplications(data);
  };

  loadApplications();
}, []);

const events = applications
  .map((app) => {
  let date = app.applied_date;
  let color = "#3B82F6";
  let title = `${app.company_name} · Applied`;

  switch (app.status) {
    case "OA":
      date = app.oa_date || app.applied_date;
      color = "#B16CFF";
      title = `${app.company_name} · OA`;
      break;

    case "Interview":
      date = app.interview_date || app.oa_date || app.applied_date;
      color = "#F4B740";
      title = `${app.company_name} · Interview`;
      break;

    case "Offer":
      date =
        app.interview_date ||
        app.oa_date ||
        app.applied_date;
      color = "#22C55E";
      title = `${app.company_name} · Offer`;
      break;

    case "Rejected":
      date =
        app.interview_date ||
        app.oa_date ||
        app.applied_date;
      color = "#EF4444";
      title = `${app.company_name} · Rejected`;
      break;
  }

if (!date) return null;

return {
  title,
  date,
  color,
};
})
.filter((event) => event !== null);


const formatDate = (date: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Calendar
        </h2>

        <p className="text-slate-400 mt-2">
          Track interviews and application dates.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-700 bg-[#1E293B] p-6">


        <div className="flex gap-6 mb-5 text-sm text-slate-300">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
    Applied
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
    OA
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
    Interview
  </div>

  <div className="flex items-center gap-2">
  <span className="w-3 h-3 rounded-full bg-green-500"></span>
  Offer
</div>

<div className="flex items-center gap-2">
  <span className="w-3 h-3 rounded-full bg-red-500"></span>
  Rejected
</div>
</div>


        <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  events={events}
  height="600px"
  eventClick={(info) => {
    const app = applications.find(
      (a) => a.company_name === info.event.title.split(" · ")[0]
    );

    if (app) {
      setSelectedApplication(app);
    }
  }}
/>
      </div>



      {selectedApplication && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#1E293B] rounded-2xl p-8 w-[450px] border border-slate-700">

      <div className="flex items-center gap-3">
  

  <div>
    <h2 className="text-2xl font-bold text-white">
      {selectedApplication.company_name}
    </h2>

    <p className="text-slate-400">
      Application Details
    </p>
  </div>
</div>

      <div className="space-y-3 mt-6 text-slate-300">

        <p>
          <span className="font-semibold text-white">
            Role:
          </span>{" "}
          {selectedApplication.role}
        </p>

        <div className="flex items-center gap-3">
  <span className="font-semibold text-white">
    Status:
  </span>

  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
      selectedApplication.status
    )}`}
  >
    {selectedApplication.status}
  </span>
</div>

        <p>
          <span className="font-semibold text-white">
            Package:
          </span>{" "}
          {selectedApplication.package} LPA
        </p>

        <p>
          <span className="font-semibold text-white">
            Applied:
          </span>{" "}
          {formatDate(selectedApplication.applied_date)}
        </p>

        <p>
          <span className="font-semibold text-white">
            OA:
          </span>{" "}
          {formatDate(selectedApplication.oa_date)}
        </p>

        <p>
          <span className="font-semibold text-white">
            Interview:
          </span>{" "}
          {formatDate(selectedApplication.interview_date)}
        </p>

        <div>
  <p className="font-semibold text-white mb-2">
    Notes
  </p>

  <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-3 text-slate-300">
    {selectedApplication.notes || "No notes added."}
  </div>
</div>

      </div>

      <button
        onClick={() => setSelectedApplication(null)}
        className="mt-8 w-full bg-[#D1A0D0] text-[#28445D] py-3 rounded-xl font-semibold hover:bg-[#c98fc8]"
      >
        Close
      </button>

    </div>
  </div>
)}



    </>
  );
}