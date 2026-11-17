const fs=require('fs');const X=require('./fx');const {C,SUP,ok,chainTo}=X;
const file='repro_corr.json';const j=JSON.parse(fs.readFileSync(file,'utf8'));
const mark=(bug,label,h,note)=>{(j.out[bug]=j.out[bug]||{})[label]={endpoint:h.endpoint,status:h.status,recId:h.rec.id,correlationId:(h.rec.response_headers||{}).correlationid||null,note:note||null,at:h.started_at};console.log(bug,label,h.status,(h.rec.response_headers||{}).correlationid);if(ok(h)&&h.json&&h.json.pnr)j.newPnr.push({pnr:h.json.pnr,ep:h.endpoint,bug});};
(async()=>{
 const types=['ADT','ADT','INF'];const v=await chainTo('fc',types,{fresh:true,key:'rp18b',seed:54});
 if(v.ok){const b={...SUP,ResponseId:v.ids.id,selectedOfferId:v.ids.off,passengersList:C.mkPassengers(types),contactsList:C.CONTACTS};b.passengersList.Pax3.ParentPaxRefId='Pax2';const a=await C.call(v.ctx,'AddPassenger',C.P.addpax,b);if(ok(a))mark('BUG-18','Book_infant_parent_Pax2',await C.bookLike(v.ctx,'book',a.json.responseId,a.json.offerId,{}));}
 const w=await chainTo('anc',['ADT'],{fresh:true,key:'rp24b',seed:55});if(w.ok)mark('BUG-24','GetAncillary_misspelled_key',w.anc);
 fs.writeFileSync(file,JSON.stringify(j,null,1));
 // report which bugs still lack entries
 const bugs=require('./bugs');for(const b of bugs){const need=[...(b.calls||[]).map(c=>c.label)];const have=Object.keys(j.out[b.id]||{});console.log(b.id,'repro entries',have.length,'/',need.length);}
})();
