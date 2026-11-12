import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bRef = useRef(null);
  const restRef = useRef(null);
  const cursorRef = useRef(null);
  const stampRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        if (bRef.current) bRef.current.textContent = "B";
        if (restRef.current) restRef.current.textContent = "ertha";
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Subtle entrance of badges and greeting
      tl.from(".hero-badge", {
        opacity: 0,
        y: 15,
        duration: 0.6
      })
      .from(".hero-greeting", {
        opacity: 0,
        y: 15,
        duration: 0.5
      }, "-=0.3")
      // Typing animation for Capital B (in Matura MT Script)
      .to(bRef.current, {
        text: {
          value: "B",
          delimiter: ""
        },
        duration: 0.35,
        ease: "none"
      })
      // Seamlessly continue typing the remaining letters "ertha" (in Mistral)
      .to(restRef.current, {
        text: {
          value: "ertha",
          delimiter: ""
        },
        duration: 0.95,
        ease: "none"
      })
      // Staggered reveal of subtitle, CTA, and stats
      .from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, "-=0.2")
      .from(".hero-cta-group", {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from(".hero-stats-bar .stat-item", {
        opacity: 0,
        y: 15,
        stagger: 0.12,
        duration: 0.5
      }, "-=0.3");

      // Continuous gentle rotation of the designer stamp
      if (stampRef.current) {
        gsap.to(stampRef.current, {
          rotation: 360,
          duration: 22,
          ease: "none",
          repeat: -1
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container" ref={heroRef}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <filter id="grain-fx" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" result="coloredNoise" />
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
            <filter id="blob-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="65" />
            </filter>
            <linearGradient id="ochre-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E29452" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#C1692E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FBF6EE" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="terracotta-grad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B15629" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#D8804C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FBF6EE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-100,180 C80,120 260,300 220,520 C180,740 -60,800 -140,600 Z" fill="url(#ochre-grad)" filter="url(#blob-blur)" />
          <path d="M1100,-80 C1300,-50 1550,60 1490,310 C1430,510 1180,450 1060,240 C980,100 930,-100 1100,-80 Z" fill="url(#terracotta-grad)" filter="url(#blob-blur)" />
          <rect width="100%" height="100%" fill="#7c5c3d" opacity="0.14" filter="url(#grain-fx)" />
        </svg>
      </div>

      <div className="hero-content" style={{ position: "relative", zIndex: 10 }}>
        {/* Top availability pill */}
        <div className="hero-badge">
          <span className="live-dot"></span>
          <span>Graphic Designer • Brand Identity &amp; Editorial dessigns</span>
        </div>

        {/* Hero main typography with split Matura MT Script + Mistral typing effect */}
        <h1 className="hero-heading" aria-label="Hello, I'm Bertha — Graphic Designer">
          <span className="hero-greeting">Hello, I'm</span>
          <span className="hero-name-wrap bertha-wordmark" aria-hidden="true">
            <span className="wordmark-b hero-b" ref={bRef}></span>
            <span className="wordmark-rest hero-rest" ref={restRef}></span>
            <span className="typing-cursor" ref={cursorRef} aria-hidden="true">
              |
            </span>
          </span>
        </h1>

        {/* Hero description */}
        <p className="hero-description">
          Translating brand visions into striking visual identities that leave an unforgettable impression across global markets.
        </p>

        {/* Call to action buttons */}
        <div className="hero-cta-group">
          <button
            className="btn-primary"
            onClick={() => scrollTo("projects")}
            aria-label="Scroll to portfolio brand identity projects"
          >
            <span>Explore Brand Projects</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M12 4v14" />
            </svg>
          </button>

          <button
            className="btn-secondary"
            onClick={() => scrollTo("about")}
            aria-label="Scroll to About section and designer ID pass"
          >
            <span>View Designer Pass</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Supporting metrics / disciplines bar */}
        <div className="hero-stats-bar">
          <div className="stat-item">
            <span className="stat-number">01</span>
            <span className="stat-label">Brand Systems</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">02</span>
            <span className="stat-label">Editorial Design</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">03</span>
            <span className="stat-label">Color Architecture</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">04</span>
            <span className="stat-label">Art Direction</span>
          </div>
        </div>
      </div>

      {/* Decorative Rotating Designer Seal */}
      <div className="hero-stamp-wrap" aria-hidden="true">
        <svg
          ref={stampRef}
          className="hero-stamp-svg"
          viewBox="0 0 140 140"
          width="130"
          height="130"
        >
          <path
            id="stampPath"
            d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
          <text fill="var(--brand-beige)" fontSize="11.5" letterSpacing="2.2" fontWeight="700">
            <textPath href="#stampPath">
              • BERTHA'S STUDIO • GRAPHIC DESIGN • 2026
            </textPath>
          </text>
        </svg>
        <div className="stamp-center-icon">✦</div>
      </div>
    </div>
  );
}
