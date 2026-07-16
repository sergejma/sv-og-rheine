'use client';

import { useRef, useState } from 'react';

export interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);

  const geheZu = (i: number) => {
    const el = track.current;
    if (!el) return;
    const ziel = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: ziel * el.clientWidth, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setAktiv(Math.min(slides.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
  };

  return (
    <div className="hero-slider">
      <div className="hero-slider-track" ref={track} onScroll={onScroll}>
        {slides.map((slide, i) => (
          <figure className="hero-slide" key={i}>
            <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
            {slide.caption && <figcaption>{slide.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="slider-knopf slider-knopf--zurueck"
            aria-label="Vorheriges Bild"
            onClick={() => geheZu(aktiv - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="slider-knopf slider-knopf--weiter"
            aria-label="Nächstes Bild"
            onClick={() => geheZu(aktiv + 1)}
          >
            ›
          </button>
          <div className="slider-punkte">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === aktiv ? 'aktiv' : undefined}
                aria-label={`Bild ${i + 1} von ${slides.length} anzeigen`}
                onClick={() => geheZu(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
