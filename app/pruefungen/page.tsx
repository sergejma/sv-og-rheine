import type { Metadata } from 'next';
import SeitenAnsicht from '@/components/SeitenAnsicht';

export const metadata: Metadata = { title: 'Prüfungen' };

export default function PruefungenPage() {
  return <SeitenAnsicht name="pruefungen" />;
}
