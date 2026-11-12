import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        {/* Logo / Monogram */}
        <a
          href="#hero"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("hero");
          }}
          aria-label="Bertha Graphic Designer Home"
        >
          <span className="logo-wordmark">
            <span className="wordmark-b">B</span>
            <span className="wordmark-rest">ertha's</span>
          </span>
          <span className="logo-dot">✦</span>
          <span className="logo-sub">Canvas</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("hero");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
              >
                About 
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("projects");
                }}
              >
                Selected Works
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Right CTA */}
        <div className="header-actions">
          <button
            className="header-cta-btn"
            onClick={() => handleNavClick("contact")}
          >
            <span>Let's Connect</span>
            <span className="cta-arrow">→</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer" role="navigation">
          <ul className="mobile-nav-list">
            <li>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("hero");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
              >
                About Bertha
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("projects");
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
