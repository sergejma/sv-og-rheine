import type { Metadata } from 'next';
import { getGalerie } from '@/lib/content';

export const metadata: Metadata = { title: 'Galerie' };

export default function GaleriePage() {
  const bilder = getGalerie();

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>Galerie</h1>
        </div>
      </header>
      <div className="inhalt container">
        {bilder.length === 0 ? (
          <p className="leer-hinweis">Aktuell sind keine Bilder eingetragen.</p>
        ) : (
          <div className="galerie-grid">
            {bilder.map((eintrag, i) => (
              <figure key={i}>
                <div className="galerie-bild">
                  <img src={eintrag.bild} alt={eintrag.beschreibung} loading="lazy" />
                </div>
                <figcaption>{eintrag.beschreibung}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
