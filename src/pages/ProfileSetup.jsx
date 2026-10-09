import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  User,
  Mail,
  BookOpen,
  Award,
} from "lucide-react";

import "./ProfileSetup.css";

function ProfileSetup() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    education: "",
    percentage: "",
    entranceExam: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "eduguide_student_profile",
      JSON.stringify(profile)
    );

    navigate("/preferences");
  };

  return (
    <div className="profile-setup-page">

      {/* Navbar */}
      <nav className="profile-setup-navbar">

        <div className="profile-setup-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="profile-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>

      {/* Main */}
      <main className="profile-setup-container">

        <section className="profile-setup-header">

          <div className="profile-setup-icon">
            <User size={32} />
          </div>

          <div>
            <h1>Student Profile</h1>

            <p>
              Tell us about yourself so EduGuide AI
              can provide better college recommendations.
            </p>
          </div>

        </section>

        {/* Form */}
        <form
          className="profile-setup-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="profile-form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <div className="profile-input-wrapper">
              <User size={18} />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Email */}
          <div className="profile-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <div className="profile-input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Education */}
          <div className="profile-form-group">

            <label htmlFor="education">
              Current Education
            </label>

            <div className="profile-input-wrapper">
              <BookOpen size={18} />

              <select
                id="education"
                name="education"
                value={profile.education}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select your education
                </option>

                <option value="10th">
                  Class 10
                </option>

                <option value="12th">
                  Class 12
                </option>

                <option value="Diploma">
                  Diploma
                </option>

                <option value="Undergraduate">
                  Undergraduate
                </option>

                <option value="Graduate">
                  Graduate
                </option>
              </select>
            </div>

          </div>

          {/* Percentage */}
          <div className="profile-form-group">

            <label htmlFor="percentage">
              Academic Percentage
            </label>

            <div className="profile-input-wrapper">
              <Award size={18} />

              <input
                id="percentage"
                name="percentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="Example: 85"
                value={profile.percentage}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Entrance Exam */}
          <div className="profile-form-group">

            <label htmlFor="entranceExam">
              Entrance Examination
            </label>

            <div className="profile-input-wrapper">
              <Award size={18} />

              <select
                id="entranceExam"
                name="entranceExam"
                value={profile.entranceExam}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select entrance exam
                </option>

                <option value="MHT-CET">
                  MHT-CET
                </option>

                <option value="JEE Main">
                  JEE Main
                </option>

                <option value="NEET">
                  NEET
                </option>

                <option value="CUET">
                  CUET
                </option>

                <option value="Other">
                  Other
                </option>

                <option value="Not Applicable">
                  Not Applicable
                </option>
              </select>
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="profile-submit-btn"
          >
            Continue to Preferences
          </button>

        </form>

      </main>

    </div>
  );
}

export default ProfileSetup;