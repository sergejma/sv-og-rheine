import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container nicht-gefunden">
      <h1>Seite nicht gefunden</h1>
      <p>
        Die aufgerufene Seite existiert nicht. <Link href="/">Zur Startseite</Link>
      </p>
    </div>
  );
}
