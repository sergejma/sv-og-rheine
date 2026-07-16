import type { Metadata } from 'next';
import SeitenAnsicht from '@/components/SeitenAnsicht';

export const metadata: Metadata = { title: 'Vorstand' };

export default function VorstandPage() {
  return <SeitenAnsicht name="vorstand" personen />;
}
