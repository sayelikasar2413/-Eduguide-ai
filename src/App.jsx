import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==========================================
// MAIN PAGES
// ==========================================

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProfileSetup from "./pages/ProfileSetup";
import Preferences from "./pages/Preferences";

// ==========================================
// COLLEGE DISCOVERY
// ==========================================

import CollegeSearch from "./pages/CollegeSearch";
import CollegeDetails from "./pages/CollegeDetails";
import CompareColleges from "./pages/CompareColleges";

import Recommendations from "./pages/Recommendations";
import ExplainCollege from "./pages/ExplainCollege";

// ==========================================
// ADMISSION ASSISTANCE
// ==========================================

import AdmissionReadiness from "./pages/AdmissionReadiness";
import Documents from "./pages/Documents";
import AdmissionRoadmap from "./pages/AdmissionRoadmap";

// ==========================================
// SMART TOOLS
// ==========================================

import WhatIfSimulator from "./pages/WhatIfSimulator";

// ==========================================
// AI
// ==========================================

import Chatbot from "./pages/Chatbot";

// ==========================================
// STUDENT TRACKING
// ==========================================

import Shortlist from "./pages/Shortlist";
import Deadlines from "./pages/Deadlines";
import ApplicationTracker from "./pages/ApplicationTracker";


function App() {
  return (
    <BrowserRouter basename="/-Eduguide-ai">

      <Routes>

        {/* ==================================
            WELCOME
        =================================== */}

        <Route
          path="/"
          element={<Welcome />}
        />


        {/* ==================================
            LOGIN / SIGNUP
        =================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* ==================================
            DASHBOARD
        =================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ==================================
            STUDENT PROFILE
        =================================== */}

        <Route
          path="/profile-setup"
          element={<ProfileSetup />}
        />

        <Route
          path="/preferences"
          element={<Preferences />}
        />


        {/* ==================================
            AI RECOMMENDATIONS
        =================================== */}

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/explain-college"
          element={<ExplainCollege />}
        />


        {/* ==================================
            COLLEGE SEARCH
        =================================== */}

        <Route
          path="/colleges"
          element={<CollegeSearch />}
        />

        <Route
          path="/college/:collegeName"
          element={<CollegeDetails />}
        />

        <Route
          path="/compare-colleges"
          element={<CompareColleges />}
        />


        {/* ==================================
            ADMISSION
        =================================== */}

        <Route
          path="/admission-readiness"
          element={<AdmissionReadiness />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/admission-roadmap"
          element={<AdmissionRoadmap />}
        />


        {/* ==================================
            WHAT-IF SIMULATOR
        =================================== */}

        <Route
          path="/what-if"
          element={<WhatIfSimulator />}
        />


        {/* ==================================
            AI CHATBOT
        =================================== */}

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />


        {/* ==================================
            STUDENT TRACKING
        =================================== */}

        <Route
          path="/shortlist"
          element={<Shortlist />}
        />

        <Route
          path="/deadlines"
          element={<Deadlines />}
        />

        <Route
          path="/application-tracker"
          element={<ApplicationTracker />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
