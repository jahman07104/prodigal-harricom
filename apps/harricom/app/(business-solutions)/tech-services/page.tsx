import Link from "next/link";

export default function TechServicesPage() {
  return (
    <main className="home-page rainbow-b">
      <header className="catalog-header">
        <div className="catalog-header-logo" aria-label="HarriCom">
          <img
            src="/assets/images/doctorbird.jpg"
            className="brand-logo-img"
            alt="HarriCom"
          />
        </div>
        <h1 className="catalog-header-title">HarriCom Web Studio</h1>
        <nav className="harricom-site-nav" aria-label="Site navigation">
          <Link href="/">Relocation Services</Link>
          <Link href="/quote-builder">Build a Quote</Link>
          <a href="/catalog/">Templates</a>
        </nav>
      </header>

      <section className="hero-container">
        <div className="hero-image hero-image-city">
          <div className="hero-contrast-overlay" />
          <img
            className="hero-media"
            src="/assets/images/background.jpg"
            alt="Jamaican small business"
          />
          <div className="hero-content hero-content-brand hero-content-overlay">
            <div className="hero-text-box">
              <h2>Websites for Jamaican businesses that answer WhatsApp for you.</h2>
              <p>
                HarriCom builds secure, mobile-first business platforms for bookings,
                customer messages, and online sales.
              </p>
              <div className="hero-actions">
                <a href="/catalog/" className="btn-primary">
                  Explore Templates
                </a>
                <a
                  href="https://wa.me/18763892243?text=Hi%20HarriCom%2C%20I%20want%20the%20AI%20WhatsApp%20site"
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
