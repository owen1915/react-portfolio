"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("owengoodman3@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mojloezw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section>
        <h2>Get in Touch</h2>
        <p className="section-hint">Send me a message and I'll get back to you.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Your message..."
            />
          </div>

          <button type="submit" className="submit-btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="form-status success">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="form-status error">Something went wrong. Please try again.</p>
          )}
        </form>
      </section>

      <section className="contact-section">
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
          <a href="/resume.pdf" download className="link resume-link">
            Download Resume
          </a>
        </div>
      </section>
    </>
  );
}
