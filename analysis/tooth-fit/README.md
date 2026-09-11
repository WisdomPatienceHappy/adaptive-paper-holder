# Finite tooth geometry audit

Run `node check.cjs` to reproduce receipt.json and samples.csv from the included exact current-model snapshot. An optional first argument selects another model.js. The SHA256 in the receipt identifies the evaluated source.

## Finding

The existing 0.6 mm wide rectangular pawl tip overlaps solid teeth at all four sampled hold thicknesses (0.2, 1, 3.6, 10 mm). The commanded pose is therefore not a finite-contact solution.

A proposed rigid triangular tip is supplied in candidate-tip.js. At the final commanded pawl angle it has base corners (-16.2,0.10), (-15.8,0.10) and apex (-16,0.78), in mm in the A-fixed xz plane. It rotates bodily about P=(-15,-1.7); the runner is never snapped and the tip never floats. Replace the existing capsule tooth arm with the provided tapered arm as well; its old 0.48 mm radius would defeat the slimmer tip. Extrusion halfwidth 0.65 mm lies inside the rack tooth halfwidth 1.4 mm, so projected overlap represents real solid overlap in this central strip.

The 0.68 mm high, 0.40 mm base triangle is narrower than the complementary gap. When centered in a gap, horizontal apex clearance is approximately 0.126 mm per side and vertical clearance to runner body is 0.22 mm. This is geometric room, not a manufacturing tolerance specification or loaded seating position. The candidate's free phase interval is 0.2730–0.5242 mm for bx=-33+shift over one 0.65 mm pitch (0.0001 mm sampling). That is only about 39% of phase positions. No fixed triangle of nonzero engagement can avoid every phase of a translating rack.

At hold the candidate is geometrically clear at 0.2 and 3.6 mm paper, but overlaps at 1 and 10 mm paper. Every sampled full cycle still has collision, including those with a clear final hold. The advancing rack reaches the commanded pawl during adaptation; reducing just the final tip size does not repair that timing. Intersections are recorded as projected mm², not penetration distance or force.

## Consequence

Integrating the helper is a shape improvement only. A mechanically meaningful continuation must let contact arrest pawl rotation at the actual rack phase, then allow compatible rack displacement/compliance to reach a gap (or adopt another explicitly modeled tooth geometry/engagement law). The pawl cannot be forced through a tooth to meet a prescribed angle. The rigid raised dwell may itself conflict with a contact-limited pawl; that actuator-contact compatibility needs solving too. Do not report this candidate as a working lock.

## Scope

1001 poses per thickness; convex polygon clipping against every tooth and rack body; phase sweep 6501 samples. No force equilibrium, friction, yielding, tolerances, full 3D housing collision, cam contact, or release-force calculation. All dimensions originate in the provisional viewer, not measured Craighill CAD.

## Collision-limited preview helper

`collisionLimitedPawl(bx, commandedPhi, clearance=0.02)` in candidate-tip.js scans from open 155° to commanded angle with subdivisions no larger than 0.2°, then bisects first blocked interval 45 times. It returns reachablePhi, blocked, measured Euclidean clearance and both rigid polygons. Use reachablePhi for the entire rigid 90° pawl, including follower; leaving follower at commandedPhi breaks rigidity.

Run `node check-limited.cjs`. On 804 current-cycle states minimum computed separation is 0.020000000000000004 mm, zero clearance deficit. 376 states are blocked; maximum angular deficit is 23.3644°. At hold, all four paper cases block on the *path*, even where the isolated final shape would fit. Reachable angles for 0.2/1/3.6/10 mm are 131.4320°/134.3646°/139.7632°/133.9090° versus commanded116.5651°. This catches swept interference missed by final-pose checks.

This remains a geometric first-contact preview independently restarted from open for every state, not temporal contact following or a physical reaction law. The positive 0.02 mm gap deliberately prevents visual penetration and does not represent loaded contact. The fixed engager/dwell can now disagree with the blocked follower; that mismatch must remain explicit. The 0.2° finite sampling is a numerical sweep, not an analytic proof over all intermediate angles.
