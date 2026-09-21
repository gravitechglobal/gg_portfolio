"use client";

import React from "react";

interface LogoProps {
    variant?: "horizontal" | "icon" | "emblem";
    colorScheme?: "website" | "original";
    size?: number;
    showTagline?: boolean;
    taglineText?: string;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function LogoMark({
    size = 36,
    colorScheme = "original",
    className,
    style,
}: {
    size?: number;
    colorScheme?: "website" | "original";
    className?: string;
    style?: React.CSSProperties;
}) {
    const src = colorScheme === "website" ? "/logo-3d-mark-purple.png" : "/logo-3d-mark.png";

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                borderRadius: Math.max(6, Math.round(size * 0.22)),
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.45)",
                background: "#080E18",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                ...style,
            }}
            title="Gravitech Global"
        >
            <img
                src={src}
                alt="Gravitech Global Logo"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </div>
    );
}

export default function Logo({
    variant = "horizontal",
    colorScheme = "original",
    size = 38,
    showTagline = false,
    taglineText = "EMPOWERING GROWTH, ENABLING INNOVATION",
    href,
    className,
    style,
}: LogoProps) {
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            if (window.location.hash) {
                try {
                    window.history.pushState(null, "", "/");
                } catch {}
            }
        }
    };

    if (variant === "icon") {
        const mark = <LogoMark size={size} colorScheme={colorScheme} className={className} style={style} />;
        if (href) {
            return (
                <a
                    href={href}
                    onClick={handleLogoClick}
                    style={{ display: "inline-flex", textDecoration: "none" }}
                >
                    {mark}
                </a>
            );
        }
        return mark;
    }

    if (variant === "emblem") {
        const emblemSrc = colorScheme === "original" ? "/logo-3d-emblem.png" : "/logo-3d-emblem-purple.png";
        const content = (
            <div
                className={className}
                style={{
                    display: "inline-block",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    background: "#080E18",
                    maxWidth: size ? size * 5 : 240,
                    ...style,
                }}
            >
                <img
                    src={emblemSrc}
                    alt="Gravitech Global"
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                    }}
                />
            </div>
        );

        if (href) {
            return (
                <a
                    href={href}
                    onClick={handleLogoClick}
                    style={{ display: "inline-block", textDecoration: "none" }}
                >
                    {content}
                </a>
            );
        }
        return content;
    }

    // Default: Horizontal Lockup
    const horizontalContent = (
        <div
            className={className}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                ...style,
            }}
        >
            <LogoMark size={size} colorScheme={colorScheme} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: 1.15 }}>
                <span
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: `${Math.max(17, size * 0.48)}px`,
                        letterSpacing: "-0.02em",
                        color: "#FFFFFF",
                    }}
                >
                    Gravitech
                    <span
                        style={{
                            background: "var(--accent-gradient)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "inline-block",
                            paddingLeft: "0.25rem",
                        }}
                    >
                        Global
                    </span>
                </span>
                {showTagline && (
                    <span
                        className="logo-tagline"
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: `${Math.max(9, size * 0.22)}px`,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            color: "var(--text-secondary)",
                            marginTop: 2,
                            textTransform: "uppercase",
                            opacity: 0.85,
                        }}
                    >
                        {taglineText}
                    </span>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                onClick={handleLogoClick}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                {horizontalContent}
            </a>
        );
    }

    return horizontalContent;
}
