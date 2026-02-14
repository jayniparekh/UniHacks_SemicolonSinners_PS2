import { useState } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const mockProfile = {
  _id: "64f1a2b3c4d5e6f7a8b9c0d1",
  name: "Sarah",
  age: 24,
  city: "Brooklyn, NY",
  gender: "Woman",
  occupation: "Designer & Art Lover",
  online: true,
  distance: "2.5 km",
  bio: "Love exploring new cafes and galleries. I believe in slow mornings, strong coffee, and good conversations. If you can recommend a hidden gem café in the city, we're already halfway to a great first date.",
  lookingFor: "Something meaningful",
  interests: ["Photography", "Travel", "Coffee", "Art"],
  photos: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
  ],
  posts: [
    { id: 1, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", caption: "Morning ritual ☕ Nothing like a slow pour-over to start the day right.", likes: 142, comments: 18, time: "2h ago" },
    { id: 2, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", caption: "Found this incredible gallery in Williamsburg — the use of negative space here is *chef's kiss*", likes: 89, comments: 24, time: "1d ago" },
    { id: 3, image: "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=400&q=80", caption: "Spring is finally here 🌸 Central Park never disappoints.", likes: 203, comments: 31, time: "3d ago" },
    { id: 4, image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80", caption: "Weekend vibes — old bookshop + rainy afternoon = perfection 📚", likes: 176, comments: 22, time: "5d ago" },
  ],
};

const TRAIT_OPTIONS = [
  "Creative", "Adventurous", "Introverted", "Extroverted", "Intellectual",
  "Artistic", "Outdoorsy", "Homebody", "Ambitious", "Laid-back",
  "Romantic", "Humorous", "Sophisticated", "Athletic", "Bookworm",
  "Foodie", "Traveler", "Career-focused", "Free-spirited", "Empathetic",
];

const NICHE_OPTIONS = [
  "Artists", "Bookworms", "Coffee lovers", "Hikers", "Foodies",
  "Gym-goers", "Tech people", "Creatives", "Introverts", "Extroverts",
  "Travelers", "Pet lovers", "Gamers", "Musicians", "Filmmakers",
];

const STEPS = ["Profile", "First Look", "Rate", "Traits", "Niche", "Feedback", "Photos", "Submit"];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const IconStar = ({ filled, half }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="15 18 9 12 15 6" />
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
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconX = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconComment = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconDrag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="9" cy="7" r="1" fill="currentColor" /><circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="9" cy="17" r="1" fill="currentColor" />
    <circle cx="15" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="17" r="1" fill="currentColor" />
  </svg>
);
const IconSparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

/** Numeric 1–10 slider with glow */
function RatingSlider({ label, value, onChange, color = "violet" }) {
  const colorMap = {
    violet: { track: "from-violet-400 to-fuchsia-400", thumb: "border-violet-500", text: "text-violet-600", bg: "bg-violet-50" },
    fuchsia: { track: "from-fuchsia-400 to-pink-400", thumb: "border-fuchsia-500", text: "text-fuchsia-600", bg: "bg-fuchsia-50" },
    indigo: { track: "from-indigo-400 to-violet-400", thumb: "border-indigo-500", text: "text-indigo-600", bg: "bg-indigo-50" },
  };
  const c = colorMap[color] || colorMap.violet;
  const pct = ((value - 1) / 9) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className={`text-lg font-bold ${c.text} ${c.bg} px-2.5 py-0.5 rounded-lg min-w-[2.5rem] text-center`}>
          {value}
        </span>
      </div>
      <div className="relative h-2 bg-violet-100 rounded-full">
        <div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${c.track} rounded-full transition-all`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={1} max={10} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 ${c.thumb} rounded-full shadow-md pointer-events-none transition-all`}
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
        <span>1</span><span>5</span><span>10</span>
      </div>
    </div>
  );
}

