"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function ContactSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="contact" className="section" style={{ padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)", background: "var(--bg-primary)", position: "relative" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                
                {/* Horizontal Top Border for Section Separation */}
                <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)", marginBottom: "4rem", opacity: 0.3 }} />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "5rem", alignItems: "start" }}>
                    
                    {/* Left Column - Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "1rem", display: "block" }}>
                            Partner With Us
                        </span>
                        <h2 style={{ marginBottom: "2rem", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                            Accelerate Your Growth
                        </h2>
                        <p style={{ fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "3rem", color: "var(--text-muted)", maxWidth: 500 }}>
                            Whether you're an ambitious professional aiming for your next career milestone, or an enterprise seeking robust IT solutions and team upskilling—we have the expertise to get you there.
                        </p>
                    </motion.div>

                    {/* Right Column - Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="contact-action-col"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <h3 style={{ marginBottom: "1.5rem", color: "var(--text-primary)", fontSize: "1.8rem", fontWeight: 500 }}>Get In Touch</h3>
                        <p style={{ marginBottom: "2.5rem", color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7 }}>
                            Ready for a customized quote, or have questions about our world-class curriculum? Reach out to us directly. No bots—just industry experts dedicated to your success.
                        </p>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary"
                                style={{ padding: "1.2rem 2rem", fontSize: "1.1rem", display: "inline-flex", width: "fit-content", borderRadius: "var(--radius-xl)" }}
                            >
                                Enquire Now
                                <ArrowUpRight size={20} />
                            </button>

                            <div>
                                <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--text-primary)", fontSize: "1rem" }}>Or send us a direct email:</h4>
                                <a href="mailto:gravitechglobalitsolutions@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", textDecoration: "none", fontSize: "1rem", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                    <Mail size={18} style={{ color: "var(--accent)" }} />
                                    gravitechglobalitsolutions@gmail.com
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <style jsx>{`
                .contact-action-col {
                    border-left: 1px solid var(--glass-border);
                    padding-left: clamp(2rem, 5vw, 4rem);
                }
                @media (max-width: 860px) {
                    .contact-action-col {
                        border-left: none;
                        padding-left: 0;
                        border-top: 1px solid var(--glass-border);
                        padding-top: 3rem;
                    }
                }
            `}</style>
        </section>
    );
}
