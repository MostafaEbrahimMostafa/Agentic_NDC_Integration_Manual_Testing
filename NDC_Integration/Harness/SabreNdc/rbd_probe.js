process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
const SUP={supplier:'SabreNdc',credentialsSelector:'EGY'};
(async()=>{
 const h=await call('Availability','api/V2/FlightSearch/Availability',{...SUP,searchCriteria:[{origin:'CAI',destination:'DOH',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:2},{passengerTypeCode:'INF',count:1}],isDebug:false});
 console.log('AV',h.status,h.ms);const j=h.json;const jn=j.originDestinations[0].journeys[0];const s=jn.segments[0];
 console.log('journey',jn.journeyRefId,'segments',jn.segments.length,'classes',s.cabins[0].bookingClasses.map(b=>b.bookingCode).join(''));
 for(const code of ['Y','B','M','N','Q','K','F']){
  const b=s.cabins[0].bookingClasses.find(x=>x.bookingCode===code);if(!b){console.log(code,'not offered');continue}
  const sl=await call('Select','api/V2/FlightSearch/SelectAvailability',{...SUP,availabilityId:j.availabilityId,responseId:j.responseId,bookingClassIds:[b.bookingClassId]});
  if(!sl.json||!sl.json.offerId){console.log(code,'select',sl.status,JSON.stringify(sl.json||sl.text).slice(0,200));continue}
  const f=await call('FC','api/v2/FlightSearch/FareConfirm',{...SUP,ResponseId:sl.json.responseId,selectedOfferId:sl.json.offerId});
  const o=f.json&&f.json.selectedOffer;
  if(!o){console.log(code,'FC',f.status,JSON.stringify(f.json||f.text).slice(0,200));continue}
  const rbds=[...new Set((o.passengerFareBreakdown||[]).flatMap(p=>(p.segmentDetails||[]).map(x=>x.rbd)))];
  console.log('selected',code,'=> FareConfirm rbd',rbds.join('/'),'total',o.priceDetails.totalAmount.amount,o.priceDetails.totalAmount.currency,'fareBasis',[...new Set((o.passengerFareBreakdown||[]).flatMap(p=>(p.segmentDetails||[]).map(x=>x.fareBasisCode||x.fareBasis)))].join('/'));
 }
})();
