import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Configurable contact details
const CONTACT_CONFIG = {
  email: "berthahallo58@gmail.com",
  location: "Available Worldwide (Remote / Relocation)",
  socials: [
    { name: "Behance", url: "https://behance.net" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },

  ]
};

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef(null);

  // Playful GSAP bounce animation on viewport entrance via ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          once: true // Runs once cleanly upon entering viewport; no unexpected replays
        }
      });

      // Staggered bounce entrance using back.out easing
      tl.from(".footer-badge-pill", {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)"
      })
      .from(".footer-callout", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "back.out(1.7)"
      }, "-=0.35")
      .from(".footer-statement", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from(".footer-status-tag", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.8)"
      }, "-=0.3")
      .from(".email-card", {
        y: 35,
        scale: 0.94,
        opacity: 0,
        duration: 0.75,
        ease: "back.out(1.8)"
      }, "-=0.5")
      .from(".social-pill", {
        y: 28,
        scale: 0.86,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "back.out(2.2)"
      }, "-=0.4");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_CONFIG.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <footer className="site-footer" id="contact" ref={footerRef}>
      <div className="footer-glow" aria-hidden="true"></div>

      <div className="footer-inner">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <span className="section-pill pill-gold footer-badge-pill">Get In Touch</span>
            <h2 className="footer-callout">
              Let's create something truly memorable together.
            </h2>
            <p className="footer-statement">
              Open for brand identity commissions, packaging design projects, and full-time remote opportunities worldwide.
            </p>

            <div className="footer-status-tag">
              <span className="live-dot"></span>
              <span>Available for New Projects &amp; Remote Roles</span>
            </div>
          </div>

          <div className="footer-contact-col">
            <div className="email-card">
              <span className="email-label">Direct Inquiries</span>
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="email-link"
                aria-label={`Send email to ${CONTACT_CONFIG.email}`}
              >
                {CONTACT_CONFIG.email}
              </a>
              <button
                className="copy-email-btn"
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy Email Address"}
              </button>
            </div>

            <div className="social-links-grid">
              {CONTACT_CONFIG.socials.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <span className="social-name">{item.name}</span>
                  <svg
                    className="social-icon"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} <span className="wordmark-b">B</span><span className="wordmark-rest">ertha</span>. All rights reserved. Designed with intention.
          </p>
          <div className="footer-meta-notes">
            <span>Portfolio Edition 2026</span>
            <span className="sep">•</span>
            <span>Webworks by Hallo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
