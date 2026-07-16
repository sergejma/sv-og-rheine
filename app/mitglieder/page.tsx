import type { Metadata } from 'next';
import { getMitglieder, type Mitglied } from '@/lib/content';

export const metadata: Metadata = { title: 'Mitglieder' };

function MitgliederGrid({ eintraege }: { eintraege: Mitglied[] }) {
  return (
    <div className="personen-grid">
      {eintraege.map((mitglied, i) => (
        <div key={`${mitglied.name}-${i}`} className="person-karte">
          <div className="person-foto">
            <img src={mitglied.foto} alt={mitglied.name} loading="lazy" />
          </div>
          <div className="person-info">
            <h3>{mitglied.name}</h3>
            {mitglied.hund && <p className="person-rolle">mit {mitglied.hund}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MitgliederPage() {
  const { hundefuehrer, mitglieder } = getMitglieder();

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>Mitglieder</h1>
        </div>
      </header>
      <div className="inhalt container">
        <div className="section-head">
          <h2>Hundeführer</h2>
        </div>
        <MitgliederGrid eintraege={hundefuehrer} />
        <div className="section-head" style={{ marginTop: '56px' }}>
          <h2>Mitglieder</h2>
        </div>
        <MitgliederGrid eintraege={mitglieder} />
      </div>
    </article>
  );
}
