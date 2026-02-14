import React, { useState, useEffect } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from "react-router-dom";

export default function ProfileReviewLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState(3);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePricing = (value) => {
    setSelectedReviewers(parseInt(value));
  };

  const testimonials = [
    {
      name: "Sarah M.",
      age: 28,
      location: "New York",
      text: "The feedback I received was incredibly honest and specific. I changed my photos and bio based on their suggestions, and my match rate tripled within a week!",
      rating: 5,
      improvement: "3x more matches"
    },
    {
      name: "James P.",
      age: 32,
      location: "San Francisco",
      text: "I was skeptical at first, but the reviewers caught things my friends never mentioned. The advice was actionable and respectful. Worth every penny.",
      rating: 5,
      improvement: "Better quality conversations"
    },
    {
      name: "Emily R.",
      age: 26,
      location: "Austin",
      text: "Finally got honest feedback without the awkwardness of asking friends. The reviews helped me showcase my personality better and I met someone special!",
      rating: 5,
      improvement: "Found a relationship"
    }
  ];

  const reviewExamples = [
    {
      category: "Photos",
      before: "All selfies, poor lighting",
      after: "Mix of activities, natural light",
      impact: "+65% profile views"
    },
    {
      category: "Bio",
      before: "Generic, list of hobbies",
      after: "Story-based, conversation starters",
      impact: "+80% response rate"
    },
    {
      category: "Prompts",
      before: "One-word answers",
      after: "Engaging, personality-driven",
      impact: "+55% quality matches"
    }
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="logo-text">ProfilePro</span>
          </div>

          <div className="nav-menu">
            <a href="#how-it-works">How It Works</a>
            <a href="#examples">Examples</a>
            <a href="#testimonials">Reviews</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-buttons">
            <button className="btn-login" onClick={() => navigate('/login')}>Log In</button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>Get Started</button>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#examples" onClick={() => setMobileMenuOpen(false)}>Examples</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="mobile-buttons">
              <button className="btn-login" onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);   
              }}>Log In</button>
              <button className="btn-signup" onClick={() => {
                navigate("/signup");
                setMobileMenuOpen(false);   
              }}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="badge">
            <svg className="badge-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3l1.5 1.5L5 6l1.5 1.5L5 9l1.5 1.5L5 12l1.5 1.5L5 15l1.5 1.5L5 18l1.5 1.5L5 21h14l-1.5-1.5L19 18l-1.5-1.5L19 15l-1.5-1.5L19 12l-1.5-1.5L19 9l-1.5-1.5L19 6l-1.5-1.5L19 3H5z" />
            </svg>
            <span className="badge-text">Trusted by 10,000+ users</span>
          </div>

          <h1>Get Honest Feedback on Your Dating Profile</h1>

          <p className="hero-description">
            Stop guessing. Get candid, actionable reviews from real people who understand what works in dating profiles.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Submit Your Profile
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('examples').scrollIntoView({ behavior: 'smooth' })}>
              See Example Reviews
            </button>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Profiles Reviewed</div>
            </div>
            <div className="stat stat-middle">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat">
              <div className="stat-number">85%</div>
              <div className="stat-label">See Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-section">
        <div className="section-container">
          <div className="section-header">
            <h2>The Problem</h2>
            <p>Getting quality feedback on your dating profile is harder than it should be</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Biased Friends</h3>
              <p>Friends are too nice or don't want to hurt your feelings. You need honest opinions.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Public Exposure</h3>
              <p>Posting publicly feels risky. You want private, professional feedback.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Vague Advice</h3>
              <p>Generic tips don't help. You need specific, actionable suggestions for your profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="how-container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple, private, and effective profile reviews in three steps</p>
          </div>

          <div className="steps">
            {/* Step 1 */}
            <div className="step">
              <div className="step-content">
                <div className="step-header">
                  <div className="step-number">1</div>
                  <h3>Submit Your Profile</h3>
                </div>
                <p>Upload screenshots of your dating profile including photos, bio, and prompts. Your submission is completely private and never shared publicly.</p>
                <ul className="step-features">
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>100% private and secure</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Takes less than 3 minutes</span>
                  </li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-content">
                  <div className="visual-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <p className="visual-text">Upload Profile</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step step-reverse">
              <div className="step-visual">
                <div className="visual-content">
                  <div className="visual-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p className="visual-text">Select Reviewers</p>
                </div>
              </div>
              <div className="step-content">
                <div className="step-header">
                  <div className="step-number">2</div>
                  <h3>Choose Your Reviewers</h3>
                </div>
                <p>Select 3-5 reviewers based on gender, age range, and dating preferences. Get perspectives from people who match your target audience.</p>
                <ul className="step-features">
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Filter by gender and preferences</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Verified reviewers with proven track records</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step">
              <div className="step-content">
                <div className="step-header">
                  <div className="step-number">3</div>
                  <h3>Get Detailed Feedback</h3>
                </div>
                <p>Receive honest, structured reviews within 48 hours. Each review covers photos, bio, prompts, and overall impression with clear action items.</p>
                <ul className="step-features">
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Specific, actionable suggestions</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Honest insights you won't get elsewhere</span>
                  </li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-content">
                  <div className="visual-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p className="visual-text">Receive Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Examples Section */}
      <section id="examples" className="examples-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Real Results</h2>
            <p>See the impact of professional feedback on actual profiles</p>
          </div>

          <div className="examples-grid">
            {reviewExamples.map((example, index) => (
              <div key={index} className="example-card">
                <h3>{example.category}</h3>
                <div className="example-comparison">
                  <div className="example-before">
                    <span className="label">Before</span>
                    <p>{example.before}</p>
                  </div>
                  <div className="example-arrow">→</div>
                  <div className="example-after">
                    <span className="label">After</span>
                    <p>{example.after}</p>
                  </div>
                </div>
                <div className="example-impact">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>{example.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from people who transformed their dating profiles</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="testimonial-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.age}, {testimonial.location}</p>
                    </div>
                    <div className="testimonial-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-result">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{testimonial.improvement}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="what-you-get">
        <div className="section-container">
          <div className="section-header">
            <h2>What You'll Get</h2>
            <p>Comprehensive feedback on every aspect of your dating profile</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3>Photo Analysis</h3>
              <ul>
                <li><span className="bullet">•</span> Which photos work and why</li>
                <li><span className="bullet">•</span> Suggested photo order</li>
                <li><span className="bullet">•</span> Specific improvements for each photo</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <h3>Bio Review</h3>
              <ul>
                <li><span className="bullet">•</span> Tone and personality assessment</li>
                <li><span className="bullet">•</span> What to add or remove</li>
                <li><span className="bullet">•</span> Rewrite suggestions</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Prompt Optimization</h3>
              <ul>
                <li><span className="bullet">•</span> Better prompt choices</li>
                <li><span className="bullet">•</span> More engaging answers</li>
                <li><span className="bullet">•</span> Conversation starters</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>First Impression</h3>
              <ul>
                <li><span className="bullet">•</span> Overall profile vibe</li>
                <li><span className="bullet">•</span> What stands out (good and bad)</li>
                <li><span className="bullet">•</span> Authenticity check</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2>Simple Pricing</h2>
            <p>Choose the number of reviewers that's right for you</p>
          </div>

          <div className="pricing-selector">
            <label>
              <span className="label-title">Number of Reviewers</span>
              <span className="label-subtitle">More reviewers = more diverse perspectives</span>
            </label>
            <input
              type="range"
              min="3"
              max="5"
              value={selectedReviewers}
              className="slider"
              onChange={(e) => updatePricing(e.target.value)}
            />
            <div className="slider-labels">
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div className="pricing-grid">
            <div className={`pricing-card ${selectedReviewers === 3 ? 'active' : ''}`}>
              <div className="pricing-header">
                <div className="price">$29</div>
                <div className="price-label">3 Reviewers</div>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>3 detailed reviews</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>48hr delivery</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Full feedback report</span>
                </li>
              </ul>
              <button onClick={() => navigate("/signup")}>Get Started</button>
            </div>

            <div className={`pricing-card ${selectedReviewers === 4 ? 'active' : ''}`}>
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <div className="price">$39</div>
                <div className="price-label">4 Reviewers</div>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>4 detailed reviews</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>48hr delivery</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Full feedback report</span>
                </li>
              </ul>
              <button onClick={() => navigate("/signup")}>Get Started</button>
            </div>

            <div className={`pricing-card ${selectedReviewers === 5 ? 'active' : ''}`}>
              <div className="pricing-header">
                <div className="price">$49</div>
                <div className="price-label">5 Reviewers</div>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>5 detailed reviews</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Priority 24hr delivery</span>
                </li>
                <li>
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Full feedback report</span>
                </li>
              </ul>
              <button onClick={() => navigate("/signup")}>Get Started</button>
            </div>
          </div>

          <p className="guarantee">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100% satisfaction guarantee or your money back
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <h3>Is my profile kept private?</h3>
              <p>Absolutely. Your profile is only shared with the specific reviewers you select. It's never posted publicly or shared with anyone else. All reviewers sign NDAs.</p>
            </div>

            <div className="faq-item">
              <h3>How long does it take?</h3>
              <p>Most reviews are completed within 48 hours. If you select 5 reviewers, you'll get priority 24-hour delivery.</p>
            </div>

            <div className="faq-item">
              <h3>Who are the reviewers?</h3>
              <p>All reviewers are verified users with proven track records. You can filter by gender, age range, and dating preferences to get perspectives from your target audience.</p>
            </div>

            <div className="faq-item">
              <h3>Can I submit multiple versions?</h3>
              <p>Yes! Many users submit updated profiles after making changes to track their improvements. Each submission is treated as a new review.</p>
            </div>

            <div className="faq-item">
              <h3>What if I'm not satisfied?</h3>
              <p>We offer a 100% satisfaction guarantee. If you're not happy with your reviews, we'll refund you in full, no questions asked.</p>
            </div>

            <div className="faq-item">
              <h3>Which dating apps do you support?</h3>
              <p>We support all major dating platforms including Tinder, Bumble, Hinge, OkCupid, Match, and more. Our feedback applies to any dating profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Improve Your Profile?</h2>
          <p>Get honest feedback from real people and start getting better matches today.</p>
          <button className="cta-button" onClick={() => navigate("/signup")}>Submit Your Profile Now</button>
          <p className="cta-note">No commitment. 100% private. Money-back guarantee.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="logo-icon">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="logo-text">ProfilePro</span>
              </div>
              <p className="footer-desc">Honest feedback for better dating profiles.</p>
              <div className="footer-social">
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#examples">Examples</a></li>
                <li><a href="#testimonials">Reviews</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 ProfilePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}