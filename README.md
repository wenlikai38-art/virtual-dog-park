# Virtual Dog Park

A dog encyclopedia and virtual pet website built for a first-year programming lab
(AIE1101). It is written with plain HTML, CSS and vanilla JavaScript — no
frameworks, no backend, and no external images.

## Features

- **Dog Encyclopedia** — three breeds (Beagle, Golden Retriever, Poodle), each
  with a project-created SVG illustration and short care notes.
- **Virtual Dog adoption** — choose a breed, give your dog a name (1–20
  characters), and adopt.
- **Feed & Play** — each raises happiness by 10, capped at 100.
- **Next Day** — advances the day by 1 and lowers happiness by 5, floored at 0.
- **Growth stages** — Day 1 is *Puppy*, Days 2–3 are *Young Dog*, Day 4 onward
  is *Adult Dog* (shown as text and a growth bar).
- **Saved progress** — your dog is stored in the browser so it survives a refresh.
- **Start Over** — asks for confirmation before deleting the saved dog.

## How to preview

This site uses the browser's localStorage, so it must be opened from a local
web server, not a `file://` path.

1. Open the `virtual-dog-park` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.
4. A local address such as `http://127.0.0.1:5500` opens in your browser.

(Any local static server works; just use the same browser and address during
storage tests.)

## Growth and happiness rules

- A new dog starts on **Day 1**, at the **Puppy** stage, with **happiness 50**.
- **Feed** and **Play**: happiness +10 per click, never above **100**.
- **Next Day**: day +1, happiness −5, never below **0**.
- **Growth stages**: Day 1 = Puppy; Days 2–3 = Young Dog; Day 4+ = Adult Dog.

## Where pet progress is stored

Your dog's name, breed, day and happiness are saved in the **browser's local
storage** on the device you adopted it on. This is **not** an online account and
is **not** uploaded by Git or stored in your GitHub account. Clearing the
browser data or using a different browser/device will not show the saved dog.

## Manual testing checklist

- [ ] Three breed entries and three illustrations display (no broken images).
- [ ] A valid name can be adopted; an empty name (or only spaces) is rejected.
- [ ] A name with `<` or `>` shows as plain text, not as HTML.
- [ ] Feed and Play work; happiness stays between 0 and 100.
- [ ] Growth stage changes on the correct days (Day 2 = Young Dog, Day 4 = Adult Dog).
- [ ] Refresh restores the same dog in the same browser.
- [ ] Start Over asks for confirmation; Cancel keeps the dog, Confirm clears it.
- [ ] The page stays usable on a narrow (phone-width) screen.

## Illustration note

The dog pictures in the `assets/` folder are **project-created SVG drawings**,
not real dog photographs.

## Project structure

```
virtual-dog-park/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── beagle.svg
│   ├── golden-retriever.svg
│   └── poodle.svg
├── .gitignore
└── README.md
```
