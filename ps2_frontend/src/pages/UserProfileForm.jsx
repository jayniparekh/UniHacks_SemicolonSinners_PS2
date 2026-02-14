import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfileForm.css';

const API_BASE_URL = "https://profilepro-1bp4.onrender.com";

const DatingProfileForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '', fullName: '', dateOfBirth: '', gender: '', location: '',
    photos: [], height: '', education: '', occupation: '', religion: '',
    politicalViews: '', drinkingHabits: '', smokingHabits: '', fitnessLevel: '',
    dietaryPreferences: '', bio: '', whatMatters: '', idealWeekend: '',
    growthArea: '', dealbreaker: '', communicationStyle: '', loveLanguage: '',
    relationshipGoal: '', ageRangeMin: '', ageRangeMax: '', lookingForGender: '',
    importantQualities: '', interests: [], values: [], children: '',
    wantChildren: '', relocate: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photoPreview.length + files.length <= 6) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPhotoPreview(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files]
      }));
    } else {
      alert('Maximum 6 photos allowed');
    }
  };

  const removePhoto = (index) => {
    setPhotoPreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleMultiSelect = (category, value) => {
    setFormData(prev => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    // ✅ ALWAYS navigate to profile display, even if API fails
    try {
      if (!userId || !authToken) {
        console.warn('⚠️ No credentials found, but navigating anyway...');
        // Still navigate to profile display
        navigate(`/profile-display/${userId || 'temp-id'}`);
        return;
      }

      const submitData = new FormData();
      submitData.append('userId', userId);
      
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData.photos.forEach(photo => {
            submitData.append('photos', photo);
          });
        } else if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'POST',
        body: submitData,
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        // ✅ Still navigate even if API fails
      } else {
        const data = await response.json();
        console.log('Profile created:', data);
      }
      
    } catch (error) {
      console.error('Error:', error);
      // ✅ Still navigate even on error
    } finally {
      setIsSubmitting(false);
      // ✅ Navigate to Discover page (main dating app interface)
      navigate('/discover');
    }
  };

  const sections = [
    { title: 'Basic Information', id: 'basic' },
    { title: 'Photos', id: 'photos' },
    { title: 'About You', id: 'about' },
    { title: 'Lifestyle & Values', id: 'lifestyle' },
    { title: 'What You Seek', id: 'seeking' },
    { title: 'Review & Submit', id: 'review' }
  ];

  const interestOptions = [
    'Art & Museums', 'Reading', 'Travel', 'Cooking', 'Fitness', 'Music',
    'Film & Theater', 'Hiking & Nature', 'Technology', 'Volunteering',
    'Writing', 'Photography', 'Gaming', 'Sports', 'Dancing', 'Wine & Dining'
  ];

  const valueOptions = [
    'Emotional Intelligence', 'Intellectual Curiosity', 'Authenticity',
    'Ambition', 'Kindness', 'Humor', 'Adventure', 'Stability',
    'Personal Growth', 'Family', 'Independence', 'Social Connection'
  ];

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Create Your Profile</h1>
        <p>Share who you are authentically to receive meaningful feedback</p>
      </header>

      <div className="progress-bar">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`progress-step ${index <= currentSection ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{section.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        
        {/* Section 1: Basic Information */}
        {currentSection === 0 && (
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a unique username"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State/Country"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="e.g., 5'10&quot; or 178 cm"
                />
              </div>

              <div className="form-group">
                <label>Education</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="high-school">High School</option>
                  <option value="some-college">Some College</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                  <option value="trade-school">Trade School</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                placeholder="Your profession or field"
              />
            </div>
          </div>
        )}

        {/* Section 2: Photos */}
        {currentSection === 1 && (
          <div className="form-section">
            <h2>Your Photos</h2>
            <p className="section-description">
              Choose 3-6 photos that represent different aspects of your life and personality.
              Quality matters more than quantity.
            </p>

            <div className="photo-upload-area">
              <div className="photo-grid">
                {photoPreview.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img src={photo} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-photo"
                      onClick={() => removePhoto(index)}
                    >
                      ×
                    </button>
                    {index === 0 && <span className="primary-badge">Primary</span>}
                  </div>
                ))}
                
                {photoPreview.length < 6 && (
                  <label className="photo-upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="upload-icon">+</div>
                    <div className="upload-text">Add Photo</div>
                  </label>
                )}
              </div>
              <p className="photo-hint">
                {photoPreview.length}/6 photos • First photo will be your primary image
              </p>
            </div>
          </div>
        )}

        {/* Section 3: About You */}
        {currentSection === 2 && (
          <div className="form-section">
            <h2>About You</h2>
            
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Write a brief, authentic introduction about yourself. What makes you, you?"
                rows="4"
                maxLength="500"
              />
              <span className="char-count">{formData.bio.length}/500</span>
            </div>

            <div className="form-group">
              <label>What matters most to you in life?</label>
              <textarea
                name="whatMatters"
                value={formData.whatMatters}
                onChange={handleInputChange}
                placeholder="Reflect on your core priorities and what brings meaning to your days"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Describe your ideal weekend</label>
              <textarea
                name="idealWeekend"
                value={formData.idealWeekend}
                onChange={handleInputChange}
                placeholder="Give insight into how you recharge and what brings you joy"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>What area of personal growth are you focused on?</label>
              <textarea
                name="growthArea"
                value={formData.growthArea}
                onChange={handleInputChange}
                placeholder="Share what you're working on improving or learning about yourself"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>What's a non-negotiable dealbreaker for you?</label>
              <textarea
                name="dealbreaker"
                value={formData.dealbreaker}
                onChange={handleInputChange}
                placeholder="Be honest about what you can't compromise on in a relationship"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>How would you describe your communication style?</label>
              <textarea
                name="communicationStyle"
                value={formData.communicationStyle}
                onChange={handleInputChange}
                placeholder="Direct? Thoughtful? Do you process internally or talk things through?"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>What's your primary love language?</label>
              <select
                name="loveLanguage"
                value={formData.loveLanguage}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="words">Words of Affirmation</option>
                <option value="quality-time">Quality Time</option>
                <option value="gifts">Receiving Gifts</option>
                <option value="acts">Acts of Service</option>
                <option value="touch">Physical Touch</option>
              </select>
            </div>
          </div>
        )}

        {/* Section 4: Lifestyle & Values */}
        {currentSection === 3 && (
          <div className="form-section">
            <h2>Lifestyle & Values</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Drinking Habits</label>
                <select
                  name="drinkingHabits"
                  value={formData.drinkingHabits}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely</option>
                  <option value="socially">Socially</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Smoking Habits</label>
                <select
                  name="smokingHabits"
                  value={formData.smokingHabits}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="socially">Socially</option>
                  <option value="regularly">Regularly</option>
                  <option value="trying-to-quit">Trying to quit</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fitness Level</label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="not-active">Not very active</option>
                  <option value="occasionally">Occasionally active</option>
                  <option value="moderately">Moderately active</option>
                  <option value="very">Very active</option>
                  <option value="athlete">Athletic/Athlete</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dietary Preferences</label>
                <select
                  name="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="no-restrictions">No restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="kosher">Kosher</option>
                  <option value="halal">Halal</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="agnostic">Agnostic</option>
                  <option value="atheist">Atheist</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="christian">Christian</option>
                  <option value="hindu">Hindu</option>
                  <option value="jewish">Jewish</option>
                  <option value="muslim">Muslim</option>
                  <option value="spiritual">Spiritual but not religious</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Political Views</label>
                <select
                  name="politicalViews"
                  value={formData.politicalViews}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="liberal">Liberal</option>
                  <option value="moderate">Moderate</option>
                  <option value="conservative">Conservative</option>
                  <option value="not-political">Not political</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Interests (Select all that apply)</label>
              <div className="checkbox-grid">
                {interestOptions.map(interest => (
                  <label key={interest} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleMultiSelect('interests', interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Core Values (Select your top 3-5)</label>
              <div className="checkbox-grid">
                {valueOptions.map(value => (
                  <label key={value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.values.includes(value)}
                      onChange={() => handleMultiSelect('values', value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Do you have children?</label>
                <select
                  name="children"
                  value={formData.children}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="no">No</option>
                  <option value="yes-live-with">Yes, and they live with me</option>
                  <option value="yes-not-with">Yes, but they don't live with me</option>
                </select>
              </div>

              <div className="form-group">
                <label>Do you want children?</label>
                <select
                  name="wantChildren"
                  value={formData.wantChildren}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe/Open</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Willing to relocate?</label>
              <select
                name="relocate"
                value={formData.relocate}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes, open to it</option>
                <option value="no">No, staying put</option>
                <option value="maybe">Maybe for the right person</option>
                <option value="already-planning">Already planning to move</option>
              </select>
            </div>
          </div>
        )}

        {/* Section 5: What You Seek */}
        {currentSection === 4 && (
          <div className="form-section">
            <h2>What You're Looking For</h2>

            <div className="form-group">
              <label>Relationship Goal</label>
              <select
                name="relationshipGoal"
                value={formData.relationshipGoal}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="long-term">Long-term relationship</option>
                <option value="marriage">Marriage</option>
                <option value="casual">Casual dating</option>
                <option value="new-friends">New friends</option>
                <option value="figuring-out">Still figuring it out</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age Range You're Open To</label>
              <div className="form-row">
                <input
                  type="number"
                  name="ageRangeMin"
                  value={formData.ageRangeMin}
                  onChange={handleInputChange}
                  placeholder="Min age"
                  min="18"
                  max="100"
                />
                <span className="range-separator">to</span>
                <input
                  type="number"
                  name="ageRangeMax"
                  value={formData.ageRangeMax}
                  onChange={handleInputChange}
                  placeholder="Max age"
                  min="18"
                  max="100"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Looking For</label>
              <select
                name="lookingForGender"
                value={formData.lookingForGender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="everyone">Everyone</option>
              </select>
            </div>

            <div className="form-group">
              <label>What qualities are most important to you in a partner?</label>
              <textarea
                name="importantQualities"
                value={formData.importantQualities}
                onChange={handleInputChange}
                placeholder="Be specific about what truly matters to you in a relationship"
                rows="4"
              />
            </div>
          </div>
        )}

        {/* Section 6: Review */}
        {currentSection === 5 && (
          <div className="form-section review-section">
            <h2>Review Your Profile</h2>
            <p className="section-description">
              Take a moment to review your profile before submitting it for feedback.
              Your profile will be shared privately with selected reviewers only.
            </p>

            <div className="review-card">
              <h3>Basic Information</h3>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Occupation:</strong> {formData.occupation || 'Not specified'}</p>
            </div>

            <div className="review-card">
              <h3>Photos</h3>
              <p>{photoPreview.length} photos uploaded</p>
            </div>

            <div className="review-card">
              <h3>About You</h3>
              <p>{formData.bio || 'No bio provided'}</p>
            </div>

            <div className="review-card">
              <h3>Looking For</h3>
              <p><strong>Goal:</strong> {formData.relationshipGoal || 'Not specified'}</p>
              <p><strong>Age Range:</strong> {formData.ageRangeMin}-{formData.ageRangeMax}</p>
            </div>

            <div className="consent-box">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I understand my profile will be shared privately with selected reviewers
                  for the purpose of receiving constructive feedback. My information will
                  not be made public or used for any other purpose.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentSection > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentSection(prev => prev - 1)}
              disabled={isSubmitting}
            >
              Previous
            </button>
          )}
          
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCurrentSection(prev => prev + 1)}
              disabled={isSubmitting}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <span className="spinner-small"></span> Submitting...
                </span>
              ) : (
                'Submit for Review'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DatingProfileForm;