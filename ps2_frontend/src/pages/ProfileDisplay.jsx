import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ProfileDisplay.css';

// ✅ API Configuration
const API_BASE_URL = 'https://profilepro-1bp4.onrender.com';

const ProfileDisplay = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { profileId } = useParams(); // This is actually userId from route

  useEffect(() => {
    fetchProfileData();
  }, [profileId]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userId = profileId || localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      if (!userId || !authToken) {
        throw new Error('Please login first');
      }

      console.log(`🔄 Fetching profile for userId: ${userId}`);
      
      // ✅ Correct API endpoint with userId query parameter
      const response = await fetch(`${API_BASE_URL}/api/profile/me?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error('Profile not found');
        throw new Error('Failed to load profile');
      }

      const data = await response.json();
      console.log('✅ Profile loaded:', data);
      processProfileData(data);

    } catch (err) {
      console.error('❌ Error loading profile:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processProfileData = (data) => {
    // Calculate age from date of birth
    if (data.dateOfBirth) {
      const birthDate = new Date(data.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      data.age = age;
    }

    // Format display values
    data.genderDisplay = formatGender(data.gender);
    data.educationDisplay = formatEducation(data.education);
    data.drinkingDisplay = formatHabit(data.drinkingHabits);
    data.smokingDisplay = formatHabit(data.smokingHabits);
    data.fitnessDisplay = formatFitness(data.fitnessLevel);
    data.dietDisplay = formatDiet(data.dietaryPreferences);
    data.religionDisplay = formatReligion(data.religion);
    data.politicalDisplay = formatPolitical(data.politicalViews);
    data.loveLanguageDisplay = formatLoveLanguage(data.loveLanguage);
    data.relationshipGoalDisplay = formatRelationshipGoal(data.relationshipGoal);
    data.childrenDisplay = formatChildren(data.children);
    data.wantChildrenDisplay = formatWantChildren(data.wantChildren);
    data.relocateDisplay = formatRelocate(data.relocate);
    data.lookingForDisplay = formatLookingFor(data.lookingForGender);

    setProfileData(data);
  };

  // Helper functions
  const formatGender = (value) => {
    const map = { 'man': 'Man', 'woman': 'Woman', 'non-binary': 'Non-binary', 'prefer-not-to-say': 'Prefer not to say' };
    return map[value] || value;
  };

  const formatEducation = (value) => {
    const map = { 'high-school': 'High School', 'some-college': 'Some College', 'bachelors': "Bachelor's Degree", 'masters': "Master's Degree", 'doctorate': 'Doctorate', 'trade-school': 'Trade School' };
    return map[value] || value;
  };

  const formatHabit = (value) => {
    const map = { 'never': 'Never', 'rarely': 'Rarely', 'socially': 'Socially', 'regularly': 'Regularly', 'trying-to-quit': 'Trying to quit' };
    return map[value] || value;
  };

  const formatFitness = (value) => {
    const map = { 'not-active': 'Not very active', 'occasionally': 'Occasionally active', 'moderately': 'Moderately active', 'very': 'Very active', 'athlete': 'Athletic/Athlete' };
    return map[value] || value;
  };

  const formatDiet = (value) => {
    const map = { 'no-restrictions': 'No restrictions', 'vegetarian': 'Vegetarian', 'vegan': 'Vegan', 'pescatarian': 'Pescatarian', 'kosher': 'Kosher', 'halal': 'Halal', 'other': 'Other' };
    return map[value] || value;
  };

  const formatReligion = (value) => {
    const map = { 'agnostic': 'Agnostic', 'atheist': 'Atheist', 'buddhist': 'Buddhist', 'christian': 'Christian', 'hindu': 'Hindu', 'jewish': 'Jewish', 'muslim': 'Muslim', 'spiritual': 'Spiritual but not religious', 'other': 'Other' };
    return map[value] || value;
  };

  const formatPolitical = (value) => {
    const map = { 'liberal': 'Liberal', 'moderate': 'Moderate', 'conservative': 'Conservative', 'not-political': 'Not political', 'prefer-not-to-say': 'Prefer not to say' };
    return map[value] || value;
  };

  const formatLoveLanguage = (value) => {
    const map = { 'words': 'Words of Affirmation', 'quality-time': 'Quality Time', 'gifts': 'Receiving Gifts', 'acts': 'Acts of Service', 'touch': 'Physical Touch' };
    return map[value] || value;
  };

  const formatRelationshipGoal = (value) => {
    const map = { 'long-term': 'Long-term relationship', 'marriage': 'Marriage', 'casual': 'Casual dating', 'new-friends': 'New friends', 'figuring-out': 'Still figuring it out' };
    return map[value] || value;
  };

  const formatChildren = (value) => {
    const map = { 'no': 'No', 'yes-live-with': 'Yes, and they live with me', 'yes-not-with': "Yes, but they don't live with me" };
    return map[value] || value;
  };

  const formatWantChildren = (value) => {
    const map = { 'yes': 'Yes', 'no': 'No', 'maybe': 'Maybe/Open', 'not-sure': 'Not sure yet' };
    return map[value] || value;
  };

  const formatRelocate = (value) => {
    const map = { 'yes': 'Yes, open to it', 'no': 'No, staying put', 'maybe': 'Maybe for the right person', 'already-planning': 'Already planning to move' };
    return map[value] || value;
  };

  const formatLookingFor = (value) => {
    const map = { 'men': 'Men', 'women': 'Women', 'everyone': 'Everyone' };
    return map[value] || value;
  };

  const handleEditProfile = () => {
    const userId = profileId || localStorage.getItem('userId');
    navigate(`/edit-profile/${userId}`);
  };

  const handleGetFeedback = () => {
    const userId = profileId || localStorage.getItem('userId');
    navigate(`/select-reviewers/${userId}`);
  };

  if (isLoading) {
    return (
      <div className="profile-display-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-display-container">
        <div className="error-state">
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchProfileData}>Try Again</button>
          <button className="btn btn-secondary" onClick={() => navigate('/create-profile')} style={{marginLeft: '10px'}}>Create New Profile</button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-display-container">
        <div className="error-state">
          <h2>No Profile Found</h2>
          <p>Please create a profile first.</p>
          <button className="btn btn-primary" onClick={() => navigate('/create-profile')}>Create Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-display-container">
      <div className="profile-display-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Your Dating Profile</h1>
            <p className="subtitle">Review your profile before requesting feedback</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={handleEditProfile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
            <button className="btn btn-primary" onClick={handleGetFeedback}>Get Feedback</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <section className="profile-section photo-section">
          <h2>Your Photos</h2>
          {profileData.photos && profileData.photos.length > 0 ? (
            <div className="photo-gallery">
              {profileData.photos.map((photo, index) => (
                <div key={index} className={`gallery-photo ${index === 0 ? 'primary' : ''}`}>
                  <img src={photo.url || photo} alt={`Profile ${index + 1}`} />
                  {index === 0 && <span className="primary-badge">Primary Photo</span>}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No photos uploaded</p>
          )}
        </section>

        <section className="profile-section">
          <h2>Basic Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Username</span>
              <span className="info-value">@{profileData.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{profileData.fullName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{profileData.age} years old</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{profileData.genderDisplay}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{profileData.location}</span>
            </div>
            {profileData.height && (
              <div className="info-item">
                <span className="info-label">Height</span>
                <span className="info-value">{profileData.height}</span>
              </div>
            )}
            {profileData.educationDisplay && (
              <div className="info-item">
                <span className="info-label">Education</span>
                <span className="info-value">{profileData.educationDisplay}</span>
              </div>
            )}
            {profileData.occupation && (
              <div className="info-item">
                <span className="info-label">Occupation</span>
                <span className="info-value">{profileData.occupation}</span>
              </div>
            )}
          </div>
        </section>

        {profileData.bio && (
          <section className="profile-section">
            <h2>About Me</h2>
            <div className="bio-content"><p>{profileData.bio}</p></div>
          </section>
        )}

        {(profileData.whatMatters || profileData.idealWeekend || profileData.growthArea || 
          profileData.dealbreaker || profileData.communicationStyle) && (
          <section className="profile-section">
            <h2>Get to Know Me</h2>
            {profileData.whatMatters && (
              <div className="question-answer">
                <h3>What matters most to me</h3>
                <p>{profileData.whatMatters}</p>
              </div>
            )}
            {profileData.idealWeekend && (
              <div className="question-answer">
                <h3>My ideal weekend</h3>
                <p>{profileData.idealWeekend}</p>
              </div>
            )}
            {profileData.loveLanguageDisplay && (
              <div className="question-answer">
                <h3>My love language</h3>
                <p>{profileData.loveLanguageDisplay}</p>
              </div>
            )}
          </section>
        )}

        <section className="profile-cta">
          <div className="cta-content">
            <div className="cta-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Ready to Get Expert Feedback?</h3>
            <p>Submit your profile to receive honest, constructive feedback from reviewers with relevant perspectives.</p>
            <button className="btn btn-primary btn-large" onClick={handleGetFeedback}>
              Select Reviewers & Get Feedback
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileDisplay;