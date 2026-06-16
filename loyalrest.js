/* ===================================================================
   LoyalRest — interaktiv prototip (vanilla JS · HTML-string render)
   Layihə idiomu ilə eyni: funksiyalar HTML qurur, router #lr-app-i yeniləyir.
   Bütün mətn Azərbaycan dilindədir.
   =================================================================== */
(function () {
"use strict";

/* ─────────────────────────── İkonlar (inline SVG) ─────────────── */
const I = {
  logo: (c = "#fff") => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3.2"/><circle cx="16" cy="8" r="3.2"/><circle cx="8" cy="16" r="3.2"/><path d="M13 13.5l2.5 2.5 4-4.5"/></svg>`,
  back: (c = "var(--ink)") => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l-6 6 6 6"/></svg>`,
  chevR: (c = "var(--mute)") => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  chevD: (c = "var(--ink2)") => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  star: () => `<svg width="11" height="11" viewBox="0 0 24 24" fill="var(--brand)"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.05.99 5.75L12 16.7l-5.19 2.7.99-5.75L3.6 9.6l5.8-.8z"/></svg>`,
  ratStar: () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="#E8A93C"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z"/></svg>`,
  qr: (c = "#fff", s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="6" height="6" rx="1.5"/><rect x="14.5" y="3.5" width="6" height="6" rx="1.5"/><rect x="3.5" y="14.5" width="6" height="6" rx="1.5"/><path d="M14.5 14.5h3v3M20.5 14.5v6M17.5 20.5h3"/></svg>`,
  search: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.8-3.8"/></svg>`,
  bell: (c = "var(--ink)") => `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`,
  heart: (c = "var(--brand)") => `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20S4 14.5 4 9.2A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 8 2.2C20 14.5 12 20 12 20Z"/></svg>`,
  ticket: (c = "#E8A93C", s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10.5" width="16" height="9.5" rx="1.6"/><path d="M3 7.5h18v3.2H3z"/><path d="M12 7.5V20"/></svg>`,
  pin: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.5-6.5-10a6.5 6.5 0 0 1 13 0c0 4.5-6.5 10-6.5 10Z"/><circle cx="12" cy="11" r="2.3"/></svg>`,
  clock: (c = "var(--brand)") => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  close: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  bolt: () => `<svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>`,
  filter: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>`,
  check: (c = "#2E8A66", s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  medal: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M5 18h14l1.5-9-4.5 3-3.5-6-3.5 6L4.5 9z"/></svg>`,
  user: (c = "var(--ink2)", s = 21) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6"/></svg>`,
  globe: () => `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--ink2)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.7 2.5 14.3 0 17M12 3.5c-2.5 2.7-2.5 14.3 0 17"/></svg>`,
  help: () => `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--ink2)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.6-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r="0.6" fill="var(--ink2)"/></svg>`,
  gift: (c = "#2E8A66") => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>`,
  mega: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber-deep)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15 8.5a4 4 0 0 1 0 7"/></svg>`,
};

// Status bar (qaranlıq=true → ağ ikonlar, QR ekranı üçün)
function statusBar(dark) {
  const c = dark ? "#fff" : "var(--ink)";
  const op = dark ? "0.5" : "0.35";
  return `<div class="lr-status"><span class="clock" style="color:${c}">9:41</span><div class="icons">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="${c}"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="8" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round"><path d="M2 4.2a10 10 0 0 1 13 0"/><path d="M4.6 7a6 6 0 0 1 7.8 0"/></svg>
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.6" y="0.6" width="21.8" height="11.8" rx="3" stroke="${c}" stroke-width="1.1" opacity="${op}"/><rect x="2.3" y="2.3" width="15" height="8.4" rx="1.6" fill="${c}"/><rect x="24" y="4.2" width="2" height="4.6" rx="1" fill="${c}" opacity="${op}"/></svg>
  </div></div>`;
}

// Tab bar — aktiv: home|discover|qr|gifts|profile
function tabBar(active) {
  const homeIco = (c) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5"/><path d="M5.6 9.6V20h12.8V9.6"/><path d="M9.6 20v-4.6h4.8V20"/></svg>`;
  const discIco = (c) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4z"/></svg>`;
  const giftIco = (c) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10.5" width="16" height="9.5" rx="1.6"/><path d="M3 7.5h18v3.2H3z"/><path d="M12 7.5V20"/><path d="M12 7.5C12 7.5 11 4 8.7 4.6 7 5 7.3 7.5 12 7.5ZM12 7.5C12 7.5 13 4 15.3 4.6 17 5 16.7 7.5 12 7.5Z"/></svg>`;
  const profIco = (c) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6"/></svg>`;
  const on = "#D9492E", off = "#B5AAA0";
  const item = (key, ico, label) =>
    `<button class="lr-tab ${active === key ? "active" : ""}" data-nav="${key}">${ico(active === key ? on : off)}<span>${label}</span></button>`;
  return `<div class="lr-tabbar">
    ${item("home", homeIco, "Ana")}
    ${item("discover", discIco, "Kəşf")}
    <button class="lr-tab" data-nav="scan"><div class="lr-tab-qr">${I.qr("#fff", 26)}</div><span>QR</span></button>
    ${item("gifts", giftIco, "Hədiyyələr")}
    ${item("profile", profIco, "Profil")}
  </div>`;
}

// Ştamp grid — cari/hedef. opts: {cols, size, gift, showNextNum}
function stampGrid(cari, hedef, opts) {
  opts = opts || {};
  const cols = opts.cols || 5;
  const sz = opts.size || 15;
  const rot = [-6, 5, -3, 4, -5, 3, -4, 6, -2, 4];
  let html = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:${opts.gap || 12}px">`;
  for (let i = 1; i <= hedef; i++) {
    const r = rot[(i - 1) % rot.length];
    if (i <= cari) {
      html += `<div class="lr-stamp filled" style="transform:rotate(${r}deg)">${i > cari ? "" : `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="var(--brand)"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.05.99 5.75L12 16.7l-5.19 2.7.99-5.75L3.6 9.6l5.8-.8z"/></svg>`}</div>`;
    } else if (opts.gift && i === hedef) {
      html += `<div class="lr-stamp gift">${I.ticket("#E8A93C", Math.round(sz * 1.05))}</div>`;
    } else if (opts.showNextNum && i === cari + 1) {
      html += `<div class="lr-stamp next" style="font-size:14px">${i}</div>`;
    } else {
      html += `<div class="lr-stamp empty"></div>`;
    }
  }
  return html + `</div>`;
}

/* ─────────────────────────── Məlumat (state) ──────────────────── */
const state = {
  userName: "Aysel",
  notifications: true,
  giftTab: "active",
  scanTarget: "doner",
  restaurants: {
    doner:  { id:"doner",  ad:"Dönər Evi",  kat:"Fast-food", mesafe:"0.4 km", herf:"D", bg:"var(--brand-soft)", fg:"var(--brand-dark)", cari:7, hedef:10, reyting:"4.8", rey:320, kampaniya:"10 al, 1 pulsuz", hediyye:"1 Pulsuz Dönər", unvan:"Nizami küç. 12, Bakı", saat:"09:00 – 23:00", stripe:"var(--brand-soft)" },
    pizza:  { id:"pizza",  ad:"Pizza Roma",  kat:"Pizza",     mesafe:"1.2 km", herf:"P", bg:"var(--green-soft)", fg:"var(--green)", cari:4, hedef:8, reyting:"4.7", rey:210, kampaniya:"2 al, 1 ödə", hediyye:"1 Pulsuz Pizza", unvan:"Fəttah küç. 8, Bakı", saat:"10:00 – 23:30" },
    cay:    { id:"cay",    ad:"Çay Bağı",    kat:"Çay evi",   mesafe:"0.8 km", herf:"Ç", bg:"var(--amber-soft)", fg:"var(--amber-deep)", cari:9, hedef:10, reyting:"4.6", rey:188, kampaniya:"8 al, 1 pulsuz", hediyye:"1 Pulsuz Çaynik", unvan:"Bülbül pr. 24, Bakı", saat:"08:00 – 24:00" },
    burger: { id:"burger", ad:"Burger Lab",  kat:"Fast-food", mesafe:"1.5 km", herf:"B", bg:"var(--blue-soft)", fg:"var(--blue)", cari:2, hedef:6, reyting:"4.5", rey:96, kampaniya:"6 al, 1 pulsuz", hediyye:"1 Pulsuz Burger", unvan:"28 May küç. 3, Bakı", saat:"11:00 – 23:00" },
  },
  coupons: [
    { rest:"doner", ad:"1 Pulsuz Dönər", son:"30 İyun 2026", stripe:"var(--brand)", status:"active" },
    { rest:"cay",   ad:"1 Pulsuz Çaynik", son:"5 İyul 2026", stripe:"var(--amber)", status:"active" },
    { rest:"pizza", ad:"Orta Pizza −50%", son:"12 İyun", status:"used" },
  ],
};
const R = (id) => state.restaurants[id];

/* ─────────────────────────── Ortaq parçalar ───────────────────── */
function avatar(r, size) {
  size = size || 48;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${r.bg};color:${r.fg};font-weight:800;font-size:${Math.round(size*0.37)}px;display:flex;align-items:center;justify-content:center">${r.herf}</div>`;
}

/* ─────────────────────────── Ekranlar ─────────────────────────── */
const screens = {};

/* 1 · Onboarding */
screens.onboarding = () => `
  <div class="lr-screen active" data-screen="onboarding" style="background:linear-gradient(180deg,#FFF3EC 0%,var(--bg) 52%)">
    ${statusBar(false)}
    <div style="flex:1;display:flex;flex-direction:column;padding:6px 28px 32px;min-height:0">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:9px;background:var(--brand);display:flex;align-items:center;justify-content:center">${I.logo()}</div><span style="font-weight:800;font-size:16px">LoyalRest</span></div>
        <span class="lr-textbtn" data-nav="phone" style="font-size:14px;color:var(--ink2)">Keç</span>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0">
        <div style="width:228px;background:#fff;border-radius:26px;padding:22px;box-shadow:0 26px 52px -14px rgba(217,73,46,0.32);border:1px solid var(--line);animation:lr-float 5s ease-in-out infinite">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">${avatar(R("doner"),38)}<div style="flex:1"><div style="font-weight:700;font-size:14px">Dönər Evi</div><div style="font-size:11px;color:var(--mute);font-weight:500">Fast-food</div></div><div style="font-size:13px;font-weight:800;color:var(--brand)">8/10</div></div>
          ${stampGrid(8, 10, { cols:5, size:11, gap:9, gift:false })}
          <div style="margin-top:16px;font-size:12px;font-weight:700;color:var(--brand);text-align:center">Hədiyyəyə 2 ştamp qaldı 🎉</div>
        </div>
      </div>
      <div style="margin-top:4px">
        <h1 style="font-size:27px;font-weight:800;line-height:1.18;letter-spacing:-0.02em">Hər ziyarət səni<br>hədiyyəyə yaxınlaşdırır</h1>
        <p style="margin-top:12px;font-size:15px;line-height:1.5;color:var(--ink2);font-weight:500">Sevdiyin restoranların loyallıq kartları bir tətbiqdə. QR skan et, ştamp topla, pulsuz hədiyyələr qazan.</p>
      </div>
      <div style="display:flex;gap:7px;margin:24px 0 18px"><div style="width:24px;height:7px;border-radius:9px;background:var(--brand)"></div><div style="width:7px;height:7px;border-radius:9px;background:#E0D5CA"></div></div>
      <button class="lr-btn lr-btn-primary" data-nav="phone">Başla</button>
      <div style="text-align:center;margin-top:16px;font-size:14px;color:var(--ink2);font-weight:500">Artıq hesabın var? <span class="lr-link" style="display:inline" data-nav="phone">Daxil ol</span></div>
    </div>
  </div>`;

/* 2 · Giriş — telefon */
screens.phone = () => `
  <div class="lr-screen active" data-screen="phone">
    ${statusBar(false)}
    <div style="flex:1;display:flex;flex-direction:column;padding:10px 28px 30px">
      <button class="lr-iconbtn" data-nav="onboarding">${I.back()}</button>
      <h1 class="h1" style="font-size:25px;margin-top:26px">Telefon nömrən</h1>
      <p style="margin-top:10px;font-size:15px;line-height:1.5;color:var(--ink2);font-weight:500">Hesabına daxil olmaq üçün sənə SMS ilə təsdiq kodu göndərəcəyik.</p>
      <div style="margin-top:30px;font-size:13px;font-weight:700;color:var(--ink2)">Telefon nömrəsi</div>
      <div style="display:flex;gap:10px;margin-top:10px">
        <div style="display:flex;align-items:center;gap:7px;padding:16px 14px;border:1px solid var(--line);border-radius:15px;background:#fff;font-weight:700;font-size:16px"><span>🇦🇿</span>+994 ${I.chevD()}</div>
        <input class="lr-input" id="lr-phone-input" inputmode="numeric" autocomplete="off" placeholder="50 123 45 67" value="50 123 45 67">
      </div>
      <div style="flex:1"></div>
      <p style="font-size:12px;color:var(--mute);text-align:center;line-height:1.5;margin-bottom:16px">Davam edərək <span style="color:var(--ink2);font-weight:700">İstifadə şərtləri</span> və <span style="color:var(--ink2);font-weight:700">Məxfilik siyasəti</span> ilə razılaşırsan.</p>
      <button class="lr-btn lr-btn-primary" data-nav="otp">Davam et</button>
    </div>
  </div>`;

/* 2b · OTP */
screens.otp = () => `
  <div class="lr-screen active" data-screen="otp">
    ${statusBar(false)}
    <div style="flex:1;display:flex;flex-direction:column;padding:10px 28px 30px">
      <button class="lr-iconbtn" data-nav="phone">${I.back()}</button>
      <h1 class="h1" style="font-size:25px;margin-top:26px">Kodu daxil et</h1>
      <p style="margin-top:10px;font-size:15px;line-height:1.5;color:var(--ink2);font-weight:500"><span style="color:var(--ink);font-weight:700">+994 50 *** 45 67</span> nömrəsinə göndərilən 4 rəqəmli kodu yaz.</p>
      <div style="display:flex;gap:12px;margin-top:34px" id="lr-otp-row">
        <input class="lr-otp-box" maxlength="1" inputmode="numeric" data-otp="0">
        <input class="lr-otp-box" maxlength="1" inputmode="numeric" data-otp="1">
        <input class="lr-otp-box" maxlength="1" inputmode="numeric" data-otp="2">
        <input class="lr-otp-box" maxlength="1" inputmode="numeric" data-otp="3">
      </div>
      <div style="text-align:center;margin-top:26px;font-size:14px;color:var(--ink2);font-weight:500">Kod gəlmədi? <span id="lr-resend" style="color:var(--mute);font-weight:700">Yenidən göndər (0:42)</span></div>
      <div style="flex:1"></div>
      <button class="lr-btn lr-btn-primary" data-nav="home">Təsdiqlə</button>
    </div>
  </div>`;

/* 3 · Ana səhifə */
screens.home = () => {
  const hero = R("cay");
  const featured = ["doner", "pizza", "cay"].map((id) => {
    const r = R(id), grad = id === "pizza" ? "#EEF3EC,#EEF3EC 9px,#E6EFE6 9px,#E6EFE6 18px" : id === "cay" ? "#F5EFE0,#F5EFE0 9px,#F0E7D2 9px,#F0E7D2 18px" : "#F4EDE4,#F4EDE4 9px,#EEE5DB 9px,#EEE5DB 18px";
    return `<div data-rest="${r.id}" style="flex:none;width:174px;background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 6px 18px -8px rgba(40,20,10,0.1);cursor:pointer">
      <div style="position:relative;height:96px;background:repeating-linear-gradient(45deg,${grad});display:flex;align-items:center;justify-content:center"><span style="font-family:ui-monospace,monospace;font-size:10px;color:var(--mute)">yemək şəkli</span><div style="position:absolute;left:13px;bottom:-17px;border:2.5px solid #fff;border-radius:50%;box-shadow:0 4px 10px rgba(40,20,10,0.1)">${avatar(r,40)}</div></div>
      <div style="padding:23px 13px 14px"><div style="font-weight:700;font-size:14.5px">${r.ad}</div><div style="font-size:11px;color:var(--mute);font-weight:500;margin-top:2px">${r.kat} · ${r.mesafe}</div><div style="margin-top:11px;display:inline-block;background:${r.bg};color:${r.fg};font-size:11px;font-weight:800;padding:5px 9px;border-radius:8px">${r.kampaniya}</div></div>
    </div>`;
  }).join("");

  const cards = ["doner", "pizza", "burger"].map((id) => {
    const r = R(id), pct = Math.round((r.cari / r.hedef) * 100), qaldi = r.hedef - r.cari;
    return `<div class="lr-card" data-rest="${r.id}" style="margin-bottom:14px;cursor:pointer">
      <div style="display:flex;align-items:center;gap:12px">${avatar(r,48)}<div style="flex:1"><div style="font-weight:700;font-size:16px">${r.ad}</div><div style="font-size:12px;color:var(--mute);font-weight:500">${r.kat} · ${r.mesafe}</div></div><div style="background:var(--brand-soft);color:var(--brand-dark);font-size:12px;font-weight:800;padding:6px 11px;border-radius:9px">${qaldi} qaldı</div></div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:15px"><div class="lr-progress"><div style="width:${pct}%"></div></div><span style="font-size:13px;font-weight:800">${r.cari}/${r.hedef}</span></div>
    </div>`;
  }).join("");

  return `<div class="lr-screen active" data-screen="home">
    ${statusBar(false)}
    <div class="lr-scroll" style="flex:1;padding:8px 20px 16px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:14px;color:var(--ink2);font-weight:500">Salam,</div><div style="font-size:23px;font-weight:800;letter-spacing:-0.02em">${state.userName} 👋</div></div>
        <div style="display:flex;gap:10px;align-items:center">
          <div data-nav="notifications" style="position:relative;width:42px;height:42px;border-radius:13px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;cursor:pointer">${I.bell()}<div style="position:absolute;top:9px;right:10px;width:8px;height:8px;border-radius:50%;background:var(--brand);border:2px solid #fff"></div></div>
          <div data-nav="profile" style="width:42px;height:42px;border-radius:50%;background:var(--amber-soft);color:var(--amber-deep);font-weight:800;display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer">${state.userName[0]}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px 16px;margin-top:18px">${I.search()}<span style="color:var(--mute);font-size:15px;font-weight:500">Restoran axtar</span></div>

      <div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#D9492E,#B83A22);border-radius:22px;padding:18px 18px 20px;margin-top:18px;box-shadow:0 18px 34px -12px rgba(217,73,46,0.55)">
        <div style="position:absolute;top:-34px;right:-26px;width:128px;height:128px;border-radius:50%;background:rgba(255,255,255,0.09)"></div>
        <div style="position:absolute;bottom:-40px;right:30px;width:84px;height:84px;border-radius:50%;background:rgba(255,255,255,0.06)"></div>
        <div style="position:relative;display:flex;align-items:center;gap:11px">
          <div style="width:42px;height:42px;border-radius:50%;background:#fff;color:var(--amber-deep);font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center">Ç</div>
          <div style="flex:1"><div style="color:#fff;font-weight:700;font-size:15.5px">${hero.ad}</div><div style="color:rgba(255,255,255,0.78);font-size:11.5px;font-weight:600">Hədiyyəyə ən yaxın kartın</div></div>
          <div style="background:rgba(255,255,255,0.22);color:#fff;font-size:12px;font-weight:800;padding:6px 11px;border-radius:9px">${hero.cari}/${hero.hedef}</div>
        </div>
        <div style="position:relative;color:#fff;font-size:19px;font-weight:800;margin-top:15px;letter-spacing:-0.01em">Hədiyyəyə son ${hero.hedef - hero.cari} ştamp! 🎉</div>
        <div style="position:relative;display:flex;gap:5px;margin-top:13px">${
          Array.from({length: hero.hedef}, (_, i) => i < hero.cari
            ? `<div style="flex:1;aspect-ratio:1;border-radius:50%;background:#fff"></div>`
            : `<div style="flex:1;aspect-ratio:1;border-radius:50%;border:2px dashed rgba(255,255,255,0.7)"></div>`).join("")
        }</div>
        <div style="position:relative;display:flex;gap:10px;margin-top:17px">
          <div data-scan="cay" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:var(--brand-dark);padding:13px;border-radius:13px;font-weight:700;font-size:14.5px;cursor:pointer">${I.qr("var(--brand-dark)", 19)}QR skan et</div>
          <div data-rest="cay" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.18);color:#fff;padding:13px 18px;border-radius:13px;font-weight:700;font-size:14.5px;border:1px solid rgba(255,255,255,0.25);cursor:pointer">Kartı aç</div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:24px"><span style="font-size:16px;font-weight:800">Önə çəkilmiş</span><span class="lr-link" data-nav="discover" style="font-size:13px">Hamısı</span></div>
      <div class="lr-xscroll" style="display:flex;gap:14px;margin-top:14px;padding-bottom:4px;margin-right:-20px;padding-right:20px">${featured}</div>

      <div style="font-size:16px;font-weight:800;margin-top:26px;margin-bottom:14px">Loyallıq kartların</div>
      ${cards}
    </div>
    ${tabBar("home")}
  </div>`;
};

/* 4 · Restoran detalı */
screens.detail = () => {
  const r = R(state.scanTarget);
  const qaldi = r.hedef - r.cari;
  return `<div class="lr-screen active" data-screen="detail">
    <div style="background:linear-gradient(165deg,#FCE9E2,#FBF7F2 75%);padding:0 22px 26px;flex:none">
      ${statusBar(false).replace('padding:15px 26px 4px', 'padding:15px 4px 4px')}
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px">
        <div class="lr-iconbtn" data-nav="back" style="border:none;box-shadow:0 4px 12px rgba(40,20,10,0.07)">${I.back()}</div>
        <div class="lr-iconbtn" style="border:none;box-shadow:0 4px 12px rgba(40,20,10,0.07)">${I.heart()}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;margin-top:8px">
        <div style="width:74px;height:74px;border-radius:50%;background:#fff;color:${r.fg};font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px -6px rgba(40,20,10,0.18)">${r.herf}</div>
        <div style="font-size:23px;font-weight:800;margin-top:12px;letter-spacing:-0.02em">${r.ad}</div>
        <div style="font-size:13px;color:var(--ink2);font-weight:600;margin-top:3px">${r.kat} · ${r.mesafe}</div>
        <div style="display:flex;align-items:center;gap:5px;margin-top:8px">${I.ratStar()}<span style="font-size:13px;font-weight:800">${r.reyting}</span><span style="font-size:13px;color:var(--mute);font-weight:500">· ${r.rey} rəy</span></div>
      </div>
    </div>
    <div class="lr-scroll" style="flex:1;padding:18px 20px 16px">
      <div style="background:#fff;border:1px solid var(--line);border-radius:22px;padding:20px;box-shadow:0 8px 24px -8px rgba(40,20,10,0.1)">
        <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:16px;font-weight:800">Sadiqlik kartı</span><span style="font-size:14px;font-weight:800;color:var(--brand)">${r.cari}/${r.hedef}</span></div>
        <div style="margin-top:18px">${stampGrid(r.cari, r.hedef, { cols:5, size:15, gap:12, gift:true, showNextNum:true })}</div>
        <div style="margin-top:18px;background:var(--brand-soft);border-radius:13px;padding:11px 14px;text-align:center;font-size:13.5px;font-weight:800;color:var(--brand-dark)">Hədiyyəyə ${qaldi} ştamp qaldı 🔥</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,#F2B84B,#E8932C);border-radius:18px;padding:16px;margin-top:16px;box-shadow:0 10px 22px -8px rgba(232,147,44,0.5)">
        <div style="width:44px;height:44px;border-radius:13px;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;flex:none">${I.ticket("#fff", 24)}</div>
        <div style="color:#fff"><div style="font-size:16px;font-weight:800">${r.kampaniya.replace("pulsuz","PULSUZ")}</div><div style="font-size:12.5px;font-weight:600;opacity:0.95">${r.hediyye} qazan</div></div>
      </div>
      <div style="background:#fff;border:1px solid var(--line);border-radius:18px;padding:6px 16px;margin-top:16px">
        <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)">${I.pin()}<span style="font-size:14px;font-weight:600">${r.unvan}</span></div>
        <div style="display:flex;align-items:center;gap:12px;padding:12px 0">${I.clock()}<span style="font-size:14px;font-weight:600">${r.saat} · <span style="color:#2E8A66;font-weight:700">Açıqdır</span></span></div>
      </div>
    </div>
    <div style="padding:14px 20px 26px;background:#fff;border-top:1px solid var(--line);flex:none">
      <button class="lr-btn lr-btn-primary" data-scan="${r.id}">${I.qr("#fff", 22)}QR skan et</button>
    </div>
  </div>`;
};

/* 5 · QR skan */
screens.scan = () => `
  <div class="lr-screen active" data-screen="scan" style="background:radial-gradient(120% 80% at 50% 35%,#2a2622 0%,#141210 70%)">
    ${statusBar(true)}
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 22px"><div style="width:40px"></div><span style="font-size:17px;font-weight:800;color:#fff">QR kodu skan et</span><div data-nav="back" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;cursor:pointer">${I.close()}</div></div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px">
      <div style="position:relative;width:226px;height:226px">
        <div style="position:absolute;top:0;left:0;width:46px;height:46px;border-top:4px solid var(--brand);border-left:4px solid var(--brand);border-top-left-radius:18px"></div>
        <div style="position:absolute;top:0;right:0;width:46px;height:46px;border-top:4px solid var(--brand);border-right:4px solid var(--brand);border-top-right-radius:18px"></div>
        <div style="position:absolute;bottom:0;left:0;width:46px;height:46px;border-bottom:4px solid var(--brand);border-left:4px solid var(--brand);border-bottom-left-radius:18px"></div>
        <div style="position:absolute;bottom:0;right:0;width:46px;height:46px;border-bottom:4px solid var(--brand);border-right:4px solid var(--brand);border-bottom-right-radius:18px"></div>
        <div style="position:absolute;left:14px;right:14px;top:50%;height:3px;border-radius:3px;background:linear-gradient(90deg,transparent,var(--brand),transparent);box-shadow:0 0 16px 2px rgba(217,73,46,0.7);animation:lr-scan 2.4s ease-in-out infinite"></div>
      </div>
      <div style="text-align:center;padding:0 40px"><div style="font-size:16px;font-weight:700;color:#fff">Kassada göstərilən QR kodu</div><div style="font-size:16px;font-weight:700;color:#fff">çərçivəyə tut</div><div style="font-size:13px;color:rgba(255,255,255,0.6);font-weight:500;margin-top:8px">Kod avtomatik oxunacaq</div></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:18px;padding:0 22px 40px">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center">${I.bolt()}</div>
      <div data-nav="success" style="background:rgba(255,255,255,0.12);color:#fff;padding:13px 22px;border-radius:14px;font-size:14px;font-weight:700;border:1px solid rgba(255,255,255,0.18);cursor:pointer">Kodu əllə daxil et</div>
    </div>
  </div>`;

/* 6 · Ştamp qazanıldı */
screens.success = () => {
  const r = R(state.scanTarget);
  const qaldi = Math.max(0, r.hedef - r.cari);
  const confetti = [
    [120,40,null,"9px","2px","var(--brand)","rotate(20deg)"],
    [170,null,48,"10px","50%","var(--amber)",""],
    [230,64,null,"8px","2px","#2E8A66","rotate(45deg)"],
    [150,120,null,"7px","50%","var(--amber)",""],
    [260,null,70,"9px","2px","var(--brand)","rotate(-15deg)"],
    [300,44,null,"8px","50%","#3A6A93",""],
    [110,null,90,"8px","2px","var(--amber)","rotate(30deg)"],
    [330,null,54,"7px","50%","var(--brand)",""],
  ].map(([t,l,rt,s,br,bg,tr]) =>
    `<div style="position:absolute;top:${t}px;${l!=null?`left:${l}px`:`right:${rt}px`};width:${s};height:${s};border-radius:${br};background:${bg};transform:${tr||"none"}"></div>`).join("");

  return `<div class="lr-screen active" data-screen="success" style="background:linear-gradient(180deg,#FFF3EC,#FBF7F2 60%)">
    ${confetti}
    <div style="display:flex;flex-direction:column;height:100%;padding:0 28px 32px">
      ${statusBar(false).replace('padding:15px 26px 4px', 'padding:15px 0 4px')}
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div style="width:118px;height:118px;border-radius:50%;background:var(--brand);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 20px 40px -10px rgba(217,73,46,0.55);animation:lr-pop .5s ease-out both"><div style="font-size:34px;font-weight:800;color:#fff;line-height:1">+1</div><div style="font-size:12px;font-weight:800;color:#fff;letter-spacing:1px;opacity:0.92">ŞTAMP</div></div>
        <div style="font-size:27px;font-weight:800;margin-top:28px;letter-spacing:-0.02em">Təbriklər! 🎉</div>
        <div style="font-size:15px;color:var(--ink2);font-weight:500;margin-top:8px;text-align:center"><span style="color:var(--ink);font-weight:700">${r.ad}</span>-də 1 ştamp qazandın</div>
        <div style="width:100%;background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px;margin-top:30px;box-shadow:0 8px 24px -10px rgba(40,20,10,0.1)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px"><span style="font-size:14px;font-weight:700">İrəliləyişin</span><span style="font-size:14px;font-weight:800;color:var(--brand)">${r.cari}/${r.hedef}</span></div>
          ${stampGrid(r.cari, r.hedef, { cols:10, size:8, gap:6, gift:false })}
          <div style="margin-top:14px;background:${qaldi===0?'var(--green-soft)':'var(--amber-soft)'};border-radius:11px;padding:9px;text-align:center;font-size:13px;font-weight:800;color:${qaldi===0?'var(--green)':'var(--amber-deep)'}">${qaldi===0?'Hədiyyən hazırdır! 🎁':`Hədiyyəyə cəmi ${qaldi} ştamp qaldı!`}</div>
        </div>
      </div>
      <button class="lr-btn lr-btn-primary" data-nav="detail">Kartı gör</button>
      <div class="lr-textbtn" data-nav="home" style="margin-top:14px">Bağla</div>
    </div>
  </div>`;
};

/* 7 · Hədiyyələrim */
screens.gifts = () => {
  const active = state.coupons.filter((c) => c.status === "active");
  const used = state.coupons.filter((c) => c.status === "used");
  const list = state.giftTab === "active"
    ? active.map((c) => {
        const r = R(c.rest);
        return `<div style="position:relative;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;margin-top:18px;box-shadow:0 6px 20px -8px rgba(40,20,10,0.1);display:flex">
          <div style="width:7px;background:${c.stripe}"></div>
          <div style="flex:1;padding:16px 18px">
            <div style="display:flex;align-items:center;gap:11px">${avatar(r,40)}<div><div style="font-weight:700;font-size:14px">${r.ad}</div><div style="font-size:11px;color:var(--mute);font-weight:500">${r.kat}</div></div></div>
            <div style="font-size:21px;font-weight:800;margin-top:14px;letter-spacing:-0.02em">${c.ad}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:8px;color:var(--ink2)">${I.clock("currentColor")}<span style="font-size:12.5px;font-weight:600">Son tarix: ${c.son}</span></div>
            <div style="border-top:2px dashed var(--line);margin:15px -18px 14px"></div>
            <button class="lr-btn lr-btn-primary" data-use="${c.rest}" style="padding:13px;border-radius:13px;font-size:15px;box-shadow:0 10px 20px -8px rgba(217,73,46,0.55)">İstifadə et</button>
          </div>
          <div style="position:absolute;left:-9px;top:50%;margin-top:-9px;width:18px;height:18px;border-radius:50%;background:var(--bg);border:1px solid var(--line)"></div>
          <div style="position:absolute;right:-9px;top:50%;margin-top:-9px;width:18px;height:18px;border-radius:50%;background:var(--bg);border:1px solid var(--line)"></div>
        </div>`;
      }).join("") || `<div style="text-align:center;color:var(--mute);font-weight:600;margin-top:60px">Aktiv hədiyyən yoxdur</div>`
    : used.map((c) => {
        const r = R(c.rest);
        return `<div style="position:relative;background:#F7F2EC;border:1px solid var(--line);border-radius:20px;overflow:hidden;margin-top:16px;display:flex;opacity:0.8">
          <div style="width:7px;background:#D8CEC3"></div>
          <div style="flex:1;padding:16px 18px">
            <div style="display:flex;align-items:center;justify-content:space-between"><div style="display:flex;align-items:center;gap:11px"><div style="width:40px;height:40px;border-radius:50%;background:#EAE2D8;color:#A89C92;font-weight:800;display:flex;align-items:center;justify-content:center">${r.herf}</div><div><div style="font-weight:700;font-size:14px;color:var(--ink2)">${r.ad}</div><div style="font-size:18px;font-weight:800;color:var(--mute)">${c.ad}</div></div></div><div style="display:flex;align-items:center;gap:5px;color:#9A8E84">${I.check("currentColor",16)}<span style="font-size:12px;font-weight:700">${c.son}</span></div></div>
          </div>
        </div>`;
      }).join("") || `<div style="text-align:center;color:var(--mute);font-weight:600;margin-top:60px">İstifadə olunmuş hədiyyə yoxdur</div>`;

  return `<div class="lr-screen active" data-screen="gifts">
    ${statusBar(false)}
    <div class="lr-scroll" style="flex:1;padding:10px 20px 16px">
      <div style="font-size:25px;font-weight:800;letter-spacing:-0.02em">Hədiyyələrim</div>
      <div class="lr-seg" style="margin-top:18px">
        <button class="${state.giftTab==='active'?'active':''}" data-gifttab="active">Aktiv (${active.length})</button>
        <button class="${state.giftTab==='used'?'active':''}" data-gifttab="used">İstifadə olunmuş</button>
      </div>
      ${list}
    </div>
    ${tabBar("gifts")}
  </div>`;
};

/* 8 · Kəşf / Xəritə */
screens.discover = () => {
  const chips = ["Hamısı","Dönər","Pizza","Çay evi","Fast-food"].map((c, i) =>
    `<div style="flex:none;${i===0?'background:var(--brand);color:#fff;box-shadow:0 6px 14px -6px rgba(217,73,46,0.5)':'background:#fff;box-shadow:0 4px 12px -6px rgba(40,20,10,0.15)'};font-size:13px;font-weight:${i===0?700:600};padding:9px 15px;border-radius:11px;cursor:pointer">${c}</div>`).join("");
  const pin = (t, l, rt, sz, bg, fg, herf) =>
    `<div style="position:absolute;z-index:2;top:${t}px;${l!=null?`left:${l}px`:`right:${rt}px`};display:flex;flex-direction:column;align-items:center"><div style="width:${sz}px;height:${sz}px;border-radius:50% 50% 50% 4px;background:${bg};transform:rotate(45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 16px -4px rgba(40,20,10,0.3)"><span style="transform:rotate(-45deg);color:${fg};font-weight:800;font-size:${Math.round(sz*0.34)}px">${herf}</span></div></div>`;
  const sheetItem = (id) => {
    const r = R(id);
    return `<div data-rest="${id}" style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line);cursor:pointer"><div style="width:46px;height:46px;border-radius:14px;background:${r.bg};color:${r.fg};font-weight:800;display:flex;align-items:center;justify-content:center">${r.herf}</div><div style="flex:1"><div style="font-weight:700;font-size:15px">${r.ad}</div><div style="font-size:12px;color:var(--mute);font-weight:500">${r.kat} · ${r.mesafe} · ${r.cari}/${r.hedef} ştamp</div></div><div style="display:flex;align-items:center;gap:3px">${I.ratStar()}<span style="font-size:13px;font-weight:800">${r.reyting}</span></div></div>`;
  };
  return `<div class="lr-screen active" data-screen="discover">
    <div style="position:relative;flex:1;overflow:hidden">
      <div style="position:absolute;inset:0;background:#E8EBE4;background-image:linear-gradient(0deg,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px);background-size:46px 46px"></div>
      <div style="position:absolute;top:-40px;right:-60px;width:230px;height:230px;border-radius:50%;background:#D9E6DC"></div>
      <div style="position:absolute;bottom:120px;left:-70px;width:240px;height:200px;border-radius:46% 54% 60% 40%;background:#CDDDE9"></div>
      <div style="position:absolute;top:200px;left:-40px;width:480px;height:30px;background:#fff;opacity:0.7;transform:rotate(18deg)"></div>
      <div style="position:absolute;top:360px;left:-40px;width:480px;height:22px;background:#fff;opacity:0.6;transform:rotate(-8deg)"></div>
      <div style="position:relative;z-index:3;padding:0 20px">
        ${statusBar(false).replace('padding:15px 26px 4px', 'padding:15px 6px 4px')}
        <div style="display:flex;gap:10px;margin-top:8px">
          <div style="flex:1;display:flex;align-items:center;gap:10px;background:#fff;border-radius:15px;padding:13px 15px;box-shadow:0 6px 18px -6px rgba(40,20,10,0.18)">${I.search()}<span style="color:var(--mute);font-size:15px;font-weight:500">Yaxınlıqda axtar</span></div>
          <div style="width:48px;height:48px;border-radius:15px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px -6px rgba(40,20,10,0.18)">${I.filter()}</div>
        </div>
        <div class="lr-xscroll" style="display:flex;gap:8px;margin-top:12px">${chips}</div>
      </div>
      ${pin(280,90,null,44,"var(--brand)","#fff","D")}
      ${pin(340,null,80,38,"#fff","#2E8A66","P")}
      ${pin(240,null,130,38,"#fff","var(--amber-deep)","Ç")}
      <div style="position:absolute;z-index:2;top:415px;left:130px;width:20px;height:20px;border-radius:50%;background:#3A6A93;border:4px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,0.2)"></div>
      <div style="position:absolute;z-index:4;left:0;right:0;bottom:0;background:#fff;border-radius:24px 24px 0 0;padding:10px 20px 18px;box-shadow:0 -10px 30px -10px rgba(40,20,10,0.18)">
        <div style="width:40px;height:5px;border-radius:9px;background:#E4D9CE;margin:0 auto 14px"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><span style="font-size:15px;font-weight:800">Yaxınlıqda · 8 restoran</span><span class="lr-link" style="font-size:13px">Siyahı</span></div>
        ${sheetItem("doner")}
        ${sheetItem("cay").replace(';border-bottom:1px solid var(--line)','')}
      </div>
    </div>
    ${tabBar("discover")}
  </div>`;
};

/* 9 · Bildirişlər */
screens.notifications = () => `
  <div class="lr-screen active" data-screen="notifications">
    ${statusBar(false)}
    <div style="display:flex;align-items:center;gap:14px;padding:8px 22px 6px"><div class="lr-iconbtn" data-nav="back" style="width:40px;height:40px;border-radius:12px">${I.back()}</div><span style="font-size:21px;font-weight:800;flex:1">Bildirişlər</span><span class="lr-link" style="font-size:13px">Hamısını oxu</span></div>
    <div class="lr-scroll" style="flex:1;padding:12px 20px 18px">
      <div style="font-size:13px;font-weight:800;color:var(--ink2);margin-bottom:12px">Bu gün</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:13px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px;align-items:flex-start;box-shadow:0 4px 14px rgba(40,20,10,0.04)"><div style="width:42px;height:42px;border-radius:13px;background:var(--brand-soft);display:flex;align-items:center;justify-content:center;flex:none">${I.ticket("var(--brand)",22)}</div><div style="flex:1"><div style="font-size:14.5px;font-weight:700">Hədiyyən hazırdır! 🎁</div><div style="font-size:13px;color:var(--ink2);font-weight:500;margin-top:2px;line-height:1.4">Çay Bağı-da 1 pulsuz çaynik qazandın. Növbəti ziyarətdə istifadə et.</div><div style="font-size:12px;color:var(--mute);font-weight:600;margin-top:6px">2 saat əvvəl</div></div><div style="width:9px;height:9px;border-radius:50%;background:var(--brand);margin-top:6px;flex:none"></div></div>
        <div style="display:flex;gap:13px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px;align-items:flex-start;box-shadow:0 4px 14px rgba(40,20,10,0.04)"><div style="width:42px;height:42px;border-radius:13px;background:var(--brand-soft);display:flex;align-items:center;justify-content:center;flex:none">${I.check("var(--brand)",22)}</div><div style="flex:1"><div style="font-size:14.5px;font-weight:700">Hədiyyəyə 1 ştamp qaldı</div><div style="font-size:13px;color:var(--ink2);font-weight:500;margin-top:2px;line-height:1.4">Dönər Evi-də növbəti ziyarətin sənə hədiyyə qazandıra bilər!</div><div style="font-size:12px;color:var(--mute);font-weight:600;margin-top:6px">5 saat əvvəl</div></div><div style="width:9px;height:9px;border-radius:50%;background:var(--brand);margin-top:6px;flex:none"></div></div>
      </div>
      <div style="font-size:13px;font-weight:800;color:var(--ink2);margin:22px 0 12px">Bu həftə</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:13px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px;align-items:flex-start"><div style="width:42px;height:42px;border-radius:13px;background:var(--amber-soft);display:flex;align-items:center;justify-content:center;flex:none">${I.mega()}</div><div style="flex:1"><div style="font-size:14.5px;font-weight:700">Yeni kampaniya 🍕</div><div style="font-size:13px;color:var(--ink2);font-weight:500;margin-top:2px;line-height:1.4">Pizza Roma: həftə sonu “2 al, 1 ödə” kampaniyası başladı.</div><div style="font-size:12px;color:var(--mute);font-weight:600;margin-top:6px">2 gün əvvəl</div></div></div>
        <div style="display:flex;gap:13px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px;align-items:flex-start"><div style="width:42px;height:42px;border-radius:13px;background:#E6F1EA;display:flex;align-items:center;justify-content:center;flex:none">${I.gift("#2E8A66")}</div><div style="flex:1"><div style="font-size:14.5px;font-weight:700">+1 ştamp əlavə olundu</div><div style="font-size:13px;color:var(--ink2);font-weight:500;margin-top:2px;line-height:1.4">Burger Lab ziyarətin uğurla qeydə alındı.</div><div style="font-size:12px;color:var(--mute);font-weight:600;margin-top:6px">4 gün əvvəl</div></div></div>
      </div>
    </div>
  </div>`;

/* 10 · Profil */
screens.profile = () => `
  <div class="lr-screen active" data-screen="profile">
    ${statusBar(false)}
    <div class="lr-scroll" style="flex:1;padding:10px 20px 16px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--brand-soft);color:var(--brand-dark);font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${state.userName[0]}</div>
        <div style="flex:1"><div style="font-size:20px;font-weight:800;letter-spacing:-0.02em">${state.userName} Məmmədova</div><div style="font-size:13px;color:var(--ink2);font-weight:500">+994 50 *** 45 67</div></div>
        ${I.chevR()}
      </div>
      <div style="background:linear-gradient(135deg,#F2B84B,#E8932C);border-radius:20px;padding:18px;margin-top:20px;color:#fff;box-shadow:0 12px 26px -10px rgba(232,147,44,0.6)">
        <div style="display:flex;align-items:center;justify-content:space-between"><div style="display:flex;align-items:center;gap:9px">${I.medal()}<span style="font-size:17px;font-weight:800">Qızıl üzv</span></div><span style="font-size:14px;font-weight:800">1,240 xal</span></div>
        <div style="height:9px;border-radius:9px;background:rgba(255,255,255,0.3);margin-top:16px;overflow:hidden"><div style="width:78%;height:100%;background:#fff;border-radius:9px"></div></div>
        <div style="font-size:12.5px;font-weight:600;margin-top:9px;opacity:0.95">Platin səviyyəyə 260 xal qaldı</div>
      </div>
      <div style="display:flex;background:#fff;border:1px solid var(--line);border-radius:18px;padding:16px 0;margin-top:16px">
        <div style="flex:1;text-align:center;border-right:1px solid var(--line)"><div style="font-size:21px;font-weight:800">47</div><div style="font-size:12px;color:var(--ink2);font-weight:600;margin-top:2px">Ştamp</div></div>
        <div style="flex:1;text-align:center;border-right:1px solid var(--line)"><div style="font-size:21px;font-weight:800">12</div><div style="font-size:12px;color:var(--ink2);font-weight:600;margin-top:2px">Hədiyyə</div></div>
        <div style="flex:1;text-align:center"><div style="font-size:21px;font-weight:800">9</div><div style="font-size:12px;color:var(--ink2);font-weight:600;margin-top:2px">Restoran</div></div>
      </div>
      <div style="background:#fff;border:1px solid var(--line);border-radius:18px;margin-top:16px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:13px;padding:15px 16px;border-bottom:1px solid var(--line)">${I.user()}<span style="flex:1;font-size:15px;font-weight:600">Hesab məlumatları</span>${I.chevR()}</div>
        <div style="display:flex;align-items:center;gap:13px;padding:15px 16px;border-bottom:1px solid var(--line)">${I.bell("var(--ink2)")}<span style="flex:1;font-size:15px;font-weight:600">Bildirişlər</span><div class="lr-toggle ${state.notifications?'on':''}" data-toggle="notif"><div class="knob"></div></div></div>
        <div style="display:flex;align-items:center;gap:13px;padding:15px 16px;border-bottom:1px solid var(--line)">${I.globe()}<span style="flex:1;font-size:15px;font-weight:600">Dil</span><span style="font-size:14px;font-weight:700;color:var(--ink2)">Azərbaycan</span>${I.chevR()}</div>
        <div style="display:flex;align-items:center;gap:13px;padding:15px 16px">${I.help()}<span style="flex:1;font-size:15px;font-weight:600">Kömək mərkəzi</span>${I.chevR()}</div>
      </div>
      <div class="lr-link" data-nav="onboarding" style="margin-top:18px;font-size:15px">Çıxış</div>
    </div>
    ${tabBar("profile")}
  </div>`;

/* ─────────────────────────── Router ───────────────────────────── */
const TAB_SCREENS = ["home", "discover", "gifts", "profile"];
let current = null;
const history = [];            // geri naviqasiya yığını
let otpTimer = null;

function render(name, isBack) {
  if (otpTimer) { clearInterval(otpTimer); otpTimer = null; }
  if (!isBack && current && current !== name) history.push(current);
  const app = document.getElementById("lr-app");
  app.innerHTML = (screens[name] || screens.onboarding)();
  current = name;
  if (name === "otp") startOtp();
  // scroll-u yuxarı qaytar
  const sc = app.querySelector(".lr-scroll");
  if (sc) sc.scrollTop = 0;
}

function navigate(target, payload) {
  switch (target) {
    case "back":
      render(history.pop() || "home", true);
      return;
    case "scan":
      if (payload) state.scanTarget = payload;
      render("scan");
      return;
    case "success":
      doScan();
      return;
    default:
      render(target);
  }
}

// QR skan nəticəsi: ştamp +1, lazım gəldikdə kupon yarat
function doScan() {
  const r = R(state.scanTarget);
  if (r.cari < r.hedef) r.cari += 1;
  if (r.cari >= r.hedef) {
    const exists = state.coupons.some((c) => c.rest === r.id && c.status === "active");
    if (!exists) {
      state.coupons.unshift({ rest: r.id, ad: r.hediyye, son: "30 İyun 2026", stripe: "var(--brand)", status: "active" });
    }
  }
  render("success");
}

// OTP geri sayım + auto-advance
function startOtp() {
  let left = 42;
  const el = document.getElementById("lr-resend");
  otpTimer = setInterval(() => {
    left -= 1;
    if (!document.getElementById("lr-resend")) { clearInterval(otpTimer); otpTimer = null; return; }
    if (left <= 0) {
      clearInterval(otpTimer); otpTimer = null;
      document.getElementById("lr-resend").textContent = "Yenidən göndər";
      document.getElementById("lr-resend").style.color = "var(--brand)";
    } else {
      document.getElementById("lr-resend").textContent = `Yenidən göndər (0:${String(left).padStart(2,"0")})`;
    }
  }, 1000);
  const boxes = [...document.querySelectorAll("[data-otp]")];
  boxes[0] && boxes[0].focus();
  boxes.forEach((b, i) => {
    b.addEventListener("input", () => {
      b.value = b.value.replace(/\D/g, "").slice(0, 1);
      if (b.value && boxes[i + 1]) boxes[i + 1].focus();
      if (boxes.every((x) => x.value)) setTimeout(() => navigate("home"), 250);
    });
    b.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !b.value && boxes[i - 1]) boxes[i - 1].focus();
    });
  });
}

/* ─────────────────────────── Hadisələr ────────────────────────── */
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) { navigate(nav.getAttribute("data-nav")); return; }

  const rest = e.target.closest("[data-rest]");
  if (rest) { state.scanTarget = rest.getAttribute("data-rest"); render("detail"); return; }

  const sc = e.target.closest("[data-scan]");
  if (sc) { navigate("scan", sc.getAttribute("data-scan")); return; }

  const gt = e.target.closest("[data-gifttab]");
  if (gt) { state.giftTab = gt.getAttribute("data-gifttab"); render("gifts"); return; }

  const use = e.target.closest("[data-use]");
  if (use) {
    const id = use.getAttribute("data-use");
    const c = state.coupons.find((x) => x.rest === id && x.status === "active");
    if (c) { c.status = "used"; c.son = "Bu gün"; state.giftTab = "used"; }
    render("gifts");
    return;
  }

  const tg = e.target.closest("[data-toggle]");
  if (tg) { state.notifications = !state.notifications; tg.classList.toggle("on", state.notifications); return; }
});

// İlk render
document.addEventListener("DOMContentLoaded", () => render("onboarding"));
})();