/** Pill toggle for multi-select */
function TogglePill({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
        selected
          ? "bg-violet-500 text-white border-violet-500 shadow-sm shadow-violet-200"
          : "bg-white text-slate-500 border-violet-200 hover:border-violet-400 hover:text-violet-600"
      }`}
    >
      {selected && <span className="mr-1">✓</span>}
      {label}
    </button>
  );
}

/** Text input for adding free-text array items */
function TagInput({ placeholder, items, onAdd, onRemove, color = "violet" }) {
  const [val, setVal] = useState("");
  const submit = () => {
    const trimmed = val.trim();
    if (trimmed && !items.includes(trimmed)) { onAdd(trimmed); setVal(""); }
  };
  const colorMap = {
    violet: "text-violet-600 bg-violet-50 border-violet-200",
    green:  "text-emerald-600 bg-emerald-50 border-emerald-200",
    red:    "text-red-500 bg-red-50 border-red-200",
    amber:  "text-amber-600 bg-amber-50 border-amber-200",
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder}
          className="flex-1 text-sm px-3 py-2 bg-white border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400"
        />
        <button
          onClick={submit}
          className="w-9 h-9 flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white rounded-xl transition-colors"
        >
          <IconPlus />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${colorMap[color]}`}>
              {item}
              <button onClick={() => onRemove(item)} className="opacity-60 hover:opacity-100 transition-opacity">
                <IconX size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

