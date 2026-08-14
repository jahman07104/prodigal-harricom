import { whatsappHref } from "../harricom/lib/brand";

export type CatalogTemplate = {
  slug: string;
  name: string;
  text: string;
  image: string;
  href?: string;
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
    href: "/catalog/barber",
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
    image: "/catalog/hairdresser-thumb.png",
    href: "/catalog/hairdresser",
    whatsapp: "I want the Hairdresser AI site",
  },
  {
    slug: "nailtech",
    name: "Nail tech",
    text: "Acrylics, gel, nail art, and pedicures. WhatsApp booking for nail studios.",
    image: "/catalog/nailtech-thumb.png",
    href: "/catalog/nailtech",
    whatsapp: "I want the Nail Tech AI site",
  },
  {
    slug: "makeup",
    name: "Makeup artist",
    text: "Soft glam, bridal, and photoshoot looks. WhatsApp booking for MUAs.",
    image: "/catalog/makeup-thumb.jpg",
    href: "/catalog/makeup",
    whatsapp: "I want the Makeup Artist AI site",
  },
  {
    slug: "massage",
    name: "Massage therapist",
    text: "Swedish, deep tissue, and home visits. Clients book a time on WhatsApp.",
    image: "/catalog/massage-thumb.jpg",
    href: "/catalog/massage",
    whatsapp: "I want the Massage Therapist AI site",
  },
  {
    slug: "home-business",
    name: "Home business",
    text: "Packages, a price menu, and WhatsApp orders for crafters, kitchens, and small home shops.",
    image: "/catalog/homepricing-thumb.png",
    href: "/catalog/home-pricing",
    whatsapp: "I want the Home Business AI site",
  },
  {
    slug: "tradesman",
    name: "Industrial / technician",
    text: "Electricians, block factories, plumbers, masons, contractors. Lead capture that actually answers.",
    image: "/catalog/industrial-thumb.png",
    href: "/catalog/industrial",
    whatsapp: "I want the Tradesman AI site",
  },
  {
    slug: "tour-operator",
    name: "Tour operator",
    text: "Airport runs, island tours, and private transport. WhatsApp booking for visitors and locals.",
    image: "/catalog/tour-operator-thumb.jpg",
    whatsapp: "I want the Tour Operator AI site",
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
    image: "/catalog/dressmaker-thumb.jpg",
    href: "/catalog/dressmaker",
    whatsapp: "I want the Dressmaker AI site",
  },
  {
    slug: "trainer",
    name: "Personal trainer",
    text: "Session packs and outdoor or gym coaching. Booked on WhatsApp.",
    image: "/catalog/trainer-thumb.jpg",
    href: "/catalog/trainer",
    whatsapp: "I want the Personal Trainer AI site",
  },
  {
    slug: "photographer",
    name: "Photographer",
    text: "Portfolio plus WhatsApp quotes for portraits, grads, and events.",
    image: "/catalog/photographer-thumb.jpg",
    href: "/catalog/photographer",
    whatsapp: "I want the Photographer AI site",
  },
  {
    slug: "event-planner",
    name: "Event planner",
    text: "Birthdays, weddings, and day-of coordination. Clients WhatsApp the date.",
    image: "/catalog/event-thumb.jpg",
    href: "/catalog/event-planner",
    whatsapp: "I want the Event Planner AI site",
  },
];

export function templateWhatsAppHref(template: CatalogTemplate) {
  return whatsappHref(template.whatsapp);
}
