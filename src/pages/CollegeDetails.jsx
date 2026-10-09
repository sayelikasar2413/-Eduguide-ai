import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Building2,
  BookOpen,
  Globe,
  Sparkles,
} from "lucide-react";

import API from "../services/api";
import "./CollegeDetails.css";

function CollegeDetails() {
  const { collegeName } = useParams();
  const navigate = useNavigate();

  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch College Details
  // ==========================================

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await API.get(
          `/colleges/${encodeURIComponent(collegeName)}`
        );

        if (response.data.success) {
          setCollege(response.data.college);
        } else {
          setError("College not found.");
        }
      } catch (err) {
        console.error("COLLEGE DETAILS ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load college details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [collegeName]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="college-details-page">

        <div className="college-details-loading">

          <GraduationCap size={50} />

          <h2>
            Loading college details...
          </h2>

          <p>
            Please wait.
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error || !college) {
    return (
      <div className="college-details-page">

        <div className="college-details-error">

          <GraduationCap size={50} />

          <h2>
            College Not Found
          </h2>

          <p>
            {error ||
              "The requested college could not be found."}
          </p>

          <button
            className="college-back-btn"
            onClick={() => navigate("/colleges")}
          >
            <ArrowLeft size={18} />

            Back to Colleges
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // College Details Page
  // ==========================================

  return (
    <div className="college-details-page">

      {/* ======================================
          Navbar
      ====================================== */}

      <nav className="college-details-navbar">

        <div className="college-details-logo">

          <GraduationCap size={30} />

          <span>
            EduGuide AI
          </span>

        </div>

        <button
          className="college-back-btn"
          onClick={() => navigate("/colleges")}
        >
          <ArrowLeft size={18} />

          Back to Colleges
        </button>

      </nav>

      {/* ======================================
          Main Container
      ====================================== */}

      <main className="college-details-container">

        {/* ====================================
            College Header
        ==================================== */}

        <section className="college-details-header">

          <div className="college-details-icon">

            <GraduationCap size={45} />

          </div>

          <div>

            <span className="college-details-type">
              {college.type || "College"}
            </span>

            <h1>
              {college.name}
            </h1>

            <div className="college-location">

              <MapPin size={18} />

              <span>
                {college.location ||
                  college.city ||
                  "Location not available"}
              </span>

            </div>

          </div>

        </section>

        {/* ====================================
            Information Cards
        ==================================== */}

        <section className="college-details-grid">

          {/* Location */}

          <div className="college-detail-card">

            <div className="college-detail-card-icon">

              <MapPin size={24} />

            </div>

            <div>

              <h3>
                Location
              </h3>

              <p>
                {college.location ||
                  "Not available"}
              </p>

            </div>

          </div>

          {/* Type */}

          <div className="college-detail-card">

            <div className="college-detail-card-icon">

              <Building2 size={24} />

            </div>

            <div>

              <h3>
                College Type
              </h3>

              <p>
                {college.type ||
                  "Not available"}
              </p>

            </div>

          </div>

          {/* City */}

          <div className="college-detail-card">

            <div className="college-detail-card-icon">

              <MapPin size={24} />

            </div>

            <div>

              <h3>
                City
              </h3>

              <p>
                {college.city ||
                  "Not available"}
              </p>

            </div>

          </div>

          {/* State */}

          <div className="college-detail-card">

            <div className="college-detail-card-icon">

              <Building2 size={24} />

            </div>

            <div>

              <h3>
                State
              </h3>

              <p>
                {college.state ||
                  "Not available"}
              </p>

            </div>

          </div>

        </section>

        {/* ====================================
            Courses
        ==================================== */}

        <section className="college-details-section">

          <div className="college-section-title">

            <BookOpen size={24} />

            <h2>
              Courses Offered
            </h2>

          </div>

          {college.courses &&
          college.courses.length > 0 ? (

            <div className="courses-list">

              {college.courses.map(
                (course, index) => (

                  <div
                    className="course-item"
                    key={index}
                  >

                    <GraduationCap size={18} />

                    <span>
                      {course}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="not-available">
              Course information is not available yet.
            </p>

          )}

        </section>

        {/* ====================================
            AI College Insights
        ==================================== */}

        <section className="college-details-section">

          <div className="college-section-title">

            <Sparkles size={24} />

            <h2>
              AI College Insights
            </h2>

          </div>

          <p className="not-available">

            Get an AI-powered explanation of why this
            college may be suitable for your preferences.

          </p>

          <button
            className="college-website-btn"
            onClick={() =>
              navigate(
                `/explain-college?college=${encodeURIComponent(
                  college.name
                )}`
              )
            }
          >
            ✨ Why This College?
          </button>

        </section>

        {/* ====================================
            Official Website
        ==================================== */}

        {college.website && (

          <section className="college-details-section">

            <div className="college-section-title">

              <Globe size={24} />

              <h2>
                Official Website
              </h2>

            </div>

            <a
              className="college-website-btn"
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Official Website
            </a>

          </section>

        )}

        {/* ====================================
            Data Source
        ==================================== */}

        <div className="college-source">

          <strong>
            Data Source:
          </strong>{" "}

          {college.source ||
            "EduGuide AI"}

          {college.last_verified && (
            <>
              {" | "}

              <strong>
                Last Verified:
              </strong>{" "}

              {college.last_verified}
            </>
          )}

        </div>

      </main>

    </div>
  );
}

export default CollegeDetails;