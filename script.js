/* ==========================================================================
   NAILS BY MEHAK — shared site script
   ========================================================================== */

const WHATSAPP_NUMBER = "919517769054"; // international format, no + or spaces

/* ---------- Service data (single source of truth, matches price list) ---------- */
const SERVICES = [
  {
    id: "shellac",
    name: "Shellac Nails",
    short: "A mix of gel and polish on natural nails. Shiny and chip-free.",
    priceOne: 120,
    priceBoth: 200,
    from: 120,
    ph: "ph-shellac",
    icon: "polish",
    duration: "Lasts 2–3 weeks",
    full: "Shellac is a gel-polish hybrid applied directly onto your natural nails, cured under LED light for a glass-like, chip-resistant shine. No added length — just your own nails, elevated. It's the perfect low-maintenance way to keep your hands looking polished for weeks at a time.",
    benefits: [
      "Shiny, glass-like finish that lasts 2–3 weeks",
      "Chip-resistant and quick-drying",
      "Gentle on natural nails, no added length",
      "Wide range of shades and finishes"
    ],
    aftercare: [
      "Avoid picking or peeling the polish off",
      "Apply cuticle oil daily to keep nails hydrated",
      "Wear gloves for household chores",
      "Book a removal appointment rather than removing at home"
    ]
  },
  {
    id: "press-on",
    name: "Press On Nails",
    short: "Reusable handmade press-on sets, glued or stuck on in minutes.",
    priceOne: 150,
    priceBoth: 300,
    from: 150,
    ph: "ph-pressOn",
    icon: "press",
    duration: "Lasts 2–7 days (reusable)",
    full: "Ready-made, hand-painted nail sets custom fitted to your nail bed. Press-ons are glued or stuck on in minutes — ideal when you want salon-quality nail art without the wait, and want the freedom to remove them yourself whenever you like.",
    benefits: [
      "Quick application, ready in minutes",
      "Handmade nail art designs to choose from",
      "Easy to remove and reuse for another occasion",
      "No damage to your natural nails"
    ],
    aftercare: [
      "Store your set safely if removed for reuse",
      "Avoid soaking hands for long periods",
      "Use the provided adhesive tabs or glue for the best hold",
      "Remove gently by soaking in warm water"
    ]
  },
  {
    id: "temporary-extension",
    name: "Temporary Nail Extension",
    short: "Adds length for a short while — perfect for events and functions.",
    priceOne: 200,
    priceBoth: 400,
    from: 200,
    ph: "ph-temp",
    icon: "extension",
    duration: "Lasts about 1 week",
    full: "Need length for a wedding, party or shoot but don't want a long-term commitment? Temporary extensions give you the elegant, extended nail look for about a week, and come off easily without a salon visit.",
    benefits: [
      "Instant length for special occasions",
      "Easy to remove at home",
      "Lighter on the nail bed than permanent extensions",
      "Fully customisable shape and art"
    ],
    aftercare: [
      "Avoid using nails as tools",
      "Keep nails dry for the first few hours",
      "Moisturise cuticles regularly",
      "Remove gently — don't force them off"
    ]
  },
  {
    id: "acrylic-extension",
    name: "Permanent Acrylic Extension",
    short: "Strong, long-lasting extensions that can be refilled.",
    priceOne: 300,
    priceBoth: 600,
    from: 300,
    ph: "ph-acrylic",
    icon: "extension",
    duration: "Lasts 3–5 weeks, refillable",
    full: "Acrylic extensions are the classic choice for strength and durability. Sculpted onto your natural nail, they hold shape beautifully and can be refilled as your nails grow, keeping your set looking fresh for weeks on end.",
    benefits: [
      "Strong and durable — great for everyday hands",
      "Refillable, so your set keeps evolving",
      "Wide range of shapes: almond, coffin, square and more",
      "Holds intricate nail art exceptionally well"
    ],
    aftercare: [
      "Book a fill every 3 weeks for the best finish",
      "Avoid using nails to open or pry objects",
      "Moisturise cuticles and hands daily",
      "Always get extensions removed professionally in-salon"
    ]
  },
  {
    id: "gel-extension",
    name: "Permanent Gel Extension",
    short: "Premium gel extensions with a natural, glossy finish.",
    priceOne: 300,
    priceBoth: 600,
    from: 300,
    ph: "ph-gel",
    icon: "extension",
    duration: "Lasts 3–5 weeks, refillable",
    full: "Gel extensions offer a lighter, more natural-looking alternative to acrylic, with a glossy finish straight off the lamp. They're flexible, comfortable to wear, and hold colour and nail art beautifully for weeks.",
    benefits: [
      "Lightweight and comfortable, natural look and feel",
      "Glossy finish that doesn't need a top coat",
      "Refillable and long-lasting",
      "Gentle flex reduces breakage"
    ],
    aftercare: [
      "Refill every 3–5 weeks to maintain shape",
      "Avoid prolonged water exposure without gloves",
      "Use cuticle oil to keep the surrounding skin healthy",
      "Have extensions soaked off professionally, never picked"
    ]
  }
];

