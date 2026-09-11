const fs=require('fs'),{wholeState}=require('./model-snapshot.cjs'),{pawlPolygonsAtPhi,polygonSeparation}=require('./candidate-tip.js');
const pitch=.65,step=.01,N=65,angles=194,clearance=.02,searchClearance=.025;
function rack(bx){let out=[];for(let x=bx+.4;x<bx+19.8;x+=pitch)if(x>-19&&x<-13)out.push([[x,1],[x+.28,.2],[x+.55,1]]);out.push([[bx,1],[bx+20,1],[bx+20,4],[bx,4]]);return out;}
function gap(poly,bx){return Math.min(...rack(bx).flatMap(r=>[polygonSeparation(poly.tip,r),polygonSeparation(poly.arm,r)]));}
let results=[];
for(let paper of [.2,1,3.6,10]){
const s=wholeState({paperThickness:paper,pose:.75}),bx=-s.r*s.scale,history=[],parents=[];let previous=Array(2*N+1).fill(Infinity);previous[N]=0;let last=0;
for(let i=0;i<=angles;i++){
 let phi=155+(116.565051-155)*i/angles,poly=pawlPolygonsAtPhi(phi),costs=Array(2*N+1).fill(Infinity),pred=Array(2*N+1).fill(-1);
 for(let j=0;j<=2*N;j++){
 let dr=(j-N)*step;if(i===0 && j!==N)continue;if(gap(poly,bx+dr)<searchClearance-1e-12)continue;
 for(let k=Math.max(0,j-2);k<=Math.min(2*N,j+2);k++){
 let v=previous[k]+(j-k)**2+dr*dr*.001;if(v<costs[j]){costs[j]=v;pred[j]=k;}
 }
 }
 history.push(costs);parents.push(pred);if(!costs.some(Number.isFinite))break;previous=costs;last=i;
}
let costs=history[last],rank=costs.map((c,j)=>c+Math.abs(j-N)*1000),j=rank.indexOf(Math.min(...rank)),path=[];
for(let i=last;i>=0;i--){let phi=155+(116.565051-155)*i/angles,dr=(j-N)*step;path.push({phi,dr,bx:bx+dr,clearance:gap(pawlPolygonsAtPhi(phi),bx+dr)});j=parents[i][j];}path.reverse();
// Piecewise linear interpolation checks, five subdivisions per path segment.
let minInterpolated=Infinity;for(let i=1;i<path.length;i++)for(let q=0;q<=5;q++){let t=q/5,a=path[i-1],b=path[i];minInterpolated=Math.min(minInterpolated,gap(pawlPolygonsAtPhi(a.phi+t*(b.phi-a.phi)),a.bx+t*(b.bx-a.bx)));}
const maxPointRadius=Math.hypot(1,2.48),maxSubintervalMotion=path.reduce((v,b,i)=>{if(!i)return v;let a=path[i-1];return Math.max(v,(Math.abs(b.dr-a.dr)+maxPointRadius*Math.abs(b.phi-a.phi)*Math.PI/180)/5)},0);
const continuousClearanceLowerBound=minInterpolated-maxSubintervalMotion/2;
const final=path.at(-1),r=-(bx+final.dr)/s.scale,newState=wholeState({paperThickness:paper,manual:true,angle:180,travel:33-r*s.scale});
results.push({paper,bx,reachableEndShifts:costs.map((c,j)=>Number.isFinite(c)?(j-N)*step:null).filter(x=>x!==null),reachedFullSeat:last===angles,start:path[0],end:final,runnerMinimumShift:Math.min(...path.map(x=>x.dr)),runnerMaximumShift:Math.max(...path.map(x=>x.dr)),runnerTotalTravel:path.reduce((v,p,i)=>v+(i?Math.abs(p.dr-path[i-1].dr):0),0),minInterpolatedClearance:minInterpolated,continuousClearanceLowerBound,basePadGap:s.gap*s.scale-paper,endPadGap:newState.gap*s.scale-paper,padCompressionChange:-(newState.gap-s.gap)*s.scale,path});
}
let bxall=[];for(let paper of [.2,1,3.6,10])for(let i=0;i<=1000;i++){let s=wholeState({paperThickness:paper,pose:i/1000});bxall.push(-s.r*s.scale)}
let receipt={scope:'Discrete geometric coupled-path search, not contact dynamics, load balance or engager compatibility. Fixed theta180 for reported pad change; pawl-angle sweep coupled to runner shift. Steps<=0.02mm per <=0.199degrees, beginning exactly at nominal runner. Grid includes only +/-0.65mm shift. Five subdivisions per segment plus rigid-motion Lipschitz bound certify a lower clearance along the constructed piecewise-linear path (subject to numeric arithmetic); not all possible paths.',grid:{runnerStep:step,runnerHalfRange:pitch,angleSteps:angles,clearance,searchClearance},slot:{observedBxMin:Math.min(...bxall),observedBxMax:Math.max(...bxall),shaftDiameter:1.6,nominalSlotOverallLength:Math.max(...bxall)-Math.min(...bxall)+1.6,proposedRadialClearance:.1,proposedWidth:1.8,proposedOverallLength:Math.max(...bxall)-Math.min(...bxall)+1.8,note:'Slot in A sideplate centered z2.5, longitudinalX. These shaft clearances omit B bearing diameter3.0, strength and fit. If bearing passes through plate instead of shaft, width>=3.2 and lengthtravel+3.2. Coupled extra excursions may enlarge envelope.'},results};
fs.writeFileSync(__dirname+'/coupled-receipt.json',JSON.stringify(receipt,null,2));console.log(JSON.stringify({...receipt,results:results.map(({path,...r})=>r)},null,2));
