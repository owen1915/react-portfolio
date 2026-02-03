"use client";

import { useState } from "react";
import "./styles.css";

export default function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("owengoodman3@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      name: "CrateTests",
      description: "AI-powered study tool that transforms notes into quizzes and flashcards",
      link: "https://www.cratetests.com/home",
      tech: ["React", "Node.js", "AI/ML"]
    },
    {
      name: "Isometric 2D Game Engine",
      description: "Custom game engine with rendering, input handling, and tile-based world design",
      tech: ["Java", "Graphics Programming"]
    },
    {
      name: "2D Java Game Engine",
      description: "Tile-based engine built with Java Swing featuring collision detection and sprite rendering",
      tech: ["Java", "Swing"]
    }
  ];

  const experience = [
    {
      title: "Undergraduate Researcher",
      org: "Virginia Tech - Dr. Luke Achenie",
      description: "AI-driven scientific modeling, LLM-guided symbolic regression, multi-stage optimization pipelines"
    }
  ];

  return (
    <div className="container">
      <header>
        <h1>Owen Goodman</h1>
        <p className="subtitle">Software Developer</p>
      </header>

      <nav>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <section id="about">
          <h2>About</h2>
          <p>
            Results-driven software developer with a passion for building thoughtful,
            efficient, and user-focused solutions. Interested in AI, LLMs, symbolic
            regression, and intelligent systems for solving complex technical challenges.
          </p>
          <p>
            Currently pursuing a B.S. in Computer Science at Virginia Tech (Spring 2026),
            with plans to complete an M.S. by Spring 2027. Previously graduated from
            Open High School ranked #3 in Virginia, earning an associate degree alongside
            my diploma.
          </p>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="item">
              <h3>{exp.title}</h3>
              <span className="org">{exp.org}</span>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section id="projects">
          <h2>Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="item">
              <h3>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    {project.name} <span className="arrow">→</span>
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tech.map((t, j) => (
                  <span key={j} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="contact">
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
          </div>
        </section>
      </main>

      <footer>
        <p>Owen Goodman © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
