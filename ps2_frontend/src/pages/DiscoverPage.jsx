import { useState } from "react";
import { profiles } from "../data/profiles";

// Layout
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

// Shared components
import ProfileCard from "../components/ProfileCard";
import ProfileDetail from "../components/ProfileDetail";
import ProfileReview from "../components/ProfileReview";

// Modals
import RequestReviewModal from "../pages/RequestReviewModal";

// Pages
import MyRequestsPage from "../pages/MyRequestsPage";
import InboxPage from "../pages/InboxPage";
import ReceivedReviewsPage from "../pages/ReceivedReviewPage";

import { IconSearch, IconBell } from "../components/Icons";

export default function Dating() {
  // Navigation
  const [activePage, setActivePage] = useState("discover");

  // Discover state
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Review request state
  const [requestTarget, setRequestTarget]   = useState(null); // profile to send request to
  const [reviewTarget, setReviewTarget]     = useState(null); // profile/request to write a review for

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filtered = profiles.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.occupation.toLowerCase().includes(q);
    const matchTab =
      activeTab === "All" ||
      (activeTab === "Online" && p.online) ||
      (activeTab === "Nearby" && parseFloat(p.distance) <= 5);
    return matchSearch && matchTab;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSendRequest = ({ reviewerId, message }) => {
    console.log("POST /api/review-requests", { reviewerId, message });
    // TODO: API call
  };

  const handleReviewSubmit = (reviewData) => {
    console.log("POST /api/reviews", reviewData);
    // TODO: API call
  };

  // When inbox Datingroves a request, open the review wizard for that profile
  const handleStartReview = (incomingRequest) => {
    // Build a profile shape from the incoming request data
    const fakeProfile = {
      _id: incomingRequest.requesterId,
      name: incomingRequest.requesterName,
      age: incomingRequest.requesterAge,
      city: incomingRequest.requesterCity,
      gender: incomingRequest.requesterGender,
      occupation: incomingRequest.requesterOccupation,
      online: false,
      distance: "—",
      bio: incomingRequest.profileSnippet?.bio || "",
      lookingFor: incomingRequest.profileSnippet?.lookingFor || "",
      interests: incomingRequest.requesterInterests || [],
      photos: incomingRequest.profileSnippet?.photos || [],
      posts: [],
    };
    setReviewTarget(fakeProfile);
    setActivePage("discover"); // bring modal to foreground over any page
  };

  // ── Discover page ─────────────────────────────────────────────────────────
  const DiscoverPage = (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Discover</h1>
            <p className="text-sm text-slate-400 mt-0.5">Based on your preferences and location</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300">
                <IconSearch />
              </span>
              <input
                type="text" placeholder="Search..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-white border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent w-44 placeholder:text-slate-400"
              />
            </div>
            <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors">
              <IconBell />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-fuchsia-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-4 mb-4 flex items-center gap-2.5 bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3">
          <span className="text-lg">🎯</span>
          <p className="text-xs text-violet-700 font-medium">
            <strong>Request an honest review</strong> — ask strangers for unbiased feedback on your dating profile.{" "}
            <button onClick={() => setActivePage("requests")} className="underline hover:text-violet-900">
              See your requests →
            </button>
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["All", "Online", "Nearby", "New"].map((tab) => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-violet-500 text-white shadow-sm shadow-violet-200"
                  : "bg-white text-slate-500 border border-violet-200 hover:border-violet-400 hover:text-violet-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={setSelectedProfile}
                onRequestReview={setRequestTarget}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-4 text-violet-300 border border-violet-100">
              <IconSearch />
            </div>
            <h3 className="text-slate-600 font-semibold mb-1">No results found</h3>
            <p className="text-slate-400 text-sm">Try a different name, city, or occupation</p>
          </div>
        )}
      </div>
    </main>
  );

  // ── Page router ───────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (activePage) {
      case "inbox":    return <main className="flex-1 overflow-y-auto"><InboxPage onStartReview={handleStartReview} /></main>;
      case "requests": return <main className="flex-1 overflow-y-auto"><MyRequestsPage onViewReview={() => setActivePage("reviews")} /></main>;
      case "reviews":  return <main className="flex-1 overflow-y-auto"><ReceivedReviewsPage onSubmitNewVersion={() => {}} /></main>;
      default:         return DiscoverPage;
    }
  };

  return (
    <div className="flex min-h-screen bg-violet-50" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Page content */}
      {renderPage()}

      {/* Right panel — only on discover */}
      {activePage === "discover" && <RightPanel />}

      {/* ── Modals ── */}

      {/* Profile detail */}
      {selectedProfile && (
        <ProfileDetail
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* Review request modal */}
      {requestTarget && (
        <RequestReviewModal
          reviewer={requestTarget}
          onClose={() => setRequestTarget(null)}
          onSend={(data) => { handleSendRequest(data); }}
        />
      )}

      {/* Review wizard (from inbox Datingroval or direct) */}
      {reviewTarget && (
        <ProfileReview
          profile={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSubmit={(data) => { handleReviewSubmit(data); setReviewTarget(null); }}
        />
      )}
    </div>
  );
}
