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

  return (
    <div className="container">
      <header>
        <h1>Owen Goodman</h1>
        <RotatingSubtitle className="subtitle" />
      </header>

      <nav>
        <Link href="/home" className={linkClass("/home")}>About</Link>
        <Link href="/home/experience" className={linkClass("/home/experience")}>Experience</Link>
        <Link href="/home/projects" className={linkClass("/home/projects")}>Projects</Link>
        <Link href="/home/contact" className={linkClass("/home/contact")}>Contact</Link>
      </nav>

      <main>
        {children}
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
