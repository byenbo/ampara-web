import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ampara — Cuando el banco no llega, llega Ampara',
  description:
    'Ampara es una plataforma de apoyo financiero entre personas. Pide apoyo, ofrece valor. Sin bancos, sin comisiones ocultas.',
  metadataBase: new URL('https://ampara.es'),
  openGraph: {
    title: 'Ampara — Apoyo financiero entre personas',
    description: 'Cuando el banco no llega, llega Ampara.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
