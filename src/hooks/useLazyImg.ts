import { useEffect, useRef, useState } from "react";

export function useLazyImage(src: string) {
    const [visibleSrc, setVisibleSrc] = useState<string>("");
    const ref = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = ref.current;
        if (!img) return;

        const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleSrc(src);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "100px", 
                threshold: 0.1,
            }
        );

        observer.observe(img);

        return () => observer.disconnect();
    }, [src]);

    return { ref, visibleSrc };
}