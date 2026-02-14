import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditProfile.css';

const API_BASE_URL = "https://profilepro-1bp4.onrender.com";

const EditProfile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  
  const [formData, setFormData] = useState({
    username: '', fullName: '', dateOfBirth: '', gender: '', location: '',
    photos: [], height: '', education: '', occupation: '', religion: '', politicalViews: '',
    drinkingHabits: '', smokingHabits: '', fitnessLevel: '', dietaryPreferences: '',
    bio: '', whatMatters: '', idealWeekend: '', growthArea: '', dealbreaker: '',
    communicationStyle: '', loveLanguage: '', relationshipGoal: '', ageRangeMin: '',
    ageRangeMax: '', lookingForGender: '', importantQualities: '', interests: [],
    values: [], children: '', wantChildren: '', relocate: ''
  });

  const [originalData, setOriginalData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profileId) {
      fetchProfileData();
    } else {
      setIsLoading(false);
      navigate('/create-profile');
    }
  }, [profileId]);

  useEffect(() => {
    if (originalData) {
      const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
      setHasChanges(changed);
    }
  }, [formData, originalData]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const userId = profileId || localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/api/profile/me?userId=${userId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (!response.ok) throw new Error('Failed to load profile');
      
      const data = await response.json();
      setFormData(data);
      setOriginalData(data);
      if (data.photos) setPhotoPreview(data.photos.map(p => p.url || p));
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading profile: ' + error.message);
      navigate('/create-profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const userId = profileId || localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');
      const updateData = new FormData();
      
      updateData.append('userId', userId);
      
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData.photos.forEach(photo => {
            if (photo instanceof File) {
              updateData.append('photos', photo);
            }
          });
          const existingPhotos = formData.photos.filter(p => typeof p === 'string');
          if (existingPhotos.length > 0) {
            updateData.append('existingPhotos', JSON.stringify(existingPhotos));
          }
        } else if (Array.isArray(formData[key])) {
          updateData.append(key, JSON.stringify(formData[key]));
        } else {
          updateData.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/profile/me?userId=${userId}`, {
        method: 'PUT',
        body: updateData,
        headers: { 
          'Authorization': `Bearer ${authToken}` 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      setOriginalData(updatedProfile);
      setHasChanges(false);
      alert('Profile updated successfully!');
      navigate(`/profile-display/${userId}`);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setFormData(originalData);
      setPhotoPreview(originalData.photos?.map(p => p.url || p) || []);
      setHasChanges(false);
    }
  };

  const sections = [
    { title: 'Basic Information', id: 'basic' },
    { title: 'Photos', id: 'photos' },
    { title: 'About You', id: 'about' },
    { title: 'Lifestyle & Values', id: 'lifestyle' },
    { title: 'What You Seek', id: 'seeking' }
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

  if (isLoading) {
    return (
      <div className="edit-profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Edit Your Profile</h1>
            <p className="subtitle">Update your information to get better feedback</p>
          </div>
          {hasChanges && (
            <div className="unsaved-changes-badge">
              <span className="dot"></span>
              Unsaved changes
            </div>
          )}
        </div>
      </div>

      <div className="edit-navigation">
        <div className="section-tabs">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`tab ${index === currentSection ? 'active' : ''}`}
              onClick={() => setCurrentSection(index)}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="edit-form">
        
        {currentSection === 0 && (
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Username *</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
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
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Height</label>
                <input type="text" name="height" value={formData.height} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Education</label>
                <select name="education" value={formData.education} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} />
            </div>
          </div>
        )}

        {currentSection === 1 && (
          <div className="form-section">
            <h2>Your Photos</h2>
            <p className="section-description">Update your photos. First photo will be your primary image.</p>
            <div className="photo-upload-area">
              <div className="photo-grid">
                {photoPreview.map((photo, index) => (
                  <div key={index} className="photo-preview">
                    <img src={photo} alt={`Preview ${index + 1}`} />
                    <button type="button" className="remove-photo" onClick={() => removePhoto(index)}>×</button>
                    {index === 0 && <span className="primary-badge">Primary</span>}
                  </div>
                ))}
                {photoPreview.length < 6 && (
                  <label className="photo-upload-box">
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    <div className="upload-icon">+</div>
                    <div className="upload-text">Add Photo</div>
                  </label>
                )}
              </div>
              <p className="photo-hint">{photoPreview.length}/6 photos</p>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="form-section">
            <h2>About You</h2>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="4" maxLength="500" />
              <span className="char-count">{formData.bio?.length || 0}/500</span>
            </div>
            <div className="form-group">
              <label>What matters most to you in life?</label>
              <textarea name="whatMatters" value={formData.whatMatters} onChange={handleInputChange} rows="3" />
            </div>
            <div className="form-group">
              <label>Describe your ideal weekend</label>
              <textarea name="idealWeekend" value={formData.idealWeekend} onChange={handleInputChange} rows="3" />
            </div>
            <div className="form-group">
              <label>What area of personal growth are you focused on?</label>
              <textarea name="growthArea" value={formData.growthArea} onChange={handleInputChange} rows="3" />
            </div>
            <div className="form-group">
              <label>What's a non-negotiable dealbreaker for you?</label>
              <textarea name="dealbreaker" value={formData.dealbreaker} onChange={handleInputChange} rows="3" />
            </div>
            <div className="form-group">
              <label>How would you describe your communication style?</label>
              <textarea name="communicationStyle" value={formData.communicationStyle} onChange={handleInputChange} rows="3" />
            </div>
            <div className="form-group">
              <label>What's your primary love language?</label>
              <select name="loveLanguage" value={formData.loveLanguage} onChange={handleInputChange}>
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

        {currentSection === 3 && (
          <div className="form-section">
            <h2>Lifestyle & Values</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Drinking Habits</label>
                <select name="drinkingHabits" value={formData.drinkingHabits} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely</option>
                  <option value="socially">Socially</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Smoking Habits</label>
                <select name="smokingHabits" value={formData.smokingHabits} onChange={handleInputChange}>
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
                <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleInputChange}>
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
                <select name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleInputChange}>
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
                <select name="religion" value={formData.religion} onChange={handleInputChange}>
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
                <select name="politicalViews" value={formData.politicalViews} onChange={handleInputChange}>
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
                    <input type="checkbox" checked={formData.interests?.includes(interest) || false} onChange={() => handleMultiSelect('interests', interest)} />
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
                    <input type="checkbox" checked={formData.values?.includes(value) || false} onChange={() => handleMultiSelect('values', value)} />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Do you have children?</label>
                <select name="children" value={formData.children} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="no">No</option>
                  <option value="yes-live-with">Yes, and they live with me</option>
                  <option value="yes-not-with">Yes, but they don't live with me</option>
                </select>
              </div>
              <div className="form-group">
                <label>Do you want children?</label>
                <select name="wantChildren" value={formData.wantChildren} onChange={handleInputChange}>
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
              <select name="relocate" value={formData.relocate} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="yes">Yes, open to it</option>
                <option value="no">No, staying put</option>
                <option value="maybe">Maybe for the right person</option>
                <option value="already-planning">Already planning to move</option>
              </select>
            </div>
          </div>
        )}

        {currentSection === 4 && (
          <div className="form-section">
            <h2>What You're Looking For</h2>
            <div className="form-group">
              <label>Relationship Goal</label>
              <select name="relationshipGoal" value={formData.relationshipGoal} onChange={handleInputChange}>
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
                <input type="number" name="ageRangeMin" value={formData.ageRangeMin} onChange={handleInputChange} placeholder="Min age" min="18" max="100" />
                <span className="range-separator">to</span>
                <input type="number" name="ageRangeMax" value={formData.ageRangeMax} onChange={handleInputChange} placeholder="Max age" min="18" max="100" />
              </div>
            </div>
            <div className="form-group">
              <label>Looking For</label>
              <select name="lookingForGender" value={formData.lookingForGender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="everyone">Everyone</option>
              </select>
            </div>
            <div className="form-group">
              <label>What qualities are most important to you in a partner?</label>
              <textarea name="importantQualities" value={formData.importantQualities} onChange={handleInputChange} rows="4" />
            </div>
          </div>
        )}

        <div className="form-actions">
          {hasChanges && (
            <button type="button" className="btn btn-text" onClick={handleDiscard} disabled={isSaving}>
              Discard Changes
            </button>
          )}
          <div className="action-buttons-right">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/profile-display/${profileId}`)} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!hasChanges || isSaving}>
              {isSaving ? <span><span className="spinner-small"></span> Saving...</span> : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;