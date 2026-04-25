"use client";

export default function VideoPlayer({ video }) {
  if (!video) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500">
        <p className="font-bold uppercase tracking-widest text-xs">Video no disponible</p>
      </div>
    );
  }

  if (video.tipo === 'youtube') {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&showinfo=0&color=white&iv_load_policy=3`}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (video.tipo === 'bunny') {
    return (
      <iframe
        src={video.url}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return null;
}