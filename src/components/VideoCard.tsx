import { PlayIcon } from "./Icons";

interface VideoCardProps {
  youtubeId: string;
  title: string;
}

export default function VideoCard({ youtubeId, title }: VideoCardProps) {
  const thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  return (
    <a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 transition hover:border-cyan-400/60"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={thumb}
          alt={title}
          className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 transition group-hover:bg-slate-950/10">
          <PlayIcon className="h-14 w-14 drop-shadow-lg transition group-hover:scale-110" />
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          YouTube
        </span>
      </div>
      <p className="px-3 py-2 text-xs font-medium text-slate-300 group-hover:text-cyan-300">{title}</p>
    </a>
  );
}
