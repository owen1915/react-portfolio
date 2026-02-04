"use client";

import { useState, useEffect } from "react";
import VoiceDemo from "./VoiceDemo";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <section>
        <h2>Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <>
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
          </>
        )}
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <span className="modal-close-icon" aria-hidden="true">×</span>
            </button>

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
              {selectedProject.media.type === "voice-demo" && (
                <VoiceDemo />
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
    </>
  );
}
