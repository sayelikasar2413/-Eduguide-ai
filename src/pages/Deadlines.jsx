import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Bell,
  Filter
} from "lucide-react";

import "./Deadlines.css";

function Deadlines() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const deadlines = [
    {
      id: 1,
      college: "COEP Technological University",
      course: "B.Tech Computer Science",
      title: "Application Form",
      date: "15 May 2026",
      daysLeft: 18,
      status: "Upcoming",
      priority: "High"
    },
    {
      id: 2,
      college: "Vishwakarma Institute of Technology",
      course: "B.Tech Computer Engineering",
      title: "Admission Application",
      date: "22 May 2026",
      daysLeft: 25,
      status: "Upcoming",
      priority: "Medium"
    },
    {
      id: 3,
      college: "Pune Institute of Computer Technology",
      course: "B.E. Computer Engineering",
      title: "Document Submission",
      date: "28 May 2026",
      daysLeft: 31,
      status: "Upcoming",
      priority: "Medium"
    },
    {
      id: 4,
      college: "Symbiosis Institute of Technology",
      course: "B.Tech Artificial Intelligence",
      title: "Application Deadline",
      date: "5 June 2026",
      daysLeft: 39,
      status: "Upcoming",
      priority: "Low"
    },
    {
      id: 5,
      college: "MIT World Peace University",
      course: "B.Tech Artificial Intelligence",
      title: "Counselling Registration",
      date: "12 June 2026",
      daysLeft: 46,
      status: "Upcoming",
      priority: "Low"
    }
  ];

  const filteredDeadlines =
    filter === "All"
      ? deadlines
      : deadlines.filter(
          (deadline) => deadline.priority === filter
        );

  return (
    <div className="deadlines-page">

      {/* =========================
          Navbar
      ========================= */}

      <nav className="deadlines-navbar">

        <div className="deadlines-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="deadlines-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </nav>


      {/* =========================
          Main Container
      ========================= */}

      <main className="deadlines-container">

        {/* Heading */}

        <section className="deadlines-heading">

          <div className="deadlines-heading-icon">
            <Calendar size={30} />
          </div>

          <div>

            <h1>
              Deadline Center
            </h1>

            <p>
              Keep track of important admission dates
              and avoid missing application deadlines.
            </p>

          </div>

        </section>


        {/* =========================
            Alert Banner
        ========================= */}

        <section className="deadline-alert">

          <div className="deadline-alert-icon">
            <Bell size={22} />
          </div>

          <div>

            <h2>
              Stay ahead of your deadlines
            </h2>

            <p>
              EduGuide AI can help you organize
              important application and admission dates.
            </p>

          </div>

        </section>


        {/* =========================
            Summary Cards
        ========================= */}

        <section className="deadline-summary">

          <div className="deadline-summary-card">

            <div className="summary-icon upcoming">
              <Calendar size={22} />
            </div>

            <div>

              <span>
                Upcoming
              </span>

              <strong>
                {deadlines.length}
              </strong>

              <p>
                Deadlines to track
              </p>

            </div>

          </div>


          <div className="deadline-summary-card">

            <div className="summary-icon urgent">
              <AlertCircle size={22} />
            </div>

            <div>

              <span>
                High Priority
              </span>

              <strong>
                {
                  deadlines.filter(
                    (deadline) =>
                      deadline.priority === "High"
                  ).length
                }
              </strong>

              <p>
                Need your attention
              </p>

            </div>

          </div>


          <div className="deadline-summary-card">

            <div className="summary-icon completed">
              <CheckCircle size={22} />
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                0
              </strong>

              <p>
                Deadlines completed
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            Filter
        ========================= */}

        <section className="deadline-filter-section">

          <div className="deadline-filter-title">

            <Filter size={18} />

            <span>
              Filter by Priority
            </span>

          </div>


          <div className="deadline-filter-buttons">

            {["All", "High", "Medium", "Low"].map(
              (option) => (

                <button
                  key={option}
                  className={
                    filter === option
                      ? "active-filter"
                      : ""
                  }
                  onClick={() =>
                    setFilter(option)
                  }
                >
                  {option}
                </button>

              )
            )}

          </div>

        </section>


        {/* =========================
            Deadline List
        ========================= */}

        <section className="deadline-list-section">

          <div className="deadline-list-header">

            <div>

              <h2>
                Admission Deadlines
              </h2>

              <p>
                Important dates for your shortlisted
                colleges.
              </p>

            </div>

            <span>
              {filteredDeadlines.length} deadlines
            </span>

          </div>


          <div className="deadline-list">

            {filteredDeadlines.map((deadline) => (

              <div
                className="deadline-card"
                key={deadline.id}
              >

                <div className="deadline-date">

                  <Calendar size={21} />

                  <strong>
                    {deadline.date}
                  </strong>

                </div>


                <div className="deadline-content">

                  <div className="deadline-title-row">

                    <h3>
                      {deadline.title}
                    </h3>

                    <span
                      className={`priority-badge ${deadline.priority.toLowerCase()}`}
                    >
                      {deadline.priority}
                    </span>

                  </div>

                  <p className="deadline-college">
                    {deadline.college}
                  </p>

                  <p className="deadline-course">
                    {deadline.course}
                  </p>

                </div>


                <div className="deadline-right">

                  <div className="days-left">

                    <Clock size={17} />

                    <span>
                      {deadline.daysLeft} days left
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      navigate("/application-tracker")
                    }
                  >
                    Track Application
                    <ArrowRight size={15} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
            Important Note
        ========================= */}

        <section className="deadline-note">

          <AlertCircle size={20} />

          <p>
            <strong>Important:</strong> The dates shown
            here are demo data for the project interface.
            Always verify actual admission deadlines from
            the official college or admission authority
            website before applying.
          </p>

        </section>


        {/* =========================
            Roadmap CTA
        ========================= */}

        <section className="deadline-roadmap-card">

          <div>

            <h2>
              Not sure what to do next?
            </h2>

            <p>
              Follow your personalized admission roadmap
              to understand the next steps in your journey.
            </p>

          </div>

          <button
            onClick={() => navigate("/roadmap")}
          >
            View Admission Roadmap
            <ArrowRight size={17} />
          </button>

        </section>

      </main>

    </div>
  );
}

export default Deadlines;