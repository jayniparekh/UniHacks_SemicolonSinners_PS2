import React, { useState } from 'react';
import './styles/UserProfileForm.css';

export default function UserProfileForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    age: '',
    gender: '',
    location: '',
    email: '',
    photos: [],
    
    // Dating Profile Questions
    lookingFor: '',
    relationshipGoal: '',
    height: '',
    education: '',
    workTitle: '',
    hometown: '',
    drinking: '',
    smoking: '',
    exercise: '',
    religion: '',
    politicalViews: '',
    hasKids: '',
    wantsKids: '',
    pets: '',
    
    // Personality Questions (Hinge/Bumble style)
    typicalSunday: '',
    lifeGoal: '',
    perfectDate: '',
    loveLanguage: '',
    greenFlag: '',
    redFlag: '',
    mostControversial: '',
    wouldNeverDate: '',
    myVibe: '',
    weWillGetAlong: '',
    
    // Interests (Multiple Select)
    interests: [],
    
    // About Me
    bio: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.photos.length + files.length <= 6) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files]
      }));
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Profile created successfully! 🎉');
  };

  const availableInterests = [
    'Travel', 'Photography', 'Music', 'Art', 'Fitness', 'Yoga',
    'Cooking', 'Wine', 'Coffee', 'Reading', 'Writing', 'Gaming',
    'Sports', 'Dancing', 'Movies', 'Theater', 'Hiking', 'Camping',
    'Beach', 'Dogs', 'Cats', 'Fashion', 'Technology', 'Entrepreneurship'
  ];

  return (
    <div className="profile-form-app">
      <div className="form-header">
        <div className="form-header-content">
          <h1>Create Your Profile</h1>
          <p>Let's help you find your perfect match</p>
        </div>
      </div>

      <div className="form-container">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-steps">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="progress-step-wrapper">
                <div className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
                  {currentStep > step ? '✓' : step}
                </div>
                {step < 4 && (
                  <div className={`progress-line ${currentStep > step ? 'active' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="progress-labels">
            <span className={currentStep === 1 ? 'active' : ''}>Basic Info</span>
            <span className={currentStep === 2 ? 'active' : ''}>Lifestyle</span>
            <span className={currentStep === 3 ? 'active' : ''}>Personality</span>
            <span className={currentStep === 4 ? 'active' : ''}>About You</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Basic Information</h2>
              <p className="step-description">Tell us about yourself</p>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    placeholder="25"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Photos (Max 6) *</label>
                <p className="field-hint">Add your best photos to make a great first impression</p>
                
                <div className="photo-upload-grid">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="photo-preview">
                      <img src={URL.createObjectURL(photo)} alt={`Upload ${index + 1}`} />
                      <button
                        type="button"
                        className="photo-remove"
                        onClick={() => removePhoto(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {formData.photos.length < 6 && (
                    <label className="photo-upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <div className="photo-upload-content">
                        <span className="upload-icon">+</span>
                        <span>Add Photo</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>I'm looking for *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="men"
                      checked={formData.lookingFor === 'men'}
                      onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                    />
                    <span>Men</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="women"
                      checked={formData.lookingFor === 'women'}
                      onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                    />
                    <span>Women</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="everyone"
                      checked={formData.lookingFor === 'everyone'}
                      onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                    />
                    <span>Everyone</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Relationship Goal *</label>
                <div className="option-grid">
                  {['Long-term relationship', 'Short-term fun', 'New friends', 'Still figuring it out'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.relationshipGoal === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('relationshipGoal', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Lifestyle */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Lifestyle & Preferences</h2>
              <p className="step-description">Help us understand your lifestyle</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Height</label>
                  <select
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  >
                    <option value="">Select height</option>
                    <option value="under-5ft">Under 5'0"</option>
                    <option value="5ft-5ft3">5'0" - 5'3"</option>
                    <option value="5ft4-5ft7">5'4" - 5'7"</option>
                    <option value="5ft8-5ft11">5'8" - 5'11"</option>
                    <option value="6ft-6ft3">6'0" - 6'3"</option>
                    <option value="above-6ft3">Above 6'3"</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Education</label>
                  <select
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                  >
                    <option value="">Select education</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="trade">Trade School</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer, Teacher"
                  value={formData.workTitle}
                  onChange={(e) => handleInputChange('workTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Hometown</label>
                <input
                  type="text"
                  placeholder="Where did you grow up?"
                  value={formData.hometown}
                  onChange={(e) => handleInputChange('hometown', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Drinking</label>
                <div className="option-grid">
                  {['Never', 'Socially', 'Regularly', 'Frequently'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.drinking === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('drinking', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Smoking</label>
                <div className="option-grid">
                  {['Never', 'Socially', 'Regularly', 'Trying to quit'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.smoking === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('smoking', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Exercise</label>
                <div className="option-grid">
                  {['Daily', 'Often', 'Sometimes', 'Never'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.exercise === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('exercise', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Religion</label>
                <select
                  value={formData.religion}
                  onChange={(e) => handleInputChange('religion', e.target.value)}
                >
                  <option value="">Select religion</option>
                  <option value="agnostic">Agnostic</option>
                  <option value="atheist">Atheist</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="christian">Christian</option>
                  <option value="hindu">Hindu</option>
                  <option value="jewish">Jewish</option>
                  <option value="muslim">Muslim</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Political Views</label>
                <div className="option-grid">
                  {['Liberal', 'Moderate', 'Conservative', 'Not Political'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.politicalViews === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('politicalViews', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Do you have kids?</label>
                  <div className="radio-group">
                    {['Yes', 'No'].map(option => (
                      <label key={option} className="radio-option">
                        <input
                          type="radio"
                          name="hasKids"
                          value={option}
                          checked={formData.hasKids === option}
                          onChange={(e) => handleInputChange('hasKids', e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Do you want kids?</label>
                  <select
                    value={formData.wantsKids}
                    onChange={(e) => handleInputChange('wantsKids', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                    <option value="not-sure">Not sure</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Pets</label>
                <div className="option-grid">
                  {['Dog', 'Cat', 'Both', 'None', 'Other'].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.pets === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('pets', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personality Questions */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Show Your Personality</h2>
              <p className="step-description">These questions help others get to know the real you</p>

              <div className="form-group">
                <label>A typical Sunday for me is...</label>
                <div className="option-grid">
                  {[
                    'Brunch and mimosas',
                    'Netflix marathon',
                    'Exploring new places',
                    'Working out',
                    'Cooking a big meal',
                    'Game day!'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.typicalSunday === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('typicalSunday', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>My biggest life goal is...</label>
                <div className="option-grid">
                  {[
                    'Building a successful career',
                    'Starting a family',
                    'Traveling the world',
                    'Making a difference',
                    'Financial freedom',
                    'Finding true love'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.lifeGoal === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('lifeGoal', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>My perfect date would be...</label>
                <div className="option-grid">
                  {[
                    'Dinner and cocktails',
                    'Coffee and conversation',
                    'Adventure outdoors',
                    'Museum or art gallery',
                    'Concert or live music',
                    'Cozy night in'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.perfectDate === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('perfectDate', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>My love language is...</label>
                <div className="option-grid">
                  {[
                    'Words of affirmation',
                    'Quality time',
                    'Physical touch',
                    'Acts of service',
                    'Receiving gifts'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.loveLanguage === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('loveLanguage', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>A green flag for me is...</label>
                <div className="option-grid">
                  {[
                    'Great communication',
                    'Sense of humor',
                    'Emotional intelligence',
                    'Ambition and drive',
                    'Kindness to others',
                    'Adventure spirit'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.greenFlag === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('greenFlag', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>A red flag for me is...</label>
                <div className="option-grid">
                  {[
                    'Poor communication',
                    'Negativity',
                    'Lack of ambition',
                    'Drama and games',
                    'Dishonesty',
                    'Closed-mindedness'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.redFlag === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('redFlag', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>My most controversial opinion is...</label>
                <div className="option-grid">
                  {[
                    'Pineapple belongs on pizza',
                    'Cats are better than dogs',
                    'Coffee is overrated',
                    'The book is always better',
                    'Breakfast is the best meal',
                    'Social media is toxic'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.mostControversial === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('mostControversial', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>I would never date someone who...</label>
                <div className="option-grid">
                  {[
                    'Doesn\'t like animals',
                    'Is rude to servers',
                    'Can\'t take a joke',
                    'Doesn\'t read books',
                    'Is always on their phone',
                    'Doesn\'t travel'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.wouldNeverDate === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('wouldNeverDate', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>My vibe is...</label>
                <div className="option-grid">
                  {[
                    'Chill and laid-back',
                    'Adventurous and spontaneous',
                    'Intellectual and deep',
                    'Fun and outgoing',
                    'Creative and artistic',
                    'Ambitious and driven'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.myVibe === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('myVibe', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>We'll get along if you...</label>
                <div className="option-grid">
                  {[
                    'Love to laugh',
                    'Enjoy deep conversations',
                    'Are spontaneous',
                    'Love good food',
                    'Can keep up with me',
                    'Are genuine and real'
                  ].map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${formData.weWillGetAlong === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange('weWillGetAlong', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Interests & Bio */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Final Touches</h2>
              <p className="step-description">Add your interests and write something about yourself</p>

              <div className="form-group">
                <label>Select Your Interests (Choose at least 5)</label>
                <p className="field-hint">Pick topics you're passionate about</p>
                <div className="interests-grid">
                  {availableInterests.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`interest-tag ${formData.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="interest-count">
                  {formData.interests.length} selected
                </p>
              </div>

              <div className="form-group">
                <label>About Me *</label>
                <p className="field-hint">Write a brief bio that captures who you are (max 500 characters)</p>
                <textarea
                  rows="6"
                  maxLength="500"
                  placeholder="Tell people about yourself - your passions, what makes you unique, what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  required
                ></textarea>
                <p className="char-count">{formData.bio.length}/500</p>
              </div>

              <div className="final-note">
                <h3>Ready to find your match?</h3>
                <p>Once you submit, your profile will be reviewed and you can start connecting with people!</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" className="btn-nav btn-prev" onClick={prevStep}>
                ← Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button type="button" className="btn-nav btn-next" onClick={nextStep}>
                Next →
              </button>
            ) : (
              <button type="submit" className="btn-nav btn-submit">
                Create Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}