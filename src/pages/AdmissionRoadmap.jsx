import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  CheckCircle,
  Circle,
  Route,
} from "lucide-react";

import "./AdmissionRoadmap.css";

function AdmissionRoadmap() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Check Eligibility",
      description:
        "Verify your academic qualifications and basic admission eligibility.",
      completed: true,
    },
    {
      title: "Select Course and College",
      description:
        "Choose the course and colleges that match your preferences.",
      completed: true,
    },
    {
      title: "Entrance Exam",
      description:
        "Complete the required entrance examination, if applicable.",
      completed: false,
    },
    {
      title: "Prepare Documents",
      description:
        "Collect and verify all required admission documents.",
      completed: false,
    },
    {
      title: "Submit Application",
      description:
        "Complete and submit the college or admission authority application.",
      completed: false,
    },
    {
      title: "Track Application",
      description:
        "Monitor your application status and important admission updates.",
      completed: false,
    },
    {
      title: "Complete Admission",
      description:
        "Complete the final admission process and secure your seat.",
      completed: false,
    },
  ];

  return (
    <div className="roadmap-page">

      {/* Navbar */}
      <nav className="roadmap-navbar">

        <div className="roadmap-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="roadmap-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>

      {/* Main */}
      <main className="roadmap-container">

        {/* Header */}
        <section className="roadmap-header">

          <div className="roadmap-header-icon">
            <Route size={34} />
          </div>

          <div>
            <h1>Admission Roadmap</h1>

            <p>
              Follow your personalized journey from
              college discovery to admission.
            </p>
          </div>

        </section>

        {/* Selected College */}
        <section className="roadmap-college-card">

          <div className="roadmap-college-icon">
            <GraduationCap size={30} />
          </div>

          <div>
            <span>Selected College</span>

            <h2>
              Your Target College
            </h2>

            <div className="roadmap-location">
              <MapPin size={16} />
              Maharashtra
            </div>
          </div>

        </section>

        {/* Roadmap */}
        <section className="roadmap-section">

          <h2>
            Your Admission Journey
          </h2>

          <div className="roadmap-list">

            {steps.map((step, index) => (

              <div
                className="roadmap-item"
                key={index}
              >

                {/* Timeline */}
                <div className="roadmap-timeline">

                  <div
                    className={
                      step.completed
                        ? "roadmap-circle completed"
                        : "roadmap-circle"
                    }
                  >
                    {step.completed ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={
                        step.completed
                          ? "roadmap-line completed"
                          : "roadmap-line"
                      }
                    />
                  )}

                </div>

                {/* Content */}
                <div className="roadmap-content">

                  <span className="roadmap-step">
                    Step {index + 1}
                  </span>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                  {step.completed && (
                    <span className="roadmap-completed">
                      Completed
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* Quick Actions */}
        <section className="roadmap-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="roadmap-action-buttons">

            <button
              onClick={() =>
                navigate("/admission-readiness")
              }
            >
              Check Readiness
            </button>

            <button
              onClick={() =>
                navigate("/documents")
              }
            >
              View Documents
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdmissionRoadmap;