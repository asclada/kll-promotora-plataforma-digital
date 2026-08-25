---
name: KLL Promotora
description: O site de um correspondente bancário construído como um documento carimbado — regrado, rotulado, sem nada escondido.
colors:
  indigo: "#301a86"
  indigo-deep: "#21125e"
  indigo-tint: "#e7e3f3"
  selo: "#ffe608"
  selo-deep: "#d9c400"
  paper: "#f0efe9"
  paper-2: "#e5e3d9"
  sheet: "#ffffff"
  ink: "#17161c"
  ink-2: "#4a4854"
  ink-3: "#66636f"
  rule: "#17161c33"
  rule-strong: "#17161c80"
  rule-ink: "#ffffff3d"
  rule-ink-strong: "#ffffff66"
  online: "#12703e"
  alerta: "#9a5b00"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 5vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.018em"
  headline:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Libre Franklin, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  mark: "2px"
spacing:
  row: "1rem"
  block: "2.5rem"
  section-mobile: "4rem"
  section-desktop: "6rem"
components:
  button-primary-on-ink:
    backgroundColor: "{colors.selo}"
    textColor: "{colors.ink}"
    rounded: "{rounded.mark}"
    padding: "12px 28px"
    height: "56px"
  button-primary-on-ink-hover:
    backgroundColor: "{colors.selo-deep}"
    textColor: "{colors.ink}"
  button-primary-on-paper:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.mark}"
    padding: "12px 24px"
    height: "48px"
  button-primary-on-paper-hover:
    backgroundColor: "{colors.indigo-deep}"
    textColor: "{colors.sheet}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.mark}"
    padding: "12px 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.indigo-tint}"
    textColor: "{colors.indigo-deep}"
  input-field:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.mark}"
    padding: "12px 16px"
    height: "48px"
  tab-row-selected:
    backgroundColor: "{colors.selo}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 16px"
  tab-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 16px"
---

# Design System: KLL Promotora

## Overview

**Creative North Star: "O Documento Carimbado"**

This is the website of a correspondente bancário — a licensed intermediary that
carries someone else's loan proposal to a bank. Its single hardest job is
proving it is real, because the audience (CLT workers, servidores, INSS
pensioners, militares) arrives braced for a scam. So the surface is built like
an official stamped document rather than like a bank advertisement: everything
sits on ruled rows, every figure is labelled, every actor in the process is
named, and the one graphic flourish the system allows itself is a rubber stamp
carrying the company's real CNPJ.

The inks are not chosen, they are inherited. The client's existing seal is a
yellow disc with an indigo-violet wordmark, and that indigo (`#301a86`) happens
to be the exact family of a Brazilian stamp pad. The system takes both colours
literally: indigo owns whole bands of the page as a printed field, and the
yellow is reserved for the places where a stamp would land — the primary
action, the selected row, the seal itself.

The confirmed anti-reference is the category default: the navy-to-blue gradient
hero with a smiling stock couple and a metallic gold accent, which is what every
consignado site in Brazil ships and what predatory lending advertising looks
like. Nothing in this system gradates, glows, or floats.

**Key Characteristics:**
- Ruled rows instead of card grids; the rule is the structural unit.
- Square corners by default; 2px exists only so a thumb-sized control does not cut the finger.
- Flat printed fields of colour; zero gradients anywhere in the system.
- Tabular figures on every rate, term, phone number and CNPJ.
- Body type starts at 17px because the audience includes 70-year-olds.
- One authored motion moment per surface, never scattered hover effects.

## Colors

A printed palette: two saturated inks from the client's own seal, laid on a
low-chroma paper ground, with no third accent invented to fill a slot.

### Primary
- **Tinta de Carimbo** (`#301a86`): the indigo-violet of a Brazilian stamp pad, taken from the KLL seal. It owns whole regions — the hero band, the differentials band, every closing CTA band, the footer — as a flat field, never as a gradient. Also the link colour and the icon colour on paper.
- **Tinta de Carimbo Profunda** (`#21125e`): the pressed state. Used for button hover on paper, and for the letterhead strip above the header so the strip reads as a darker impression than the band below it.

