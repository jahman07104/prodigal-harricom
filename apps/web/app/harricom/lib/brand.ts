export const WHATSAPP_E164 = "18763892243";

export const PORTFOLIO_HREF =
  "https://dev-personal-project-c7pq8kik4-jahman07104-6646s-projects.vercel.app";

export const STUDIO_HREF = "/harricom";
export const STUDIO_ORIGIN = "https://prodigal-harricom.vercel.app/harricom";

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
  umbrella: "The Prodigal",
} as const;
