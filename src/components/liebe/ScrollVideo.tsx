import { useEffect, useRef } from "react";
import videoSrc from "@/assets/videos/liebe-background.mp4";

/**
 * One shared, scroll-controlled background video for the whole page.
 * - never autoplays, never calls play()
 * - page scroll progress (0..1) maps to the full video timeline
 * - rAF + lerp smoothing so scrubbing is fluid in both directions
 */
export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let duration = 0;
    let target = 0; // desired currentTime
    let current = 0; // smoothed currentTime
    let ready = false;

    const readProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const p = window.scrollY / max;
      return Math.min(1, Math.max(0, p));
    };

    const onMeta = () => {
      duration = video.duration || 0;
      ready = true;
      current = readProgress() * duration;
      target = current;
      try {
        video.currentTime = current;
      } catch {
        /* noop */
      }
    };

    const tick = () => {
      if (ready && duration > 0) {
        target = readProgress() * duration;
        // frame-rate independent smoothing
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.001) current = target;
        if (Math.abs(video.currentTime - current) > 1 / 60) {
          try {
            video.currentTime = current;
          } catch {
            /* seeking not ready yet */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    video.pause();
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full scale-105 object-cover [filter:brightness(1.06)_saturate(1.05)_contrast(1.02)]"
      />
      {/* white luxury integration layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,var(--glass-veil)_78%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background),transparent_22%,transparent_78%,var(--background))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,var(--gold-glow),transparent_55%)]" />
    </div>
  );
}
