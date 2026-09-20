"use client";

import { Users, Globe, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="about" className="section" style={{ padding: "clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)", position: "relative" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label" style={{ margin: "0 auto 1.5rem" }}>
                        <Users size={14} />
                        About Us
                    </span>
                    <h2 style={{ marginBottom: "1rem" }}>
                        Empowering Technology{" "}
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Leaders
                        </span>
                    </h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "4rem", maxWidth: 600, margin: "1rem auto 3rem", color: "var(--text-muted)" }}>
                        Building the foundation of innovation through world-class education and enterprise IT solutions.
                    </p>
                </motion.div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", textAlign: "left" }}>
                    {[
                        { icon: Globe, title: "Global Reach", desc: "Delivering high-quality education and IT services to clients worldwide." },
                        { icon: Target, title: "Industry Aligned", desc: "Our curriculum is designed by working engineers to meet current market demands." },
                        { icon: Award, title: "Excellence", desc: "Committed to the highest standards of professional certification and support." }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card" 
                            style={{ padding: "2rem" }}
                        >
                            <div style={{ width: 48, height: 48, borderRadius: "var(--radius-sm)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                                <item.icon size={24} style={{ color: "var(--accent)" }} />
                            </div>
                            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>{item.title}</h3>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
