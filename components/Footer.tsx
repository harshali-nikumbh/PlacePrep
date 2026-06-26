export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">
              <span className="text-white">Place</span>
              <span className="text-[#D1A0D0]">Prep</span>
            </h3>

            <p className="text-slate-500 mt-2 text-sm">
              Built for students preparing for placements.
            </p>
          </div>

          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition">
              Features
            </a>

            <a href="#" className="hover:text-white transition">
              How It Works
            </a>

            <a href="#" className="hover:text-white transition">
              Login
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          © 2026 PlacePrep. All rights reserved.
        </div>
      </div>
    </footer>
  );
}