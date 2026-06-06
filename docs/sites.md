# Per-site implementation notes

## Greenhouse

- Uses React Select (`div.select__control`) for dropdowns — native `<select>` doesn't work
- Fill uses a MAIN world bridge (`__applydash_fill_select`) to dispatch keyboard events into React Select
- Best-match scoring for option selection: exact=3, prefix=2, substring=1
- Disability question label is ~180 chars — `matchFieldType` threshold raised to 300

## Lever

- Required field marker is `✱` (U+2731 Heavy Asterisk), not `*`
- Input elements are **inside** `<label>` — use `label.querySelector('input')`, not `nextElementSibling`
- Lever checks `isTrusted` on `InputEvent` — all input fills go through the MAIN world bridge (`__applydash_type_value`)
- Location autocomplete: types into input via trusted event, waits for `<ul> > <li>` suggestion list, clicks match

## Ashby

- CSS can bleed into injected UI — panel runs inside Shadow DOM to isolate styles
- Uses React fiber tree directly (`triggerReactHandler`) to fire `onClick`/`onChange` — bypasses `isTrusted` check
- Button groups (Yes/No): React fiber handler first, falls back to `MouseEvent`
- ARIA combobox (location): native setter + `InputEvent` + waits for suggestion list
- Date picker: clicks today's date cell in the calendar widget

## Shadow DOM panel

The floating panel (`panel.ts`) is mounted inside a Shadow DOM to prevent host-page CSS from affecting it.

- Host element: `div#applydash-root` with `position:fixed; width:0; height:0` inline — escapes CSS `contain`/`transform` stacking contexts
- All panel DOM queries use `shadowRoot.getElementById` / `shadowRoot.querySelector` instead of `document.*`
- Removing the host element (`document.getElementById('applydash-root').remove()`) tears down the entire panel
