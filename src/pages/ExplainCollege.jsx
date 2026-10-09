import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Sparkles,
  CheckCircle,
  Circle,
} from "lucide-react";

import API from "../services/api";
import "./ExplainCollege.css";

function ExplainCollege() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const collegeName =
    searchParams.get("college") || "";

  const [college, setCollege] = useState(null);
  const [matchScore, setMatchScore] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // LOAD COLLEGE + STUDENT INFORMATION
  // ============================================

  useEffect(() => {
    const loadCollegeExplanation = async () => {
      try {
        // ----------------------------------------
        // GET STUDENT PROFILE
        // ----------------------------------------

        const profileData = localStorage.getItem(
          "eduguide_student_profile"
        );

        const profile = profileData
          ? JSON.parse(profileData)
          : {};

        // ----------------------------------------
        // GET STUDENT PREFERENCES
        // ----------------------------------------

        const preferenceData = localStorage.getItem(
          "eduguide_preferences"
        );

        const preferences = preferenceData
          ? JSON.parse(preferenceData)
          : {};

        // ----------------------------------------
        // GET COLLEGE FROM BACKEND
        // ----------------------------------------

        const response = await API.get(
          `/colleges/${encodeURIComponent(
            collegeName
          )}`
        );

        if (!response.data.success) {
          return;
        }

        const collegeData =
          response.data.college;

        setCollege(collegeData);

        // ----------------------------------------
        // STUDENT PREFERENCES
        // ----------------------------------------

        const selectedCourse = String(
          preferences.course || ""
        )
          .trim()
          .toLowerCase();

        const selectedLocation = String(
          preferences.location || ""
        )
          .trim()
          .toLowerCase();

        const studentPercentage = Number(
          profile.percentage || 0
        );

        // ----------------------------------------
        // COLLEGE INFORMATION
        // ----------------------------------------

        const collegeLocation = String(
          collegeData.location ||
            collegeData.city ||
            ""
        ).toLowerCase();

        const collegeCourses =
          collegeData.courses || [];

        // ----------------------------------------
        // MATCH CALCULATION
        // ----------------------------------------

        let score = 0;

        const generatedReasons = [];

        // ========================================
        // COURSE MATCH
        // ========================================

        let courseMatch = false;

        if (selectedCourse) {
          courseMatch = collegeCourses.some(
            (course) =>
              String(course)
                .toLowerCase()
                .includes(selectedCourse)
          );
        }

        if (courseMatch) {
          score += 50;

          generatedReasons.push({
            title: "Course Match",
            description:
              `Your preferred course, ${preferences.course}, ` +
              "is available at this college.",
            matched: true,
          });
        } else {
          generatedReasons.push({
            title: "Course Match",
            description:
              "Your selected course could not be matched " +
              "with the currently available course data.",
            matched: false,
          });
        }

        // ========================================
        // LOCATION MATCH
        // ========================================

        let locationMatch = false;

        if (selectedLocation) {
          locationMatch =
            selectedLocation === "any" ||
            collegeLocation.includes(
              selectedLocation
            );
        }

        if (locationMatch) {
          score += 30;

          generatedReasons.push({
            title: "Location Match",
            description:
              `This college is located in ` +
              `${collegeData.location || collegeData.city}, ` +
              "which matches your preferred location.",
            matched: true,
          });
        } else {
          generatedReasons.push({
            title: "Location Match",
            description:
              "The college location does not match " +
              "your current location preference.",
            matched: false,
          });
        }

        // ========================================
        // ACADEMIC PROFILE
        // ========================================

        let academicMatch = false;

        if (studentPercentage >= 75) {
          academicMatch = true;
          score += 20;

          generatedReasons.push({
            title: "Academic Profile",
            description:
              `You entered ${studentPercentage}% as your ` +
              "academic percentage. Your academic profile " +
              "has been considered in this match.",
            matched: true,
          });
        } else if (studentPercentage >= 60) {
          academicMatch = true;
          score += 10;

          generatedReasons.push({
            title: "Academic Profile",
            description:
              `You entered ${studentPercentage}% as your ` +
              "academic percentage. Your academic profile " +
              "has been partially considered in this match.",
            matched: true,
          });
        } else {
          generatedReasons.push({
            title: "Academic Profile",
            description:
              "Your academic percentage is below the " +
              "current prototype matching threshold.",
            matched: false,
          });
        }

        setMatchScore(score);
        setReasons(generatedReasons);
      } catch (error) {
        console.error(
          "EXPLAIN COLLEGE ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (collegeName) {
      loadCollegeExplanation();
    } else {
      setLoading(false);
    }
  }, [collegeName]);

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="explain-college-page">
        <nav className="explain-navbar">
          <div className="explain-logo">
            <GraduationCap size={30} />
            <span>EduGuide AI</span>
          </div>
        </nav>

        <main className="explain-container">
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <Sparkles
              size={48}
              style={{
                color: "#4f46e5",
                marginBottom: "15px",
              }}
            />

            <h2>
              Analyzing this college...
            </h2>

            <p
              style={{
                marginTop: "10px",
                color: "#64748b",
              }}
            >
              EduGuide AI is checking your
              preferences and profile.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ============================================
  // COLLEGE NOT FOUND
  // ============================================

  if (!college) {
    return (
      <div className="explain-college-page">
        <nav className="explain-navbar">
          <div className="explain-logo">
            <GraduationCap size={30} />
            <span>EduGuide AI</span>
          </div>

          <button
            className="explain-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </nav>

        <main className="explain-container">
          <section className="next-steps-section">
            <h2>
              College information not found
            </h2>

            <p>
              We could not find the selected
              college in the current database.
            </p>

            <button
              onClick={() =>
                navigate("/colleges")
              }
            >
              Explore Colleges
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="explain-college-page">

      {/* ======================================
          NAVBAR
      ======================================= */}

      <nav className="explain-navbar">

        <div className="explain-logo">
          <GraduationCap size={30} />

          <span>
            EduGuide AI
          </span>
        </div>

        <button
          className="explain-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>


      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <main className="explain-container">

        {/* ====================================
            HEADER
        ===================================== */}

        <section className="explain-header">

          <div className="explain-ai-icon">
            <Sparkles size={34} />
          </div>

          <div>

            <h1>
              Why This College?
            </h1>

            <p>
              EduGuide AI explains why this
              college may be suitable for you.
            </p>

          </div>

        </section>


        {/* ====================================
            COLLEGE INFORMATION
        ===================================== */}

        <section className="explain-college-card">

          <div className="explain-college-icon">
            <GraduationCap size={32} />
          </div>

          <div>

            <h2>
              {college.name}
            </h2>

            <div className="explain-location">

              <MapPin size={17} />

              <span>
                {college.location ||
                  college.city ||
                  "Location not available"}
              </span>

            </div>

          </div>

        </section>


        {/* ====================================
            MATCH SCORE
        ===================================== */}

        <section className="match-card">

          <div className="match-score">

            <span className="match-number">
              {matchScore}%
            </span>

            <span className="match-label">
              Match Score
            </span>

          </div>

          <div className="match-description">

            <h2>
              {matchScore >= 80
                ? "Strong Match"
                : matchScore >= 50
                ? "Good Match"
                : "Needs Review"}
            </h2>

            <p>
              This score is calculated using
              your selected course, preferred
              location, and academic profile.
            </p>

          </div>

        </section>


        {/* ====================================
            WHY THIS COLLEGE
        ===================================== */}

        <section className="why-college-section">

          <h2>

            <Sparkles size={22} />

            Why This College?

          </h2>

          <div className="reason-list">

            {reasons.map(
              (reason, index) => (

                <div
                  className="reason-item"
                  key={index}
                >

                  {reason.matched ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Circle size={20} />
                  )}

                  <div>

                    <h3>
                      {reason.title}
                    </h3>

                    <p>
                      {reason.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* ====================================
            AVAILABLE COURSES
        ===================================== */}

        <section className="why-college-section">

          <h2>
            <GraduationCap size={22} />

            Courses Available
          </h2>

          <div className="reason-list">

            {college.courses &&
            college.courses.length > 0 ? (

              college.courses.map(
                (course, index) => (

                  <div
                    className="reason-item"
                    key={index}
                  >

                    <CheckCircle size={20} />

                    <div>

                      <h3>
                        {course}
                      </h3>

                      <p>
                        Course information is
                        available in the current
                        EduGuide AI database.
                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="reason-item">

                <Circle size={20} />

                <div>

                  <h3>
                    Course information unavailable
                  </h3>

                  <p>
                    Course information has not
                    been added to the database yet.
                  </p>

                </div>

              </div>

            )}

          </div>

        </section>


        {/* ====================================
            COLLEGE TYPE
        ===================================== */}

        <section className="why-college-section">

          <h2>
            <GraduationCap size={22} />

            College Information
          </h2>

          <div className="reason-list">

            <div className="reason-item">

              <CheckCircle size={20} />

              <div>

                <h3>
                  College Type
                </h3>

                <p>
                  {college.type ||
                    "Information not available"}
                </p>

              </div>

            </div>

            <div className="reason-item">

              <CheckCircle size={20} />

              <div>

                <h3>
                  City
                </h3>

                <p>
                  {college.city ||
                    college.location ||
                    "Information not available"}
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================
            NEXT STEPS
        ===================================== */}

        <section className="next-steps-section">

          <h2>
            What Should I Do Next?
          </h2>

          <p>
            Explore your admission readiness
            or ask EduGuide AI for more guidance
            about this college.
          </p>

          <div className="next-step-buttons">

            <button
              onClick={() =>
                navigate(
                  "/admission-readiness"
                )
              }
            >
              Check Admission Readiness
            </button>

            <button
              onClick={() =>
                navigate("/chatbot")
              }
            >
              Ask EduGuide AI
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ExplainCollege;