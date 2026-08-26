import type { Metadata, Viewport } from "next";
import { Public_Sans, PT_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DIRECTION_CONTRACT } from "@/lib/contract";
import { financialServiceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

/* PT Serif: carries the display voice. A serif built for print-like official
   documents (it's PT Sans's serif companion, designed for government and
   institutional typesetting), which fits the "stamped document" world better
   than a display grotesque. */
const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

/* Public Sans: the US federal government's own forms typeface (USWDS). Tall
   x-height, open apertures, built for accessibility — what a 68-year-old
   reading a benefit statement actually needs — and it reinforces the
   "official, authorised correspondent" story in the body copy itself. */
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Crédito Consignado em Natal RN | KLL Promotora",
    template: "%s | KLL Promotora",
  },
  description:
    "Correspondente bancário em Natal/RN há mais de 20 anos. Crédito consignado para CLT, servidores, INSS e militares a partir de 1,20% a.m. Simule agora pelo WhatsApp.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    url: site.url,
    title: "Crédito Consignado em Natal RN | KLL Promotora",
    description:
      "Correspondente bancário autorizado em Natal/RN. Crédito consignado, portabilidade e cartão consignado a partir de 1,20% a.m.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/kll-selo.png", apple: "/kll-selo.png" },
};

export const viewport: Viewport = {
  themeColor: "#301a86",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${ptSerif.variable} ${publicSans.variable}`}>
      <body className="flex min-h-dvh flex-col bg-paper text-ink antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a
          href="#conteudo"
          className="sr-only rounded-mark focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:bg-indigo focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(financialServiceJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
