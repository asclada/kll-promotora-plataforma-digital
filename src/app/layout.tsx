import type { Metadata, Viewport } from "next";
import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DIRECTION_CONTRACT } from "@/lib/contract";
import { financialServiceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

/* Archivo: a signage-and-forms grotesque with a width axis. The expanded width
   gives the display voice its stamped, pressed-into-paper weight.
   Self-hosted rather than pulled from Google: shipping both axes costs 90 KB on
   the critical path, so the file below is instanced at wdth=125 and subsetted
   to the characters Portuguese actually uses. Weight stays variable (100-900).
   Result: 28 KB, the expanded voice intact. Licence in src/fonts/Archivo-OFL.txt.
   Regenerate with:
     python -m fontTools.varLib.instancer Archivo[wdth,wght].ttf wdth=125 -o exp.ttf
     python -m fontTools.subset exp.ttf --flavor=woff2 --unicodes=U+0000-00FF,... */
const archivo = localFont({
  src: "../fonts/archivo-expanded-var.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* Libre Franklin: Franklin Gothic revival. Tall x-height and open apertures,
   which is what a 68-year-old reading a benefit statement actually needs. */
const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-franklin",
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
    <html lang="pt-BR" className={`${archivo.variable} ${franklin.variable}`}>
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
