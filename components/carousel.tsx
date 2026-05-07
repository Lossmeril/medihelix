"use client";

import { Children, useEffect, useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

// Minimum items needed before enabling infinite looping.
// Below this threshold the tripled list would show obvious visual duplicates.
const MIN_TO_LOOP = 5;

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const items = Children.toArray(children);
  const count = items.length;
  const loop = count >= MIN_TO_LOOP;
  const trackRef = useRef<HTMLDivElement>(null);
  const repositioning = useRef(false);

  // When looping, start at the middle (second) copy so arrows work both ways
  useEffect(() => {
    if (!loop) return;
    const el = trackRef.current;
    if (!el || count === 0) return;
    const middleFirst = el.children[count] as HTMLElement | undefined;
    if (middleFirst) el.scrollLeft = middleFirst.offsetLeft;
  }, [count, loop]);

  const getStep = () => {
    const el = trackRef.current;
    if (!el || !el.children[0]) return 320;
    const gap = parseFloat(getComputedStyle(el).gap) || 16;
    return (el.children[0] as HTMLElement).offsetWidth + gap;
  };

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  // Silently reposition when the user drifts into the first or third copy
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !loop || repositioning.current) return;
    const middleStart =
      (el.children[count] as HTMLElement | undefined)?.offsetLeft ?? 0;
    const thirdStart =
      (el.children[count * 2] as HTMLElement | undefined)?.offsetLeft ?? 0;
    const singleWidth = thirdStart - middleStart;
    if (!singleWidth) return;

    if (el.scrollLeft < middleStart - singleWidth * 0.5) {
      repositioning.current = true;
      el.scrollLeft += singleWidth;
      repositioning.current = false;
    } else if (el.scrollLeft > middleStart + singleWidth * 1.5) {
      repositioning.current = true;
      el.scrollLeft -= singleWidth;
      repositioning.current = false;
    }
  };

  if (count === 0) return null;

  // Not enough items to loop — just center them, no scroll trickery needed
  if (!loop) {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-2">
        {items.map((child, i) => (
          <div key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    );
  }

  const rendered = [...items, ...items, ...items];

  return (
    <div className="relative group">
      <button
        aria-label="Předchozí"
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex items-center gap-20 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2"
      >
        {rendered.map((child, i) => (
          <div key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>

      <button
        aria-label="Další"
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
