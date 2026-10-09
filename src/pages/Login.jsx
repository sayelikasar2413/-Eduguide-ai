import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = email.trim().toLowerCase();

    if (!enteredEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const savedAccount = localStorage.getItem(
      "eduguide_user_account"
    );

    if (!savedAccount) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    const account = JSON.parse(savedAccount);

    if (
      account.email !== enteredEmail ||
      account.password !== password
    ) {
      setError(
        "Incorrect email or password."
      );
      return;
    }

    // Save login status
    localStorage.setItem(
      "eduguide_logged_in",
      "true"
    );

    localStorage.setItem(
      "eduguide_current_user",
      JSON.stringify({
        name: account.name,
        email: account.email,
      })
    );

    // Go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      <nav className="login-navbar">

        <div className="login-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="login-back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>

      <main className="login-container">

        <div className="login-card">

          <div className="login-icon">
            <GraduationCap size={32} />
          </div>

          <h1>
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to continue using EduGuide AI
          </p>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="login-field">

              <label>
                Email
              </label>

              <div className="login-input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            <div className="login-field">

              <label>
                Password
              </label>

              <div className="login-input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            <button
              type="submit"
              className="login-submit-btn"
            >
              Login
            </button>

          </form>

          <div className="login-signup-link">

            <span>
              Don't have an account?
            </span>

            <button
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;