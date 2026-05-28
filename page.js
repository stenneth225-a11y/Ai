"use client";

import { useState } from "react";

export default function Home() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question) return;

    setLoading(true);

    try {

      const res = await fetch("api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question
        })
      });

      const data = await res.json();

      setAnswer(data.answer);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      <div className="page">

        <section className="hero">

          <div className="math math1">x² + y² = r²</div>
          <div className="math math2">a² + b² = c²</div>
          <div className="math math3">∫ x dx</div>
          <div className="math math4">f(x)</div>
          <div className="math math5">√x</div>
          <div className="math math6">sin(x)</div>

          <div className="hero-content">

            <div className="badge">
              ✨ Your Personal Math Assistant
            </div>

            <h1>
              AI Math Tutor ✨
            </h1>

            <p>
              Your personal math assistant.
              <br />
              Get step-by-step solutions and explanations instantly.
            </p>

            <div className="card">

              <div className="card-title">
                💬 Ask any math question
              </div>

              <div className="input-box">

                <input
                  type="text"
                  placeholder="Type your math question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}

                  onKeyDown={(e)=>{if(e.key === "enter") askAI();}}
                
                />

                <div className="math-icon">
                  Σx
                </div>

              </div>

              <div className="examples">

                <button
                 onClick={() => {
                  setQuestion("2+2");
                  setTimeout(() => askAI(), 100);
                 }}
                 >
                  2+2
                  </button>
                <button
                onClick={() => {
                  setQuestion("x^2 + 3x + 2 = 0");
                  setTimeout(() => askAI(), 100);
                }}
                >
                  x² + 3x + 2 = 0</button>
                <button
                onClick={() => {
                  setQuestion("∫ x dx");
                  setTimeout(() => askAI(), 100);
                }}
                >
                  ∫ x dx</button>
                <button
                onClick={() => {
                  setQuestion("Solve for x");
                  setTimeout(() => askAI(), 100);
                }}
                >
                  Solve for x</button>

              </div>

              <button
                className="ask-btn"
                onClick={askAI}
              >
                {loading ? "Thinking..." : "✨ Ask AI"}
              </button>

              {answer && (

                <div className="answer-box">

                  <h3>AI Solution</h3>

                  <div className="answer">

                    {answer.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}

                  </div>

                </div>

              )}

            </div>

          </div>

        </section>

        <section className="features">

          <h2>
            ✨ Why students love it
          </h2>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="icon green">
                📄
              </div>

              <h3>
                Step-by-Step Solutions
              </h3>

              <p>
                Understand every step clearly and build confidence.
              </p>

            </div>

            <div className="feature-card">

              <div className="icon purple">
                🧠
              </div>

              <h3>
                Smart AI Assistant
              </h3>

              <p>
                Advanced AI explains concepts in a simple way.
              </p>

            </div>

            <div className="feature-card">

              <div className="icon yellow">
                ⚡
              </div>

              <h3>
                Instant Answers
              </h3>

              <p>
                Get help in seconds anytime, anywhere.
              </p>

            </div>

          </div>

          <div className="footer-badges">

            <span>🛡️ Safe & Secure</span>
            <span>🎓 Trusted by Students</span>
            <span>⏰ 24/7 Support</span>

          </div>

        </section>

      </div>

    </>
  );
}