/* ---------- Utility: currency ---------- */
const inr = (n) => `₹${n}`;

/* ---------- Icon SVGs (inline, gold line-art) ---------- */
const ICONS = {
  polish: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M24 6h16l2 10-4 4v30a6 6 0 01-6 6h-0a6 6 0 01-6-6V20l-4-4 2-10z"/><path d="M24 20h16" /></svg>`,
  press: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="10" y="10" width="44" height="30" rx="4"/><path d="M18 46c2 6 6 10 14 10s12-4 14-10" /></svg>`,
  extension: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M32 6c6 10 12 20 12 30a12 12 0 01-24 0c0-10 6-20 12-30z"/></svg>`,
  hand: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 30V14a4 4 0 018 0v12M28 26V10a4 4 0 018 0v16M36 26V12a4 4 0 018 0v20M44 26v4a4 4 0 018 0v12c0 10-8 18-18 18H30c-6 0-9-3-12-8l-6-11c-2-4 1-8 5-6l5 3V30" /></svg>`,
  spark: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M32 8l5 17 17 5-17 5-5 17-5-17-17-5 17-5z"/></svg>`,
  heart: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M32 54S10 40 10 24a12 12 0 0122-7 12 12 0 0122 7c0 16-22 30-22 30z"/></svg>`,
  cert: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="32" cy="24" r="14"/><path d="M24 36l-4 20 12-6 12 6-4-20"/></svg>`,
  ring: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="10"/></svg>`,
};
function iconMarkup(name){ return ICONS[name] || ICONS.spark; }

/* ---------- Header / Footer active link + mobile nav ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links){
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach(a => {
    if (a.dataset.page === path) a.classList.add("active");
  });

  const header = document.querySelector(".site-header");
  if (header){
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 20 ? "0 10px 30px rgba(0,0,0,.35)" : "none";
    });
  }
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const els = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!("IntersectionObserver" in window)){ els.forEach(el => el.classList.add("in")); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* ---------- Button ripple ---------- */
function initRipple(){
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function(e){
      const circle = document.createElement("span");
      const d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = d + "px";
      const rect = this.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left - d/2) + "px";
      circle.style.top = (e.clientY - rect.top - d/2) + "px";
      circle.classList.add("ripple");
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}

/* ---------- Render service cards (Home + Services pages) ---------- */
function renderServiceCards(containerId, limit){
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  el.innerHTML = list.map(s => `
    <div class="card reveal">
      <div class="card-media">
        <div class="ph ${s.ph}">${iconMarkup(s.icon)}</div>
        <span class="card-price-tag">From ${inr(s.from)}</span>
      </div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <p>${s.short}</p>
        <div class="card-foot">
          <span class="from">${s.duration}</span>
          <a class="card-link" href="service-details.html?service=${s.id}">View More →</a>
        </div>
      </div>
    </div>
  `).join("");
  document.querySelectorAll(`#${containerId} .reveal`).forEach(c => c.classList.add("in"));
}

