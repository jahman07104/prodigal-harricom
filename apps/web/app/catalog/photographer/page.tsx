import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Photographer template",
  description:
    "HarriCom template for Jamaican photographers. Portraits, events, and graduation coverage booked on WhatsApp.",
};

export default function PhotographerTemplate() {
  return (
    <PreviewLayout
      navLabel="Photographer template"
      strip="Template preview · Demo portfolio · Customize in 7 days · You own it"
      title="Photographer template"
      subtitle="A lookbook plus WhatsApp quotes. Portraits, graduations, and events — clients see the work, then book."
      bookMessage="I want the Photographer AI site"
      templateSlug="photographer"
      heroSrc="/catalog/photographer-hero.jpg"
      heroAlt="Photographer on a shoot"
      galleryTitle="Portfolio"
      services={[
        {
          title: "Portrait hour",
          text: "One location, edited selects.",
          price: "From J$15,000",
        },
        {
          title: "Graduation",
          text: "Campus or home, family shots included.",
          price: "From J$12,000",
        },
        {
          title: "Event coverage",
          text: "Birthdays, church, and small weddings.",
          price: "From J$35,000",
        },
        {
          title: "Custom shoot",
          text: "Tell us the brief on WhatsApp.",
          price: "Free quote",
        },
      ]}
      gallery={[
        { src: "/catalog/photo1.jpg", alt: "Portfolio shot 1" },
        { src: "/catalog/photo2.jpg", alt: "Portfolio shot 2" },
        { src: "/catalog/photo3.jpg", alt: "Portfolio shot 3" },
      ]}
      ctaText="This is the master layout for photographers. WhatsApp us with the name, packages, and a few shots. We customize in 7 days. You own it."
    />
  );
}
