import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoadingOverlay from "./components/LoadingOverlay";
import Hero from "./components/Hero";
import AboutCard from "./components/AboutCard";
import ProjectMasonry from "./components/ProjectMasonry";
import Footer from "./components/Footer";

export default function App() {
  // Ensure reduced-motion preference is respected globally
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      document.body.classList.add("reduce-motion");
    }
  }, []);

  return (
    <>
      <LoadingOverlay />
      <Navbar />
      <main>
        <section id="hero" aria-label="Hero Introduction">
          <Hero />
        </section>
        <section id="about" aria-label="About Bertha">
          <AboutCard />
        </section>
        <section id="projects" aria-label="Selected Works">
          <ProjectMasonry />
        </section>
      </main>
      <Footer />
    </>
  );
}
