'use client';

import { useState, useEffect } from 'react';

interface ScreenSize {
    screenWidth: number;
}

export function useScreenWidth (): ScreenSize {
    const [screenWidth, setScreenWidth] = useState<any>();
    
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    return { screenWidth } ;
}

