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
    prodigal: "The Prodigal",
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
      "Hi, I'm interested in The Prodigal — Jamaica opportunities from wherever I am in the world.",
    community: "Hi, I want to join The Prodigal community",
  },
  prodigal: {
    badge: "A Jamaica-connected platform",
    parent: "From wherever you are in the world",
    quote: "Your experience abroad is an asset. Put it to work in Jamaica.",
    lead:
      "Whether you're returning home, investing from overseas, building a business, managing property, using your skills, or simply looking for a practical way to reconnect with Jamaica, The Prodigal brings together useful resources, trusted connections, local knowledge, and real opportunities.",
    pillars:
      "Practical resources. Trusted connections. Local knowledge. Real opportunities.",
    byline: "— Patrick Harrison, Founder",
    explore: "Explore Jamaica Opportunities",
    join: "Join the Prodigal Community",
    intro:
      "The Prodigal is a Jamaica-connected platform for people around the world and at home who want to return, invest, build, work, manage property, use their skills, or create opportunity in Jamaica.",
    monetizeTitle: "Coming home is a journey",
    monetize:
      "You don't have to figure it all out alone. Understand practical steps, find useful resources, connect with local services and learn from people who have made the journey.",
    riskTitle: "Stay connected. Create opportunity",
    risk: "You don't have to live in Jamaica to contribute to Jamaica. Explore ways to invest, build, support local businesses, manage projects and create opportunities from wherever you are.",
    peerTitle: "Own property in Jamaica?",
    peer: "Managing property from overseas can be difficult. Finding reliable people for inspections, repairs, maintenance, or local support is often the hardest part. Prodigal is being built to help property owners connect with trusted local people and services.",
    greenTitle: "Your skills can create value in Jamaica.",
    rrTitle: "Business and skills",
    rr: "Whether you're an entrepreneur, professional, investor, or service provider, Prodigal is being built to connect skills and capability with real Jamaican opportunities.",
    buildTitle: "Jamaica can be more than your next destination",
    build:
      "Discover practical resources, local services, business opportunities and connections for building a life or working in Jamaica.",
    story: "Read the founder story →",
    footerText:
      "From wherever you are in the world, Jamaica can be more than a place you remember. It can be a place where you build. HarriCom Web Studio builds websites and digital systems for Jamaican businesses — related, not the whole story.",
    disclaimer:
      "Prodigal provides practical information, connections and resources. Where legal, tax, immigration, customs, property or other regulated advice is required, users should consult the appropriate qualified professional or official Jamaican authority.",
    float: "Chat with The Prodigal on WhatsApp",
    homeAria: "The Prodigal home",
    profile: "Patrick Harrison",
  },
  shopCta: "I want this for my shop",
  insights: {
    title: "Insights",
    heading: "Market Insights",
    description:
      "Practical resources, trusted connections and local knowledge for people around the world and in Jamaica — returning, investing, building, managing property, or reconnecting.",
    founderTitle: "Founder Story",
    founderIntro: "The Prodigal exists because I lived this journey — and I know it is not only a US story.",
    founderRole: "Founder · The Prodigal",
    quote:
      "“I left Jamaica, built a career abroad, and came home to build a life here. The hard part was turning overseas experience into action on the ground. I started The Prodigal so people around the world — and at home — have a practical, human layer between information and action. HarriCom Web Studio is how I help Jamaican businesses show up online.”",
    chip: "The Prodigal · HarriCom Web Studio",
    profile: "Full profile & CV →",
    back: "← Back to The Prodigal",
    pathsTitle: "Who it is for",
    paths: [
      {
        name: "Returning residents",
        role: "Coming home is a journey",
        story:
          "You don't have to figure it all out alone. Understand practical steps, find useful resources, connect with local services and learn from people who have made the journey.",
        impact: "Start your return journey",
      },
      {
        name: "Diaspora",
        role: "Stay connected. Create opportunity",
        story:
          "You don't have to live in Jamaica to contribute to Jamaica. Explore ways to invest, build, support local businesses, manage projects and create opportunities from wherever you are — not only from the United States.",
        impact: "Explore diaspora opportunities",
      },
      {
        name: "Property owners",
        role: "Manage it from wherever you are",
        story:
          "Managing property from overseas can be difficult. Finding reliable people for inspections, repairs, maintenance, or local support is often the hardest part. Prodigal is being built to help property owners connect with trusted local people and services.",
        impact: "Explore property services",
      },
    ],
  },
  community: {
    title: "Community",
    heading: "Join the Prodigal Community",
    description:
      "Trusted connections for people around the world and at home — returning, investing, building, working, or simply staying connected to Jamaica.",
    intro:
      "The Prodigal community is WhatsApp-first. Tell us who you are and where you are in the world. We bring people together to share practical leads, local knowledge, useful contacts, and real opportunities.",
    join: "Join the Prodigal Community",
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
    footer: "The Prodigal",
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
    prodigal: "The Prodigal",
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
      "Hallo, ich interessiere mich für The Prodigal — Chancen in Jamaika, von überall auf der Welt.",
    community: "Hallo, ich möchte der Prodigal-Community beitreten",
  },
  prodigal: {
    badge: "Eine Plattform mit Verbindung zu Jamaika",
    parent: "Von überall auf der Welt",
    quote:
      "Deine Erfahrung im Ausland ist ein Vorteil. Nutze sie, um in Jamaika etwas aufzubauen.",
    lead:
      "Ob du nach Hause zurückkehrst, aus dem Ausland investierst, ein Unternehmen aufbaust, Immobilien verwaltest, deine Fähigkeiten einbringst oder einfach wieder eine praktische Verbindung zu Jamaika suchst: The Prodigal verbindet nützliche Informationen, vertrauenswürdige Kontakte, lokales Wissen und echte Chancen.",
    pillars:
      "Praktische Informationen. Vertrauenswürdige Kontakte. Lokales Wissen. Echte Chancen.",
    byline: "— Patrick Harrison, Gründer",
    explore: "Chancen in Jamaika entdecken",
    join: "Der Prodigal-Community beitreten",
    intro:
      "The Prodigal ist eine Plattform mit Verbindung zu Jamaika für Menschen auf der ganzen Welt und vor Ort, die zurückkehren, investieren, aufbauen, arbeiten, Immobilien verwalten, ihre Fähigkeiten einbringen oder Chancen in Jamaika schaffen möchten.",
    monetizeTitle: "Heimkommen ist ein Weg",
    monetize:
      "Du musst das nicht allein herausfinden. Verstehe praktische Schritte, finde nützliche Ressourcen, knüpfe lokale Kontakte und lerne von Menschen, die den Weg schon gegangen sind.",
    riskTitle: "Verbunden bleiben. Chancen schaffen",
    risk: "Du musst nicht in Jamaika leben, um zu Jamaika beizutragen. Entdecke Wege zu investieren, aufzubauen, lokale Betriebe zu unterstützen, Projekte zu steuern und Chancen zu schaffen — von überall, wo du bist.",
    peerTitle: "Besitzt du Immobilien in Jamaika?",
    peer: "Immobilien aus dem Ausland zu verwalten, kann schwierig sein. Zuverlässige Menschen für Inspektionen, Reparaturen, Instandhaltung oder Unterstützung vor Ort zu finden, ist oft die größte Herausforderung. Prodigal wird entwickelt, um Eigentümern dabei zu helfen, vertrauenswürdige lokale Menschen und Dienstleistungen zu finden.",
    greenTitle: "Deine Fähigkeiten können in Jamaika Wert schaffen.",
    rrTitle: "Unternehmen und Fähigkeiten",
    rr: "Ob Unternehmer, Fachkraft, Investor oder Dienstleister: Prodigal wird entwickelt, um Fähigkeiten und Know-how mit echten Chancen in Jamaika zu verbinden.",
    buildTitle: "Jamaika kann mehr sein als dein nächstes Reiseziel",
    build:
      "Entdecke praktische Ressourcen, lokale Dienste, Geschäftschancen und Verbindungen für ein Leben oder Arbeiten in Jamaika.",
    story: "Die Gründergeschichte lesen →",
    footerText:
      "Von überall auf der Welt kann Jamaika mehr sein als eine Erinnerung. Es kann ein Ort sein, an dem du aufbaust. HarriCom Web Studio baut Websites und digitale Systeme für jamaikanische Betriebe — dazugehörig, nicht die ganze Geschichte.",
    disclaimer:
      "Prodigal bietet praktische Informationen, Verbindungen und Ressourcen. Wo rechtliche, steuerliche, einwanderungs-, zoll- oder immobilienrechtliche Beratung nötig ist, sollten Nutzer eine qualifizierte Fachperson oder die zuständige jamaikanische Behörde fragen.",
    float: "Mit The Prodigal auf WhatsApp schreiben",
    homeAria: "The Prodigal Startseite",
    profile: "Patrick Harrison",
  },
  shopCta: "Das will ich für meinen Laden",
  insights: {
    title: "Einblicke",
    heading: "Markt-Einblicke",
    description:
      "Praktische Ressourcen, vertrauenswürdige Verbindungen und lokales Wissen für Menschen auf der ganzen Welt und in Jamaika — Rückkehr, Investition, Aufbau, Immobilien oder Wiederanbindung.",
    founderTitle: "Gründergeschichte",
    founderIntro:
      "The Prodigal gibt es, weil ich diesen Weg selbst gegangen bin — und er ist keine reine US-Geschichte.",
    founderRole: "Gründer · The Prodigal",
    quote:
      "„Ich habe Jamaika verlassen, im Ausland Karriere gemacht und bin heimgekommen, um hier aufzubauen. Das Schwere war, Auslandserfahrung in Handlung vor Ort zu verwandeln. Ich habe The Prodigal gestartet, damit Menschen auf der ganzen Welt — und zu Hause — eine praktische, menschliche Schicht zwischen Information und Handlung haben. HarriCom Web Studio ist, wie ich jamaikanischen Betrieben helfe, online sichtbar zu sein.“",
    chip: "The Prodigal · HarriCom Web Studio",
    profile: "Profil und Lebenslauf →",
    back: "← Zurück zu The Prodigal",
    pathsTitle: "Für wen",
    paths: [
      {
        name: "Rückkehrer",
        role: "Heimkommen ist ein Weg",
        story:
          "Du musst das nicht allein herausfinden. Verstehe praktische Schritte, finde nützliche Ressourcen, knüpfe lokale Kontakte und lerne von Menschen, die den Weg schon gegangen sind.",
        impact: "Rückkehrweg beginnen",
      },
      {
        name: "Diaspora",
        role: "Verbunden bleiben. Chancen schaffen",
        story:
          "Du musst nicht in Jamaika leben, um zu Jamaika beizutragen. Entdecke Wege zu investieren, aufzubauen, lokale Betriebe zu unterstützen, Projekte zu steuern und Chancen zu schaffen — von überall, nicht nur aus den USA.",
        impact: "Diaspora-Chancen entdecken",
      },
      {
        name: "Immobilieneigentümer",
        role: "Verwalten von überall",
        story:
          "Immobilien aus dem Ausland zu verwalten, kann schwierig sein. Zuverlässige Menschen für Inspektionen, Reparaturen, Instandhaltung oder Unterstützung vor Ort zu finden, ist oft die größte Herausforderung. Prodigal wird entwickelt, um Eigentümern dabei zu helfen, vertrauenswürdige lokale Menschen und Dienstleistungen zu finden.",
        impact: "Immobiliendienste entdecken",
      },
    ],
  },
  community: {
    title: "Community",
    heading: "Der Prodigal-Community beitreten",
    description:
      "Vertrauenswürdige Kontakte für Menschen auf der ganzen Welt und vor Ort — zum Zurückkehren, Investieren, Aufbauen, Arbeiten oder einfach, um mit Jamaika verbunden zu bleiben.",
    intro:
      "Die Prodigal-Community nutzt WhatsApp als zentralen Treffpunkt. Erzähle uns, wer du bist und wo auf der Welt du lebst. Wir bringen Menschen zusammen, damit sie praktische Hinweise, lokales Wissen, hilfreiche Kontakte und echte Chancen teilen können.",
    join: "Der Prodigal-Community beitreten",
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
    footer: "The Prodigal",
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
  return parseLocale(locale) === "de" ? de : en;
}

export function readBrowserLocale(): Locale {
  if (typeof document === "undefined") {
    return "en";
  }
  try {
    const stored = window.localStorage.getItem(LOCALE_COOKIE);
    if (stored === "de" || stored === "en") {
      return stored;
    }
  } catch {
    // Private browsing on some phones blocks localStorage.
  }
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  if (match) {
    return parseLocale(decodeURIComponent(match[1]));
  }
  return "en";
}

export function writeBrowserLocale(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }
  const maxAge = 31536000;
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${maxAge}; Expires=${expires}; SameSite=Lax`;
  if (window.location.protocol === "https:") {
    document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${maxAge}; Expires=${expires}; SameSite=Lax; Secure`;
  }
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // Private mode on some phones blocks storage; the cookie still holds.
  }
}
