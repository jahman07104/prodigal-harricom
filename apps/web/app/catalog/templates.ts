import { whatsappHref } from "../harricom/lib/brand";

export type CatalogTemplate = {
  slug: string;
  name: string;
  text: string;
  image: string;
  featured?: boolean;
  badge?: string;
  whatsapp: string;
};

export const catalogTemplates: CatalogTemplate[] = [
  {
    slug: "barber",
    name: "Barber shop",
    text: "WhatsApp booking AI. Customer books at 10pm. You wake up with appointments.",
    image: "/catalog/barber-thumb.png",
    featured: true,
    badge: "#1 closes fastest",
    whatsapp: "I want the Barber AI site",
  },
  {
    slug: "cook-shop",
    name: "Cook shop",
    text: "Lunch rush via WhatsApp. Kitchen tickets. No more phone chaos.",
    image: "/catalog/cook-shop.jpg",
    featured: true,
    badge: "#2 lunch rush",
    whatsapp: "I want the Cook Shop AI site",
  },
  {
    slug: "guest-house",
    name: "Guest house",
    text: "Tourists book on WhatsApp, pay a deposit online. Built for Jamaica tourism.",
    image: "/catalog/guest-house.jpg",
    featured: true,
    badge: "#3 tourist dollars",
    whatsapp: "I want the Guest House AI site",
  },
  {
    slug: "beauty",
    name: "Hairdresser / beauty",
    text: "Service menu, gallery, and WhatsApp booking for salons and stylists.",
    image: "/catalog/beauty-thumb.png",
    whatsapp: "I want the Hairdresser AI site",
  },
  {
    slug: "home-business",
    name: "Home business",
    text: "For bakers, crafters, tutors, and small home enterprises.",
    image: "/catalog/homebiz-thumb.png",
    whatsapp: "I want the Home Business AI site",
  },
  {
    slug: "tradesman",
    name: "Tradesman / industrial",
    text: "Plumbers, masons, electricians, contractors. Lead capture that actually answers.",
    image: "/catalog/industrial-thumb.png",
    whatsapp: "I want the Tradesman AI site",
  },
  {
    slug: "taxi",
    name: "Taxi service",
    text: "WhatsApp booking for airport runs, city rides, and tours.",
    image: "/catalog/taxi.jpg",
    whatsapp: "I want the Taxi AI site",
  },
  {
    slug: "construction",
    name: "Construction",
    text: "Project showcases and lead capture for builders and crews.",
    image: "/catalog/construction.jpg",
    whatsapp: "I want the Construction AI site",
  },
  {
    slug: "dressmaker",
    name: "Dressmaker",
    text: "Lookbook and WhatsApp orders for custom garments.",
    image: "/catalog/dressmaker.jpg",
    whatsapp: "I want the Dressmaker AI site",
  },
];

export function templateWhatsAppHref(template: CatalogTemplate) {
  return whatsappHref(template.whatsapp);
}
