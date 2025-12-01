"use client";

import { useCallback, useState, useEffect } from "react";
import "./styles.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("owengoodman3@gmail.com").then(() => {
      const msg = document.getElementById("emailCopied");
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 1500);
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".navContainer")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="pageContainer">
      {/* FIXED NAVIGATION */}
      <div className="navContainer">
        <button 
          className="navButton" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Navigation menu"
        >
          <span className="navIcon">☰</span>
        </button>
        {menuOpen && (
          <div className="navDropdown">
            <button onClick={() => scrollToSection("about-section")}>About</button>
            <button onClick={() => scrollToSection("experience-section")}>Experience</button>
            <button onClick={() => scrollToSection("projects-section")}>Projects</button>
            <button onClick={() => scrollToSection("contact-section")}>Contact</button>
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className="headerContainer">
        <div className="header">
          <a href="https://owengoodman.com">owengoodman.com</a>
        </div>
      </div>

      {/* ==================== ABOUT SECTION ==================== */}
      <div className="sectionWrapper darkSection" id="about-section">
        <h2 className="sectionHeader">About</h2>

        {/* ABOUT */}
        <div className="textContainer">
          <h1><strong>Background</strong></h1>

          <div className="aboutRow">
            <p>
              I'm a results-driven software developer with a passion for building thoughtful, efficient, and user-focused solutions. 
              I take pride in writing clean, maintainable code and approaching problems with a balance of creativity and precision. 
              Alongside full-stack and systems development, I have a deep interest in artificial intelligence, particularly in how LLMs, 
              symbolic regression, and intelligent systems can be used to solve complex technical challenges and automate meaningful 
              workflows. With experience across multiple layers of the development process, I thrive in environments that value continuous learning, 
              collaboration, and high-quality engineering. My goal is to build technology that makes an impact, whether through solving real-world 
              problems, advancing AI-driven capabilities, or improving the user experience.
            </p>

            <img src="https://i.imgur.com/Iq0HFbx.jpeg" alt="Profile" className="aboutImage" />
          </div>
        </div>

        {/* EDUCATION */}
        <div className="textContainer">
          <h1><strong>Education</strong></h1>
          <p>
            In 2023, I graduated from Open High School, ranked #3 among public high schools in Virginia 
            and #161 nationally. I completed high school fourth in my class while simultaneously participating 
            in the Early College Academy, a dual-enrollment program that allowed me to attend J. Sargeant Reynolds 
            Community College during my junior and senior years. Through this program, I earned my associate degree 
            in 2023 alongside my high school diploma. I was subsequently admitted to Virginia Tech's 
            College of Engineering as a Computer Science major. I am currently on track to complete my Bachelor 
            of Science in Computer Science in Spring 2026 and intend to earn my Master of Science in Computer Science by Spring 2027.
          </p>

          <img
            src="https://i.imgur.com/tDD4T0B.png"
            alt="Education"
            style={{ margin: "1rem", width: "95%", height: "auto" }}
          />
        </div>
      </div>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <div className="sectionWrapper lightSection" id="experience-section">
        <h2 className="sectionHeader">Experience</h2>

        {/* SKILLS / LANGUAGES */}
        <div className="textContainer">
          <h1><strong>Undergraduate Research</strong></h1>
          <p>
              I am conducting undergraduate research with {""} 
              <a 
              href="https://che.vt.edu/People/faculty/Achenie.html" 
              target="_blank" 
              rel="noreferrer" 
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
              Dr. Luke Achenie
              </a>, 
              where I work on applying AI-driven methods to scientific modeling and equation 
              discovery. My current focus is on large-language-model-guided symbolic regression, 
              multi-stage optimization pipelines, and computational frameworks for extracting 
              governing equations from data. This work involves integrating LLM reasoning with 
              numerical solvers, running large experiments on HPC systems, and evaluating the 
              stability, accuracy, and generalizability of discovered models. The project has 
              strengthened my skills in machine learning, scientific computing, and automated 
              model discovery.
          </p>

          <img
              src="https://i.imgur.com/nMu63Gw.jpeg"
              alt="Undergraduate Research"
              style={{ margin: "1rem", width: "95%", height: "auto", borderRadius: "12px" }}
          />
        </div>

        <div className="skillsContainer">
          <h3 className="skillsTitle">Technical Skills</h3>
          <div className="skillsGrid">
            {[
              { name: "Java", category: "language" },
              { name: "Python", category: "language" },
              { name: "C", category: "language" },
              { name: "C++", category: "language" },
              { name: "C#", category: "language" },
              { name: "JavaScript", category: "language" },
              { name: "TypeScript", category: "language" },
              { name: "React", category: "framework" },
              { name: "Node.js", category: "framework" },
              { name: "HTML", category: "web" },
              { name: "CSS", category: "web" },
              { name: "Assembly", category: "language" },
              { name: "Swift", category: "language" },
              { name: "SQL", category: "language" },
              { name: "Shell", category: "language" },
              { name: "Rust", category: "language" },
              { name: "Kotlin", category: "language" },
              { name: "Dart", category: "language" },
              { name: "R", category: "language" },
              { name: "Ruby", category: "language" },
            ].map((skill, index) => (
              <div 
                key={skill.name} 
                className={`skillBadge skillBadge--${skill.category}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== PROJECTS SECTION ==================== */}
      <div className="sectionWrapper darkSection" id="projects-section">
        <h2 className="sectionHeader">Projects</h2>

        {/* CRATE TESTS */}
        <div className="textContainer">
          <h1><strong>CrateTests</strong></h1>
          <p>
            I developed CrateTests, a full-stack web application that leverages artificial intelligence 
            to transform study materials into interactive learning tools. Users can upload lecture notes, 
            textbook chapters, or any educational content, and the platform automatically generates 
            personalized quizzes, flashcards, and study materials using advanced AI analysis. The system 
            features adaptive questioning that adjusts difficulty based on user performance, a smart 
            spaced repetition algorithm for optimal memorization, and a comprehensive analytics dashboard 
            to track learning progress. Built with modern web technologies, CrateTests supports multiple 
            file formats including PDFs, Word documents, and images, making it a versatile tool for 
            students looking to study smarter, not harder.
          </p>

          <img
            src="/cratetests.png"
            alt="CrateTests Platform"
            style={{ margin: "1rem", height: "400px", width: "auto", objectFit: "contain", borderRadius: "12px" }}
          />

          <a 
            href="https://www.cratetests.com/home" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: "inline-block",
              margin: "0.5rem 0 1rem 0",
              padding: "0.8rem 1.5rem",
              background: "#333",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              textAlign: "center",
              transition: "all 0.2s ease"
            }}
          >
            Visit CrateTests →
          </a>
        </div>

        {/* ISO ENGINE */}
        <div className="textContainer">
          <h1><strong>Isometric 2D Game Engine</strong></h1>
          <p>
            As a personal project, I developed an isometric 2D game engine from
            the ground up, focusing on rendering, input handling, asset
            management, and layered tile-based world design. This experience
            challenged me to think critically about performance, architecture, and
            modular design principles. I gained a deeper understanding of graphics
            rendering pipelines, coordinate transformations for isometric
            projection, and efficient game loop implementation.
          </p>

          <video
            autoPlay
            loop
            muted
            style={{ width: "95%", height: "auto", margin: "0 2.5% 2.5% 2.5%" }}
          >
            <source src="https://i.imgur.com/CxnE4zz.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 2D JAVA ENGINE */}
        <div className="textContainer">
          <h1><strong>2D Java Game Engine</strong></h1>
          <p>
            While building my own tile-based 2D game engine using Java Swing, I
            learned a ton about how games actually work under the hood. I figured
            out how to build a basic game loop, render tiles and sprites to the
            screen, handle user input, and manage things like collisions and
            movement.
          </p>

          <img
            src="https://i.imgur.com/LxUgiiw.png"
            alt="2D Engine"
            style={{ margin: "1rem", width: "95%", height: "auto" }}
          />
        </div>
      </div>

      {/* ==================== CONTACT SECTION ==================== */}
      <div className="sectionWrapper whiteSection" id="contact-section">
        <div className="contactContainer">
          <div className="header" style={{ marginBottom: "1rem" }}>
            Contact
          </div>

          <div className="contactWrapper">
            <a onClick={copyEmail} title="Copy email">
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/009/614/non_2x/email-and-mail-icon-black-free-png.png"
                alt="email"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/owen-goodman/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000" alt="linkedin" />
            </a>

            <a
              href="https://github.com/owen1915"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="github"
              />
            </a>
          </div>
        </div>
      </div>

      <div id="emailCopied">Email copied to clipboard!</div>
    </div>
  );
}
