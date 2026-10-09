import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingAccount = localStorage.getItem(
      "eduguide_user_account"
    );

    if (existingAccount) {
      const account = JSON.parse(existingAccount);

      if (account.email === email) {
        setError(
          "An account with this email already exists. Please login."
        );
        return;
      }
    }

    const account = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "eduguide_user_account",
      JSON.stringify(account)
    );

    setSuccess(
      "Account created successfully! Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="signup-page">

      <nav className="signup-navbar">

        <div className="signup-logo">
          <GraduationCap size={30} />
          <span>EduGuide AI</span>
        </div>

        <button
          className="signup-back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>

      <main className="signup-container">

        <div className="signup-card">

          <div className="signup-icon">
            <GraduationCap size={32} />
          </div>

          <h1>Create Account</h1>

          <p className="signup-subtitle">
            Create your EduGuide AI account
          </p>

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          {success && (
            <div className="signup-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="signup-field">

              <label>
                Full Name
              </label>

              <div className="signup-input-wrapper">

                <User size={18} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="signup-field">

              <label>
                Email
              </label>

              <div className="signup-input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="signup-field">

              <label>
                Password
              </label>

              <div className="signup-input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="signup-field">

              <label>
                Confirm Password
              </label>

              <div className="signup-input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button
              type="submit"
              className="signup-submit-btn"
            >
              Create Account
            </button>

          </form>

          <div className="signup-login-link">

            <span>
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Signup;