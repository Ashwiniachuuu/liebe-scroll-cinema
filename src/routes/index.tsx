import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { ScrollVideo } from "@/components/liebe/ScrollVideo";
import { Navbar } from "@/components/liebe/Navbar";
import { Reveal } from "@/components/liebe/Reveal";
import { menuItems } from "@/components/liebe/data";

import heroBurger from "@/assets/images/hero-burger.jpg";
import comboOffer from "@/assets/images/combo-offer.jpg";
import aboutKitchen from "@/assets/images/about-kitchen.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIEBE — Good Food. Good Mood." },
      {
        name: "description",
        content:
          "LIEBE serves fresh, bold burgers with a premium cinematic experience. Explore the menu, offers and our kitchen story.",
      },
      { property: "og:title", content: "LIEBE — Good Food. Good Mood." },
      {
        property: "og:description",
        content: "Fresh flavors. Bold cravings. Delivered your way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen">
      <ScrollVideo />
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Offers />
        <About />
        <Contact />
        <FinalCta />
      </main>
      <footer className="relative z-10 py-10 text-center text-xs tracking-[0.3em] text-muted-foreground">
        LIEBE © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lift, setLift] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setTilt({ x, y }));
    };
    const onScroll = () => setLift(Math.min(1, window.scrollY / window.innerHeight));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-28"
    >
      <div className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div
          className="relative z-10"
          style={{
            transform: `translate3d(${tilt.x * -8}px, ${tilt.y * -6 - lift * 60}px, 0)`,
            opacity: 1 - lift * 0.7,
          }}
        >
          <span className="glass-panel inline-block rounded-full px-4 py-1.5 text-[11px] tracking-[0.32em] text-muted-foreground">
            PREMIUM BURGER HOUSE
          </span>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Good Food.{" "}
            <span className="bg-[linear-gradient(120deg,oklch(0.74_0.1_78),oklch(0.6_0.11_66))] bg-clip-text text-transparent">
              Good Mood!
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Fresh flavors. Bold cravings. Delivered your way.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#offers"
              className="btn-gold rounded-full px-8 py-3.5 text-xs font-semibold tracking-[0.2em]"
            >
              ORDER NOW
            </a>
            <a
              href="#menu"
              className="btn-ghost-lux rounded-full px-8 py-3.5 text-xs font-semibold tracking-[0.2em]"
            >
              EXPLORE MENU
            </a>
          </div>
        </div>

        <div
          className="relative flex justify-center"
          style={{
            transform: `translate3d(${tilt.x * 18}px, ${tilt.y * 14 - lift * 110}px, 0) scale(${1 - lift * 0.08})`,
          }}
        >
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,var(--gold-glow),transparent_70%)] blur-2xl" />
          <img
            src={heroBurger}
            alt="Juicy crispy chicken burger with rising steam"
            width={1024}
            height={1024}
            className="float-soft relative w-[78%] max-w-sm drop-shadow-[0_40px_50px_oklch(0.45_0.03_70/0.35)] md:w-full"
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground">
        SCROLL
      </div>
    </section>
  );
}

/* ---------------- Menu ---------------- */

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <p className="text-[11px] tracking-[0.4em] text-accent-foreground">{eyebrow}</p>
      <h2 className="font-display mt-4 text-4xl text-foreground sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

