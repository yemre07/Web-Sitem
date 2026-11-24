---
name: Yunus Emre Ersoy Portfolio
description: A bilingual personal plate book in slate and oatmeal stock, with one madder-red root dye and Anatolian geometric ornament.
colors:
  slate: "#3c4246"
  slate-deep: "#2c3134"
  stone: "#6b6f72"
  stone-ink: "#565a5d"
  fog: "#a7aaa7"
  oat: "#e8e4da"
  oat-light: "#f1eee7"
  sand: "#d6cdba"
  madder: "#b02e2e"
  madder-deep: "#8b2121"
typography:
  display:
    fontFamily: "Tektur, Commissioner, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Tektur, Commissioner, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  section:
    fontFamily: "Tektur, Commissioner, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Tektur, Commissioner, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0.02em"
  lead:
    fontFamily: "Commissioner, Segoe UI, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Commissioner, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  article:
    fontFamily: "Commissioner, Segoe UI, sans-serif"
    fontSize: "1.09rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Martian Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  rail: "236px"
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(48px, 7vw, 96px)"
  grid-gap: "24px"
  cell: "28px clamp(18px, 2vw, 28px) 26px"
  unit-body: "20px 20px 22px"
  content-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.madder}"
    textColor: "{colors.oat-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  button-primary-hover:
    backgroundColor: "{colors.madder-deep}"
    textColor: "{colors.oat-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.oat-light}"
  link-ruled:
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    padding: "0 0 8px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    padding: "10px 8px"
  nav-item-active:
    backgroundColor: "{colors.oat-light}"
    textColor: "{colors.madder}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    padding: "14px 18px 14px 36px"
  filter-active:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.oat-light}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 9px"
  tag-active:
    backgroundColor: "{colors.madder}"
    textColor: "{colors.oat-light}"
  category:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.oat-light}"
    typography: "{typography.label}"
    padding: "7px 10px"
  input:
    backgroundColor: "{colors.oat-light}"
    textColor: "{colors.slate-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
  unit:
    backgroundColor: "{colors.oat-light}"
    textColor: "{colors.slate-deep}"
    rounded: "{rounded.none}"
    padding: "{spacing.unit-body}"
  photo-plate:
    backgroundColor: "{colors.oat-light}"
    textColor: "{colors.slate-deep}"
    rounded: "{rounded.none}"
    padding: "14px 16px 16px"
  footer:
    backgroundColor: "{colors.slate-deep}"
    textColor: "{colors.sand}"
---

# Design System: Yunus Emre Ersoy Portfolio

## Overview

**Creative North Star: "The Pattern Plate Book"**

The site is a printed ornament plate book. Every page is a numbered Plate (Levha), and every project, photograph and article is a numbered unit framed in a fine slate keyline, with a ruled caption at its foot. The stock is oatmeal paper and carved slate; the only colour that is not stone or paper is madder (kökboya), the kilim root dye, which marks what is selected, numbered, or the one action asked of the visitor. The world comes from the Breton ornament program, fused with Anatolian kilim and Seljuk stone geometry: diamonds, eight-point stars and hooked rhombi drawn as hard-edged SVG units, and a repeating border band that separates every plate head from its body.

Density is that of a catalogue, not a landing page. Cells share keylines instead of floating with gaps; captions are set in tracked mono caps; headings are constructed Tektur capitals with squared terminals. A fixed left rail holds the monogram, the numbered plate index (01 to 06), the TR/EN switch and a plate box naming the current plate. Motion is a single grammar: ornament units turn on the diagonal (45 degrees) and settle with a long ease-out, and the red key unit slides into the border band and locks.

**Key Characteristics:**
- Oat ground, oat-light raised units, sand recessed media wells, slate panels and footer.
- 1px slate keylines around and between every unit; square corners everywhere.
- One red: madder, for the active state, plate numbers, the primary action and focus.
- Three type voices: Tektur caps (names, headings), Commissioner (reading), Martian Mono tracked caps (numbers, captions, controls).
- Ornament as structure: the band, rule dividers, corner studs and SVG units, never as wallpaper.

