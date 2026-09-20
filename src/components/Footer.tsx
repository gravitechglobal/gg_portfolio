"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Logo from "./ui/Logo";
import { useState } from "react";
import EnquiryModal from "./ui/EnquiryModal";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer>
            {/* CTA Banner */}
            <section
                id="contact"
                style={{
                    padding: "clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card"
                    style={{
                        maxWidth: 800,
                        margin: "0 auto",
                        padding: "clamp(2.5rem, 5vw, 4rem)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Animated gradient border effect */}
                    <div
                        style={{
                            position: "absolute",
                            inset: -1,
                            borderRadius: "var(--radius-lg)",
                            padding: 1,
                            background: "var(--accent-gradient)",
                            WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            opacity: 0.5,
                            pointerEvents: "none",
                        }}
                    />

                    <h2 style={{ marginBottom: "1rem" }}>
                        Career{" "}
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Openings
                        </span>
                    </h2>
                    <p
                        style={{
                            maxWidth: 500,
                            margin: "0 auto 2rem",
                            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                        }}
                    >
                        Passionate about technology and education? Join our growing team of engineers and industry experts at Gravitech Global.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="mailto:gravitechglobalitsolutions@gmail.com?subject=Career%20Application" className="btn-primary" style={{ textDecoration: "none" }}>
                            <Mail size={18} />
                            Send Resume
                        </a>
                    </div>
                </motion.div>
                
                {/* Mount the modal */}
                <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </section>

            {/* Footer columns */}
            <div
                style={{
                    borderTop: "1px solid var(--glass-border)",
                    padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem) 2rem",
                    maxWidth: 1400,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "3rem",
                        marginBottom: "3rem",
                    }}
                >
                    {/* Brand column */}
                    <div>
                        <div style={{ marginBottom: "1.2rem" }}>
                            <Logo href="/" variant="horizontal" size={46} showTagline={true} />
                        </div>
                        <p style={{ fontSize: "0.85rem", maxWidth: 290, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            Empowering growth and enabling innovation through industry-aligned technology education and enterprise IT solutions.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "0.75rem",
                                marginTop: "1.25rem",
                            }}
                        >
                            {[Github, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--glass-border)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--text-muted)",
                                        transition: "all 0.3s ease",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "var(--accent)";
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "var(--text-muted)";
                                        e.currentTarget.style.borderColor = "var(--glass-border)";
                                    }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {[
                        {
                            title: "Courses",
                            links: [
                                { label: "AI & Machine Learning", href: "/#courses" },
                                { label: "Cloud Architecture", href: "/#courses" },
                                { label: "Cybersecurity", href: "/#courses" },
                                { label: "Full-Stack Engineering", href: "/#courses" },
                                { label: "Data Engineering", href: "/#courses" },
                            ],
                        },
                        {
                            title: "Services",
                            links: [
                                { label: "Cloud Infrastructure", href: "/#services" },
                                { label: "Managed Support", href: "/#services" },
                                { label: "DevOps & CI/CD", href: "/#services" },
                                { label: "Security Consulting", href: "/#services" },
                                { label: "AI / ML Ops", href: "/#services" },
                            ],
                        },
                        {
                            title: "Company",
                            links: [
                                { label: "About Us", href: "/#about" },
                                { label: "Careers", href: "/#about" },
                                { label: "Blog", href: "/#about" },
                                { label: "Partners", href: "/#about" },
                                { label: "Contact", href: "/#contact" },
                            ],
                        },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: "1.25rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                {col.title}
                            </h4>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.6rem",
                                }}
                            >
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            style={{
                                                color: "var(--text-muted)",
                                                textDecoration: "none",
                                                fontSize: "0.85rem",
                                                transition: "color 0.3s ease",
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color = "var(--text-primary)")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color = "var(--text-muted)")
                                            }
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        paddingTop: "2rem",
                        borderTop: "1px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            margin: 0,
                        }}
                    >
                        © 2026 Gravitech Global. All rights reserved.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1.5rem",
                        }}
                    >
                        {[
                            { label: "Privacy Policy", href: "/privacy" },
                            { label: "Terms of Service", href: "/terms" }
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--text-muted)",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "var(--text-primary)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "var(--text-muted)")
                                }
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