### Secondary
- **Amarelo Selo** (`#ffe608`): the seal yellow. It marks, it does not decorate. Three jobs only: the primary action sitting on an indigo band, the currently selected row in a segment list, and iconography inside the stamp. Yellow on indigo measures 10.25:1 — the highest-contrast pair in the system, which is why it carries the action.
- **Amarelo Selo Pressionado** (`#d9c400`): hover on the yellow plate.
- **Tinta Diluída** (`#e7e3f3`): a wash of the primary, used as the hover ground for outline controls on paper.

### Neutral
- **Papel** (`#f0efe9`): the document ground and the page background. A low-chroma warm grey, deliberately not cream — the paper of a form, not of a novel.
- **Papel Segundo** (`#e5e3d9`): the deeper sheet used for inset regions, condition tables, the partner strip and the chat transcript ground.
- **Folha** (`#ffffff`): a sheet lying on the ground. Reserved for the hero's assistant card and for agent message bubbles.
- **Tinta** (`#17161c`): body and heading text, a near-black carrying a violet cast so it belongs to the indigo family. 15.61:1 on paper.
- **Tinta Secundária** (`#4a4854`): supporting prose and definition-list terms. 7.77:1 on paper.
- **Tinta Terciária** (`#66636f`): captions, footnotes and placeholder markers. 5.09:1 on paper — still above the body-text floor, on purpose.

### State
- **Verde de Presença** (`#12703e`): the only green in the system, used exclusively for the "online" dot and label in the assistant card. It is state, not branding.
- **Âmbar de Aviso** (`#9a5b00`): form validation errors. Deliberately not the primary and deliberately not red, so an error never reads as danger on a page about money.

### Named Rules
**The Two Inks Rule.** The system has exactly two saturated colours, and both come from the client's seal. A third accent is not a gap to be filled; adding one breaks the claim that the page is printed rather than designed.

**The Stamp-Only Yellow Rule.** `#ffe608` appears only where a stamp would land: the primary action on an indigo field, the selected row, and the seal. Yellow never carries text on a light ground, and never fills a region larger than a control.

**The No Gradient Rule.** No gradient, anywhere, in any form — not on text, not on a band, not as a scrim. The only permitted soft edge in the whole system is the mask that fades the partner-logo marquee at its two ends, and that one is functional: it says the strip continues.

## Typography

**Display Font:** Archivo (with Arial Narrow, system-ui fallback)
**Body Font:** Libre Franklin (with system-ui, -apple-system fallback)

**Character:** Two grotesques from the signage-and-forms tradition, separated by
width rather than by genre. Archivo is drawn for highway signs and printed
forms; the file this project ships is instanced at its
expanded width (`wdth` 125) and subsetted to Portuguese, so every Archivo
glyph on the site is expanded and the whole face costs 28 KB. At weight 900
it reads as something pressed into paper. Libre Franklin is a Franklin Gothic revival with a
tall x-height and open apertures, which is what a 68-year-old reading a benefit
statement actually needs. The jump from expanded-black display to normal-regular
text is large enough that the two never read as the same voice.

### Hierarchy
- **Display** (900, `clamp(1.75rem, 5vw, 4rem)`, 1.02): page `h1` only. Phones use the single `display-xs` step (1.75rem), proven against the longest real word in the copy — "Correspondente" — at 360px.
- **Headline** (900, 2–2.5rem, 1.15): section titles, always sitting on a rule.
- **Title** (700, 1.375–1.625rem, 1.45): sub-section headings, clause titles, card headings.
- **Body** (400, 1.0625rem base / 1.1875rem in prose contexts, 1.65): all running text. Measure capped at 68ch.
- **Label** (600, 0.75rem, 0.14em, uppercase): column headings on definition lists, the "quem faz" markers, breadcrumbs and the letterhead strip. Never used as an eyebrow above a heading.
- **Micro-label** (600, 0.625rem, 0.02em, uppercase): the letterhead strip below 640px only. The single step below Label; nothing in the system goes smaller.

### Named Rules
**The No Eyebrow Rule.** A small uppercase label never sits above a heading to introduce it. Labels head their own blocks (a table, a list, a strip); headings carry themselves.

**The Tabular Figures Rule.** Every rate, term, percentage, phone number, CNPJ, opening hour and clause number is set in tabular lining figures. In this product every number is money, time or identity, and columns of them must align.

**The Long Word Rule.** Portuguese runs long and the display face is expanded, so headings carry `hyphens: auto` under `lang="pt-BR"`. Any new heading must be run at 360px with real copy before it ships.

## Layout

