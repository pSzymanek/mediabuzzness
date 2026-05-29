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
  X,
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
  ["1", "Jeden zespół od strony, sociali i treści"],
  ["3", "Trzy kanały: WWW, social media i kampanie"],
  ["100%", "Komunikacji dopasowanej do branży i celu"],
];

const heroSymbols = [
  Sparkles,
  BarChart3,
  Target,
  ArrowRight,
  Sparkles,
  Layers3,
  Globe2,
  Megaphone,
  MousePointer2,
  BarChart3,
];

function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const isContactPage = path === "/kontakt";
  const isPrivacyPage = path === "/polityka-prywatnosci";
  const isTermsPage = path === "/regulamin";
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(() => {
    return window.localStorage.getItem("mediabuzzness-cookie-consent") !== "accepted";
  });
  const [isContactNudgeVisible, setIsContactNudgeVisible] = useState(false);
  const [isContactNudgeDelayed, setIsContactNudgeDelayed] = useState(false);

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

  const acceptCookies = () => {
    window.localStorage.setItem("mediabuzzness-cookie-consent", "accepted");
    setIsCookieBannerVisible(false);
    setIsContactNudgeDelayed(true);
  };

  const closeContactNudge = () => {
    window.sessionStorage.setItem("mediabuzzness-contact-nudge", "closed");
    setIsContactNudgeVisible(false);
  };

  useEffect(() => {
    if (
      isContactPage ||
      isCookieBannerVisible ||
      isContactNudgeDelayed ||
      window.sessionStorage.getItem("mediabuzzness-contact-nudge")
    ) {
      setIsContactNudgeVisible(false);
      return undefined;
    }

    let wasShown = false;
    let hideTimer;
    const showNudge = () => {
      if (wasShown) return;
      wasShown = true;
      window.sessionStorage.setItem("mediabuzzness-contact-nudge", "shown");
      setIsContactNudgeVisible(true);
      hideTimer = window.setTimeout(() => setIsContactNudgeVisible(false), 11000);
    };
    const handleScroll = () => {
      if (window.scrollY > 420) {
        showNudge();
      }
    };
    const showTimer = window.setTimeout(showNudge, 5200);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isContactPage, isCookieBannerVisible, isContactNudgeDelayed, path]);

  useEffect(() => {
    if (!isContactNudgeDelayed) return undefined;

    const delayTimer = window.setTimeout(() => {
      setIsContactNudgeDelayed(false);
    }, 5000);

    return () => window.clearTimeout(delayTimer);
  }, [isContactNudgeDelayed]);

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
            src="/optimized/brand/logo-noslg-center.webp"
            alt="MediaBuzzness"
            width="620"
            height="103"
          />
        </a>
        <nav aria-label="Główna nawigacja">
          <a href="/" onClick={(event) => navigate(event, "/")}>
            Home
          </a>
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
        <ContactPage navigate={navigate} />
      ) : isPrivacyPage ? (
        <LegalPage type="privacy" navigate={navigate} />
      ) : isTermsPage ? (
        <LegalPage type="terms" navigate={navigate} />
      ) : (
        <HomePage navigate={navigate} />
      )}

      {isCookieBannerVisible ? (
        <CookieBanner onAccept={acceptCookies} navigate={navigate} />
      ) : null}
      <ContactNudge
        isVisible={isContactNudgeVisible}
        hasCookieBanner={isCookieBannerVisible}
        onClose={closeContactNudge}
        navigate={navigate}
      />
    </main>
  );
}

function CookieBanner({ onAccept, navigate }) {
  return (
    <aside className="cookie-banner" aria-label="Informacja o plikach cookies">
      <img
        src="/optimized/brand/mark-color.webp"
        alt=""
        width="360"
        height="261"
        loading="lazy"
        decoding="async"
      />
      <div>
        <strong>Dbamy o prywatność</strong>
        <p>
          Używamy plików cookies do analityki i ulepszania strony. Szczegóły
          znajdziesz w polityce prywatności.
        </p>
      </div>
      <div className="prompt-actions">
        <a
          href="/polityka-prywatnosci"
          onClick={(event) => navigate(event, "/polityka-prywatnosci")}
        >
          Polityka
        </a>
        <button type="button" onClick={onAccept}>
          Akceptuję
        </button>
      </div>
    </aside>
  );
}