## Colors

A cool slate-and-oatmeal stone palette with a single root-dye red.

### Primary
- **Madder Root Red** (madder): the primary action button, the active nav number and label, selected tags and filter diamonds, plate and unit numbers, list markers, the focus ring, text selection, and the accent diamonds inside ornament units and the band.
- **Deep Madder** (madder-deep): hover state of the primary button and its border keyline.

### Neutral
- **Plate Slate** (slate): all keylines, headings, the carved-stone hero panel, the active filter fill, category chips, the band ground.
- **Deep Slate** (slate-deep): body text, the footer ground, the portrait frame and lightbox field, the band's 3px edge rules.
- **Stone** (stone): secondary strokes (inactive filter diamonds, tags, inactive stitches, dark-ground dividers).
- **Stone Ink** (stone-ink): muted text that must still pass contrast: labels, dates, unit type, caption tickets.
- **Fog** (fog): light hairline dividers inside units (facts, tools, tickets, contact rows) and labels on dark ground.
- **Oatmeal Stock** (oat): the page ground and rail.
- **Light Oatmeal** (oat-light): raised units, the active nav cell, form fields, text on slate and madder.
- **Sand** (sand): recessed media wells behind images, inline code, ornament strokes in the band, captions on slate.

### Named Rules
**The Kökboya Rule.** Madder is the only chromatic colour. It marks the selected unit, the plate number, the focus ring and the one primary action per view; it never fills a surface larger than a button or chip.

**The Plate Stock Rule.** Surfaces come only from oat, oat-light, sand, slate and slate-deep. A unit is raised by stepping from oat to oat-light, recessed by sand, and inverted by slate; never by a new hue.

## Typography

**Display Font:** Tektur (with Commissioner, sans-serif), self-hosted variable woff2
**Body Font:** Commissioner (with Segoe UI, sans-serif), self-hosted variable woff2
**Label/Mono Font:** Martian Mono (with ui-monospace, Cascadia Mono, monospace), self-hosted variable woff2

**Character:** Tektur's constructed, square-terminal capitals read like letters cut into a stone plate; Commissioner is a calm humanist sans for reading; Martian Mono in tracked caps is the catalogue's numbering and captioning hand.

### Hierarchy
- **Display** (800, clamp(3rem, 7.4vw, 6rem), 0.92, uppercase): the home name, one word per line.
- **Headline** (800, clamp(2.8rem, 7vw, 5.6rem), 0.92, uppercase): plate heads on inner pages; article titles step down to clamp(2.2rem, 5.4vw, 4.2rem), max 18ch.
- **Section** (700, clamp(1.9rem, 3.6vw, 2.9rem), 1.02, uppercase): section heads above a rule divider.
- **Title** (700, 1.02 to 1.3rem, uppercase, 0.02 to 0.03em tracking): unit, photo, plate-row, interest and CV entry titles.
- **Lead** (400, 1.2rem, 1.6, max 58ch): one sentence under a plate head.
- **Body** (400, 1.0625rem, 1.65; 1rem under 620px): running text, max 68ch. Articles set at 1.09rem / 1.75.
- **Label** (500, 0.7 to 0.74rem, 0.12 to 0.16em tracking, uppercase): nav, buttons, filters, captions, dates, unit numbers, table heads. Tabular figures wherever digits align.

### Named Rules
**The Three Voices Rule.** Tektur speaks only in capitals for names and headings; Commissioner carries every sentence; Martian Mono carries every number, caption and control. Do not cross the roles.

**The Numbered Unit Rule.** Every plate and unit carries a mono number (01, P-01, F-01) in madder or stone-ink; numbers are tabular and sit in the caption row, not above the heading as a kicker.

## Layout

