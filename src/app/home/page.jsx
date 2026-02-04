"use client";

import { useState } from "react";

export default function AboutPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("owengoodman3@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <section className="about-section">
        <div className="about-content">
          <img
            src="https://i.imgur.com/gICeQEZ.jpeg"
            alt="Owen Goodman"
            className="profile-pic"
          />
          <div className="about-text">
            <p>
              Results-driven software developer with a passion for building thoughtful,
              efficient, and user-focused solutions. Interested in AI, LLMs, symbolic
              regression, and intelligent systems for solving complex technical challenges.
            </p>
            <p>
              Currently finishing my B.S. in Computer Science at Virginia Tech this Spring 2026,
              while simultaneously pursuing an accelerated Master of Engineering in Computer Science,
              expected Spring 2027.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact</h2>
        <div className="links">
          <button onClick={copyEmail} className="link">
            {copiedEmail ? "Copied!" : "Email"}
          </button>
          <a href="https://www.linkedin.com/in/owen-goodman/" target="_blank" rel="noreferrer" className="link">
            LinkedIn
          </a>
          <a href="https://github.com/owen1915" target="_blank" rel="noreferrer" className="link">
            GitHub
          </a>
          <a href="/resume.pdf" download className="link resume-link">
            Résumé ⬇️
          </a>
        </div>
      </section>
    </>
  );
}
