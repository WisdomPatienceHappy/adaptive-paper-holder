# Craighill reference reconstruction

Research date: 2026-09-10. Bounded primary-source search and inspection of existing project references. This preserves a source baseline separately from our adaptive-ratchet modification.

## Finding

No dimensioned drawing, downloadable CAD model, or physical scale for the **new lever-clamp prototype** was established in the sources inspected. The existing screenshot supports a useful silhouette and four visible pivot positions, but cannot establish exact metric geometry or hidden parts. The current 3D model is an image-inspired proposed mechanism, not a dimensional replica.

The official **New Desk Pad** waitlist exists and describes improved paper clamping and durability, but its accessible page text supplies no dimensions. The official **existing Desk Pad** product has dimensions, but uses two brass nuts and a perforated pad; it is a different construction and those measurements must not be silently transferred to the new clamp.

## Source and dimension table

| Item | Evidence/value | Type, units and confidence | Source / applicability |
|---|---|---|---|
| New Desk Pad development | Manufacturer waitlist; clamping goal; no dimensions in accessible text | Primary description, high confidence; no metric scale | [New Desk Pad](https://craighill.co/pages/new-desk-pad) |
| New product visual asset | Manufacturer page links an animated image | Primary visual reference; not a dimensioned drawing | [Official animation](https://craighill.co/cdn/shop/files/4web_2048x2048.gif?v=1777646117); endpoint located, animation not measured |
| Existing Desk Pad | 9 × 6 × 1 inches = 228.6 × 152.4 × 25.4 mm; 14 oz | Supplied manufacturer dimensions, high confidence **for old two-nut product only** | [Existing Desk Pad](https://craighill.co/collections/desk/products/desk-pad) |
| First prototype four pin centers | (209,127), (215,79), (247,59), (253,95) | Approximate image coordinates, pixels; medium visual confidence, no perspective correction | User screenshot preserved at the supplied reference image (not redistributed); visually reinspected in this task |
| Reconstructed jaw rocker | sqrt(6²+48²) = 48.374 image units | Derived from pixel centers; approximate projected length | Existing the retained pixel trace |
| Orange two-pin coupler | sqrt(32²+20²) = 37.736 image units | Derived from pixel centers; approximate projected length | Same screenshot; orange member appears rigid, not telescoping |
| Operating lever pivot span in photographed pose | sqrt(6²+36²) = 36.497 image units | Derived from pixel centers; approximate projected length | Same screenshot |
| Fixed pivot span | sqrt(44²+32²) = 54.406 image units | Derived projected length; topology inferred | Same screenshot |
| Earlier baseline metric scale | 0.3 mm/image unit | Analyst assumption, **not a source measurement** | the retained pixel trace explicitly labels illustrative |
| Current whole-model scale | 0.825 mm/image unit | Our design choice, **not a calibrated photograph** | Current model.js wholeState |
| Current jaw/coupler/fixed span at that scale | 39.909 / 31.132 / 44.885 mm | Calculated model lengths; source ratios preserved only in 2D projection | Current model, not manufacturer dimensions |
| Current B adaptation | 25–40 image-unit operating span (20.625–33 mm) | Our modification/design range | Current wholeState and root solver brackets; not observed in prototype |
| Clipboard context | 164 × 242 × 3 mm | Our provisional packaging | Current mesh coordinates; not sourced product dimensions |
| Runner, teeth, pawl, wall engager, springs | Added adaptive capture mechanism | Our proposal; dimensions and materials unverified | Current model; do not attribute these internals to Craighill |

## Original social references

- [Craighill Facebook development video](https://www.facebook.com/craighillcompany/videos/help-us-design-our-new-desk-padweve-been-working-on-this-project-for-a-few-month/904952972551225/). Earlier reference notes record browser inspection and an approximately one-to-one-hundred-sheet goal. Current web fetch failed, so that transcription was **not independently reverified** in this bounded pass. A sheet count is not a metric thickness specification.
- [Craighill Instagram four-bar exploration](https://www.instagram.com/reel/DC5LpRySHKU/). Earlier reference notes describe Vise-Grip linkage exploration. Current web fetch failed. It provides lineage, not an exact drawing of this adaptive proposal.

## Faithful reconstruction guidance

Keep the screenshot's compact L-shaped fixed body, left-projecting base, hooked moving jaw, orange short two-pin coupler and short upright lever in the source-baseline view. The local preserved screenshot visibly supports these features. A second preserved paper-holder orientation exists in the supplied paper-holder reference; it should inform orientation rather than introduce new metric measurements.

Label pivots by **role** when comparing versions: the old report's O/A/B/C correspond to current D/C/B/A. Otherwise a same-letter comparison can attach the wrong physical joint. Preserve a fixed-length source operating lever in the baseline; show the B runner and its variable effective span explicitly as the proposed alteration.

Do not infer scale from the fingers or assume paper is a standard size. A single perspective image has no known planar scale, and the out-of-plane plate spacing, shafts, bearing diameters, spring seats and widths cannot be reconstructed precisely from it. Current paired-plate depth, whole clipboard dimensions and central lock housing remain packaging assumptions.

Recommended public wording: “A concept study inspired by Craighill’s desk-pad development. Linkage proportions are reconstructed approximately from a supplied image; dimensions and added adaptive-lock parts are provisional.” Link to Craighill's original references. Do not imply collaboration, endorsement, CAD access, or successful original-product replication.

## Minimum information that would improve fidelity

One known distance between visible pivots plus a near-orthographic side view would calibrate planar lengths; a top/end view with plate spacing would constrain 3D packaging. Exact original pivot coordinates, travel stops and material/section dimensions are required before manufacturer-scale forces can be claimed. Until those exist, calculations should remain explicitly tied to our provisional geometry.
