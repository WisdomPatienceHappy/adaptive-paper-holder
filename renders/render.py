import bpy,json,math,os
from pathlib import Path
from mathutils import Vector
P=Path(__file__).parent
for version in os.environ.get('HOLDER_RENDER_VERSIONS','before,after,after-open').split(','):
 bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
 scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24;scene.render.resolution_x=900;scene.render.resolution_y=700;scene.render.resolution_percentage=100
 scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.8,.8,.8,1);scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.8;scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast'
 mats={}
 for part in json.loads((P/(version+'.json')).read_text()):
  if part['kind'] in ['candidate','cover']:continue
  col=part['color']
  if col not in mats:
   mat=bpy.data.materials.new(col);mat.use_nodes=True;shader=mat.node_tree.nodes.get('Principled BSDF');shader.inputs['Base Color'].default_value=tuple(((int(col[i:i+2],16)/255+.055)/1.055)**2.4 for i in (1,3,5))+(1,);shader.inputs['Roughness'].default_value=.58;mats[col]=mat
  mesh=bpy.data.meshes.new(part['name']);mesh.from_pydata(part['v'],[],part['f']);mesh.update();obj=bpy.data.objects.new(part['name'],mesh);scene.collection.objects.link(obj);obj.data.materials.append(mats[col])
 floor=-240 if version=='before' else -5
 bpy.ops.mesh.primitive_plane_add(size=2000,location=(0,0,floor));ground=bpy.context.object;mat=bpy.data.materials.new('Backdrop');mat.diffuse_color=(.88,.86,.81,1);ground.data.materials.append(mat)
 for pos,power,size in [((100,-200,450),1200000,280),((-150,200,300),800000,250)]:
  data=bpy.data.lights.new('Softbox','AREA');data.energy=power;data.shape='DISK';data.size=size;o=bpy.data.objects.new('Softbox',data);scene.collection.objects.link(o);o.location=pos;o.rotation_euler=(Vector((50,0,0))-o.location).to_track_quat('-Z','Y').to_euler()
 camdata=bpy.data.cameras.new('Camera');cam=bpy.data.objects.new('Camera',camdata);scene.collection.objects.link(cam);scene.camera=cam;camdata.type='ORTHO';camdata.ortho_scale=310;camdata.clip_end=3000
 if version=='before':target=(20,0,-100);views={'front':(-400,0,-100),'side':(20,-400,-100),'oblique':(-280,-350,100)}
 else:target=(120,0,15);camdata.ortho_scale=340;views={'front':(120,0,450),'side':(120,-450,20),'oblique':(435,-340,275)}
 if version=='after-open':views={'oblique':views['oblique'],'side':views['side']}
 for name,pos in views.items():
  cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();
  if version!='before' and name=='front':cam.rotation_euler.rotate_axis('Z',math.pi/2)
  if version=='after-open' and name=='side':camdata.ortho_scale=150;cam.location=(40,-450,28);cam.rotation_euler=(Vector((40,0,28))-cam.location).to_track_quat('-Z','Y').to_euler()
  scene.render.filepath=str(P/(version+'-'+name+'.png'));bpy.ops.render.render(write_still=True)
print('Comparison renders saved')
