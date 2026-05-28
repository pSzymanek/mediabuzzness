import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  AtSign,
  BarChart3,
  ChevronRight,
  Globe2,
  Layers3,
  Mail,
  Megaphone,
  MousePointer2,
  PenLine,
  Phone,
  Search,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "Strony internetowe",
    text: "Szybkie, responsywne strony i landing pages, które wyglądają dobrze i prowadzą użytkownika do kontaktu.",
  },
  {
    icon: Megaphone,
    title: "Social media",
    text: "Plan publikacji, grafiki, teksty i regularna obecność marki tam, gdzie są Twoi klienci.",
  },
  {
    icon: Search,
    title: "Widoczność w Google",
    text: "Podstawy SEO, wizytówka firmy, treści lokalne i techniczny porządek, który pomaga dać się znaleźć.",
  },
  {
    icon: BarChart3,
    title: "Analityka i kampanie",
    text: "Mierzymy ruch, zgłoszenia i skuteczność działań, a potem poprawiamy to, co realnie wpływa na wynik.",
  },
];

const steps = [
  "Audyt obecnej widoczności firmy",
  "Plan strony, sociali i treści na start",
  "Projekt, wdrożenie i publikacja",
  "Stała opieka, optymalizacje i raport",
];

const stats = [
  ["01", "Jeden zespół od strony, sociali i treści"],
  ["30 dni", "Pierwszy uporządkowany miesiąc obecności online"],
  ["100%", "Komunikacji dopasowanej do branży i celu"],
];

