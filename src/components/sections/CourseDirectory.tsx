"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart3 } from "lucide-react";
import GlassCard from "../GlassCard";
import { courses, categories } from "@/data/courseData";
import { useHoverIntent } from "@/hooks/useHoverIntent";

export default function CourseDirectory() {
    const {
        featuredCategory,
        onCategoryHover,
        onCategoryLeave,
        onCategoryClick,
        resetIntent,
    } = useHoverIntent(600);

    // When a category is active, filter instead of just reordering
    const displayedCourses = featuredCategory
        ? courses.filter((c) => c.category === featuredCategory)
        : courses;

    return (
        <section id="courses" className="section">
            <div className="section-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="section-label">
                        <BookOpen size={14} />
                        Learning Paths
                    </span>
                    <h2>
                        Master Tomorrow&apos;s{" "}
                        <span
                            style={{
                                background: "var(--accent-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Technologies
                        </span>
                    </h2>
                    <p style={{ maxWidth: 600, margin: "1rem auto 0" }}>
                        Industry-aligned programs designed by engineers, for engineers.
                        Hover over categories to preview, or click to filter.
                    </p>
                </motion.div>

                {/* Category pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginTop: "2rem",
                    }}
                >
                    <button
                        onClick={resetIntent}
                        style={{
                            padding: "0.5rem 1.2rem",
                            borderRadius: "var(--radius-xl)",
                            border: `1px solid ${!featuredCategory ? "var(--accent)" : "var(--glass-border)"}`,
                            background: !featuredCategory ? "var(--accent-soft)" : "transparent",
                            color: !featuredCategory ? "var(--accent-glow)" : "var(--text-secondary)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            transition: "all 0.3s var(--ease-antigravity)",
                        }}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onMouseEnter={() => onCategoryHover(cat)}
                            onMouseLeave={onCategoryLeave}
                            onClick={() => onCategoryClick(cat)}
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "var(--radius-xl)",
                                border: `1px solid ${featuredCategory === cat ? "var(--accent)" : "var(--glass-border)"}`,
                                background:
                                    featuredCategory === cat ? "var(--accent-soft)" : "transparent",
                                color:
                                    featuredCategory === cat
                                        ? "var(--accent-glow)"
                                        : "var(--text-secondary)",
                                cursor: "pointer",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                transition: "all 0.3s var(--ease-antigravity)",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Bento Grid */}
            <motion.div
                layout
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.25rem",
                }}
            >
                {displayedCourses.map((course, i) => {
                    const Icon = course.icon;

                    return (
                        <motion.div
                            key={course.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                duration: 0.4,
                                delay: i * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <GlassCard accent={course.accent} delay={0}>
                                {/* Icon */}
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "var(--radius-md)",
                                        background: `${course.accent}18`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <Icon size={22} style={{ color: course.accent }} />
                                </div>

                                {/* Category tag */}
                                <div
                                    style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: course.accent,
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {course.category}
                                </div>

                                <h3
                                    style={{
                                        fontSize: "1.15rem",
                                        marginBottom: "0.5rem",
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {course.title}
                                </h3>

                                <p
                                    style={{
                                        fontSize: "0.85rem",
                                        lineHeight: 1.6,
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    {course.description}
                                </p>

                                {/* Meta row */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingTop: "1rem",
                                        borderTop: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                fontSize: "0.75rem",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            <Clock size={12} />
                                            {course.duration}
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                fontSize: "0.75rem",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            <BarChart3 size={12} />
                                            {course.level}
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {course.price}
                                    </span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
