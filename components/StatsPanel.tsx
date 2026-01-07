export default function StatsPanel() {
  return (
    <section className="h-full flex flex-col gap-6">
      <Card title="Converted Budget" value="£390" sub="$500 → GBP today" />
      <Card title="Daily Target" value="£130" sub="3 days split" />
      <Card title="Weather" value="Rain Day 2" sub="Suggest indoor plans" />
      <div className="rounded-3xl glass elevated premium-hover p-6 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">Export / Save</div>
          <div className="text-sm text-slate-500 mt-2">
            Save your itinerary or export to PDF.
          </div>
        </div>

        <button className="mt-6 h-11 rounded-2xl bg-slate-900 text-white text-sm font-medium hover:opacity-95 transition">
          Export PDF
        </button>
      </div>
    </section>
  );
}

function Card({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl glass elevated premium-hover p-6">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{sub}</div>
    </div>
  );
}