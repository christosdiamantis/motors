export type Measurements={r:number[];v0:number;i0:number;p0:number;n0:number;vb:number;ib:number;pb:number;nb:number;frequency:number;poles:number;speed:number;ratedPower:number;ratedVoltage:number;split:number};
export const example:Measurements={r:[3.8,4,4.2],v0:230,i0:2,p0:130,n0:1490,vb:40,ib:5,pb:180,nb:0,frequency:50,poles:4,speed:1440,ratedPower:1500,ratedVoltage:230,split:0.5};
export function phaseValues(connection:'star'|'delta',lineVoltage:number,lineCurrent:number,totalPower:number){if(![lineVoltage,lineCurrent,totalPower].every(Number.isFinite)||lineVoltage<=0||lineCurrent<=0||totalPower<0)throw Error('Μη έγκυρες γραμμικές τιμές.');return {voltage:connection==='star'?lineVoltage/Math.sqrt(3):lineVoltage,current:connection==='star'?lineCurrent:lineCurrent/Math.sqrt(3),power:totalPower/3};}
export function calculate(m:Measurements){
 const all=[...m.r,m.v0,m.i0,m.p0,m.n0,m.vb,m.ib,m.pb,m.nb,m.frequency,m.poles,m.speed,m.ratedPower,m.ratedVoltage,m.split];
 if(all.some(x=>!Number.isFinite(x))||m.r.length!==3||m.r.some(x=>x<=0)||[m.v0,m.i0,m.p0,m.vb,m.ib,m.pb,m.frequency,m.ratedPower,m.ratedVoltage].some(x=>x<=0)||m.poles<2||m.poles%2!==0||m.split<=0||m.split>=1) throw Error('Εισαγάγετε θετικές πεπερασμένες τιμές, άρτιο πλήθος πόλων και λόγο διαχωρισμού μεταξύ 0 και 1.');
 const ns=120*m.frequency/m.poles;
 if(m.speed<=0||m.speed>=ns) throw Error('Η ονομαστική ταχύτητα πρέπει να βρίσκεται μεταξύ μηδενός και σύγχρονης ταχύτητας.');
 if(m.n0<=0||m.n0>=ns||m.nb!==0) throw Error('Η ταχύτητα εν κενώ πρέπει να είναι θετική και μικρότερη από τη σύγχρονη· στη δοκιμή ακινησίας πρέπει να είναι 0 rpm.');
 const s0=m.v0*m.i0,sb=m.vb*m.ib;
 if(m.p0>=s0||m.pb>=sb) throw Error('Η ενεργός ισχύς κάθε δοκιμής πρέπει να είναι μικρότερη από τη φαινόμενη ισχύ φάσης.');
 const q0=Math.sqrt(s0*s0-m.p0*m.p0),qb=Math.sqrt(sb*sb-m.pb*m.pb);
 const r1=m.r.reduce((a,b)=>a+b,0)/3, req=m.pb/(m.ib*m.ib),r2=req-r1,xt=qb/(m.ib*m.ib),x1=xt*m.split,x2=xt-x1;
 const pc=m.p0-m.i0*m.i0*r1,qm=q0-m.i0*m.i0*x1;
 if(r2<=0||pc<=0||qm<=0) throw Error('Οι μετρήσεις ή οι παραδοχές δίνουν μη θετική παράμετρο. Ελέγξτε τις φασικές τιμές και τον διαχωρισμό αντιδράσεων.');
 const e2=(pc*pc+qm*qm)/(m.i0*m.i0),rc=e2/pc,xm=e2/qm;
 const slip=(ns-m.speed)/ns, omega=2*Math.PI*ns/60;
 const rotorCurrentSquared=(s:number)=>{if(s<=0)return 0;const yre=1/rc,yim=-1/xm;const zr=r2/s,zi=x2,den=zr*zr+zi*zi;const yr=zr/den,yi=-zi/den;const ar=yre+yr,ai=yim+yi,ad=ar*ar+ai*ai;const pr=ar/ad,pi=-ai/ad;const tr=r1+pr,ti=x1+pi,td=tr*tr+ti*ti;const er=m.ratedVoltage*(pr*tr+pi*ti)/td,ei=m.ratedVoltage*(pi*tr-pr*ti)/td;return (er*er+ei*ei)/den};
 const torque=(s:number)=>s<=0?0:3*rotorCurrentSquared(s)*r2/s/omega;
 const electromagnetic=torque(slip),rated=m.ratedPower/(2*Math.PI*m.speed/60),airGap=electromagnetic*omega,rotorCopper=slip*airGap,converted=(1-slip)*airGap;
 return {ns,s0,sb,q0,qb,r1,req,r2,xt,x1,x2,pc,qm,e2,rc,xm,slip,electromagnetic,rated,airGap,rotorCopper,converted,rotorCurrent:Math.sqrt(rotorCurrentSquared(slip)),error:100*(electromagnetic-rated)/rated,torque};
}
