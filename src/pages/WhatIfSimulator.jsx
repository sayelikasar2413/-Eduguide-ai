import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  MapPin,
  RotateCcw,
} from "lucide-react";

import API from "../services/api";
import "./WhatIfSimulator.css";

function WhatIfSimulator() {
  const navigate = useNavigate();

  const [percentage, setPercentage] = useState(75);
  const [course, setCourse] = useState("Computer Engineering");
  const [location, setLocation] = useState("Pune");
  const [budget, setBudget] = useState("1 - 2 Lakhs");

  const [colleges, setColleges] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await API.get("/colleges");

        if (response.data.success) {
          setColleges(response.data.colleges || []);
        }
      } catch (error) {
        console.error("WHAT-IF ERROR:", error);
      }
    };

    loadData();
  }, []);

  const calculateResults = () => {
    const calculated = colleges.map((college) => {
      let score = 0;

      const collegeLocation = (
        college.location ||
        college.city ||
        ""
      ).toLowerCase();

      const collegeCourses = college.courses || [];

      const courseMatch = collegeCourses.some((item) =>
        item.toLowerCase().includes(course.toLowerCase())
      );

      const locationMatch =
        location === "Any" ||
        collegeLocation.includes(location.toLowerCase());

      if (courseMatch) {
        score += 50;
      }

      if (locationMatch) {
        score += 30;
      }

      if (percentage >= 75) {
        score += 20;
      } else if (percentage >= 60) {
        score += 10;
      }

      return {
        ...college,
        score,
        courseMatch,
        locationMatch,
      };
    });

    calculated.sort((a, b) => b.score - a.score);

    setResults(calculated.slice(0, 5));
  };

  useEffect(() => {
    if (colleges.length > 0) {
      calculateResults();
    }
  }, [colleges]);

  const handleReset = () => {
    setPercentage(75);
    setCourse("Computer Engineering");
    setLocation("Pune");
    setBudget("1 - 2 Lakhs");
  };

  return (
    <div className="what-if-page">

      {/* Navbar */}

      <nav className="what-if-navbar">

        <div className="what-if-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="what-if-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>


      <main className="what-if-container">

        {/* Header */}

        <section className="what-if-header">

          <div className="what-if-header-icon">
            <Sparkles size={34} />
          </div>

          <div>
            <h1>What-If Simulator</h1>

            <p>
              Change your academic profile and preferences
              to see how your college options change.
            </p>
          </div>

        </section>


        {/* Controls */}

        <section className="what-if-card">

          <h2>Change Your Scenario</h2>

          {/* Percentage */}

          <div className="what-if-group">

            <label>
              Academic Percentage
            </label>

            <div className="percentage-display">
              <strong>{percentage}%</strong>
            </div>

            <input
              type="range"
              min="40"
              max="100"
              value={percentage}
              onChange={(e) =>
                setPercentage(Number(e.target.value))
              }
            />

            <div className="range-labels">
              <span>40%</span>
              <span>100%</span>
            </div>

          </div>


          {/* Course */}

          <div className="what-if-group">

            <label>
              Preferred Course
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
            >

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


          {/* Location */}

          <div className="what-if-group">

            <label>
              Preferred Location
            </label>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >

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


          {/* Budget */}

          <div className="what-if-group">

            <label>
              Annual Budget
            </label>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            >

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


          {/* Buttons */}

          <div className="what-if-actions">

            <button
              className="what-if-apply-btn"
              onClick={calculateResults}
            >
              <Sparkles size={18} />
              See Updated Colleges
            </button>

            <button
              className="what-if-reset-btn"
              onClick={handleReset}
            >
              <RotateCcw size={17} />
              Reset
            </button>

          </div>

        </section>


        {/* Results */}

        <section className="what-if-results">

          <div className="what-if-results-header">

            <div>
              <h2>
                Updated College Options
              </h2>

              <p>
                Based on your current scenario.
              </p>
            </div>

            <span>
              {results.length} options
            </span>

          </div>


          <div className="what-if-results-grid">

            {results.map((college, index) => (

              <article
                className="what-if-result-card"
                key={college.name || index}
              >

                <div className="what-if-card-top">

                  <div className="what-if-college-icon">
                    <GraduationCap size={27} />
                  </div>

                  <span>
                    #{index + 1}
                  </span>

                </div>


                <h3>
                  {college.name}
                </h3>


                <div className="what-if-location">

                  <MapPin size={16} />

                  <span>
                    {college.location ||
                      college.city ||
                      "Location unavailable"}
                  </span>

                </div>


                <div className="what-if-score">

                  <strong>
                    {college.score}%
                  </strong>

                  <span>
                    Scenario Match
                  </span>

                </div>


                <button
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

              </article>

            ))}

          </div>

        </section>


        {/* Note */}

        <section className="what-if-note">

          <Sparkles size={20} />

          <p>
            The What-If Simulator is a prototype
            recommendation feature. Match scores are
            calculated using your selected scenario and
            available college data.
          </p>

        </section>

      </main>

    </div>
  );
}

export default WhatIfSimulator;