process.env.GROUP='probe';
const L=require('./g8lib');const {toOffer,bookIt,voidReq,cancelReq,F,ok2,short,errTxt}=L;
(async()=>{
 const term=process.argv[2]||'book'; const ctx={id:'PROBE',hops:[]};
 const o=await toOffer(ctx,{legs:[['CAI','DOH',30]],types:['ADT'],last:'Probe',nonstop:false});
 console.log('offer ok',o.ok,o.failedAt,o.why,o.flags,o.fcTotal,o.currency);
 if(!o.ok)return;
 const b=await bookIt(ctx,o,term); console.log('book',o.bookHop.status,o.bookHop.ms,b, Object.keys(o.bookHop.json).join(','));
 if(!b){console.log(short(errTxt(o.bookHop),300));return}
 console.log('tickets',JSON.stringify(o.bookHop.json.tickets||null).slice(0,300),'voidCap',o.bookHop.json.voidCapability, 'status',o.bookHop.json.bookingStatus);
 const r=await F.retrieve(ctx,b,{surName:'Probe'}); console.log('retr',r.status,r.json&&r.json.bookingStatus,r.json&&r.json.voidCapability,short(errTxt(r),200));
 if(term==='hold'){const rp=await F.reprice(ctx,b,{surName:'Probe'});console.log('reprice',rp.status,short(errTxt(rp),200));}
 const v=term==='hold'?await cancelReq(ctx,b,'Probe'):await voidReq(ctx,b,'Probe'); console.log('void/cancel',v.status,v.ms,JSON.stringify(v.json||v.text).slice(0,500));
 const r2=await F.retrieve(ctx,b,{surName:'Probe'}); console.log('retr2',r2.status,r2.json&&r2.json.bookingStatus,short(errTxt(r2),200), r2.json&&JSON.stringify(r2.json).slice(0,200));
 process.exit(0);
})();
