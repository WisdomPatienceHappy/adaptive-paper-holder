# Current wall-driven viewer: geometric and virtual-work receipt

2026-09-10, Codex /root/model_review, task01a08ce3-1261-7a32-b5b7-33aeb5bb198b. Read-only use of public viewer model.js; snapshot hashed into new run directory. No edits to viewer and no equilibrium/contact solver.

Sample paper0.2,1,3.6,10mm atwholeState pose0.75 (heldtheta180). Signed B-to-A-C distance =cross(C-A,B-A)/norm(C-A), multiplied by source scale. Derive dgap/dr and dgap/dtheta analytically fromcircle intersection closure and compare centered differences atfour step sizes. r derivative usesphysicalmm;theta usesradians. Find fixed-r A-B-C collinearity angle and report180-minus-angle. Report backing gap, nominal1mm padcompression/clearance. The provisional0.6N constantoutward runnerforce gives Qfree=−.6/(dg/dr) ONLY with free r, no rackreaction or other radial force. Current prescribed heldr is NOT such an equilibrium solution.

A positive Q*dgap/dtheta is the jaw's closing torque, balanced by a stipulatedunilateraltheta<=180 stop. This is a conditional virtual-work direction; actualgrip,camreaction,pawlcontact and totalreleased-handle equilibrium are not solved. Runtime/sourcehash and rawderivatives are recorded.
