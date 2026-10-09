import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  FileText,
  CheckCircle,
  Circle,
  Upload,
  AlertCircle,
  ArrowRight
} from "lucide-react";

import "./Documents.css";

function Documents() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "10th Marksheet",
      description: "Class 10 marksheet or certificate",
      required: true,
      uploaded: true
    },
    {
      id: 2,
      name: "12th Marksheet",
      description: "Class 12 marksheet or passing certificate",
      required: true,
      uploaded: true
    },
    {
      id: 3,
      name: "Entrance Exam Scorecard",
      description: "MHT-CET, JEE Main or applicable exam scorecard",
      required: true,
      uploaded: true
    },
    {
      id: 4,
      name: "Domicile Certificate",
      description: "Valid domicile certificate, if applicable",
      required: true,
      uploaded: false
    },
    {
      id: 5,
      name: "Income Certificate",
      description: "Required for applicable scholarships or categories",
      required: false,
      uploaded: false
    },
    {
      id: 6,
      name: "Aadhaar Card",
      description: "Valid government identity document",
      required: true,
      uploaded: false
    }
  ]);

  const uploadedCount = documents.filter(
    (document) => document.uploaded
  ).length;

  const requiredDocuments = documents.filter(
    (document) => document.required
  );

  const completedRequired = requiredDocuments.filter(
    (document) => document.uploaded
  ).length;

  const readinessPercentage = Math.round(
    (completedRequired / requiredDocuments.length) * 100
  );

  const handleUpload = (id) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === id
          ? {
              ...document,
              uploaded: !document.uploaded
            }
          : document
      )
    );
  };

  return (
    <div className="documents-page">

      {/* =========================
          Navbar
      ========================= */}

      <nav className="documents-navbar">

        <div className="documents-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="documents-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </nav>


      {/* =========================
          Main Container
      ========================= */}

      <main className="documents-container">

        {/* Heading */}

        <section className="documents-heading">

          <div className="documents-heading-icon">
            <FileText size={30} />
          </div>

          <div>

            <h1>
              Document Checklist
            </h1>

            <p>
              Keep track of the documents you may need
              during your college admission process.
            </p>

          </div>

        </section>


        {/* =========================
            Progress Card
        ========================= */}

        <section className="document-progress-card">

          <div className="document-progress-left">

            <div className="document-progress-icon">
              <CheckCircle size={24} />
            </div>

            <div>

              <span>
                Required Documents
              </span>

              <strong>
                {completedRequired} /{" "}
                {requiredDocuments.length}
              </strong>

            </div>

          </div>


          <div className="document-progress-middle">

            <div className="document-progress-bar">

              <div
                style={{
                  width: `${readinessPercentage}%`
                }}
              />

            </div>

            <span>
              {readinessPercentage}% complete
            </span>

          </div>


          <div className="document-total">

            <span>
              Total Added
            </span>

            <strong>
              {uploadedCount}
            </strong>

          </div>

        </section>


        {/* =========================
            Important Note
        ========================= */}

        <section className="document-note">

          <div className="document-note-icon">
            <AlertCircle size={21} />
          </div>

          <div>

            <h2>
              Keep your documents ready
            </h2>

            <p>
              Document requirements can vary by college,
              course and admission process. Always verify
              the final requirements from the official
              admission authority or college.
            </p>

          </div>

        </section>


        {/* =========================
            Required Documents
        ========================= */}

        <section className="documents-section">

          <div className="documents-section-header">

            <div>

              <h2>
                Required Documents
              </h2>

              <p>
                Documents commonly needed during admission.
              </p>

            </div>

            <span className="required-badge">
              Required
            </span>

          </div>


          <div className="documents-list">

            {documents
              .filter((document) => document.required)
              .map((document) => (

                <div
                  className={
                    document.uploaded
                      ? "document-item uploaded"
                      : "document-item"
                  }
                  key={document.id}
                >

                  <div className="document-status-icon">

                    {document.uploaded ? (
                      <CheckCircle size={23} />
                    ) : (
                      <Circle size={23} />
                    )}

                  </div>


                  <div className="document-item-content">

                    <h3>
                      {document.name}
                    </h3>

                    <p>
                      {document.description}
                    </p>

                  </div>


                  <div className="document-item-action">

                    {document.uploaded ? (

                      <button
                        className="uploaded-btn"
                        onClick={() =>
                          handleUpload(document.id)
                        }
                      >
                        <CheckCircle size={16} />
                        Added
                      </button>

                    ) : (

                      <button
                        className="upload-btn"
                        onClick={() =>
                          handleUpload(document.id)
                        }
                      >
                        <Upload size={16} />
                        Mark as Added
                      </button>

                    )}

                  </div>

                </div>

              ))}

          </div>

        </section>


        {/* =========================
            Optional Documents
        ========================= */}

        <section className="documents-section">

          <div className="documents-section-header">

            <div>

              <h2>
                Additional Documents
              </h2>

              <p>
                These may be required depending on your
                category, scholarship or admission process.
              </p>

            </div>

            <span className="optional-badge">
              Optional
            </span>

          </div>


          <div className="documents-list">

            {documents
              .filter((document) => !document.required)
              .map((document) => (

                <div
                  className={
                    document.uploaded
                      ? "document-item uploaded"
                      : "document-item"
                  }
                  key={document.id}
                >

                  <div className="document-status-icon">

                    {document.uploaded ? (
                      <CheckCircle size={23} />
                    ) : (
                      <Circle size={23} />
                    )}

                  </div>


                  <div className="document-item-content">

                    <h3>
                      {document.name}
                    </h3>

                    <p>
                      {document.description}
                    </p>

                  </div>


                  <div className="document-item-action">

                    {document.uploaded ? (

                      <button
                        className="uploaded-btn"
                        onClick={() =>
                          handleUpload(document.id)
                        }
                      >
                        <CheckCircle size={16} />
                        Added
                      </button>

                    ) : (

                      <button
                        className="upload-btn"
                        onClick={() =>
                          handleUpload(document.id)
                        }
                      >
                        <Upload size={16} />
                        Mark as Added
                      </button>

                    )}

                  </div>

                </div>

              ))}

          </div>

        </section>


        {/* =========================
            Next Step
        ========================= */}

        <section className="documents-next-card">

          <div className="documents-next-icon">
            <CheckCircle size={24} />
          </div>

          <div className="documents-next-content">

            <h2>
              Documents are part of your admission roadmap
            </h2>

            <p>
              Once your documents are ready, check your
              admission deadlines and application progress.
            </p>

          </div>

          <button
            onClick={() => navigate("/deadlines")}
          >
            Check Deadlines
            <ArrowRight size={17} />
          </button>

        </section>

      </main>

    </div>
  );
}

export default Documents;