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
        label: "Cloud Infras",
        icon: Cloud,
        color: "#3B82F6",
        description: "Scalable cloud architecture on AWS, Azure & GCP",
        features: ["Multi-cloud strategy", "Auto-scaling", "Cost optimization"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "security",
        label: "Cybersecurity",
        icon: Shield,
        color: "#EF4444",
        description: "Enterprise threat protection & compliance",
        features: ["Pen testing", "SOC 2 compliance", "Threat modeling"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "devops",
        label: "DevOps & CI/CD",
        icon: GitBranch,
        color: "#06B6D4",
        description: "Automated pipelines & infrastructure as code",
        features: ["Pipeline automation", "IaC with Terraform", "GitOps workflows"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "data",
        label: "Data Eng",
        icon: Database,
        color: "#F59E0B",
        description: "Data lakes, ETL pipelines & real-time analytics",
        features: ["ETL pipelines", "Real-time streaming", "Data governance"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "ai",
        label: "AI / ML Ops",
        icon: Brain,
        color: "#8B5CF6",
        description: "Production ML pipelines & model deployment",
        features: ["Model training", "MLOps pipelines", "AI integration"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "support",
        label: "Managed Support",
        icon: Headphones,
        color: "#10B981",
        description: "24/7 enterprise IT support & monitoring",
        features: ["24/7 monitoring", "Incident response", "SLA management"],
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
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const el = scrollContainerRef.current;
            const itemWidth = el.scrollWidth / services.length;
            el.scrollTo({
                left: itemWidth * index,
                behavior: "smooth"
            });
        }
    };

    const handleHexClick = (index: number) => {
        setActiveIndex(index);
        scrollToIndex(index);
    };

    return (
        <section id="services" className="section">
            <div className="section-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="section-label">
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
                    <p style={{ maxWidth: 600, margin: "1rem auto 0" }}>
                        Explore our interconnected enterprise solutions. Click any node to navigate the carousel.
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.5,
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
                                    background: isActive ? `${service.color}20` : "rgba(255,255,255,0.03)"
                                }}>
                                    <Icon size={26} style={{ color: service.color }} />
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                                    textAlign: "center",
                                    marginTop: "0.75rem",
                                    transition: "color 0.3s ease",
                                    lineHeight: 1.3,
                                }}
                            >
                                {service.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Auto-scrolling snapshot carousel */}
            <div style={{ marginTop: "2rem", position: "relative" }}>
                <div
                    ref={scrollContainerRef}
                    style={{
                        display: "flex",
                        overflowX: "hidden", // Hide scrollbar, controlled via JS
                        scrollSnapType: "x mandatory",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--surface)",
                        border: "1px solid var(--glass-border)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                >
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            style={{
                                minWidth: "100%",
                                scrollSnapAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            className="carousel-item"
                        >
                            {/* Text content half */}
                            <div style={{ padding: "3rem", flex: 1 }}>
                                <div style={{ color: service.color, marginBottom: "0.5rem" }}>
                                    <service.icon size={32} />
                                </div>
                                <h3 style={{ marginBottom: "1rem" }}>{service.label}</h3>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                                    {service.description}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {service.features.map(feat => (
                                        <span
                                            key={feat}
                                            style={{
                                                fontSize: "0.75rem",
                                                padding: "0.4rem 0.8rem",
                                                background: `${service.color}15`,
                                                color: service.color,
                                                borderRadius: "20px",
                                                border: `1px solid ${service.color}30`
                                            }}
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Image half */}
                            <div style={{ flex: 1, height: "400px", position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={service.image}
                                    alt={service.label}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderLeft: "1px solid var(--glass-border)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: `linear-gradient(to right, var(--surface) 0%, transparent 20%)`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary stat cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1rem",
                    marginTop: "3rem",
                }}
            >
                {[
                    { icon: Cpu, title: "99.9% Uptime", desc: "Enterprise SLA guarantees" },
                    { icon: Shield, title: "SOC 2 Compliant", desc: "Security-first infrastructure" },
                    { icon: Headphones, title: "24/7 Support", desc: "Global incident response" },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card"
                        style={{
                            padding: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <item.icon size={24} style={{ color: "var(--accent)", flexShrink: 0 }} />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                                {item.title}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--text-muted)",
                                    marginTop: 2,
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
          gap: 1rem;
          align-items: start;
        }

        .hex-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hex-shape-v2 {
          width: 90px;
          height: 100px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s var(--ease-antigravity);
          position: relative;
        }

        .hex-shape-v2::before {
          content: '';
          position: absolute;
          inset: -2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--glass-border);
          z-index: -1;
          transition: all 0.4s var(--ease-antigravity);
        }

        .hex-shape-v2:hover {
          background: var(--surface-hover);
          transform: scale(1.08);
        }

        .hex-shape-v2:hover::before {
          background: var(--hex-color, var(--accent));
          opacity: 0.5;
        }

        .hex-shape-active {
          background: var(--surface-hover) !important;
          transform: scale(1.1) !important;
        }

        .hex-shape-active::before {
          background: var(--hex-color, var(--accent)) !important;
          opacity: 0.8 !important;
        }

        .hex-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .carousel-item {
            flex-direction: column-reverse !important;
          }
          .carousel-item > div {
            width: 100% !important;
          }
          .carousel-item > div:last-child {
            height: 250px !important;
          }
        }
        @media (max-width: 768px) {
          .hex-single-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem 1rem;
          }
        }
      `}</style>
        </section>
    );
}
