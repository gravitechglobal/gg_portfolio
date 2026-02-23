"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

interface CertBadge {
    name: string;
    issuer: string;
    color: string;
}

const certifications: CertBadge[] = [
    { name: "AWS Solutions Architect", issuer: "Amazon", color: "#FF9900" },
    { name: "Azure Administrator", issuer: "Microsoft", color: "#0078D4" },
    { name: "Google Cloud Professional", issuer: "Google", color: "#4285F4" },
    { name: "Kubernetes Administrator", issuer: "CNCF", color: "#326CE5" },
    { name: "Certified Ethical Hacker", issuer: "EC-Council", color: "#E31937" },
    { name: "CompTIA Security+", issuer: "CompTIA", color: "#C8202F" },
    { name: "Terraform Associate", issuer: "HashiCorp", color: "#7B42BC" },
    { name: "Cisco CCNA", issuer: "Cisco", color: "#049FD9" },
    { name: "PMP Certified", issuer: "PMI", color: "#1A6FB5" },
    { name: "Scrum Master", issuer: "Scrum.org", color: "#009FDA" },
    { name: "ITIL 4 Foundation", issuer: "Axelos", color: "#6F2DA8" },
    { name: "Data Engineer", issuer: "Google", color: "#34A853" },
];

function MarqueeBadge({ cert }: { cert: CertBadge }) {
    return (
        <div
            className="glass-card cert-badge"
            style={{
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexShrink: 0,
                marginRight: "1rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                minWidth: 240,
            }}
        >
            {/* Spotlight overlay — revealed on hover via CSS */}
            <div
                className="spotlight"
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cert.color}15 0%, transparent 60%)`,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-sm)",
                    background: `${cert.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Award size={20} style={{ color: cert.color }} />
            </div>
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                    }}
                >
                    {cert.name}
                </div>
                <div
                    style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                    }}
                >
                    by {cert.issuer}
                </div>
            </div>
            <ExternalLink
                size={14}
                style={{
                    color: "var(--text-muted)",
                    marginLeft: "auto",
                    flexShrink: 0,
                }}
            />
        </div>
    );
}

export default function CertMarquee() {
    const allCerts = [...certifications, ...certifications];

    return (
        <section id="certifications" className="section">
            <div className="section-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="section-label">
                        <Award size={14} />
                        Certifications
                    </span>
                    <h2>
                        Industry{" "}
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Recognized
                        </span>
                    </h2>
                    <p style={{ maxWidth: 600, margin: "1rem auto 0" }}>
                        Prepare for globally recognized certifications with our expert-led
                        programs. Hover over any badge for a closer look.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Row 1 — left scroll */}
            <div className="marquee-container" style={{ marginBottom: "1rem" }}>
                <div className="marquee-track">
                    {allCerts.map((cert, i) => (
                        <MarqueeBadge key={`r1-${i}`} cert={cert} />
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 — reversed / offset */}
            <div className="marquee-container">
                <div
                    className="marquee-track"
                    style={{
                        animationDirection: "reverse",
                        animationDuration: "35s",
                    }}
                >
                    {[...allCerts].reverse().map((cert, i) => (
                        <MarqueeBadge key={`r2-${i}`} cert={cert} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
        .cert-badge:hover .spotlight {
          opacity: 1 !important;
        }
        .cert-badge:hover {
          border-color: var(--glass-border-hover) !important;
          transform: scale(1.03);
        }
        .cert-badge {
          transition: all 0.3s var(--ease-antigravity);
        }
      `}</style>
        </section>
    );
}
