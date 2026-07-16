import type { Metadata } from 'next';
import { getVorstand } from '@/lib/content';

export const metadata: Metadata = { title: 'Vorstand' };

export default function VorstandPage() {
  const personen = getVorstand();

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>Vorstand</h1>
        </div>
      </header>
      <div className="inhalt container">
        <div className="personen-grid">
          {personen.map((person) => (
            <div key={person.name} className="person-karte">
              <div className="person-foto">
                <img src={person.foto} alt={person.name} loading="lazy" />
              </div>
              <div className="person-info">
                <h3>{person.name}</h3>
                <p className="person-rolle">{person.rolle}</p>
                {person.email && <p className="person-kontakt">{person.email}</p>}
                {person.telefon && <p className="person-kontakt">Tel. {person.telefon}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
