import { CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import TrackingTimeline from "./TrackingTimeline";

const fallback = "—";

export default function TrackingResult({ data }) {
  if (!data) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                {data.status || fallback}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {data.description || "Tracking information received"}
            </h2>
            {data.updatedAt && <p className="mt-1 text-sm text-slate-500">Last updated {data.updatedAt}</p>}
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-400">CONSIGNMENT</p>
            <p className="mt-1 font-mono text-sm font-semibold text-slate-800">{data.trackingNumber || fallback}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Detail icon={<Package />} label="Service" value={data.service} />
          <Detail icon={<MapPin />} label="Current location" value={data.location} />
          <Detail icon={<Truck />} label="Destination" value={data.destination} />
        </div>

        <div className="my-8 h-px bg-slate-200" />
        <TrackingTimeline events={data.events} />
      </div>
    </section>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="h-5 w-5 text-slate-500">{icon}</div>
      <p className="mt-3 text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value || fallback}</p>
    </div>
  );
}
