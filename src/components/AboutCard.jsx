import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// Configurable portrait path - defaults to Bertha's actual photo in public folder
const PORTRAIT_SRC = "/Me.png";
const PORTRAIT_FALLBACK = "/images/Me.png";

export default function AboutCard() {
  const cardAnchorRef = useRef(null);
  const flipperRef = useRef(null);
  const leavesRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [imgSrc, setImgSrc] = useState(PORTRAIT_SRC);

  // Animate ONLY the lanyard strap ribbon with subtle pendulum swing
  // The ID card itself remains steady, upright, and readable
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const card = cardAnchorRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { rotation: -4.5 },
        {
          rotation: 4.5,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 0%"
        }
      );
    }, cardAnchorRef);

    return () => ctx.revert();
  }, []);

  // Falling autumn leaves background (About section only)
  useEffect(() => {
    const container = leavesRef.current;
    if (!container) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const leaves = container.querySelectorAll(".autumn-leaf");
    const ctx = gsap.context(() => {
      leaves.forEach((leaf, i) => {
        const duration = 6 + Math.random() * 6;
        gsap.fromTo(
          leaf,
            { y: -60, x: gsap.utils.random(0, container.clientWidth), rotation: Math.random() * 360, opacity: 0.4 + Math.random() * 0.5 },
          {
            y: () => container.offsetHeight + 80,
            x: "+=" + (Math.random() * 120 - 60),
            rotation: "+=" + (Math.random() * 540 - 270),
            duration,
            repeat: -1,
            delay: -Math.random() * duration,
            ease: "none",
          }
        );
      });
    }, container);
    return () => ctx.revert();
  }, []);

  // Handle 3D card flip on the card element
  const handleFlip = useCallback(() => {
    const flipper = flipperRef.current;
    if (!flipper) return;

    const nextFlipped = !flipped;
    setFlipped(nextFlipped);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(flipper, { rotateY: nextFlipped ? 180 : 0 });
    } else {
      gsap.to(flipper, {
        rotateY: nextFlipped ? 180 : 0,
        duration: 0.85,
        ease: "power2.inOut"
      });
    }
  }, [flipped]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className="about-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      <div className="autumn-leaves-layer" ref={leavesRef} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <svg key={i} className="autumn-leaf" viewBox="0 0 24 24" width="18" height="18" style={{ filter: i % 4 === 0 ? "blur(2px)" : "none", opacity: 0.7 }}>
            <path d="M12 2 C 14 6, 20 8, 18 14 C 16 20, 10 22, 6 18 C 2 14, 4 8, 12 2 Z" fill={["#C75B2A","#D98A2B","#B86B1F","#8B4513"][i % 4]} />
          </svg>
        ))}
      </div>
      <div className="about-intro-text">
        <span className="section-pill">Creative Identity </span>
        <h2 className="section-title">The Face Behind The Canvas</h2>
        <p className="section-subtitle">
          Interactive designer credential pass. Click or press Enter to flip the card and explore credentials, core tools, and design capabilities.
        </p>
      </div>

      <div className="id-stage-container">
        {/* Top attachment anchor mount point */}
        <div className="lanyard-mount" aria-hidden="true">
          <div className="mount-pin"></div>
          <div className="mount-loop"></div>
        </div>

        {/* Lanyard hanging structure */}
        <div className="lanyard-hang-structure">
          {/* ONLY the lanyard ribbon strap sways with GSAP */}
          <div
            className="lanyard-ribbon-sway-wrap"
            aria-hidden="true"
          >
            <div className="lanyard-ribbon">
              <div className="lanyard-pattern">
                <span>BERTHA</span>
                <span className="dot">•</span>
        
                
                <span>CREATIVE</span>
                <span className="dot">•</span>
              </div>
            </div>
          </div>

          {/* Metal hardware connector clip linking lanyard to card */}
          <div className="metal-hardware" aria-hidden="true">
            <div className="metal-crimp"></div>
            <div className="metal-ring"></div>
            <div className="metal-carabiner"></div>
          </div>
        </div>

        {/* ID card swings as a pendulum from its top attachment point */}
        <div className="card-stable-anchor" ref={cardAnchorRef}>
          <div className="badge-perspective-frame">
            <div
              className={`id-card-3d ${flipped ? "is-flipped" : ""}`}
              ref={flipperRef}
              onClick={handleFlip}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label={`Bertha Graphic Designer ID Badge. Currently showing ${
                flipped ? "reverse skills side in warm brown theme" : "front identity side"
              }. Click or press Enter to flip.`}
            >
              {/* === FRONT FACE === */}
              <div className="badge-face badge-front">
                {/* Lanyard slot cutout punch hole */}
                <div className="badge-slot-punch">
                  <div className="slot-inner"></div>
                </div>

                {/* Badge Header Bar */}
                <div className="badge-header">
                  <div className="brand-logotype">
                    <span className="wordmark-b">B</span>
                    <span className="wordmark-rest">ertha</span>
                    <span className="brand-studio-tag">STUDIO</span>
                  </div>
                  <span className="badge-type-pill">CREATIVE PASS</span>
                </div>

                {/* Portrait Photo Frame */}
                <div className="portrait-container">
                  <img
                    src={imgSrc}
                    alt="Bertha - Graphic Designer"
                    className="portrait-img"
                    onError={() => {
                      if (imgSrc !== PORTRAIT_FALLBACK) {
                        setImgSrc(PORTRAIT_FALLBACK);
                      }
                    }}
                  />
                  <div className="portrait-verified-tag">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Identity Information with Bertha Wordmark */}
                <div className="badge-info">
                  <h3 className="designer-name">
                    <span className="wordmark-b">B</span>
                    <span className="wordmark-rest">ertha</span>
                  </h3>
                  <p className="designer-role">Graphic Designer</p>
                  <p className="designer-spec">Brand Identity &amp; Packaging</p>
                </div>

                {/* Badge Security & Meta Grid */}
                <div className="badge-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">ID NO.</span>
                    <span className="meta-value">BTH-2026-GD</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">STATUS</span>
                    <span className="meta-value status-available">AVAILABLE</span>
                  </div>
                </div>

                {/* Bottom Barcode & Hologram Aesthetic */}
                <div className="badge-footer">
                  <div className="barcode-simulation" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="flip-hint-pill">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    <span>Click to Flip</span>
                  </div>
                </div>
              </div>

              {/* === REVERSE / BACK FACE: WARM BROWN THEME === */}
              <div className="badge-face badge-back warm-brown-theme">
                {/* Lanyard slot cutout punch hole */}
                <div className="badge-slot-punch brown-slot">
                  <div className="slot-inner"></div>
                </div>

                {/* Back Header */}
                <div className="badge-header brown-header">
                  <div className="brand-logotype brown-logo">
                    <span className="wordmark-b">B</span>
                    <span className="wordmark-rest">ertha</span>
                    <span className="brand-studio-tag brown-tag"></span>
                  </div>
                  <span className="badge-type-pill pill-warm-beige">CREDENTIALS</span>
                </div>

                {/* About Me Narrative */}
                <div className="back-bio-section">
                  <h4 className="back-section-title brown-section-title">About Me</h4>
                  <p className="back-bio-text brown-bio-text">
                  I love creating distinctive brand identities and compelling designs that communicate stories.
                  </p>
                </div>

                {/* Core Skills & Proficiencies */}
                <div className="back-skills-section">
                  <h4 className="back-section-title brown-section-title">Creative Tools</h4>
                  <ul className="skills-checklist">
                    {/* Canva - Pro */}
                    <li className="skill-item brown-skill-item">
                      <div className="skill-icon-wrap canva-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                          <rect width="24" height="24" rx="6" fill="#00C4CC" />
                          <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-1.2 12.2c-2.4 0-4-1.8-4-4.2s1.6-4.2 4-4.2c1.4 0 2.5.6 3.1 1.6l-1.4 1c-.4-.7-1-1-1.7-1-1.4 0-2.3 1.1-2.3 2.6s.9 2.6 2.3 2.6c.8 0 1.4-.4 1.8-1l1.4 1c-.7 1-1.8 1.6-3.2 1.6z" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="skill-details">
                        <span className="skill-name brown-skill-name">Canva</span>
                        <span className="skill-level pro-tag">Pro</span>
                      </div>
                    </li>

                    {/* Adobe Photoshop - Proficient */}
                    <li className="skill-item brown-skill-item">
                      <div className="skill-icon-wrap ps-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                          <rect width="24" height="24" rx="6" fill="#001E36" />
                          <path d="M7 6.5h3.8c1.8 0 3 .9 3 2.5s-1.2 2.6-3 2.6H8.7v4.4H7V6.5zm1.7 3.6h1.9c.8 0 1.4-.4 1.4-1.1 0-.8-.6-1.1-1.4-1.1H8.7v2.2z" fill="#31A8FF" />
                          <path d="M14.5 12.8c.6-.4 1.3-.6 2.1-.6 1.4 0 2.2.7 2.2 1.8 0 .2 0 .4-.1.6-1.8.3-3.6.8-3.6 2.1 0 .9.8 1.4 1.7 1.4.9 0 1.6-.4 2.1-1.1v1h1.5V13.8c0-1.8-1.2-2.8-3.3-2.8-1.1 0-2 .3-2.7.8l.1 1zm3.8 2.3v.4c-.4.6-1 1-1.6 1-.6 0-.9-.3-.9-.8 0-.8 1.1-1.1 2.5-1.3v.7z" fill="#31A8FF" />
                        </svg>
                      </div>
                      <div className="skill-details">
                        <span className="skill-name brown-skill-name">Photoshop</span>
                        <span className="skill-level proficient-tag-brown">Proficient</span>
                      </div>
                    </li>

                    {/* Affinity Designer - Proficient */}
                    <li className="skill-item brown-skill-item">
                      <div className="skill-icon-wrap affinity-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                          <rect width="24" height="24" rx="6" fill="#1B1D28" />
                          <path d="M12 4.5l6.5 11.5h-3.2L12 9.8l-3.3 6.2H5.5L12 4.5z" fill="#20B2AA" />
                          <path d="M9.8 13.5l2.2-4.2 2.2 4.2H9.8z" fill="#5CE1E6" />
                        </svg>
                      </div>
                      <div className="skill-details">
                        <span className="skill-name brown-skill-name">Affinity</span>
                        <span className="skill-level proficient-tag-brown">Proficient</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Back Footer */}
                <div className="badge-footer brown-footer">
                  <div className="remote-status-pill brown-status">
                    <span className="status-indicator-dot"></span>
                    <span>Remote &amp; Global Ready</span>
                  </div>
                  <div className="flip-hint-pill brown-flip-pill">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2.5 2v6h6M2.66 15.57a10 10 0 0 0 .57-8.38l-5.67-5.67" />
                    </svg>
                    <span>Flip Front</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
