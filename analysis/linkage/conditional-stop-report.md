# Conditional released-stop comparison

Ideal latch fixes the previously prescribed capture radius. Pad and springs are provisional laws, not measured components. This is an algebraic fixed-radius comparison, not a solved acquisition/release cycle or physical pawl-contact result.

| Paper mm | Stop deg | Jaw N | Over-center deg | Latch radial reaction N | Net closing torque N mm |
|---:|---:|---:|---:|---:|---:|
| 0.2 | 179 | 0.5491 | 1.266 | 0.2760 | 0.6941 |
| 0.2 | 180 | 0.4286 | 2.266 | 0.0930 | 1.2634 |
| 0.2 | 181 | 0.2344 | 3.266 | -0.2209 | 0.8844 |
| 1 | 179 | 0.5203 | 1.728 | 0.2011 | 1.0476 |
| 1 | 180 | 0.3719 | 2.728 | -0.0287 | 1.3022 |
| 1 | 181 | 0.1506 | 3.728 | -0.3882 | 0.4403 |
| 3.6 | 179 | 0.4385 | 3.204 | -0.0260 | 1.7884 |
| 3.6 | 180 | 0.2118 | 4.204 | -0.3814 | 0.9203 |
| 3.6 | 181 | 0.0000 | 5.204 | -0.7219 | -0.6772 |
| 10 | 179 | 0.3149 | 6.754 | -0.4729 | 2.1571 |
| 10 | 180 | 0.0000 | 7.754 | -0.9332 | -0.6600 |
| 10 | 181 | 0.0000 | 8.754 | -0.9332 | -0.6772 |

Positive net closing torque can be balanced by the stipulated unilateral closed stop without input force. Negative torque means that stop cannot hold the released pose. Latch reaction is positive outward and negative inward; both signs occur, so bidirectional retention is a real obligation. These are radial generalized reactions, not tooth-normal/pawl-pin vectors.

At179deg, all four sampled states have positive grip and closing torque, but the0.2mm stack has only1.266deg geometric over-center margin. This suggests an earlier stop to investigate; it does not establish robust capture or a sufficient grip. At180deg the10mm state loses pad contact and the return spring opens the handle. At181deg the3.6mm state also loses contact.

Required wall-driven stroke is3.884949,4.000000 and4.115356mm at179/180/181deg respectively. Every181deg row exceeds the currently declared4mm travel and is an extended-travel hypothetical comparison, not feasible within that limit. Increasing over-center angle can reduce grip by opening the jaw farther after center.

Assumptions:1mm free pad,2N/mm pad stiffness; radial spring Fr=.6+.05(33-r)N outward; actuator return FE=.02+.02s N opposing positive stroke. R_latch=−Fr−Q(dg/dr). Stroke s=3+6.6tan(theta)−sec(theta), unclamped; ds/dtheta=6.6sec²(theta)−sec(theta)tan(theta). Net torque tau=Q(dg/dtheta)−FE(ds/dtheta). All angles inside these equations are radians. The radial spring contributes no theta torque on this frozen-r branch.

With a stipulated40mm perpendicular hand moment arm, signed quasistatic hand force is−tau/40 (positive closing). For a stable stopped state actual required holding force iszero, and initial opening force is tau/40. At180deg those initial opening thresholds are0.03159/0.03255/0.02301N for .2/1/3.6mm;10mm instead needs0.01650N closing force merely to retain the prescribed pose, with no grip. These are local initial thresholds, not peak release/acquisition effort or measured hand force. Full per-case values are in receipt.json.

Unclamped stroke derivatives checked by centered differences, errors below1.3e-9mm/rad. Original source snapshot remains unchanged. Run `node conditional-stop.js conditional-stop-002` from this directory to reproduce against the frozen source. No public viewer changes.
