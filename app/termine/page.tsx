import type { Metadata } from 'next';
import { getTermine } from '@/lib/content';

export const metadata: Metadata = { title: 'Termine' };

export default function TerminePage() {
  const { jahr, termine } = getTermine();

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>Termine {jahr}</h1>
        </div>
      </header>
      <div className="inhalt container">
        {termine.length === 0 ? (
          <p className="leer-hinweis">Aktuell sind keine Termine eingetragen.</p>
        ) : (
          <div className="tabelle-scroll">
          <table className="termine-tabelle">
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Uhrzeit</th>
                <th scope="col">Termin</th>
              </tr>
            </thead>
            <tbody>
              {termine.map((termin, i) => (
                <tr key={i}>
                  <td>{termin.datum}</td>
                  <td>{termin.uhrzeit}</td>
                  <td>{termin.titel}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </article>
  );
}