A single centred container at 72rem (`max-w-6xl`) with 20px gutters on phones
and 32px from 640px up. Sections breathe at 64px vertical on mobile and 96px on
desktop; the two legal routes and the FAQ run narrower at 48rem inside the same
container, left-aligned to the `h1` above them rather than centred.

The structural unit is the **ruled row**, not the card: a full-width flex or
grid row with a 1px bottom rule, generous vertical padding (16–20px), and its
label and value pushed to opposite ends. Definition lists, segment selectors,
FAQ entries, step lists, footer navigation and condition tables are all the same
row at different densities. Multi-column regions divide with a vertical rule on
the column itself, never with a border drawn around a box.

Page rhythm alternates ground: an indigo band, then paper, then a deeper paper
inset, then indigo again, then paper for the close. A dense passage is always
paid for with a quiet one, and every route ends anchored on a real closing band
that carries both the action and the two phone numbers.

Responsive behaviour is written mobile-first and the phone layout is the primary
composition, not a reduction: on the home hero the source order is headline,
then the action card, then the reassurance list, because the card must clear the
fold on a 360×780 screen. Touch targets never go below 44px, and every primary
action is 56px tall.

## Elevation & Depth

Almost flat. Depth comes from tonal layering — paper, deeper paper, white sheet —
and from rules, not from shadow. Exactly one element in the system is lifted:
the assistant card in the hero, which is a white sheet lying on an indigo field
and needs to read as a physical thing you can pick up.

### Shadow Vocabulary
- **Sheet** (`0 1px 0 #17161c14, 0 18px 40px -22px #17161c73`): the chat message bubbles and small raised surfaces. A hairline contact edge plus a wide, low-opacity cast.
- **Lift** (`0 2px 0 #17161c1f, 0 28px 64px -26px #17161c8c`): the hero assistant card, and nothing else.

### Named Rules
**The One Lifted Thing Rule.** At most one element per viewport carries a shadow. Everything else is flat and separated by a rule or by a change of ground.

**The Real Shadow Rule.** Every shadow has both a vertical offset and a soft blur. A zero-offset coloured halo is decoration and is not part of this system; neither is a hard block shadow.

## Shapes

Square. Documents do not have rounded corners, and neither does this system:
sections, sheets, images, tables, bands and selected rows are all `0px`. The
single exception is `2px` (`rounded-mark`) on interactive controls — buttons,
inputs, chips, icon buttons — where a perfectly sharp corner is unkind to a
thumb. There is no `8px`, no `12px`, no pill, and no circle other than the
stamp and the client's own seal, both of which are circular because a stamp is.

Borders are hairlines. `rule` (`#17161c33`) separates rows inside a group;
`rule-strong` (`#17161c80`, measured at 3.3:1 against paper) draws every real UI
boundary — input fields, control outlines, section rules, group edges. Coloured
borders thicker than 1px do not exist in the system.

The recurring silhouette is the **stamp**: a hand-authored SVG of two concentric
rings with text on arcs between them and the CNPJ ruled across the middle,
rotated a few degrees off axis. It appears once per page at most, at the moment
the page asks for trust.

## Components

### Buttons
- **Shape:** effectively square, softened to 2px (`rounded-mark`). Label in Archivo semibold or bold; icon and label share a 10px gap.
- **Primary on an indigo band:** yellow plate, ink label, 56px tall (`{components.button-primary-on-ink}`). This is the loudest thing on any page and there is only ever one per viewport.
- **Primary on paper:** indigo field, white label, 48px tall.
- **Outline (secondary):** transparent with a 1px `rule-strong` edge; on hover the edge turns indigo and the ground fills with the indigo wash. On an indigo band the outline variant uses a white edge and inverts to a white plate on hover.
- **Hover / Focus:** colour only, 150ms. Arrow icons nudge 4px on the parent's hover with an exponential ease-out, and that nudge is removed under `prefers-reduced-motion`.

### Inputs / Fields
- **Style:** white ground, 1px `rule-strong` edge, 2px corners, 48px minimum height, 17px text. Labels are always visible above the field, never placeholders doing a label's job.
- **Focus:** the global focus ring (below).
- **Error:** the edge turns amber and a message appears below the field with an icon, wired via `aria-describedby` and `aria-invalid`; submit moves focus to the first invalid field.
- **Disabled:** ground drops to `ink-3` with the cursor blocked; used on the submit button while the WhatsApp hand-off is in flight.

