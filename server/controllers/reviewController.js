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

    const reviewerId = req.user?._id || req.body.reviewerId; 

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
    const reviews = await Review.find({
      profileId: req.params.profileId
    }).populate("reviewerId", "name role");

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
