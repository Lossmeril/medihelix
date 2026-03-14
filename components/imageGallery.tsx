"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  children?: React.ReactNode;
}

export default function ImageGallery({
  images,
  title,
  children,
}: ImageGalleryProps) {
  const valid = images.filter(Boolean);
  const heroImage = valid[0] ?? null;
  const galleryImages = valid.slice(1);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + valid.length) % valid.length),
    [valid.length],
  );

  const next = useCallback(
    () => setIndex((i) => (i + 1) % valid.length),
    [valid.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  return (
    <>
      {/* Hero + right-column content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 justify-start">
        {heroImage && (
          <div
            className="relative w-full aspect-square cursor-zoom-in"
            onClick={() => openAt(0)}
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover rounded-xl shadow"
            />
          </div>
        )}
        {children && (
          <div className={!heroImage ? "md:col-span-2" : ""}>{children}</div>
        )}
      </div>

      {/* Gallery thumbnails */}
      {galleryImages.length > 0 && (
        <section className="pt-12 lg:mt-0 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[4/3] rounded-xl shadow cursor-zoom-in"
                onClick={() => openAt(idx + 1)}
              >
                <Image
                  src={img}
                  alt={`${title} ${idx + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close */}
          <button
            aria-label="Zavřít"
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={close}
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {valid.length > 1 && (
            <button
              aria-label="Předchozí"
              className="absolute left-4 z-10 p-3 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-20"
            style={{ height: "min(85vh, 80vw)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={valid[index]}
              alt={`${title} ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          {valid.length > 1 && (
            <button
              aria-label="Další"
              className="absolute right-4 z-10 p-3 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={48} />
            </button>
          )}

          {/* Counter */}
          {valid.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
              {index + 1} / {valid.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
