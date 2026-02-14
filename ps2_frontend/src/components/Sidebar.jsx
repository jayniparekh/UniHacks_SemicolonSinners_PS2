import { currentUser } from "../data/profiles";
import {
  IconCompass, IconHeart, IconMessage, IconStar,
  IconSettings, IconChevronRight,
} from "../components/Icons";

const IconInbox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);
const IconRequests = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
  </svg>
);
const IconReviews = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const NAV_ITEMS = [
  { id: "discover",   label: "Discover",        icon: <IconCompass /> },
  { id: "matches",    label: "Matches",          icon: <IconHeart />, badge: 3 },
  { id: "messages",   label: "Messages",         icon: <IconMessage /> },
  { id: "superlikes", label: "Super Likes",      icon: <IconStar /> },
];

const REVIEW_NAV = [
  { id: "inbox",      label: "Review Inbox",     icon: <IconInbox />,    badge: 2 },
  { id: "requests",   label: "My Requests",      icon: <IconRequests /> },
  { id: "reviews",    label: "My Reviews",       icon: <IconReviews /> },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-violet-100 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-200">
            <IconHeart filled />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">Spark</span>
        </div>
      </div>

      {/* Boost */}
      <div className="px-4 mb-5">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-600 font-semibold text-sm hover:bg-fuchsia-100 transition-colors">
          <span>⚡</span><span>Boost Profile</span>
        </button>
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 overflow-y-auto">
        {/* Discover section */}
        <p className="px-3 text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-2">Menu</p>
        <ul className="space-y-0.5 mb-5">
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-violet-50 text-violet-600" : "text-slate-500 hover:bg-violet-50 hover:text-violet-600"}`}
                >
                  <span className={active ? "text-violet-500" : "text-slate-400"}>{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-violet-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Reviews section */}
        <p className="px-3 text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-2">Reviews</p>
        <ul className="space-y-0.5 mb-5">
          {REVIEW_NAV.map((item) => {
            const active = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-violet-50 text-violet-600" : "text-slate-500 hover:bg-violet-50 hover:text-violet-600"}`}
                >
                  <span className={active ? "text-violet-500" : "text-slate-400"}>{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-fuchsia-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Filters */}
        <div className="px-3">
          <p className="text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-4">Filters</p>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-600">Distance</span>
                <span className="font-semibold text-violet-500">10 km</span>
              </div>
              <div className="relative h-1.5 bg-violet-100 rounded-full">
                <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-violet-500 rounded-full shadow-sm" style={{ left: "calc(40% - 7px)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-600">Age Range</span>
                <span className="font-semibold text-violet-500">22–30</span>
              </div>
              <div className="relative h-1.5 bg-violet-100 rounded-full">
                <div className="absolute top-0 h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" style={{ left: "20%", right: "30%" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-violet-500 rounded-full shadow-sm" style={{ left: "calc(20% - 7px)" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-violet-500 rounded-full shadow-sm" style={{ left: "calc(70% - 7px)" }} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 mt-4 space-y-0.5 border-t border-violet-50 pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-colors">
          <span className="text-slate-400"><IconSettings /></span>Settings
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-violet-50 cursor-pointer transition-colors">
          <div className="relative">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-100" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-400">{currentUser.plan}</p>
          </div>
          <span className="text-violet-200"><IconChevronRight /></span>
        </div>
      </div>
    </aside>
  );
}
