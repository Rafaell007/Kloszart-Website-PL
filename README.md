# Kloszart — strona Teatru Offowego 

Propozycja statycznej strony WWW (HTML/CSS/JS), przygotowana na zamówienie dla Teatru Offowego **Kloszart** — landing page oraz podstrony z galerią, rekrutacją i informacjami o spektaklach.
Nie jest to wersja ostateczna, lecz wstępny projekt oparty na „czystym” kodzie (HTML/CSS/JS) z użyciem bibliotek do animacji.
W przyszłości projekt ma zostać przeniesiony na platformę WordPress, gdzie uzyska ostateczną formę wraz z wdrożeniem.

## Demo

- **Demo**: https://rafaell007.github.io/Kloszart-Website-PL/photo-gallery.html

## Podstrony

- `index.html` — strona główna (sekcje: O nas, Wydarzenia, Kontakt + slider)
- `photo-gallery.html` — galeria zdjęć
- `recruitment.html` — rekrutacja
- `art.html` — spektakle / sztuka (w przygotowaniu)
- `impro.html` — improwizacje (placeholder / w przygotowaniu)

## Technologie i biblioteki

- HTML + CSS + JavaScript (ES Modules)
- GSAP + ScrollTrigger (+ SplitText)
- Swiper
- EmailJS (formularz kontaktowy)
- Lottie (na `art.html`)
- `html2canvas`, `imagesloaded`


## Konfiguracja formularza kontaktowego (EmailJS)

Formularz na stronie głównej korzysta z EmailJS:
- inicjalizacja klucza publicznego jest w `index.html`
- wysyłka (service/template) jest w `scripts/email-form.js`

Jeśli  chcesz mieć własną wysyłkę maili, podmień identyfikatory na swoje:
- `publicKey` w `index.html`
- `service_id` i `template_id` w `scripts/email-form.js`

## Struktura katalogów (skrót)

- `styles/` — style CSS
- `scripts/` — logika JS + animacje
- `imges/` — grafiki, wideo, favikony
- `data/` — dane do renderowania (np. galeria / animacje)




