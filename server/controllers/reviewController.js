import Review from "../models/review.js";
import ProfileSubmission from "../models/profileSubmission.js";

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
