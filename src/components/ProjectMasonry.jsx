import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjectImages, BRAND_CONFIG } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectMasonry() {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const galleryRef = useRef(null);

  const brandKeys = Object.keys(BRAND_CONFIG);

  // Filter items if a specific brand is selected in the legend
  const displayedImages =
    selectedBrandFilter === "All"
      ? allProjectImages
      : allProjectImages.filter((item) => item.brand === selectedBrandFilter);

  // GSAP scroll trigger animation for masonry cards
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const cards = galleryRef.current?.querySelectorAll(".masonry-tile");
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [selectedBrandFilter]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalItem]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="projects-container" ref={galleryRef}>
      {/* Section Header */}
      <div className="projects-header">
        <span className="section-pill">Portfolio Gallery</span>
        <h2 className="section-title">All Project Works &amp; Collateral</h2>
        <p className="section-subtitle">
          Explore complete graphic design works across all brands—including logos, packaging systems, editorial spreads, and promotional posters.
        </p>
      </div>

      {/* Brand Color Legend */}
      <div className="brand-legend-container" aria-label="Brand Color Legend">
        <div className="legend-label-wrap">
          <span className="legend-title">Brand Color Legend</span>
          <span className="legend-hint">Color-coded brand indicators:</span>
        </div>

        <div className="legend-badges-list" role="tablist" aria-label="Filter by brand">
          <button
            role="tab"
            aria-selected={selectedBrandFilter === "All"}
            className={`legend-pill-btn ${selectedBrandFilter === "All" ? "is-active-all" : ""}`}
            onClick={() => setSelectedBrandFilter("All")}
          >
            <span className="legend-swatch-dot all-dot">✦</span>
            <span className="legend-brand-name">All Works</span>
            <span className="legend-count-tag">{allProjectImages.length}</span>
          </button>

          {brandKeys.map((brandName) => {
            const config = BRAND_CONFIG[brandName];
            const count = allProjectImages.filter((img) => img.brand === brandName).length;
            const isSelected = selectedBrandFilter === brandName;

            return (
              <button
                key={brandName}
                role="tab"
                aria-selected={isSelected}
                className={`legend-pill-btn ${isSelected ? "is-active-brand" : ""}`}
                style={{
                  "--brand-accent": config.color,
                  borderColor: isSelected ? config.color : undefined,
                  backgroundColor: isSelected ? config.bgTint : undefined
                }}
                onClick={() => setSelectedBrandFilter(brandName)}
              >
                <span
                  className="legend-swatch-dot"
                  style={{ backgroundColor: config.color }}
                  aria-hidden="true"
                />
                <span className="legend-brand-name">{brandName}</span>
                <span
                  className="legend-count-tag"
                  style={{
                    backgroundColor: isSelected ? config.color : undefined,
                    color: isSelected ? "#FFFFFF" : undefined
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* All Images Responsive Masonry Grid */}
      <div className="unified-masonry-grid">
        {displayedImages.map((item) => {
          const brandConfig = BRAND_CONFIG[item.brand] || {
            color: "#D4A373",
            bgTint: "rgba(212, 163, 115, 0.1)"
          };

          return (
            <article
              key={item.id}
              className="masonry-tile"
              style={{
                "--item-brand-color": brandConfig.color,
                "--item-brand-bg": brandConfig.bgTint
              }}
              onClick={() => setActiveModalItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveModalItem(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title} by ${item.brand}`}
            >
              {/* Colored Brand Accent Header Stripe */}
              <div
                className="tile-brand-stripe"
                style={{ backgroundColor: brandConfig.color }}
                aria-hidden="true"
              />

              {/* Image Frame */}
              <div className="tile-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="tile-img"
                  loading="lazy"
                />

                {/* Tasteful Brand Badge Indicator Overlay */}
                <div className="tile-overlay-badges">
                  <span
                    className="brand-indicator-tag"
                    style={{
                      borderLeft: `4px solid ${brandConfig.color}`
                    }}
                  >
                    <span
                      className="brand-dot-indicator"
                      style={{ backgroundColor: brandConfig.color }}
                      aria-hidden="true"
                    />
                    <span className="brand-tag-name">{item.brand}</span>
                  </span>

                  <span className="tile-category-tag">{item.category}</span>
                </div>
              </div>

              {/* Meta Caption */}
              <div className="tile-meta-box">
                <div className="tile-text-col">
                  <h3 className="tile-title">{item.title}</h3>
                  <p className="tile-desc">{item.description}</p>
                </div>
                <div
                  className="tile-arrow-icon"
                  style={{ color: brandConfig.color }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox / Detail View Modal */}
      {activeModalItem && (
        <div
          className="modal-lightbox-backdrop"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-artwork-title"
        >
          <div
            className="modal-lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-lightbox-close"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close artwork detail"
            >
              ✕
            </button>

            <div className="modal-lightbox-grid">
              <div className="modal-image-col">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="modal-artwork-img"
                />
              </div>

              <div className="modal-details-col">
                {/* Brand Color Tag */}
                <div className="modal-brand-header">
                  <span
                    className="modal-brand-tag"
                    style={{
                      backgroundColor: BRAND_CONFIG[activeModalItem.brand]?.bgTint,
                      borderLeft: `4px solid ${BRAND_CONFIG[activeModalItem.brand]?.color}`
                    }}
                  >
                    <span
                      className="brand-dot-indicator"
                      style={{ backgroundColor: BRAND_CONFIG[activeModalItem.brand]?.color }}
                      aria-hidden="true"
                    />
                    <span
                      className="modal-brand-label"
                      style={{ color: BRAND_CONFIG[activeModalItem.brand]?.color }}
                    >
                      {activeModalItem.brand}
                    </span>
                  </span>

                  <span className="modal-category-badge">{activeModalItem.category}</span>
                </div>

                <h3 id="modal-artwork-title" className="modal-artwork-title">
                  {activeModalItem.title}
                </h3>

                <p className="modal-artwork-desc">{activeModalItem.description}</p>

                <div className="modal-brand-palette-box">
                  <span className="palette-box-label">Brand Color Association:</span>
                  <div className="palette-color-preview-row">
                    <span
                      className="palette-swatch-circle"
                      style={{ backgroundColor: BRAND_CONFIG[activeModalItem.brand]?.color }}
                    />
                    <div className="palette-color-meta">
                      <span className="palette-brand-name">{activeModalItem.brand}</span>
                      <code className="palette-hex-code">
                        {BRAND_CONFIG[activeModalItem.brand]?.color}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="modal-actions-wrap">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setActiveModalItem(null);
                      const contactSection = document.getElementById("contact");
                      contactSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>Inquire About Similar Work</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
