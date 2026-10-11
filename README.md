# Mixpult úlohy — odovzdávací systém s AI hodnotením

Statická webová aplikácia (`index.html`) + jedna Vercel serverless funkcia
(`api/evaluate.js`), ktorá bezpečne volá Anthropic API a vracia AI hodnotenie
odovzdanej práce. API kľúč sa nikdy neposiela do prehliadača — žije len na
serveri ako premenná prostredia.

## Štruktúra projektu

```
.
├── index.html                   # aplikácia: odovzdávanie (žiaci) + tabuľka známok (učiteľ)
├── mixpult_tutorial.html        # učebnica (teória → zadanie → riešenie, 10 kapitol)
├── mixpult_tutorial_links.js    # mapa: cvičenie → kapitola učebnice + súvisiace témy
├── api/
│   ├── evaluate.js      # overí odovzdanie, zavolá Anthropic API a výsledok uloží do databázy
│   ├── config.js        # verejne: aktívna trieda a mená na výber pre žiakov
│   ├── teacher.js       # chránené heslom: tabuľka, triedy, ručné známky, mazanie
│   └── _db.js           # pomocná vrstva nad Upstash Redis (nie je samostatná adresa)
├── package.json
├── .gitignore
└── README.md
```

## Ako to funguje

- **Trieda a žiaci:** učiteľ vloží zoznam mien (max. 40) a tým vytvorí triedu.
  Žiaci si pri odovzdávaní vyberú meno zo zoznamu — nepíšu ho, preto sa mená nerozchádzajú.
- **Jedno odovzdanie = jedno cvičenie pre jedného žiaka alebo pre celý tím (2–4 žiaci).**
  Tímové odovzdanie sa započíta každému členovi. Odovzdať ho stačí jednému.
- **Hodnotenie ukladá server**, nie prehliadač žiaka. Žiak nič nesťahuje ani neposiela a nemá
  kde upraviť známku.
- **Opakované odovzdanie:** uchová sa posledných 10 pokusov, do tabuľky ide najlepší.
- **Ak AI zlyhá**, odovzdanie sa zaznamená ako „čaká na ručné hodnotenie“ (v tabuľke „…“)
  a známku zadáš ručne.
- **Učiteľ** vidí tabuľku žiaci × cvičenia, v detaile komentár žiaka, odkaz na Google Drive,
  hodnotenie AI a môže zadať ručnú známku (platí len pre daného žiaka). Export do CSV otvoríš v Exceli.
- **Nový školský rok:** „Nová trieda“ → vlož nový zoznam. Stará trieda ostáva uložená aj s
  hodnoteniami (prepínač hore), môžeš ju exportovať alebo zmazať.
- **Viac projektov, jedna databáza:** zoznam tried je spoločný pre všetky aplikácie (Mixpult,
  Launchpad, …), ktoré používajú tú istú databázu — zoznam žiakov vložíš raz. Odovzdania a
  ručné známky sú oddelené podľa projektu (konštanta `PROJECT` v `api/_db.js`).
  Zmazanie triedy zmaže jej známky vo všetkých projektoch.
- Screenshoty sa v databáze neukladajú — AI ich vidí pri odovzdaní a súbory majú žiaci na zdieľanom Google Drive.
  Žiak môže vložiť odkaz na svoj súbor, ktorý uvidíš v detaile.

## Učebnica

Učebnica je súčasťou projektu. `mixpult_tutorial.html` a
`mixpult_tutorial_links.js` musia ležať v rovnakom priečinku ako `index.html`.
Aplikácia z nich ponúka: tlačidlo „Otvoriť celú učebnicu“ v hlavičke, tlačidlo
„Kapitola v učebnici“ pri každom cvičení a v okne tutoriálu zoznam súvisiacich
tém. Odkazy sa upravujú v `mixpult_tutorial_links.js`.

## 1. Nahratie na GitHub

Ak ešte nemáš repozitár:

```bash
git init
git add .
git commit -m "Mixpult úlohy s AI hodnotením"
git branch -M main
git remote add origin https://github.com/<tvoj-ucet>/<repo>.git
git push -u origin main
```

Ak repozitár už existuje (napr. ten istý, čo používa `audioLabGithubVercel.html`),
skopíruj do neho `index.html`, `mixpult_tutorial.html`, `mixpult_tutorial_links.js`, priečinok `api/` a `package.json` a commitni/pushni.

## 2. Import projektu do Vercelu