function ContactNudge({ isVisible, hasCookieBanner, onClose, navigate }) {
  return (
    <aside
      className={`contact-nudge${isVisible ? " is-visible" : ""}${
        hasCookieBanner ? " above-cookies" : ""
      }`}
      aria-hidden={!isVisible}
      aria-label="Zachęta do kontaktu"
    >
      <img
        src="/optimized/brand/mark-color.webp"
        alt=""
        width="360"
        height="261"
        loading="lazy"
        decoding="async"
      />
      <div>
        <strong>Chcesz pokazać się w sieci?</strong>
        <p>Napisz do nas!</p>
      </div>
      <a
        href="/kontakt"
        onClick={(event) => navigate(event, "/kontakt")}
        tabIndex={isVisible ? 0 : -1}
      >
        Kontakt
        <ArrowRight size={15} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        tabIndex={isVisible ? 0 : -1}
      >
        <X size={15} aria-hidden="true" />
      </button>
    </aside>
  );
}

function HomePage({ navigate }) {
  const [activeHeroSymbol, setActiveHeroSymbol] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSymbol((previous) => {
        const next = Math.floor(Math.random() * heroSymbols.length);
        return next === previous ? (next + 1) % heroSymbols.length : next;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-glow primary" aria-hidden="true" />
        <div className="hero-glow secondary" aria-hidden="true" />
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-symbols" aria-hidden="true">
          {heroSymbols.map((Icon, index) => (
            <span
              key={`${Icon.displayName || Icon.name}-${index}`}
              className={activeHeroSymbol === index ? "is-hopping" : undefined}
            >
              <Icon size={40} />
            </span>
          ))}
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <h1 className="hero-logo-title">
            <img
              className="hero-logo"
              src="/brand/logo-full.svg"
              alt="MediaBuzzness - Widoczność, która pracuje na Twój biznes"
              width="1431"
              height="240"
            />
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

      <Footer navigate={navigate} />
    </>
  );
}

function ContactPage({ navigate }) {
  const [contactStatus, setContactStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setContactStatus({
      type: "loading",
      message: "Wysyłamy wiadomość...",
    });

    try {
      const response = await fetch("/send-mail.php", {
        method: "POST",
        body: form,
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Nie udało się wysłać wiadomości.");
      }

      formElement.reset();
      setContactStatus({
        type: "success",
        message: "Dziękujemy. Wiadomość została wysłana.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na kontakt@mediabuzzness.pl.",
      });
    }
  };

  return (
    <>
      <section className="contact-page">
        <div className="contact-hero">
          <span className="kicker">Kontakt</span>
          <h1>
            Porozmawiajmy o widoczności <span>Twojej firmy.</span>
          </h1>
          <p>Podpowiemy, od czego warto zacząć.</p>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label className="form-trap" aria-hidden="true">
              Firma
              <input name="company" type="text" tabIndex="-1" autoComplete="off" />
            </label>
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
            <button
              className="button primary form-submit"
              type="submit"
              disabled={contactStatus.type === "loading"}
            >
              {contactStatus.type === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
              <Send size={18} aria-hidden="true" />
            </button>
            {contactStatus.message ? (
              <p className={`form-status ${contactStatus.type}`}>
                {contactStatus.message}
              </p>
            ) : null}
          </form>

          <aside className="contact-details">
            <div className="contact-detail-card">
              <Phone size={22} aria-hidden="true" />
              <span>Telefon</span>
              <a href="tel:+48512782456">512 782 456</a>
            </div>
            <div className="contact-detail-card">
              <AtSign size={22} aria-hidden="true" />
              <span>Kontakt</span>
              <a href="mailto:kontakt@mediabuzzness.pl">kontakt@mediabuzzness.pl</a>
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

      <Footer compact navigate={navigate} />
    </>
  );
}

function LegalPage({ type, navigate }) {
  const isPrivacy = type === "privacy";

  return (
    <>
      <section className="legal-page">
        <div className="legal-hero">
          <span className="kicker">{isPrivacy ? "Prywatność" : "Regulamin"}</span>
          <h1>{isPrivacy ? "Polityka prywatności" : "Regulamin strony"}</h1>
          <p>
            Dokument informacyjny dla użytkowników strony mediabuzzness.pl.
          </p>
        </div>

        <div className="legal-content">
          {isPrivacy ? (
            <>
              <h2>Administrator danych</h2>
              <p>
                Administratorem danych przekazanych przez formularz kontaktowy
                oraz wiadomości e-mail jest MediaBuzzness. Kontakt w sprawach
                prywatności: kontakt@mediabuzzness.pl.
              </p>

              <h2>Zakres przetwarzania</h2>
              <p>
                Przetwarzamy dane podane dobrowolnie w formularzu, w tym imię,
                adres e-mail, numer telefonu oraz treść wiadomości. Dane są
                wykorzystywane wyłącznie do odpowiedzi na zapytanie i obsługi
                kontaktu.
              </p>

              <h2>Analityka i pliki cookie</h2>
              <p>
                Strona może korzystać z Google Analytics w celu mierzenia ruchu,
                źródeł odwiedzin oraz skuteczności treści. Google Analytics może
                używać plików cookie lub podobnych technologii. Dane analityczne
                służą wyłącznie do ulepszania strony i komunikacji.
              </p>

              <h2>Twoje prawa</h2>
              <p>
                Masz prawo dostępu do danych, ich sprostowania, usunięcia,
                ograniczenia przetwarzania oraz wniesienia sprzeciwu. W tym celu
                napisz na kontakt@mediabuzzness.pl.
              </p>
            </>
          ) : (
            <>
              <h2>Charakter strony</h2>
              <p>
                Strona mediabuzzness.pl ma charakter informacyjny i prezentuje
                zakres usług związanych z obecnością firm w internecie.
              </p>

              <h2>Kontakt i zapytania</h2>
              <p>
                Wysłanie formularza lub wiadomości e-mail nie oznacza zawarcia
                umowy. Szczegóły współpracy, zakres prac i warunki są ustalane
                indywidualnie po kontakcie.
              </p>

              <h2>Treści i materiały</h2>
              <p>
                Materiały opublikowane na stronie, w tym teksty, układ i
                elementy identyfikacji wizualnej, są przeznaczone do prezentacji
                marki MediaBuzzness i nie powinny być kopiowane bez zgody.
              </p>

              <h2>Dostępność strony</h2>
              <p>
                Dokładamy starań, aby strona działała poprawnie, ale mogą
                wystąpić przerwy techniczne lub zmiany w treści serwisu.
              </p>
            </>
          )}
        </div>
      </section>

      <Footer compact navigate={navigate} />
    </>
  );
}

function Footer({ compact = false, navigate }) {
  const go = (path) => (event) => navigate?.(event, path);

  return (
    <footer className={`site-footer${compact ? " compact-footer" : ""}`}>
      <div className="footer-main" data-reveal>
        <img
          className="footer-logo"
          src="/optimized/brand/logo-white.webp"
          alt="MediaBuzzness"
          width="900"
          height="135"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="footer-side" data-reveal>
        <p>
          Strony internetowe, social media, SEO i kampanie prowadzone tak, aby
          Twoja firma była widoczna tam, gdzie znajdzie Cię klient.
        </p>
        <div className="footer-contact">
          <a
            href="https://wa.me/48512782456"
            className="footer-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/brand/whatsapp-icon.svg" alt="" width="16" height="16" />
            Napisz na WhatsApp
          </a>
          <a href="mailto:kontakt@mediabuzzness.pl">kontakt@mediabuzzness.pl</a>
        </div>
        <div className="footer-links" aria-label="Linki prawne">
          <a href="/regulamin" onClick={go("/regulamin")}>
            Regulamin
          </a>
          <a
            href="/polityka-prywatnosci"
            onClick={go("/polityka-prywatnosci")}
          >
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
