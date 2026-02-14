import { useState } from "react";
import { incomingRequests } from "../data/requests";

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconX = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Preview modal before approving ────────────────────────────────────────────
function ProfilePreviewModal({ request, onApprove, onDecline, onClose }) {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-violet-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Review Request</h3>
            <p className="text-xs text-slate-400 mt-0.5">from {request.requesterName}, {request.requesterAge}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-violet-200 text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
            <IconX size={14} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Profile snippet */}
          <div>
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">Profile Preview</p>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900" style={{ aspectRatio: "4/3" }}>
              <img src={request.profileSnippet.photos[activePhoto]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-xl">{request.requesterName}, {request.requesterAge}</p>
                <p className="text-white/70 text-sm flex items-center gap-1 mt-0.5"><IconPin />{request.requesterCity}</p>
              </div>
              {/* Photo dots */}
              {request.profileSnippet.photos.length > 1 && (
                <div className="absolute bottom-3 right-3 flex gap-1">
                  {request.profileSnippet.photos.map((_, i) => (
                    <button key={i} onClick={() => setActivePhoto(i)} className={`h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-white w-4" : "bg-white/50 w-1.5"}`} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bio snippet */}
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1.5">Bio</p>
            <p className="text-sm text-slate-600 leading-relaxed">{request.profileSnippet.bio}</p>
          </div>

          {/* Looking for */}
          <div className="flex items-center gap-2 bg-fuchsia-50 border border-fuchsia-100 rounded-xl px-4 py-3">
            <span className="text-lg">💫</span>
            <div>
              <p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">Looking for</p>
              <p className="text-sm font-semibold text-fuchsia-700">{request.profileSnippet.lookingFor}</p>
            </div>
          </div>

          {/* Message from requester */}
          {request.message && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Their message</p>
              <p className="text-sm text-slate-600 italic">"{request.message}"</p>
            </div>
          )}

          {/* What you're committing to */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl p-4 border border-violet-100">
            <p className="text-xs font-bold text-violet-700 mb-2">If you accept, you'll:</p>
            <ul className="space-y-1.5">
              {["See their full profile privately", "Submit structured feedback (photos, bio, traits)", "Receive a thank-you notification when done"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-violet-400 flex-shrink-0"><IconCheck /></span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={() => onDecline(request.id)}
            className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <IconX size={14} /> Decline
          </button>
          <button
            onClick={() => onApprove(request.id)}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2"
          >
            <IconCheck /> Accept & Review
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Inbox Page ────────────────────────────────────────────────────────────
export default function InboxPage({ onStartReview }) {
  const [requests, setRequests] = useState(incomingRequests);
  const [previewRequest, setPreviewRequest] = useState(null);
  const [filter, setFilter] = useState("pending");

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const handleApprove = (id) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" } : r));
    const req = requests.find((r) => r.id === id);
    setPreviewRequest(null);
    if (onStartReview && req) onStartReview(req);
  };

  const handleDecline = (id) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "declined" } : r));
    setPreviewRequest(null);
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800">Review Inbox</h1>
            {pendingCount > 0 && (
              <span className="bg-fuchsia-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-0.5">People asking you to review their profiles</p>
        </div>
      </div>

      {/* Hero banner for pending */}
      {pendingCount > 0 && (
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-5 text-white mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📬</div>
          <div>
            <p className="font-bold">You have {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}!</p>
            <p className="text-white/75 text-xs mt-0.5">Help someone improve their dating profile with honest feedback.</p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "pending",  label: `Pending (${requests.filter(r => r.status === "pending").length})` },
          { key: "approved", label: "In Progress" },
          { key: "declined", label: "Declined" },
          { key: "all",      label: "All" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === f.key
                ? "bg-violet-500 text-white shadow-sm shadow-violet-200"
                : "bg-white text-slate-500 border border-violet-200 hover:border-violet-400 hover:text-violet-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Request cards */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden hover:shadow-md hover:shadow-violet-100 transition-all"
            >
              <div className="p-4 flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img src={req.requesterAvatar} alt={req.requesterName} className="w-12 h-12 rounded-xl object-cover" />
                  {req.status === "pending" && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] text-white font-black">!</span>
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm">{req.requesterName}, {req.requesterAge}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <IconPin />{req.requesterCity} · {req.requesterOccupation}
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Received {timeAgo(req.receivedAt)}</p>
                </div>

                {/* Status + action */}
                <div className="flex-shrink-0">
                  {req.status === "pending" && (
                    <button
                      onClick={() => setPreviewRequest(req)}
                      className="flex items-center gap-1.5 text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 rounded-xl hover:opacity-90 transition-all shadow-sm shadow-violet-200"
                    >
                      View <IconChevronRight />
                    </button>
                  )}
                  {req.status === "approved" && (
                    <button
                      onClick={() => onStartReview && onStartReview(req)}
                      className="flex items-center gap-1.5 text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl hover:bg-violet-100 transition-all"
                    >
                      <IconStar /> Write Review
                    </button>
                  )}
                  {req.status === "declined" && (
                    <span className="text-xs text-slate-400 font-medium">Declined</span>
                  )}
                </div>
              </div>

              {/* Message preview */}
              {req.message && (
                <div className="px-4 pb-3">
                  <p className="text-xs text-slate-500 italic bg-slate-50 rounded-xl px-3 py-2 border border-slate-100 truncate">
                    "{req.message}"
                  </p>
                </div>
              )}

              {/* Profile photo strip preview */}
              {req.profileSnippet?.photos?.length > 0 && req.status === "pending" && (
                <div className="px-4 pb-3">
                  <div className="flex gap-1.5">
                    {req.profileSnippet.photos.map((ph, i) => (
                      <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border border-violet-100">
                        <img src={ph} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-xs text-violet-400 font-bold">
                      +
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-4 border border-violet-100 text-2xl">📪</div>
          <p className="font-semibold text-slate-600 mb-1">No requests here</p>
          <p className="text-sm text-slate-400">When someone requests your review, it'll appear here.</p>
        </div>
      )}

      {/* Preview modal */}
      {previewRequest && (
        <ProfilePreviewModal
          request={previewRequest}
          onApprove={handleApprove}
          onDecline={handleDecline}
          onClose={() => setPreviewRequest(null)}
        />
      )}
    </div>
  );
}
