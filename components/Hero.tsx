"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";

type HeroProps = {
  user: User | null;
  onStartTracking: () => void;
};

export default function Hero({
  user,
  onStartTracking,
}: HeroProps) {

  



  return (
    <section className="relative overflow-hidden min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
      <div
  className="
  absolute
  w-[700px]
  h-[700px]
  rounded-full
  bg-gradient-to-r
  from-[#719DBC]/20
  to-[#D1A0D0]/20
  blur-[180px]
  opacity-80
"
/>
      <h1
  className="
  text-4xl
  md:text-5xl
  lg:text-5xl
  font-extrabold
  tracking-tight
  leading-[1.1]
  animate-fade-up
"
>
  <span className="text-white">
    Track Every Application.
  </span>

  <br />

  <span className="text-[#719DBC]">
    Prepare Smarter.
  </span>

  <br />

  <span className="text-white">
    Get Placed Faster.
  </span>
</h1>

      <p
  className="
  mt-6
  text-lg
  md:text-xl
  text-slate-300
  max-w-xl
  leading-relaxed
  animate-fade-up
  [animation-delay:200ms]
"
>
        Manage your placement journey in one place.
        Track applications, interview progress,
        and stay organized throughout recruitment season.
      </p>

      <div
  className="
  mt-10
  flex
  gap-4
  animate-fade-up
  [animation-delay:400ms]
"
>
        {user ? (
  <Link
    href="/dashboard"
    className="
bg-[#719DBC]
hover:bg-[#86AEC9]
hover:scale-105
active:scale-95
transition-all
duration-300
text-white
px-8
py-4
rounded-xl
font-semibold
shadow-lg
shadow-[#719DBC]/20
"
  >
    Go to Dashboard →
  </Link>
) : (
  <button
    onClick={onStartTracking}
    className="
bg-[#719DBC]
hover:bg-[#86AEC9]
hover:scale-105
active:scale-95
transition-all
duration-300
text-white
px-8
py-4
rounded-xl
font-semibold
shadow-lg
shadow-[#719DBC]/20
"
  >
    Start Tracking
  </button>
)}

        <button
  onClick={() => {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="
border
border-slate-600
hover:border-[#719DBC]
hover:bg-white/5
text-white
px-8
py-4
rounded-xl
font-semibold
transition-all
duration-300
"
>
  Learn More
</button>
      </div>
    </section>
  );
}