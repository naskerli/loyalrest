# LoyalRest — interaktiv UI prototipi

**Multi-merchant restoran loyallıq tətbiqinin** interaktiv prototipi.
`LoyalRest.dc.html` dizayn referansından qurulub: **vanilla JS HTML-string
render edir**, **CSS dəyişənləri** ilə stillənir — build addımı və ya
asılılıq yoxdur. Bütün mətn Azərbaycan dilindədir.

## Açılış
`index.html` faylını brauzerdə aç. Başqa heç nə lazım deyil.

## Fayllar
| Fayl | Təyinat |
|------|---------|
| `index.html` | Telefon çərçivəsi + font + giriş nöqtəsi |
| `loyalrest.css` | Dizayn tokenləri + komponent sinifləri (ştamp, tab bar, düymə, kart…) |
| `loyalrest.js` | Məlumat (state), ikonlar, 10 ekran builderi, router, interaksiyalar |

## Ekranlar (10)
Onboarding · Giriş (telefon) · OTP · Ana səhifə · Restoran detalı ·
QR skan · Ştamp qazanıldı · Hədiyyələrim · Kəşf/Xəritə · Bildirişlər · Profil.

## İnteraksiyalar
- **Naviqasiya axını:** Onboarding → telefon → OTP → Ana səhifə.
- **Alt tab bar** 5 bölmə arasında keçid (Ana · Kəşf · QR · Hədiyyələr · Profil).
- **OTP:** 4 xanalı auto-advance + 0:42 geri sayım taymeri.
- **QR axını:** “QR skan et” → skan ekranı → “Kodu əllə daxil et” → **+1 ştamp**;
  hədəfə çatanda avtomatik **kupon yaranır** (Hədiyyələrim → Aktiv).
- **Hədiyyələrim:** Aktiv / İstifadə olunmuş seqment; “İstifadə et” kuponu köçürür.
- **Profil:** bildiriş toggle-ı; “Çıxış” → Onboarding.
- Restoran kartına/pininə toxunma → Restoran detalı.

## Qeydlər
- Ştamp komponenti dizaynla eyni: ikiqat konsentrik halqa + brend ulduz.
- `state.restaurants` data-driven-dir; ştamp gridləri və progress barlar `cari/hedef`-dən hesablanır.
- Yemək şəkilləri **placeholder**-dir (real məzmunla əvəzlənməli).
