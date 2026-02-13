import ProfileSubmission from "../models/profileSubmission.js";

export const createProfileSubmission = async (req, res) => {
  try {
    const { user, photos, bio, prompts } = req.body;

    const lastProfile = await ProfileSubmission
      .findOne({ user })
      .sort({ version: -1 });

    const newVersion = lastProfile ? lastProfile.version + 1 : 1;

    const profile = await ProfileSubmission.create({
      user,
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
