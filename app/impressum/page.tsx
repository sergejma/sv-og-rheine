import type { Metadata } from 'next';
import SeitenAnsicht from '@/components/SeitenAnsicht';

export const metadata: Metadata = { title: 'Impressum' };

export default function ImpressumPage() {
  return <SeitenAnsicht name="impressum" />;
}
