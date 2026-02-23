"use client";

import { useState, useCallback, useRef } from "react";

interface HoverIntentState {
    featuredCategory: string | null;
    confidence: number;
}

export function useHoverIntent(dwellTime = 600) {
    const [state, setState] = useState<HoverIntentState>({
        featuredCategory: null,
        confidence: 0,
    });

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onCategoryHover = useCallback(
        (category: string) => {
            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                setState({
                    featuredCategory: category,
                    confidence: 1,
                });
            }, dwellTime);
        },
        [dwellTime]
    );

    const onCategoryLeave = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Instant click — no delay
    const onCategoryClick = useCallback((category: string) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setState({
            featuredCategory: category,
            confidence: 1,
        });
    }, []);

    const resetIntent = useCallback(() => {
        setState({ featuredCategory: null, confidence: 0 });
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    return {
        ...state,
        onCategoryHover,
        onCategoryLeave,
        onCategoryClick,
        resetIntent,
    };
}
