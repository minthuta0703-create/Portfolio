import { Instagram } from "lucide-react";

interface InstagramEmbedProps {
  /** Reel/Post URL e.g. https://www.instagram.com/reel/ABC123/ */
  url?: string;
  caption?: string;
}

/**
 * Instagram embed slot. If `url` is provided, renders Instagram's official
 * iframe embed; otherwise shows a labelled placeholder so the layout still
 * reads correctly before the reel is posted.
 */
export function InstagramEmbed({ url, caption }: InstagramEmbedProps) {
  if (!url) {
    return (
      <div className="relative aspect-[9/16] max-w-sm mx-auto w-full border border-border bg-card overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-[0.4] [--grid-size:24px]" />
        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Instagram className="w-8 h-8 text-muted-foreground" />
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Reel / Media Slot
          </div>
          <p className="text-xs text-muted-foreground/80 max-w-xs">
            {caption ?? "Drop an Instagram reel URL in the data file to embed it here."}
          </p>
        </div>
      </div>
    );
  }

  const embedUrl = url.replace(/\/?$/, "/") + "embed";
  return (
    <div className="relative max-w-sm mx-auto w-full border border-border bg-card overflow-hidden">
      <iframe
        src={embedUrl}
        title={caption ?? "Instagram embed"}
        className="w-full aspect-[9/16]"
        loading="lazy"
        allow="encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