A two-column shell: a sticky 236px rail with a 1px slate right edge, and a main field whose content wraps at 1280px with a fluid gutter of clamp(20px, 4vw, 56px). Sections breathe at clamp(48px, 7vw, 96px) block padding. Every inner page opens with a plate head (headline plus lead on the left, a large ornament unit on the right, aligned to the baseline), followed immediately by the ornament band.

Rows of equal cells (the home plate row, interests, filters, unit caption rows, foot tickets) share keylines: cells sit edge to edge, separated by 1px slate borders, not gaps. Free grids of units (projects, gallery strip, featured) use a 24px gap with each unit carrying its own keyline. The gallery is a 3-column masonry (min 280px columns).

Responsive: at 1180px four-cell rows become two; at 960px the rail is replaced by a sticky top bar (monogram, TR/EN, Menu button) opening a two-column plate index, and the hero, about, contact and featured grids stack; at 620px all rows go to one column, the CV table becomes stacked rows, and the plate-head ornament is hidden.

### Named Rules
**The Shared Keyline Rule.** Cells in a row share one 1px slate border; units in a free grid each own theirs. Never both a gap and a doubled border.

## Elevation & Depth

Flat plate stock. Depth comes from tonal steps (oat to oat-light to sand) and keylines, not shadows. The buttons carry an inset double keyline (a 4px band of their own fill, then a 1px light or slate line) that reads as a printed frame, not a lift. True outer shadows are reserved for objects that physically sit on top of something: the portrait frame on the carved slate panel, the open mobile menu, and the red key unit locking into the band.

### Shadow Vocabulary
- **Portrait lift** (`box-shadow: 0 24px 48px -20px rgba(20, 22, 24, .7)`): the framed portrait resting on the slate hero panel only.
- **Menu drop** (`box-shadow: 0 24px 40px -24px rgba(20, 22, 24, .5)`): the open mobile plate index.
- **Key drop** (`filter: drop-shadow(0 2px 3px rgba(0, 0, 0, .35))`): the red key unit in the band.
- **Inset plate frame** (`box-shadow: inset 0 0 0 4px var(--madder), inset 0 0 0 5px rgba(241, 238, 231, .75)`): the primary button's printed inner keyline; the ghost variant uses oat and slate.

### Named Rules
**The Flat Plate Rule.** Units, cards, fields and panels never cast shadows. Lift a surface with oat-light or invert it with slate.

## Shapes

Square corners throughout (0px radius, including form fields). The only non-orthogonal shape is the rotated square: diamonds appear as filter markers, skill stitches, rule-divider centres, corner studs on the plate box, and the ornament units themselves. Ornament units are hard-edged SVG on a 32-unit grid, built from evenodd diamonds, stepped squares and hooked rhombi, filled with currentColor and one accent path in madder (or stone/oat-light by context). The border band is a 36px slate strip (22px thin variant) with 3px slate-deep edges, repeating a sand-outlined diamond chain with sand and madder centre diamonds and fog studs.

### Named Rules
**The Square Corner Rule.** No border-radius anywhere. Softness, where it is wanted, comes from turning a square 45 degrees.

## Components

### Buttons
Printed, framed, tactile.
- **Shape:** square (0px), 1px border plus inset double keyline.
- **Primary:** madder fill, oat-light mono caps at 0.74rem / 0.16em, padding 16px 20px, a 14px ornament unit after the label.
- **Hover / Focus:** fill and inner frame deepen to madder-deep over 0.25s; active nudges 1px down; focus is the global 2px madder outline at 3px offset.
- **Ghost:** transparent with slate text and a slate inner keyline on oat; hover inverts to slate fill with oat-light text.
- **Ruled link:** mono caps with a 1px slate underline rule 8px below; the trailing diamond slides 4px and turns 45 degrees on hover.

### Chips
- **Category:** solid slate block, oat-light mono caps, a small ornament unit; one per article.
- **Tag:** 1px stone outline, slate mono text, padding 6px 9px; hover and pressed fill madder with oat-light text. Tags filter the article index.

