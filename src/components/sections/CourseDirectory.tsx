"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart3, Users, Star, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
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
                                background: featuredCategory === cat ? "var(--accent-soft)" : "transparent",
                                color: featuredCategory === cat ? "var(--accent-glow)" : "var(--text-secondary)",
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

            {/* Uniform Card Grid */}
            <motion.div
                layout
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
                            <div
                                className="glass-card"
                                style={{
                                    padding: "1.25rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 320,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Accent top bar */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 3,
                                        background: course.accent,
                                        opacity: 0.8,
                                    }}
                                />

                                {/* Header row: icon + rating */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "var(--radius-sm)",
                                            background: `${course.accent}18`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon size={20} style={{ color: course.accent }} />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                            fontSize: "0.75rem",
                                            color: "#F59E0B",
                                            fontWeight: 600,
                                        }}
                                    >
                                        <Star size={12} fill="#F59E0B" />
                                        {course.rating}
                                    </div>
                                </div>

                                {/* Category */}
                                <div
                                    style={{
                                        fontSize: "0.65rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: course.accent,
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    {course.category}
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        marginBottom: "0.4rem",
                                        color: "var(--text-primary)",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {course.title}
                                </h3>

                                {/* Description */}
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        lineHeight: 1.5,
                                        color: "var(--text-secondary)",
                                        flex: 1,
                                        marginBottom: "0.75rem",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {course.description}
                                </p>

                                {/* Meta badges row */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.75rem",
                                        marginBottom: "0.75rem",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontSize: "0.7rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        <Clock size={11} /> {course.duration}
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontSize: "0.7rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        <BarChart3 size={11} /> {course.level}
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontSize: "0.7rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        <Layers size={11} /> {course.modules} modules
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontSize: "0.7rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        <Users size={11} /> {course.students}
                                    </span>
                                </div>

                                {/* Footer: price/enquire + CTA */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingTop: "0.75rem",
                                        borderTop: "1px solid var(--glass-border)",
                                    }}
                                >
                                    {course.priceVisible ? (
                                        <span
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontWeight: 700,
                                                fontSize: "1rem",
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {course.price}
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                color: "var(--text-muted)",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            Coming soon
                                        </span>
                                    )}

                                    {course.slug ? (
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                padding: "0.4rem 0.9rem",
                                                borderRadius: "var(--radius-xl)",
                                                background: `${course.accent}18`,
                                                color: course.accent,
                                                border: `1px solid ${course.accent}30`,
                                                fontSize: "0.72rem",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "all 0.3s var(--ease-antigravity)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            View Modules <ArrowRight size={12} />
                                        </Link>
                                    ) : (
                                        <button
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                padding: "0.4rem 0.9rem",
                                                borderRadius: "var(--radius-xl)",
                                                background: `${course.accent}18`,
                                                color: course.accent,
                                                border: `1px solid ${course.accent}30`,
                                                fontSize: "0.72rem",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                transition: "all 0.3s var(--ease-antigravity)",
                                            }}
                                        >
                                            Learn More <ArrowRight size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
