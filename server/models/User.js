import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
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
      enum: ["man", "woman", "non-binary", "prefer-not-to-say"]
    },

    age: Number,

    location: {
      type: String,
      trim: true
    },

   

    datingProfile: {
      fullName: { type: String, trim: true },
      dateOfBirth: Date,

      
      height: String,
      education: {
        type: String,
        enum: ["", "high-school", "some-college", "bachelors", "masters", "doctorate", "trade-school"]
      },
      occupation: { type: String, trim: true },
      religion: {
        type: String,
        enum: ["", "agnostic", "atheist", "buddhist", "christian", "hindu", "jewish", "muslim", "spiritual", "other"]
      },
      politicalViews: {
        type: String,
        enum: ["", "liberal", "moderate", "conservative", "not-political", "prefer-not-to-say"]
      },


      photos: [{ type: String }],

 
      drinkingHabits: {
        type: String,
        enum: ["", "never", "rarely", "socially", "regularly"]
      },
      smokingHabits: {
        type: String,
        enum: ["", "never", "socially", "regularly", "trying-to-quit"]
      },
      fitnessLevel: {
        type: String,
        enum: ["", "not-active", "occasionally", "moderately", "very", "athlete"]
      },
      dietaryPreferences: {
        type: String,
        enum: ["", "no-restrictions", "vegetarian", "vegan", "pescatarian", "kosher", "halal", "other"]
      },

      // About you
      bio: { type: String, maxlength: 500 },
      whatMatters: String,
      idealWeekend: String,
      growthArea: String,
      dealbreaker: String,
      communicationStyle: String,
      loveLanguage: {
        type: String,
        enum: ["", "words", "quality-time", "gifts", "acts", "touch"]
      },

     
      relationshipGoal: {
        type: String,
        enum: ["", "long-term", "marriage", "casual", "new-friends", "figuring-out"]
      },
      ageRangeMin: { type: Number, min: 18, max: 100 },
      ageRangeMax: { type: Number, min: 18, max: 100 },
      lookingForGender: {
        type: String,
        enum: ["", "men", "women", "everyone"]
      },
      importantQualities: String,

  
      interests: [String],
      values: [String],

  
      children: {
        type: String,
        enum: ["", "no", "yes-live-with", "yes-not-with"]
      },
      wantChildren: {
        type: String,
        enum: ["", "yes", "no", "maybe", "not-sure"]
      },
      relocate: {
        type: String,
        enum: ["", "yes", "no", "maybe", "already-planning"]
      }
    },


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
          enum: ["100% authentic", "slightly curated", "heavily optimized"]
        }
      },
      feedbackPreference: {
        type: String,
        enum: ["brutal", "balanced", "gentle"]
      }
    },


    reviewerProfile: {
      bio: String,
      tags: [String],
      ratingAvg: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 },
      isAvailable: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
