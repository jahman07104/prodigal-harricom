import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Personal trainer template",
  description:
    "HarriCom template for Jamaican personal trainers. Session packs and outdoor or gym coaching booked on WhatsApp.",
};

export default function TrainerTemplate() {
  return (
    <PreviewLayout
      navLabel="Personal trainer template"
      strip="Template preview · Not a live gym · Customize in 7 days · You own it"
      title="Personal trainer template"
      subtitle="Session packs, outdoor or gym coaching, and a WhatsApp book that actually answers. Clients pick a pack and message you."
      bookMessage="I want the Personal Trainer AI site"
      templateSlug="trainer"
      heroSrc="/catalog/trainer-hero.jpg"
      heroAlt="Outdoor training session"
      services={[
        {
          title: "Single session",
          text: "One-on-one, gym or outdoor.",
          price: "J$3,500",
        },
        {
          title: "4-session pack",
          text: "A starter month. Use within 5 weeks.",
          price: "J$12,000",
        },
        {
          title: "8-session pack",
          text: "Best rate for people who show up.",
          price: "J$22,000",
        },
        {
          title: "Nutrition add-on",
          text: "Simple meal plan alongside training.",
          price: "From J$2,000",
        },
      ]}
      gallery={[
        { src: "/catalog/trainer1.jpg", alt: "Training setting 1" },
        { src: "/catalog/trainer2.jpg", alt: "Training setting 2" },
        { src: "/catalog/trainer3.jpg", alt: "Training setting 3" },
      ]}
      ctaText="This is the master layout for personal trainers. WhatsApp us with the trainer name, packs, and photos. We customize in 7 days. You own it."
    />
  );
}
