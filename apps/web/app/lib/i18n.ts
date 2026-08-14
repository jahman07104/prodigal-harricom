export type Locale = "en" | "de";

export const LOCALE_COOKIE = "locale";

export function parseLocale(value?: string | null): Locale {
  return value === "de" ? "de" : "en";
}

export const en = {
  skip: "Skip to content",
  strip: "Customize in 7 days · You own it · From J$35,000",
  nav: {
    how: "How it works",
    live: "Live shops",
    templates: "Templates",
    prodigal: "The Prodigal Program",
    start: "Start a build",
    whatsapp: "WhatsApp",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    studio: "Web Studio",
    home: "Home",
    insights: "Insights",
    community: "Community",
    consult: "Consultation",
    studioLong: "HarriCom Web Studio",
  },
  hero: {
    kicker: "HarriCom Web Studio",
    title: "Your shop answers WhatsApp at 10pm.",
    audience:
      "Barbers, cook shops, guest houses — anywhere in Jamaica. We customize in 7 days. You own it.",
    start: "Start a build",
    templates: "See templates",
    subtext: "From J$35,000 · No monthly Wix fees",
    quiet: "Patrick Harrison · 32 years Verizon field tech, now building in Jamaica.",
  },
  how: {
    title: "How you get 3 more customers a week",
    steps: [
      {
        n: "1",
        title: "They message after hours",
        body: "“How much for a cut Saturday?” at 9pm. You’re closed.",
        label: "Old way: lost",
      },
      {
        n: "2",
        title: "AI answers in 3 seconds",
        body: "Price, times, and a YES to book — in your voice.",
        label: "New way: booked",
      },
      {
        n: "3",
        title: "You wake up paid",
        body: "Appointment on the list. No extra work.",
        label: "J$9k–15k extra / week",
      },
    ],
  },
  tiers: {
    title: "What it costs",
    lead: "One price. You own the site. No monthly Wix fee.",
    most: "Most shops",
    items: [
      {
        name: "Starter",
        body: "A live template on your domain. Menu, gallery, WhatsApp button.",
        price: "J$35,000–50,000",
        meta: "7 days · You own it",
        href: "#templates",
        cta: "View templates",
        featured: false,
      },
      {
        name: "Professional",
        body: "The template plus WhatsApp AI that answers in your voice.",
        price: "J$75,000–100,000",
        meta: "2 weeks · + J$8,000/mo AI",
        href: "#templates",
        cta: "See templates",
        featured: true,
      },
      {
        name: "Custom",
        body: "Payments, kitchen tickets, dashboards — built for the shop.",
        price: "J$150,000–250,000",
        meta: "3–4 weeks",
        href: "/harricom/start",
        cta: "Start a build",
        featured: false,
      },
    ],
  },
  live: {
    title: "See a real site",
    lead: "These are working shops, not mockups. Open one. Tap through. That is what your customers get.",
    open: "Open the site",
    demo: "Open the demo",
    template: "View template",
    blurbs: {
      boss: "Working company site. Services, quote form, shop. Tap through like a customer.",
      tmt: "Paving and block factory site. See how a trades crew presents the work.",
      normans: "Jamaican menu, prices, checkout. This is the live cookshop app, not a mockup.",
      yellow:
        "Demo of an online shop — products, collections, and cart. Example only, not a live customer store.",
      "ganja-gourmet": "A working catalog customers can browse. Tap through the products.",
      exquisite: "Custom wood kitchens and furniture. Full working site with gallery.",
      greenwood: "A live community site. News, events, and a local directory.",
    } as Record<string, string>,
  },
  templates: {
    title: "3 templates that close this week",
    lead: "Pick one. We customize in 7 days. You own it.",
    view: "View template",
    start: "Start a build",
    more: "See all templates →",
    items: [
      {
        slug: "barber",
        tag: "#1 closes fastest",
        name: "Barber shop",
        desc: "Customer books at 10pm. You wake up with appointments.",
      },
      {
        slug: "cook-shop",
        tag: "#2 lunch rush",
        name: "Cook shop",
        desc: "Lunch rush on WhatsApp. Kitchen tickets. No phone chaos.",
      },
      {
        slug: "guest-house",
        tag: "#3 tourist dollars",
        name: "Guest house",
        desc: "Tourists book on WhatsApp and pay a deposit online.",
      },
    ],
  },
  launch: {
    title: "Ready to launch in 7 days?",
    body: "Tell us the name, parish, and what you need. We pick it up on WhatsApp.",
    browse: "Browse templates",
    start: "Start a build",
  },
  footer: "HarriCom · a studio of",
  start: {
    title: "Start a build",
    description:
      "Tell HarriCom your name, parish, and what you need. We open WhatsApp with that already filled in.",
    lead: "Tell us who you are and what you need. Send opens WhatsApp with that already written, so we are not guessing.",
    name: "Your name",
    business: "Business name",
    parish: "Parish",
    parishSelect: "Select parish",
    diaspora: "Not in Jamaica / diaspora",
    template: "Template",
    unsure: "Not sure yet",
    need: "What do you need?",
    placeholder: "Photos, menu, hours, anything we should know",
    submit: "Send on WhatsApp",
    note: "This opens WhatsApp with your details already filled in. We reply there. No account. No form sitting in a database.",
    waIntro: "Hi HarriCom, I want a site.",
    waName: "Name",
    waBusiness: "Business",
    waParish: "Parish",
    waTemplate: "Template",
    waRequest: "Request",
  },
  wa: {
    chat: "Hi HarriCom, I want the AI WhatsApp site",
    consult:
      "Hi HarriCom, I'm interested in The Prodigal Program for returning residents.",
    community: "Hi HarriCom, I want to join The Prodigal community",
  },
  prodigal: {
    badge: "Returning Resident & Diaspora Reintegration Program",
    parent: "HarriCom · Harrison Communications",
    quote:
      "I came back to Jamaica to build a life here — not just as a returning resident, but as an entrepreneur. Now I help fellow diaspora members do the same: navigate RR concessions, launch businesses, and retire into purpose.",
    byline: "— Patrick Harrison, Founder · HarriCom Web Studio",
    join: "Join Community",
    intro:
      "HarriCom builds websites for Jamaican businesses. The Prodigal Program is the consultancy arm — built from my own return journey — helping diaspora professionals turn overseas experience into local opportunity.",
    monetizeTitle: "Monetize Skills",
    monetize:
      "Export international SOPs to Jamaican growth sectors — agribusiness, KPO, fintech, and the web studio economy I built with HarriCom.",
    riskTitle: "Risk Mitigation",
    risk: "Navigate Customs, RR concessions, Land Titles, and TAJ with guidance from someone who has filed the paperwork and built here.",
    peerTitle: "Peer Network",
    peer: "Connect with returning residents and diaspora entrepreneurs sharing real leads, vendors, and lessons from the ground in Jamaica.",
    greenTitle: "Your expertise is Jamaica's competitive advantage.",
    rrTitle: "Maximize RR Concessions",
    rr: "Bring in your professional tools of trade duty-free — vehicles, equipment, and household effects — with a clear plan before you land.",
    buildTitle: "Build & Launch in Jamaica",
    build: "From your first business website with HarriCom to full consultancy support — we help you go from arrival to income.",
    story: "Read my reintegration story →",
    footerText:
      "A Harrison Communications initiative helping returning residents and diaspora professionals reintegrate, build businesses, and thrive in Jamaica.",
    float: "Chat with HarriCom on WhatsApp",
    homeAria: "HarriCom The Prodigal Program home",
  },
  shopCta: "I want this for my shop",
  insights: {
    title: "Insights",
    heading: "Market Insights",
    description:
      "Real guidance from a returning resident who built HarriCom on the ground in Jamaica — plus the sectors where diaspora expertise converts fastest.",
    founderTitle: "Founder Story",
    founderIntro: "The Prodigal Program exists because I lived this journey.",
    founderRole: "Returning Resident · Founder, HarriCom",
    quote:
      "“I left Jamaica, built a career abroad, and made the decision to come home for good. The paperwork was one thing — Customs, Land Titles, TAJ — but the real work was figuring out how to earn here with skills I developed overseas. I started HarriCom to give Jamaican MSMEs professional websites, and launched The Prodigal Program so no returnee has to figure it out alone.”",
    chip: "HarriCom Web Studio · The Prodigal Program",
    pathsTitle: "Paths We Guide",
    paths: [
      {
        name: "Encore Entrepreneurship",
        role: "Consulting & Professional Services",
        story:
          "Many returnees don't want retirement — they want a second act. Exporting international SOPs into Jamaica's growing KPO, fintech, and professional services sectors is a proven path we guide you through.",
        impact: "Business setup + HarriCom web presence",
      },
      {
        name: "Property & Relocation",
        role: "Returning Resident Concessions",
        story:
          "RR status unlocks duty-free imports on tools of trade, vehicles, and household effects — but timing and documentation matter. We help you plan before you ship, not after you're stuck at the port.",
        impact: "Customs · JCA · vendor network",
      },
      {
        name: "Agribusiness & Local Industry",
        role: "Hands-on Enterprise",
        story:
          "Jamaica's agribusiness and food-tech sectors are growing fast. Returnees with operations, logistics, or tech backgrounds are well placed — if you understand local supply chains and MSME realities.",
        impact: "Sector mapping + local partnerships",
      },
    ],
  },
  community: {
    title: "Community",
    heading: "Peer Network",
    description:
      "Connect with returning residents and diaspora entrepreneurs sharing real leads, vendors, and lessons from the ground in Jamaica.",
    intro:
      "The Prodigal community is WhatsApp-first. Tell us who you are and where you are in the journey home — we add you to the group.",
    join: "Join Community",
  },
  catalog: {
    brand: "The Prodigal",
    navLabel: "Catalog",
    kicker: "HarriCom Web Studio",
    title: "Business templates catalog",
    subtitle:
      "Ready-made MSME starter sites for Jamaican entrepreneurs. The three that close fastest are pinned first. We customize in 7 days. You own it.",
    view: "View template",
    start: "Start a build",
    all: "All templates",
    launchWa: "Hi HarriCom, I want to launch a template",
    footer: "The Prodigal Program",
  },
  preview: {
    catalog: "Catalog",
    ready: "Ready to use this template?",
    all: "See all templates",
    services: "Services",
    gallery: "Gallery",
  },
  demo: {
    back: "← Back to HarriCom",
    note: "Demo site · not a live customer shop",
  },
  lang: {
    label: "Language",
    en: "EN",
    de: "DE",
  },
};

