"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
        return;
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
  <div className="h-screen bg-[#0F172A] flex overflow-hidden">
    <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <Topbar
  onMenuClick={() => setSidebarOpen(true)}
/>

      <main
  className="
    dashboard-scroll
    flex-1
    overflow-y-auto
    overflow-x-auto
    p-4
    md:p-8
  "
>
        {children}
      </main>
    </div>
  </div>
);
}