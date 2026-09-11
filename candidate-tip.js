// Proposed finite rigid geometry, NOT a solved seating law. Units mm.
// Extrude returned xz polygons at y = +/-0.65 using existing prism helper.
// Replace both existing Pawl engaging tip box AND Pawl tooth arm capsule.
// Keep the separate follower arm and common fixed pivot unchanged.
function candidatePawlPolygons(actuation) {
 const P=[-15,-1.7],finalPhi=116.565051;
 const k=Math.max(0,Math.min(1,(actuation-.25)/.5));
 const phi=155+(finalPhi-155)*k,delta=(phi-finalPhi)*Math.PI/180;
 const rotate=poly=>poly.map(([x,z])=>{
   x-=P[0];z-=P[1];return [P[0]+x*Math.cos(delta)-z*Math.sin(delta),P[1]+x*Math.sin(delta)+z*Math.cos(delta)];
 });
 return {phi,tip:rotate([[-16.2,.10],[-15.8,.10],[-16,.78]]),arm:rotate([[-15.30,-1.85],[-14.70,-1.55],[-15.80,.10],[-16.20,.10]])};
}
if(typeof module!=='undefined')module.exports={candidatePawlPolygons};
// Conservative first-contact preview: no dynamics, and no cam compatibility solve.
function pawlPolygonsAtPhi(phi){
 const act=.25+.5*(155-phi)/(155-116.565051);
 return candidatePawlPolygons(act);
}
function rackPolygons(bx){const out=[];for(let x=bx+.4;x<bx+19.8;x+=.65)out.push([[x,1],[x+.28,.2],[x+.55,1]]);out.push([[bx,1],[bx+20,1],[bx+20,4],[bx,4]]);return out;}
function polygonSeparation(a,b){
 const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 const inside=(p,poly)=>poly.every((a,i)=>cross(a,poly[(i+1)%poly.length],p)>=-1e-12);
 if(a.some(p=>inside(p,b))||b.some(p=>inside(p,a)))return 0;
 const distance=(p,a,b)=>{let dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dz)};
 let result=Infinity;
 for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){
 let A=a[i],B=a[(i+1)%a.length],C=b[j],D=b[(j+1)%b.length];
 if(cross(A,B,C)*cross(A,B,D)<0&&cross(C,D,A)*cross(C,D,B)<0)return 0;
 result=Math.min(result,distance(A,C,D),distance(B,C,D),distance(C,A,B),distance(D,A,B));
 }return result;
}
function collisionLimitedPawl(bx,commandedPhi,clearance=.02){
 const target=Math.max(116.565051,Math.min(155,commandedPhi)),rack=rackPolygons(bx);
 const gap=phi=>{const p=pawlPolygonsAtPhi(phi);return Math.min(...rack.flatMap(r=>[polygonSeparation(p.tip,r),polygonSeparation(p.arm,r)]));};
 let safe=155,blocked=gap(safe)<clearance;
 if(!blocked){const steps=Math.ceil((155-target)/.2);for(let i=1;i<=steps;i++){let trial=155+(target-155)*i/steps;if(gap(trial)<clearance){let lo=trial,hi=safe;for(let n=0;n<45;n++){let m=(lo+hi)/2;if(gap(m)<clearance)lo=m;else hi=m;}safe=hi;blocked=true;break;}safe=trial;}}
 const polygons=pawlPolygonsAtPhi(safe);
 return {reachablePhi:safe,commandedPhi:target,blocked,clearance:gap(safe),tip:polygons.tip,arm:polygons.arm};
}
if(typeof module!=='undefined')Object.assign(module.exports,{pawlPolygonsAtPhi,collisionLimitedPawl,polygonSeparation});
