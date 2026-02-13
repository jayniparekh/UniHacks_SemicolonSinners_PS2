import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
  // ========================
  // AUTH
  // ========================

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "reviewer", "admin"],
    default: "user"
  },

  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active"
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  gender: {
    type: String,
    enum: ["male", "female", "non-binary"]
  },

  age: Number,

  // ========================
  // INTAKE QUESTIONNAIRE
  // ========================

  intake: {

    datingIntent: {
      type: String,
      enum: ["serious", "casual", "marriage", "exploring"]
    },

    targetAudience: [String],

    targetAgeRange: {
      min: Number,
      max: Number
    },

    desiredPerception: [String],

    vibeGoal: {
      type: String,
      enum: ["safe", "bold", "deep", "playful"]
    },

    selfAssessment: {
      photoScore: Number,
      bioScore: Number,
      biggestConcern: String,

      authenticityLevel: {
        type: String,
        enum: [
          "100% authentic",
          "slightly curated",
          "heavily optimized"
        ]
      }
    },

    feedbackPreference: {
      type: String,
      enum: ["brutal", "balanced", "gentle"]
    }

  },

  // ========================
  // REVIEWER PROFILE
  // ========================

  reviewerProfile: {

    bio: String,

    tags: [String],

    ratingAvg: {
      type: Number,
      default: 0
    },

    ratingCount: {
      type: Number,
      default: 0
    },

    isAvailable: {
      type: Boolean,
      default: false
    }
  }
},
{ timestamps: true }
);

export default mongoose.model('User', userSchema);