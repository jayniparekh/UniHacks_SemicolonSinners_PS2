import { useState } from "react";

const IconX = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function RequestReviewModal({ reviewer, onClose, onSend }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (onSend) onSend({ reviewerId: reviewer.id, message });
    setSent(true);
  };

  if (!reviewer) return null;

  // ── Success state ──────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-violet-200" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200 text-white">
            <IconCheck />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Request Sent!</h2>
          <p className="text-sm text-slate-500 mb-1 leading-relaxed">
            Your review request has been sent to <strong>{reviewer.name}</strong>.
          </p>
          <p className="text-xs text-slate-400 mb-6">You'll be notified when they accept or decline.</p>
          <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 flex items-center gap-2 mb-6">
            <span className="text-violet-500"><IconShield /></span>
            <p className="text-xs text-violet-600 font-medium">Your profile is shared privately — only visible to reviewers you choose.</p>
          </div>
          <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-md shadow-violet-200">
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── Main modal ─────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl shadow-violet-200 w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-violet-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Request a Review</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-violet-200 text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
              <IconX size={14} />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Ask this person to review your dating profile</p>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Reviewer card */}
          <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-2xl border border-violet-100">
            <div className="relative">
              <img src={reviewer.photos[0]} alt={reviewer.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-violet-200" />
              {reviewer.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800">{reviewer.name}, {reviewer.age}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <IconPin />{reviewer.city}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{reviewer.occupation}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-violet-600 bg-white border border-violet-200 px-2.5 py-1 rounded-full">
                {reviewer.gender}
              </p>
            </div>
          </div>

          {/* Interests */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Their Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {reviewer.interests.map((tag) => (
                <span key={tag} className="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Why this matters */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-4 border border-violet-100 space-y-2">
            <p className="text-xs font-bold text-violet-700 uppercase tracking-wider">Why ask them?</p>
            <div className="space-y-1.5">
              {[
                { icon: "🎯", text: "Unknown to you — unbiased perspective" },
                { icon: "🔒", text: "Your profile is shared privately with them only" },
                { icon: "⭐", text: "Structured feedback, not just opinions" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <p className="text-xs text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optional message */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
              Add a message <span className="text-slate-300 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hey ${reviewer.name}! Would love an honest take on my profile...`}
              rows={3}
              maxLength={200}
              className="w-full text-sm text-slate-700 bg-white border border-violet-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400"
            />
            <p className="text-right text-[10px] text-slate-400 mt-1">{message.length}/200</p>
          </div>

          {/* Privacy note */}
          <div className="flex items-start gap-2.5 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2.5">
            <span className="text-indigo-500 mt-0.5 flex-shrink-0"><IconShield /></span>
            <p className="text-xs text-indigo-600 leading-relaxed">
              <strong>Private by default.</strong> {reviewer.name} can only see your profile if they accept. They cannot share or screenshot it.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-violet-200 text-slate-600 font-semibold text-sm hover:bg-violet-50 transition-all">
            Cancel
          </button>
          <button onClick={handleSend} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2">
            <IconSend /> Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
