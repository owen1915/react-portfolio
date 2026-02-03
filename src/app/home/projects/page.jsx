"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles.css";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: "cratetests",
      name: "CrateTests",
      shortDesc: "AI-powered study tool that transforms notes into quizzes and flashcards.",
      fullDesc: "A full-stack web application that uses AI to transform study materials into interactive learning tools. Upload notes or documents, and the platform automatically generates personalized quizzes and flashcards with adaptive difficulty and spaced repetition algorithms. Built with a React frontend and Node.js backend, integrating machine learning models for intelligent content generation.",
      link: "https://www.cratetests.com/home",
      github: null,
      tech: ["React", "Node.js", "AI/ML"],
      media: {
        type: "youtube",
        src: "https://www.youtube.com/embed/Pw-S21uAH2E?autoplay=1&mute=1&loop=1&playlist=Pw-S21uAH2E&controls=0&modestbranding=1"
      },
      image: "https://i.imgur.com/LxUgiiw.png"
    },
    {
      id: "iso-engine",
      name: "Isometric 2D Game Engine",
      shortDesc: "Custom game engine with rendering, input handling, and tile-based world design.",
      fullDesc: "Developed an isometric 2D game engine from the ground up, focusing on rendering, input handling, asset management, and layered tile-based world design. This experience challenged me to think critically about performance, architecture, and modular design principles. Gained a deeper understanding of graphics rendering pipelines, coordinate transformations for isometric projection, and efficient game loop implementation.",
      link: null,
      github: "https://github.com/owen1915/2D-Isometric-Game-Engine",
      tech: ["Java", "Graphics Programming"],
      media: {
        type: "video",
        src: "https://i.imgur.com/CxnE4zz.mp4"
      },
      image: null
    },
    {
      id: "java-engine",
      name: "2D Java Game Engine",
      shortDesc: "Tile-based engine with collision detection and sprite rendering.",
      fullDesc: "Built a tile-based 2D game engine using Java Swing, learning how games work under the hood. Implemented a basic game loop, tile and sprite rendering, user input handling, collision detection, and movement systems. This project provided hands-on experience with real-time graphics programming and game architecture patterns.",
      link: null,
      github: null,
      tech: ["Java", "Swing"],
      media: {
        type: "image",
        src: "https://i.imgur.com/LxUgiiw.png"
      },
      image: "https://i.imgur.com/LxUgiiw.png"
    }
  ];

  const closeModal = () => setSelectedProject(null);

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
          <p className="section-hint">Click a project to see more details</p>

          <div className="project-list">
            {projects.map((project) => (
              <button
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card-content">
                  <h3>{project.name}</h3>
                  <p>{project.shortDesc}</p>
                  <div className="tags">
                    {project.tech.map((t, j) => (
                      <span key={j} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <span className="project-card-arrow">→</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="modal-media">
              {selectedProject.media.type === "youtube" && (
                <div className="modal-video-wrapper">
                  <div className="video-overlay"></div>
                  <iframe
                    src={selectedProject.media.src}
                    title={selectedProject.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}
              {selectedProject.media.type === "video" && (
                <video autoPlay loop muted className="modal-video">
                  <source src={selectedProject.media.src} type="video/mp4" />
                </video>
              )}
              {selectedProject.media.type === "image" && (
                <img
                  src={selectedProject.media.src}
                  alt={selectedProject.name}
                  className="modal-image"
                />
              )}
            </div>

            <div className="modal-content">
              <h3>{selectedProject.name}</h3>
              <p>{selectedProject.fullDesc}</p>

              <div className="tags">
                {selectedProject.tech.map((t, j) => (
                  <span key={j} className="tag">{t}</span>
                ))}
              </div>

              <div className="modal-links">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    Visit Site →
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Owen Goodman © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
