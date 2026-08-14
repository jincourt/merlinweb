"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import {
  MARKETING_STORIES,
  STORY_HEIGHT,
  STORY_WIDTH,
} from "./marketing-stories";

const PREVIEW_SCALE = 0.28;
const PREVIEW_WIDTH = STORY_WIDTH * PREVIEW_SCALE;
const PREVIEW_HEIGHT = STORY_HEIGHT * PREVIEW_SCALE;

async function exportStory(node: HTMLElement, filename: string) {
  await document.fonts.ready;

  const dataUrl = await toPng(node, {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    pixelRatio: 1,
    cacheBust: true,
    skipFonts: false,
    style: {
      transform: "none",
      margin: "0",
    },
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export function AdminLibrary() {
  const exportRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  async function handleDownload(id: string, filename: string) {
    const node = exportRefs.current[id];
    if (!node) return;

    setDownloadingId(id);
    try {
      await exportStory(node, filename);
    } finally {
      setDownloadingId(null);
    }
  }

  async function handleDownloadAll() {
    setDownloadingAll(true);
    try {
      for (const story of MARKETING_STORIES) {
        const node = exportRefs.current[story.id];
        if (!node) continue;
        await exportStory(node, story.filename);
        await new Promise((r) => setTimeout(r, 350));
      }
    } finally {
      setDownloadingAll(false);
    }
  }

  const busy = downloadingAll || downloadingId !== null;

  return (
    <>
      {/* Canvases pleine taille — hors écran, sans transform, pour export PNG exact */}
      <div className="admin-library-export-layer" aria-hidden>
        {MARKETING_STORIES.map(({ id, Component }) => (
          <div
            key={id}
            ref={(el) => {
              exportRefs.current[id] = el;
            }}
            className="admin-library-export-canvas"
          >
            <Component />
          </div>
        ))}
      </div>

      <header className="admin-page-header">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="t-mono !text-black/70">Assets marketing</span>
            <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
              Library
            </h1>
            <p className="t-body mt-3 max-w-xl">
              Visuels story 1080×1920 avec marges safe zone (280 px haut · 340 px bas) pour
              Instagram, TikTok et Meta Ads.
            </p>
          </div>
          <button
            type="button"
            className="btn-dark shrink-0"
            disabled={busy}
            onClick={handleDownloadAll}
          >
            {downloadingAll ? (
              <Loader2 size={14} strokeWidth={2} className="animate-spin" aria-hidden />
            ) : (
              <Download size={14} strokeWidth={2} aria-hidden />
            )}
            Télécharger tout
          </button>
        </div>
      </header>

      <div className="admin-library-grid">
        {MARKETING_STORIES.map(({ id, title, subtitle, filename, Component }) => (
          <article key={id} className="admin-library-card">
            <div className="admin-library-card-head">
              <div>
                <h2 className="text-[0.9375rem] font-medium text-black">{title}</h2>
                <p className="mt-1 text-sm text-muted">{subtitle}</p>
              </div>
              <button
                type="button"
                className="btn-outline !py-2.5 !px-4"
                disabled={busy}
                onClick={() => handleDownload(id, filename)}
              >
                {downloadingId === id ? (
                  <Loader2 size={14} strokeWidth={2} className="animate-spin" aria-hidden />
                ) : (
                  <Download size={14} strokeWidth={2} aria-hidden />
                )}
                PNG
              </button>
            </div>

            <div
              className="admin-library-preview"
              style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
            >
              <div
                className="admin-library-preview-scale"
                style={{
                  width: STORY_WIDTH,
                  height: STORY_HEIGHT,
                  transform: `scale(${PREVIEW_SCALE})`,
                }}
              >
                <Component />
              </div>
            </div>

            <p className="t-mono !text-black/45">
              {STORY_WIDTH}×{STORY_HEIGHT}px · {filename}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
