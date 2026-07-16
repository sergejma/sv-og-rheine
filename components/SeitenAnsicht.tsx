import { getSeite } from '@/lib/content';

export default function SeitenAnsicht({
  name,
  personen = false,
}: {
  name: string;
  personen?: boolean;
}) {
  const seite = getSeite(name);
  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <h1>{seite.title}</h1>
        </div>
      </header>
      <div className="inhalt container">
        <div
          className={personen ? 'prose prose--personen' : 'prose'}
          dangerouslySetInnerHTML={{ __html: seite.html }}
        />
      </div>
    </article>
  );
}
