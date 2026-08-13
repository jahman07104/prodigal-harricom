import Link from "next/link";

export default function HomePage() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-6 py-16 text-hc-muted"
    >
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-jm-gold">
        The Prodigal umbrella
      </p>
      <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">
        Prodigal
      </h1>
      <p className="mb-8 max-w-xl text-center text-lg text-hc-muted/80">
        Returning resident reintegration, and HarriCom — the digital-first
        Jamaican studio that builds WhatsApp-ready business sites.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/harricom"
          className="rounded-[10px] bg-hc-orange px-[22px] py-3 font-semibold text-white transition hover:bg-hc-orange-light"
        >
          Visit HarriCom
        </Link>
      </div>
    </main>
  );
}
