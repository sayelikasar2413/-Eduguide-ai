import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Building2,
  BookOpen,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

import API from "../services/api";
import "./CompareColleges.css";

function CompareColleges() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // LOAD SELECTED COLLEGES
  // =========================================

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const names = searchParams.get("names");

        if (!names) {
          setError(
            "No colleges selected for comparison."
          );
          setLoading(false);
          return;
        }

        const response = await API.get(
          `/colleges/compare?names=${encodeURIComponent(
            names
          )}`
        );

        if (response.data.success) {
          setColleges(
            response.data.colleges || []
          );
        } else {
          setError(
            response.data.message ||
              "Unable to compare colleges."
          );
        }
      } catch (err) {
        console.error(
          "COMPARE COLLEGES ERROR:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load comparison data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [searchParams]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="compare-page">

        <div className="compare-loading">

          <GraduationCap size={55} />

          <h2>
            Loading comparison...
          </h2>

          <p>
            Please wait while we prepare
            your comparison.
          </p>

        </div>

      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="compare-page">

        <div className="compare-error">

          <GraduationCap size={55} />

          <h2>
            Unable to Compare Colleges
          </h2>

          <p>
            {error}
          </p>

          <button
            className="compare-back-btn"
            onClick={() =>
              navigate("/colleges")
            }
          >
            <ArrowLeft size={18} />

            Back to Colleges
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // NOT ENOUGH COLLEGES
  // =========================================

  if (colleges.length < 2) {
    return (
      <div className="compare-page">

        <div className="compare-error">

          <GraduationCap size={55} />

          <h2>
            Not Enough Colleges
          </h2>

          <p>
            Please select at least two
            colleges to compare.
          </p>

          <button
            className="compare-back-btn"
            onClick={() =>
              navigate("/colleges")
            }
          >
            <ArrowLeft size={18} />

            Select Colleges
          </button>

        </div>

      </div>
    );
  }

  // =========================================
  // HELPER FUNCTIONS
  // =========================================

  const getCourses = (college) => {
    if (Array.isArray(college.courses)) {
      return college.courses;
    }

    if (typeof college.courses === "string") {
      return college.courses
        .split(",")
        .map((course) => course.trim())
        .filter(Boolean);
    }

    return [];
  };

  const getFees = (college) => {
    if (
      college.fees !== undefined &&
      college.fees !== null &&
      college.fees !== ""
    ) {
      return college.fees;
    }

    if (
      college.fee !== undefined &&
      college.fee !== null &&
      college.fee !== ""
    ) {
      return college.fee;
    }

    return "Not available";
  };

  const getEligibility = (college) => {
    return (
      college.eligibility ||
      college.eligibility_criteria ||
      "Not available"
    );
  };

  const getFacilities = (college) => {
    if (Array.isArray(college.facilities)) {
      return college.facilities;
    }

    if (typeof college.facilities === "string") {
      return college.facilities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <div className="compare-page">

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="compare-navbar">

        <div className="compare-logo">

          <GraduationCap size={30} />

          <span>
            EduGuide AI
          </span>

        </div>

        <button
          className="compare-back-btn"
          onClick={() =>
            navigate("/colleges")
          }
        >
          <ArrowLeft size={18} />

          Back to Colleges
        </button>

      </nav>


      {/* =====================================
          MAIN CONTAINER
      ====================================== */}

      <main className="compare-container">

        {/* HEADER */}

        <div className="compare-header">

          <h1>
            Compare Colleges
          </h1>

          <p>
            Compare the selected colleges
            side by side.
          </p>

        </div>


        {/* ===================================
            COLLEGE HEADER CARDS
        ==================================== */}

        <div className="comparison-wrapper">

          <div className="comparison-header-grid">

            <div className="comparison-label">

              <span>
                Comparison
              </span>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-college-header"
                  key={
                    college.name || index
                  }
                >

                  <div className="comparison-icon">

                    <GraduationCap
                      size={32}
                    />

                  </div>

                  <h2>
                    {college.name}
                  </h2>

                  <span className="comparison-type">
                    {college.type ||
                      "College"}
                  </span>

                </div>

              )
            )}

          </div>


          {/* =================================
              LOCATION
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <MapPin size={20} />

              <strong>
                Location
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >
                  {college.location ||
                    college.city ||
                    "Not available"}
                </div>

              )
            )}

          </div>


          {/* =================================
              CITY
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <MapPin size={20} />

              <strong>
                City
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >
                  {college.city ||
                    "Not available"}
                </div>

              )
            )}

          </div>


          {/* =================================
              TYPE
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <Building2 size={20} />

              <strong>
                Type
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >
                  {college.type ||
                    "Not available"}
                </div>

              )
            )}

          </div>


          {/* =================================
              COURSES
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <BookOpen size={20} />

              <strong>
                Courses
              </strong>

            </div>

            {colleges.map(
              (college, index) => {

                const courses =
                  getCourses(college);

                return (
                  <div
                    className="comparison-value"
                    key={
                      college.name || index
                    }
                  >

                    {courses.length > 0 ? (

                      <ul className="comparison-list">

                        {courses.map(
                          (course, courseIndex) => (

                            <li
                              key={courseIndex}
                            >
                              {course}
                            </li>

                          )
                        )}

                      </ul>

                    ) : (
                      "Not available"
                    )}

                  </div>
                );
              }
            )}

          </div>


          {/* =================================
              FEES
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <IndianRupee size={20} />

              <strong>
                Fees
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >

                  {getFees(college)}

                </div>

              )
            )}

          </div>


          {/* =================================
              ELIGIBILITY
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <CheckCircle size={20} />

              <strong>
                Eligibility
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >

                  {getEligibility(
                    college
                  )}

                </div>

              )
            )}

          </div>


          {/* =================================
              FACILITIES
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <Building2 size={20} />

              <strong>
                Facilities
              </strong>

            </div>

            {colleges.map(
              (college, index) => {

                const facilities =
                  getFacilities(college);

                return (
                  <div
                    className="comparison-value"
                    key={
                      college.name || index
                    }
                  >

                    {facilities.length > 0 ? (

                      <ul className="comparison-list">

                        {facilities.map(
                          (
                            facility,
                            facilityIndex
                          ) => (

                            <li
                              key={
                                facilityIndex
                              }
                            >
                              {facility}
                            </li>

                          )
                        )}

                      </ul>

                    ) : (
                      "Not available"
                    )}

                  </div>
                );
              }
            )}

          </div>


          {/* =================================
              VIEW DETAILS
          ================================== */}

          <div className="comparison-row">

            <div className="comparison-label">

              <GraduationCap size={20} />

              <strong>
                Details
              </strong>

            </div>

            {colleges.map(
              (college, index) => (

                <div
                  className="comparison-value"
                  key={
                    college.name || index
                  }
                >

                  <button
                    className="comparison-details-btn"
                    onClick={() =>
                      navigate(
                        `/college/${encodeURIComponent(
                          college.name
                        )}`
                      )
                    }
                  >
                    View Details
                  </button>

                </div>

              )
            )}

          </div>

        </div>


        {/* ===================================
            BOTTOM BUTTON
        ==================================== */}

        <div className="compare-bottom-actions">

          <button
            className="compare-back-btn"
            onClick={() =>
              navigate("/colleges")
            }
          >
            <ArrowLeft size={18} />

            Compare Other Colleges
          </button>

        </div>

      </main>

    </div>
  );
}

export default CompareColleges;