function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const isContactPage = path === "/kontakt";

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [path]);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (event, nextPath) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="/"
          aria-label="MediaBuzzness"
          onClick={(event) => navigate(event, "/")}
        >
          <img
            className="brand-logo"
            src="/optimized/brand/logo-color-dark.webp"
            alt="MediaBuzzness"
            width="620"
            height="89"
          />
        </a>
        <nav aria-label="Główna nawigacja">
          <a href="/#uslugi">Usługi</a>
          <a href="/#proces">Proces</a>
          <a
            href="/kontakt"
            className={isContactPage ? "is-active" : undefined}
            onClick={(event) => navigate(event, "/kontakt")}
          >
            Kontakt
          </a>
        </nav>
        <a
          className="header-cta"
          href="/kontakt"
          onClick={(event) => navigate(event, "/kontakt")}
        >
          Porozmawiajmy
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </header>

      {isContactPage ? (
        <ContactPage />
      ) : (
        <HomePage navigate={navigate} />
      )}
    </main>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero" id="top">
        <picture className="hero-media">
          <source srcSet="/optimized/hero.avif" type="image/avif" />
          <source srcSet="/optimized/hero.webp" type="image/webp" />
          <img
            src="/optimized/hero.webp"
            alt=""
            className="hero-image"
            width="1706"
            height="922"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        <div className="hero-scrim" />
        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Widoczność firm w internecie
          </div>
          <h1 className="hero-title" data-text="MediaBuzzness">
            MediaBuzzness
          </h1>
          <p>
            Projektujemy i prowadzimy obecność Twojej firmy online: od strony
            internetowej, przez social media, po treści, SEO i kampanie.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href="/kontakt"
              onClick={(event) => navigate(event, "/kontakt")}
            >
              Zacznij od konsultacji
              <ChevronRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="#uslugi">
              Zobacz zakres
            </a>
          </div>
        </div>
        <div className="hero-status" aria-label="Zakres obsługi">
          <span>WWW</span>
          <span>Social</span>
          <span>SEO</span>
          <span>Ads</span>
        </div>
      </section>

      <section className="intro band">
        <div className="section-heading" data-reveal>
          <span className="kicker">Dla firm, które chcą być widoczne</span>
          <h2>
            Internet zacznie pracować{" "}
            <span className="gradient-text">dla Ciebie</span>.
          </h2>
        </div>
        <div className="intro-copy" data-reveal>
          <p>
            MediaBuzzness porządkuje wszystkie elementy obecności online. Nie
            zaczynamy od przypadkowych postów ani szablonowej strony. Najpierw
            ustalamy, co klient ma zobaczyć, zrozumieć i zrobić.
          </p>
          <p>
            Potem budujemy system: czytelna strona, regularne treści,
            rozpoznawalny styl i mierzenie efektów.
          </p>
        </div>
      </section>

      <section className="services" id="uslugi">
        <div className="section-heading centered" data-reveal>
          <span className="kicker">Zakres</span>
          <h2>Widocznie. Spójnie. Profesjonalnie.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title} data-reveal>
              <img
                className="service-mark"
                src="/optimized/brand/mark-color.webp"
                alt=""
                width="360"
                height="261"
                loading="lazy"
                decoding="async"
              />
              <div className="icon-box">
                <service.icon size={24} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase band">
        <div className="showcase-copy" data-reveal>
          <span className="kicker">System zamiast chaosu</span>
          <h2>Dopasujemy strategię dla Twoich potrzeb.</h2>
          <p>
            Łączymy stronę, publikacje, wizytówkę Google, kampanie i analitykę
            w jeden plan działań. Dzięki temu firma nie wygląda w sieci jak
            zbiór przypadkowych decyzji.
          </p>
        </div>
        <div
          className="signal-panel"
          aria-label="Elementy obecności online"
          data-reveal
        >
          <div className="signal-row active">
            <MousePointer2 size={18} aria-hidden="true" />
            <span>Strona prowadzi do zapytania</span>
            <strong>klarownie</strong>
          </div>
          <div className="signal-row">
            <PenLine size={18} aria-hidden="true" />
            <span>Treści tłumaczą ofertę</span>
            <strong>regularnie</strong>
          </div>
          <div className="signal-row">
            <Target size={18} aria-hidden="true" />
            <span>Kampanie trafiają do właściwych osób</span>
            <strong>precyzyjnie</strong>
          </div>
          <div className="signal-row">
            <Layers3 size={18} aria-hidden="true" />
            <span>Marka jest spójna w kanałach</span>
            <strong>czytelnie</strong>
          </div>
        </div>
      </section>

      <section className="process" id="proces">
        <div className="section-heading" data-reveal>
          <span className="kicker">Proces</span>
          <h2>Start bez przeciągania i bez marketingowego żargonu.</h2>
        </div>
        <ol className="timeline">
          {steps.map((step, index) => (
            <li key={step} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="stats band">
        {stats.map(([value, label]) => (
          <div className="stat" key={value} data-reveal>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="contact" id="kontakt">
        <div data-reveal>
          <span className="kicker">Kontakt</span>
          <h2>Chcesz, żeby firma była lepiej widoczna w internecie?</h2>
          <p>
            Napisz, czym się zajmujesz i co już masz: stronę, profile, reklamy
            albo tylko pomysł. Odpowiemy konkretnie, od czego warto zacząć.
          </p>
        </div>
        <a
          className="contact-button"
          href="/kontakt"
          onClick={(event) => navigate(event, "/kontakt")}
          data-reveal
        >
          <Mail size={20} aria-hidden="true" />
          Przejdź do kontaktu
        </a>
      </section>

      <Footer />
    </>
  );
}

function ContactPage() {
  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim() || "Brak imienia";
    const email = form.get("email")?.toString().trim() || "Brak adresu e-mail";
    const phone = form.get("phone")?.toString().trim() || "Brak telefonu";
    const message =
      form.get("message")?.toString().trim() || "Brak wiadomości";

    const subject = encodeURIComponent(`Zapytanie ze strony - ${name}`);
    const body = encodeURIComponent(
      `Imię i nazwisko: ${name}\nE-mail: ${email}\nTelefon: ${phone}\n\nWiadomość:\n${message}`,
    );

    window.location.href = `mailto:info@mediabuzzness.pl?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="contact-page">
        <div className="contact-hero">
          <span className="kicker">Kontakt</span>
          <h1>Porozmawiajmy o widoczności Twojej firmy.</h1>
          <p>
            Opisz krótko, czego potrzebujesz. Odpowiemy konkretnie i podpowiemy,
            od czego warto zacząć.
          </p>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>
              Imię i nazwisko
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              E-mail
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Telefon
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              Wiadomość
              <textarea name="message" rows="6" required />
            </label>
            <button className="button primary form-submit" type="submit">
              Wyślij wiadomość
              <Send size={18} aria-hidden="true" />
            </button>
          </form>

          <aside className="contact-details">
            <div className="contact-detail-card">
              <Phone size={22} aria-hidden="true" />
              <span>Telefon</span>
              <a href="tel:+48512782456">512 782 456</a>
            </div>
            <div className="contact-detail-card">
              <AtSign size={22} aria-hidden="true" />
              <span>Formularz wysyła na</span>
              <a href="mailto:info@mediabuzzness.pl">info@mediabuzzness.pl</a>
            </div>
            <div className="contact-detail-card">
              <Mail size={22} aria-hidden="true" />
              <span>Bezpośrednio</span>
              <a href="mailto:agata@mediabuzzness.pl">agata@mediabuzzness.pl</a>
              <a href="mailto:piotr@mediabuzzness.pl">piotr@mediabuzzness.pl</a>
            </div>
          </aside>
        </div>
      </section>

      <Footer compact />
    </>
  );
}

function Footer({ compact = false }) {
  return (
    <footer className={`site-footer${compact ? " compact-footer" : ""}`}>
      <div className="footer-main" data-reveal>
        <img
          className="footer-logo"
          src="/optimized/brand/logo-white-color-buzz.webp"
          alt="MediaBuzzness"
          width="900"
          height="134"
          loading="lazy"
          decoding="async"
        />
        <p>
          Strony internetowe, social media, SEO i kampanie prowadzone tak, aby
          Twoja firma była widoczna tam, gdzie klient szuka decyzji.
        </p>
      </div>
      <div className="footer-side" data-reveal>
        <span>Widoczność, która pracuje na Twój biznes.</span>
      </div>
    </footer>
  );
}

export default App;