1. Choď na [vercel.com](https://vercel.com) → **Add New → Project**.
2. Vyber svoj GitHub repozitár.
3. Framework Preset nechaj na **Other** (nie je to Next.js/React projekt).
4. Build Command a Output Directory nechaj prázdne/predvolené — je to statický
   `index.html` + `api/` priečinok, Vercel ho rozpozná automaticky.

## 3. Nastavenie API kľúča (najdôležitejší krok)

1. V projekte na Vercel choď do **Settings → Environment Variables**.
2. Pridaj premennú:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tvoj skutočný kľúč z [console.anthropic.com](https://console.anthropic.com/settings/keys)
   - **Environment:** zaškrtni Production, Preview aj Development.
3. Ulož a spusti **Redeploy** (Deployments → tri bodky pri poslednom deploji →
   Redeploy) — premenná sa načíta až pri novom builde.

Kľúč sa použije len vnútri `api/evaluate.js` (`process.env.ANTHROPIC_API_KEY`)
na serveri, nikdy nie je súčasťou `index.html` ani JS kódu, ktorý beží
v prehliadači.

### Databáza (Upstash Redis)

1. Vo Verceli otvor projekt → **Storage** (alebo **Marketplace**) → **Upstash Redis** → vytvor databázu
   (bezplatný plán stačí, región vyber v EÚ) a **Connect Project**.
2. Vercel sám pridá premenné `KV_REST_API_URL` a `KV_REST_API_TOKEN` (alebo
   `UPSTASH_REDIS_REST_URL` a `UPSTASH_REDIS_REST_TOKEN` — podporované sú obe dvojice).

### Heslo učiteľa

Pridaj vo Vercel → Settings → Environment Variables:

- **Name:** `TEACHER_PASSWORD`
- **Value:** tvoje heslo do učiteľského prehľadu (dlhšie, nie to isté, čo používaš inde).
- **Environment:** Production, Preview aj Development, potom **Redeploy**.

Bez hesla alebo bez databázy sa učiteľský prehľad neotvorí a žiaci uvidia upozornenie.

### Prvé spustenie

1. Otvor appku → záložka **Učiteľský prehľad** → prihlás sa heslom.
2. **Nová trieda** → názov (napr. `4.A 2026/27`) a zoznam žiakov, jeden na riadok → **Uložiť**.
   Trieda sa nastaví ako aktívna a žiaci ju hneď uvidia pri odovzdávaní.

## 4. Otestovanie

Po deployi otvor pridelenú `*.vercel.app` adresu, vyber ľubovoľné cvičenie,
vyber svoje meno zo zoznamu, zaškrtni pár bodov kontrolného zoznamu, priloži screenshot, napíš komentár a klikni na
**„Odoslať na AI hodnotenie“**. Odovzdanie sa objaví v učiteľskej tabuľke. Aplikácia zavolá `/api/evaluate`, ktorý
zavolá Anthropic API a vráti skutočné AI hodnotenie (známka, percentá,
kritériá, silné stránky, odporúčania).

Ak AI zlyhá (výpadok, chyba siete), žiak dostane len orientačný lokálny odhad
(funkcia `evaluateWork()` v `index.html`) a odovzdanie sa u teba zaznamená
ako „čaká na ručné hodnotenie“.

## Aktualizácia obsahu

Keďže je to jeden statický `index.html`, akákoľvek ďalšia úprava (texty,
cvičenia, tutoriály) = uprav súbor lokálne → commit → push. Vercel spraví
nový deploy automaticky pri každom pushi do sledovanej vetvy.

## Poznámka k modelu a nákladom

Serverless funkcia aj frontend používajú `claude-haiku-4-5-20251001` ako
predvolený model — pre štruktúrované hodnotenie podľa rubriky je plne
dostatočný a výrazne lacnejší než väčšie modely (Sonnet/Opus). Ak budeš
neskôr chcieť prejsť na iný model, stačí zmeniť reťazec `model` v
`index.html` (funkcia `submitWork`) — `api/evaluate.js` model len prepošle
ďalej, nemá ho natvrdo zakódovaný.

Systémový prompt je pri všetkých cvičeniach a všetkých žiakoch identický,
preto je odoslaný s **prompt caching** (`cache_control: {type:"ephemeral"}`)
— prvé volanie v danom čase zaplatí plnú cenu, opakované volania v krátkom
slede (cache je aktívny cca 5 minút od posledného použitia) stoja len zlomok
ceny za vstupnú časť promptu.

### Odhad nákladov

Pri Haiku 4.5 vychádza jedno odovzdanie (text + 1 obrázok) na približne
0,003–0,005 USD. Pri väčšom nasadení (napr. 150+ žiakov, 10 cvičení) to
znamená rádovo desiatky USD za celý školský rok, nie stovky.

**Odporúčanie:** v [console.anthropic.com](https://console.anthropic.com)
nastav pri API kľúči tvrdý spending limit (napr. 15–20 USD/mesiac), aby
appka nemohla minúť viac, než plánuješ — po dosiahnutí limitu API kľúč
prestane fungovať, appka sa automaticky prepne na lokálny náhradný odhad.
