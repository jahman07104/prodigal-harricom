export type LiveDemo = {
  slug: string;
  name: string;
  trade: string;
  text: string;
  image: string;
  src: string;
  template: string;
  note?: string;
  cta?: string;
};

export const liveDemos: LiveDemo[] = [
  {
    slug: "boss",
    name: "Boss Installations",
    trade: "Security / technician",
    text: "Working company site. Services, quote form, shop. Tap through like a customer.",
    image: "/catalog/boss-thumb.png",
    src: "/work/boss-installations/",
    template: "/catalog/industrial",
  },
  {
    slug: "tmt",
    name: "TMT Jamaica",
    trade: "Blocks / paving",
    text: "Paving and block factory site. See how a trades crew presents the work.",
    image: "/catalog/tmt-thumb.jpg",
    src: "/work/block-factory/",
    template: "/catalog/industrial",
  },
  {
    slug: "normans",
    name: "Norman's Kitchen",
    trade: "Cook shop",
    text: "Jamaican menu, prices, checkout. This is the live cookshop app, not a mockup.",
    image: "/catalog/normans-thumb.jpg",
    src: "/work/normans-kitchen/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "yellow",
    name: "Yellow App",
    trade: "E-commerce example",
    text: "Demo of an online shop — products, collections, and cart. Example only, not a live customer store.",
    image: "/catalog/yellow-thumb.jpg",
    src: "/work/yellowapp/",
    template: "/catalog/home-pricing",
    note: "E-commerce demo · example shop · not a live store",
    cta: "Open the demo",
  },
  {
    slug: "ganja-gourmet",
    name: "Ganja Gourmet",
    trade: "Shop / menu",
    text: "A working catalog customers can browse. Tap through the products.",
    image: "/catalog/ganjagourmet-thumb.jpg",
    src: "/work/ganja-gourmet/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "exquisite",
    name: "Exquisite Roots Craft",
    trade: "Home business",
    text: "Custom wood kitchens and furniture. Full working site with gallery.",
    image: "/catalog/exquisite-thumb.jpg",
    src: "/work/exquisite-roots-craft/",
    template: "/catalog/home-pricing",
  },
  {
    slug: "greenwood",
    name: "Greenwood Community",
    trade: "Community hub",
    text: "A live community site. News, events, and a local directory.",
    image: "/catalog/community-thumb.jpg",
    src: "/work/community-hub/",
    template: "/catalog/home-pricing",
  },
];

export function getLiveDemo(slug: string) {
  return liveDemos.find((demo) => demo.slug === slug);
}
