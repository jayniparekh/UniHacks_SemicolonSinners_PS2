import User from '../models/User.js';
import ReviewRequest from '../models/ReviewRequest.js';

/**
 * 1. User A sends invitation to User B
 * Logic: Deduct credit immediately (held in escrow).
 */
export const sendInvitation = async (req, res) => {
    try {
        const { reviewerId } = req.body;
        const requesterId = req.user.id; // From your auth middleware

        const requester = await User.findById(requesterId);
        if (!requester || requester.credits < 1) {
            return res.status(400).json({ message: "Insufficient credits." });
        }

        // Deduct credit
        await User.findByIdAndUpdate(requesterId, { $inc: { credits: -1 } });

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
 * Logic: If rejected, refund User A instantly.
 */
export const respondToInvitation = async (req, res) => {
    try {
        const { requestId, action } = req.body; // action: 'accepted' or 'rejected'
        const request = await ReviewRequest.findById(requestId);

        if (!request) return res.status(404).json({ message: "Request not found." });

        if (action === 'rejected') {
            request.status = 'rejected';
            // Refund User A
            await User.findByIdAndUpdate(request.requesterId, { $inc: { credits: 1 } });
        } else {
            request.status = 'accepted';
        }

        await request.save();
        res.json({ message: `Invitation ${action} successfully.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 3. User B Submits the Review
 * Logic: Complete request and pay User B for their work.
 */
export const submitReview = async (req, res) => {
    try {
        const { requestId, reviewContent } = req.body;
        const request = await ReviewRequest.findById(requestId);

        if (request.status !== 'accepted') {
            return res.status(400).json({ message: "Review must be accepted first." });
        }

        request.status = 'completed';
        request.reviewContent = reviewContent;
        await request.save();

        // Reward User B (the Reviewer)
    

        res.json({ message: "Review submitted! You earned 1 credit." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 4. User A Rates User B (Reviewer)
 * Logic: Calculate weighted average and update reviewerProfile.
 */
export const rateReviewer = async (req, res) => {
    try {
        const { requestId, rating } = req.body; // rating: 1 to 5
        const request = await ReviewRequest.findById(requestId);

        if (request.status !== 'completed') {
            return res.status(400).json({ message: "Can only rate completed reviews." });
        }

        const reviewer = await User.findById(request.reviewerId);
        
        const currentCount = reviewer.reviewerProfile.ratingCount || 0;
        const currentAvg = reviewer.reviewerProfile.ratingAvg || 0;

        // Weighted Average Calculation
        const newAvg = ((currentAvg * currentCount) + rating) / (currentCount + 1);

        await User.findByIdAndUpdate(request.reviewerId, {
            $set: { "reviewerProfile.ratingAvg": newAvg.toFixed(2) },
            $inc: { "reviewerProfile.ratingCount": 1 }
        });

        res.json({ message: "Reviewer profile updated with your feedback." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};