function buildSubassembly(p={}) {
 const L=p.length||40,t=p.travel||0,ex=p.explode||0;const parts=[];
 function mesh(name,color,v,f,kind='mechanism'){parts.push({name,color,v,f,kind});}
 function box(name,color,x,y,z,dx,dy,dz,kind){const v=[];for(const a of [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]])v.push([x+a[0]*dx,y+a[1]*dy,z+a[2]*dz]);mesh(name,color,v,[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]],kind);}
 function cyl(name,color,a,b,r,n=12,kind){const d=b.map((x,i)=>x-a[i]),norm=Math.hypot(...d),u=d.map(x=>x/norm),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];let v=cross(u,Math.abs(u[2])<.9?[0,0,1]:[0,1,0]);let q=Math.hypot(...v);v=v.map(x=>x/q);const w=cross(u,v),verts=[],faces=[];for(const pt of [a,b])for(let i=0;i<n;i++){let h=2*Math.PI*i/n;verts.push(pt.map((x,j)=>x+r*(Math.cos(h)*v[j]+Math.sin(h)*w[j])));}faces.push(Array.from({length:n},(_,i)=>n-1-i),Array.from({length:n},(_,i)=>n+i));for(let i=0;i<n;i++)faces.push([i,(i+1)%n,(i+1)%n+n,i+n]);mesh(name,color,verts,faces,kind);}
 const gray='#9ba9a4',blue='#77b2d8',gold='#d5a047',purple='#9b68b0',green='#399985',shaft='#53636b';
 for(const side of [-1,1]){
 const y=side*(5+ex);
 box('A housing side '+side,gray,-L,y-.6,-.5,L+2,1.2,6,'housing');
 box('Pawl support '+side,gray,-16,y-.6,-2.5,2,1.2,2,'housing');
 box('Fixed frame cheek '+side,'#73877e',-.5,side*7-.7,-9,2,1.4,17,'frame');
 }
 box('Removable top cover',gray,-L,-5,5.1,L+1,10,.8,'cover');
 box('Housing bottom inner guide',gray,-L,-4.4,-.5,L-4,1,.8,'housing');
 box('Housing bottom outer guide',gray,-L,3.4,-.5,L-4,1,.8,'housing');
 const bx=-L+7+t,rx=bx+20;
 box('B toothed runner',blue,bx,-2.5,1,20,5,3);
 for(let x=bx+.4;x<rx-.2;x+=.65){mesh('Runner tooth',blue,[[x,-1.4,1],[x+.55,-1.4,1],[x+.28,-1.4,.2],[x,1.4,1],[x+.55,1.4,1],[x+.28,1.4,.2]],[[0,2,1],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]]);}
 cyl('A shared pivot',shaft,[0,-8,2.5],[0,8,2.5],.85,16);
 cyl('B shared bearing shaft',shaft,[bx,-7,2.5],[bx,7,2.5],.8,16);
 for(const side of [-1,1])cyl('B bearing '+side,gold,[bx,side*5-.7,2.5],[bx,side*5+.7,2.5],1.5,18);
 // Helical adaptation spring inside housing, in contact with runner end and A-side seat.
 box('Spring fixed seat',gray,-4,-2.3,.8,.8,4.6,3.6);
 const end=-4,start=Math.min(rx,end-.6),steps=108;
 for(let i=0;i<steps;i++){const pt=j=>{const a=j/steps*12*Math.PI;return[start+(end-start)*j/steps,1.2*Math.cos(a),2.5+1.2*Math.sin(a)]};cyl('Internal adaptation spring',green,pt(i),pt(i+1),.12,6);}
 // ONE 90-degree pawl, pivot fixed on A arm.
 const act=p.actuation||0,k=Math.max(0,Math.min(1,(act-.25)/.5)),phi=(155+(116.565051-155)*k)*Math.PI/180;
 const P=[-15,0,-1.7],T=[P[0]+Math.sqrt(5)*Math.cos(phi),0,P[2]+Math.sqrt(5)*Math.sin(phi)],F=[P[0]-Math.sqrt(5)*Math.sin(phi),0,P[2]+Math.sqrt(5)*Math.cos(phi)];
 cyl('Pawl tooth arm',purple,P,T,.48,10);cyl('Pawl follower arm',purple,P,F,.42,10);
 cyl('P shared pivot',shaft,[-15,-5.8,-1.7],[-15,5.8,-1.7],.48,12);
 box('Pawl engaging tip',purple,T[0]-.3,-.65,T[2]-.15,.6,1.3,.65);
 cyl('Pawl follower',purple,[F[0],-.6,F[2]],[F[0],.6,F[2]],.5,12);
 // Parallel actuator and two A-mounted guide stations.
 const slide=-4*act,nose=-14.5+slide,back=3+slide;
 const profile=[[nose,-4.7],[back,-4.7],[back,-4.1],[back-1,-4.1],[back-1,-3.2],[nose+.8,-3.2],[nose,-4.0]],av=[];
 for(const y of [-.8,.8])for(const [x,z] of profile)av.push([x,y,z]);const pn=profile.length,af=[Array.from({length:pn},(_,i)=>pn-1-i),Array.from({length:pn},(_,i)=>pn+i)];for(let i=0;i<pn;i++)af.push([i,(i+1)%pn,(i+1)%pn+pn,i+pn]);
 mesh('Engager bar with continuous raised dwell',gold,av,af);
 box('Engager return spring fixed seat',gray,-26.6,-.6,-4.9,.6,1.2,.7,'housing');
 // Return spring now bears directly on the centered lower end face; no side shoulder.
 box('Engager spring seat attachment',gray,-26.6,.6,-4.9,.6,5, .7,'housing');
 for(let j=0;j<72;j++){const pt=k=>[-26+(nose+26)*k/72,.15*Math.cos(k/72*12*Math.PI),-4.55+.15*Math.sin(k/72*12*Math.PI)];cyl('Engager return spring','#5f95a1',pt(j),pt(j+1),.06,6);}
 for(const x of [-10,-5]){
  box('Actuator lower guide',gray,x,-1.5,-5.3,1.2,3,.4,'housing');
  box('Actuator upper guide',gray,x,-1.5,-2.9,1.2,3,.4,'housing');
  for(const side of [-1,1])box('Actuator guide attachment',gray,x,side*1.6-.25,-5.3,1.2,.5,5,'housing');
 }
 // Unresolved candidate: fixed E pin through transverse slot in moving actuator fork.
 const sx=slide;
 box('Candidate slot left rail',gold,sx-1.45,-.8,-7.8,.65,1.6,6.2,'candidate');
 box('Candidate slot right rail',gold,sx+.8,-.8,-7.8,.65,1.6,6.2,'candidate');
 box('Candidate slot end',gold,sx-1.45,-.8,-7.8,2.9,1.6,.6,'candidate');
 box('Candidate slot end',gold,sx-1.45,-.8,-2.2,2.9,1.6,.6,'candidate');
 cyl('E fixed frame pin',shaft,[0,-8,-6],[0,8,-6],.5,14,'candidate');
 return parts;
}

