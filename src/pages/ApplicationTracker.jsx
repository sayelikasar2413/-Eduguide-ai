import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  ClipboardCheck,
  CheckCircle,
  Circle,
  Clock,
  FileText,
  Send,
  Eye,
  ArrowRight
} from "lucide-react";

import "./ApplicationTracker.css";

function ApplicationTracker() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      college: "COEP Technological University",
      course: "B.Tech Computer Science",
      status: "In Progress",
      progress: 60,
      steps: [
        {
          name: "College Selected",
          completed: true
        },
        {
          name: "Documents Prepared",
          completed: true
        },
        {
          name: "Application Started",
          completed: true
        },
        {
          name: "Application Submitted",
          completed: false
        },
        {
          name: "Admission Confirmation",
          completed: false
        }
      ]
    },
    {
      id: 2,
      college: "Vishwakarma Institute of Technology",
      course: "B.Tech Computer Engineering",
      status: "Not Started",
      progress: 20,
      steps: [
        {
          name: "College Selected",
          completed: true
        },
        {
          name: "Documents Prepared",
          completed: false
        },
        {
          name: "Application Started",
          completed: false
        },
        {
          name: "Application Submitted",
          completed: false
        },
        {
          name: "Admission Confirmation",
          completed: false
        }
      ]
    }
  ]);

  const updateStep = (applicationId, stepIndex) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) => {
        if (application.id !== applicationId) {
          return application;
        }

        const updatedSteps = application.steps.map(
          (step, index) =>
            index === stepIndex
              ? {
                  ...step,
                  completed: !step.completed
                }
              : step
        );

        const completedSteps = updatedSteps.filter(
          (step) => step.completed
        ).length;

        const progress = Math.round(
          (completedSteps / updatedSteps.length) * 100
        );

        let status = "Not Started";

        if (progress === 100) {
          status = "Completed";
        } else if (progress > 20) {
          status = "In Progress";
        }

        return {
          ...application,
          steps: updatedSteps,
          progress,
          status
        };
      })
    );
  };

  return (
    <div className="application-page">

      {/* =========================
          Navbar
      ========================= */}

      <nav className="application-navbar">

        <div className="application-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="application-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </nav>


      {/* =========================
          Main Container
      ========================= */}

      <main className="application-container">

        {/* Heading */}

        <section className="application-heading">

          <div className="application-heading-icon">
            <ClipboardCheck size={30} />
          </div>

          <div>

            <h1>
              Application Tracker
            </h1>

            <p>
              Track your college applications from
              preparation to admission confirmation.
            </p>

          </div>

        </section>


        {/* =========================
            Overall Summary
        ========================= */}

        <section className="application-summary">

          <div className="application-summary-card">

            <div className="application-summary-icon">
              <FileText size={22} />
            </div>

            <div>

              <span>
                Applications
              </span>

              <strong>
                {applications.length}
              </strong>

              <p>
                Being tracked
              </p>

            </div>

          </div>


          <div className="application-summary-card">

            <div className="application-summary-icon">
              <Clock size={22} />
            </div>

            <div>

              <span>
                In Progress
              </span>

              <strong>
                {
                  applications.filter(
                    (application) =>
                      application.status === "In Progress"
                  ).length
                }
              </strong>

              <p>
                Applications underway
              </p>

            </div>

          </div>


          <div className="application-summary-card">

            <div className="application-summary-icon">
              <CheckCircle size={22} />
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {
                  applications.filter(
                    (application) =>
                      application.status === "Completed"
                  ).length
                }
              </strong>

              <p>
                Applications completed
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            Application Cards
        ========================= */}

        <section className="applications-section">

          <div className="applications-section-header">

            <div>

              <h2>
                My Applications
              </h2>

              <p>
                Keep your admission applications organized.
              </p>

            </div>

          </div>


          <div className="applications-list">

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                {/* Card Header */}

                <div className="application-card-header">

                  <div>

                    <h3>
                      {application.college}
                    </h3>

                    <p>
                      {application.course}
                    </p>

                  </div>

                  <span
                    className={
                      application.status === "Completed"
                        ? "application-status completed"
                        : application.status === "In Progress"
                        ? "application-status progress"
                        : "application-status not-started"
                    }
                  >
                    {application.status}
                  </span>

                </div>


                {/* Progress */}

                <div className="application-progress-section">

                  <div className="application-progress-top">

                    <span>
                      Application Progress
                    </span>

                    <strong>
                      {application.progress}%
                    </strong>

                  </div>

                  <div className="application-progress-bar">

                    <div
                      style={{
                        width: `${application.progress}%`
                      }}
                    />

                  </div>

                </div>


                {/* Steps */}

                <div className="application-steps">

                  {application.steps.map(
                    (step, index) => (

                      <div
                        className={
                          step.completed
                            ? "application-step completed-step"
                            : "application-step"
                        }
                        key={step.name}
                      >

                        <button
                          className="step-check-btn"
                          onClick={() =>
                            updateStep(
                              application.id,
                              index
                            )
                          }
                        >
                          {step.completed ? (
                            <CheckCircle size={22} />
                          ) : (
                            <Circle size={22} />
                          )}
                        </button>

                        <div className="step-content">

                          <span>
                            Step {index + 1}
                          </span>

                          <h4>
                            {step.name}
                          </h4>

                        </div>

                      </div>

                    )
                  )}

                </div>


                {/* Card Actions */}

                <div className="application-card-actions">

                  <button
                    className="view-application-btn"
                    onClick={() =>
                      navigate("/college/1")
                    }
                  >
                    <Eye size={16} />
                    View College
                  </button>

                  <button
                    className="application-roadmap-btn"
                    onClick={() =>
                      navigate("/roadmap")
                    }
                  >
                    Admission Roadmap
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
            Start Application
        ========================= */}

        <section className="start-application-card">

          <div className="start-application-icon">
            <Send size={24} />
          </div>

          <div className="start-application-content">

            <h2>
              Ready to apply?
            </h2>

            <p>
              Review your documents, check deadlines
              and follow your admission roadmap before
              submitting an application.
            </p>

          </div>

          <button
            onClick={() => navigate("/documents")}
          >
            Check Documents
            <ArrowRight size={17} />
          </button>

        </section>


        {/* =========================
            Disclaimer
        ========================= */}

        <div className="application-note">

          <Circle size={8} />

          <p>
            Application status shown here is for
            project demonstration. In the final system,
            application status can be updated using
            verified admission data and user actions.
          </p>

        </div>

      </main>

    </div>
  );
}

export default ApplicationTracker;