/* ---------- Home services slider (arrow controlled) ---------- */
function initServicesSlider(){
  const track = document.getElementById("home-services-grid");
  const prevBtn = document.getElementById("services-prev");
  const nextBtn = document.getElementById("services-next");
  const dotsWrap = document.getElementById("services-dots");
  if (!track || !prevBtn || !nextBtn) return;

  const cards = () => Array.from(track.children);
  const step = () => {
    const c = track.querySelector(".card");
    if (!c) return 300;
    const gap = parseFloat(getComputedStyle(track).gap) || 28;
    return c.getBoundingClientRect().width + gap;
  };

  // build dots
  function buildDots(){
    if (!dotsWrap) return;
    dotsWrap.innerHTML = cards().map((_, i) => `<button class="dot${i === 0 ? " active" : ""}" data-idx="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("");
  }
  buildDots();

  function activeIndex(){
    return Math.round(track.scrollLeft / step());
  }

  function updateDots(){
    if (!dotsWrap) return;
    const idx = activeIndex();
    dotsWrap.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  function goTo(idx){
    const max = cards().length - 1;
    const clamped = Math.max(0, Math.min(idx, max));
    track.scrollTo({ left: clamped * step(), behavior: "smooth" });
  }

  nextBtn.addEventListener("click", () => {
    const max = track.scrollWidth - track.clientWidth - 4;
    if (track.scrollLeft >= max){
      track.scrollTo({ left: 0, behavior: "smooth" }); // loop back to start
    } else {
      track.scrollBy({ left: step(), behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (track.scrollLeft <= 4){
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" }); // loop to end
    } else {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    }
  });

  if (dotsWrap){
    dotsWrap.addEventListener("click", (e) => {
      const dot = e.target.closest(".dot");
      if (!dot) return;
      goTo(+dot.dataset.idx);
    });
  }

  let scrollTimer;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateDots, 80);
  });

  // rebuild dots if card count changes after data render
  buildDots();
}

/* ---------- Render service detail page ---------- */
function renderServiceDetail(){
  const mount = document.getElementById("service-detail-mount");
  if (!mount) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("service") || SERVICES[0].id;
  const s = SERVICES.find(x => x.id === id) || SERVICES[0];

  document.title = `${s.name} — Nails By Mehak`;

  mount.innerHTML = `
    <div class="detail-media ${s.ph}">
      <div class="ph">${iconMarkup(s.icon)}</div>
    </div>
    <div class="detail-body">
      <span class="eyebrow" style="text-align:left">Service</span>
      <h2>${s.name}</h2>
      <p>${s.full}</p>
      <div class="price-box">
        <div class="price-pill"><div class="amt">${inr(s.priceOne)}</div><div class="lbl">One Hand</div></div>
        <div class="price-pill"><div class="amt">${inr(s.priceBoth)}</div><div class="lbl">Both Hands</div></div>
        <div class="price-pill"><div class="amt" style="font-size:16px;padding-top:6px">${s.duration}</div><div class="lbl">Duration</div></div>
      </div>
      <div class="detail-list">
        <h4>Benefits</h4>
        <ul>${s.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
      <div class="detail-list">
        <h4>Aftercare</h4>
        <ul>${s.aftercare.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
      <div class="detail-actions">
        <a class="btn btn-gold" href="contact.html#appointment">Book Now</a>
        <a class="btn btn-outline" style="color:var(--ink);border-color:var(--gold-deep)" target="_blank" rel="noopener"
           href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Mehak, I'd like to know more about ${s.name}.`)}">WhatsApp</a>
        <a class="btn btn-dark" href="tel:+919517769054">Call Now</a>
      </div>
    </div>
  `;

  // populate "other services" strip if present
  const otherMount = document.getElementById("other-services");
  if (otherMount){
    otherMount.innerHTML = SERVICES.filter(x => x.id !== s.id).map(o => `
      <a class="card reveal" href="service-details.html?service=${o.id}" style="text-decoration:none">
        <div class="card-media"><div class="ph ${o.ph}">${iconMarkup(o.icon)}</div>
          <span class="card-price-tag">From ${inr(o.from)}</span>
        </div>
        <div class="card-body"><h3 style="font-size:19px">${o.name}</h3><p>${o.short}</p></div>
      </a>
    `).join("");
    document.querySelectorAll(`#other-services .reveal`).forEach(c => c.classList.add("in"));
  }
}

/* ---------- Appointment form -> WhatsApp + redirect ---------- */
function initAppointmentForm(){
  const form = document.getElementById("appointment-form");
  if (!form) return;

  // populate service select from data
  const select = form.querySelector("#service-select");
  if (select){
    SERVICES.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name;
      select.appendChild(opt);
    });
  }
  // pre-select via ?service= if present
  const params = new URLSearchParams(location.search);
  const pre = params.get("service");
  if (pre && select){
    const match = SERVICES.find(s => s.id === pre);
    if (match) select.value = match.name;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = form.fullname.value.trim();
    const mobile = form.mobile.value.trim();
    const service = form.service.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.message.value.trim() || "—";

    const text =
`Hello Mehak,
New Appointment Request

Name: ${name}
Mobile: ${mobile}
Selected Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}
Message: ${message}

Please contact the customer.`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener");
    window.location.href = "thankyou.html";
  });
}

