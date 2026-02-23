"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    accent?: string;
    delay?: number;
}

export default function GlassCard({
    children,
    style,
    className = "",
    accent,
    delay = 0,
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -6,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }}
            className={`glass-card ${className}`}
            style={{
                padding: "clamp(1.5rem, 3vw, 2rem)",
                position: "relative",
                overflow: "hidden",
                ...style,
            }}
        >
            {/* Accent glow line at top */}
            {accent && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "10%",
                        right: "10%",
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                        opacity: 0.6,
                        borderRadius: 1,
                    }}
                />
            )}
            {children}
        </motion.div>
    );
}
