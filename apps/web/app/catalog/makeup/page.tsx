import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Makeup artist template",
  description:
    "HarriCom template for Jamaican makeup artists. Soft glam, bridal, and photoshoot looks booked on WhatsApp.",
};

export default function MakeupTemplate() {
  return (
    <PreviewLayout
      navLabel="Makeup artist template"
      strip="Template preview · Not a live studio · Customize in 7 days · You own it"
      title="Makeup artist template"
      subtitle="Soft glam to bridal. Looks that last through the heat — booked on WhatsApp, with a gallery of your work."
      bookMessage="I want the Makeup Artist AI site"
      templateSlug="makeup"
      heroSrc="/catalog/makeup-hero.jpg"
      heroAlt="Makeup artist applying a look"
      services={[
        {
          title: "Soft glam",
          text: "Everyday polish for work, church, and dates.",
          price: "J$4,500",
        },
        {
          title: "Full glam",
          text: "Night-out and photoshoot ready.",
          price: "J$6,500",
        },
        {
          title: "Bridal",
          text: "Trial plus wedding-day makeup.",
          price: "From J$12,000",
        },
        {
          title: "Photoshoot",
          text: "Camera-ready looks for studio or outdoor.",
          price: "From J$8,000",
        },
      ]}
      gallery={[
        { src: "/catalog/makeup1.jpg", alt: "Makeup look 1" },
        { src: "/catalog/makeup2.jpg", alt: "Makeup look 2" },
        { src: "/catalog/makeup3.jpg", alt: "Makeup look 3" },
      ]}
      ctaText="This is the master layout for makeup artists. WhatsApp us with the artist name, menu, and photos. We customize in 7 days. You own it."
    />
  );
}
