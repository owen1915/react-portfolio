"use client";

import { useCallback, useState, useEffect } from "react";
import "./styles.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Technical skills with logo URLs
  const technicalSkills = [
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C Family", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Assembly", logo: "https://img.icons8.com/?size=128&id=oYurBxPSCxXc&format=png" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Shell", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
  ];

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
      {/* TOP NAVIGATION BAR */}
      <nav className="topNav">
        <button onClick={() => scrollToSection("home-section")}>Home</button>
        <button onClick={() => scrollToSection("about-section")}>About</button>
        <button onClick={() => scrollToSection("experience-section")}>Experience</button>
        <button onClick={() => scrollToSection("projects-section")}>Projects</button>
        <button onClick={() => scrollToSection("contact-section")}>Contact Me</button>
      </nav>

      {/* HERO SECTION */}
      <div className="heroSection" id="home-section">
        <div className="heroContent">
          <div className="heroText">
            <p className="heroGreeting">HI THERE, I'M</p>
            <h1 className="heroName">Owen Goodman</h1>
            <p className="heroTitle">SOFTWARE DEVELOPER</p>
            <p className="heroDescription">
              I'm a results-driven software developer with a passion for building thoughtful, 
              efficient, and user-focused solutions.
            </p>
            <button 
              className="heroButton"
              onClick={() => scrollToSection("experience-section")}
            >
              Experience
            </button>
          </div>
          <div className="heroImage">
            <img src="https://i.imgur.com/gICeQEZ.jpeg" alt="Owen Goodman" />
          </div>
        </div>
      </div>

      {/* ==================== ABOUT SECTION ==================== */}
      <div className="sectionWrapper darkSection" id="about-section">
        <h2 className="sectionHeader">About</h2>

        {/* BACKGROUND */}
        <div className="projectCard projectLeft">
          <div className="projectContent">
            <h1>Background</h1>
            <p>
              I'm a results-driven software developer with a passion for building thoughtful, efficient, and user-focused solutions. 
              I take pride in writing clean, maintainable code and approaching problems with a balance of creativity and precision. 
              Alongside full-stack and systems development, I have a deep interest in artificial intelligence, particularly in how LLMs, 
              symbolic regression, and intelligent systems can be used to solve complex technical challenges and automate meaningful 
              workflows.
            </p>
          </div>
          <div className="projectMedia">
            <img src="https://i.imgur.com/J4FEv59.png" alt="Profile" className="projectImage" />
          </div>
        </div>

        {/* EDUCATION */}
        <div className="projectCard projectLeft">
          <div className="projectMedia">
            <img src="https://i.imgur.com/tDD4T0B.png" alt="Education" className="projectImage" />
          </div>
          <div className="projectContent">
            <h1>Education</h1>
            <p>
              In 2023, I graduated from Open High School, ranked #3 among public high schools in Virginia 
              and #161 nationally. I completed high school fourth in my class while simultaneously participating 
              in the Early College Academy. I earned my associate degree in 2023 alongside my high school diploma 
              and was admitted to Virginia Tech's College of Engineering as a Computer Science major. I am currently 
              on track to complete my Bachelor of Science in Computer Science in Spring 2026 and intend to earn my 
              Master of Science in Computer Science by Spring 2027.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <div className="sectionWrapper lightSection" id="experience-section">
        <h2 className="sectionHeader">Experience</h2>

        {/* UNDERGRADUATE RESEARCH */}
        <div className="projectCard projectLeft">
          <div className="projectContent">
            <h1>Undergraduate Research</h1>
            <p>
              I am conducting undergraduate research with {""} 
              <a 
              href="https://che.vt.edu/People/faculty/Achenie.html" 
              target="_blank" 
              rel="noreferrer" 
              style={{ fontWeight: "bold", textDecoration: "underline", color: "#00d9ff" }}
              >
              Dr. Luke Achenie
              </a>, 
              where I work on applying AI-driven methods to scientific modeling and equation 
              discovery. My current focus is on large-language-model-guided symbolic regression, 
              multi-stage optimization pipelines, and computational frameworks for extracting 
              governing equations from data.
            </p>
          </div>
          <div className="projectMedia">
            <img src="https://i.imgur.com/nMu63Gw.jpeg" alt="Undergraduate Research" className="projectImage" />
          </div>
        </div>

        {/* TECHNICAL SKILLS */}
        <div className="skillsSection">
          <h1 id="technical-skills-title" className="skillsSectionTitle">
            Technical Skills
          </h1>
          <div className="skillsGrid">
            {technicalSkills.map((skill) => (
              <div 
                key={skill.name} 
                className="skillItem"
              >
                <img src={skill.logo} alt={skill.name} className="skillIcon" />
                <span className="skillName">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COURSEWORK */}
        <div className="skillsSection">
          <h1 className="skillsSectionTitle">Related Coursework</h1>
          <div className="skillsGrid">
            {[
              "Intro to Programming in C",
              "Intro to Programming in Java",
              "Intro to Programming in Python",
              "Intro to Software Design",
              "Software Design & Data Structures",
              "Intro to Computer Organization",
              "Intro to Computer Organization II",
              "Mobile Software Development",
              "Intro to Problem Solving in CS",
              "Data Structures and Algorithms",
              "Intermediate Software Design",
              "Professionalism in Computing",
              "Discrete Mathematics",
              "Applied Combinatorics",
            ].map((course) => (
              <div 
                key={course} 
                className="skillItem"
              >
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== PROJECTS SECTION ==================== */}
      <div className="sectionWrapper darkSection" id="projects-section">
        <h2 className="sectionHeader">Projects</h2>

        {/* CRATE TESTS */}
        <div className="projectCard projectLeft">
          <div className="projectContent">
            <h1>CrateTests</h1>
            <p>
              A full-stack web application that uses AI to transform study materials into interactive 
              learning tools. Upload notes or documents, and the platform automatically generates 
              personalized quizzes and flashcards with adaptive difficulty and spaced repetition algorithms.
            </p>
            <a 
              href="https://www.cratetests.com/home" 
              target="_blank" 
              rel="noreferrer"
              className="projectLink"
            >
              Visit CrateTests →
            </a>
          </div>
          <div className="projectMedia">
            <div className="videoWrapper">
              <iframe 
                src="https://www.youtube.com/embed/Pw-S21uAH2E?autoplay=1&mute=1&loop=1&playlist=Pw-S21uAH2E&controls=0&modestbranding=1&rel=0&showinfo=0" 
                title="CrateTests Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        {/* ISO ENGINE */}
        <div className="projectCard projectLeft">
          <div className="projectMedia">
            <video
              autoPlay
              loop
              muted
              className="projectVideo"
            >
              <source src="https://i.imgur.com/CxnE4zz.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="projectContent">
            <h1>Isometric 2D Game Engine</h1>
            <p>
              As a personal project, I developed an isometric 2D game engine from
              the ground up, focusing on rendering, input handling, asset
              management, and layered tile-based world design. This experience
              challenged me to think critically about performance, architecture, and
              modular design principles. I gained a deeper understanding of graphics
              rendering pipelines, coordinate transformations for isometric
              projection, and efficient game loop implementation.
            </p>
          </div>
        </div>

        {/* 2D JAVA ENGINE */}
        <div className="projectCard projectLeft">
          <div className="projectContent">
            <h1>2D Java Game Engine</h1>
            <p>
              While building my own tile-based 2D game engine using Java Swing, I
              learned a ton about how games actually work under the hood. I figured
              out how to build a basic game loop, render tiles and sprites to the
              screen, handle user input, and manage things like collisions and
              movement.
            </p>
          </div>
          <div className="projectMedia">
            <img
              src="https://i.imgur.com/LxUgiiw.png"
              alt="2D Engine"
              className="projectImage"
            />
          </div>
        </div>
      </div>

      {/* ==================== CONTACT SECTION ==================== */}
      <div className="sectionWrapper whiteSection" id="contact-section">
        <div className="contactContainer">
          <div className="header" style={{ marginBottom: "1rem" }}>
            Contact Me
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
