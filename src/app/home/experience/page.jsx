"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../styles.css";

export default function ExperiencePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark");
  };
  const courses = [
    "Data Structures and Algorithms",
    "Software Design & Data Structures",
    "Intermediate Software Design",
    "Computer Organization I & II",
    "Mobile Software Development",
    "Intro to Problem Solving in CS",
    "Professionalism in Computing",
    "Discrete Mathematics",
    "Applied Combinatorics",
  ];

  return (
    <div className="container">
      <header>
        <h1>Owen Goodman</h1>
        <p className="subtitle">Software Developer</p>
      </header>

      <nav>
        <Link href="/home">About</Link>
        <Link href="/home/experience" className="active">Experience</Link>
        <Link href="/home/projects">Projects</Link>
      </nav>

      <main>
        <section>
          <h2>Education</h2>
          <div className="item">
            <h3>Virginia Tech</h3>
            <span className="org">Master of Engineering in Computer Science</span>
            <p>Expected Spring 2027 (Accelerated Program)</p>
          </div>
          <div className="item">
            <h3>Virginia Tech</h3>
            <span className="org">Bachelor of Science in Computer Science</span>
            <p>Expected Spring 2026</p>
          </div>
          <div className="item">
            <h3>Reynolds Community College</h3>
            <span className="org">Associate Degree — Dual Enrollment</span>
            <p>Graduated 2023</p>
          </div>
          <div className="item">
            <h3>Open High School</h3>
            <span className="org">Ranked #2 in Virginia, #62 Nationally</span>
            <p>Graduated 2023, 4th in class</p>
          </div>
        </section>

        <section>
          <h2>Research</h2>
          <div className="item">
            <h3>Undergraduate Researcher</h3>
            <span className="org">
              Virginia Tech —{" "}
              <a href="https://che.vt.edu/People/faculty/Achenie.html" target="_blank" rel="noreferrer">
                Dr. Luke Achenie
              </a>
            </span>
            <p>
              AI-driven scientific modeling, LLM-guided symbolic regression,
              multi-stage optimization pipelines, and computational frameworks
              for extracting governing equations from data.
            </p>
          </div>
        </section>

        <section>
          <h2>Relevant Coursework</h2>
          <div className="courses">
            {courses.map((course, i) => (
              <span key={i} className="course">{course}</span>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Owen Goodman © {new Date().getFullYear()}</p>
      </footer>

      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
