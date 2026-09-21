"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navLinks = [
    { label: "Courses", href: "/#courses" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false);

        if (href.includes("#")) {
            const hash = href.split("#")[1];
            const isHomePage = typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");

            if (isHomePage) {
                e.preventDefault();
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        let top = 0;
                        let curr: HTMLElement | null = element;
                        while (curr) {
                            top += curr.offsetTop;
                            curr = curr.offsetParent as HTMLElement | null;
                        }
                        const navHeight = 72;
                        window.scrollTo({
                            top: Math.max(0, top - navHeight),
                            behavior: "smooth",
                        });
                    }
                }, 50);
            }
        }
    };

    return (
        <>
            {/* Gradual blur overlay */}
            <div className="gradual-blur" aria-hidden="true">
                <div className="gradual-blur-layer" />
                <div className="gradual-blur-layer" />
                <div className="gradual-blur-layer" />
                <div className="gradual-blur-layer" />
            </div>

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
                    height: 72,
                    zIndex: 100,
                    padding: "0 clamp(1rem, 4vw, 4rem)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1400,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    {/* Logo */}
                    <Logo href="/" variant="horizontal" size={44} showTagline={true} />

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
                                onClick={(e) => handleNavClick(e, link.href)}
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
                        <a
                            href="/#contact"
                            onClick={(e) => handleNavClick(e, "/#contact")}
                            className="btn-primary"
                            style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem", textDecoration: "none" }}
                        >
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
                            width: 44,
                            height: 44,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="mobile-toggle"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "fixed",
                                top: 72,
                                left: 0,
                                right: 0,
                                background: "rgba(5, 5, 16, 0.98)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderBottom: "1px solid var(--glass-border)",
                                padding: "1.25rem clamp(1.25rem, 5vw, 2.5rem) 2rem",
                                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
                                zIndex: 99,
                            }}
                            className="mobile-menu"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.35rem",
                                }}
                            >
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        style={{
                                            color: "var(--text-primary)",
                                            textDecoration: "none",
                                            fontSize: "1.1rem",
                                            fontWeight: 600,
                                            padding: "0.85rem 0.5rem",
                                            transition: "color 0.2s ease, background 0.2s ease",
                                            borderRadius: "8px",
                                            display: "block",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href="/#contact"
                                    className="btn-primary"
                                    style={{
                                        marginTop: "1rem",
                                        justifyContent: "center",
                                        textDecoration: "none",
                                        padding: "0.95rem",
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                    }}
                                    onClick={(e) => handleNavClick(e, "/#contact")}
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
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
            </motion.header>
        </>
    );
}
