import type { Metadata } from 'next';
import SeitenAnsicht from '@/components/SeitenAnsicht';

export const metadata: Metadata = { title: 'Datenschutzerklärung' };

export default function DatenschutzPage() {
  return <SeitenAnsicht name="datenschutz" />;
}
