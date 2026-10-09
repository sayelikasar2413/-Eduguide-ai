import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  ArrowLeft,
  Heart,
  MapPin,
  IndianRupee,
  Star,
  Trash2,
  GitCompare,
  Sparkles,
  Route,
} from "lucide-react";

import "./Shortlist.css";

function Shortlist() {
  const navigate = useNavigate();

  // =========================
  // College Data
  // =========================

  const colleges = [
    {
      id: 1,
      name: "MIT World Peace University",
      location: "Pune, Maharashtra",
      type: "Private",
      courses: "Computer Science, AI & Data Science",
      fees: "₹2.5 Lakh / year",
      rating: "4.3",
      match: 92,
    },
    {
      id: 2,
      name: "COEP Technological University",
      location: "Pune, Maharashtra",
      type: "Government",
      courses: "Computer Science, IT, Mechanical",
      fees: "₹1.2 Lakh / year",
      rating: "4.6",
      match: 89,
    },
    {
      id: 3,
      name: "Vishwakarma Institute of Technology",
      location: "Pune, Maharashtra",
      type: "Private",
      courses: "Computer Science, AI & DS, IT",
      fees: "₹2.1 Lakh / year",
      rating: "4.4",
      match: 87,
    },
    {
      id: 4,
      name: "Pune Institute of Computer Technology",
      location: "Pune, Maharashtra",
      type: "Private",
      courses: "Computer Science, IT",
      fees: "₹1.8 Lakh / year",
      rating: "4.1",
      match: 84,
    },
    {
      id: 5,
      name: "College of Engineering Pune",
      location: "Pune, Maharashtra",
      type: "Government",
      courses: "Computer Science, Electrical, Mechanical",
      fees: "₹1.0 Lakh / year",
      rating: "4.5",
      match: 91,
    },
    {
      id: 6,
      name: "Symbiosis Institute of Technology",
      location: "Pune, Maharashtra",
      type: "Private",
      courses: "Computer Science, AI & ML",
      fees: "₹3.2 Lakh / year",
      rating: "4.2",
      match: 81,
    },
  ];

  // =========================
  // Shortlist State
  // =========================

  const [shortlistedIds, setShortlistedIds] = useState([]);

  // =========================
  // Load Shortlist
  // =========================

  useEffect(() => {
    const savedShortlist =
      localStorage.getItem("eduguide_shortlist");

    if (savedShortlist) {
      setShortlistedIds(JSON.parse(savedShortlist));
    }
  }, []);

  // =========================
  // Shortlisted Colleges
  // =========================

  const shortlistedColleges = colleges.filter((college) =>
    shortlistedIds.includes(college.id)
  );

  // =========================
  // Remove College
  // =========================

  const handleRemove = (collegeId) => {
    const updatedShortlist = shortlistedIds.filter(
      (id) => id !== collegeId
    );

    setShortlistedIds(updatedShortlist);

    localStorage.setItem(
      "eduguide_shortlist",
      JSON.stringify(updatedShortlist)
    );
  };

  // =========================
  // Clear All
  // =========================

  const handleClearAll = () => {
    setShortlistedIds([]);

    localStorage.removeItem("eduguide_shortlist");
  };

  return (
    <div className="shortlist-page">

      {/* =========================
          Navbar
      ========================= */}

      <nav className="shortlist-navbar">

        <div className="shortlist-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="shortlist-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </nav>

      {/* =========================
          Main Container
      ========================= */}

      <main className="shortlist-container">

        {/* Header */}

        <div className="shortlist-header">

          <div>

            <div className="shortlist-title-row">

              <Heart
                size={30}
                fill="currentColor"
              />

              <h1>My Shortlist</h1>

            </div>

            <p>
              Save and compare colleges that match your
              preferences.
            </p>

          </div>

          {shortlistedColleges.length > 0 && (
            <button
              className="clear-shortlist-btn"
              onClick={handleClearAll}
            >
              <Trash2 size={17} />
              Clear All
            </button>
          )}

        </div>

        {/* =========================
            Empty State
        ========================= */}

        {shortlistedColleges.length === 0 ? (

          <div className="empty-shortlist">

            <div className="empty-heart">

              <Heart size={45} />

            </div>

            <h2>
              Your shortlist is empty
            </h2>

            <p>
              Explore colleges and click the heart icon
              to add them to your shortlist.
            </p>

            <button
              className="find-colleges-btn"
              onClick={() => navigate("/colleges")}
            >
              <GraduationCap size={18} />
              Find Colleges
            </button>

          </div>

        ) : (

          <>
            {/* =========================
                Summary
            ========================= */}

            <div className="shortlist-summary-card">

              <div className="summary-item">

                <span className="summary-number">
                  {shortlistedColleges.length}
                </span>

                <span className="summary-label">
                  Shortlisted Colleges
                </span>

              </div>

              <div className="summary-item">

                <span className="summary-number">
                  {shortlistedColleges.filter(
                    (college) =>
                      college.type === "Government"
                  ).length}
                </span>

                <span className="summary-label">
                  Government
                </span>

              </div>

              <div className="summary-item">

                <span className="summary-number">
                  {shortlistedColleges.filter(
                    (college) =>
                      college.type === "Private"
                  ).length}
                </span>

                <span className="summary-label">
                  Private
                </span>

              </div>

              <div className="summary-item">

                <span className="summary-number">
                  {Math.max(
                    ...shortlistedColleges.map(
                      (college) => college.match
                    )
                  )}
                  %
                </span>

                <span className="summary-label">
                  Best Match
                </span>

              </div>

            </div>

            {/* =========================
                College Cards
            ========================= */}

            <section className="shortlist-grid">

              {shortlistedColleges.map((college) => (

                <div
                  className="shortlist-card"
                  key={college.id}
                >

                  {/* Card Header */}

                  <div className="shortlist-card-header">

                    <div className="shortlist-college-icon">
                      <GraduationCap size={25} />
                    </div>

                    <button
                      className="remove-shortlist-btn"
                      onClick={() =>
                        handleRemove(college.id)
                      }
                      title="Remove from shortlist"
                    >
                      <Heart
                        size={20}
                        fill="currentColor"
                      />
                    </button>

                  </div>

                  {/* College Name */}

                  <h2>
                    {college.name}
                  </h2>

                  {/* Location */}

                  <div className="shortlist-info">

                    <MapPin size={16} />

                    <span>
                      {college.location}
                    </span>

                  </div>

                  {/* Fees */}

                  <div className="shortlist-info">

                    <IndianRupee size={16} />

                    <span>
                      {college.fees}
                    </span>

                  </div>

                  {/* Rating */}

                  <div className="shortlist-info">

                    <Star
                      size={16}
                      fill="currentColor"
                    />

                    <span>
                      {college.rating} Rating
                    </span>

                  </div>

                  {/* Match */}

                  <div className="match-section">

                    <div className="match-header">

                      <span>
                        AI Match
                      </span>

                      <strong>
                        {college.match}%
                      </strong>

                    </div>

                    <div className="match-progress">

                      <div
                        className="match-progress-fill"
                        style={{
                          width: `${college.match}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Type */}

                  <div className="shortlist-tags">

                    <span className="college-type-tag">
                      {college.type}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="shortlist-actions">

                    <button
                      className="view-college-btn"
                      onClick={() =>
                        navigate(
                          `/college/${college.id}`
                        )
                      }
                    >
                      View College
                    </button>

                    <button
                      className="why-college-btn"
                      onClick={() =>
                        navigate(
                          "/explain-college"
                        )
                      }
                    >
                      <Sparkles size={16} />
                      Why This?
                    </button>

                  </div>

                </div>

              ))}

            </section>

            {/* =========================
                Bottom Actions
            ========================= */}

            <div className="shortlist-bottom-actions">

              <button
                onClick={() => navigate("/compare")}
              >
                <GitCompare size={18} />
                Compare Colleges
              </button>

              <button
                onClick={() =>
                  navigate("/admission-readiness")
                }
              >
                <Sparkles size={18} />
                Check Readiness
              </button>

              <button
                onClick={() => navigate("/roadmap")}
              >
                <Route size={18} />
                Admission Roadmap
              </button>

            </div>

          </>

        )}

        {/* Disclaimer */}

        <div className="shortlist-disclaimer">

          <strong>Note:</strong> AI match scores and
          college information shown here are for project
          demonstration purposes. Always verify current
          fees, eligibility, admission dates and other
          requirements from official college sources.

        </div>

      </main>

    </div>
  );
}

export default Shortlist;