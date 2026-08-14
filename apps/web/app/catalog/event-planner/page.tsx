import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Event planner template",
  description:
    "HarriCom template for Jamaican event planners. Birthdays, weddings, and day-of coordination booked on WhatsApp.",
};

export default function EventPlannerTemplate() {
  return (
    <PreviewLayout
      navLabel="Event planner template"
      strip="Template preview · Not a live planner · Customize in 7 days · You own it"
      title="Event planner template"
      subtitle="Birthdays, weddings, and day-of coordination. Clients see packages, then WhatsApp the date."
      bookMessage="I want the Event Planner AI site"
      templateSlug="event-planner"
      heroSrc="/catalog/event-hero.jpg"
      heroAlt="Event hosts welcoming guests"
      services={[
        {
          title: "Birthday styling",
          text: "Decor, layout, and vendor list.",
          price: "From J$15,000",
        },
        {
          title: "Day-of coordination",
          text: "We run the timeline so you can be in it.",
          price: "From J$20,000",
        },
        {
          title: "Corporate",
          text: "Launches, staff days, and dinners.",
          price: "From J$35,000",
        },
        {
          title: "Wedding planning",
          text: "Full planning or month-of support.",
          price: "Custom quote",
        },
      ]}
      galleryTitle="Recent events"
      gallery={[
        { src: "/catalog/event1.jpg", alt: "Event styling 1" },
        { src: "/catalog/event2.jpg", alt: "Event styling 2" },
        { src: "/catalog/event3.jpg", alt: "Event styling 3" },
      ]}
      ctaText="This is the master layout for event planners. WhatsApp us with the business name, packages, and photos. We customize in 7 days. You own it."
    />
  );
}
