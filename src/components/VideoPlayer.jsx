"use client";

export default function VideoPlayer({ url }) {
  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500">
        Video no disponible
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className="w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}