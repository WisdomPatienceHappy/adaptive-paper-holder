import bpy,json,math
from pathlib import Path
from mathutils import Vector
P=Path(__file__).parent
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.unit_settings.system='METRIC';scene.unit_settings.scale_length=.001
materials={}
for part in json.loads((P/'scene.json').read_text()):
 color=part['color']
 if color not in materials:
  mat=bpy.data.materials.new(color);rgb=tuple(int(color[i:i+2],16)/255 for i in (1,3,5));mat.diffuse_color=(*rgb,1);materials[color]=mat
 mesh=bpy.data.meshes.new(part['name']);mesh.from_pydata(part['v'],[],part['f']);mesh.update();obj=bpy.data.objects.new(part['name'],mesh);scene.collection.objects.link(obj);obj.data.materials.append(materials[color]);obj['scope']='Provisional packaging, no validated clearance';obj['category']=part['kind']
 if part['kind']=='cover':obj.hide_set(True);obj.hide_render=True
controller=bpy.data.objects.new('PARAMETERS — edit model.js and regenerate scene',None);scene.collection.objects.link(controller)
for k,v in json.loads((P/'parameters.json').read_text()).items():controller[k]=v
controller['notes']='Paired plates, internal spring, parallel lower actuator. Wall-driven engager and centered return spring; contact not validated.'
for area in bpy.context.screen.areas:
 if area.type=='VIEW_3D':
  area.spaces.active.region_3d.view_distance=300;area.spaces.active.region_3d.view_location=Vector((5,0,-105));area.spaces.active.shading.color_type='MATERIAL';area.spaces.active.overlay.show_floor=False
bpy.ops.wm.save_as_mainfile(filepath=str(P/'parallel-grip.blend'))
print('Saved editable packaging assembly')
