import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import API from "../services/api";
import "./Recommendations.css";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const profileData = localStorage.getItem(
          "eduguide_student_profile"
        );

        const preferenceData = localStorage.getItem(
          "eduguide_preferences"
        );

        const profile = profileData
          ? JSON.parse(profileData)
          : {};

        const preferences = preferenceData
          ? JSON.parse(preferenceData)
          : {};

        const response = await API.get("/colleges");

        if (!response.data.success) {
          return;
        }

        const colleges = response.data.colleges || [];

        const course = (
          preferences.course || ""
        ).toLowerCase();

        const location = (
          preferences.location || ""
        ).toLowerCase();

        const percentage = Number(
          profile.percentage || 0
        );

        const scoredColleges = colleges.map(
          (college) => {
            let score = 0;

            const collegeLocation = (
              college.location ||
              college.city ||
              ""
            ).toLowerCase();

            const collegeCourses =
              college.courses || [];

            const hasCourse = collegeCourses.some(
              (collegeCourse) =>
                collegeCourse
                  .toLowerCase()
                  .includes(course)
            );

            const hasLocation =
              location === "any" ||
              collegeLocation.includes(location);

            if (course && hasCourse) {
              score += 50;
            }

            if (location && hasLocation) {
              score += 30;
            }

            if (percentage >= 75) {
              score += 20;
            }

            return {
              ...college,
              matchScore: score,
              courseMatch: hasCourse,
              locationMatch: hasLocation,
            };
          }
        );

        scoredColleges.sort(
          (a, b) =>
            b.matchScore - a.matchScore
        );

        setRecommendations(
          scoredColleges.slice(0, 5)
        );
      } catch (error) {
        console.error(
          "RECOMMENDATION ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="recommendations-page">

        <div className="recommendations-loading">

          <Sparkles size={48} />

          <h2>
            Finding suitable colleges...
          </h2>

          <p>
            EduGuide AI is analyzing your
            preferences.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="recommendations-page">

      {/* =========================
          Navbar
      ========================== */}

      <nav className="recommendations-navbar">

        <div className="recommendations-logo">

          <GraduationCap size={30} />

          <span>
            EduGuide AI
          </span>

        </div>

        <button
          className="recommendations-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>


      {/* =========================
          Main Content
      ========================== */}

      <main className="recommendations-container">

        {/* Header */}

        <section className="recommendations-header">

          <div className="recommendations-header-icon">
            <Sparkles size={34} />
          </div>

          <div>

            <h1>
              AI College Recommendations
            </h1>

            <p>
              Colleges selected based on your
              academic profile and preferences.
            </p>

          </div>

        </section>


        {/* =========================
            Recommendation Cards
        ========================== */}

        {recommendations.length === 0 ? (

          <div className="recommendations-empty">

            <GraduationCap size={48} />

            <h2>
              No recommendations available
            </h2>

            <p>
              Try updating your course or
              location preferences.
            </p>

            <button
              onClick={() =>
                navigate("/preferences")
              }
            >
              Update Preferences
            </button>

          </div>

        ) : (

          <section className="recommendations-list">

            {recommendations.map(
              (college, index) => (

                <article
                  className="recommendation-card"
                  key={
                    college.name || index
                  }
                >

                  {/* Card Top */}

                  <div className="recommendation-card-top">

                    <div className="recommendation-college-icon">

                      <GraduationCap
                        size={30}
                      />

                    </div>

                    <div className="recommendation-college-info">

                      <span className="recommendation-rank">
                        #{index + 1} Recommendation
                      </span>

                      <h2>
                        {college.name}
                      </h2>

                      <div className="recommendation-location">

                        <MapPin size={16} />

                        <span>
                          {college.location ||
                            college.city ||
                            "Location not available"}
                        </span>

                      </div>

                    </div>

                    <div className="match-score">

                      <strong>
                        {college.matchScore}%
                      </strong>

                      <span>
                        Match
                      </span>

                    </div>

                  </div>


                  {/* Match Reasons */}

                  <div className="recommendation-reasons">

                    {college.courseMatch && (

                      <div className="recommendation-reason">

                        <CheckCircle
                          size={18}
                        />

                        <span>
                          Preferred course available
                        </span>

                      </div>

                    )}

                    {college.locationMatch && (

                      <div className="recommendation-reason">

                        <CheckCircle
                          size={18}
                        />

                        <span>
                          Preferred location
                        </span>

                      </div>

                    )}

                    {(() => {
                      const savedProfile =
                        localStorage.getItem(
                          "eduguide_student_profile"
                        );

                      const studentProfile =
                        savedProfile
                          ? JSON.parse(
                              savedProfile
                            )
                          : {};

                      return (
                        Number(
                          studentProfile.percentage ||
                            0
                        ) >= 75
                      );
                    })() && (

                      <div className="recommendation-reason">

                        <CheckCircle
                          size={18}
                        />

                        <span>
                          Good academic profile
                        </span>

                      </div>

                    )}

                  </div>


                  {/* Actions */}

                  <div className="recommendation-actions">

                    <button
                      className="recommendation-details-btn"
                      onClick={() =>
                        navigate(
                          `/college/${encodeURIComponent(
                            college.name
                          )}`
                        )
                      }
                    >
                      View College
                    </button>

                    <button
                      className="recommendation-explain-btn"
                      onClick={() =>
                        navigate(
                          `/explain-college?college=${encodeURIComponent(
                            college.name
                          )}`
                        )
                      }
                    >
                      <Sparkles size={17} />

                      Why This College?

                    </button>

                  </div>

                </article>

              )
            )}

          </section>

        )}


        {/* =========================
            Explore More
        ========================== */}

        <section className="recommendations-next">

          <h2>
            Want to explore more?
          </h2>

          <p>
            Try different academic scores, courses,
            locations, and budgets to see how your
            college options change.
          </p>

          <div className="recommendations-next-buttons">

            <button
              onClick={() =>
                navigate("/colleges")
              }
            >
              Search Colleges
            </button>

            <button
              onClick={() =>
                navigate("/what-if")
              }
            >
              <Sparkles size={17} />

              Try What-If Simulator
            </button>

            <button
              onClick={() =>
                navigate("/admission-readiness")
              }
            >
              Check Admission Readiness
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Recommendations;