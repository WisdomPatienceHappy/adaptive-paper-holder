# Editable assembly

Run `node cad/export.js` from the repository root to regenerate the default mesh and parameter JSON. Then run `blender --background --factory-startup --python cad/make-blend.py` to rebuild the editable Blender assembly. Each component is a named mesh. Parameters live in model.js; Blender custom properties are descriptive, not a live linkage rig. The export is provisional mesh geometry, not tolerance-checked CAD.
