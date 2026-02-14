import { useState } from "react";
import { receivedReviews, myProfileVersions } from "../data/requests";

const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconChevronDown = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconStar = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function RatingBar({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-slate-500 w-36 flex-shrink-0">{label}</p>
      <div className="flex-1 h-1.5 bg-violet-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="text-xs font-bold text-violet-600 w-5 text-right">{value}</span>
    </div>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const avg = (Object.values(review.ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1);
  const starFilled = Math.round(parseFloat(avg) / 2);

  return (
    <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden">
      {/* Reviewer header */}
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="font-bold text-slate-800">{review.reviewerName}, {review.reviewerAge}</p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= starFilled ? "text-amber-400" : "text-slate-200"}>
                  <IconStar filled={s <= starFilled} />
                </span>
              ))}
              <span className="text-sm font-black text-slate-700 ml-1">{avg}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-medium">
              {new Date(review.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* First impression */}
        <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 mb-4">
          <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1.5">First Impression</p>
          <p className="text-sm text-slate-600 leading-relaxed italic">"{review.firstImpression}"</p>
        </div>

        {/* Ratings compact */}
        <div className="space-y-2 mb-4">
          {Object.entries(review.ratings).map(([key, val]) => (
            <RatingBar key={key} label={key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())} value={val} />
          ))}
        </div>

        {/* Traits row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {review.perceivedTraits.map((t) => (
            <span key={t} className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-100 rounded-xl py-2 hover:bg-violet-100 transition-all"
        >
          {expanded ? "Show less" : "See full review"} <IconChevronDown open={expanded} />
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-violet-100 divide-y divide-violet-50">
          {/* Niche appeal */}
          <div className="px-5 py-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Strong appeal for</p>
              <div className="flex flex-wrap gap-1.5">
                {review.nicheAppeal.strongFor.map((n) => (
                  <span key={n} className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">✓ {n}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Weak appeal for</p>
              <div className="flex flex-wrap gap-1.5">
                {review.nicheAppeal.weakFor.map((n) => (
                  <span key={n} className="text-xs font-semibold text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">✗ {n}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">↑ Strengths</p>
            <ul className="space-y-1.5">
              {review.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">●</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">↓ Weaknesses</p>
            <ul className="space-y-1.5">
              {review.weaknesses.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">●</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">✦ Actionable Suggestions</p>
            <ul className="space-y-2">
              {review.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                  <span className="text-amber-500 font-black text-xs mt-0.5 flex-shrink-0">{i + 1}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{s}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo suggestion */}
          {review.photoOrderSuggestion && (
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">📸 Suggested Photo Order</p>
              <div className="flex gap-2 items-center">
                {review.photoOrderSuggestion.map((idx, pos) => (
                  <div key={pos} className="flex items-center gap-1.5">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-xs font-bold text-violet-500">
                        Photo {idx + 1}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">#{pos + 1}</p>
                    </div>
                    {pos < review.photoOrderSuggestion.length - 1 && (
                      <span className="text-violet-300 text-lg">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Profile Version Card ────────────────────────────────────────────────────
function VersionCard({ version, isLatest }) {
  return (
    <div className={`bg-white rounded-xl border p-4 flex items-center gap-3 ${isLatest ? "border-violet-300 shadow-sm shadow-violet-100" : "border-violet-100"}`}>
      <img src={version.photos[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-slate-700">v{version.version} — {version.label}</p>
          {isLatest && <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-full">Latest</span>}
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{version.bio}</p>
      </div>
      <div className="text-right flex-shrink-0">
        {version.avgScore ? (
          <p className="text-lg font-black text-violet-600">{version.avgScore}</p>
        ) : (
          <p className="text-xs text-slate-400 font-medium">Pending</p>
        )}
        <p className="text-[10px] text-slate-400">{version.reviewCount} review{version.reviewCount !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ReceivedReviewsPage({ onSubmitNewVersion }) {
  const avgAll = receivedReviews.length > 0
    ? (receivedReviews.reduce((sum, r) => sum + parseFloat((Object.values(r.ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1)), 0) / receivedReviews.length).toFixed(1)
    : "—";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Reviews</h1>
        <p className="text-sm text-slate-400 mt-0.5">Feedback you've received on your dating profile</p>
      </div>

      {/* Summary banner */}
      <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-5 text-white flex items-center gap-6">
        <div className="text-center flex-shrink-0">
          <p className="text-5xl font-black">{avgAll}</p>
          <p className="text-white/70 text-xs mt-1">Overall score</p>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <IconTrend />
            <p className="text-sm font-semibold">Profile improving over time</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/15 rounded-xl py-2">
              <p className="font-black text-lg">{receivedReviews.length}</p>
              <p className="text-[10px] text-white/70">Reviews</p>
            </div>
            <div className="bg-white/15 rounded-xl py-2">
              <p className="font-black text-lg">{myProfileVersions.length}</p>
              <p className="text-[10px] text-white/70">Versions</p>
            </div>
            <div className="bg-white/15 rounded-xl py-2">
              <p className="font-black text-lg">4</p>
              <p className="text-[10px] text-white/70">Sent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile versions / iteration tracker */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Profile Versions</h2>
          <button
            onClick={onSubmitNewVersion}
            className="flex items-center gap-1.5 text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl hover:bg-violet-100 transition-all"
          >
            <IconPlus /> New Version
          </button>
        </div>
        <div className="space-y-2">
          {myProfileVersions.map((v, i) => (
            <VersionCard key={v.id} version={v} isLatest={i === myProfileVersions.length - 1} />
          ))}
        </div>
      </div>

      {/* Reviews received */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
          Feedback Received ({receivedReviews.length})
        </h2>
        {receivedReviews.length > 0 ? (
          <div className="space-y-4">
            {receivedReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-violet-100">
            <div className="text-4xl mb-3">⭐</div>
            <p className="font-semibold text-slate-600 mb-1">No reviews yet</p>
            <p className="text-sm text-slate-400">Send review requests from the Discover page to get feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
}
