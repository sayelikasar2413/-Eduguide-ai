import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Send,
  Sparkles,
  User,
  Bot,
} from "lucide-react";

import API from "../services/api";
import "./Chatbot.css";

function Chatbot() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I'm EduGuide AI. I can help you with colleges, courses, eligibility, admission procedures, documents, fees, scholarships, and personalized college recommendations.",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // ============================================
  // SEND MESSAGE
  // ============================================

  const handleSend = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || sending) {
      return;
    }

    // Add user's message to chat
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setInput("");
    setSending(true);

    try {
      // ========================================
      // GET STUDENT PROFILE
      // ========================================

      const profileData = localStorage.getItem(
        "eduguide_student_profile"
      );

      // ========================================
      // GET STUDENT PREFERENCES
      // ========================================

      const preferenceData = localStorage.getItem(
        "eduguide_preferences"
      );

      const profile = profileData
        ? JSON.parse(profileData)
        : {};

      const preferences = preferenceData
        ? JSON.parse(preferenceData)
        : {};

      // ========================================
      // SEND QUESTION + PROFILE + PREFERENCES
      // TO FLASK BACKEND
      // ========================================

      const response = await API.post("/chat", {
        question: trimmedInput,
        profile: profile,
        preferences: preferences,
      });

      // ========================================
      // BACKEND SUCCESS
      // ========================================

      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text:
            response.data.answer ||
            "Sorry, I could not generate an answer.",
        };

        setMessages((currentMessages) => [
          ...currentMessages,
          botMessage,
        ]);
      } else {
        // ======================================
        // BACKEND ERROR
        // ======================================

        const errorMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text:
            response.data.message ||
            "Sorry, I could not process your question.",
        };

        setMessages((currentMessages) => [
          ...currentMessages,
          errorMessage,
        ]);
      }
    } catch (error) {
      console.error("CHATBOT ERROR:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          "Sorry, I am unable to connect to the EduGuide AI server right now. Please make sure the Flask backend is running.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage,
      ]);
    } finally {
      setSending(false);
    }
  };

  // ============================================
  // ENTER KEY
  // ============================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  // ============================================
  // SUGGESTION BUTTON
  // ============================================

  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <div className="chatbot-page">

      {/* ======================================
          NAVBAR
      ======================================= */}

      <nav className="chatbot-navbar">

        <div className="chatbot-logo">
          <GraduationCap size={30} />

          <span>
            EduGuide AI
          </span>
        </div>

        <button
          className="chatbot-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </nav>


      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <main className="chatbot-container">

        {/* ====================================
            HEADER
        ===================================== */}

        <section className="chatbot-header">

          <div className="chatbot-header-icon">
            <Sparkles size={32} />
          </div>

          <div>

            <h1>
              EduGuide AI Assistant
            </h1>

            <p>
              Ask questions about colleges,
              courses, eligibility, and admissions.
            </p>

          </div>

        </section>


        {/* ====================================
            CHAT BOX
        ===================================== */}

        <section className="chatbot-box">

          {/* ==================================
              MESSAGES
          =================================== */}

          <div className="chatbot-messages">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`chat-message ${
                  message.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }`}
              >

                <div className="message-icon">

                  {message.sender === "user" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}

                </div>

                <div className="message-content">

                  <span className="message-sender">

                    {message.sender === "user"
                      ? "You"
                      : "EduGuide AI"}

                  </span>

                  <p>
                    {message.text}
                  </p>

                </div>

              </div>

            ))}


            {/* ==================================
                THINKING INDICATOR
            =================================== */}

            {sending && (

              <div className="chat-message bot-message">

                <div className="message-icon">
                  <Bot size={18} />
                </div>

                <div className="message-content">

                  <span className="message-sender">
                    EduGuide AI
                  </span>

                  <p>
                    Thinking...
                  </p>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              SUGGESTIONS
          =================================== */}

          <div className="chatbot-suggestions">

            <span>
              Try asking:
            </span>

            <button
              onClick={() =>
                handleSuggestion(
                  "Which colleges are suitable for me?"
                )
              }
            >
              Which colleges are suitable for me?
            </button>

            <button
              onClick={() =>
                handleSuggestion(
                  "How many colleges are available?"
                )
              }
            >
              How many colleges are available?
            </button>

            <button
              onClick={() =>
                handleSuggestion(
                  "What courses are available?"
                )
              }
            >
              What courses are available?
            </button>

            <button
              onClick={() =>
                handleSuggestion(
                  "What documents do I need?"
                )
              }
            >
              What documents do I need?
            </button>

            <button
              onClick={() =>
                handleSuggestion(
                  "What is the admission process?"
                )
              }
            >
              What is the admission process?
            </button>

          </div>


          {/* ==================================
              INPUT
          =================================== */}

          <div className="chatbot-input-area">

            <input
              type="text"
              placeholder="Ask EduGuide AI something..."
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={sending}
            />

            <button
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={
                !input.trim() || sending
              }
            >

              <Send size={19} />

              {sending
                ? "Sending..."
                : "Send"}

            </button>

          </div>

        </section>


        {/* ======================================
            INFORMATION NOTE
        ======================================= */}

        <section className="chatbot-note">

          <Sparkles size={20} />

          <p>
            EduGuide AI uses your saved profile,
            preferences, and available college
            information to provide personalized
            guidance. Always verify important
            admission information from official
            college and admission authority sources.
          </p>

        </section>

      </main>

    </div>
  );
}

export default Chatbot;