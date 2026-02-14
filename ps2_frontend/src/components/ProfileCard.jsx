import { IconX, IconStar, IconPin } from "../components/Icons";

const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconRequestReview = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="15" y2="10"/><line x1="12" y1="7" x2="12" y2="13"/>
  </svg>
);

export default function ProfileCard({ profile, onClick, onRequestReview }) {
  return (
    <div
      onClick={() => onClick(profile)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-violet-100 hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* ── Photo ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <img
          src={profile.photos[0]} alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {profile.online && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Online
          </div>
        )}

        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <IconPin className="w-3 h-3" />{profile.distance}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-bold">{profile.name}, {profile.age}</h3>
          <p className="text-white/75 text-sm mt-0.5 flex items-center gap-1">
            <IconPin className="w-3 h-3 opacity-80" />{profile.city}
          </p>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-4">
        <p className="text-sm text-slate-500 mb-3">{profile.occupation}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.interests.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              #{tag}
            </span>
          ))}
        </div>

        {/* ── Request Review button ── */}
        {onRequestReview && (
          <button
            onClick={(e) => { e.stopPropagation(); onRequestReview(profile); }}
            className="w-full flex items-center justify-center gap-1.5 py-2 mb-2 rounded-xl border border-violet-200 text-violet-600 text-xs font-semibold hover:bg-violet-50 transition-all"
          >
            <IconRequestReview />
            Ask for a Review
          </button>
        )}

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all"
          >
            <IconX size="15" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(profile); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-violet-200"
          >
            <IconSend /> Connect
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-fuchsia-200 text-fuchsia-400 hover:bg-fuchsia-50 transition-all"
          >
            <IconStar />
          </button>
        </div>
      </div>
    </div>
  );
}
