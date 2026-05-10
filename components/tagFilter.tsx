"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: string[];
  basePath: string;
}

function TagFilterInner({ tags, basePath }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => router.push(basePath)}
        className={`px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer ${
          !activeTag
            ? "bg-sky-600 text-white border-sky-600"
            : "bg-white text-gray-600 border-gray-300 hover:border-sky-400"
        }`}
      >
        Vše
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() =>
            router.push(`${basePath}?tag=${encodeURIComponent(tag)}`)
          }
          className={`px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer ${
            activeTag === tag
              ? "bg-sky-600 text-white border-sky-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-sky-400"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export function TagFilter(props: TagFilterProps) {
  return (
    <Suspense>
      <TagFilterInner {...props} />
    </Suspense>
  );
}
