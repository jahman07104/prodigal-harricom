import Link from "next/link";

export default function RelocationPage() {
  return (
    <main className="home-page">
      <header className="catalog-header">
        <div className="catalog-header-logo" aria-label="HarriCom">
          <img
            src="/assets/images/doctorbird.jpg"
            className="brand-logo-img"
            alt="HarriCom"
          />
        </div>
        <h1 className="catalog-header-title">The Prodigal Program</h1>
        <nav className="harricom-site-nav" aria-label="Site navigation">
          <Link href="/tech-services">HarriCom Platform</Link>
        </nav>
      </header>

      <iframe
        src="/prodigal/index.html"
        title="The Prodigal Program"
        style={{ border: 0, display: "block", height: "calc(100vh - 100px)", width: "100%" }}
      />
    </main>
  );
}
