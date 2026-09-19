import { ArrowRight, PackageSearch, Search } from "lucide-react";
import { useState } from "react";

export default function TrackingSearch({ loading, onTrack }) {
  const [trackingNumber, setTrackingNumber] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const value = trackingNumber.trim().toUpperCase();
    if (value) onTrack(value);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 sm:flex">
            <PackageSearch className="h-5 w-5 text-slate-600" />
          </div>
          <label className="sr-only" htmlFor="tracking-number">
            Consignment number
          </label>
          <input
            id="tracking-number"
            value={trackingNumber}
            onChange={(event) => setTrackingNumber(event.target.value)}
            placeholder="Enter consignment number"
            autoComplete="off"
            className="h-12 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
          />
          <button
            type="submit"
            disabled={loading || !trackingNumber.trim()}
            className="flex h-12 shrink-0 items-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
          >
            {loading ? "Tracking…" : "Track"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Search className="h-3.5 w-3.5" />
        <span>Enter your 13-character India Post consignment number</span>
      </div>
    </form>
  );
}
