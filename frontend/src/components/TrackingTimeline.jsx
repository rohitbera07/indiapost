import { CheckCircle2, Circle } from "lucide-react";

export default function TrackingTimeline({ events = [] }) {
  if (!events.length) return null;

  return (
    <section className="mt-8">
      <h3 className="mb-6 text-sm font-semibold text-slate-900">Tracking history</h3>
      <div>
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <div className="relative flex gap-4" key={`${event.date}-${index}`}>
              <div className="relative flex flex-col items-center">
                {index === 0 ? (
                  <CheckCircle2 className="relative z-10 h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="relative z-10 h-5 w-5 text-slate-300" />
                )}
                {!isLast && <div className="absolute top-5 h-full w-px bg-slate-200" />}
              </div>
              <div className="pb-7">
                <p className="text-sm font-semibold text-slate-900">{event.description}</p>
                {event.office && <p className="mt-1 text-sm text-slate-500">{event.office}</p>}
                {event.date && <p className="mt-1 text-xs text-slate-400">{event.date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
