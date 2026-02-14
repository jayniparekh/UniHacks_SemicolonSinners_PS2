import { matches, activity } from "../data/profiles";

export default function RightPanel() {
  return (
    <aside
      className="min-h-screen bg-white border-l border-violet-100 flex flex-col shrink-0"
      style={{ width: "272px" }}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-4 border-b border-violet-100">
        <h2 className="font-bold text-slate-800 text-sm">Your Matches</h2>
        <p className="text-xs text-slate-400 mt-0.5">People who liked you back</p>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ── Matches List ── */}
        <div className="px-3 py-2 space-y-0.5">
          {matches.map((m) => (
            <button
              key={m.id}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-violet-50 transition-colors text-left"
            >
              <div className="relative shrink-0">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                {m.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-slate-700">{m.name}</span>
                  {m.time ? (
                    <span className="text-xs text-slate-400">{m.time}</span>
                  ) : m.isNew ? (
                    <span className="text-xs font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full border border-violet-100">
                      New
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-400 truncate">{m.message}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Recent Activity ── */}
        <div className="px-5 pt-4 pb-3 border-t border-violet-100 mt-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
              Recent Activity
            </h3>
            <button className="text-xs text-violet-500 font-medium hover:text-violet-700">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-full object-cover" />
                  {a.star && (
                    <span className="absolute -bottom-0.5 -right-0.5 text-xs">⭐</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-700">{a.name}</span> {a.action}
                  </p>
                  <p className="text-[10px] text-slate-400">{a.time}</p>
                </div>
                <button className={`text-xs font-semibold px-2 py-1 rounded-lg transition-colors shrink-0 ${a.btnStyle}`}>
                  {a.btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Complete Profile ── */}
        <div className="px-5 pb-3 border-t border-violet-100 mt-1 pt-4">
          <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-3">
            Complete Profile
          </h3>
          <div className="space-y-2">
            {[
              { icon: "📷", title: "Add 2 more photos",  sub: "4+ photos get 3x more matches", btn: "Upload" },
              { icon: "✅", title: "Verify your profile", sub: "Get the blue checkmark badge",   btn: "Verify" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-violet-50 rounded-xl p-3 border border-violet-100"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.sub}</p>
                </div>
                <button className="text-xs font-semibold text-violet-600 hover:text-violet-800 shrink-0">
                  {item.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Premium CTA ── */}
      <div className="p-4 border-t border-violet-100">
        <div className="bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span>👑</span>
            <span className="font-bold text-sm">Go Premium</span>
          </div>
          <p className="text-xs text-white/75 mb-3">
            See who liked you & get unlimited swipes.
          </p>
          <button className="w-full bg-white text-violet-600 font-bold text-sm py-2 rounded-xl hover:bg-violet-50 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
