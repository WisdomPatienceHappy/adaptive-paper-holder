# Adaptive paper holder

Interactive concept study by Wisdom Happy, prepared for discussion with Craighill.

## View
Open https://wisdompatiencehappy.github.io/adaptive-paper-holder/ or serve this directory with any static HTTP server. No build step or external runtime requests are required.

Drag to orbit, scroll with two fingers to pan, pinch or use +/− to zoom. Use Whole clipboard, Lock close-up and Frame contact for orientation. Pause or scrub the cycle, adjust illustrative paper thickness, select and isolate parts. Manual part edits pause the animation and may produce overlaps.

## Proposed mechanism
B sits at the outer end of an inward-extending toothed runner. An adaptation spring acts inside A. A two-arm pawl pivots on A. A separate parallel engager slides when its rear end meets a stationary stop; its integral ramp and raised dwell are intended to seat and retain the pawl. A centered return spring restores the engager.

## Evidence boundary
The current model is a geometric illustration, not a force/contact simulation. `wall-stroke-check.json` records only the ideal rear-stop relation: 100–180 degrees, 4 mm axial travel, contact point within the proposed stop. Full collision clearance, tooth engagement, stable retention, release timing, force, friction and manufacturability remain unresolved. Spring rates, preload, pad stiffness and handle boundary conditions are not calibrated. Paper thickness is an illustrative parameter, not a verified operating range. Older mechanisms and their test results are deliberately excluded.

## Files
- `model.js`: provisional parametric geometry and prescribed cycle
- `viewer.js`: Three.js rendering and controls
- `index.html`: explanation and interface
- `vendor/`: Three.js 0.180.0, MIT license retained

## Attribution
Inspired by Craighill's public desk-pad/paper-holder exploration; reference links appear on the page. Independent study, no affiliation or endorsement implied. No reference media is redistributed. Original study code has no additional license grant specified; third-party code remains under its included license.