function wholeState(p){
 const scale=.825,paper=p.paperThickness??3.6,stack=(paper+1)/scale,outer=40,L=Math.hypot(6,48),K=Math.hypot(32,20),ph0=Math.atan2(48,6);
 function geo(t,r){let B=[44+r*Math.cos(t),32+r*Math.sin(t)],dist=Math.hypot(...B),u=(L*L-K*K+dist*dist)/(2*dist),h=Math.sqrt(Math.max(0,L*L-u*u)),C=[(u*B[0]-h*B[1])/dist,(u*B[1]+h*B[0])/dist],phi=Math.atan2(C[1],C[0])-ph0,rot=pt=>[pt[0]*Math.cos(phi)-pt[1]*Math.sin(phi),pt[0]*Math.sin(phi)+pt[1]*Math.cos(phi)];return {B,C,rot,gap:rot([-33,42])[1]}}
 function root(fn,lo,hi){for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(fn(lo)*fn(mid)<=0)hi=mid;else lo=mid}return (lo+hi)/2}
 const open=100*Math.PI/180,cap=178*Math.PI/180,closed=Math.PI,contact=root(t=>geo(t,outer).gap-stack,open,cap),rcap=root(r=>geo(cap,r).gap-(paper+.7)/scale,25,40);let z=p.pose||0,t=open,r=outer,act=0,phase='Open';
 if(z<.1){}else if(z<.35){t=open+(contact-open)*(z-.1)/.25;phase='Approach'}else if(z<.55){t=contact+(cap-contact)*(z-.35)/.2;r=root(r=>geo(t,r).gap-stack,25,40);phase='Contact / adaptation'}else if(z<.7){t=cap+(closed-cap)*(z-.55)/.15;r=rcap;act=(z-.55)/.15;phase=act<.75?'Nose engages pawl':'Seating / side dwell'}else if(z<.8){t=closed;r=rcap;act=1;phase='Intended hold'}else if(z<.93){t=closed-(closed-130*Math.PI/180)*(z-.8)/.13;r=rcap;act=1-(z-.8)/.13;phase='Opening / withdrawal'}else{const k=(z-.93)/.07;t=(130-30*k)*Math.PI/180;r=rcap+(outer-rcap)*k;phase='Reset'}
 if(p.manual){t=(p.angle||150)*Math.PI/180;r=(33-(p.travel||0))/scale;act=p.actuation||0;phase='Manual exploration — not a solved state'}
 const wallZ=1.5,unshiftedZ=-3*Math.cos(t)-6.6*Math.sin(t)+2.5;
 if(!p.manual)act=Math.max(0,Math.min(1,(unshiftedZ-wallZ)/(-4*Math.cos(t))));
 return {...geo(t,r),t,r,act,phase,scale,stack,paper};
}
function buildScene(p={}){
 if(p.full===false)return buildSubassembly(p);
 const st=wholeState(p),s=st.scale;
 let parts=buildSubassembly({...p,length:40,travel:33-st.r*s,actuation:st.act});
 parts=parts.filter(q=>!q.name.startsWith('Fixed frame cheek')&&q.kind!=='candidate');
 for(const q of parts){if(q.name==='E fixed frame pin')continue;q.v=q.v.map(([x,y,z])=>[x*Math.sin(st.t)+(z-2.5)*Math.cos(st.t),y,-x*Math.cos(st.t)+(z-2.5)*Math.sin(st.t)+2.5]);}
 function project(pt){return [(32-pt[1])*s,(pt[0]-44)*s+2.5]}
 function prism(name,color,profile,y,thick,kind='mechanism'){let v=[];for(const yy of [y,y+thick])for(const [x,z] of profile)v.push([x,yy,z]);let n=profile.length,f=[Array.from({length:n},(_,i)=>n-1-i),Array.from({length:n},(_,i)=>n+i)];for(let i=0;i<n;i++)f.push([i,(i+1)%n,(i+1)%n+n,i+n]);parts.push({name,color,v,f,kind});}
 function shaft(name,pt,r,len){const prof=[];for(let j=0;j<20;j++)prof.push([pt[0]+r*Math.cos(j*Math.PI/10),pt[1]+r*Math.sin(j*Math.PI/10)]);prism(name,'#53636b',prof,-len/2,len)}
 const frame=[[-133,0],[-12,0],[40,1],[40,32],[47,43],[55,40],[59,-11],[-133,-17]].map(project),jaw=[[-45,58],[-34,44],[-14,42],[-7,37],[-10,0],[-7,-7],[7,-7],[15,33],[20,45],[12,57],[3,61],[-7,57]].map(x=>project(st.rot(x))),B=project(st.B),C=project(st.C),D=project([0,0]);
 for(const side of [-1,1]){
  let yy=side*(6.4+(p.explode||0));prism('Fixed frame plate '+side,'#84978e',frame,yy-.6,1.2,'frame');
  yy=side*(4+(p.explode||0));prism('Jaw side plate '+side,'#9ba9a4',jaw,yy-.6,1.2);
  const dx=C[0]-B[0],dz=C[1]-B[1],len=Math.hypot(dx,dz),nx=-dz/len*2, nz=dx/len*2;
  prism('BC fixed coupler '+side,'#e7a128',[[B[0]+nx,B[1]+nz],[C[0]+nx,C[1]+nz],[C[0]-nx,C[1]-nz],[B[0]-nx,B[1]-nz]],side*(5.4+(p.explode||0))-.65,1.3);
 }
 shaft('C shared pivot',C,.85,14);shaft('D shared pivot',D,.85,16);
 // Backplate web and depicted paper retain the source drawing's geometry.
 prism('Backplate web','#84978e',[[-133,0],[-12,0],[-12,-5],[-133,-5]].map(project),-6.4,12.8,'frame');
 const bx=32*s;prism('Clipboard board','#cbb58d',[[bx,-230],[bx+3,-230],[bx+3,12],[bx,12]],-82,164,'board');
 prism('Paper stack','#faf9ef',[[bx-st.paper,-215],[bx,-215],[bx,-43],[bx-st.paper,-43]],-73,146,'paper');
 for(let zz=-214;zz<-45;zz+=21)prism('Paper ruling','#c5d2d6',[[bx-st.paper-.015,zz],[bx-st.paper-.025,zz],[bx-st.paper-.025,zz+.12],[bx-st.paper-.015,zz+.12]],-68,136,'paper');
 prism('Fixed actuator contact stop','#668477',[[5.25,1.5],[7.4,1.5],[7.4,3.1],[5.25,3.1]],-2.2,4.4,'stop');
 prism('Stop frame bracket','#84978e',[[0,2.5],[6.4,2.5],[6.4,3.1],[0,3.1]],-6.4,12.8,'stop');
 const tip=project(st.rot([-33,42]));prism('Wide jaw contact bridge','#647b6f',[[tip[0]-1,tip[1]-2],[tip[0]+.3,tip[1]-2],[tip[0]+.3,tip[1]+2],[tip[0]-1,tip[1]+2]],-23,46);
 const pad=Math.max(.05,Math.min(1,st.gap*s-st.paper));prism('Compliant jaw pad','#303d39',[[tip[0]+.3,tip[1]-2],[tip[0]+pad,tip[1]-2],[tip[0]+pad,tip[1]+2],[tip[0]+.3,tip[1]+2]],-23,46);
 return parts;
}
if(typeof module!=='undefined')module.exports={buildScene,wholeState};
