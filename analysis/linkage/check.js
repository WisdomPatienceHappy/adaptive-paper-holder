const fs=require('fs'),path=require('path'),crypto=require('crypto');
const source=process.argv[3]||path.join(__dirname,'run-001/model.snapshot.js');
const out=path.join(__dirname,process.argv[2]||'run-001');fs.mkdirSync(out);fs.copyFileSync(source,path.join(out,'model.snapshot.js'));fs.copyFileSync(__filename,path.join(out,'check.js'));fs.copyFileSync(path.join(__dirname,'protocol.md'),path.join(out,'protocol.md'));
const {wholeState}=require(path.join(out,'model.snapshot.js'));const dot=(a,b)=>a[0]*b[0]+a[1]*b[1],cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const rows=[];
for(const paper of [.2,1,3.6,10]){
 const s=wholeState({paperThickness:paper,pose:.75}),A=[44,32],B=s.B,C=s.C,e=[Math.cos(s.t),Math.sin(s.t)],v=[C[0]-B[0],C[1]-B[1]],Cphi=[-C[1],C[0]],den=dot(v,Cphi),tip=s.rot([-33,42]);
 const dgdr=tip[0]*dot(v,e)/den,dgdtheta=s.scale*tip[0]*dot(v,[-s.r*e[1],s.r*e[0]])/den;
 const rmm=s.r*s.scale,get=(th,rr)=>wholeState({manual:true,angle:th*180/Math.PI,travel:33-rr,paperThickness:paper});
 const differences=[1e-2,1e-3,1e-4,1e-5].map(h=>{const dr=(get(s.t,rmm+h).gap-get(s.t,rmm-h).gap)*s.scale/(2*h),dt=(get(s.t+h,rmm).gap-get(s.t-h,rmm).gap)*s.scale/(2*h);return {h_r_mm:h,h_theta_rad:h,dgap_dr_fd:dr,dgap_dtheta_fd_mm_per_rad:dt,error_dr:Math.abs(dr-dgdr),error_dtheta:Math.abs(dt-dgdtheta)}});
 const ac=[C[0]-A[0],C[1]-A[1]],ab=[B[0]-A[0],B[1]-A[1]],signed=cross(ac,ab)/Math.hypot(...ac)*s.scale;
 function togglef(th){const st=get(th,rmm);return cross([st.B[0]-44,st.B[1]-32],[st.C[0]-st.B[0],st.C[1]-st.B[1]])}
 let lo=140*Math.PI/180,hi=Math.PI;if(togglef(lo)*togglef(hi)>0)throw Error('Toggle not bracketed');for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(togglef(lo)*togglef(mid)<=0)hi=mid;else lo=mid}
 const gap=s.gap*s.scale,padCompression=Math.max(0,paper+1-gap),Qfree=-.6/dgdr;
 rows.push({paper_mm:paper,theta_deg:s.t*180/Math.PI,r_image:s.r,r_mm:rmm,A_mm:A.map(x=>x*s.scale),B_mm:B.map(x=>x*s.scale),C_mm:C.map(x=>x*s.scale),signed_B_to_AC_mm:signed,toggle_deg:(lo+hi)/2*180/Math.PI,overcenter_deg:180-(lo+hi)/2*180/Math.PI,backing_gap_mm:gap,nominal_pad_free_thickness_mm:1,pad_compression_mm:padCompression,pad_clearance_mm:Math.max(0,gap-paper-1),dgap_dr:dgdr,dgap_dtheta_mm_per_rad:dgdtheta,provisional_free_runner_Q_N:Qfree,conditional_jaw_closing_torque_using_Qfree_Nmm:Qfree*dgdtheta,finite_differences:differences});
}
const result={scope:'Prescribed viewer geometry and conditional virtual work only; no solved grip/contact/handle equilibrium',recorded_utc:new Date().toISOString(),source,source_sha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),node:process.version,scale_mm_per_image_unit:.825,signed_distance_convention:'cross(C-A,B-A)/|C-A| in source xy frame; positive is chosen overcenter side here',derivation:'(C-B).(C_phi*dphi-B_q)=0; dg/dr=tip_x*dphi/dr; dg/dtheta=scale*tip_x*dphi/dtheta',free_runner_balance:'0=F_r+Q*dg/dr only if no capture reaction/other radial generalized force',captured_runner_balance:'0=F_r+Q*dg/dr+R_capture+other forces; Q is not determined by spring alone',rows};
fs.writeFileSync(path.join(out,'receipt.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result.rows.map(({finite_differences,...r})=>r),null,2));
