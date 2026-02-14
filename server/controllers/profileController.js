import User from "../models/User.js";
import ProfileSubmission from "../models/profileSubmission.js";


function buildPromptsFromProfile(profile) {
  const pairs = [
    ["What matters most to you in life?", profile?.whatMatters],
    ["Describe your ideal weekend", profile?.idealWeekend],
    ["What area of personal growth are you focused on?", profile?.growthArea],
    ["What's a non-negotiable dealbreaker for you?", profile?.dealbreaker],
    ["How would you describe your communication style?", profile?.communicationStyle],
    ["What's your primary love language?", profile?.loveLanguage]
  ];
  return pairs
    .filter(([, answer]) => answer != null && String(answer).trim() !== "")
    .map(([question, answer]) => ({ question, answer: String(answer).trim() }));
}


function omitUndefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  );
}


function buildUserProfileUpdate(body) {
  const {
    username,
    fullName,
    dateOfBirth,
    gender,
    location,
    photos,
    height,
    education,
    occupation,
    religion,
    politicalViews,
    drinkingHabits,
    smokingHabits,
    fitnessLevel,
    dietaryPreferences,
    bio,
    whatMatters,
    idealWeekend,
    growthArea,
    dealbreaker,
    communicationStyle,
    loveLanguage,
    relationshipGoal,
    ageRangeMin,
    ageRangeMax,
    lookingForGender,
    importantQualities,
    interests,
    values,
    children,
    wantChildren,
    relocate
  } = body;

  const ageFromDob =
    dateOfBirth &&
    (() => {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let a = today.getFullYear() - dob.getFullYear();
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        a--;
      }
      return a;
    })();

  const topLevel = omitUndefined({
    username: username?.trim(),
    gender: gender || undefined,
    location: location?.trim(),
    age: ageFromDob
  });

  const datingProfile = omitUndefined({
    fullName: fullName?.trim(),
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    height: height?.trim(),
    education,
    occupation: occupation?.trim(),
    religion,
    politicalViews,
    photos: Array.isArray(photos) ? photos : undefined,
    drinkingHabits,
    smokingHabits,
    fitnessLevel,
    dietaryPreferences,
    bio: bio?.trim(),
    whatMatters: whatMatters?.trim(),
    idealWeekend: idealWeekend?.trim(),
    growthArea: growthArea?.trim(),
    dealbreaker: dealbreaker?.trim(),
    communicationStyle: communicationStyle?.trim(),
    loveLanguage,
    relationshipGoal,
    ageRangeMin,
    ageRangeMax,
    lookingForGender,
    importantQualities: importantQualities?.trim(),
    interests: Array.isArray(interests) ? interests : undefined,
    values: Array.isArray(values) ? values : undefined,
    children,
    wantChildren,
    relocate
  });

  return omitUndefined({
    ...topLevel,
    ...(Object.keys(datingProfile).length && { datingProfile })
  });
}


export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id ?? req.user?._id ?? req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID required (auth or query.userId)" });
    }

    const user = await User.findById(userId)
      .select("name username email gender age location datingProfile")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      username: user.username,
      fullName: user.datingProfile?.fullName ?? user.name,
      dateOfBirth: user.datingProfile?.dateOfBirth,
      gender: user.gender,
      location: user.location,
      age: user.age,
      ...(user.datingProfile || {})
    };

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id ?? req.user?._id ?? req.body.userId ?? req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID required (auth or body/query.userId)" });
    }

    const update = buildUserProfileUpdate(req.body);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, runValidators: true }
    )
      .select("name username email gender age location datingProfile")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createProfileSubmission = async (req, res) => {
  try {
    const userId = req.user?.id ?? req.user?._id ?? req.body.user;
    if (!userId) {
      return res.status(400).json({ message: "User ID required (body.user or auth)" });
    }

    const body = req.body;

    
    const profileUpdate = buildUserProfileUpdate(body);
    await User.findByIdAndUpdate(userId, { $set: profileUpdate }, { runValidators: true });

    const photos = Array.isArray(body.photos) ? body.photos : [];
    const bio = body.bio ?? "";
    const prompts = buildPromptsFromProfile(body);

    const lastProfile = await ProfileSubmission.findOne({ user: userId }).sort({
      version: -1
    });
    const newVersion = lastProfile ? lastProfile.version + 1 : 1;

    const profile = await ProfileSubmission.create({
      user: userId,
      version: newVersion,
      photos,
      bio,
      prompts
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
