import type { Metadata } from 'next';
import { getBericht, getBerichtSlugs } from '@/lib/content';

export function generateStaticParams() {
  return getBerichtSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bericht = getBericht(slug);
  return {
    title: bericht.title,
    description: bericht.teaser,
  };
}

export default async function BerichtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bericht = getBericht(slug);

  return (
    <article>
      <header className="seite-kopf">
        <div className="container">
          <p className="datum">{bericht.dateFormatted}</p>
          <h1>{bericht.title}</h1>
        </div>
      </header>
      <div className="inhalt container">
        <div className="prose" dangerouslySetInnerHTML={{ __html: bericht.html }} />
      </div>
    </article>
  );
}
