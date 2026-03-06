"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GlobeScene = dynamic(() => import("./globe/GlobeScene"), {
    ssr: false,
    loading: () => (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: 48,
                    height: 48,
                    border: "2px solid var(--glass-border)",
                    borderTop: "2px solid var(--accent)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            />
        </div>
    ),
});

export default function HeroSection() {
    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                padding: "0 clamp(1.5rem, 5vw, 4rem)",
            }}
        >
            {/* Full-section globe background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <GlobeScene />
            </div>

            {/* Content overlay — pointer-events: none so globe stays interactive */}
            <div
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    minHeight: "100vh",
                    paddingTop: 72,
                    position: "relative",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
                className="hero-content"
            >
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    style={{ maxWidth: 580, pointerEvents: "none", userSelect: "none" }}
                >
                    <h1 style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                        Elevate Your
                        <br />
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Digital Future
                        </span>
                    </h1>

                    <p
                        style={{
                            maxWidth: 500,
                            marginBottom: "2.5rem",
                            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                        }}
                    >
                        Gravitech Global empowers enterprises with world-class technology
                        education, managed IT services, and professional certifications —
                        seamlessly delivered across the globe.
                    </p>

                    {/* Buttons need pointer events restored */}
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                            pointerEvents: "auto",
                        }}
                    >
                        <a href="#courses" className="btn-primary" style={{ textDecoration: "none" }}>
                            Explore Courses
                        </a>
                        <a href="#services" className="btn-ghost" style={{ textDecoration: "none" }}>
                            Our Services
                        </a>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
        @media (max-width: 900px) {
          .hero-content {
            text-align: center;
            justify-content: center !important;
            padding-top: 100px !important;
          }
          .hero-content div[style*="display: flex"][style*="gap: 1rem"] {
            justify-content: center;
          }
        }
      `}</style>
        </section>
    );
}