export const de: typeof en = {
  skip: "Zum Inhalt",
  strip: "In 7 Tagen fertig · Die Seite gehört dir · Ab J$35.000",
  nav: {
    how: "So geht’s",
    live: "Live-Shops",
    templates: "Vorlagen",
    prodigal: "The Prodigal Program",
    start: "Auftrag starten",
    whatsapp: "WhatsApp",
    menu: "Menü",
    close: "Schließen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    studio: "Web Studio",
    home: "Start",
    insights: "Einblicke",
    community: "Community",
    consult: "Beratung",
    studioLong: "HarriCom Web Studio",
  },
  hero: {
    kicker: "HarriCom Web Studio",
    title: "Dein Laden antwortet um 22 Uhr auf WhatsApp.",
    audience:
      "Barbershops, Cook Shops, Guesthouses — überall in Jamaika. In 7 Tagen fertig. Die Seite gehört dir.",
    start: "Auftrag starten",
    templates: "Vorlagen ansehen",
    subtext: "Ab J$35.000 · Keine monatliche Wix-Gebühr",
    quiet:
      "Patrick Harrison · 32 Jahre Verizon-Feldtechnik, jetzt Aufbau in Jamaika.",
  },
  how: {
    title: "So holst du 3 Kunden mehr pro Woche",
    steps: [
      {
        n: "1",
        title: "Sie schreiben nach Feierabend",
        body: "„Was kostet ein Schnitt am Samstag?“ um 21 Uhr. Du hast zu.",
        label: "Bisher: verloren",
      },
      {
        n: "2",
        title: "KI antwortet in 3 Sekunden",
        body: "Preis, Termine und ein JA zum Buchen — in deiner Stimme.",
        label: "Jetzt: gebucht",
      },
      {
        n: "3",
        title: "Du wachst mit Umsatz auf",
        body: "Termin steht. Keine Extra-Arbeit.",
        label: "J$9k–15k extra / Woche",
      },
    ],
  },
  tiers: {
    title: "Was es kostet",
    lead: "Ein Preis. Die Seite gehört dir. Keine monatliche Wix-Gebühr.",
    most: "Die meisten Shops",
    items: [
      {
        name: "Starter",
        body: "Eine live Vorlage auf deiner Domain. Menü, Galerie, WhatsApp-Button.",
        price: "J$35.000–50.000",
        meta: "7 Tage · Dir gehört sie",
        href: "#templates",
        cta: "Vorlagen ansehen",
        featured: false,
      },
      {
        name: "Professional",
        body: "Die Vorlage plus WhatsApp-KI, die in deiner Stimme antwortet.",
        price: "J$75.000–100.000",
        meta: "2 Wochen · + J$8.000/Monat KI",
        href: "#templates",
        cta: "Vorlagen ansehen",
        featured: true,
      },
      {
        name: "Custom",
        body: "Zahlungen, Küchentickets, Dashboards — gebaut für den Laden.",
        price: "J$150.000–250.000",
        meta: "3–4 Wochen",
        href: "/harricom/start",
        cta: "Auftrag starten",
        featured: false,
      },
    ],
  },
  live: {
    title: "Eine echte Seite ansehen",
    lead: "Das sind laufende Shops, keine Mockups. Öffne eine. Tippe durch. So sehen es deine Kunden.",
    open: "Seite öffnen",
    demo: "Demo öffnen",
    template: "Vorlage ansehen",
    blurbs: {
      boss: "Laufende Firmenseite. Leistungen, Angebotsformular, Shop. Tippe durch wie ein Kunde.",
      tmt: "Pflaster- und Blockwerk. So präsentiert eine Crew die Arbeit.",
      normans: "Jamaikanisches Menü, Preise, Kasse. Die echte Cook-Shop-App, kein Mockup.",
      yellow:
        "Demo eines Online-Shops — Produkte, Kollektionen und Warenkorb. Nur Beispiel, kein echter Kundenladen.",
      "ganja-gourmet": "Ein laufender Katalog. Tippe durch die Produkte.",
      exquisite: "Maßküchen und Möbel aus Holz. Volle Seite mit Galerie.",
      greenwood: "Eine live Community-Seite. News, Termine und ein Ortsverzeichnis.",
    },
  },
  templates: {
    title: "3 Vorlagen, die diese Woche schließen",
    lead: "Eine wählen. In 7 Tagen fertig. Dir gehört sie.",
    view: "Vorlage ansehen",
    start: "Auftrag starten",
    more: "Alle Vorlagen →",
    items: [
      {
        slug: "barber",
        tag: "#1 schließt am schnellsten",
        name: "Barber shop",
        desc: "Kunde bucht um 22 Uhr. Du wachst mit Terminen auf.",
      },
      {
        slug: "cook-shop",
        tag: "#2 Mittagsrush",
        name: "Cook shop",
        desc: "Mittagsrush über WhatsApp. Küchentickets. Kein Telefonchaos.",
      },
      {
        slug: "guest-house",
        tag: "#3 Touristen-Dollar",
        name: "Guest house",
        desc: "Touristen buchen über WhatsApp und zahlen eine Anzahlung online.",
      },
    ],
  },
  launch: {
    title: "In 7 Tagen live?",
    body: "Name, Parish und was du brauchst. Wir holen es auf WhatsApp ab.",
    browse: "Vorlagen ansehen",
    start: "Auftrag starten",
  },
  footer: "HarriCom · ein Studio von",
  start: {
    title: "Auftrag starten",
    description:
      "Sag HarriCom deinen Namen, Parish und was du brauchst. WhatsApp öffnet sich mit dem Text schon drin.",
    lead: "Sag uns, wer du bist und was du brauchst. Senden öffnet WhatsApp mit dem Text schon drin — wir müssen nicht raten.",
    name: "Dein Name",
    business: "Geschäftsname",
    parish: "Parish",
    parishSelect: "Parish wählen",
    diaspora: "Nicht in Jamaika / Diaspora",
    template: "Vorlage",
    unsure: "Noch unsicher",
    need: "Was brauchst du?",
    placeholder: "Fotos, Menü, Öffnungszeiten, was wir wissen sollen",
    submit: "Per WhatsApp senden",
    note: "Das öffnet WhatsApp mit deinen Angaben schon ausgefüllt. Wir antworten dort. Kein Konto. Kein Formular in einer Datenbank.",
    waIntro: "Hallo HarriCom, ich möchte eine Website.",
    waName: "Name",
    waBusiness: "Geschäft",
    waParish: "Parish",
    waTemplate: "Vorlage",
    waRequest: "Anfrage",
  },
  wa: {
    chat: "Hallo HarriCom, ich möchte die KI-WhatsApp-Website",
    consult:
      "Hallo HarriCom, ich interessiere mich für The Prodigal Program für Rückkehrer.",
    community: "Hallo HarriCom, ich möchte der Prodigal-Community beitreten",
  },
  prodigal: {
    badge: "Programm für Rückkehrer und Diaspora-Reintegration",
    parent: "HarriCom · Harrison Communications",
    quote:
      "Ich bin nach Jamaika zurückgekehrt, um hier ein Leben aufzubauen — nicht nur als Rückkehrer, sondern als Unternehmer. Jetzt helfe ich anderen in der Diaspora dasselbe zu tun: RR-Vergünstigungen nutzen, Unternehmen starten und mit Sinn in den Ruhestand gehen.",
    byline: "— Patrick Harrison, Gründer · HarriCom Web Studio",
    join: "Community beitreten",
    intro:
      "HarriCom baut Websites für jamaikanische Betriebe. The Prodigal Program ist die Beratung — aus meiner eigenen Rückkehr — und hilft Diaspora-Profis, Auslandserfahrung in lokale Chance zu verwandeln.",
    monetizeTitle: "Fähigkeiten monetarisieren",
    monetize:
      "Internationale Abläufe in jamaikanische Wachstumsbranchen bringen — Agribusiness, KPO, Fintech und die Web-Studio-Wirtschaft, die ich mit HarriCom aufgebaut habe.",
    riskTitle: "Risiken senken",
    risk: "Zoll, RR-Vergünstigungen, Land Titles und TAJ — mit jemandem, der die Papiere selbst eingereicht und hier gebaut hat.",
    peerTitle: "Netzwerk",
    peer: "Austausch mit Rückkehrern und Diaspora-Unternehmern: echte Leads, Anbieter und Lektionen aus Jamaika.",
    greenTitle: "Deine Expertise ist Jamaikas Wettbewerbsvorteil.",
    rrTitle: "RR-Vergünstigungen nutzen",
    rr: "Berufsausrüstung zollfrei einführen — Fahrzeuge, Geräte, Hausrat — mit einem klaren Plan vor der Landung.",
    buildTitle: "In Jamaika aufbauen und starten",
    build: "Von der ersten Firmenwebsite mit HarriCom bis zur vollen Beratung — von der Ankunft zum Einkommen.",
    story: "Meine Reintegrationsgeschichte →",
    footerText:
      "Eine Initiative von Harrison Communications für Rückkehrer und Diaspora-Profis, die in Jamaika wieder ankommen, Unternehmen aufbauen und bestehen.",
    float: "Mit HarriCom auf WhatsApp schreiben",
    homeAria: "HarriCom The Prodigal Program Startseite",
  },
  shopCta: "Das will ich für meinen Laden",
  insights: {
    title: "Einblicke",
    heading: "Markt-Einblicke",
    description:
      "Echte Orientierung von einem Rückkehrer, der HarriCom vor Ort in Jamaika aufgebaut hat — plus die Branchen, in denen Diaspora-Expertise am schnellsten zählt.",
    founderTitle: "Gründergeschichte",
    founderIntro: "The Prodigal Program gibt es, weil ich diesen Weg selbst gegangen bin.",
    founderRole: "Rückkehrer · Gründer, HarriCom",
    quote:
      "„Ich habe Jamaika verlassen, im Ausland Karriere gemacht und mich entschieden, für immer heimzukommen. Die Papiere waren eine Sache — Zoll, Land Titles, TAJ — die eigentliche Arbeit war, hier mit Fähigkeiten zu verdienen, die ich draußen aufgebaut habe. Ich habe HarriCom gestartet, damit jamaikanische Kleinbetriebe professionelle Websites bekommen, und The Prodigal Program, damit kein Rückkehrer das allein rausfinden muss.“",
    chip: "HarriCom Web Studio · The Prodigal Program",
    pathsTitle: "Wege, die wir begleiten",
    paths: [
      {
        name: "Encore-Unternehmertum",
        role: "Beratung und professionelle Dienste",
        story:
          "Viele Rückkehrer wollen keinen Ruhestand — sie wollen einen zweiten Akt. Internationale Abläufe in Jamaikas wachsende KPO-, Fintech- und Dienstleistungsbranchen zu bringen, ist ein Weg, den wir mit dir gehen.",
        impact: "Firmengründung + HarriCom-Webpräsenz",
      },
      {
        name: "Immobilien und Umzug",
        role: "Returning-Resident-Vergünstigungen",
        story:
          "RR-Status öffnet zollfreie Einfuhr von Berufsausrüstung, Fahrzeugen und Hausrat — aber Timing und Papiere zählen. Wir planen vor dem Versand, nicht wenn du am Hafen feststeckst.",
        impact: "Zoll · JCA · Anbieternetz",
      },
      {
        name: "Agribusiness und lokale Industrie",
        role: "Praktisches Unternehmen",
        story:
          "Jamaikas Agribusiness und Food-Tech wachsen schnell. Rückkehrer mit Operations-, Logistik- oder Tech-Hintergrund sind gut aufgestellt — wenn sie lokale Lieferketten und MSME-Realität verstehen.",
        impact: "Branchenkarte + lokale Partnerschaften",
      },
    ],
  },
  community: {
    title: "Community",
    heading: "Peer-Netzwerk",
    description:
      "Austausch mit Rückkehrern und Diaspora-Unternehmern: echte Leads, Anbieter und Lektionen aus Jamaika.",
    intro:
      "Die Prodigal-Community läuft über WhatsApp. Sag uns, wer du bist und wo du auf dem Weg nach Hause stehst — wir nehmen dich in die Gruppe auf.",
    join: "Community beitreten",
  },
  catalog: {
    brand: "The Prodigal",
    navLabel: "Katalog",
    kicker: "HarriCom Web Studio",
    title: "Katalog der Geschäftsvorlagen",
    subtitle:
      "Fertige MSME-Startseiten für jamaikanische Unternehmer. Die drei, die am schnellsten schließen, stehen zuerst. In 7 Tagen fertig. Dir gehört sie.",
    view: "Vorlage ansehen",
    start: "Auftrag starten",
    all: "Alle Vorlagen",
    launchWa: "Hallo HarriCom, ich möchte eine Vorlage starten",
    footer: "The Prodigal Program",
  },
  preview: {
    catalog: "Katalog",
    ready: "Diese Vorlage nutzen?",
    all: "Alle Vorlagen ansehen",
    services: "Leistungen",
    gallery: "Galerie",
  },
  demo: {
    back: "← Zurück zu HarriCom",
    note: "Demo-Seite · kein echter Kundenladen",
  },
  lang: {
    label: "Sprache",
    en: "EN",
    de: "DE",
  },
};

export const dictionaries = { en, de };

export type Dictionary = typeof en;

export function getDictionary(locale?: string | null): Dictionary {
  const key = parseLocale(locale);
  if (key === "de" && de.insights?.heading && de.community?.heading) {
    return de;
  }
  return en;
}

export function readBrowserLocale(): Locale {
  if (typeof document === "undefined") {
    return "en";
  }
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  return parseLocale(match ? decodeURIComponent(match[1]) : null);
}

export function writeBrowserLocale(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}
