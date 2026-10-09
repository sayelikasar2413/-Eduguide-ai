import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  CheckCircle,
  Circle,
  ClipboardCheck,
} from "lucide-react";

import "./AdmissionReadiness.css";

function AdmissionReadiness() {
  const navigate = useNavigate();

  const readinessItems = [
    {
      title: "Academic Eligibility",
      description:
        "Check whether your academic qualifications meet the basic eligibility requirements.",
      completed: true,
    },
    {
      title: "Entrance Exam",
      description:
        "Check whether the required entrance examination has been completed or is required.",
      completed: false,
    },
    {
      title: "Required Documents",
      description:
        "Make sure all important admission documents are ready.",
      completed: false,
    },
    {
      title: "Application Form",
      description:
        "Complete the college or admission authority application form.",
      completed: false,
    },
    {
      title: "Admission Deadline",
      description:
        "Check the application deadline so that you do not miss the admission window.",
      completed: false,
    },
  ];

  const completedItems = readinessItems.filter(
    (item) => item.completed
  ).length;

  const readinessPercentage = Math.round(
    (completedItems / readinessItems.length) * 100
  );

  return (
    <div className="readiness-page">

      {/* Navbar */}
      <nav className="readiness-navbar">

        <div className="readiness-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="readiness-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>

      {/* Main */}
      <main className="readiness-container">

        {/* Header */}
        <section className="readiness-header">

          <div className="readiness-header-icon">
            <ClipboardCheck size={34} />
          </div>

          <div>
            <h1>Admission Readiness</h1>

            <p>
              Check how prepared you are for the college
              admission process.
            </p>
          </div>

        </section>

        {/* Score */}
        <section className="readiness-score-card">

          <div className="readiness-score-circle">

            <span>
              {readinessPercentage}%
            </span>

            <small>
              Ready
            </small>

          </div>

          <div className="readiness-score-content">

            <h2>
              Your Admission Readiness
            </h2>

            <p>
              You have completed{" "}
              <strong>
                {completedItems}
              </strong>{" "}
              out of{" "}
              <strong>
                {readinessItems.length}
              </strong>{" "}
              important admission steps.
            </p>

          </div>

        </section>

        {/* Checklist */}
        <section className="readiness-checklist">

          <h2>
            Admission Checklist
          </h2>

          <div className="readiness-items">

            {readinessItems.map(
              (item, index) => (

                <div
                  className="readiness-item"
                  key={index}
                >

                  <div className="readiness-status">

                    {item.completed ? (
                      <CheckCircle size={25} />
                    ) : (
                      <Circle size={25} />
                    )}

                  </div>

                  <div className="readiness-item-content">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <span
                    className={
                      item.completed
                        ? "status-completed"
                        : "status-pending"
                    }
                  >
                    {item.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                </div>

              )
            )}

          </div>

        </section>

        {/* Next Action */}
        <section className="readiness-next">

          <h2>
            What should you do next?
          </h2>

          <p>
            Follow your admission roadmap and keep
            your documents ready.
          </p>

          <div className="readiness-action-buttons">

            <button
              onClick={() =>
                navigate("/admission-roadmap")
              }
            >
              View Admission Roadmap
            </button>

            <button
              onClick={() =>
                navigate("/documents")
              }
            >
              Check Document Checklist
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdmissionReadiness;