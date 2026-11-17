process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
(async()=>{
 const body={supplier:'SabreNdc',credentialsSelector:'EGY',searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:2},{passengerTypeCode:'INF',count:1}],isDebug:false};
 const days=j=>{const m={};for(const s of Object.values(j.flightSegments||{})){const k=s.departureDateTime.slice(0,10);m[k]=(m[k]||0)+1}return m};
 for(const [n,p] of [['Search','api/V2/FlightSearch/Search'],['Availability','api/V2/FlightSearch/Availability']]){
  const h=await call(n,p,body);const j=h.json||{};console.log(n,h.status,h.ms+'ms','keys',Object.keys(j).slice(0,8).join(','),'segment departure days',JSON.stringify(days(j)),'offers',(j.offers||[]).length,'journeysOD',j.originDestinations&&j.originDestinations[0].journeys.length);
  if(n==='Availability'){const od=j.originDestinations[0];console.log('OD departureDate',od.departureDate, od.journeys.map(x=>x.segments.map(s=>j.flightSegments[s.segmentRefId].departureDateTime.slice(5,16)).join('>')).join(' | '))}
 }
})();
