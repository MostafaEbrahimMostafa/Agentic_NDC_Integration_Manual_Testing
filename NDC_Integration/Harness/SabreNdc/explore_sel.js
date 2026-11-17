process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const S=(x)=>JSON.stringify(x&&x.json||x&&x.text||'').slice(0,420);
(async()=>{
 let j;for(let i=0;i<12;i++){
  const body={supplier:'SabreNdc',credentialsSelector:'EGY',searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:2},{passengerTypeCode:'INF',count:1}],isDebug:false};
  const h=await call('Availability','api/V2/FlightSearch/Availability',body);console.log(new Date().toISOString(),'AV',h.status,h.ms);
  if(h.status===200){j=h.json;break} await sleep(90000)}
 if(!j)return;
 const jn=j.originDestinations[0].journeys[0];const ids=jn.segments.map(s=>s.cabins[0].bookingClasses.find(b=>b.bookingCode==='Y').bookingClassId);
 const map={[jn.journeyRefId]:{}};jn.segments.forEach((s,i)=>map[jn.journeyRefId][s.segmentRefId]=[ids[i]]);
 const base={supplier:'SabreNdc',credentialsSelector:'EGY',availabilityId:j.availabilityId,responseId:j.responseId};
 for(const [n,b] of [['nested map',map],['flat list',ids]]){
  const s=await call('Select','api/V2/FlightSearch/SelectAvailability',{...base,bookingClassIds:b});console.log('SELECT',n,s.status,s.ms,S(s));
  if(s.json&&s.json.offerId){const f=await call('FC','api/v2/FlightSearch/FareConfirm',{supplier:'SabreNdc',credentialsSelector:'EGY',ResponseId:s.json.responseId,selectedOfferId:s.json.offerId});console.log('FC',f.status,f.ms,S(f));}
 }
})();
