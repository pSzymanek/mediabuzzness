import React from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Globe2,
  Layers3,
  Mail,
  Megaphone,
  MousePointer2,
  PenLine,
  Search,
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
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="MediaBuzzness">
          <img
            className="brand-logo"
            src="/brand/logo-color-dark.png"
            alt="MediaBuzzness"
          />
        </a>
        <nav aria-label="Główna nawigacja">
          <a href="#uslugi">Usługi</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="header-cta" href="mailto:kontakt@mediabuzzness.pl">
          Porozmawiajmy
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </header>

      <section className="hero" id="top">
        <img src="/mediabuzznes-hero.png" alt="" className="hero-image" />
        <div className="hero-scrim" />
        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Widoczność firm w internecie
          </div>
          <h1 className="hero-title" data-text="MediaBuzzness">MediaBuzzness</h1>
          <p>
            Projektujemy i prowadzimy obecność Twojej firmy online: od strony
            internetowej, przez social media, po treści, SEO i kampanie.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#kontakt">
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
        <div className="section-heading">
          <span className="kicker">Dla firm, które chcą być widoczne</span>
          <h2>
            Internet zacznie pracować <span className="gradient-text">dla Ciebie</span>.
          </h2>
        </div>
        <div className="intro-copy">
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
        <div className="section-heading centered">
          <span className="kicker">Zakres</span>
          <h2>Widocznie. Spójnie. Profesjonalnie.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <img className="service-mark" src="/brand/mark-color.png" alt="" />
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
        <div className="showcase-copy">
          <span className="kicker">System zamiast chaosu</span>
          <h2>Dopasujemy strategię dla Twoich potrzeb.</h2>
          <p>
            Łączymy stronę, publikacje, wizytówkę Google, kampanie i analitykę
            w jeden plan działań. Dzięki temu firma nie wygląda w sieci jak
            zbiór przypadkowych decyzji.
          </p>
        </div>
        <div className="signal-panel" aria-label="Elementy obecności online">
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
        <div className="section-heading">
          <span className="kicker">Proces</span>
          <h2>Start bez przeciągania i bez marketingowego żargonu.</h2>
        </div>
        <ol className="timeline">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="stats band">
        {stats.map(([value, label]) => (
          <div className="stat" key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="contact" id="kontakt">
        <div>
          <span className="kicker">Kontakt</span>
          <h2>Chcesz, żeby firma była lepiej widoczna w internecie?</h2>
          <p>
            Napisz, czym się zajmujesz i co już masz: stronę, profile, reklamy
            albo tylko pomysł. Odpowiemy konkretnie, od czego warto zacząć.
          </p>
        </div>
        <a className="contact-button" href="mailto:kontakt@mediabuzzness.pl">
          <Mail size={20} aria-hidden="true" />
          kontakt@mediabuzzness.pl
        </a>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <img
            className="footer-logo"
            src="/brand/logo-white.png"
            alt="MediaBuzzness"
          />
          <p>
            Strony internetowe, social media, SEO i kampanie prowadzone tak, aby
            Twoja firma była widoczna tam, gdzie klient szuka decyzji.
          </p>
        </div>
        <div className="footer-side">
          <a href="mailto:kontakt@mediabuzzness.pl">kontakt@mediabuzzness.pl</a>
          <span>Widoczność, która pracuje na Twój biznes.</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
