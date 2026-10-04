# Brief per a Claude Design — INFINIT© (octubre 2026)

> Enganxa aquest document a Claude Design juntament amb la carpeta `.handoff/design_handoff_infinit_website/` (prototip i README v2). La web ja és en línia a **www.weareinfinit.com**; aquest brief és per a la **següent ronda de disseny**.

## 0. Context ràpid

- Estudi de branding i estratègia a Barcelona, liderat per **Cesc Callejas**. Públic: **empreses mitjanes d'1 a 200 M€** (sovint familiars) a Catalunya, Espanya i Europa — industrial i B2B, automoció, alimentació, farma, immobiliari, tecnologia.
- Web estàtica en **tres idiomes** (EN / CA / ES). El català i el castellà fan titulars **més llargs** — cal preveure-ho.
- Sistema de disseny vigent (no el canviïs sense motiu): **Satoshi** per a tot el text, **Geist 900** només per al wordmark INFINIT©; fons clar `oklch(.975 .002 85)`, tinta `--t4`, gris d'èmfasi `#9A999A` (frases grises amb paraules clau en negre); fons fosc `--d0…--d4`; colors de servei apagats `oklch(.72 .05 h)` (Strategy 165 · Brand 255 · Digital 285 · Product 30 · Content 88); **línia de color** de 3 px, un color cada vegada (cicle de 20 s); easing `cubic-bezier(.7,0,.2,1)` / `(.2,.7,.2,1)`.
- Dock flotant a baix; menú de pantalla completa al mòbil; preloader només a la Home.

## 1. Redisseny dels casos (prioritat 1)

**Problema:** les pàgines de cas (Bunnker, Relats) són correctes però **poc innovadores i molt típiques** (hero + fitxa + blocs d'imatge + vídeos + següent cas).

**Objectiu:** que un director general d'una empresa industrial que arriba des de Google o ChatGPT entengui en 10 segons *el problema, el que vam fer i el resultat*, i que la pàgina sigui memorable.

**Contingut disponible**
- **Relats** (`work/relats/relats-assets/`, 58 fitxers): vídeo de marca, logo en moviment, vídeo "top tier" amb so, render EMI, funda (sleeve), pòsters a oficines, mockups web i mòbil, analítica, xarxes, sostenibilitat. Rol: CDMO — Brand Director & Project Lead, amb Firma. Sector: mobilitat sostenible, automoció, energia. Web en directe.
- **Bunnker** (`work/bunnker/bunnker-assets/`, 35 fitxers): hero, interiors, art, galeria COAC (5 fotos, una vertical), logo en moviment, vídeo web. Rol: fundador · director de marca i estratègia. Premi COAC.
- Textos actuals: `.site/pages/relats.mjs` i `.site/pages/bunnker.mjs` (EN/CA/ES).

**Idees a explorar (no obligatòries)**
- Narrativa en tres actes clara: *abans → la idea → després*, amb una frase per acte.
- Un "abans / després" interactiu (marca antiga vs. nova) o una línia de temps del projecte.
- Xifres o resultats destacats quan n'hi hagi (preparar el component encara que avui no en tinguem).
- Navegació entre casos més viva que el bloc "Següent cas".
- Mantenir el rendiment: imatges grans però optimitzades, res que bloquegi el scroll.

## 2. Plantilla d'article — "Journal" (prioritat 2)

Volem publicar articles que responguin preguntes reals de directius (és el contingut que Google i les IA citen). Ja hi ha tres esborranys a `.lab/articles/`.

**Cal dissenyar**
- **Llistat** del Journal (pàgina índex): targetes amb títol, entradeta, sector, temps de lectura.
- **Pàgina d'article**: H1, entradeta, autor (Cesc Callejas, foto petita), data, temps de lectura, índex de seccions, cos de text amb una mesura de lectura còmoda (~65–75 caràcters), cites destacades, blocs de "xifres clau" o taula de preus, imatge a pantalla completa opcional, **preguntes freqüents** al final, **crida a l'acció** cap a la pàgina de sector relacionada, i articles relacionats.
- Ha de funcionar molt bé al **mòbil** (molta gent arribarà des de l'enllaç d'una IA).

## 3. Pàgines de sector (prioritat 3 — ja publicades, es poden polir)

8 pàgines (`/industrial-branding/`, `/automotive-branding/`, `/food-branding/`, `/pharma-branding/`, `/real-estate-branding/`, `/tech-branding/`, `/family-business-branding/`, `/international-branding/`) fetes amb els blocs dels casos: hero, fitxa, problema + cita, tres senyals (targetes), procés en 4 passos amb durada, **taula de terminis i preus per mida d'empresa** (1–10 / 10–50 / 50–200 M€), cas o experiència, preguntes freqüents i contacte. Plantilla: `.site/pages/sector.mjs`.

Pendent: **imatges pròpies** per a alimentació (ara un termo provisional) i tecnologia.

## 4. Studio — "Amb qui treballem"

Nova secció ja publicada a Studio: llista de 6 sectors (enllaçats) + "els moments que fan canviar una marca" (relleu generacional, internacionalització…). Es pot polir visualment.

## 5. Condicions tècniques (importants)

- **Tres idiomes**, sense trencar el disseny amb els textos més llargs.
- **iPhone / Safari iOS 26**: els heros arriben a la vora física de la pantalla (hi ha una regla `html.bar` amb 58 px extra) i la línia de color és l'última franja de 3 px del hero. No canviar sense revisar-ho.
- **Rendiment**: res de llibreries pesades; animacions amb `transform`/`opacity`; respectar `prefers-reduced-motion`.
- **Accessibilitat**: focus visible amb teclat (no amb el dit), menú i overlays amb trampa de focus, textos alternatius.
- Un sol `id="contact"` per pàgina; el peu és `#ft`.

## 6. Què necessito que em tornis

Com les altres vegades: un **zip de handoff** amb `README.md`, `CHANGELOG.md` i el prototip (`prototype/pages/…`), amb els valors exactes (mides, colors, temps). L'implemento a la web generada i ho publiquem.
