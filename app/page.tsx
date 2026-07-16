import Link from 'next/link';
import { getBerichte } from '@/lib/content';

export default function HomePage() {
  const berichte = getBerichte();

  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <p className="hero-eyebrow">Seit 1925 in Rheine · Am Moosgraben</p>
            <h1>Hundesport, Ausbildung und Gemeinschaft</h1>
            <p>
              Die Ortsgruppe Rheine ist eine von ca. 1800 Ortsgruppen innerhalb des Vereins für
              Deutsche Schäferhunde (SV) e.V.
            </p>
            <p>
              Die satzungsgemäße Ausbildung und Zucht des Deutschen Schäferhundes ist seit unserer
              Gründung im Jahre 1925 unser Hauptanliegen.
            </p>
          </div>
          <div className="hero-bild">
            <img src="/uploads/vereinsheim.jpg" alt="Vereinsheim der OG Rheine am Moosgraben" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Berichte</h2>
          </div>
          <div className="karten">
            {berichte.map((bericht) => (
              <article key={bericht.slug} className="karte">
                {bericht.image && (
                  <div className="karte-bild">
                    <img src={bericht.image} alt="" loading="lazy" />
                  </div>
                )}
                <div className="karte-body">
                  <p className="karte-datum">{bericht.dateFormatted}</p>
                  <h3>
                    <Link href={`/berichte/${bericht.slug}/`}>{bericht.title}</Link>
                  </h3>
                  <p>{bericht.teaser}</p>
                  <span className="karte-mehr">Weiterlesen →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