### Focus ring
A dual ring, because the system has both very light and very dark grounds: a 3px
yellow outline offset 2px, wrapped in a 5px `indigo-deep` box-shadow. On paper
the dark ring reads; on an indigo band the yellow ring reads; on a yellow plate
the dark ring reads. Never removed, never replaced per-component.

### Chips / Selectable rows
- **Style:** a full-width ruled row, not a pill. Name in Archivo bold with a qualifier line beneath in `ink-2`.
- **State:** the selected row is filled with the seal yellow and takes a check icon; unselected rows are transparent with an arrow and take the deeper paper on hover. Every option in a set stays visible at all times — the set is never collapsed behind the selection.

### Navigation
- **Header:** sticky, two decks. A `indigo-deep` letterhead strip carrying the regulatory line and the CNPJ, then a paper bar with the seal, the links, the phone number and a WhatsApp plate. The phone number and WhatsApp action are visible at every breakpoint, including 360px.
- **Link states:** `ink-2` by default with a transparent 2px bottom border; the border turns `rule-strong` on hover and seal yellow on the current page.
- **Mobile:** below 1024px the links collapse behind a bordered icon button into a full-width ruled list of 56px rows. The phone and WhatsApp actions never collapse.
- **Footer:** an indigo field with the full NAP as a real `<address>`, three ruled link columns, the stamp, and the correspondente disclosure.

### Assistant card (signature component)
The hero's right column: a white sheet on the indigo field, the only element in
the system carrying the **Lift** shadow. It has a letterhead strip (seal, name,
and — once opened — a presence dot and a restart control) and two states in the
same box. Closed, it holds a heading, one line of promise, the yellow plate, a
lock-icon safety line and the opening hours. Opened, the same box becomes a
WhatsApp-grammar transcript on the deeper paper ground: agent bubbles left on
white sheets, the visitor's answer right on an indigo plate, a three-dot typing
indicator, and the choices as ruled rows. It never opens by itself, never
becomes a modal, and never navigates.

### Stamp (signature component)
A hand-drawn SVG seal: outer ring at 3.5px, a hairline second ring, an inner
ring, text on arcs between the outer pair, and the CNPJ ruled across the centre.
Two tones — indigo on paper, seal yellow on indigo. Rotated 3–6° off axis so it
reads as applied rather than placed. Every word on it is a verifiable fact; it
carries no regulator's mark and asserts no endorsement.

## Do's and Don'ts

### Do:
- **Do** build new sections as ruled rows: a full-width row, a 1px `rule-strong` bottom edge, label left and value right.
- **Do** give every quantity `tabular-nums` — rates, terms, phone numbers, CNPJ, hours, clause numbers.
- **Do** let indigo own whole regions. A band is a printed field, edge to edge, not a tinted box floating in white space.
- **Do** keep the seal yellow for the single primary action, the selected row, and the stamp.
- **Do** run every new heading at 360px with the real Portuguese copy before shipping it.
- **Do** keep body text at 17px or larger and secondary text at `ink-2` or darker; the floor is 4.5:1 and it is measured, not estimated.
- **Do** name the actor in any process step — você, KLL, banco parceiro — rather than writing in the passive.
- **Do** mark unconfirmed content as a visible placeholder (dashed edge plus a plain-language note), never as invented copy.

### Don't:
- **Don't** use `rounded-lg` or any radius above 2px. Corners in this system are square by decision.
- **Don't** build a grid of same-size cards with an icon, a heading and a paragraph. That is the scaffold this world exists to refuse; use ruled columns divided by a vertical rule instead.
- **Don't** nest a card inside a card, or draw a border around a group that already sits on its own ground.
- **Don't** add a gradient, a glass panel, a blurred scrim or a glow. Not on text, not on a band, not on a hero.
- **Don't** put a small uppercase label above a heading. Headings carry themselves.
- **Don't** use an emoji as an icon. Icons are Lucide at a consistent stroke, or authored SVG in the same weight.
- **Don't** number sections `01 / 02 / 03` unless the sequence is information the reader needs — the process steps and the legal clauses qualify; a list of benefits does not.
- **Don't** introduce a third saturated colour, a second green, or red. The palette is two inks from the seal plus paper.
- **Don't** kill motion wholesale under `prefers-reduced-motion`. Stop the loops, land the entrances finished, and keep colour feedback.