### Cards / Containers (Units)
- **Corner Style:** square.
- **Background:** oat-light, with a sand media well behind the image.
- **Shadow Strategy:** none (Flat Plate Rule).
- **Border:** 1px slate around the unit and below the media; a caption row of shared-keyline cells (number in madder, title, type in stone-ink).
- **Internal Padding:** 20px 20px 22px.
- **Behaviour:** image scales 3 to 4% over 0.8s on hover; a red diamond lock unit drops into the top keyline on hover or focus-within.

### Inputs / Fields
- **Style:** oat-light field, 1px slate border, 0px radius, Commissioner 1rem, padding 13px 14px; mono caps label above.
- **Focus:** border thickens via an inset slate ring plus a 3px madder halo at 25% alpha.
- **Error:** madder border and inset ring, madder message below.

### Navigation
- **Rail:** monogram and stacked brand name, a rule with a madder diamond, then six numbered plates. Each item is a three-column grid (ornament unit, mono caps label, tabular number).
- **Hover:** fog keyline appears, the ornament unit turns 45 degrees.
- **Active:** oat-light cell, slate keyline, madder label, number and unit.
- **Rail foot:** a two-cell TR/EN switch (current language filled slate) and the plate box with madder corner studs naming the current plate number in Tektur.
- **Mobile:** sticky top bar with monogram, compact TR/EN and a slate Menu button whose icon turns 135 degrees; the plate index drops down as a two-column grid.

### Filter Bar
A single keylined strip of shared-border buttons in mono caps, each led by a stone-outlined diamond. Pressed: slate fill, oat-light text, and the diamond fills madder and turns to 225 degrees.

### Ornament Band
The full-width divider under every plate head and the home hero (see Shapes). On load, the red key unit slides in from the right, rotating a half turn, and locks at the gutter edge (1.1s, 0.35s delay).

### Photo Plate and Lightbox
Photos are keylined plates with a slate button well, Tektur caps title, Commissioner caption, and a foot ticket (category left, madder plate number right) above a fog hairline. The lightbox opens the photo as a full plate: slate-deep field at 94%, a mono caps top bar, the image in a sand keyline with 8px slate-deep mat revealed top-down by a clip-path wipe (0.6s), and a caption row with 44px square sand-outlined controls.

### Stitch Meter
Skill levels drawn as a row of small rotated squares: stone outline when off, slate when on, the final lit stitch in madder; the numeric value sits right in mono tabular figures.

### Ruled List and CV Table
Rows separated by full slate keylines, a mono number or date column on the left in stone-ink or madder, Tektur caps titles, Commissioner body. The current CV entry carries a madder "now" marker with a small diamond.

### Footer
Slate-deep ground, sand text, oat links (white on hover), Tektur caps name, mono caps column heads in fog, square 44px social cells outlined in stone; a base strip of mono caps in fog above a stone hairline.

## Do's and Don'ts

### Do:
- **Do** frame every unit, cell, field and panel in a 1px slate keyline with square corners.
- **Do** reserve madder for the selected state, plate and unit numbers, focus, and the single primary action in a view.
- **Do** set every number, caption, date and control label in Martian Mono caps at 0.7 to 0.74rem with 0.12 to 0.16em tracking.
- **Do** open every inner page with a plate head followed directly by the ornament band.
- **Do** draw ornament as hard-edged inline SVG units with one accent path, and turn them on the diagonal (45 degrees) for hover.
- **Do** use the ease cubic-bezier(.16, 1, .3, 1) for movement and honour prefers-reduced-motion.

### Don't:
- **Don't** round corners; radius is 0px everywhere.
- **Don't** introduce a second chromatic hue or use madder as a large surface fill.
- **Don't** put shadows on units, cards or fields; only the portrait, the open mobile menu and the band key carry one.
- **Don't** place a mono label above a heading as a kicker; numbers and labels sit in caption rows, beside headings, or in the plate box.
- **Don't** use icon fonts or emoji; every icon is an inline SVG ornament unit or a simple stroked SVG.
- **Don't** set Tektur in lowercase or for running text.
