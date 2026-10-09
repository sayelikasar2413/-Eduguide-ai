import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Search,
  Bot,
  ArrowRight,
  CheckCircle
} from "lucide-react";

import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      {/* Navbar */}
      <nav className="welcome-navbar">

        <div className="logo">
          <GraduationCap size={32} />
          <span>EduGuide AI</span>
        </div>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            AI-Powered College Guidance
          </div>

          <h1>
            Find the right college.
            <br />
            <span>Plan your admission.</span>
          </h1>

          <p>
            EduGuide AI helps students discover, compare and
            choose colleges based on their academic profile,
            preferred course, location and budget.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/colleges")}
            >
              <Search size={18} />
              Explore Colleges
            </button>

          </div>

        </div>

        {/* AI Advisor Card */}
        <div className="advisor-card">

          <div className="advisor-icon">
            <Bot size={32} />
          </div>

          <h2>Your AI College Advisor</h2>

          <p>
            Get personalized college recommendations,
            admission guidance and answers to your
            college-related questions.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <CheckCircle size={19} />
              <span>Personalized recommendations</span>
            </div>

            <div className="feature-item">
              <CheckCircle size={19} />
              <span>Explainable match scores</span>
            </div>

            <div className="feature-item">
              <CheckCircle size={19} />
              <span>Admission readiness</span>
            </div>

            <div className="feature-item">
              <CheckCircle size={19} />
              <span>Application tracking</span>
            </div>

          </div>

        </div>

      </section>

      {/* Bottom Features */}
      <section className="features-section">

        <div className="feature-box">
          <h3>🔍 Discover</h3>
          <p>
            Find colleges based on course,
            location and budget.
          </p>
        </div>

        <div className="feature-box">
          <h3>🤖 Analyze</h3>
          <p>
            Understand your college match
            and admission readiness.
          </p>
        </div>

        <div className="feature-box">
          <h3>🎯 Decide</h3>
          <p>
            Compare colleges and find the
            best options for your profile.
          </p>
        </div>

        <div className="feature-box">
          <h3>📋 Apply</h3>
          <p>
            Follow your admission roadmap
            and track applications.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Welcome;