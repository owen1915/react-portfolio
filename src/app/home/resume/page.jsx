"use client";

import { useEffect, useRef } from "react";

export default function ResumePage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pageRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    let resizeObserver = null;
    let rafId = null;

    const renderPage = () => {
      if (!pageRef.current || !containerRef.current || !canvasRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const unscaledViewport = pageRef.current.getViewport({ scale: 1 });
      const scale = containerWidth / unscaledViewport.width;
      const rotation = (pageRef.current.rotate || 0) % 360;
      const viewport = pageRef.current.getViewport({ scale, rotation });
      const dpr = (window.devicePixelRatio || 1) * 1.5;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderTaskRef.current = pageRef.current.render({ canvasContext: context, viewport });
      renderTaskRef.current.promise.catch(() => {});
    };

    const loadPdf = async () => {
      const pdfjsLib = await import("pdfjs-dist");
      const { GlobalWorkerOptions, getDocument } = pdfjsLib;
      GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const pdf = await getDocument({
        url: "/resume.pdf",
      }).promise;
      pageRef.current = await pdf.getPage(1);
      renderPage();

      resizeObserver = new ResizeObserver(() => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(renderPage);
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
    };

    loadPdf();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section>
      <h2>Resume</h2>
      <div className="resume-viewer" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="resume-canvas"
          role="img"
          aria-label="Resume"
        />
      </div>

      <section className="contact-section">
        <h2 style={{marginTop: 2 + 'em'}} >Download</h2>
        <div className="links">
          <a href="/resume.pdf" download className="link resume-link">
            Download Resume
          </a>
        </div>
      </section>
    </section>
  );
}
