# Current viewer: thin-stack margin and conditional force

The current prescribed held geometry is over center for all four sampled thicknesses. Thin stacks have the smaller geometric margin. This is not a solved force or lock simulation.

| Paper mm | Signed B-to-A–C distance mm | Angular margin beyond fixed-r toggle | Backing gap mm | Nominal1mm pad compression mm | dg/dr |
|---:|---:|---:|---:|---:|---:|
| .2 | +1.322582 | 2.266441deg | .985678 | .214322 | −1.650119 |
| 1 | +1.573210 | 2.728245deg | 1.814069 | .185931 | −1.642379 |
| 3.6 | +2.321941 | 4.203702deg | 4.494078 | .105922 | −1.607418 |
| 10 | +3.732338 | 7.754499deg | 11.010655 | 0 | −1.467491 |

Sign convention: cross(C−A,B−A)/|C−A| in the source xy coordinates. Values use the current viewer scale.825mm/imageunit, not earlier.3mm/imageunit models. Angular margin is180deg minus the A–B–C collinearity angle at that same held runner radius.

At10mm paper, the prescribed backing gap exceeds paper plus a1mm free pad by.010655mm. The nominal pad is clear of the paper. Therefore a positive free-spring force estimate must not be displayed as actual grip for that pose.

## Virtual work

Let v=C−B, C_phi=(-C_y,C_x), and e=(cos(theta),sin(theta)). Differentiating fixed BC length gives dphi/dr=(v·e)/(v·C_phi). Jaw height derivative is tip_x*dphi/dr. With physical runner radius, scale cancels from this derivative. For theta, replace e by r*(-sin(theta),cos(theta)) and multiply the resulting image-unit height derivative by scale.

An upward jaw force contributes generalized radial force Q*dg/dr, which is inward here. If the runner were free, its only other radial force were a constant0.6N outward spring, and contact equilibrium existed, Qfree=−.6/(dg/dr) would be .363610/.365324/.373270/.408861N. Current r is prescribed/captured, so that inference does not apply directly. Captured equilibrium instead includes R_capture:0=Fspring+Q*dg/dr+R_capture+other radial forces. The rack reaction allows many Q values; pad constitutive behavior and actual deformation must determine Q together with the contact solve.

The fixed-r jaw derivatives dg/dtheta are +4.487270,+5.276664,+7.459893,+10.379641mm/rad. Thus a positive jaw reaction alone drives theta farther closed, toward a stipulated unilateraltheta<=180deg stop. Conditional closing torques using Qfree would be1.63162/1.92769/2.78455/4.24383Nmm, but these are not actual handle torques; the10mm state has no nominal pad contact. Other cam/pawl/spring torque can change total released-handle balance. Prescribed theta180 by itself does not prove a physical stop or retained equilibrium.

## Minimum missing physical model

1. Pad force-compression law and actual free thickness/mounting, plus nonpenetration/bottomout.
2. Runner spring force versus its actual compression/preload.
3. Finite rack/pawl contact faces, unilateral normal reactions, clearance and the actual capture load path; include wall/bar/follower reactions rather than prescribing actuation and pawl angle independently.
4. A physical unilateral closed-handle stop, then input removed with theta and remaining unconstrained coordinates allowed to equilibrate. Test perturbations and reopening.

Friction may initially be explicitly zero. These laws and constraints must be solved jointly before reporting actual force versus thickness. No broad contact solver was run for this receipt.

## Verification and reproduction

run-001 holds model.snapshot.js, check.js, protocol.md and receipt.json. Current check.js snapshots the live source into a new named directory before analysis: run `node check.js run-002` for a new live snapshot. The saved source hash and Node version identify run-001. The root script never writes the viewer.

Centered differences at steps10^-2 through10^-5 mm/rad agree with analytic derivatives. Theta errors decrease approximately quadratically to at most6.61e-9mm/rad. Radial errors reach roughly1.1e-10 at10^-4mm and grow slightly from roundoff at10^-5mm; no monotonically improving accuracy claim beyond that point.

Provenance: Codex01a08ce3-1261-7a32-b5b7-33aeb5bb198b /root/model_review,2026-09-10. No viewer edits.

Exact-source replay with the root script: `node check.js replay-001 run-001/model.snapshot.js` (run from this directory). The optional third argument selects archived source; existing raw run directories are not overwritten.
