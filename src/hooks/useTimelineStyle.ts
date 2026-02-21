import { useState, useEffect } from 'react';

export type TimelineStyle = 'MUSEUM' | 'NEWSPAPER';

export function useTimelineStyle(): [TimelineStyle, (style: TimelineStyle) => void] {
    const [style, setStyle] = useState<TimelineStyle>('MUSEUM');

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('rooted-timeline-style') as TimelineStyle | null;
            if (saved === 'MUSEUM' || saved === 'NEWSPAPER') {
                setStyle(saved);
            }
        } catch (e) {
            console.warn('Could not read timeline style from localStorage', e);
        }
    }, []);

    const updateStyle = (newStyle: TimelineStyle) => {
        setStyle(newStyle);
        try {
            localStorage.setItem('rooted-timeline-style', newStyle);
        } catch (e) {
            console.warn('Could not save timeline style to localStorage', e);
        }
    };

    return [style, updateStyle];
}
