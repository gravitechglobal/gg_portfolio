"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe2 } from "lucide-react";

const navLinks = [
    { label: "Courses", href: "#courses" },
    { label: "Services", href: "#services" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "0 clamp(1.5rem, 5vw, 4rem)",
            }}
        >
            <div
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 72,
                }}
            >
                {/* Logo */}
                <a
                    href="#"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                    }}
                >
                    <Globe2 size={28} style={{ color: "var(--accent)" }} />
                    <span
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Gravitech
                        <span style={{ color: "var(--accent)" }}> Global</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2.5rem",
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                transition: "color 0.3s ease",
                                position: "relative",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--text-primary)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--text-secondary)")
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem" }}>
                        Get Started
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        padding: 8,
                    }}
                    className="mobile-toggle"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            overflow: "hidden",
                            borderTop: "1px solid var(--glass-border)",
                        }}
                        className="mobile-menu"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                padding: "1rem 0",
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        color: "var(--text-secondary)",
                                        textDecoration: "none",
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        padding: "0.75rem 0",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="btn-primary"
                                style={{
                                    marginTop: "0.5rem",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
        </motion.header>
    );
}
