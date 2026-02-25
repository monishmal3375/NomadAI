import LoginForm from "../../components/LoginForm";
import PlaneBanner from "../../components/PlaneBanner";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sky background */}
      <div className="absolute inset-0 sky-bg" />

      {/* Plane flying across */}
      <PlaneBanner />

      {/* Soft clouds */}
      <div className="absolute -top-24 -left-32 h-72 w-72 rounded-full bg-white/55 blur-3xl" />
      <div className="absolute top-24 -right-40 h-96 w-96 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute bottom-[-120px] left-24 h-[520px] w-[520px] rounded-full bg-white/40 blur-3xl" />

      {/* Arc lines like the reference */}
      <svg
        className="absolute inset-0 opacity-30 pointer-events-none"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 750 C 250 520, 450 520, 750 750"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.35"
        />
        <path
          d="M150 820 C 450 560, 650 560, 950 820"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.25"
        />
        <path
          d="M450 840 C 720 610, 880 610, 1150 840"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.18"
        />
      </svg>

      {/* Centered card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[460px] rounded-[32px] glass elevated-strong border border-white/50 overflow-hidden">
          <div className="px-10 pt-10 pb-8 text-center">
            {/* Logo square */}
            <div className="mx-auto h-14 w-14 rounded-2xl bg-white/70 border border-white/50 elevated flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-slate-900"
              >
                <path
                  d="M10 17l5-5-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12h11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="mt-5 text-2xl font-semibold text-slate-900">
              Sign in to NomadAI
            </h1>
            <p className="mt-2 text-slate-600">
              Plan trips using live weather + currency + budget-aware suggestions.
            </p>
          </div>

          <div className="px-10 pb-10">
            <LoginForm />

            <div className="mt-6 text-center text-xs text-slate-500">
              By continuing, you agree to our{" "}
              <span className="text-slate-700 underline decoration-slate-300">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-slate-700 underline decoration-slate-300">
                Privacy
              </span>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
