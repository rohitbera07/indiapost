import { AlertCircle, ArrowUpRight, Globe2, LoaderCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import TrackingResult from "./components/TrackingResult";
import TrackingSearch from "./components/TrackingSearch";
import { trackArticle } from "./services/trackingApi";

function App() {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(trackingNumber) {
    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const response = await trackArticle(trackingNumber);
      // The India Post response will be normalized by the backend once its UAT schema is available.
      setTrackingData(response.data || response);
    } catch (requestError) {
      setError(requestError.message || "Unable to fetch tracking information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950">
              <Globe2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">TrackPost</p>
              <p className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:block">Shipment intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure tracking
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-20">
        <section className="mx-auto max-w-3xl pt-20 text-center sm:pt-28">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> India Post tracking
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl">
            Track your mail.<br /><span className="text-slate-400">Know where it is.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Enter your consignment number to view the latest shipment status, location and delivery history.
          </p>
          <div className="mt-10"><TrackingSearch loading={loading} onTrack={handleTrack} /></div>
        </section>

        {loading && (
          <div className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-2 text-sm text-slate-500">
            <LoaderCircle className="h-5 w-5 animate-spin" /> Contacting the tracking service…
          </div>
        )}
        {error && (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            <div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><p className="font-semibold">Tracking unavailable</p><p className="mt-1 text-red-600/80">{error}</p></div></div>
          </div>
        )}
        {trackingData && <div className="mx-auto mt-12 max-w-3xl"><TrackingResult data={trackingData} /></div>}
        {!trackingData && !loading && !error && (
          <div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><ArrowUpRight className="h-5 w-5 text-slate-400" /></div>
            <p className="mt-4 text-sm font-semibold text-slate-700">Enter a consignment number above</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Your tracking information will appear here.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-center text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left"><p>TrackPost · Shipment tracking interface</p><p>Data provided through the configured tracking service.</p></div></footer>
    </div>
  );
}

export default App;
