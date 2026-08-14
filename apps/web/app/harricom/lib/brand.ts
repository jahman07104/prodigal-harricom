export const WHATSAPP_E164 = "18763892243";

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function startHref(templateSlug?: string) {
  if (!templateSlug) {
    return "/harricom/start";
  }
  return `/harricom/start?template=${encodeURIComponent(templateSlug)}`;
}

export const brand = {
  name: "HarriCom",
  studio: "HarriCom Web Studio",
  umbrella: "The Prodigal Program",
} as const;
