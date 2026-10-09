import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  MapPin,
  IndianRupee,
} from "lucide-react";

import "./Preferences.css";

function Preferences() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    course: "",
    location: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save student preferences
    localStorage.setItem(
      "eduguide_preferences",
      JSON.stringify(preferences)
    );

    // Go to AI recommendations
    navigate("/recommendations");
  };

  return (
    <div className="preferences-page">

      {/* =========================
          Navbar
      ========================== */}

      <nav className="preferences-navbar">

        <div className="preferences-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="preferences-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>


      {/* =========================
          Main Content
      ========================== */}

      <main className="preferences-container">

        {/* Header */}

        <section className="preferences-header">

          <div className="preferences-header-icon">
            <BookOpen size={32} />
          </div>

          <div>

            <h1>Course & Preferences</h1>

            <p>
              Tell us what you are looking for so
              EduGuide AI can find suitable colleges
              for you.
            </p>

          </div>

        </section>


        {/* =========================
            Preferences Form
        ========================== */}

        <form
          className="preferences-form"
          onSubmit={handleSubmit}
        >

          {/* Preferred Course */}

          <div className="preferences-form-group">

            <label htmlFor="course">
              Preferred Course
            </label>

            <div className="preferences-input-wrapper">

              <BookOpen size={18} />

              <select
                id="course"
                name="course"
                value={preferences.course}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select your preferred course
                </option>

                <option value="Computer Engineering">
                  Computer Engineering
                </option>

                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>

                <option value="Data Science">
                  Data Science
                </option>

                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>

                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>

              </select>

            </div>

          </div>


          {/* Preferred Location */}

          <div className="preferences-form-group">

            <label htmlFor="location">
              Preferred Location
            </label>

            <div className="preferences-input-wrapper">

              <MapPin size={18} />

              <select
                id="location"
                name="location"
                value={preferences.location}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select preferred location
                </option>

                <option value="Pune">
                  Pune
                </option>

                <option value="Mumbai">
                  Mumbai
                </option>

                <option value="Nagpur">
                  Nagpur
                </option>

                <option value="Nashik">
                  Nashik
                </option>

                <option value="Aurangabad">
                  Aurangabad
                </option>

                <option value="Any">
                  Any Location
                </option>

              </select>

            </div>

          </div>


          {/* Annual Budget */}

          <div className="preferences-form-group">

            <label htmlFor="budget">
              Annual Budget
            </label>

            <div className="preferences-input-wrapper">

              <IndianRupee size={18} />

              <select
                id="budget"
                name="budget"
                value={preferences.budget}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select your annual budget
                </option>

                <option value="Under 1 Lakh">
                  Under ₹1 Lakh
                </option>

                <option value="1 - 2 Lakhs">
                  ₹1 - ₹2 Lakhs
                </option>

                <option value="2 - 3 Lakhs">
                  ₹2 - ₹3 Lakhs
                </option>

                <option value="3 - 5 Lakhs">
                  ₹3 - ₹5 Lakhs
                </option>

                <option value="Above 5 Lakhs">
                  Above ₹5 Lakhs
                </option>

              </select>

            </div>

          </div>


          {/* Submit Button */}

          <button
            type="submit"
            className="preferences-submit-btn"
          >
            Find My College Recommendations
          </button>

        </form>

      </main>

    </div>
  );
}

export default Preferences;