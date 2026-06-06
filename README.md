# ApplyDash

A Chrome extension that autofills job applications on Greenhouse, Lever, and Ashby — built as a personal Simplify replacement.

## Setup

**1. Install dependencies and build**
```bash
npm install
npm run build
```

**2. Add your profile**
```bash
cp src/shared/storage.example.ts src/shared/storage.ts
# Edit storage.ts with your own details
```

**3. Load in Chrome**
- Go to `chrome://extensions`
- Enable **Developer mode**
- Click **Load unpacked** → select the `dist/` folder

## Usage

Open a job application on Greenhouse, Lever, or Ashby. The ApplyDash panel appears in the bottom-right corner. Click **Autofill** to fill all detected fields.

## Project structure

```
src/
  content/
    detector/     # Field detection (heuristic + fieldMap)
    filler/       # Per-site fill logic (ashby, greenhouse, lever, generic)
    main-world.ts # MAIN world bridge for trusted events
    panel.ts      # Floating panel UI (Shadow DOM)
  shared/
    storage.example.ts  # Template — copy to storage.ts
    types.ts
```

## Notes

- `src/shared/storage.ts` is gitignored — it contains your personal data and is never committed
- Resume PDFs are also gitignored
- See [docs/sites.md](docs/sites.md) for per-site implementation notes
