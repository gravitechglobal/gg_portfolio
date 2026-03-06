"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    connections: string[];
}

const services: ServiceNode[] = [
    {
        id: "cloud",
        label: "Cloud Infrastructure",
        icon: Cloud,
        color: "#3B82F6",
        description: "Scalable cloud architecture on AWS, Azure & GCP",
        connections: ["security", "devops", "data"],
    },
    {
        id: "security",
        label: "Cybersecurity",
        icon: Shield,
        color: "#EF4444",
        description: "Enterprise threat protection & compliance",
        connections: ["cloud", "support"],
    },
    {
        id: "devops",
        label: "DevOps & CI/CD",
        icon: GitBranch,
        color: "#06B6D4",
        description: "Automated pipelines & infrastructure as code",
        connections: ["cloud", "ai"],
    },
    {
        id: "data",
        label: "Data Engineering",
        icon: Database,
        color: "#F59E0B",
        description: "Data lakes, ETL pipelines & real-time analytics",
        connections: ["cloud", "ai", "support"],
    },
    {
        id: "ai",
        label: "AI / ML Ops",
        icon: Brain,
        color: "#8B5CF6",
        description: "Production ML pipelines & model deployment",
        connections: ["devops", "data"],
    },
    {
        id: "support",
        label: "Managed Support",
        icon: Headphones,
        color: "#10B981",
        description: "24/7 enterprise IT support & monitoring",
        connections: ["security", "data"],
    },
];

export default function ServiceMesh() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const isConnected = (nodeId: string) => {
        if (!activeNode) return false;
        const active = services.find((s) => s.id === activeNode);
        return active?.connections.includes(nodeId) || false;
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
                        Click any service to explore how our solutions interconnect.
                        Every solution is engineered to work seamlessly together.
                    </p>
                </motion.div>
            </div>

            {/* Honeycomb Hex Grid */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "3rem",
                }}
            >
                <div className="hex-grid">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const isActive = activeNode === service.id;
                        const connected = isConnected(service.id);
                        const dimmed = activeNode && !isActive && !connected;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.1,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`hex-item ${isActive ? "hex-active" : ""} ${connected ? "hex-connected" : ""}`}
                                onClick={() => setActiveNode(isActive ? null : service.id)}
                                style={{
                                    opacity: dimmed ? 0.3 : 1,
                                    transition: "all 0.4s var(--ease-antigravity)",
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    className="hex-shape"
                                    style={{
                                        "--hex-color": service.color,
                                    } as React.CSSProperties}
                                >
                                    <div className="hex-content">
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 12,
                                                background: `${service.color}15`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: 8,
                                                border: `1px solid ${service.color}30`,
                                            }}
                                        >
                                            <Icon size={22} style={{ color: service.color }} />
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                color: "var(--text-primary)",
                                                textAlign: "center",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {service.label}
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                style={{
                                                    fontSize: "0.68rem",
                                                    color: "var(--text-muted)",
                                                    textAlign: "center",
                                                    marginTop: 4,
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {service.description}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Service summary cards below */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1rem",
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
        .hex-grid {
          display: grid;
          grid-template-columns: repeat(3, 180px);
          gap: 1rem;
          justify-content: center;
        }

        /* Offset every other row for honeycomb */
        .hex-item:nth-child(4),
        .hex-item:nth-child(5),
        .hex-item:nth-child(6) {
          transform: translateX(calc(180px / 2 + 0.5rem));
        }

        .hex-shape {
          position: relative;
          width: 160px;
          height: 180px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--surface);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s var(--ease-antigravity);
          margin: 0 auto;
        }

        .hex-shape::before {
          content: '';
          position: absolute;
          inset: -1px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--glass-border);
          z-index: -1;
          transition: all 0.4s var(--ease-antigravity);
        }

        .hex-item:hover .hex-shape {
          background: var(--surface-hover);
          transform: scale(1.08);
        }

        .hex-item:hover .hex-shape::before {
          background: var(--hex-color, var(--accent));
          opacity: 0.5;
        }

        .hex-active .hex-shape {
          background: var(--surface-hover) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 0 40px color-mix(in srgb, var(--hex-color) 20%, transparent);
        }

        .hex-active .hex-shape::before {
          background: var(--hex-color, var(--accent)) !important;
          opacity: 0.7 !important;
        }

        .hex-connected .hex-shape {
          background: var(--surface-hover);
        }

        .hex-connected .hex-shape::before {
          background: var(--hex-color, var(--accent));
          opacity: 0.3;
        }

        .hex-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 700px) {
          .hex-grid {
            grid-template-columns: repeat(2, 160px);
          }
          .hex-item:nth-child(4),
          .hex-item:nth-child(5),
          .hex-item:nth-child(6) {
            transform: translateX(0);
          }
          .hex-item:nth-child(3),
          .hex-item:nth-child(4) {
            transform: translateX(calc(160px / 2 + 0.5rem));
          }
          .hex-shape {
            width: 140px;
            height: 160px;
          }
        }
      `}</style>
        </section>
    );
}
