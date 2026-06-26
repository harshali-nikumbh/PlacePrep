import {
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Trophy,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: BriefcaseBusiness,
      title: "Add Applications",
      description:
        "Add companies, roles, deadlines, and notes in seconds.",
      color: "#719DBC",
    },
    {
      icon: ChartColumnIncreasing,
      title: "Track Progress",
      description:
        "Track every stage from application to final offer.",
      color: "#719DBC",
    },
    {
      icon: Trophy,
      title: "Get Placed",
      description:
        "Stay focused, prepared, and placement-ready.",
      color: "#D1A0D0",
    },
  ];

  return (
    <section
  id="how-it-works"
  className="relative py-28 px-6 overflow-hidden"
>
        <div
  className="
  absolute
  top-0
  left-1/2
  -translate-x-1/2
  w-[500px]
  h-[200px]
  bg-[#D1A0D0]/10
  blur-[120px]
  rounded-full
  -z-10
  "
/>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-20">
          <p className="text-[#D1A0D0] font-semibold mb-3">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl md:text-[3.2rem] font-bold text-white">
            Stay Organized
            <br />
            Throughout Placement Season
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            From application tracking to offer management,
            PlacePrep keeps everything organized.
          </p>
        </div>

        {/* Steps */}

        <div className="grid md:grid-cols-3 gap-8 relative">
            <div
  className="
  hidden
  md:block
  absolute
  top-[95px]
  left-[20%]
  right-[20%]
  h-[2px]
  bg-gradient-to-r
  from-[#719DBC]
  to-[#D1A0D0]
  opacity-30
  "
/>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="
                relative
                bg-[#1E293B]/60
                backdrop-blur-md
                border
                border-white/10
                rounded-3xl
                p-8
                text-center
                hover:-translate-y-2
                hover:border-[#719DBC]/30
                hover:shadow-xl
                hover:shadow-[#719DBC]/10
                transition-all
                duration-300
                "
              >
                <div
                  className="
                  w-14
                  h-14
                  mx-auto
                  mb-6
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  border
                  "
                  style={{
                    borderColor: step.color,
                    backgroundColor: `${step.color}20`,
                  }}
                >
                  <Icon
                    size={32}
                    style={{ color: step.color }}
                  />
                </div>

                <div
                  className="
                  w-8
                  h-8
                  text-sm
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-white
                  mx-auto
                  mb-5
                  "
                  style={{
                    backgroundColor: step.color,
                  }}
                >
                  {index + 1}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}