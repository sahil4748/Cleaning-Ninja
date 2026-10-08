"use client";

import { Pause, Play, RotateCcw } from "lucide-react";

type Props = {
  mode: "none" | "scroll" | "play";
  active: boolean;
  ended: boolean;
  onToggle: () => void;
};

/** A complete poster remains in place while optional media loads or is unavailable. */
export default function Film({ mode, active, ended, onToggle }: Props) {
  const label = mode === "scroll" ? active ? "Pause motion" : "Resume motion" : active ? "Pause film" : ended ? "Replay film" : "Play film";
  const Icon = active ? Pause : ended ? RotateCcw : Play;

  return (
    <>
      <div className="cp-film">
        <picture className="cp-poster">
          <source media="(max-width: 700px)" srcSet="/media/carpet-cleaning/poster-mobile.webp" />
          <img src="/media/carpet-cleaning/poster.webp" alt="Illustrative scene of a professional extraction wand cleaning a carpet" width="1920" height="1080" fetchPriority="high" />
        </picture>
        <video data-src-desktop="/media/carpet-cleaning/film.mp4"
          data-src-mobile="/media/carpet-cleaning/film-mobile.mp4"
          muted playsInline preload="none" aria-hidden="true" />
      </div>
      {mode !== "none" && <button type="button" className="cp-film-control" onClick={onToggle} aria-label={label}>
        <Icon size={14} aria-hidden="true" /><span>{label}</span>
      </button>}
    </>
  );
}
