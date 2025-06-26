import { RefObject, useEffect } from "react";

export interface UseInfiniteScrollOptions {
    onScrollEnd?: () => void;
    triggerRef: RefObject<HTMLDivElement> | null;
    wrapperRef?: RefObject<HTMLDivElement>;
}

export const useInfiniteScroll = ({
    onScrollEnd,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollOptions) => {
    useEffect(() => {
        if (!onScrollEnd) return;

        if (triggerRef === null) return;

        const trigger = triggerRef?.current;
        const wrapper = wrapperRef?.current;

        const options = {
            root: wrapper,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onScrollEnd();
            }
        }, options);

        observer.observe(trigger);

        return () => {
            if (observer && trigger) {
                 
                observer.unobserve(trigger);
            }
        };
    }, [onScrollEnd, triggerRef, wrapperRef]);
};
