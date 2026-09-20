"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cloud,
    Shield,
    GitBranch,
    Database,
    Brain,
    Headphones,
    Settings,
    Cpu,
} from "lucide-react";

interface ServiceNode {
    id: string;
    label: string;
    icon: typeof Cloud;
    color: string;
    description: string;
    features: string[];
    image: string;
}

const services: ServiceNode[] = [
    {
        id: "cloud",
        label: "Cloud Infrastructure",
        icon: Cloud,
        color: "#3B82F6",
        description: "Scalable, resilient multi-cloud architecture engineered on AWS, Azure & Google Cloud Platform.",
        features: ["Multi-cloud strategy", "Auto-scaling & HA", "Cloud cost optimization", "Zero-downtime migrations"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "security",
        label: "Cybersecurity",
        icon: Shield,
        color: "#EF4444",
        description: "Enterprise threat mitigation, vulnerability intelligence, and regulatory compliance protocols.",
        features: ["Penetration testing", "SOC 2 & ISO compliance", "Threat modeling & SIEM", "Identity access management"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "devops",
        label: "DevOps & CI/CD",
        icon: GitBranch,
        color: "#06B6D4",
        description: "Automated continuous delivery pipelines and GitOps infrastructure-as-code deployment.",
        features: ["CI/CD automation", "IaC with Terraform", "Kubernetes cluster orchestration", "Automated observability"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "data",
        label: "Data Engineering",
        icon: Database,
        color: "#F59E0B",
        description: "Modern data platforms, high-throughput streaming architectures, and enterprise analytics lakes.",
        features: ["Real-time streaming", "ETL/ELT pipeline design", "Data governance & lineage", "Cloud warehouse modernization"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "ai",
        label: "AI & Machine Learning",
        icon: Brain,
        color: "#8B5CF6",
        description: "End-to-end MLOps, intelligent automation, and production-grade LLM model deployments.",
        features: ["Production ML pipelines", "LLM fine-tuning & integration", "Model monitoring & governance", "Intelligent automation"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "support",
        label: "Managed IT Support",
        icon: Headphones,
        color: "#10B981",
        description: "24/7/365 dedicated enterprise IT systems management, proactive monitoring, and guaranteed SLAs.",
        features: ["24/7 proactive monitoring", "Rapid incident resolution", "Strict SLA guarantees", "Dedicated technical account manager"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function ServiceMesh() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll the carousel every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % services.length;
                scrollToIndex(next);
                return next;
            });
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const el = scrollContainerRef.current;
            el.scrollTo({
                left: el.clientWidth * index,
                behavior: "smooth"
            });
        }
    };

    const handleHexClick = (index: number) => {
        setActiveIndex(index);
        scrollToIndex(index);
    };

    return (
        <section id="services" className="section" style={{ padding: "clamp(2.5rem, 5vh, 4.5rem) clamp(1.5rem, 5vw, 4rem)" }}>
            <div className="section-header" style={{ marginBottom: "1.5rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="section-label" style={{ marginBottom: "0.85rem" }}>
                        <Settings size={14} />
                        Managed Services
                    </span>
                    <h2>
                        Enterprise{" "}
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Service Mesh
                        </span>
                    </h2>
                    <p style={{ maxWidth: 580, margin: "0.5rem auto 0", fontSize: "0.92rem", lineHeight: 1.55 }}>
                        Explore our comprehensive suite of enterprise solutions designed to scale your infrastructure and secure your digital assets.
                    </p>
                </motion.div>
            </div>

            {/* Single-row hex grid above the carousel */}
            <div className="hex-single-row">
                {services.map((service, i) => {
                    const Icon = service.icon;
                    const isActive = activeIndex === i;

                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.08,
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="hex-column"
                            onClick={() => handleHexClick(i)}
                            style={{ cursor: "pointer" }}
                        >
                            <div
                                className={`hex-shape-v2 ${isActive ? "hex-shape-active" : ""}`}
                                style={{ "--hex-color": service.color } as React.CSSProperties}
                            >
                                <div className="hex-icon-wrap" style={{
                                    background: isActive ? `${service.color}25` : "rgba(255,255,255,0.03)"
                                }}>
                                    <Icon size={20} style={{ color: service.color }} />
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                                    textAlign: "center",
                                    marginTop: "0.5rem",
                                    transition: "color 0.3s ease",
                                    lineHeight: 1.25,
                                    minHeight: "2.2rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    maxWidth: 110,
                                }}
                            >
                                {service.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Auto-scrolling snapshot carousel */}
            <div style={{ marginTop: "1.5rem", position: "relative", maxWidth: 1080, margin: "1.5rem auto 0" }}>
                <div
                    ref={scrollContainerRef}
                    style={{
                        display: "flex",
                        overflowX: "hidden",
                        scrollSnapType: "x mandatory",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--surface)",
                        border: "1px solid var(--glass-border)",
                        boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                    }}
                >
                    {services.map((service) => (
                        <div
                            key={service.id}
                            style={{
                                minWidth: "100%",
                                scrollSnapAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "stretch",
                                minHeight: "270px",
                            }}
                            className="carousel-item"
                        >
                            {/* Text content half */}
                            <div style={{ padding: "1.5rem 2rem", flex: 1.15, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ color: service.color, marginBottom: "0.45rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <service.icon size={18} />
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.9 }}>
                                        Enterprise Solution
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", color: "var(--text-primary)" }}>{service.label}</h3>
                                <p style={{ color: "var(--text-secondary)", marginBottom: "1.15rem", fontSize: "0.88rem", lineHeight: 1.55, maxWidth: 500 }}>
                                    {service.description}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {service.features.map(feat => (
                                        <span
                                            key={feat}
                                            style={{
                                                fontSize: "0.75rem",
                                                padding: "0.3rem 0.75rem",
                                                background: `${service.color}15`,
                                                color: service.color,
                                                borderRadius: "14px",
                                                border: `1px solid ${service.color}35`,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Image half */}
                            <div style={{ flex: 0.85, minHeight: "270px", position: "relative", overflow: "hidden" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={service.image}
                                    alt={service.label}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        borderLeft: "1px solid var(--glass-border)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: `linear-gradient(to right, var(--surface) 0%, transparent 25%)`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel navigation indicator pills */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.45rem", marginTop: "0.85rem" }}>
                    {services.map((service, idx) => (
                        <button
                            key={service.id}
                            onClick={() => handleHexClick(idx)}
                            aria-label={`Go to ${service.label}`}
                            style={{
                                width: activeIndex === idx ? 24 : 7,
                                height: 6,
                                borderRadius: 3,
                                background: activeIndex === idx ? service.color : "rgba(255, 255, 255, 0.2)",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Summary stat cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "1rem",
                    marginTop: "1.5rem",
                    maxWidth: 1080,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                {[
                    { icon: Cpu, title: "99.9% Uptime", desc: "Enterprise SLA guarantees with zero latency" },
                    { icon: Shield, title: "SOC 2 & ISO Compliant", desc: "Military-grade encryption and security" },
                    { icon: Headphones, title: "24/7 Global Support", desc: "Direct engineer-to-engineer incident response" },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card"
                        style={{
                            padding: "0.95rem 1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <div style={{
                            width: 38,
                            height: 38,
                            borderRadius: "var(--radius-sm)",
                            background: "var(--accent-soft)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}>
                            <item.icon size={20} style={{ color: "var(--accent)" }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                                {item.title}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.78rem",
                                    color: "var(--text-muted)",
                                    marginTop: 2,
                                    lineHeight: 1.4,
                                }}
                            >
                                {item.desc}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx global>{`
        .hex-single-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.85rem;
          align-items: start;
          max-width: 1080px;
          margin: 0 auto;
        }

        .hex-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hex-shape-v2 {
          width: 76px;
          height: 86px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s var(--ease-antigravity);
          position: relative;
        }

        .hex-shape-v2::before {
          content: '';
          position: absolute;
          inset: -2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--glass-border);
          z-index: -1;
          transition: all 0.3s var(--ease-antigravity);
        }

        .hex-shape-v2:hover {
          background: var(--surface-hover);
          transform: translateY(-3px) scale(1.05);
        }

        .hex-shape-v2:hover::before {
          background: var(--hex-color, var(--accent));
          opacity: 0.6;
        }

        .hex-shape-active {
          background: var(--surface-hover) !important;
          transform: translateY(-3px) scale(1.06) !important;
        }

        .hex-shape-active::before {
          background: var(--hex-color, var(--accent)) !important;
          opacity: 0.9 !important;
        }

        .hex-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        @media (max-width: 1024px) {
          .hex-single-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem 1rem;
          }
        }

        @media (max-width: 900px) {
          .carousel-item {
            flex-direction: column-reverse !important;
          }
          .carousel-item > div {
            width: 100% !important;
          }
          .carousel-item > div:last-child {
            height: 200px !important;
            min-height: 200px !important;
          }
        }

        @media (max-width: 600px) {
          .hex-single-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem 0.75rem;
          }
        }
      `}</style>
        </section>
    );
}