/* ---------- Contact form (general enquiry) -> WhatsApp ---------- */
function initContactForm(){
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = form.cname.value.trim();
    const mobile = form.cmobile.value.trim();
    const message = form.cmessage.value.trim() || "—";
    const text = `Hello Mehak,\nEnquiry from website\n\nName: ${name}\nMobile: ${mobile}\nMessage: ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    window.location.href = "thankyou.html";
  });
}

/* ---------- Gallery filter + lightbox ---------- */
const GALLERY = [
  { cat: "Shellac", ph: "ph-shellac", icon: "polish", title: "Soft Nude Shellac" },
  { cat: "Extensions", ph: "ph-acrylic", icon: "extension", title: "Ruby Red Acrylic" },
  { cat: "Press On", ph: "ph-pressOn", icon: "press", title: "Cherry Press-On Set" },
  { cat: "Bridal Nails", ph: "ph-bridal", icon: "ring", title: "Ivory Bridal Set" },
  { cat: "Party Nails", ph: "ph-party", icon: "spark", title: "Wine Party Glam" },
  { cat: "Luxury Nails", ph: "ph-luxury", icon: "heart", title: "Gold Chrome Luxe" },
  { cat: "Extensions", ph: "ph-gel", icon: "extension", title: "Glossy Gel Almond" },
  { cat: "Shellac", ph: "ph-temp", icon: "polish", title: "Blush Shellac Swirl" },
  { cat: "Bridal Nails", ph: "ph-luxury", icon: "ring", title: "Gold Foil Bridal" },
  { cat: "Party Nails", ph: "ph-pressOn", icon: "spark", title: "Black & Gold Glam" },
  { cat: "Luxury Nails", ph: "ph-acrylic", icon: "heart", title: "Marble Chrome Set" },
  { cat: "Press On", ph: "ph-gel", icon: "press", title: "Floral Press-On" }
];

function initGallery(){
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  const filterBar = document.getElementById("filter-bar");
  const lightbox = document.getElementById("lightbox");
  const lightboxInner = lightbox ? lightbox.querySelector(".lightbox-inner") : null;

  function draw(items){
    grid.innerHTML = items.map((g, i) => `
      <div class="gallery-tile reveal ${i % 5 === 0 ? "tall" : ""}" data-idx="${i}">
        <div class="ph ${g.ph}">${iconMarkup(g.icon)}</div>
        <div class="label">${g.title}</div>
      </div>
    `).join("");
    grid.querySelectorAll(".reveal").forEach(c => c.classList.add("in"));
    grid.querySelectorAll(".gallery-tile").forEach(tile => {
      tile.addEventListener("click", () => {
        const g = items[+tile.dataset.idx];
        if (lightboxInner){
          lightboxInner.querySelector(".ph").outerHTML = `<div class="ph ${g.ph}">${iconMarkup(g.icon)}</div>`;
          lightbox.classList.add("open");
        }
      });
    });
  }

  draw(GALLERY);

  if (filterBar){
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      draw(cat === "All" ? GALLERY : GALLERY.filter(g => g.cat === cat));
    });
  }

  if (lightbox){
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) lightbox.classList.remove("open");
    });
  }
}

/* ---------- Footer year ---------- */
function initYear(){
  document.querySelectorAll(".footer-year").forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------- Init all ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderServiceCards("home-services-grid", 5);
  initServicesSlider();
  renderServiceCards("all-services-grid");
  renderServiceDetail();
  initAppointmentForm();
  initContactForm();
  initGallery();
  initYear();
  initReveal();
  initRipple();
});
