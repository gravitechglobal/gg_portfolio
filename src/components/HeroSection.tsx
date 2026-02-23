"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

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
            {/* Content grid */}
            <div
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "center",
                    gap: "2rem",
                    minHeight: "100vh",
                    paddingTop: 72,
                }}
                className="hero-grid"
            >
                {/* Left - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="section-label"
                    >
                        <Sparkles size={14} />
                        Next-Gen EduTech & IT
                    </motion.div>

                    <h1 style={{ marginBottom: "1.5rem" }}>
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

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="#courses" className="btn-primary" style={{ textDecoration: "none" }}>
                            Explore Courses
                        </a>
                        <a href="#services" className="btn-ghost" style={{ textDecoration: "none" }}>
                            Our Services
                        </a>
                    </div>

                    {/* Stats
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{
                            display: "flex",
                            gap: "2.5rem",
                            marginTop: "3.5rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid var(--glass-border)",
                        }}
                    >
                        {[
                            { value: "50K+", label: "Students" },
                            { value: "120+", label: "Courses" },
                            { value: "40+", label: "Countries" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div
                                    style={{
                                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-display)",
                                        background: "var(--accent-gradient)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "var(--text-muted)",
                                        marginTop: 2,
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div> */}
                </motion.div>

                {/* Right - Globe */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    style={{
                        width: "100%",
                        height: "min(70vh, 650px)",
                        position: "relative",
                    }}
                >
                    <GlobeScene />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-muted)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                }}
            >
                <span>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowDown size={16} />
                </motion.div>
            </motion.div>

            <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 100px !important;
          }
          .hero-grid > div:last-child {
            height: min(50vh, 400px) !important;
            order: -1;
          }
          .hero-grid .section-label {
            justify-content: center;
          }
          .hero-grid div[style*="display: flex"][style*="gap: 1rem"] {
            justify-content: center;
          }
          .hero-grid div[style*="display: flex"][style*="gap: 2.5rem"] {
            justify-content: center;
          }
        }
      `}</style>
        </section>
    );
}
