export default function PlaneBanner() {
  return (
    <div className="plane-runway" aria-hidden="true">
      {/* FAR PLANE (depth) */}
      <div className="plane-far">
        <div className="contrail-far" />
        <PlaneSvg className="plane-svg-far" />
      </div>

      {/* MAIN PLANE (curved path using SVG offset-path) */}
      <div className="plane-main">
        <div className="contrail" />
        <PlaneSvg className="plane-svg" />
      </div>

      {/* faint cloud haze layer */}
      <div className="plane-haze" />
    </div>
  );
}

function PlaneSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M60.5 30.3c0-1.1-.9-2-2-2h-18l-18.2-12c-1.4-.9-3.2-.5-4.1.9l-.5.8 11 10.3H8.6c-.8 0-1.6.5-1.9 1.3l-.8 2.1 18.6 3.1-11 10.3.5.8c.9 1.4 2.7 1.8 4.1.9l18.2-12h18c1.1 0 2-.9 2-2z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M58.5 28.3h-18l-18.2-12c-1.4-.9-3.2-.5-4.1.9l10.8 10.1H8.6c-.8 0-1.6.5-1.9 1.3l-.2.6h22.8l11.4-1.9h17.8z"
        fill="rgba(255,255,255,0.60)"
      />
    </svg>
  );
}