/** Step 0 — Profile + Posts view */
function StepProfile({ profile }) {
  const [tab, setTab] = useState("profile");
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-violet-50 rounded-xl border border-violet-100">
        {["profile", "posts"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              tab === t ? "bg-white text-violet-600 shadow-sm" : "text-slate-500 hover:text-violet-500"
            }`}
          >
            {t === "profile" ? "👤 Profile" : `📸 Posts (${profile.posts.length})`}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <div className="space-y-4">
          {/* Photo gallery */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900" style={{ aspectRatio: "4/3" }}>
            <img src={profile.photos[activePhoto]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Arrows */}
            <button onClick={() => setActivePhoto((p) => (p - 1 + profile.photos.length) % profile.photos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
              <IconChevronLeft />
            </button>
            <button onClick={() => setActivePhoto((p) => (p + 1) % profile.photos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
              <IconChevronRight />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {profile.photos.map((_, i) => (
                <button key={i} onClick={() => setActivePhoto(i)} className={`h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-white w-6" : "bg-white/50 w-1.5"}`} />
              ))}
            </div>
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-2xl font-bold">{profile.name}, {profile.age}</h3>
              <p className="text-white/75 text-sm flex items-center gap-1 mt-0.5">
                <IconPin />{profile.city}
              </p>
            </div>
            {/* Photo index badge */}
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {activePhoto + 1}/{profile.photos.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {profile.photos.map((ph, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === activePhoto ? "border-violet-500 shadow-md shadow-violet-200" : "border-transparent opacity-60 hover:opacity-90"}`}
              >
                <img src={ph} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Profile info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { e: "💼", l: "Occupation", v: profile.occupation },
              { e: "🔍", l: "Looking for", v: profile.lookingFor },
              { e: "👤", l: "Gender",      v: profile.gender },
              { e: "📍", l: "Distance",    v: profile.distance + " away" },
            ].map((i) => (
              <div key={i.l} className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-0.5">{i.l}</p>
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <span>{i.e}</span>{i.v}
                </p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-2">Bio</p>
            <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Interests */}
          <div>
            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-2">Interests</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((t) => (
                <span key={t} className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">#{t}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Posts grid */
        <div className="grid grid-cols-2 gap-3">
          {profile.posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-violet-100 shadow-sm hover:shadow-md hover:shadow-violet-100 transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={post.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2">{post.caption}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-fuchsia-400"><IconHeart />{post.likes}</span>
                    <span className="flex items-center gap-1 text-violet-400"><IconComment />{post.comments}</span>
                  </div>
                  <span>{post.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Step 1 — First Impression */
function StepFirstImpression({ value, onChange }) {
  const prompts = [
    "What was your very first reaction?",
    "What energy does this profile give off?",
    "What's the most memorable thing about this profile?",
  ];
  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 border border-violet-100">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center">
            <IconSparkle />
          </div>
          <div>
            <p className="text-xs text-violet-400 font-bold uppercase tracking-wider">First Impression</p>
            <p className="text-sm font-semibold text-slate-700">{prompt}</p>
          </div>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your honest first impression here — be thoughtful but candid..."
          rows={5}
          className="w-full text-sm text-slate-700 bg-white border border-violet-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-slate-400 leading-relaxed"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate-400">Be specific — vague feedback isn't helpful</p>
          <span className={`text-xs font-semibold ${value.length > 20 ? "text-emerald-500" : "text-slate-400"}`}>
            {value.length} chars
          </span>
        </div>
      </div>

      {/* Quick-fill suggestions */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick starters</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Comes across as genuine and warm",
            "Photos feel authentic and natural",
            "Bio is well-written and specific",
            "Strong visual identity throughout",
            "Feels approachable and interesting",
          ].map((s) => (
            <button
              key={s}
              onClick={() => onChange(s)}
              className="text-xs text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full hover:bg-violet-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Step 2 — Ratings */
function StepRatings({ ratings, onChange }) {
  const fields = [
    { key: "photoQuality",      label: "Photo Quality",      color: "violet",  desc: "Lighting, composition, variety" },
    { key: "bioClarity",        label: "Bio Clarity",        color: "fuchsia", desc: "Readable, specific, interesting" },
    { key: "authenticity",      label: "Authenticity",       color: "indigo",  desc: "Feels real, not staged or fake" },
    { key: "attractiveness",    label: "Attractiveness",     color: "violet",  desc: "Overall visual appeal" },
    { key: "overallImpression", label: "Overall Impression", color: "fuchsia", desc: "How strong is this profile?" },
  ];

  const avg = (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Average score card */}
      <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-5 text-white text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Average Score</p>
        <p className="text-5xl font-bold">{avg}</p>
        <p className="text-xs text-white/60 mt-1">out of 10</p>
        <div className="flex justify-center gap-1 mt-2">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={`${parseFloat(avg) >= s * 2 ? "text-white" : "text-white/30"}`}>
              <IconStar filled={parseFloat(avg) >= s * 2} />
            </span>
          ))}
        </div>
      </div>

      {/* Individual sliders */}
      <div className="space-y-5">
        {fields.map((f) => (
          <div key={f.key} className="bg-white rounded-2xl p-4 border border-violet-100 shadow-sm">
            <p className="text-xs text-slate-400 mb-3">{f.desc}</p>
            <RatingSlider
              label={f.label}
              value={ratings[f.key]}
              onChange={(v) => onChange({ ...ratings, [f.key]: v })}
              color={f.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 3 — Perceived Traits */
function StepTraits({ selected, onToggle }) {
  return (
    <div className="space-y-5">
      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
        <p className="text-sm font-semibold text-slate-700 mb-1">What traits do you perceive?</p>
        <p className="text-xs text-slate-500">Select all that come to mind based on their profile</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRAIT_OPTIONS.map((t) => (
          <TogglePill key={t} label={t} selected={selected.includes(t)} onClick={() => onToggle(t)} />
        ))}
      </div>
      <p className="text-xs text-slate-400 text-center">
        {selected.length === 0 ? "Select at least 3 traits" : `${selected.length} trait${selected.length !== 1 ? "s" : ""} selected`}
      </p>
    </div>
  );
}

/** Step 4 — Niche Appeal */
function StepNiche({ strongFor, weakFor, onToggleStrong, onToggleWeak }) {
  return (
    <div className="space-y-6">
      {/* Strong For */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">✓</div>
          <div>
            <p className="text-sm font-bold text-slate-700">Strong appeal for</p>
            <p className="text-xs text-slate-400">Which audiences would love this profile?</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {NICHE_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => onToggleStrong(n)}
              disabled={weakFor.includes(n)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                strongFor.includes(n)
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {strongFor.includes(n) && "✓ "}{n}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-violet-100" />

      {/* Weak For */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-sm">✗</div>
          <div>
            <p className="text-sm font-bold text-slate-700">Weak appeal for</p>
            <p className="text-xs text-slate-400">Which audiences might not connect?</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {NICHE_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => onToggleWeak(n)}
              disabled={strongFor.includes(n)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                weakFor.includes(n)
                  ? "bg-red-500 text-white border-red-500 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-red-300 hover:text-red-500"
              }`}
            >
              {weakFor.includes(n) && "✗ "}{n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Step 5 — Strengths / Weaknesses / Suggestions */
function StepFeedback({ strengths, weaknesses, suggestions, onUpdate }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">↑</span>
          <div>
            <p className="text-sm font-bold text-slate-700">Strengths</p>
            <p className="text-xs text-slate-400">What's working really well?</p>
          </div>
        </div>
        <TagInput
          placeholder="e.g. Great smile, Specific bio, Good variety of photos"
          items={strengths}
          onAdd={(v) => onUpdate("strengths", [...strengths, v])}
          onRemove={(v) => onUpdate("strengths", strengths.filter((s) => s !== v))}
          color="green"
        />
      </div>

      <div className="h-px bg-violet-100" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-xl bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm">↓</span>
          <div>
            <p className="text-sm font-bold text-slate-700">Weaknesses</p>
            <p className="text-xs text-slate-400">What could hurt their chances?</p>
          </div>
        </div>
        <TagInput
          placeholder="e.g. No full-body photo, Bio too short, All group photos"
          items={weaknesses}
          onAdd={(v) => onUpdate("weaknesses", [...weaknesses, v])}
          onRemove={(v) => onUpdate("weaknesses", weaknesses.filter((s) => s !== v))}
          color="red"
        />
      </div>

      <div className="h-px bg-violet-100" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">✦</span>
          <div>
            <p className="text-sm font-bold text-slate-700">Suggestions</p>
            <p className="text-xs text-slate-400">Specific actionable improvements</p>
          </div>
        </div>
        <TagInput
          placeholder="e.g. Add a candid outdoor photo, Mention a specific hobby"
          items={suggestions}
          onAdd={(v) => onUpdate("suggestions", [...suggestions, v])}
          onRemove={(v) => onUpdate("suggestions", suggestions.filter((s) => s !== v))}
          color="amber"
        />
      </div>
    </div>
  );
}

/** Step 6 — Photo Order + Remove */
function StepPhotos({ profile, photoOrder, setPhotoOrder, removePhotoIndex, setRemovePhotoIndex }) {
  const movePhoto = (from, to) => {
    const arr = [...photoOrder];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    setPhotoOrder(arr);
  };

  return (
    <div className="space-y-6">
      {/* Reorder */}
      <div>
        <p className="text-sm font-bold text-slate-700 mb-1">Suggested Photo Order</p>
        <p className="text-xs text-slate-400 mb-3">Drag to reorder — which photo should come first?</p>
        <div className="space-y-2">
          {photoOrder.map((idx, pos) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white border border-violet-100 rounded-xl p-3 shadow-sm"
            >
              <span className="text-slate-300 cursor-grab"><IconDrag /></span>
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-violet-100">
                <img src={profile.photos[idx]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-600">Photo {idx + 1}</p>
                <p className="text-[10px] text-slate-400">Position {pos + 1}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => pos > 0 && movePhoto(pos, pos - 1)}
                  disabled={pos === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-violet-200 text-violet-400 hover:bg-violet-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <IconChevronLeft />
                </button>
                <button
                  onClick={() => pos < photoOrder.length - 1 && movePhoto(pos, pos + 1)}
                  disabled={pos === photoOrder.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-violet-200 text-violet-400 hover:bg-violet-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <IconChevronRight />
                </button>
              </div>
              {pos === 0 && (
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100 flex-shrink-0">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Remove suggestion */}
      <div>
        <p className="text-sm font-bold text-slate-700 mb-1">Remove a Photo?</p>
        <p className="text-xs text-slate-400 mb-3">Optionally suggest one photo to remove entirely</p>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setRemovePhotoIndex(null)}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center text-xs font-bold transition-all ${
              removePhotoIndex === null
                ? "border-violet-500 bg-violet-50 text-violet-600"
                : "border-slate-200 text-slate-400 hover:border-violet-200"
            }`}
          >
            None
          </button>
          {profile.photos.map((ph, i) => (
            <button
              key={i}
              onClick={() => setRemovePhotoIndex(i === removePhotoIndex ? null : i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                removePhotoIndex === i
                  ? "border-red-500 shadow-md"
                  : "border-transparent opacity-80 hover:opacity-100 hover:border-red-200"
              }`}
            >
              <img src={ph} alt="" className="w-full h-full object-cover" />
              {removePhotoIndex === i && (
                <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                  <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white">
                    <IconX size={14} />
                  </div>
                </div>
              )}
              <span className="absolute bottom-1 right-1 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-full">
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Step 7 — Summary + Submit */
function StepSubmit({ review, profile }) {
  const avg = (Object.values(review.ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1);
  const sections = [
    { label: "First Impression", value: review.firstImpression || "—", icon: "💬" },
    { label: "Traits Identified", value: review.perceivedTraits.join(", ") || "—", icon: "🧠" },
    { label: "Strong For",  value: review.nicheAppeal.strongFor.join(", ") || "—", icon: "✅" },
    { label: "Weak For",    value: review.nicheAppeal.weakFor.join(", ") || "—", icon: "⚠️" },
    { label: "Strengths",   value: review.strengths.join(", ") || "—", icon: "↑" },
    { label: "Weaknesses",  value: review.weaknesses.join(", ") || "—", icon: "↓" },
    { label: "Suggestions", value: review.suggestions.join(", ") || "—", icon: "✦" },
  ];

  return (
    <div className="space-y-5">
      {/* Score hero */}
      <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Review Ready</p>
        <div className="text-6xl font-black mb-1">{avg}</div>
        <p className="text-white/70 text-sm">Average score for {profile.name}'s profile</p>
        <div className="flex justify-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={parseFloat(avg) >= s * 2 ? "text-yellow-300" : "text-white/30"}>
              <IconStar filled={parseFloat(avg) >= s * 2} />
            </span>
          ))}
        </div>
      </div>

      {/* Ratings summary */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-violet-100 bg-violet-50">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">Ratings Breakdown</p>
        </div>
        <div className="divide-y divide-violet-50">
          {Object.entries(review.ratings).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between px-4 py-2.5">
              <p className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-violet-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" style={{ width: `${val * 10}%` }} />
                </div>
                <span className="text-sm font-bold text-violet-600 w-5 text-right">{val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other sections */}
      <div className="space-y-2">
        {sections.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-violet-100 px-4 py-3 flex gap-3">
            <span className="text-base flex-shrink-0">{s.icon}</span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ProfileReview({ profile = mockProfile, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [review, setReview] = useState({
    profileId: profile._id,
    firstImpression: "",
    ratings: {
      photoQuality: 5,
      bioClarity: 5,
      authenticity: 5,
      attractiveness: 5,
      overallImpression: 5,
    },
    perceivedTraits: [],
    nicheAppeal: { strongFor: [], weakFor: [] },
    strengths: [],
    weaknesses: [],
    suggestions: [],
    photoOrderSuggestion: profile.photos.map((_, i) => i),
    removePhotoIndex: null,
  });

  const toggleTrait = (t) =>
    setReview((r) => ({
      ...r,
      perceivedTraits: r.perceivedTraits.includes(t)
        ? r.perceivedTraits.filter((x) => x !== t)
        : [...r.perceivedTraits, t],
    }));

  const toggleStrong = (n) =>
    setReview((r) => ({
      ...r,
      nicheAppeal: {
        ...r.nicheAppeal,
        strongFor: r.nicheAppeal.strongFor.includes(n)
          ? r.nicheAppeal.strongFor.filter((x) => x !== n)
          : [...r.nicheAppeal.strongFor, n],
      },
    }));

  const toggleWeak = (n) =>
    setReview((r) => ({
      ...r,
      nicheAppeal: {
        ...r.nicheAppeal,
        weakFor: r.nicheAppeal.weakFor.includes(n)
          ? r.nicheAppeal.weakFor.filter((x) => x !== n)
          : [...r.nicheAppeal.weakFor, n],
      },
    }));

  const updateFeedback = (key, val) =>
    setReview((r) => ({ ...r, [key]: val }));

  const handleSubmit = () => {
    if (onSubmit) onSubmit(review);
    setSubmitted(true);
  };

  const progress = (step / (STEPS.length - 1)) * 100;

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-violet-200">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200">
            <IconCheck />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Review Submitted!</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Your review of <strong>{profile.name}</strong>'s profile has been saved. They'll receive your feedback anonymously.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-md shadow-violet-200"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── Main modal ──────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl shadow-violet-200 w-full max-w-lg flex flex-col overflow-hidden"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 border-b border-violet-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-200 text-white">
                <IconSparkle />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-sm leading-tight">Review Profile</h2>
                <p className="text-xs text-slate-400">{profile.name}, {profile.age} · {profile.city}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-violet-200 text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
              <IconX size={15} />
            </button>
          </div>

          {/* Step pills */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  i === step
                    ? "bg-violet-500 text-white"
                    : i < step
                      ? "bg-violet-100 text-violet-500 hover:bg-violet-200 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-default"
                }`}
              >
                {i < step ? "✓" : i + 1} {s}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1 bg-violet-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ── Step content ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 0 && <StepProfile profile={profile} />}
          {step === 1 && (
            <StepFirstImpression
              value={review.firstImpression}
              onChange={(v) => setReview((r) => ({ ...r, firstImpression: v }))}
            />
          )}
          {step === 2 && (
            <StepRatings
              ratings={review.ratings}
              onChange={(r) => setReview((prev) => ({ ...prev, ratings: r }))}
            />
          )}
          {step === 3 && (
            <StepTraits selected={review.perceivedTraits} onToggle={toggleTrait} />
          )}
          {step === 4 && (
            <StepNiche
              strongFor={review.nicheAppeal.strongFor}
              weakFor={review.nicheAppeal.weakFor}
              onToggleStrong={toggleStrong}
              onToggleWeak={toggleWeak}
            />
          )}
          {step === 5 && (
            <StepFeedback
              strengths={review.strengths}
              weaknesses={review.weaknesses}
              suggestions={review.suggestions}
              onUpdate={updateFeedback}
            />
          )}
          {step === 6 && (
            <StepPhotos
              profile={profile}
              photoOrder={review.photoOrderSuggestion}
              setPhotoOrder={(o) => setReview((r) => ({ ...r, photoOrderSuggestion: o }))}
              removePhotoIndex={review.removePhotoIndex}
              setRemovePhotoIndex={(i) => setReview((r) => ({ ...r, removePhotoIndex: i }))}
            />
          )}
          {step === 7 && <StepSubmit review={review} profile={profile} />}
        </div>

        {/* ── Footer navigation ── */}
        <div className="px-6 py-4 border-t border-violet-100 flex items-center gap-3 flex-shrink-0 bg-white">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-violet-200 text-violet-600 text-sm font-semibold hover:bg-violet-50 transition-all"
            >
              <IconChevronLeft /> Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex-1 text-center">
            <span className="text-xs text-slate-400 font-medium">
              {step + 1} of {STEPS.length}
            </span>
          </div>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-violet-200"
            >
              {step === 0 ? "Start Review" : "Next"} <IconChevronRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm shadow-violet-200"
            >
              Submit Review <IconCheck />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
