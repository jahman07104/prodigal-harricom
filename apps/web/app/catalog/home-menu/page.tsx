import type { Metadata } from "next";

import { PreviewLayout } from "../PreviewLayout";

export const metadata: Metadata = {
  title: "Home business menu",
  description:
    "Clear service-and-price menu for Jamaican home businesses — bakers, makers, and small-batch sellers. Orders on WhatsApp.",
};

export default function HomeMenuTemplate() {
  return (
    <PreviewLayout
      navLabel="Home business menu"
      strip="Template preview · Demo menu · Customize in 7 days · You own it"
      title="Home business menu"
      subtitle="Clear, simple, professional — a WhatsApp menu for Jamaican home businesses. Swap in your products and prices."
      bookMessage="I want the Home Business Menu AI site"
      templateSlug="home-business"
      heroSrc="/catalog/homemenu-hero.jpg"
      heroAlt="Home business maker with products"
      servicesTitle="Menu"
      services={[
        {
          title: "Body oil 30ml",
          text: "Small-batch oil, bottled at the house.",
          price: "J$1,200",
        },
        {
          title: "Soap bar",
          text: "Handmade bars, wrapped for gifting.",
          price: "J$800",
        },
        {
          title: "Gift set",
          text: "Oil, soap, and a wrapped box.",
          price: "J$3,500",
        },
        {
          title: "Weekend tray",
          text: "Ready Saturday morning. Pickup or drop.",
          price: "From J$3,000",
        },
        {
          title: "Local delivery",
          text: "Kingston and St. Andrew drops.",
          price: "From J$500",
        },
        {
          title: "Custom orders",
          text: "Tell us what you need on WhatsApp.",
          price: "Quote on WhatsApp",
        },
      ]}
      gallery={[
        { src: "/catalog/homemenu1.jpg", alt: "Home business counter" },
        { src: "/catalog/homemenu2.jpg", alt: "Craft and product display" },
        { src: "/catalog/homemenu3.jpg", alt: "Maker at work" },
      ]}
      ctaText="This is the master menu layout for home businesses. We swap in your items, prices, and photos. Customize in 7 days. You own it."
    />
  );
}
