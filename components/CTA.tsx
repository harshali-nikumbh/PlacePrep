type CTAProps = {
  user: boolean;
  onGetStarted: () => void;
};

export default function CTA({
  user,
  onGetStarted,
}: CTAProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Glow */}
      <div
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[600px]
        h-[300px]
        bg-[#D1A0D0]/10
        blur-[140px]
        rounded-full
        "
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[#D1A0D0] font-semibold mb-4">
          READY TO START?
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
          Organize Your Entire
          <br />
          Placement Journey
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Track applications, deadlines, interviews, and offers in one place.
          Stay prepared and never miss an opportunity.
        </p>

{!user && (
  <div className="flex justify-center">
    <button
      onClick={onGetStarted}
      className="
      bg-[#D1A0D0]
      hover:bg-[#c995c8]
      hover:shadow-xl
      hover:shadow-[#D1A0D0]/20
      text-[#0F172A]
      font-semibold
      px-8
      py-4
      rounded-xl
      transition-all
      duration-300
      hover:scale-105
      "
    >
      Get Started Free
    </button>
  </div>
)}
      </div>
    </section>
  );
}