import type { Metadata } from 'next';
import { getPruefungen } from '@/lib/content';

export const metadata: Metadata = { title: 'Prüfungen' };

const zelle = (wert: string) => (wert && wert.trim() ? wert : '–');

export default function PruefungenPage() {
  const pruefungen = getPruefungen();

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>Prüfungen</h1>
        </div>
      </header>
      <div className="inhalt container">
        {pruefungen.map((pruefung, i) => (
          <section key={i} className="pruefung">
            <div className="section-head">
              <h2>
                {pruefung.titel} am {pruefung.datum}
              </h2>
            </div>
            <p className="pruefung-richter">Leistungsrichter: {pruefung.richter}</p>
            <div className="tabelle-scroll">
              <table className="ergebnis-tabelle">
                <thead>
                  <tr>
                    <th scope="col">Hundeführer</th>
                    <th scope="col">Hund</th>
                    <th scope="col">Stufe</th>
                    <th scope="col">A</th>
                    <th scope="col">B</th>
                    <th scope="col">C</th>
                    <th scope="col">Gesamt</th>
                    <th scope="col">Note</th>
                    <th scope="col">Ergebnis</th>
                  </tr>
                </thead>
                <tbody>
                  {pruefung.ergebnisse.map((ergebnis, j) => (
                    <tr key={j}>
                      <td>{zelle(ergebnis.hundefuehrer)}</td>
                      <td>{zelle(ergebnis.hund)}</td>
                      <td>{zelle(ergebnis.stufe)}</td>
                      <td>{zelle(ergebnis.a)}</td>
                      <td>{zelle(ergebnis.b)}</td>
                      <td>{zelle(ergebnis.c)}</td>
                      <td>{zelle(ergebnis.gesamt)}</td>
                      <td>{zelle(ergebnis.note)}</td>
                      <td>{zelle(ergebnis.ergebnis)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
        <p className="fussnote">
          *) 1 = Krankheit oder Verletzung des HDF · 2 = Krankheit oder Verletzung des Hundes
          (Attest liegt vor) · 3 = Ohne ersichtlichen Grund, unsportliches Verhalten des HDF · 4 =
          Hund zeigt sich schußscheu · 5 = Wesensmangel · 6 = Abbruch · 7 = Disq. wegen Ungehorsam
        </p>
      </div>
    </article>
  );
}
