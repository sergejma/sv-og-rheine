import type { Metadata } from 'next';
import SeitenAnsicht from '@/components/SeitenAnsicht';

export const metadata: Metadata = { title: 'Mitglieder' };

export default function MitgliederPage() {
  return <SeitenAnsicht name="mitglieder" personen />;
}
