export type LiveDemo = {
  slug: string;
  name: string;
  trade: string;
  text: string;
  image: string;
  src: string;
  template: string;
};

export const liveDemos: LiveDemo[] = [
  {
    slug: "boss",
    name: "Boss Installations",
    trade: "Security / technician",
    text: "Working company site. Services, quote form, shop. Tap through like a customer.",
    image: "/catalog/boss-thumb.png",
    src: "https://code-companion-jahman07104.replit.app/",
    template: "/catalog/industrial",
  },
  {
    slug: "tmt",
    name: "TMT Jamaica",
    trade: "Blocks / paving",
    text: "Paving and block factory site. See how a trades crew presents the work.",
    image: "/catalog/tmt-thumb.jpg",
    src: "https://code-companion-jahman07104.replit.app/tmt-jamaica/",
    template: "/catalog/industrial",
  },
  {
    slug: "normans",
    name: "Norman's Kitchen",
    trade: "Cook shop",
    text: "Jamaican menu, prices, checkout. This is the live cookshop app, not a mockup.",
    image: "/catalog/normans-thumb.jpg",
    src: "https://normans-kitchen.vercel.app/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "yellow",
    name: "Yellow App",
    trade: "Marketplace",
    text: "A working shop customers can browse. Products, collections, and cart.",
    image: "/catalog/yellow-thumb.jpg",
    src: "/work/yellowapp/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "ganja-gourmet",
    name: "Ganja Gourmet",
    trade: "Shop / menu",
    text: "A working catalog customers can browse. Tap through the products.",
    image: "/catalog/ganjagourmet-thumb.jpg",
    src: "https://ganja-gourmet.replit.app/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "exquisite",
    name: "Exquisite Roots Craft",
    trade: "Home business",
    text: "Custom wood kitchens and furniture. Full working site with gallery.",
    image: "/catalog/exquisite-thumb.jpg",
    src: "https://exquisite-roots-craft.lovable.app/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "greenwood",
    name: "Greenwood Community",
    trade: "Community hub",
    text: "A live community site. News, events, and a local directory.",
    image: "/catalog/community-thumb.jpg",
    src: "https://greenwood-community-hub.replit.app/",
    template: "/catalog/home-pricing",
  },
];

export function getLiveDemo(slug: string) {
  return liveDemos.find((demo) => demo.slug === slug);
}
