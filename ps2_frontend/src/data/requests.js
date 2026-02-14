// ─── REVIEW REQUESTS (sent by the logged-in user to potential reviewers) ──────
export const sentRequests = [
  {
    id: "req_001",
    reviewerId: "usr_002",
    reviewerName: "James",
    reviewerAge: 27,
    reviewerCity: "Manhattan, NY",
    reviewerOccupation: "Software Engineer",
    reviewerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    reviewerGender: "Man",
    reviewerInterests: ["Tech", "Hiking", "Cooking"],
    status: "pending",   // pending | approved | declined | completed
    sentAt: "2026-02-14T09:00:00Z",
    message: "Hey! Would love an honest take on my profile. No pressure at all.",
  },
  {
    id: "req_002",
    reviewerId: "usr_003",
    reviewerName: "Elena",
    reviewerAge: 25,
    reviewerCity: "Queens, NY",
    reviewerOccupation: "Yoga Instructor",
    reviewerAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
    reviewerGender: "Woman",
    reviewerInterests: ["Yoga", "Vegan", "Nature"],
    status: "approved",
    sentAt: "2026-02-13T14:30:00Z",
    approvedAt: "2026-02-13T18:00:00Z",
    message: "",
  },
  {
    id: "req_003",
    reviewerId: "usr_005",
    reviewerName: "Sophia",
    reviewerAge: 23,
    reviewerCity: "Jersey City, NJ",
    reviewerOccupation: "Student & Gamer",
    reviewerAvatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&q=80",
    reviewerGender: "Woman",
    reviewerInterests: ["Gaming", "Anime", "Design"],
    status: "completed",
    sentAt: "2026-02-10T10:00:00Z",
    approvedAt: "2026-02-10T12:00:00Z",
    completedAt: "2026-02-11T09:00:00Z",
    message: "",
  },
  {
    id: "req_004",
    reviewerId: "usr_006",
    reviewerName: "David",
    reviewerAge: 30,
    reviewerCity: "The Bronx, NY",
    reviewerOccupation: "Chef",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    reviewerGender: "Man",
    reviewerInterests: ["Foodie", "Wine", "Travel"],
    status: "declined",
    sentAt: "2026-02-12T08:00:00Z",
    declinedAt: "2026-02-12T20:00:00Z",
    message: "",
  },
];

// ─── INCOMING REQUESTS (other users asking the logged-in user to review them) ─
export const incomingRequests = [
  {
    id: "inc_001",
    requesterId: "usr_007",
    requesterName: "Liam",
    requesterAge: 26,
    requesterCity: "Brooklyn, NY",
    requesterOccupation: "Photographer",
    requesterAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
    requesterGender: "Man",
    requesterInterests: ["Photography", "Travel", "Music"],
    status: "pending",
    receivedAt: "2026-02-14T07:45:00Z",
    message: "Would really appreciate a genuine review from your perspective!",
    profileSnippet: {
      photos: [
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      ],
      bio: "Chasing light and good stories. Documentary photographer based in Brooklyn.",
      lookingFor: "Something meaningful",
    },
  },
  {
    id: "inc_002",
    requesterId: "usr_008",
    requesterName: "Mia",
    requesterAge: 24,
    requesterCity: "Manhattan, NY",
    requesterOccupation: "Marketing Manager",
    requesterAvatar: "https://images.unsplash.com/photo-1502323703975-b9b0b3b5c8ae?w=200&q=80",
    requesterGender: "Woman",
    requesterInterests: ["Travel", "Coffee", "Fashion"],
    status: "pending",
    receivedAt: "2026-02-13T16:20:00Z",
    message: "My friends always say my profile is great but I want an unbiased opinion.",
    profileSnippet: {
      photos: [
        "https://images.unsplash.com/photo-1502323703975-b9b0b3b5c8ae?w=400&q=80",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
      ],
      bio: "Making brand stories by day, seeking my own story by night. Big on trying new restaurants.",
      lookingFor: "Long-term relationship",
    },
  },
];

// ─── COMPLETED REVIEWS RECEIVED (reviews others wrote about you) ──────────────
export const receivedReviews = [
  {
    id: "rev_001",
    reviewerName: "Sophia",
    reviewerAvatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&q=80",
    reviewerAge: 23,
    completedAt: "2026-02-11T09:00:00Z",
    firstImpression: "Comes across as genuinely warm and creative. The profile has a clear aesthetic but could use more personal depth in the bio.",
    ratings: {
      photoQuality: 8,
      bioClarity: 6,
      authenticity: 9,
      attractiveness: 8,
      overallImpression: 8,
    },
    perceivedTraits: ["Creative", "Artistic", "Laid-back", "Adventurous"],
    nicheAppeal: {
      strongFor: ["Artists", "Coffee lovers", "Creatives", "Bookworms"],
      weakFor: ["Gym-goers", "Tech people"],
    },
    strengths: ["Strong visual identity", "Authentic vibe", "Great first photo"],
    weaknesses: ["Bio is too short", "No outdoor/lifestyle photos"],
    suggestions: [
      "Add a photo that shows your personality outside of posed shots",
      "Expand bio to mention something specific and memorable",
      "The third photo feels out of place — consider swapping it",
    ],
    photoOrderSuggestion: [0, 2, 1],
    removePhotoIndex: null,
  },
];

// ─── PROFILE VERSIONS (the logged-in user's submitted profile versions) ────────
export const myProfileVersions = [
  {
    id: "ver_001",
    version: 1,
    label: "Original",
    submittedAt: "2026-02-01T10:00:00Z",
    reviewCount: 1,
    avgScore: 7.8,
    photos: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    ],
    bio: "Living for great coffee and late night conversations.",
    status: "reviewed",
  },
  {
    id: "ver_002",
    version: 2,
    label: "Updated bio",
    submittedAt: "2026-02-10T14:00:00Z",
    reviewCount: 0,
    avgScore: null,
    photos: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    ],
    bio: "UX designer by day, amateur chef by night. Always up for a gallery visit or trying that ramen spot you've been saving. Looking for someone who appreciates slow Sunday mornings.",
    status: "pending_review",
  },
];
