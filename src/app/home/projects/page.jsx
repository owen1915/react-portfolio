"use client";

import Link from "next/link";
import "../styles.css";

export default function ProjectsPage() {
  const projects = [
    {
      name: "CrateTests",
      description: "AI-powered study tool that transforms notes into quizzes and flashcards with adaptive difficulty and spaced repetition.",
      link: "https://www.cratetests.com/home",
      tech: ["React", "Node.js", "AI/ML"]
    },
    {
      name: "Isometric 2D Game Engine",
      description: "Custom game engine built from the ground up with rendering, input handling, asset management, and layered tile-based world design.",
      tech: ["Java", "Graphics Programming"]
    },
    {
      name: "2D Java Game Engine",
      description: "Tile-based engine built with Java Swing featuring game loops, collision detection, sprite rendering, and input handling.",
      tech: ["Java", "Swing"]
    }
  ];

  return (
    <div className="container">
      <header>
        <h1>Owen Goodman</h1>
        <p className="subtitle">Software Developer</p>
      </header>

      <nav>
        <Link href="/home">About</Link>
        <Link href="/home/experience">Experience</Link>
        <Link href="/home/projects" className="active">Projects</Link>
      </nav>

      <main>
        <section>
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
      </main>

      <footer>
        <p>Owen Goodman © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
