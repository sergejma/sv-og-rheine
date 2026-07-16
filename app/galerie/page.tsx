import type { Metadata } from 'next';
import GalerieLightbox from '@/components/GalerieLightbox';
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
          <GalerieLightbox bilder={bilder} />
        )}
      </div>
    </article>
  );
}
