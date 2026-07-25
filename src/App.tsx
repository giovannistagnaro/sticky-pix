import { useState } from "react";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import "./App.css";

const EMAIL = "officialparttimelabs@gmail.com";
const PRICE = "$TBD";

/** The ticker string is duplicated so the -50% loop is seamless. Edit once. */
const MARQUEE = "COMING SOON ★ OPEN FIRMWARE ★ NO CLOUD ★ MADE IN CALIFORNIA BY A SMALL TEAM ★ ";

const FINISHES = [
  { name: "MIDNIGHT", swatch: "#1a1830" },
  { name: "BONE", swatch: "#d8d5cc" },
  { name: "CYAN", swatch: "#2de2e6" },
];

const STEPS = [
  {
    label: "01 SEND",
    color: "var(--cyan)",
    body: "Pick a photo in the app, crop it, watch it dither down to 16 greys. Nine seconds over Bluetooth.",
  },
  {
    label: "02 STICK",
    color: "var(--magenta)",
    body: "Magnet on the back, kickstand on the bottom, wall hook in the box. Three point two ounces.",
  },
  {
    label: "03 FORGET",
    color: "var(--yellow)",
    body: "Zero power to hold the image. Two charges a year and it never asks anything of you again.",
  },
];

const SPECS = [
  ["SCREEN", '4.2" · 16 greys'],
  ["RESOLUTION", "400 × 300"],
  ["POWER", "6 months / charge"],
  ["RADIO", "BLE 5.0"],
  ["GUTS", "ESP32 · open FW"],
  ["WEIGHT", "3.2 oz"],
];

const APP_SCREENS = [
  { slot: "APP — PICK", caption: "CHOOSE A PHOTO", featured: false },
  { slot: "APP — DITHER", caption: "PICK A DITHER", featured: false },
  { slot: "APP — SEND", caption: "SEND TO TILE", featured: true },
];

const BOX = [
  "Sticky Pix SP-1 tile",
  "USB-C cable, braided, 1m",
  "Adhesive wall hook + two spares",
  "Sticker sheet, because obviously",
  "One-page paper manual",
];

const BUNDLES = [
  {
    tier: "ONE PLAYER",
    tierColor: "var(--cyan)",
    blurb: "A single tile and everything in the box.",
    featured: false,
  },
  {
    tier: "TWO PLAYER",
    tierColor: "var(--magenta)",
    blurb: "Two tiles. Keep one, mail one to someone.",
    featured: true,
  },
  {
    tier: "THE WALL PACK",
    tierColor: "var(--yellow)",
    blurb: "Four tiles and a set of hooks. Build a grid.",
    featured: false,
  },
];

const QUOTES = [
  {
    rule: "var(--cyan)",
    quote: "The first gadget in years that does one thing and then leaves you alone.",
    source: "SMALL BATCH WEEKLY",
  },
  {
    rule: "var(--magenta)",
    quote: "I stuck one on the van dash in March and haven't touched it since.",
    source: "REN K., EARLY TESTER",
  },
  {
    rule: "var(--yellow)",
    quote: "Open firmware on a photo frame is a genuinely unreasonable gift.",
    source: "HACKDESK.IO",
  },
];

const FAQ = [
  [
    "HOW LONG DOES A CHARGE LAST?",
    "About six months of normal use. The screen costs nothing to hold an image; only sending a new one uses power.",
  ],
  [
    "IS IT COLOUR?",
    "No. Sixteen greys, dithered. Colour e-ink at this size still looks muddy, so we skipped it.",
  ],
  ["DO I NEED AN ACCOUNT?", "Never. The app pairs over Bluetooth and nothing leaves your phone."],
  [
    "CAN I WRITE MY OWN FIRMWARE?",
    "Yes, please. It's an ESP32 with a documented header. Repo goes public at launch.",
  ],
  ["WHEN DOES IT SHIP?", "Coming soon. You are charged when yours ships, not today."],
];

const FOOTER_COLUMNS = [
  { head: "PRODUCT", links: ["Sticky Pix SP-1", "Specs", "The app"] },
  { head: "SUPPORT", links: ["FAQ", "Shipping", "Repairs"] },
  { head: "ELSEWHERE", links: ["Instagram", "GitHub", "Newsletter"] },
];

