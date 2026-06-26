import {
  BriefcaseBusiness,
  CalendarDays,
  ChartColumnIncreasing,
} from "lucide-react";

export default function Features() {
  const features = [
  {
    title: "Track Applications",
    description:
      "Keep all your placement applications organized in one place and never lose track of opportunities.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Never Miss Deadlines",
    description:
      "Track OA dates, interview schedules, and application deadlines with ease.",
    icon: CalendarDays,
  },
  {
    title: "Monitor Progress",
    description:
      "Visualize your journey from application to offer with clear status tracking.",
    icon: ChartColumnIncreasing,
  },
];

  return (
    <section
  id="features"
  className="py-28 px-6"
>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#D1A0D0] font-semibold mb-3">
            BUILT FOR STUDENTS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
  Your Placement Journey,
  <br />
  Simplified.
</h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Stay organized, focused, and prepared throughout your placement journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
  const Icon = feature.icon;

  return (
    <div
      key={feature.title}
      className="
        bg-white/5
        backdrop-blur-md
        border
        border-white/10
        rounded-3xl
        p-6
        hover:-translate-y-2
        hover:border-[#D1A0D0]
        transition-all
        duration-300
        group
      "
    >
      <div
        className="
        mb-6
        w-14
        h-14
        rounded-xl
        flex
        items-center
        justify-center
        bg-[#719DBC]/10
        border
        border-[#719DBC]/20
        group-hover:border-[#D1A0D0]
        transition-all
      "
      >
        <Icon
          size={28}
          className="
          text-[#719DBC]
          group-hover:text-[#D1A0D0]
          transition-all
        "
        />
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        {feature.title}
      </h3>

      <p className="text-slate-300 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
})}
        </div>
      </div>
    </section>
  );
}