function Menu() {
  return (
    <section id="menu" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="OUR MENU" title="Crafted To Crave" />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <article className="glass-panel tilt-card h-full rounded-3xl p-6">
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,var(--gold-glow),transparent_70%)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="mx-auto w-full object-contain drop-shadow-[0_24px_28px_oklch(0.45_0.03_70/0.28)]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                  <span className="text-sm font-semibold text-accent-foreground">
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-4 text-xs tracking-[0.2em] text-accent-foreground">
                  ★ {item.rating.toFixed(1)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Offers ---------------- */

function Offers() {
  return (
    <section id="offers" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="FEATURED OFFER" title="Spicy Burger Combo" />
        <Reveal delay={120}>
          <div className="glass-panel mt-14 grid items-center gap-10 rounded-[2.5rem] p-8 md:grid-cols-2 md:p-14">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--gold-glow),transparent_70%)] blur-3xl" />
              <img
                src={comboOffer}
                alt="Spicy chicken burger with fries and an iced drink"
                loading="lazy"
                width={1440}
                height={1024}
                className="float-soft relative w-full object-contain drop-shadow-[0_40px_45px_oklch(0.45_0.03_70/0.3)]"
              />
            </div>
            <div>
              <span className="btn-gold rounded-full px-4 py-1.5 text-[11px] tracking-[0.28em]">
                20% OFF
              </span>
              <h3 className="font-display mt-6 text-4xl leading-tight text-foreground">
                Spicy Burger Combo
              </h3>
              <p className="mt-4 max-w-sm text-muted-foreground">
                A flame-kissed spicy chicken burger, golden hand-cut fries and an
                ice-cold drink — plated like a product, served like a craving.
              </p>
              <div className="mt-8 flex items-end gap-4">
                <span className="font-display text-3xl text-foreground">$13.60</span>
                <span className="pb-1 text-sm text-muted-foreground line-through">
                  $17.00
                </span>
              </div>
              <a
                href="#contact"
                className="btn-gold mt-8 inline-flex rounded-full px-8 py-3.5 text-xs font-semibold tracking-[0.2em]"
              >
                CLAIM OFFER
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-[2.5rem] p-3">
            <img
              src={aboutKitchen}
              alt="Chef plating a burger in a bright premium kitchen"
              loading="lazy"
              width={1440}
              height={1024}
              className="w-full rounded-[2rem] object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[11px] tracking-[0.4em] text-accent-foreground">OUR STORY</p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
            Made Fresh. Made With Passion.
          </h2>
          <p className="mt-6 text-muted-foreground">
            LIEBE began with one belief — that a burger can be a fine-dining moment.
            Every bun is baked the same morning, every patty is pressed by hand, and
            every sauce is built in-house from whole ingredients.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our open kitchen is warm, bright and quiet in its precision. No shortcuts,
            no fillers — just fire, craft and the kind of flavor you remember.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { k: "12", v: "Years" },
              { k: "48", v: "Recipes" },
              { k: "4.9", v: "Rating" },
            ].map((s) => (
              <div key={s.v} className="glass-panel rounded-2xl px-4 py-5 text-center">
                <p className="font-display text-2xl text-foreground">{s.k}</p>
                <p className="mt-1 text-[10px] tracking-[0.25em] text-muted-foreground">
                  {s.v.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

const contact = [
  { label: "Location", value: "18 Maple Street, Lisbon" },
  { label: "Phone", value: "+351 900 000 000" },
  { label: "Email", value: "hello@liebe.food" },
  { label: "Opening Hours", value: "Mon–Sun · 11:00 – 23:00" },
];

function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="CONTACT" title="Come Find Us" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contact.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div className="glass-panel h-full rounded-3xl p-7">
                <p className="text-[10px] tracking-[0.3em] text-accent-foreground">
                  {c.label.toUpperCase()}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{c.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <section className="relative px-6 pb-32 pt-10">
      <Reveal>
        <div className="glass-panel mx-auto max-w-3xl rounded-[2.5rem] px-8 py-16 text-center">
          <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Ready for Your Next{" "}
            <span className="bg-[linear-gradient(120deg,oklch(0.74_0.1_78),oklch(0.6_0.11_66))] bg-clip-text text-transparent">
              Craving?
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">One bite is all it takes.</p>
          <a
            href="#menu"
            className="btn-gold mt-9 inline-flex rounded-full px-10 py-4 text-xs font-semibold tracking-[0.22em]"
          >
            ORDER YOUR BURGER
          </a>
        </div>
      </Reveal>
    </section>
  );
}
