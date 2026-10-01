import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Achche Lal Gautam | District Court Lawyer | Unnao',
  description:
    'Advocate Achche Lal Gautam — District Court Lawyer in Unnao, Uttar Pradesh. Expert legal assistance in criminal law, land & property, matrimonial, and civil disputes.',
  keywords: [
    'Achche Lal Gautam',
    'District Court Lawyer Unnao',
    'Advocate Unnao',
    'Criminal Lawyer Unnao',
    'Land Property Lawyer UP',
    'Legal consultation Unnao',
  ],
  openGraph: {
    title: 'Achche Lal Gautam | District Court Lawyer | Unnao',
    description: 'Expert legal assistance in criminal, land, matrimonial and civil matters at Unnao District Court.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
