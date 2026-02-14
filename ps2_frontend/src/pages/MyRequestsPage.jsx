import { useState } from "react";
import { sentRequests } from "../data/requests";

const statusConfig = {
  pending:   { label: "Pending",   color: "text-amber-600 bg-amber-50 border-amber-200",   dot: "bg-amber-400",   icon: "⏳" },
  approved:  { label: "Approved",  color: "text-emerald-600 bg-emerald-50 border-emerald-200", dot: "bg-emerald-400", icon: "✅" },
  declined:  { label: "Declined",  color: "text-red-500 bg-red-50 border-red-200",           dot: "bg-red-400",     icon: "❌" },
  completed: { label: "Reviewed",  color: "text-violet-600 bg-violet-50 border-violet-100",  dot: "bg-violet-400",  icon: "⭐" },
};

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function RequestCard({ req, onViewReview }) {
  const s = statusConfig[req.status];
  return (
    <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden hover:shadow-md hover:shadow-violet-100 transition-all">
      <div className="p-4 flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img src={req.reviewerAvatar} alt={req.reviewerName} className="w-12 h-12 rounded-xl object-cover" />
          <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${s.dot}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-slate-800 text-sm">{req.reviewerName}, {req.reviewerAge}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.color}`}>
              {s.icon} {s.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <IconPin />{req.reviewerCity} · {req.reviewerOccupation}
          </p>
          <p className="text-[10px] text-slate-300 mt-0.5">Sent {timeAgo(req.sentAt)}</p>
        </div>

        {/* Action */}
        <div className="flex-shrink-0">
          {req.status === "completed" && (
            <button
              onClick={() => onViewReview(req)}
              className="flex items-center gap-1.5 text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl hover:bg-violet-100 transition-all"
            >
              <IconEye /> View
            </button>
          )}
          {req.status === "pending" && (
            <button className="flex items-center gap-1.5 text-xs font-semibold text-red-400 border border-red-100 bg-red-50 px-3 py-1.5 rounded-xl hover:bg-red-100 transition-all">
              <IconTrash /> Cancel
            </button>
          )}
          {req.status === "approved" && (
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              Awaiting review
            </span>
          )}
          {req.status === "declined" && (
            <span className="text-xs text-slate-400 font-medium">Declined</span>
          )}
        </div>
      </div>

      {/* Progress bar for approved */}
      {req.status === "approved" && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full animate-pulse" />
            </div>
            <span>Review in progress</span>
          </div>
        </div>
      )}

      {/* Message if sent */}
      {req.message && (
        <div className="px-4 pb-3">
          <p className="text-xs text-slate-500 italic bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
            "{req.message}"
          </p>
        </div>
      )}
    </div>
  );
}

export default function MyRequestsPage({ onViewReview }) {
  const [filter, setFilter] = useState("all");

  const counts = {
    all:       sentRequests.length,
    pending:   sentRequests.filter((r) => r.status === "pending").length,
    approved:  sentRequests.filter((r) => r.status === "approved").length,
    completed: sentRequests.filter((r) => r.status === "completed").length,
    declined:  sentRequests.filter((r) => r.status === "declined").length,
  };

  const filtered = filter === "all" ? sentRequests : sentRequests.filter((r) => r.status === filter);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Review Requests</h1>
        <p className="text-sm text-slate-400 mt-0.5">Track requests you've sent to potential reviewers</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { key: "pending",   label: "Pending",   color: "text-amber-600",   bg: "bg-amber-50 border-amber-100" },
          { key: "approved",  label: "Approved",  color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { key: "completed", label: "Reviewed",  color: "text-violet-600",  bg: "bg-violet-50 border-violet-100" },
          { key: "declined",  label: "Declined",  color: "text-red-400",     bg: "bg-red-50 border-red-100" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(filter === s.key ? "all" : s.key)}
            className={`rounded-2xl border p-3 text-center transition-all ${s.bg} ${filter === s.key ? "ring-2 ring-violet-400 ring-offset-1" : "hover:opacity-80"}`}
          >
            <p className={`text-2xl font-black ${s.color}`}>{counts[s.key]}</p>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-5">
        {["all", "pending", "approved", "completed", "declined"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              filter === f
                ? "bg-violet-500 text-white shadow-sm shadow-violet-200"
                : "bg-white text-slate-500 border border-violet-200 hover:border-violet-400 hover:text-violet-600"
            }`}
          >
            {f} {f !== "all" && `(${counts[f]})`}
          </button>
        ))}
      </div>

      {/* Request list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((req) => (
            <RequestCard key={req.id} req={req} onViewReview={onViewReview} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-4 border border-violet-100 text-2xl">📭</div>
          <p className="font-semibold text-slate-600 mb-1">No requests here</p>
          <p className="text-sm text-slate-400">Go to Discover and send a review request!</p>
        </div>
      )}
    </div>
  );
}
