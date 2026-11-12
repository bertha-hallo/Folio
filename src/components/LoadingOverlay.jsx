import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingOverlay() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("berthaIntroSeen");
    } catch (e) {
      void e;
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;

    // Safety watchdog: ensure the overlay never stays stuck under any condition
    const safetyTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("berthaIntroSeen", "1");
      } catch (e) {
        void e;
      }
    }, 2800);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const overlay = overlayRef.current;
    const textEl = textRef.current;

    if (!overlay || !textEl) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            clearTimeout(safetyTimer);
            setVisible(false);
            try {
              sessionStorage.setItem("berthaIntroSeen", "1");
            } catch (e) {
              void e;
            }
          }
        });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          setVisible(false);
          try {
            sessionStorage.setItem("berthaIntroSeen", "1");
          } catch (e) {
            void e;
          }
        }
      });

      // Subtle letter-spacing and elegant fade in of the title
      tl.fromTo(
        textEl,
        {
          opacity: 0,
          y: 20,
          letterSpacing: "0.05em",
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.15em",
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out"
        }
      )
      // Slight pause for reading
      .to({}, { duration: 0.4 })
      // Blur and fade the entire overlay away to smoothly reveal homepage
      .to(overlay, {
        opacity: 0,
        filter: "blur(18px)",
        scale: 1.02,
        duration: 0.75,
        ease: "power2.inOut"
      });
    }, overlayRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="loading-overlay"
      ref={overlayRef}
      role="status"
      aria-live="polite"
    >
      <div className="loading-content">
        <span className="loading-subtitle">BERTHA • PORTFOLIO</span>
        <h1 className="loading-heading" ref={textRef}>
          Welcome to my canvas
        </h1>
        <div className="loading-progress-line" aria-hidden="true">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
