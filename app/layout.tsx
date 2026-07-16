import type { Metadata } from 'next';
import Link from 'next/link';
import '@fontsource-variable/archivo';
import '@fontsource-variable/source-serif-4';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SV OG Rheine – Verein für Deutsche Schäferhunde',
    template: '%s | SV OG Rheine',
  },
  description:
    'Verein für Deutsche Schäferhunde (SV) e.V. – Ortsgruppe Rheine. Satzungsgemäße Ausbildung und Zucht des Deutschen Schäferhundes seit 1925.',
};

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/vorstand/', label: 'Vorstand' },
  { href: '/mitglieder/', label: 'Mitglieder' },
  { href: '/pruefungen/', label: 'Prüfungen' },
  { href: '/termine/', label: 'Termine' },
  { href: '/galerie/', label: 'Galerie' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              <span className="brand-eyebrow">Verein für Deutsche Schäferhunde (SV) e.V.</span>
              <span className="brand-name">Ortsgruppe Rheine</span>
            </Link>
            <nav className="site-nav" aria-label="Hauptnavigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <p className="footer-title">SV OG Rheine</p>
              <p>
                Verein für Deutsche Schäferhunde (SV) e.V.
                <br />
                Ortsgruppe Rheine
                <br />
                Am Moosgraben, 48429 Rheine
              </p>
            </div>
            <nav className="footer-nav" aria-label="Rechtliches">
              <Link href="/impressum/">Impressum</Link>
              <Link href="/datenschutz/">Datenschutzerklärung</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
