# Forte EA — Encyclopedia Africa

A fully static, searchable encyclopedia of African history, country by country —
from deep antiquity through kingdoms and empires, religion, colonialism, slavery,
independence, and modern government, to cultural flourishing. Built to center
African voices and sources while staying honest about what is tradition, what is
contested, and what is documented.

**55 entries** covering every AU member state (54 UN-recognized countries plus
Western Sahara/SADR), organized into 5 regions, each with **9 historical lenses**
plus a sources list.

## Status: Deep Research Pass Complete

Every one of the 55 entries has been researched and written in depth across all nine
lenses — not surface-level summaries. That means named kingdoms and their founders
(Mankon, Bafut, Nso/Ngonnso, Kaabu, Wassoulou, Kong, Jolof, Songhai's Askia dynasty,
Great Zimbabwe's Mutapa and Ndebele successors, the Lozi Litunga line, and dozens
more), specific colonial officers and incidents (Zintgraff's Grassfields campaigns,
the Voulet-Chanoine expedition, Omar Mukhtar's decade of resistance, the Herero-Nama
genocide, the Uganda Martyrs, the Isaaq genocide), documented slave routes and ports
with named intermediaries (Bimbia, Bunce Island, Ouidah, Kaabu, Gorée), live
restitution disputes (the Ngonnso' and Lefem sculptures), and named cultural
traditions and festivals tied to real historical events.

- **Stable material** (deep antiquity, kingdoms, colonial history, slavery, culture)
  is built to hold up over time, each backed by real research rather than recycled
  encyclopedia summaries.
- **The Government & Independence lens moves fastest.** Coups, elections, and
  transitions happen constantly across the continent — this reflects the best
  available reporting as of mid-2026. Verify current officeholders independently
  before treating any entry as current.
- This remains a **living reference**. Corrections, additional named sources, and
  further depth on any specific country or theme are always welcome — that's the
  intended next step, not an afterthought.

## Running locally

No build step. Just serve the folder statically:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Or open `index.html` directly in a browser (search and routing both work over
`file://`, though some browsers restrict local `fetch`/`XHR` — a local server is
the more reliable option for the Google Fonts import).

## Deploying to GitHub Pages

1. Create a new repository (or reuse an existing one) and push this folder's
   contents to the root of the `main` branch.
2. In the repo's **Settings → Pages**, set the source to "Deploy from a branch,"
   branch `main`, folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`
   within a few minutes.

No environment variables, API keys, or backend are required — everything runs
client-side from the JSON-like data files in `/data`.

## Project structure

```
index.html              — shell: loads fonts, styles, data, and the app
style.css                — design system (colors, type, layout)
app.js                    — rendering, routing (hash-based), and search
data/
  north-africa.js         — 8 countries
  west-africa.js           — 15 countries
  central-africa.js        — 9 countries
  east-africa.js            — 14 countries
  southern-africa.js        — 9 countries
```

Each country is a plain JS object pushed into `window.FORTE_DATA`:

```js
{
  id: "kenya", name: "Kenya", region: "East Africa", capital: "Nairobi",
  independence: "1963, from Britain",
  sections: {
    origins: [ "…", "…" ],
    biblical: [ "…", "…" ],
    ancient: [ "…" ],
    kingdoms: [ "…" ],
    religion: [ "…" ],
    colonial: [ "…" ],
    slavery: [ "…" ],
    government: [ "…" ],
    culture: [ "…" ],
    sources: [ "…" ]
  }
}
```

To deepen any country, find its file by region, locate the object by `id`, and
extend the relevant array(s). No other file needs to change — search and
rendering pick up new content automatically.

## A note on the Biblical & Genealogical Traditions lens

Every entry includes this as its own dedicated section, per the brief. It is
written deliberately as **received religious and interpretive tradition**
alongside each society's own indigenous origin account — not as verified
history. Genesis 10 (the "Table of Nations") names only a few Africa-associated
figures directly (Mizraim/Egypt, Cush/Nubia, Put, and Canaan via Phoenician
Carthage); later traditions extended "Hamitic" framing much further across the
continent, including, in the 19th and 20th centuries, in ways that were used to
construct racial hierarchies justifying colonization and slavery. Entries name
that history where relevant rather than passing over it.

## Corrections and deepening

This is a living reference. If something is wrong, incomplete, or you want a
specific country or theme deepened next, that's the intended next step —
just ask.
