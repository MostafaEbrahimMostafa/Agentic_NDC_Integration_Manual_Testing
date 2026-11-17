process.env.NDC_BASE='https://ndc-integration-stg-ne-4.azurewebsites.net/';
const {call}=require('../V2/lib');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
(async()=>{
 const body={supplier:'Galileo',credentialsSelector:'EGY',searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:2},{passengerTypeCode:'INF',count:1}],isDebug:false};
 const h=await call('Availability','api/V2/FlightSearch/Availability',body);
 console.log(h.status,h.ms+'ms');
 const j=h.json;
 if(!j){console.log(h.text.slice(0,600));return}
 console.log(Object.keys(j));
 console.log('avId',j.availabilityId,'resp',j.responseId,'more',j.hasMoreResults,'ODs',(j.originDestinations||[]).length);
 const od=(j.originDestinations||[])[0]; if(od){console.log(Object.keys(od),od.origin,od.destination,'journeys',od.journeys.length);
  const jn=od.journeys[0];console.log(JSON.stringify(jn).slice(0,1800));}
 require('fs').writeFileSync('raw_probe/avail1.json',JSON.stringify(j));
})();
