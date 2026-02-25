"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RotatingSubtitle from "./RotatingSubtitle";
import "./styles.css";

export default function HomeLayout({ children }) {
  const pathname = usePathname();
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

  const linkClass = (href) => (pathname === href ? "active" : "");

  const isResume = pathname === "/home/resume";

  return (
    <div className={`container${isResume ? " container-wide" : ""}`}>
      <header>
        <h1>Owen Goodman</h1>
        <RotatingSubtitle className="subtitle" />
      </header>

      <nav>
        <Link href="/home" className={linkClass("/home")}>About</Link>
        <Link href="/home/experience" className={linkClass("/home/experience")}>Experience</Link>
        <Link href="/home/projects" className={linkClass("/home/projects")}>Projects</Link>
        <Link href="/home/games" className={linkClass("/home/games")}>Games</Link>
        <Link href="/home/resume" className={linkClass("/home/resume")}>Resume</Link>
        <Link href="/home/contact" className={linkClass("/home/contact")}>Contact</Link>
      </nav>

      <main>
        {children}
      </main>

      <footer>
        <p>Owen Goodman © {new Date().getFullYear()}</p>
      </footer>

      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>}
      </button>
    </div>
  );
}
