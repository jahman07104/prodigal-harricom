import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Massage therapist template",
  description:
    "HarriCom template for Jamaican massage therapists. Swedish, deep tissue, and home visits booked on WhatsApp.",
};

export default function MassageTemplate() {
  return (
    <PreviewLayout
      navLabel="Massage therapist template"
      strip="Template preview · Not a live spa · Customize in 7 days · You own it"
      title="Massage therapist template"
      subtitle="Calm, professional booking for Swedish, deep tissue, and home visits. Clients WhatsApp a time. You confirm."
      bookMessage="I want the Massage Therapist AI site"
      templateSlug="massage"
      heroSrc="/catalog/massage-hero.jpg"
      heroAlt="Massage therapist at work"
      services={[
        {
          title: "60 min Swedish",
          text: "Full-body relaxation session.",
          price: "J$6,000",
        },
        {
          title: "Deep tissue",
          text: "Focused work for tight shoulders and back.",
          price: "J$7,500",
        },
        {
          title: "Couples session",
          text: "Two tables, one booking.",
          price: "From J$12,000",
        },
        {
          title: "Home visit",
          text: "Travel extra for Kingston and St. Andrew.",
          price: "From J$1,500 extra",
        },
      ]}
      gallery={[
        { src: "/catalog/massage1.jpg", alt: "Treatment room" },
        { src: "/catalog/massage2.jpg", alt: "Garden wellness setting" },
        { src: "/catalog/massage3.jpg", alt: "Oils and products" },
      ]}
      ctaText="This is the master layout for massage therapists. WhatsApp us with the practice name, menu, and photos. We customize in 7 days. You own it."
    />
  );
}
