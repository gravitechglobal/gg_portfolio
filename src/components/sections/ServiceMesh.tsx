"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
    x: number;
    y: number;
    connections: string[];
    description: string;
}

const initialNodes: ServiceNode[] = [
    {
        id: "cloud",
        label: "Cloud Infrastructure",
        icon: Cloud,
        color: "#3B82F6",
        x: 50,
        y: 20,
        connections: ["security", "devops", "data"],
        description: "Scalable cloud architecture on AWS, Azure & GCP",
    },
    {
        id: "security",
        label: "Cybersecurity",
        icon: Shield,
        color: "#EF4444",
        x: 80,
        y: 40,
        connections: ["cloud", "support"],
        description: "Enterprise threat protection & compliance",
    },
    {
        id: "devops",
        label: "DevOps & CI/CD",
        icon: GitBranch,
        color: "#06B6D4",
        x: 20,
        y: 40,
        connections: ["cloud", "ai"],
        description: "Automated pipelines & infrastructure as code",
    },
    {
        id: "data",
        label: "Data Engineering",
        icon: Database,
        color: "#F59E0B",
        x: 65,
        y: 65,
        connections: ["cloud", "ai", "support"],
        description: "Data lakes, ETL pipelines & real-time analytics",
    },
    {
        id: "ai",
        label: "AI / ML Ops",
        icon: Brain,
        color: "#8B5CF6",
        x: 35,
        y: 65,
        connections: ["devops", "data"],
        description: "Production ML pipelines & model deployment",
    },
    {
        id: "support",
        label: "Managed Support",
        icon: Headphones,
        color: "#10B981",
        x: 80,
        y: 80,
        connections: ["security", "data"],
        description: "24/7 enterprise IT support & monitoring",
    },
];

export default function ServiceMesh() {
    const [nodes, setNodes] = useState(initialNodes);
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [dragging, setDragging] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = useCallback((id: string) => {
        setDragging(id);
        setActiveNode(id);
    }, []);

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragging || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setNodes((prev) =>
                prev.map((node) =>
                    node.id === dragging
                        ? { ...node, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
                        : node
                )
            );
        },
        [dragging]
    );

    const handlePointerUp = useCallback(() => {
        if (dragging) {
            // Spring back with animation
            setDragging(null);
            const original = initialNodes.find((n) => n.id === dragging);
            if (original) {
                setTimeout(() => {
                    setNodes((prev) =>
                        prev.map((node) =>
                            node.id === dragging
                                ? { ...node, x: original.x, y: original.y }
                                : node
                        )
                    );
                }, 100);
            }
        }
    }, [dragging]);

    useEffect(() => {
        if (dragging) {
            const up = () => handlePointerUp();
            window.addEventListener("pointerup", up);
            return () => window.removeEventListener("pointerup", up);
        }
    }, [dragging, handlePointerUp]);

    const getNodePos = (id: string) => {
        const node = nodes.find((n) => n.id === id);
        return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
    };

    // Collect unique connections
    const connections: { from: string; to: string }[] = [];
    nodes.forEach((node) => {
        node.connections.forEach((target) => {
            if (!connections.find((c) => (c.from === node.id && c.to === target) || (c.from === target && c.to === node.id))) {
                connections.push({ from: node.id, to: target });
            }
        });
    });

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
                        Drag the nodes to explore how our IT services interconnect.
                        Every solution is engineered to work seamlessly together.
                    </p>
                </motion.div>
            </div>

            <motion.div
                ref={containerRef}
                onPointerMove={handlePointerMove}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 900,
                    aspectRatio: "16/10",
                    margin: "0 auto",
                    touchAction: "none",
                    cursor: dragging ? "grabbing" : "default",
                }}
            >
                {/* Connection lines */}
                <svg
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                >
                    {connections.map(({ from, to }) => {
                        const p1 = getNodePos(from);
                        const p2 = getNodePos(to);
                        const isActive = activeNode === from || activeNode === to;

                        return (
                            <line
                                key={`${from}-${to}`}
                                x1={`${p1.x}%`}
                                y1={`${p1.y}%`}
                                x2={`${p2.x}%`}
                                y2={`${p2.y}%`}
                                stroke={isActive ? "var(--accent)" : "var(--glass-border)"}
                                strokeWidth={isActive ? 2 : 1}
                                strokeDasharray={isActive ? "none" : "4 4"}
                                style={{
                                    transition: "all 0.5s var(--ease-antigravity)",
                                    opacity: activeNode ? (isActive ? 1 : 0.2) : 0.5,
                                }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {nodes.map((node) => {
                    const Icon = node.icon;
                    const isActive = activeNode === node.id;
                    const isConnected =
                        activeNode !== null &&
                        (nodes
                            .find((n) => n.id === activeNode)
                            ?.connections.includes(node.id) ||
                            node.connections.includes(activeNode));

                    return (
                        <div
                            key={node.id}
                            onPointerDown={() => handlePointerDown(node.id)}
                            onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                            style={{
                                position: "absolute",
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                transform: "translate(-50%, -50%)",
                                cursor: dragging === node.id ? "grabbing" : "grab",
                                zIndex: isActive ? 10 : 1,
                                transition: dragging === node.id ? "none" : "all 0.6s var(--ease-antigravity)",
                            }}
                        >
                            {/* Glow */}
                            {isActive && (
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: -20,
                                        background: `radial-gradient(circle, ${node.color}25 0%, transparent 70%)`,
                                        borderRadius: "50%",
                                        animation: "pulse-glow 2s ease-in-out infinite",
                                    }}
                                />
                            )}

                            <div
                                className="glass-card"
                                style={{
                                    padding: "1rem 1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    borderColor: isActive
                                        ? node.color
                                        : isConnected
                                            ? `${node.color}60`
                                            : undefined,
                                    opacity: activeNode && !isActive && !isConnected ? 0.3 : 1,
                                    transition: "all 0.5s var(--ease-antigravity)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "var(--radius-sm)",
                                        background: `${node.color}20`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={18} style={{ color: node.color }} />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {node.label}
                                    </div>
                                    {isActive && (
                                        <div
                                            style={{
                                                fontSize: "0.72rem",
                                                color: "var(--text-muted)",
                                                marginTop: 2,
                                                whiteSpace: "normal",
                                                maxWidth: 200,
                                            }}
                                        >
                                            {node.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Service summary cards below */}
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
        </section>
    );
}
