"use client";

import { useCallback } from "react";
import "./styles.css";

export default function HomePage() {
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("owengoodman3@gmail.com").then(() => {
      const msg = document.getElementById("emailCopied");
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 1500);
    });
  }, []);

  return (
    <div className="pageContainer">
      <div className="headerContainer">
        <div className="header">
          <a href="https://owengoodman.com">owengoodman.com</a>
        </div>
      </div>

      {/* ABOUT */}
      <div className="textContainer">
        <h1>About</h1>

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

          <img src="/res/ojg.jpeg" alt="Profile" className="aboutImage" />
        </div>
      </div>

      {/* EDUCATION */}
      <div className="textContainer">
        <h1>Education</h1>
        <p>
          In 2023, I graduated from Open High School, ranked #3 among public high schools in Virginia 
          and #161 nationally. I completed high school fourth in my class while simultaneously participating 
          in the Early College Academy, a dual-enrollment program that allowed me to attend J. Sargeant Reynolds 
          Community College during my junior and senior years. Through this program, I earned my associate degree 
          in 2023 alongside my high school diploma. I was subsequently admitted to Virginia Tech’s 
          College of Engineering as a Computer Science major. I am currently on track to complete my Bachelor 
          of Science in Computer Science in Spring 2026 and intend to earn my Master of Science in Computer Science by Spring 2027.
        </p>

        <img
          src="https://i.imgur.com/tDD4T0B.png"
          alt="Education"
          style={{ margin: "1rem", width: "95%", height: "auto" }}
        />
      </div>

      <div className="textContainer">
        <h1>Undergraduate Research</h1>
        <p>
            I am conducting undergraduate research with {" "} 
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
            src="/res/image.jpg"
            alt="Undergraduate Research"
            style={{ margin: "1rem", width: "95%", height: "auto", borderRadius: "12px" }}
        />
      </div>

      {/* ISO ENGINE */}
      <div className="textContainer">
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

        <video
          autoPlay
          loop
          muted
          style={{ width: "95%", height: "auto", margin: "0 2.5% 2.5% 2.5%" }}
        >
          <source src="/res/game.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2D JAVA ENGINE */}
      <div className="textContainer">
        <h1>2D Java Game Engine</h1>
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

      {/* CONTACT */}
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
            <img src="/res/linkedin.png" alt="linkedin" />
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

      <div id="emailCopied">Email copied to clipboard!</div>
    </div>
  );
}
