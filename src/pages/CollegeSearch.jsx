import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Search,
  MapPin,
  Building2,
  GitCompare,
  ArrowLeft,
} from "lucide-react";

import API from "../services/api";
import "./CollegeSearch.css";

function CollegeSearch() {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");

  const [selectedColleges, setSelectedColleges] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // LOAD COLLEGES FROM BACKEND
  // =========================================

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await API.get("/colleges");

        if (response.data.success) {
          const collegeData = response.data.colleges || [];

          setColleges(collegeData);
          setFilteredColleges(collegeData);
        } else {
          setError("Unable to load colleges.");
        }
      } catch (err) {
        console.error("COLLEGE SEARCH ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Unable to connect to EduGuide AI backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // =========================================
  // LOAD SAVED COURSE PREFERENCE
  // =========================================

  useEffect(() => {
    const savedPreferences = localStorage.getItem(
      "eduguide_preferences"
    );

    if (!savedPreferences) {
      return;
    }

    try {
      const preferences = JSON.parse(savedPreferences);

      if (preferences.course) {
        const savedCourse = String(preferences.course);

        const courseExists = colleges.some((college) => {
          const courses = college.courses;

          if (Array.isArray(courses)) {
            return courses.some((course) =>
              String(course)
                .toLowerCase()
                .includes(savedCourse.toLowerCase())
            );
          }

          if (typeof courses === "string") {
            return courses
              .toLowerCase()
              .includes(savedCourse.toLowerCase());
          }

          return false;
        });

        if (courseExists) {
          setCourseFilter(savedCourse);
        }
      }
    } catch (err) {
      console.error(
        "Unable to read saved preferences:",
        err
      );
    }
  }, [colleges]);

  // =========================================
  // FILTER COLLEGES
  // =========================================

  useEffect(() => {
    let results = [...colleges];

    const searchText = search.toLowerCase().trim();

    // -----------------------------------------
    // SEARCH FILTER
    // -----------------------------------------

    if (searchText) {
      results = results.filter((college) => {
        const searchableValues = [
          college.name,
          college.city,
          college.location,
          college.state,
          college.type,
        ];

        return searchableValues
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(searchText)
          );
      });
    }

    // -----------------------------------------
    // TYPE FILTER
    // -----------------------------------------

    if (typeFilter !== "All") {
      results = results.filter((college) => {
        return (
          String(college.type || "")
            .trim()
            .toLowerCase() === typeFilter.toLowerCase()
        );
      });
    }

    // -----------------------------------------
    // COURSE FILTER
    // -----------------------------------------

    if (courseFilter !== "All") {
      results = results.filter((college) => {
        const courses = college.courses;

        // If courses is an ARRAY
        if (Array.isArray(courses)) {
          return courses.some((course) =>
            String(course)
              .toLowerCase()
              .includes(courseFilter.toLowerCase())
          );
        }

        // If courses is a STRING
        if (typeof courses === "string") {
          return courses
            .toLowerCase()
            .includes(courseFilter.toLowerCase());
        }

        return false;
      });
    }

    setFilteredColleges(results);
  }, [
    colleges,
    search,
    typeFilter,
    courseFilter,
  ]);

  // =========================================
  // SELECT COLLEGE FOR COMPARISON
  // =========================================

  const handleSelectCollege = (college) => {
    const alreadySelected = selectedColleges.some(
      (selected) =>
        selected.name === college.name
    );

    // Remove if already selected
    if (alreadySelected) {
      setSelectedColleges((current) =>
        current.filter(
          (selected) =>
            selected.name !== college.name
        )
      );

      return;
    }

    // Maximum 3 colleges
    if (selectedColleges.length >= 3) {
      alert("You can compare maximum 3 colleges.");
      return;
    }

    setSelectedColleges((current) => [
      ...current,
      college,
    ]);
  };

  // =========================================
  // COMPARE SELECTED COLLEGES
  // =========================================

  const handleCompare = () => {
    if (selectedColleges.length < 2) {
      alert("Please select at least 2 colleges.");
      return;
    }

    const names = selectedColleges
      .map((college) => college.name)
      .join(",");

    navigate(
      `/compare-colleges?names=${encodeURIComponent(
        names
      )}`
    );
  };

  // =========================================
  // VIEW COLLEGE DETAILS
  // =========================================

  const handleViewDetails = (college) => {
    navigate(
      `/college/${encodeURIComponent(
        college.name
      )}`
    );
  };

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {
    return (
      <div className="college-search-page">
        <div className="college-search-loading">
          <GraduationCap size={50} />

          <h2>Loading colleges...</h2>

          <p>
            Please wait while EduGuide AI loads
            college information.
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // ERROR SCREEN
  // =========================================

  if (error) {
    return (
      <div className="college-search-page">
        <div className="college-search-error">
          <GraduationCap size={50} />

          <h2>Unable to Load Colleges</h2>

          <p>{error}</p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <div className="college-search-page">

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="college-search-navbar">

        <div className="college-search-logo">
          <GraduationCap size={30} />

          <span>EduGuide AI</span>
        </div>

        <button
          className="college-search-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />

          Dashboard
        </button>

      </nav>

      {/* =====================================
          MAIN CONTAINER
      ====================================== */}

      <main className="college-search-container">

        {/* ===================================
            HEADER
        ==================================== */}

        <section className="college-search-header">

          <div>
            <h1>Find Your College</h1>

            <p>
              Search and compare colleges based
              on your preferences.
            </p>
          </div>

          {/* Compare button appears after
              selecting colleges */}

          {selectedColleges.length > 0 && (
            <button
              className="compare-top-btn"
              onClick={handleCompare}
            >
              <GitCompare size={18} />

              Compare (
              {selectedColleges.length}
              )
            </button>
          )}

        </section>

        {/* ===================================
            FILTERS
        ==================================== */}

        <section className="college-filters">

          {/* SEARCH */}

          <div className="college-search-input">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search college or city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* TYPE FILTER */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="Government">
              Government
            </option>

            <option value="Private">
              Private
            </option>
          </select>

          {/* COURSE FILTER */}

          <select
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(e.target.value)
            }
          >
            <option value="All">
              All Courses
            </option>

            <option value="Computer Science">
              Computer Science
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

            <option value="AI & ML">
              AI & ML
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

        </section>

        {/* ===================================
            RESULTS HEADER
        ==================================== */}

        <div className="college-results-header">

          <h2>
            Available Colleges
          </h2>

          <span>
            {filteredColleges.length} colleges found
          </span>

        </div>

        {/* ===================================
            NO RESULTS
        ==================================== */}

        {filteredColleges.length === 0 ? (

          <div className="no-colleges">

            <GraduationCap size={45} />

            <h2>
              No colleges found
            </h2>

            <p>
              Try changing your search or
              filters.
            </p>

          </div>

        ) : (

          /* =================================
             COLLEGE CARDS
          ================================== */

          <section className="college-results-grid">

            {filteredColleges.map(
              (college, index) => {

                const isSelected =
                  selectedColleges.some(
                    (selected) =>
                      selected.name ===
                      college.name
                  );

                return (
                  <article
                    className={`college-card ${
                      isSelected
                        ? "college-card-selected"
                        : ""
                    }`}
                    key={
                      college.name || index
                    }
                  >

                    {/* CARD HEADER */}

                    <div className="college-card-header">

                      <div className="college-card-icon">
                        <GraduationCap
                          size={30}
                        />
                      </div>

                      <span className="college-type">
                        {college.type ||
                          "College"}
                      </span>

                    </div>

                    {/* COLLEGE NAME */}

                    <h3>
                      {college.name}
                    </h3>

                    {/* LOCATION */}

                    <div className="college-card-location">

                      <MapPin size={17} />

                      <span>
                        {college.location ||
                          college.city ||
                          "Location not available"}
                      </span>

                    </div>

                    {/* COURSES */}

                    <div className="college-card-courses">

                      <Building2 size={17} />

                      <span>
                        {Array.isArray(
                          college.courses
                        )
                          ? college.courses.length > 0
                            ? `${college.courses.length} courses available`
                            : "Courses not available"
                          : college.courses
                            ? "Courses available"
                            : "Courses not available"}
                      </span>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="college-card-actions">

                      {/* VIEW DETAILS */}

                      <button
                        className="details-btn"
                        onClick={() =>
                          handleViewDetails(
                            college
                          )
                        }
                      >
                        View Details
                      </button>

                      {/* SELECT FOR COMPARISON */}

                      <button
                        className={
                          isSelected
                            ? "selected-btn"
                            : "select-btn"
                        }
                        onClick={() =>
                          handleSelectCollege(
                            college
                          )
                        }
                      >
                        {isSelected
                          ? "Selected ✓"
                          : "Compare"}
                      </button>

                    </div>

                  </article>
                );
              }
            )}

          </section>
        )}

      </main>
    </div>
  );
}

export default CollegeSearch;