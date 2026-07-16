'use client';

import { useRef, useState } from 'react';
import type { GalerieBild } from '@/lib/content';

export default function GalerieLightbox({ bilder }: { bilder: GalerieBild[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const oeffne = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const schliesse = () => dialogRef.current?.close();

  const blaettere = (richtung: number) =>
    setIndex((i) => (i === null ? null : (i + richtung + bilder.length) % bilder.length));

  const aktuelles = index !== null ? bilder[index] : null;

  return (
    <>
      <div className="galerie-grid">
        {bilder.map((eintrag, i) => (
          <figure key={i}>
            <button
              type="button"
              className="galerie-bild"
              onClick={() => oeffne(i)}
              aria-label={`Bild vergrößern: ${eintrag.beschreibung}`}
            >
              <img src={eintrag.bild} alt={eintrag.beschreibung} loading="lazy" />
            </button>
            <figcaption>{eintrag.beschreibung}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) schliesse();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') blaettere(-1);
          if (e.key === 'ArrowRight') blaettere(1);
        }}
      >
        {aktuelles && (
          <div className="lightbox-inhalt">
            <img src={aktuelles.bild} alt={aktuelles.beschreibung} />
            <p>{aktuelles.beschreibung}</p>
            <button
              type="button"
              className="lightbox-schliessen"
              onClick={schliesse}
              aria-label="Großansicht schließen"
            >
              ✕
            </button>
            {bilder.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-pfeil lightbox-pfeil--zurueck"
                  onClick={() => blaettere(-1)}
                  aria-label="Vorheriges Bild"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox-pfeil lightbox-pfeil--weiter"
                  onClick={() => blaettere(1)}
                  aria-label="Nächstes Bild"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
