import User from '../models/User.js';
import ReviewRequest from '../models/reviewRequests.js';
import { getGeminiReview } from '../services/geminiService.js';

/**
 * 1. User A sends invitation to User B
 * Logic: Simple creation of a pending request. No credit check.
 */
export const sendInvitation = async (req, res) => {
    try {
        const { reviewerId } = req.body;
        const requesterId = req.user.id; 

        const invite = await ReviewRequest.create({
            requesterId,
            reviewerId,
            status: 'pending'
        });

        res.status(201).json(invite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 2. User B Accepts or Rejects
 * Logic: If accepted, populate and return User A's full profile.
 */
export const respondToInvitation = async (req, res) => {
    try {
        const { requestId, action } = req.body; // action: 'accepted' or 'rejected'
        
        // We populate 'requesterId' to get User A's full schema data if accepted
        const request = await ReviewRequest.findById(requestId).populate('requesterId');

        if (!request) return res.status(404).json({ message: "Request not found." });

        request.status = action === 'rejected' ? 'rejected' : 'accepted';
        await request.save();

        if (action === 'accepted') {
            return res.json({ 
                message: "Invitation accepted. Full profile unlocked!",
                fullProfile: request.requesterId 
            });
        }

        res.json({ message: "Invitation rejected." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 3. User B Submits the Review
 * Logic: Save the content and mark as completed.
 */
export const submitReview = async (req, res) => {
    try {
        const { requestId, reviewContent } = req.body;
        
        const request = await ReviewRequest.findByIdAndUpdate(
            requestId, 
            { status: 'completed', reviewContent },
            { new: true }
        );

        res.json({ message: "Review submitted successfully!", request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 4. User A Rates User B (Reviewer)
 * Logic: Update User B's ratingAvg and ratingCount.
 */
export const rateReviewer = async (req, res) => {
    try {
        const { requestId, rating } = req.body; 
        const request = await ReviewRequest.findById(requestId);

        const reviewer = await User.findById(request.reviewerId);
        
        const currentCount = reviewer.reviewerProfile.ratingCount || 0;
        const currentAvg = reviewer.reviewerProfile.ratingAvg || 0;

        // Weighted Average Calculation
        const newAvg = ((currentAvg * currentCount) + rating) / (currentCount + 1);

        await User.findByIdAndUpdate(request.reviewerId, {
            $set: { "reviewerProfile.ratingAvg": newAvg.toFixed(2) },
            $inc: { "reviewerProfile.ratingCount": 1 }
        });

        res.json({ message: "Reviewer rated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReview = async (req, res) => {
  try {
    const {
      profileId,
      firstImpression,
      ratings,
      perceivedTraits,
      nicheAppeal,
      strengths,
      weaknesses,
      suggestions,
      photoOrderSuggestion,
      removePhotoIndex
    } = req.body;

    const reviewerId = req.user?.id ?? req.user?._id ?? req.body.reviewerId;

    if (!profileId) {
      return res.status(400).json({ message: "profileId is required" });
    }
    if (!reviewerId) {
      return res.status(400).json({ message: "reviewerId is required (auth or body.reviewerId)" });
    }

    const submission = await ProfileSubmission.findById(profileId);
    if (!submission) {
      return res.status(404).json({ message: "Profile submission not found" });
    }
    if (submission.status === "completed") {
      return res.status(400).json({ message: "This profile has already been reviewed" });
    }

    const review = await Review.create({
      profileId,
      reviewerId,
      firstImpression,
      ratings,
      perceivedTraits,
      nicheAppeal,
      strengths,
      weaknesses,
      suggestions,
      photoOrderSuggestion,
      removePhotoIndex
    });

    await ProfileSubmission.findByIdAndUpdate(profileId, {
      status: "completed"
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("reviewerId", "name username role")
      .populate({ path: "profileId", populate: { path: "user", select: "name username" } })
      .lean();

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const reviews = await Review.find({ profileId })
      .populate("reviewerId", "name username role")
      .populate({ path: "profileId", populate: { path: "user", select: "name username" } })
      .lean();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateAIReview = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        // Prepare data for Gemini
        const profileData = {
            bio: user.reviewerProfile?.bio || "No bio provided",
            preferences: user.intake?.preferences || {},
            gender: user.intake?.gender,
            interestedIn: user.intake?.interestedIn
        };

        const aiReview = await getGeminiReview(profileData);

        res.json({ review: aiReview });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: "AI Review failed" });
    }
};