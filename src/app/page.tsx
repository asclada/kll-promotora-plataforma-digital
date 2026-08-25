import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PartnerBanks from "@/components/home/PartnerBanks";
import SegmentsPanel from "@/components/home/SegmentsPanel";
import WhyKll from "@/components/home/WhyKll";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Crédito Consignado em Natal RN",
  description:
    "Crédito consignado em Natal/RN para CLT, servidores públicos, INSS e militares. Taxas a partir de 1,20% ao mês, sem consulta ao SPC. Simule no WhatsApp.",
  alternates: { canonical: "/" },
};

/* Section order is fixed by the client's structural spec and is not open to
   rearrangement: hero, partner strip, segments, differentials, close. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerBanks />
      <SegmentsPanel />
      <WhyKll />
      <FinalCta />
    </>
  );
}
