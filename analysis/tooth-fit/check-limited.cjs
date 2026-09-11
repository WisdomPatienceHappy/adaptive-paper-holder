const fs=require('fs'),{wholeState}=require('./model-snapshot.cjs'),{collisionLimitedPawl}=require('./candidate-tip.js');
let out=[];
for(let paper of [.2,1,3.6,10])for(let i=0;i<=200;i++){
let pose=i/200,s=wholeState({pose,paperThickness:paper}),k=Math.max(0,Math.min(1,(s.act-.25)/.5)),commandedPhi=155+(116.565051-155)*k,r=collisionLimitedPawl(-s.r*s.scale,commandedPhi);
out.push({paper,pose,bx:-s.r*s.scale,...r,tip:undefined,arm:undefined});}
const summary={scope:'First collision along open-to-commanded angular path for each independent state, finite rigid tip and tapered arm. No imposed runner changes; no force or cam-contact solution; no temporal contact-following dynamics.',poses:out.length,subdivisionMaxDegrees:.2,requestedClearanceMM:.02,minClearanceMM:Math.min(...out.map(x=>x.clearance)),maxClearanceDeficitMM:Math.max(0,...out.map(x=>.02-x.clearance)),maxAngularBlockDegrees:Math.max(...out.map(x=>x.reachablePhi-x.commandedPhi)),blockedCount:out.filter(x=>x.blocked).length,hold:out.filter(x=>x.pose===.75)};
fs.writeFileSync(__dirname+'/limited-receipt.json',JSON.stringify(summary,null,2));let keys=Object.keys(out[0]).filter(k=>!['tip','arm'].includes(k));fs.writeFileSync(__dirname+'/limited-samples.csv',keys.join(',')+'\n'+out.map(x=>keys.map(k=>x[k]).join(',')).join('\n'));console.log(summary);
