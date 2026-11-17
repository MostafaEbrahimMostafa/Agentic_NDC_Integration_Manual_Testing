process.env.NDC_BASE='https://ndc-integration-stg-ne-4.azurewebsites.net/';
const {call}=require('../V2/lib');const fs=require('fs');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
const S={supplier:'Galileo',credentialsSelector:'EGY'};
const shape=(v,dep=0)=>{if(Array.isArray(v))return '['+(v.length?shape(v[0],dep+1):'')+']x'+v.length;if(v&&typeof v==='object'){if(dep>3)return '{...}';return '{'+Object.keys(v).map(k=>k+':'+shape(v[k],dep+1)).join(',')+'}'}if(typeof v==='string')return 'str'+(v.length>40?'('+v.length+')':'');return String(v)};
(async()=>{
 const a=await call('Av','api/V2/FlightSearch/Availability',{...S,searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:2},{passengerTypeCode:'INF',count:1}],isDebug:false});
 const j=a.json;fs.writeFileSync('raw_probe/p1.json',JSON.stringify(j));
 console.log('P1',a.status,a.ms,'pageNumber',j.pageNumber,'more',j.hasMoreResults,'supplier',j.supplier);
 console.log(shape({...j,availabilityId:'x',responseId:'x'}).slice(0,1800));
 console.log('journeys top',j.journeys.length,'segs top',j.flightSegments.length);
 const seg0=j.flightSegments[0];console.log('flightSegment0',JSON.stringify(seg0).slice(0,500));
 const ods=j.originDestinations[0].journeys;const multi=ods.filter(x=>x.segments.length>1).length;console.log('OD journeys',ods.length,'connecting',multi);
 const y=ods.filter(jn=>jn.segments.every(s=>s.cabins.some(c=>c.bookingClasses.some(b=>b.bookingCode==='Y'))));console.log('with Y all segs',y.length);
 const codes={};ods.forEach(jn=>jn.segments.forEach(s=>s.cabins.forEach(c=>c.bookingClasses.forEach(b=>codes[b.bookingCode]=(codes[b.bookingCode]||0)+1))));console.log(codes);
 console.log('jn0 keys',Object.keys(ods[0]),'seg keys',Object.keys(ods[0].segments[0]),'cabin keys',Object.keys(ods[0].segments[0].cabins[0]),'bc keys',Object.keys(ods[0].segments[0].cabins[0].bookingClasses[0]));
 const n=await call('Nx','api/V2/FlightSearch/Availability',{...S,availabilityId:j.availabilityId,responseId:j.responseId,isDebug:false});
 const k=n.json;console.log('P2',n.status,n.ms,k&&k.pageNumber,k&&k.hasMoreResults,k&&k.originDestinations&&k.originDestinations[0].journeys.length);
 if(k&&k.originDestinations)fs.writeFileSync('raw_probe/p2.json',JSON.stringify(k));else console.log(n.text.slice(0,500));
 // select first journey w/ Y
 const jn=y[0];if(jn){const m={};m[jn.journeyRefId]={};jn.segments.forEach(s=>m[jn.journeyRefId][s.segmentRefId]=[s.cabins.flatMap(c=>c.bookingClasses).find(b=>b.bookingCode==='Y').bookingClassId]);
  const s=await call('Sel','api/V2/FlightSearch/SelectAvailability',{...S,availabilityId:j.availabilityId,responseId:j.responseId,bookingClassIds:m});
  console.log('SEL',s.status,s.ms,Object.keys(s.json||{}),String(s.text).slice(0,300).replace(/[A-Za-z0-9+\/=]{80,}/g,'<tok>'));
  if(s.json&&s.json.offerId){fs.writeFileSync('raw_probe/sel.json',JSON.stringify(s.json));
   const f=await call('FC','api/v2/FlightSearch/FareConfirm',{...S,ResponseId:s.json.responseId,selectedOfferId:s.json.offerId});
   console.log('FC',f.status,f.ms,f.json&&shape(f.json).slice(0,1500));fs.writeFileSync('raw_probe/fc.json',JSON.stringify(f.json||f.text));}}
 else console.log('no journey with Y on p1');
})();
