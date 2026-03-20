"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Layers, ChevronDown, Wrench, Lightbulb, BookOpen, GraduationCap, Cloud, Shield, Terminal, Server, Database, Network, Globe, Scale, Gauge, MapPin, Activity, HardDrive, ShieldCheck, FolderArchive, Building2, Receipt, Brain, Radio, KeyRound, Zap, GitBranch, Hammer, Rocket, Workflow, FileCode, Box, Container, Code, Cpu, Settings, BarChart, LayoutDashboard, Kanban, Package, LucideIcon } from "lucide-react";
import { type ModuleDataJSON, type CourseDetailJSON } from "@/data/courseLoader";
import Navbar from "@/components/Navbar";

export const iconMap: Record<string, LucideIcon> = {
    Cloud, Shield, Terminal, Server, Database, Network, Globe, Scale, Gauge, MapPin, Activity, HardDrive, ShieldCheck, GraduationCap, FolderArchive, Building2, Receipt, Brain, Radio, KeyRound, Zap, GitBranch, Hammer, Rocket, Workflow, FileCode, Box, Container, Code, Cpu, Settings, Wrench, BarChart, LayoutDashboard, Kanban, Package, BookOpen
};

/* ── Module Accordion Card ── */
function ModuleCard({ module, accent, index }: { module: ModuleDataJSON; accent: string; index: number }) {
    const [open, setOpen] = useState(false);
    const Icon = iconMap[module.icon] || BookOpen;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                onClick={() => setOpen(!open)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
                style={{
                    background: open ? "rgba(255,255,255,0.04)" : "var(--surface)",
                    border: `1px solid ${open ? accent + "30" : "var(--glass-border)"}`,
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all 0.35s var(--ease-antigravity)",
                    overflow: "hidden",
                }}
            >
                {/* ── Collapsed Header ── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem 1.25rem",
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "var(--radius-sm)",
                            background: `${accent}14`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        {/* We use React.createElement or just render the component since it's already mapped */}
                        {Icon && <Icon size={18} style={{ color: accent }} />}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <span
                                style={{
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    color: accent,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    opacity: 0.8,
                                }}
                            >
                                Module {module.id}
                            </span>
                            {module.service && (
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                        color: "var(--text-muted)",
                                        background: "rgba(255,255,255,0.04)",
                                        padding: "2px 8px",
                                        borderRadius: "var(--radius-xl)",
                                        border: "1px solid var(--glass-border)",
                                    }}
                                >
                                    {module.service}
                                </span>
                            )}
                        </div>
                        <h4
                            style={{
                                margin: 0,
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                lineHeight: 1.4,
                                fontFamily: "var(--font-display)",
                            }}
                        >
                            {module.title}
                        </h4>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                        <span
                            style={{
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <Clock size={11} />
                            {module.duration}
                        </span>
                        <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ color: "var(--text-muted)" }}
                        >
                            <ChevronDown size={16} />
                        </motion.div>
                    </div>
                </div>

                {/* ── Expanded Content ── */}
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <div
                                style={{
                                    padding: "0 1.25rem 1.25rem 1.25rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                <div style={{ height: 1, background: "var(--glass-border)" }} />

                                {/* Topics */}
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                                        <BookOpen size={13} style={{ color: accent }} />
                                        <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                                            Topics
                                        </span>
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                        {module.topics.map((topic: string) => (
                                            <li key={topic} style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hands-On */}
                                {module.handsOn && module.handsOn.length > 0 && (
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.5rem" }}>
                                            <Wrench size={13} style={{ color: accent }} />
                                            <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                                                Hands-On Lab
                                            </span>
                                        </div>
                                        <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                            {module.handsOn.map((item: string) => (
                                                <li key={item} style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Learning Outcome */}
                                {module.learningOutcome && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.5rem",
                                            padding: "0.75rem 1rem",
                                            borderRadius: "var(--radius-sm)",
                                            background: `${accent}0a`,
                                            border: `1px solid ${accent}18`,
                                        }}
                                    >
                                        <Lightbulb size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                                        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                            {module.learningOutcome}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ── Main Course Page (Client Component) ── */
export default function CourseDetailClient({ course }: { course: CourseDetailJSON }) {
    const router = useRouter();

    if (!course) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
                    <h2 style={{ color: "var(--text-primary)" }}>Course not found</h2>
                    <button className="btn-ghost" onClick={() => router.push("/#courses")}>
                        <ArrowLeft size={16} /> Back to Courses
                    </button>
                </div>
            </>
        );
    }

    const totalModules = course.tiers.reduce((sum: number, t: any) => sum + t.modules.length, 0);

    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh" }}>
                {/* ── Hero Header ── */}
                <section
                    style={{
                        position: "relative",
                        padding: "8rem clamp(1.5rem, 5vw, 4rem) 3rem",
                        maxWidth: 1400,
                        margin: "0 auto",
                    }}
                >
                    <motion.button
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => router.push("/#courses")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: "none",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-xl)",
                            padding: "0.5rem 1rem",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            transition: "all 0.3s var(--ease-antigravity)",
                            marginBottom: "2rem",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--accent-glow)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--glass-border)";
                            e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                    >
                        <ArrowLeft size={14} />
                        All Courses
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="section-label" style={{ marginBottom: "1rem", display: "inline-flex" }}>
                            <GraduationCap size={14} />
                            Course Curriculum
                        </span>

                        <h1
                            style={{
                                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                                color: "var(--text-primary)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {course.title}
                        </h1>
                        <p
                            style={{
                                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                                color: "var(--text-secondary)",
                                margin: 0,
                                lineHeight: 1.5,
                                maxWidth: 600,
                            }}
                        >
                            {course.subtitle}
                        </p>

                        {/* Stats Row */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                            {[
                                { icon: Calendar, label: `${course.totalDays} Days`, sub: "Total Duration" },
                                { icon: Clock, label: course.sessionDuration, sub: "Per Session" },
                                { icon: Layers, label: `${totalModules} Modules`, sub: "Comprehensive" },
                            ].map((stat) => (
                                <div
                                    key={stat.sub}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        padding: "0.75rem 1.25rem",
                                        borderRadius: "var(--radius-md)",
                                        background: "var(--surface)",
                                        border: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <stat.icon size={18} style={{ color: course.accent }} />
                                    <div>
                                        <div style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                                            {stat.label}
                                        </div>
                                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                                            {stat.sub}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.25rem",
                                    borderRadius: "var(--radius-md)",
                                    background: `${course.accent}10`,
                                    border: `1px solid ${course.accent}25`,
                                }}
                            >
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: course.accent, boxShadow: `0 0 8px ${course.accent}` }} />
                                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: course.accent }}>
                                    {course.level}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ── Module Tiers ── */}
                <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 10vh, 8rem)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                        {course.tiers.map((tier: any, ti: number) => {
                            const tierTotal = tier.modules.reduce((s: number, m: any) => {
                                const d = parseInt(m.duration);
                                return s + (isNaN(d) ? 0 : d);
                            }, 0);

                            return (
                                <motion.div
                                    key={tier.label}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, delay: ti * 0.15 }}
                                >
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                                            <h2
                                                style={{
                                                    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                                                    fontWeight: 600,
                                                    fontFamily: "var(--font-display)",
                                                    color: "var(--text-primary)",
                                                    margin: 0,
                                                }}
                                            >
                                                {tier.label}
                                            </h2>
                                            <span
                                                style={{
                                                    fontSize: "0.68rem",
                                                    fontWeight: 600,
                                                    padding: "3px 10px",
                                                    borderRadius: "var(--radius-xl)",
                                                    background: `${course.accent}12`,
                                                    color: course.accent,
                                                    border: `1px solid ${course.accent}20`,
                                                }}
                                            >
                                                {tier.modules.length} Modules · {tierTotal} Days
                                            </span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                            {tier.description}
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                                        {tier.modules.map((mod: ModuleDataJSON, i: number) => (
                                            <ModuleCard key={mod.id} module={mod} accent={course.accent} index={i} />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── Bottom CTA ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            marginTop: "4rem",
                            padding: "2rem",
                            borderRadius: "var(--radius-lg)",
                            background: "var(--surface)",
                            border: "1px solid var(--glass-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "1.5rem",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    fontFamily: "var(--font-display)",
                                    marginBottom: "0.25rem",
                                }}
                            >
                                Ready to get started?
                            </h3>
                            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                Enroll now and master {course.title.toLowerCase()} in {course.totalDays} days.
                            </p>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                window.location.href = "/#contact";
                            }}
                        >
                            Enroll Now
                        </button>
                    </motion.div>
                </section>
            </main>
        </>
    );
}