export default function App() {
  const [activeFinish, setActiveFinish] = useState(0);

  return (
    <div className="page">
      <div className="announce">COMING SOON — FREE US SHIPPING</div>

      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-dot" />
          PART-TIME LABS
        </div>
        <div className="nav-links">
          <a href="#how">HOW IT WORKS</a>
          <a href="#specs">SPECS</a>
          <a href="#gallery">GALLERY</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="nav-order" href="#order">
          ORDER {PRICE}
        </a>
      </nav>

      <Hero orderLabel={`ORDER — ${PRICE}`} />

      <div className="marquee">
        <div className="marquee-track">
          {MARQUEE}
          {MARQUEE}
        </div>
      </div>

      {/* 5. The Unit */}
      <Reveal className="unit">
        <div className="unit-head">
          <h2 className="h-display">THE UNIT</h2>
          <div className="finish-row">
            <span>FINISH:</span>
            {FINISHES.map((finish, i) => (
              <button
                key={finish.name}
                type="button"
                className={`swatch ${i === activeFinish ? "is-active" : ""}`}
                style={{ background: finish.swatch }}
                onClick={() => setActiveFinish(i)}
                aria-label={finish.name}
                aria-pressed={i === activeFinish}
              />
            ))}
          </div>
        </div>
        <div className="unit-grid">
          <div className="card card-featured">
            <div className="slot slot-4x3 slot-eink">
              DEVICE — FRONT · {FINISHES[activeFinish].name}
            </div>
            <div className="card-caption caption-magenta">4.2" GLASS · 16 GREYS</div>
          </div>
          <div className="card card-cyan">
            <div className="slot slot-4x3">DEVICE — BACK</div>
            <div className="card-caption caption-cyan">MAGNET + KICKSTAND</div>
          </div>
          <div className="card card-cyan">
            <div className="slot slot-4x3">IN HAND</div>
            <div className="card-caption caption-cyan">3.2 OZ · POCKETABLE</div>
          </div>
        </div>
      </Reveal>

      {/* 6. How it works */}
      <Reveal className="steps" >
        <div id="how" className="anchor" />
        {STEPS.map((step) => (
          <div key={step.label} className="step">
            <div className="step-label" style={{ color: step.color }}>
              {step.label}
            </div>
            <p>{step.body}</p>
          </div>
        ))}
      </Reveal>

      {/* 7. No cloud + spec sheet */}
      <Reveal className="cloud">
        <div id="specs" className="anchor" />
        <div>
          <h2 className="h-display h-cloud">
            NO CLOUD.
            <br />
            <span>NO ACCOUNT.</span>
          </h2>
          <p className="cloud-body">
            The app talks straight to the tile over Bluetooth and then shuts up. Your pictures never
            leave your phone, there is no subscription, and the firmware is open if you would rather
            write your own.
          </p>
          <div className="chips">
            <span>NO SUBSCRIPTION</span>
            <span>NO ACCOUNT</span>
            <span>OPEN FIRMWARE</span>
            <span>REPAIRABLE</span>
          </div>
        </div>
        <div className="spec-card">
          <div className="spec-title">SPEC SHEET</div>
          <div className="spec-rows">
            {SPECS.map(([label, value]) => (
              <div key={label} className="spec-row">
                <span className="spec-label">{label}</span>
                <span className={label === "GUTS" ? "spec-accent" : undefined}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 8. The App */}
      <Reveal className="app-band">
        <h2 className="h-display h-cyan">THE APP</h2>
        <p className="band-sub">Free, iOS and Android, no sign-up screen anywhere in it.</p>
        <div className="app-grid">
          {APP_SCREENS.map((screen) => (
            <div key={screen.slot}>
              <div className={`slot slot-9x16 ${screen.featured ? "slot-magenta" : "slot-cyan"}`}>
                {screen.slot}
              </div>
              <div className={`card-caption ${screen.featured ? "caption-magenta" : "caption-mute"}`}>
                {screen.caption}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 9. In the box */}
      <Reveal className="box">
        <div>
          <h2 className="h-display h-yellow h-32">IN THE BOX</h2>
          <div className="box-list">
            {BOX.map((item, i) => (
              <div key={item} className="box-row">
                <span className="box-index">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-faint">
          <div className="slot slot-4x3">BOX CONTENTS — FLAT LAY</div>
        </div>
      </Reveal>

      {/* 10. The Wall */}
      <Reveal className="wall">
        <div id="gallery" className="anchor" />
        <div className="wall-head">
          <h2 className="h-display h-cyan h-neon">THE WALL</h2>
          <span className="wall-count">Pictures going up every week</span>
        </div>
        <div className="wall-grid">
          <div className="slot slot-1x1 slot-purple">WALL 01</div>
          <div className="slot slot-1x1 slot-purple">WALL 02</div>
          <div className="slot slot-1x1 slot-purple">WALL 03</div>
          <div className="wall-cta">
            <span className="wall-cta-title">SHOW US YOURS</span>
            <span className="wall-cta-tag">#STICKYPIX</span>
          </div>
        </div>
      </Reveal>

      {/* 11. Pricing */}
      <Reveal className="pricing">
        <h2 className="h-display h-center">PICK YOUR LOADOUT</h2>
        <div className="bundle-grid">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.tier}
              className={`bundle ${bundle.featured ? "bundle-featured" : ""}`}
            >
              {bundle.featured && <div className="bundle-tab">MOST PICKED</div>}
              <div className="bundle-tier" style={{ color: bundle.tierColor }}>
                {bundle.tier}
              </div>
              <div className="bundle-price">{PRICE}</div>
              <div className="bundle-blurb">{bundle.blurb}</div>
              <a
                className={bundle.featured ? "bundle-cta-solid" : "bundle-cta-ghost"}
                href="#order"
              >
                ADD TO CART
              </a>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 12. Press */}
      <Reveal className="press">
        {QUOTES.map((item) => (
          <div key={item.source} className="quote" style={{ borderLeftColor: item.rule }}>
            <p>"{item.quote}"</p>
            <div className="quote-source">{item.source}</div>
          </div>
        ))}
      </Reveal>

      {/* 13. FAQ */}
      <Reveal className="faq">
        <div id="faq" className="anchor" />
        <h2 className="h-display h-32">QUESTIONS</h2>
        <div className="faq-list">
          {FAQ.map(([question, answer]) => (
            <div key={question} className="faq-row">
              <span className="faq-q">{question}</span>
              <span className="faq-a">{answer}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 14. Order panel */}
      <Reveal className="order">
        <div id="order" className="anchor" />
        <div className="order-copy">
          <div className="order-title">
            READY
            <br />
            PLAYER ONE?
          </div>
          <p>
            One tile, one app, one cable in the box. Reserve yours now — shipping details coming
            soon, free in the US.
          </p>
        </div>
        <div className="order-buy">
          <div className="order-price">{PRICE}</div>
          <div className="order-stock">COMING SOON</div>
          <a className="order-cta" href={`mailto:${EMAIL}`}>
            ORDER NOW
          </a>
        </div>
      </Reveal>

      {/* 15. Contact band */}
      <Reveal className="contact">
        <div>
          <div className="contact-title">
            A SMALL TEAM.
            <br />
            ONE SOLDERING IRON.
          </div>
          <p>
            Part-Time Labs builds small strange objects after hours in California. Questions, bulk
            orders, or just want to say hi — a human answers, usually same day.
          </p>
        </div>
        <div>
          <div className="capture">
            <input type="email" placeholder="you@email.com" aria-label="Email address" />
            <button type="button">ENTER</button>
          </div>
          <div className="contact-meta">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · California
          </div>
        </div>
      </Reveal>

      {/* 16. Footer */}
      <footer className="footer">
        <div>
          <div className="footer-brand">
            <span />
            PART-TIME LABS
          </div>
          <p>Small-batch hardware, made after hours in California.</p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.head} className="footer-col">
            <div className="footer-head">{column.head}</div>
            {column.links.map((link) => (
              <a key={link} href="#top">
                {link}
              </a>
            ))}
          </div>
        ))}
      </footer>
      <div className="legal">
        <span>© 2026 PART-TIME LABS</span>
        <span>PRIVACY · TERMS · MADE IN CA</span>
      </div>
    </div>
  );
}
