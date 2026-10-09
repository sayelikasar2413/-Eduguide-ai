import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  Search,
  MessageCircle,
  Heart,
  Map,
  FileText,
  CalendarDays,
  ClipboardCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}
      <nav className="dashboard-navbar">

        <div className="dashboard-brand">
          <GraduationCap size={38} />
          <span>EduGuide AI</span>
        </div>

        <div className="dashboard-nav">

          <button
            className="dashboard-nav-button active"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            className="dashboard-nav-button"
            onClick={() => navigate("/colleges")}
          >
            <Search size={19} />
            Find Colleges
          </button>

          <button
            className="dashboard-nav-button"
            onClick={() => navigate("/chatbot")}
          >
            <MessageCircle size={19} />
            AI Assistant
          </button>

        </div>
      </nav>


      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        {/* Welcome */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-small-title">
              WELCOME TO EDUGUIDE AI
            </p>

            <h1>
              Your Personalized College Journey
            </h1>

            <p className="dashboard-subtitle">
              Find, compare and plan your college admission with AI-powered guidance.
            </p>
          </div>
        </section>


        {/* ================= MAIN FEATURES ================= */}
        <section className="dashboard-main-cards">

          {/* Find Colleges */}
          <div
            className="dashboard-main-card"
            onClick={() => navigate("/colleges")}
          >
            <div className="dashboard-card-icon blue">
              <Search size={30} />
            </div>

            <div className="dashboard-card-content">
              <h2>Find Colleges</h2>
              <p>
                Search colleges by course, location and other preferences.
              </p>

              <span className="dashboard-card-link">
                Explore Colleges
                <ArrowRight size={16} />
              </span>
            </div>
          </div>


          {/* Compare Colleges */}
          <div
            className="dashboard-main-card"
            onClick={() => navigate("/colleges")}
          >
            <div className="dashboard-card-icon purple">
              <GraduationCap size={30} />
            </div>

            <div className="dashboard-card-content">
              <h2>Compare Colleges</h2>
              <p>
                Compare colleges based on courses, fees, eligibility and facilities.
              </p>

              <span className="dashboard-card-link">
                Compare Colleges
                <ArrowRight size={16} />
              </span>
            </div>
          </div>


          {/* Recommendations */}
          <div
            className="dashboard-main-card"
            onClick={() => navigate("/recommendations")}
          >
            <div className="dashboard-card-icon green">
              <Sparkles size={30} />
            </div>

            <div className="dashboard-card-content">
              <h2>AI Recommendations</h2>
              <p>
                Get personalized college recommendations based on your profile.
              </p>

              <span className="dashboard-card-link">
                View Recommendations
                <ArrowRight size={16} />
              </span>
            </div>
          </div>


          {/* Admission Readiness */}
          <div
            className="dashboard-main-card"
            onClick={() => navigate("/admission-readiness")}
          >
            <div className="dashboard-card-icon orange">
              <ClipboardCheck size={30} />
            </div>

            <div className="dashboard-card-content">
              <h2>Admission Readiness</h2>
              <p>
                Check your eligibility and admission preparation.
              </p>

              <span className="dashboard-card-link">
                Check Readiness
                <ArrowRight size={16} />
              </span>
            </div>
          </div>

        </section>


        {/* ================= COLLEGE JOURNEY ================= */}
        <section className="dashboard-journey">

          <div className="dashboard-section-heading">
            <h2>Your College Journey</h2>
            <p>Continue your admission planning.</p>
          </div>


          <div className="dashboard-journey-grid">

            {/* Shortlist */}
            <div
              className="dashboard-journey-card"
              onClick={() => navigate("/shortlist")}
            >
              <div className="journey-icon">
                <Heart size={27} />
              </div>

              <h3>My Shortlist</h3>

              <p>
                View your saved colleges.
              </p>
            </div>


            {/* Roadmap */}
            <div
              className="dashboard-journey-card"
              onClick={() => navigate("/admission-roadmap")}
            >
              <div className="journey-icon">
                <Map size={27} />
              </div>

              <h3>Admission Roadmap</h3>

              <p>
                Follow your admission steps.
              </p>
            </div>


            {/* Documents */}
            <div
              className="dashboard-journey-card"
              onClick={() => navigate("/documents")}
            >
              <div className="journey-icon">
                <FileText size={27} />
              </div>

              <h3>Documents</h3>

              <p>
                Manage your admission documents.
              </p>
            </div>


            {/* Deadlines */}
            <div
              className="dashboard-journey-card"
              onClick={() => navigate("/deadlines")}
            >
              <div className="journey-icon">
                <CalendarDays size={27} />
              </div>

              <h3>Deadlines</h3>

              <p>
                Keep track of important dates.
              </p>
            </div>


            {/* Application Tracker */}
            <div
              className="dashboard-journey-card"
              onClick={() => navigate("/application-tracker")}
            >
              <div className="journey-icon">
                <ClipboardCheck size={27} />
              </div>

              <h3>Application Tracker</h3>

              <p>
                Track your applications.
              </p>
            </div>

          </div>


          {/* AI Assistant */}
          <div
            className="dashboard-ai-card"
            onClick={() => navigate("/chatbot")}
          >
            <div className="ai-icon">
              <MessageCircle size={27} />
            </div>

            <div>
              <h3>Ask EduGuide AI</h3>
              <p>
                Ask admission-related questions.
              </p>
            </div>

            <ArrowRight size={20} />
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;