```
API Request & Responce for V2
Search Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "isdebug": true,
    "searchCriteria": [
        {
            "origin": "BAH",
            "destination": "SHJ",
            "date": "2026-05-20"
        }
    ],
    "passengers": [
        {
            "passengerTypeCode": "ADT",
            "count": 1
        },
        {
            "passengerTypeCode": "CHD",
            "count": 1
        },
        {
            "passengerTypeCode": "INF",
            "count": 1
        }
    ]
}
Search Responce:
{
    "responseId": "a2221570-0993-4e63-863f-e347f7047b76",
    "supplier": "AirArabia",
    "journeys": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000"
            ]
        }
    },
    "flightSegments": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": null
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "Depends on bundle choice.",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": null
        }
```

```
    },
    "baggageDetails": {
        "1": {
            "carryOnBaggage": "Depends on bundle choice.",
            "checkInBaggage": "Depends on bundle choice."
        }
    },
    "offers": [
        {
            "offerId": "5322aae4-
303d-4c5a-827a-575635600f45&x8dj0gAAARv2JNwAFJGb1v9qDfRI1v9qDhLA2TBHOSRCQUgvU0hK
JDMyNDE3NDAkMjAyNjA1MjAxNzUwMA8AIDIwAQDwFqVHOTEwNKNCQUilTWFpblSjU0hKoMKgRpOSo0FE
VKExkqNDSEQHAPAeSU5GoTEA2SJUSUQkMTc3OTAwMjE4MzgzMzE5ODQ5NTctLWFwcC0yMTc1kpGTUAAA
SgD/BNb/agz5gJOSAQGSAgGSAwGRkZGxAEXwAKFZwMDAwMDAwMDAwMDCwg==",
            "offerJourneys": [
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000"
            ],
            "passengerFareBreakdown": [
                {
                    "paxTotalAmount": {
                        "amount": 15840.18,
                        "currency": "EGP"
                    },
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 8414.99,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 7425.19,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HM",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "BH",
                            "amount": {
                                "amount": 1352.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API1",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "E5POSCROS1/CrossAirlinesFee1",
                            "amount": {
                                "amount": 6927.79,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
```

```
                            "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "paxTotalAmount": {
                        "amount": 15840.18,
                        "currency": "EGP"
                    },
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 8414.99,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 7425.19,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HM",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "BH",
                            "amount": {
                                "amount": 1352.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API1",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "E5POSCROS1/CrossAirlinesFee1",
                            "amount": {
                                "amount": 6927.79,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
```

```
                    "discount": null
                },
                {
                    "paxTotalAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 0,
                        "currency": ""
                    },
                    "paxBaseAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 33302.74,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 16829.96,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 16472.78,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 2704.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "E5POSCROS1/CROSSAIRLINESFEE1",
                        "amount": {
                            "amount": 13855.58,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null
            },
            "refundability": "UnKnown",
            "haveBundles": true,
            "canBeHeld": true,
            "isDealCodeApplied": false,
            "appliedDealCode": null,
            "isPromoted": false,
            "appliedPromotionCode": null,
            "isAncillaryRequired": false,
            "offerHasAncillary": true,
            "isBaggageRequired": false,
            "isMealRequired": false,
            "isSeatMapRequired": false
        }
    ],
    "supplierRequest": "<soap:Envelope
xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"
xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Header>\n
<wsse:Security soap:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-
open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">\n
<wsse:UsernameToken
xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-
utility-1.0.xsd\" wsu:Id=\"UsernameToken-32124385\">\n
<wsse:Username>WONDERTRAVELSG9</wsse:Username>\n        <wsse:Password
Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-
profile-1.0#PasswordText\">P@ss1234</wsse:Password>\n
</wsse:UsernameToken>\n    </wsse:Security>\n  </soap:Header>\n  <soap:Body
xmlns:ns2=\"http://www.opentravel.org/OTA/2003/05\">\n    <ns2:OTA_AirAvailRQ
EchoToken=\"11868765275150-1300257933\" PrimaryLangID=\"en-us\"
SequenceNmbr=\"1\" Target=\"Test\" TimeStamp=\"2008-09-25T04:55:27\"
Version=\"20061.00\">\n      <ns2:POS>\n        <ns2:Source
TerminalID=\"TestUser/Test Runner\">\n          <ns2:RequestorID
ID=\"WONDERTRAVELSG9\" Type=\"4\" />\n          <ns2:BookingChannel
Type=\"12\" />\n        </ns2:Source>\n      </ns2:POS>\n
<ns2:OriginDestinationInformation>\n        <ns2:DepartureDateTime>2026-05-
20T00:00:00</ns2:DepartureDateTime>\n        <ns2:OriginLocation
LocationCode=\"BAH\" />\n        <ns2:DestinationLocation
LocationCode=\"SHJ\" />\n        <ns2:TravelPreferences>\n
<ns2:CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\n
</ns2:TravelPreferences>\n      </ns2:OriginDestinationInformation>\n
<ns2:TravelerInfoSummary>\n        <ns2:AirTravelerAvail>\n
<ns2:PassengerTypeQuantity Code=\"ADT\" Quantity=\"1\" />\n
<ns2:PassengerTypeQuantity Code=\"CHD\" Quantity=\"1\" />\n
<ns2:PassengerTypeQuantity Code=\"INF\" Quantity=\"1\" />\n
</ns2:AirTravelerAvail>\n      </ns2:TravelerInfoSummary>\n
</ns2:OTA_AirAvailRQ>\n  </soap:Body>\n</soap:Envelope>",
    "supplierResponse": "<soap:Envelope
xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"
xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"
xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><soap:Body
xmlns:ns1=\"http://www.opentravel.org/OTA/2003/05\"><ns1:OTA_AirAvailRS
EchoToken=\"11868765275150-1300257933\" PrimaryLangID=\"en-us\"
RetransmissionIndicator=\"false\" SequenceNmbr=\"1\"
```

```
TransactionIdentifier=\"TID$17790021838331984957--app-2175\"
Version=\"2006.01\"><ns1:Success /><ns1:Warnings
/><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T17:50:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T20:00:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"BAH\"
MultiAirportCityInd=\"false\">Bahrain</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T20:00:00\" DepartureDateTime=\"2026-05-
20T17:50:00\" FlightNumber=\"G9104\" JourneyDuration=\"PT1H10M0.000S\"
RPH=\"G9$BAH/SHJ$3241740$20260520175000$20260520200000\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"BAH\" Terminal=\"MainT\" /><ns1:ArrivalAirport
LocationCode=\"SHJ\" Terminal=\"\"
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></
ns1:OriginDestinationInformation><ns1:AAAirAvailRSExt><ns1:PricedItineraries><ns
1:PricedItinerary
SequenceNumber=\"1\"><ns1:AirItinerary><ns1:OriginDestinationOptions><ns1:Origin
DestinationOption><ns1:FlightSegment ArrivalDateTime=\"2026-05-20T20:00:00\"
DepartureDateTime=\"2026-05-20T17:50:00\" FlightNumber=\"G9104\"
RPH=\"G9$BAH/SHJ$3241740$20260520175000$20260520200000\"
returnFlag=\"false\"><ns1:DepartureAirport LocationCode=\"BAH\"
Terminal=\"MainT\" /><ns1:ArrivalAirport LocationCode=\"SHJ\" Terminal=\"\"
/></ns1:FlightSegment></ns1:OriginDestinationOption><ns1:AABundledServiceExt
applicableOnd=\"BAH/SHJ\"
```

```
applicableOndSequence=\"0\"><ns1:bundledService><ns1:bunldedServiceId>66519</
ns1:bunldedServiceId><ns1:bundledServiceName>Premium</
```

```
ns1:bundledServiceName><ns1:perPaxBundledFee>1352.00</
```

```
ns1:perPaxBundledFee><ns1:bookingClasses>E24</
```

```
ns1:bookingClasses><ns1:description></
```

```
ns1:description><ns1:includedServies>BAGGAGE</
```

```
ns1:includedServies><ns1:includedServies>MEAL</
```

```
ns1:includedServies><ns1:includedServies>FLEXI_CHARGES</ns1:includedServies></
```

```
ns1:bundledService><ns1:bundledService><ns1:bunldedServiceId>66577</
```

```
ns1:bunldedServiceId><ns1:bundledServiceName>Value</
```

```
ns1:bundledServiceName><ns1:perPaxBundledFee>2007.72</
```

```
ns1:perPaxBundledFee><ns1:bookingClasses>E24</
```

```
ns1:bookingClasses><ns1:description>Global Covid-19 Cover\nBaggage : 20/30
Kg\nMeal : Sandwich and water\nSeat : row 8 onwards\nModification : One
modification, up to 8h\nCancellation : Up to
```

```
8h</ns1:description><ns1:includedServies>BAGGAGE</ns1:includedServies><ns1:inclu
dedServies>SEAT_MAP</ns1:includedServies><ns1:includedServies>MEAL</
```

```
ns1:includedServies><ns1:includedServies>FLEXI_CHARGES</ns1:includedServies></
ns1:bundledService><ns1:bundledService><ns1:bunldedServiceId>66569</
```

```
ns1:bunldedServiceId><ns1:bundledServiceName>Ultimate</
```

```
ns1:bundledServiceName><ns1:perPaxBundledFee>2751.32</
```

```
ns1:perPaxBundledFee><ns1:bookingClasses>E24</
```

```
ns1:bookingClasses><ns1:description>Handbag: 7 Kg + Personal Item (Max 3Kg)\n40
Kg Checked Baggage\nSeat: Row 3 onwards\nStandard Meal\n2 Free Modification (Up
to 8h)\nCancellation: Up to 8h. Credit voucher at AED
```

```
200</ns1:description><ns1:includedServies>BAGGAGE</ns1:includedServies><ns1:incl
udedServies>SEAT_MAP</ns1:includedServies><ns1:includedServies>MEAL</
```

```
ns1:includedServies><ns1:includedServies>FLEXI_CHARGES</ns1:includedServies></
ns1:bundledService></ns1:AABundledServiceExt></ns1:OriginDestinationOptions></
ns1:AirItinerary><ns1:AirItineraryPricingInfo
```

```
PricingSource=\"Published\"><ns1:ItinTotalFare
```

```
NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"16472.78\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"1218.40\" CurrencyCode=\"AED\"
DecimalPlaces=\"2\" /><ns1:TotalFare Amount=\"33302.74\" CurrencyCode=\"EGP\"
```

```
DecimalPlaces=\"2\" /><ns1:TotalEquivFare Amount=\"2463.22\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:TotalFareWithCCFee
Amount=\"33302.74\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
/><ns1:TotalEquivFareWithCCFee Amount=\"2463.22\" CurrencyCode=\"AED\"
DecimalPlaces=\"2\"
```

```
/></ns1:ItinTotalFare><ns1:PTC_FareBreakdowns><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"ADT\"
Quantity=\"1\"
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"7425.19\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"549.20\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes><ns1:Tax Amount=\"67.60\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"HM\" TaxName=\"BAHRAIN-Pax
Facility Fee\" /><ns1:Tax Amount=\"1352.00\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"BH\" TaxName=\"BAHRAIN-Intl Pax Service Fee\"
/><ns1:Tax Amount=\"67.60\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
TaxCode=\"API1\" TaxName=\"UAE-API Charge Arr API1\"
/></ns1:Taxes><ns1:Fees><ns1:Fee Amount=\"6927.79\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" FeeCode=\"E5POSCROS1/CrossAirlinesFee1\"
/></ns1:Fees><ns1:TotalFare Amount=\"15840.18\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /></ns1:PassengerFare><ns1:TravelerRefNumber RPH=\"A1\"
/></ns1:PTC_FareBreakdown><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"CHD\"
Quantity=\"1\"
```

```
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"7425.19\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"549.20\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes><ns1:Tax Amount=\"67.60\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"HM\" TaxName=\"BAHRAIN-Pax
Facility Fee\" /><ns1:Tax Amount=\"1352.00\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"BH\" TaxName=\"BAHRAIN-Intl Pax Service Fee\"
/><ns1:Tax Amount=\"67.60\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
TaxCode=\"API1\" TaxName=\"UAE-API Charge Arr API1\"
/></ns1:Taxes><ns1:Fees><ns1:Fee Amount=\"6927.79\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" FeeCode=\"E5POSCROS1/CrossAirlinesFee1\"
/></ns1:Fees><ns1:TotalFare Amount=\"15840.18\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /></ns1:PassengerFare><ns1:TravelerRefNumber RPH=\"C2\"
/></ns1:PTC_FareBreakdown><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"INF\"
Quantity=\"1\"
```

```
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"1622.40\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"120.00\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes /><ns1:Fees
/><ns1:TotalFare Amount=\"1622.40\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
/></ns1:PassengerFare><ns1:TravelerRefNumber RPH=\"I3/A1\"
/></ns1:PTC_FareBreakdown></ns1:PTC_FareBreakdowns><ns1:AvailableFlexiFares
InBoundFlexiAvailable=\"false\" OutBoundFlexiAvailable=\"true\"><ns1:FlexiFare
ApplicableJourneyType=\"Outbound\"><ns1:FlexiFareAmount Amount=\"0.00\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
```

```
/><ns1:FlexibilityDescription>Flexibility</ns1:FlexibilityDescription><ns1:Allow
edFlexiOperations><ns1:FlexiOperations AllowedOperationName=\"1 Modification(s)
up to 24 hours before departure\" FlexiOperationCutoverTimeInMinutes=\"1440\"
NumberOfAllowedOperations=\"1\" /><ns1:FlexiOperations AllowedOperationName=\"2
Cancellation(s) up to 12 hours before departure\"
FlexiOperationCutoverTimeInMinutes=\"720\" NumberOfAllowedOperations=\"2\"
/></ns1:AllowedFlexiOperations><ns1:PerPaxFlexifareBDS
```

```
/><ns1:FlexiRuleCode>OFFER_TEMPLATE:3104</ns1:FlexiRuleCode></ns1:FlexiFare></
ns1:AvailableFlexiFares></ns1:AirItineraryPricingInfo></ns1:PricedItinerary></
ns1:PricedItineraries></ns1:AAAirAvailRSExt><ns1:Errors
```

```
/></ns1:OTA_AirAvailRS></soap:Body></soap:Envelope>"
}
Fare Confirm Request:
{
```

```
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "searchResponseId": "{{searchResponseId}}",
    "selectedOfferId": "{{offerId}}"
}
Fare Confirm Responce:
{
    "responseId": "912e9bab-817f-4e4c-b796-c8f9fd622c01",
    "supplier": "AirArabia",
    "journeys": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000"
            ]
        }
    },
    "flightSegments": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": null
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "Depends on bundle choice.",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": null
        }
    },
    "baggageDetails": {
        "1": {
            "carryOnBaggage": "Depends on bundle choice.",
            "checkInBaggage": "Depends on bundle choice."
        }
    },
    "selectedOffer": {
        "offerId": "dfedc665-a15d-4c99-a805-
95d2a8478a9f&yAJiY9IAAAM39iTcABSRm9b/ag30SNb/
ag4SwNkwRzkkQkFIL1NISiQzMjQxNzQwJDIwMjYwNTIwMTc1MDAPACAyMAEA8BalRzkxMDSjQkFIpU1h
aW5Uo1NISqDCoEaTkqNBRFShMZKjQ0hEBwDwHklORqExANkiVElEJDE3NzkwMDIxODM4MzMxOTg0OTU3
LS1hcHAtMjE3NZKRk1AAAEoA/wTW/2oM+YCTkgEBkgIBkgMBkZGRsQBF/
AKhWZGiQTGRokMykaVJMy9BMYYA9ArAkqgzMzMwMi43NKNFR1CSqDE2ODI5Ljk2DgBgNDcyLjc4DgBPw
MCRk0sBHxOneQHwDpOVzgABA9enUHJlbWl1baCRo0UyNKcxMzUyLjAwHADwCgQRpVZhbHVl2ZlHbG9iY
WwgQ292aWQtMTkJAPRnZXIKQmFnZ2FnZSA6IDIwLzMwIEtnCk1lYWwgOiBTYW5kd2ljaCBhbmQgd2F0Z
XIKU2VhdCA6IHJvdyA4IG9ud2FyZHMKTW9kaWZpY2F0aW9uIDogT25lIG1vZGlmaWNhdGlvbiwgdXAgd
G8gOGgKQ2FuY2VsbCoAE1UYAAK0AHEyMDA3LjcytADwJgmoVWx0aW1hdGXZsEhhbmRiYWc6IDcgS2cgK
yBQZXJzb25hbCBJdGVtIChNYXggM0tnKQo0vACTIENoZWNrZWQg1wABsgB1OiBSb3cgM7EAkFN0YW5kY
XJkIOkAiQoyIEZyZWUgxgAUKJsAGSm0AAazAPMMLiBDcmVkaXQgdm91Y2hlciBhdCBBRUQgMjAwzgCAN
zUxLjMywsI=",
        "offerJourneys": [
            "G9$BAH/SHJ$3241740$20260520175000$20260520200000"
```

```
        ],
        "passengerFareBreakdown": [
            {
                "paxTotalAmount": {
                    "amount": 15840.18,
                    "currency": "EGP"
                },
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1/CrossAirlinesFee1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "paxTotalAmount": {
                    "amount": 15840.18,
                    "currency": "EGP"
                },
                "passengerTypeCode": "CHD",
```

```
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1/CrossAirlinesFee1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "paxTotalAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 0,
                    "currency": ""
                },
                "paxBaseAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
```

```
                "taxesAndFees": [],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$3241740$20260520175000$20260520200000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
            }
        ],
        "priceDetails": {
            "totalAmount": {
                "amount": 33302.74,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 16829.96,
                "currency": "EGP"
            },
            "totalBaseAmount": {
                "amount": 16472.78,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
                    "code": "HM",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "BH",
                    "amount": {
                        "amount": 2704.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "API1",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "E5POSCROS1/CROSSAIRLINESFEE1",
                    "amount": {
                        "amount": 13855.58,
                        "currency": "EGP"
                    }
                }
            ],
            "discount": null
        },
        "refundability": "UnKnown",
        "haveBundles": true,
        "canBeHeld": true,
        "isDealCodeApplied": false,
        "appliedDealCode": null,
```

```
        "isPromoted": false,
        "appliedPromotionCode": null,
        "isAncillaryRequired": false,
        "offerHasAncillary": true,
        "isBaggageRequired": false,
        "isMealRequired": false,
        "isSeatMapRequired": false
    }
}
Add Pax Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "ResponseId": "{{fareConfirmResponseId}}",
    "SelectedOfferId": "{{fareConfirmSelectedOfferId}}",
    "passengersList": {
        "Pax1": {
            "title": "Mr",
            "name": {
                "first": "Mostafa",
                "middle": "",
                "last": "Ibrahim"
            },
            "nationality": "EG",
            "residentCountry": "EG",
            "birthDate": "2000-02-15T00:00:00.000Z",
            "gender": "male",
            "passengerTypeCode": "ADT",
            "contactRefId": "0",
            "travelDocument": {
                "name": {
                    "first": "Mostafa",
                    "middle": "",
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-10-01T00:00:00.000Z",
                "issuanceDate": "2023-10-01T00:00:00.000Z",
                "documentNumber": "A1234561",
                "documentType": "PASSPORT",
                "gender": "male",
                "birthCountry": "EG",
                "birthDate": "2000-02-15T00:00:00.000Z",
                "issuanceCountryCode": "EG"
            }
        },
        // "Pax2": {
        //     "title": "Mr",
        //     "name": {
        //         "first": "Ahmed",
        //         "middle": "",
        //         "last": "Hassan"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "1985-07-20T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "ADT",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Ahmed",
        //             "middle": "",
        //             "last": "Hassan"
```

```
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2031-06-15T00:00:00.000Z",
        //         "issuanceDate": "2021-06-15T00:00:00.000Z",
        //         "documentNumber": "B9876543",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "1985-07-20T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax3": {
        //     "title": "Mrs",
        //     "name": {
        //         "first": "Sara",
        //         "middle": "",
        //         "last": "Nour"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "1990-05-12T00:00:00.000Z",
        //     "gender": "female",
        //     "passengerTypeCode": "ADT",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Sara",
        //             "middle": "",
        //             "last": "Nour"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2030-08-01T00:00:00.000Z",
        //         "issuanceDate": "2020-08-01T00:00:00.000Z",
        //         "documentNumber": "C4567891",
        //         "documentType": "PASSPORT",
        //         "gender": "female",
        //         "birthCountry": "EG",
        //         "birthDate": "1990-05-12T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax4": {
        //     "title": "Mr",
        //     "name": {
        //         "first": "Omar",
        //         "middle": "Fathy",
        //         "last": "Adel"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "1982-09-03T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "ADT",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Omar",
        //             "middle": "Fathy",
        //             "last": "Adel"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2032-02-10T00:00:00.000Z",
        //         "issuanceDate": "2022-02-10T00:00:00.000Z",
```

```
        //         "documentNumber": "D1122334",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "1982-09-03T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax5": {
        //     "title": "Mrs",
        //     "name": {
        //         "first": "Mona",
        //         "middle": "Hassan",
        //         "last": "Saleh"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "1988-11-22T00:00:00.000Z",
        //     "gender": "female",
        //     "passengerTypeCode": "ADT",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Mona",
        //             "middle": "Hassan",
        //             "last": "Saleh"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2031-11-22T00:00:00.000Z",
        //         "issuanceDate": "2021-11-22T00:00:00.000Z",
        //         "documentNumber": "E9988776",
        //         "documentType": "PASSPORT",
        //         "gender": "female",
        //         "birthCountry": "EG",
        //         "birthDate": "1988-11-22T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        "Pax6": {
            "title": "Miss",
            "name": {
                "first": "Laila",
                "middle": "Omar",
                "last": "Ibrahim"
            },
            "nationality": "EG",
            "residentCountry": "EG",
            "birthDate": "2016-03-10T00:00:00.000Z",
            "gender": "female",
            "passengerTypeCode": "CHD",
            "contactRefId": "0",
            "travelDocument": {
                "name": {
                    "first": "Laila",
                    "middle": "Omar",
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-22T00:00:00.000Z",
                "issuanceDate": "2021-03-10T00:00:00.000Z",
                "documentNumber": "F2233445",
                "documentType": "PASSPORT",
                "gender": "female",
                "birthCountry": "EG",
```

```
                "birthDate": "2016-03-10T00:00:00.000Z",
                "issuanceCountryCode": "EG"
            }
        },
        // "Pax7": {
        //     "title": "MSTR",
        //     "name": {
        //         "first": "Youssef",
        //         "middle": "Ahmed",
        //         "last": "Hassan"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2017-08-15T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "CHD",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Youssef",
        //             "middle": "Ahmed",
        //             "last": "Hassan"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2032-08-15T00:00:00.000Z",
        //         "issuanceDate": "2022-08-15T00:00:00.000Z",
        //         "documentNumber": "G3344556",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2017-08-15T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax8": {
        //     "title": "Miss",
        //     "name": {
        //         "first": "Hana",
        //         "middle": "Sara",
        //         "last": "Nour"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2015-12-01T00:00:00.000Z",
        //     "gender": "female",
        //     "passengerTypeCode": "CHD",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Hana",
        //             "middle": "Sara",
        //             "last": "Nour"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2030-12-01T00:00:00.000Z",
        //         "issuanceDate": "2020-12-01T00:00:00.000Z",
        //         "documentNumber": "H4455667",
        //         "documentType": "PASSPORT",
        //         "gender": "female",
        //         "birthCountry": "EG",
        //         "birthDate": "2015-12-01T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
```

```
        // "Pax9": {
        //     "title": "MR",
        //     "name": {
        //         "first": "Adam",
        //         "middle": "Omar",
        //         "last": "Adel"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2018-04-18T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "CHD",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Adam",
        //             "middle": "Omar",
        //             "last": "Adel"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2033-04-18T00:00:00.000Z",
        //         "issuanceDate": "2023-04-18T00:00:00.000Z",
        //         "documentNumber": "I5566778",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2018-04-18T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        "Pax10": {
            "title": "MS",
            "name": {
                "first": "Lina",
                "middle": "",
                "last": "Ibrahim"
            },
            "nationality": "EG",
            "residentCountry": "EG",
            "birthDate": "2025-01-05T00:00:00.000Z",
            "gender": "female",
            "passengerTypeCode": "INF",
            "ParentPaxRefId": "Pax1",
            "contactRefId": "0",
            "travelDocument": {
                "name": {
                    "first": "Lina",
                    "middle": "",
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-04T00:00:00.000Z",
                "issuanceDate": "2025-01-10T00:00:00.000Z",
                "documentNumber": "INF1234501",
                "documentType": "PASSPORT",
                "gender": "female",
                "birthCountry": "EG",
                "birthDate": "2025-01-05T00:00:00.000Z",
                "issuanceCountryCode": "EG"
            }
        }
        // "Pax11": {
        //     "title": "MR",
        //     "name": {
```

```
        //         "first": "Karim",
        //         "middle": "",
        //         "last": "Hassan"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2025-03-10T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "INF",
        //     "ParentPaxRefId": "Pax2",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Karim",
        //             "middle": "",
        //             "last": "Hassan"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2029-03-09T00:00:00.000Z",
        //         "issuanceDate": "2025-03-15T00:00:00.000Z",
        //         "documentNumber": "INF1234502",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2025-03-10T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax12": {
        //     "title": "MS",
        //     "name": {
        //         "first": "Mariam",
        //         "middle": "",
        //         "last": "Nour"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2025-12-20T00:00:00.000Z",
        //     "gender": "female",
        //     "passengerTypeCode": "INF",
        //     "ParentPaxRefId": "Pax3",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Mariam",
        //             "middle": "",
        //             "last": "Nour"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2028-12-19T00:00:00.000Z",
        //         "issuanceDate": "2025-12-25T00:00:00.000Z",
        //         "documentNumber": "INF1234503",
        //         "documentType": "PASSPORT",
        //         "gender": "female",
        //         "birthCountry": "EG",
        //         "birthDate": "2025-12-20T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax13": {
        //     "title": "MR",
        //     "name": {
        //         "first": "Yazan",
        //         "middle": "Omar",
```

```
        //         "last": "Adel"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2025-05-02T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "INF",
        //     "ParentPaxRefId": "Pax4",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Yazan",
        //             "middle": "Omar",
        //             "last": "Adel"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2029-05-01T00:00:00.000Z",
        //         "issuanceDate": "2025-05-10T00:00:00.000Z",
        //         "documentNumber": "INF1234504",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2025-05-02T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // },
        // "Pax14": {
        //     "title": "MR",
        //     "name": {
        //         "first": "Zain",
        //         "middle": "Mahmoud",
        //         "last": "Saleh"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2025-08-12T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "INF",
        //     "ParentPaxRefId": "Pax5",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Zain",
        //             "middle": "Mahmoud",
        //             "last": "Saleh"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2029-08-11T00:00:00.000Z",
        //         "issuanceDate": "2025-08-20T00:00:00.000Z",
        //         "documentNumber": "INF9876540",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2025-08-12T00:00:00.000Z",
        //         "issuanceCountryCode": "EG"
        //     }
        // }
    },
    "contactsList": {
        "0": {
            "Email": "moontravel626@gmail.com",
            "phone": {
                "type": "Personal",
                "countryDialingCode": "+971",
```

```
                "phoneNumber": "509700784"
            },
            "Address": {
                "Line1": "FZ HQ",
                "Line2": "FZ HQ",
                "City": "DUBAI",
                "CountryCode": "AE"
            }
        }
    }
}
Add Pax Responce:
{
    "offerId":
```

```
"84424b6f-df65-4178-95e2-310243f6c08f&yAN8Y9IAAASs9iTcABSRm9b/ag30SNb/
ag4SwNkwRzkkQkFIL1NISiQzMjQxNzQwJDIwMjYwNTIwMTc1MDAPACAyMAEA8BalRzkxMDSjQkFIpU1h
aW5Uo1NISqDCoEaTkqNBRFShMZKjQ0hEBwDwHklORqExANkiVElEJDE3NzkwMDIxODM4MzMxOTg0OTU3
LS1hcHAtMjE3NZKRk1AAAEoA/wTW/2oM+YCTkgEBkgIBkgMBkZGRsQBF/
AKhWZGiQTGRokMykaVJMy9BMYYA9ArAkqgzMzMwMi43NKNFR1CSqDE2ODI5Ljk2DgBgNDcyLjc4DgD+F
IOiQTGbAZOnTW9zdGFmYaCnSWJyYWhpbdb/OKiXAAEBoTCaHQDxC6JFR9b/cGKOgNb/
ZRi2gKhBMTIzNDU2MQEBGgAAOgD2DaJFR8CiRUeiRUcaokMymwSTpUxhaWxhpE9tYXJkAGBW4LkAAgJk
AA8fAAABTADxBm8WVIDW/
```

```
2BIDACoRjIyMzM0NDUBAhoAADwABmYAEgoKAXibA5OkTGluyABgZ3nLgAIDZAAKGgABRQDhbv6ZgNb/
Z4BjAKpJTkbHACMwMWEAADkAAMMAIEExBgDzMEVHAYGhMJO3bW9vbnRyYXZlbDYyNkBnbWFpbC5jb22T
qFBlcnNvbmFspCs5NzGpNTA5NzAwNzg0lKVGWiBIUQYAr0RVQkFJokFFkZPAAh8Tp+4C8A6Tlc4AAQPX
p1ByZW1pdW2gkaNFMjSnMTM1Mi4wMBwA8AoEEaVWYWx1ZdmZR2xvYmFsIENvdmlkLTE5CQD0Z2VyCkJh
Z2dhZ2UgOiAyMC8zMCBLZwpNZWFsIDogU2FuZHdpY2ggYW5kIHdhdGVyClNlYXQgOiByb3cgOCBvbndh
cmRzCk1vZGlmaWNhdGlvbiA6IE9uZSBtb2RpZmljYXRpb24sIHVwIHRvIDhoCkNhbmNlbGwqABNVGAAC
tABxMjAwNy43MrQA9A0JqFVsdGltYXRl2bBIYW5kYmFnOiA3IEtnICsgWwHwAiBJdGVtIChNYXggM0tn
KQo0vACTIENoZWNrZWQg1wABsgB1OiBSb3cgM7EAkFN0YW5kYXJkIOkAiQoyIEZyZWUgxgAUKJsAGSm0
AAazAPMMLiBDcmVkaXQgdm91Y2hlciBhdCBBRUQgMjAwzgCANzUxLjMywsI=",
```

```
    "responseId": "b43563ca-578e-4f42-83c2-5045524a5aea"
```

```
}
```

```
Get Ancillary Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
```

```
    "addPaxResponseId": "{{fareConfirmResponseId}}",
```

```
    "selectedOfferId": "{{AddPaxOfferId}}"
```

```
}
Get Ancillary Response:
{
    "offerId":
```

```
"84424b6f-df65-4178-95e2-310243f6c08f&yAN8Y9IAAASs9iTcABSRm9b/ag30SNb/
ag4SwNkwRzkkQkFIL1NISiQzMjQxNzQwJDIwMjYwNTIwMTc1MDAPACAyMAEA8BalRzkxMDSjQkFIpU1h
aW5Uo1NISqDCoEaTkqNBRFShMZKjQ0hEBwDwHklORqExANkiVElEJDE3NzkwMDIxODM4MzMxOTg0OTU3
LS1hcHAtMjE3NZKRk1AAAEoA/wTW/2oM+YCTkgEBkgIBkgMBkZGRsQBF/
```

```
AKhWZGiQTGRokMykaVJMy9BMYYA9ArAkqgzMzMwMi43NKNFR1CSqDE2ODI5Ljk2DgBgNDcyLjc4DgD+F
IOiQTGbAZOnTW9zdGFmYaCnSWJyYWhpbdb/OKiXAAEBoTCaHQDxC6JFR9b/cGKOgNb/
ZRi2gKhBMTIzNDU2MQEBGgAAOgD2DaJFR8CiRUeiRUcaokMymwSTpUxhaWxhpE9tYXJkAGBW4LkAAgJk
AA8fAAABTADxBm8WVIDW/
```

```
2BIDACoRjIyMzM0NDUBAhoAADwABmYAEgoKAXibA5OkTGluyABgZ3nLgAIDZAAKGgABRQDhbv6ZgNb/
Z4BjAKpJTkbHACMwMWEAADkAAMMAIEExBgDzMEVHAYGhMJO3bW9vbnRyYXZlbDYyNkBnbWFpbC5jb22T
qFBlcnNvbmFspCs5NzGpNTA5NzAwNzg0lKVGWiBIUQYAr0RVQkFJok{
```

```
    "supplier": "AirArabia",
```

```
    "isFareCheckRequired": true,
    "offerId":
```

```
"24f5140b-abdb-4196-9ee3-c601cc9cb9dc&yAIVY9IAAALS9iTcABSRm9b/ag30SNb/
ag4SwNkwRzkkQkFIL1NISiQzMjQxNzQwJDIwMjYwNTIwMTc1MDAPACAyMAEA8BalRzkxMDSjQkFIpU1h
aW5Uo1NISqDCoEaTkqNBRFShMZKjQ0hEBwDwHklORqExANkiVElEJDE3NzkwMDIxODM4MzMxOTg0OTU3
LS1hcHAtMjE3NZKRk1AAAEoA/wTW/2oM+YCTkgEBkgIBkgMBkZGRsQBF/
```

```
AKhWZGiQTGRokMykaVJMy9BMYYA9ArAkqgzMzMwMi43NKNFR1CSqDE2ODI5Ljk2DgBgNDcyLjc4DgD+F
IOiQTGbAZOnTW9zdGFmYaCnSWJyYWhpbdb/OKiXAAEBoTCaHQDxC6JFR9b/cGKOgNb/
ZRi2gKhBMTIzNDU2MQEBGgAAOgD2DaJFR8CiRUeiRUcaokMymwSTpUxhaWxhpE9tYXJkAGBW4LkAAgJk
```

```
AA8fAAABTADxBm8WVIDW/
2BIDACoRjIyMzM0NDUBAhoAADwABmYAEgoKAXibA5OkTGluyABgZ3nLgAIDZAAKGgABRQDhbv6ZgNb/
Z4BjAKpJTkbHACMwMWEAADkAAMMAIEExBgDzMEVHAYGhMJO3bW9vbnRyYXZlbDYyNkBnbWFpbC5jb22T
qFBlcnNvbmFspCs5NzGpNTA5NzAwNzg0lKVGWiBIUQYAsERVQkFJokFFkMLC",
    "responseId": "a05a037a-0bf0-4567-8f6e-505626fd4737",
    "journeys": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000"
            ]
        }
    },
    "flightSegments": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": null
        }
    },
    "passengersAncillariesAvailabilty": {
        "A1": {
            "passengerTypeCode": "ADT",
            "name": {
                "first": "Mostafa",
                "middle": "",
                "last": "Ibrahim"
            },
            "segmentAncillariesAvailability": {
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000": [
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUvLLV3BKTFfSUXJJLU4uyiwoyczPQxZ2zM0vzStRsjLQMzDQUXIuLSp
KzUuuBKpwdQ8ASeclZ+bkJBZVOieWpKbnF4FkgBrTE9NTlWoBQdm9aGUAAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIyUPBOVzBUCMhMTU5V0lFySS1OLsosKMnMz8Mi65ibX5pXomRlYmy
kZ2aio+RcWlSUmpdcCVTq6h4AUpCXnJmTk1hU6ZxYkpqeXwSScUpMT09MT1WqBQBe3BASdQAAAA==",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI2UPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8OnzDE
3vzSvRMnK0sRMz8RAR8m5tKgoNS+5EqjH1T0ApCAvOTMnJ7Go0jmxJDU9vwgk45SYnp6YnqpUCwD5O3G
HhwAAAA==",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIxUPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8NQpoe
kzjE3vzSvRMnK0MLSSM/
CQEfJubSoKDUvuRKoy9U9AKQiLzkzJyexqNI5sSQ1Pb8IJOOUmJ6emJ6qVAsAwrIqDYkAAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUnL2Dg5X0lFySS1OLsosKMnMzwMJZmQmZ6fmKQQn5qWUZyZnABU45ua
X5pUoWRkZWepZmOgoOZcWFaXmJVcCVbu6B4AU5CVn5uQkFlU6J5akpucXgWR8UxNzlGoBZ2FsC2wAAAA
=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUgpzDw5X0lFySS1OLsosKMnMzwMJpqYrBCfmpZRnJmcAJR1z80vzSpS
sjIws9SxMdJScS4uKUvOSK4EqXd0DQArykjNzchKLKp0TS1LT84tAMr6piTlKtQD4VTyDaAAAAA==",
```

```
"H4sIAAAAAAAAAzWQy2rDMBBFf2WqtQmmFALZJU4feUEgXXYzlSf21IpkRlIbUfrvHad0J6QzOnPvt2l
```

```
CS2Zhdpv16bA3lVlTtMJj4uD1eglxJMvoXAGbBRO1sOMWTh7tAKtwBY6A0JLjrk/
n7CAJYdKLyJ1XOAW44EBAnyQFSsi+gxFjJN+RvOW6vp9HON+mga4jCZO3il+T4L/
7Dl571cSb8/3PGbPQ9PlANMLAbQTyiSQhT1b0LURMHM887dBLyF0fctIjscBHyOKpzGCTgL11WdeFPVo
fBLaZLVXwQuhSX6AJYWCK1ZNkTrAlLaJStERoeh5jpeHXgl+ssVaKVjc16phTBxw1DDs4UZpptcuLxk9
mcT+vZw91ZZosokDRnh+fjxMw0Q6lNFp0F2R6Oegi5ucXbKPuSagBAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUgp3DHENUtJRckktTi7KLCjJzM8DiSaWpBYpmBoYKOTmACUdc/
NL80qUrEwM9EzNdJScS4uKUvOSK4EKXd0DQPJ5yZk5OYlFlc5Afen5RSAZ39TEHKVaADzwS45oAAAA",
```

```
"H4sIAAAAAAAAAxWLzQrCMAyAX6XkPMbYSXYb9QcPgjh9gFCjFmIqaXoo4ru7Xr+fL/
h0J5hgf7kdrwt0sKUcNH4sJmlYKb+4ulDMZcKcBNk9tETr13Z+pyIG0ziM/
WbowBdVklDXcXc4t0BCZEatHo2eSZs5ETL8/ow1TEB5AAAA"
                ]
            },
            "journeyAncillariesAvailability": {}
        },
        "C2": {
            "passengerTypeCode": "CHD",
            "name": {
                "first": "Laila",
                "middle": "Omar",
                "last": "Ibrahim"
            },
            "segmentAncillariesAvailability": {
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000": [
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUvLLV3BKTFfSUXJJLU4uyiwoyczPQxZ2zM0vzStRsjLQMzDQUXIuLSp
KzUuuBKpwdQ8ASeclZ+bkJBZVOieWpKbnF4FkgBrTE9NTlWoBQdm9aGUAAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIyUPBOVzBUCMhMTU5V0lFySS1OLsosKMnMz8Mi65ibX5pXomRlYmy
kZ2aio+RcWlSUmpdcCVTq6h4AUpCXnJmTk1hU6ZxYkpqeXwSScUpMT09MT1WqBQBe3BASdQAAAA==",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI2UPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8OnzDE
3vzSvRMnK0sRMz8RAR8m5tKgoNS+5EqjH1T0ApCAvOTMnJ7Go0jmxJDU9vwgk45SYnp6YnqpUCwD5O3G
HhwAAAA==",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIxUPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8NQpoe
kzjE3vzSvRMnK0MLSSM/
CQEfJubSoKDUvuRKoy9U9AKQiLzkzJyexqNI5sSQ1Pb8IJOOUmJ6emJ6qVAsAwrIqDYkAAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUnL2Dg5X0lFySS1OLsosKMnMzwMJZmQmZ6fmKQQn5qWUZyZnABU45ua
X5pUoWRkZWepZmOgoOZcWFaXmJVcCVbu6B4AU5CVn5uQkFlU6J5akpucXgWR8UxNzlGoBZ2FsC2wAAAA
=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUgpzDw5X0lFySS1OLsosKMnMzwMJpqYrBCfmpZRnJmcAJR1z80vzSpS
sjIws9SxMdJScS4uKUvOSK4EqXd0DQArykjNzchKLKp0TS1LT84tAMr6piTlKtQD4VTyDaAAAAA==",
```

```
"H4sIAAAAAAAAAzWQy2rDMBBFf2WqtQmmFALZJU4feUEgXXYzlSf21IpkRlIbUfrvHad0J6QzOnPvt2l
CS2Zhdpv16bA3lVlTtMJj4uD1eglxJMvoXAGbBRO1sOMWTh7tAKtwBY6A0JLjrk/
n7CAJYdKLyJ1XOAW44EBAnyQFSsi+gxFjJN+RvOW6vp9HON+mga4jCZO3il+T4L/
7Dl571cSb8/3PGbPQ9PlANMLAbQTyiSQhT1b0LURMHM887dBLyF0fctIjscBHyOKpzGCTgL11WdeFPVo
fBLaZLVXwQuhSX6AJYWCK1ZNkTrAlLaJStERoeh5jpeHXgl+ssVaKVjc16phTBxw1DDs4UZpptcuLxk9
mcT+vZw91ZZosokDRnh+fjxMw0Q6lNFp0F2R6Oegi5ucXbKPuSagBAAA=",
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUgp3DHENUtJRckktTi7KLCjJzM8DiSaWpBYpmBoYKOTmACUdc/
NL80qUrEwM9EzNdJScS4uKUvOSK4EKXd0DQPJ5yZk5OYlFlc5Afen5RSAZ39TEHKVaADzwS45oAAAA",
```

```
"H4sIAAAAAAAAAxWLzQrCMAyAX6XkPMbYSXYb9QcPgjh9gFCjFmIqaXoo4ru7Xr+fL/
h0J5hgf7kdrwt0sKUcNH4sJmlYKb+4ulDMZcKcBNk9tETr13Z+pyIG0ziM/
WbowBdVklDXcXc4t0BCZEatHo2eSZs5ETL8/ow1TEB5AAAA"
                ]
```

```
            },
            "journeyAncillariesAvailability": {}
        }
```

```
    },
    "segmentsAncillariesDetails": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": [
            {
                "name": "No Bag",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUvLLV3BKTFfSUXJJLU4uyiwoyczPQxZ2zM0vzStRsjLQMzDQUXIuLSp
KzUuuBKpwdQ8ASeclZ+bkJBZVOieWpKbnF4FkgBrTE9NTlWoBQdm9aGUAAAA=",
                "price": {
                    "amount": 0.00,
                    "currency": "EGP"
                },
                "description": "No Bag",
                "availableCount": null,
                "ancillaryCategory": "Baggage"
            },
            {
                "name": "20 Kg 1 Piece",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUjIyUPBOVzBUCMhMTU5V0lFySS1OLsosKMnMz8Mi65ibX5pXomRlYmy
kZ2aio+RcWlSUmpdcCVTq6h4AUpCXnJmTk1hU6ZxYkpqeXwSScUpMT09MT1WqBQBe3BASdQAAAA==",
                "price": {
                    "amount": 432.64,
                    "currency": "EGP"
                },
                "description": "20 Kg 1 Piece",
                "availableCount": null,
                "ancillaryCategory": "Baggage"
            },
            {
                "name": "30 Kg Total in 2 Piece",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUjI2UPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8OnzDE
3vzSvRMnK0sRMz8RAR8m5tKgoNS+5EqjH1T0ApCAvOTMnJ7Go0jmxJDU9vwgk45SYnp6YnqpUCwD5O3G
HhwAAAA==",
                "price": {
                    "amount": 946.40,
                    "currency": "EGP"
                },
                "description": "30 Kg Total in 2 Piece",
                "availableCount": null,
                "ancillaryCategory": "Baggage"
            },
            {
                "name": "40 Kg Total in 2 Piece",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUjIxUPBOVwjJL0nMUcjMUzBSCMhMTU5V0lFySS1OLsosKMnMz8NQpoe
kzjE3vzSvRMnK0MLSSM/
CQEfJubSoKDUvuRKoy9U9AKQiLzkzJyexqNI5sSQ1Pb8IJOOUmJ6emJ6qVAsAwrIqDYkAAAA=",
                "price": {
                    "amount": 1892.80,
                    "currency": "EGP"
                },
                "description": "40 Kg Total in. 2 Piece",
                "availableCount": null,
                "ancillaryCategory": "Baggage"
            },
            {
                "name": "Chicken Sandwich",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUnL2Dg5X0lFySS1OLsosKMnMzwMJZmQmZ6fmKQQn5qWUZyZnABU45ua
X5pUoWRkZWepZmOgoOZcWFaXmJVcCVbu6B4AU5CVn5uQkFlU6J5akpucXgWR8UxNzlGoBZ2FsC2wAAAA
=",
                "price": {
```

```
                    "amount": 229.84,
                    "currency": "EGP"
                },
                "description": "Chicken Sandwich",
                "availableCount": 1000,
                "ancillaryCategory": "Meal"
            },
            {
                "name": "Veg Sandwich",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUgpzDw5X0lFySS1OLsosKMnMzwMJpqYrBCfmpZRnJmcAJR1z80vzSpS
sjIws9SxMdJScS4uKUvOSK4EqXd0DQArykjNzchKLKp0TS1LT84tAMr6piTlKtQD4VTyDaAAAAA==",
                "price": {
                    "amount": 229.84,
                    "currency": "EGP"
                },
                "description": "Veg Sandwich",
                "availableCount": 1000,
                "ancillaryCategory": "Meal"
            },
            {
                "name": "Kids Snack Box",
                "code":
"H4sIAAAAAAAAAzWQy2rDMBBFf2WqtQmmFALZJU4feUEgXXYzlSf21IpkRlIbUfrvHad0J6QzOnPvt2l
CS2Zhdpv16bA3lVlTtMJj4uD1eglxJMvoXAGbBRO1sOMWTh7tAKtwBY6A0JLjrk/
n7CAJYdKLyJ1XOAW44EBAnyQFSsi+gxFjJN+RvOW6vp9HON+mga4jCZO3il+T4L/
7Dl571cSb8/3PGbPQ9PlANMLAbQTyiSQhT1b0LURMHM887dBLyF0fctIjscBHyOKpzGCTgL11WdeFPVo
fBLaZLVXwQuhSX6AJYWCK1ZNkTrAlLaJStERoeh5jpeHXgl+ssVaKVjc16phTBxw1DDs4UZpptcuLxk9
mcT+vZw91ZZosokDRnh+fjxMw0Q6lNFp0F2R6Oegi5ucXbKPuSagBAAA=",
                "price": {
                    "amount": 270.40,
                    "currency": "EGP"
                },
                "description": "A specially curated Kid Snack Box is a
delightful treat designed to make every young passenger's flight experience
extra special! This snack box is sure to keep kids entertained and satisfied
throughout their journey. It includes Lacnor Juice, Healthy Cookies,Fruit Jelly,
Lays Chips, a Drawing Book, and a Colour Pencil Set.",
                "availableCount": 1000,
                "ancillaryCategory": "Meal"
            },
            {
                "name": "Water 500ml",
                "code":
"H4sIAAAAAAAAA6tWcs5PSVWyUgp3DHENUtJRckktTi7KLCjJzM8DiSaWpBYpmBoYKOTmACUdc/
NL80qUrEwM9EzNdJScS4uKUvOSK4EKXd0DQPJ5yZk5OYlFlc5Afen5RSAZ39TEHKVaADzwS45oAAAA",
                "price": {
                    "amount": 40.56,
                    "currency": "EGP"
                },
                "description": "Water 500 ml",
                "availableCount": 1000,
                "ancillaryCategory": "Meal"
            },
            {
                "name": "Seasonal Fruit Salad",
                "code":
"H4sIAAAAAAAAAxWLzQrCMAyAX6XkPMbYSXYb9QcPgjh9gFCjFmIqaXoo4ru7Xr+fL/
h0J5hgf7kdrwt0sKUcNH4sJmlYKb+4ulDMZcKcBNk9tETr13Z+pyIG0ziM/
WbowBdVklDXcXc4t0BCZEatHo2eSZs5ETL8/ow1TEB5AAAA",
                "price": {
                    "amount": 202.80,
                    "currency": "EGP"
                },
```

```
                "description": "Freshly cut seasonal fruit.",
                "availableCount": 1000,
                "ancillaryCategory": "Meal"
            }
        ]
    },
    "journeysAncillariesDetails": {}
}
SeatMap Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "addPaxResponseId": "{{fareConfirmResponseId}}",
    "selectedOfferId": "{{AddPaxOfferId}}"
}
SeatMap Responce:
{
    "supplier": "AirArabia",
    "flightSegments": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": "A320-174"
        }
    },
    "passengersDetails": {
        "A1": {
            "passengerTypeCode": "ADT",
            "name": {
                "first": "Mostafa",
                "middle": "",
                "last": "Ibrahim"
            }
        },
        "C2": {
            "passengerTypeCode": "CHD",
            "name": {
                "first": "Laila",
                "middle": "Omar",
                "last": "Ibrahim"
            }
        }
    },
    "seatMapDetails": {
        "G9$BAH/SHJ$3241740$20260520175000$20260520200000": {
            "rows": [
                {
                    "rowNumber": 1,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUQtKnAnFm2DTiA2hGBjTLqI6O7V+vFu2LQSNBoDhYFOL+HIITE
0lxgVzJ4KZ+imb/uqqxVsESH213fGaf6SYR9idHJZl2lL8stCLuN5AXh4IONdAAAA",
```

```
                                "cellCode": "1A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1757.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1757.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjJ0UtJRckktTi7KLCjJzM9TssorzcnRUXLMzS/NK1GyMjSxMNczMtB
Rci4tKkrNS64E6nF1DwBqcsxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgCjks8RXQAAAA==",
                                "cellCode": "1B",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1487.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1487.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFtHAXFm2DTiA2hGBjTLqQ6O7V+vFumLgRNBoDhZEuJ/
5MPjI05xAUhiNmTtBN37ZVVyuYLELsynemefnSwM6HYKUYm2iP8stKNuF5ARTszQJdAAAA",
                                "cellCode": "1C",
```



```
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFtHAXFm2DTiA2hGBjTLqQ6O7V+vFumLgRNJoRCiNdTvyZfGR
oziEoDEfMnKCbvm2rrlYwWYTYle9M8/KlgZ0PwUoxNtEe5ZeVbMLzAu7CshFdAAAA",
                                "cellCode": "1D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1622.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1622.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFULgLi7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGtUIhYFOJ/
5IPjI05xAU+j1mTtBV07VFXSqYLELsru+M0/ylnp0PwcplbKItyi8L2YTnBVm8sAJdAAAA",
                                "cellCode": "1E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1487.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1487.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLOwqAMBAFwLu8OogWKqST+GkFTxDiIoG4kTUpRLy7Wg9zw8SVoFGNUOjpdOKP5CN
Dcw5Bodtj5gRdtXVbNKWCySLE7vrOMM1f6tj5EKxcxibaovyykE14XoJWX/BdAAAA",
                                "cellCode": "1F",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
```

```
                                    "totalPrice": {
                                        "amount": 1757.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1757.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 2,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUS1iHAnFm2DTiA2hGBjTLqI6O7V+vFu2LQSNFoDhYFOL+HIITE
0lxgVzJ4KZ+imbbqqrxVsESH213fGaf6SYR9idHJZl2lL8stCLuN5AdWAQfpdAAAA",
                                "cellCode": "2A",
```

```
                                "cellAvailability": "Occupied",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYRFK3dl0TboBGJDCDbGpIuI7l6tH+
+GTSvBoOmhMNDpJRw5JIbhEqNCt6fCGabWdVtprWCLCLG/
vjNO85c69iFGJ5d1mbYkvyzkMp4XfRMmh10AAAA=",
```



```
                                "cellAvailability": "Occupied",
```



```
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYS1iHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDBoLhYFOL+HIITE
MlxgV+j0VzjC17uqq1Qq2iBD76zvjNH+pZx9idHJZl2lL8stCLuN5Af+gCoxdAAAA",
                                "cellCode": "2C",
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1081.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1081.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYRFK3dh0TboBGJDCDbGpIuI7p6tH+
+BTRvBoJugMNLlJZw5JIbhEqPCcKTCGabVbd9orWCLCLG/
```

```
65nmpaaBfYjRyW1dpj3JLyu5jPcDhz1ZlF0AAAA=",
                                "cellCode": "2E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 1014.00,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 1014.00,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLOwqAMBAFwLu8OohaiKST+GkFTxDiIoG4kTUpRLy7Wg9zw8SVoFGPUOjpdOKP5CN
Dcw5Bodtj5gRd1VVTtKWCySLE7vrOMM1f6tj5EKxcxibaovyykE14Xi+uPuldAAAA",
                                "cellCode": "2F",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURQQbgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGo2BwkCnl3DkkBi
aS4wKZk+FM3TX1lVfK9giQuyvr4zT/B3DPsTo5LIu05bkl4VcxvMCQnS6+VwAAAA=",
                                "cellCode": "3A",
```



```
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELgri7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGnUPhYFOJ/
5IPjI05xAUuj1mTtBNWxdVqWCyCLG7vjJO83c6dj4EK5exibYovyxkE54XGbg0gVwAAAA=",
                                "cellCode": "3B",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYRQQbgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrWFwkCnl3DkkBi
GS4wK/Z4KZ5i20VWnFWwRIfbXV8Zp/k7PPsTo5LIu05bkl4VcxvMCibAIsFwAAAA=",
                                "cellCode": "3C",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYRQQbgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBvUAhYFOL+HIITE
MlxgV+j0VzjBto6tOK9giQuyvr4zT/J2efYjRyWVdpi3JLwu5jOcFkRy+o1wAAAA=",
                                "cellCode": "3D",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELgLi7ZBJxAbQrAxJl1IdPdq/Xg3TNwIGu0EhZEuJ/
5MPjI05xAUhiNmTtBd31ZNrWCyCLErX5nm5TsDOx+ClWJsoj3KLyvZhOcFARSCklwAAAA=",
                                "cellCode": "3E",
```



```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mggnAX9rMNOoHYEIKNMekiortX68e7YeJK0KhGKPR0OvFH8pG
hOYeg0O0xc4Ju6rJoSwWTRYjd9ZVhmr/TsfMhWLmMTbRF+WUhm/C8WtgM6lwAAAA=",
                                "cellCode": "3F",
```



```
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 4,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLgnAnFm2DTiA2hGBjTLqI6O7Z+vEe2LQRNDoDhZEuL+HMITE
0lxgVzJEKZ+i+a5uhVbBFhNjftUzzUo9hH2J0cluXaU/yy0ou4/0AuFrF6lwAAAA=",
                                "cellCode": "4A",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELgri7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGk0PhYFOJ/
5IPjI05xAUuj1mTtBNWxdVqWCyCLG7vjJO83c6dj4EK5exibYovyxkE54X45ZLklwAAAA=",
                                "cellCode": "4B",
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUQLg3AnFm2DTiA2hGBjTLqI6O7V+vFuuLwSDLSDwkBnkHiUmBm
Ga0oKds+VC0yn26ZvFVwVIQ7XV8Zp/o7lEFPycjlfaMvyy0K+4HkBc553o1wAAAA=",
                                "cellCode": "4C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLgnAnFm2DTiA2hGBjTLqQ6O7V+vFu2LQRNLoRCiNdXsKZQ2J
oLjEqmCMVztB91zZDq2CLCLGvX5nm5TuGfYjRSbUu057kl5VcxvMCazLBsFwAAAA=",
                                "cellCode": "4D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELgLi7ZBJxAbQrAxJl1IdPdq/Xg3TNwIGt0EhZEuJ/
5MPjI05xAUhiNmTtBd31ZNrWCyCLErX5nm5TsDOx+ClWJsoj3KLyvZhOcF+zr9gVwAAAA=",
                                "cellCode": "4E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
```

```
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awkXBeEu7GcbdAKxIQQbY9JFRHev1o93w6aVYFCPUOjp9BKOHBL
DcIlRodtT4QzT1LpqtYItIsT++sowzd/p2IcYnVzWZdqS/LKQy3heoPZz+VwAAAA=",
                                "cellCode": "4F",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLgnAnFm2DTiA2hGBjTLqI6O7Z+vEe2LQRNHoDhZEuL+HMITE
0lxgVzJEKZ+i+a5uhVbBFhNjftUzzUo9hH2J0cluXaU/yy0ou4/0ARo667FwAAAA=",
                                "cellCode": "5A",
```



```
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjJ1UtJRckktTi7KLCjJzM9TssorzcnRUXLMzS/NK1GyMjE31jMy0FF
yLi0qSs1LrgRqcXUPAOpxzEvOzMlJLKp0TixJTc8vAskEpyaWKNUCAB1CNJRcAAAA",
                                "cellCode": "5B",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLhHAnFm2DTiA2hGBjTLqI6O7V+vFuuLwSDLSDwkBnkHiUmBm
Ga0oKds+VC4zu2qZvFVwVIQ7XV8Zp/o7lEFPycjlfaMvyy0K+4HkBjUoIpVwAAAA=",
                                "cellCode": "5C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLhHAXGm2DTiA2hGBjTLqI6O7V+vFu2LwSDLSDgqMzSDxKzAz
DNSWFYc+VC4zu2qZvFWwVIQ7XV8Zp/s7AIabk5bK+0Jbll4V8wfMClea+tlwAAAA=",
                                "cellCode": "5D",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
```

```
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4noh8BdWLQNOoHYEIKNMekiortX68e7YeJK0GhHKAx0OvFH8pG
hOYeg0O8xc4JuurqoSgWTRYjd9ZVxmr/Ts/MhWLmMTbRF+WUhm/C8Be6Ch1wAAAA=",
                                "cellCode": "5E",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awkXBeEu7GcbdAKxIQQbY9JFRHev1o93w6aVYNCMUOjp9BKOHBL
DcIlRodtT4QzT1LpqtYItIsT++sowzd/p2IcYnVzWZdqS/LKQy3heXiIM/1wAAAA=",
                                "cellCode": "5F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                {
                    "rowNumber": 6,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLinAnFm2DTiA2hGBjTLqI6O7V+vFu2LQSNDoDhYFOL+HIITE
0lxgVzJ4KZ+i2qau+VrBFhNhfXxmn+TuGfYjRyWVdpi3JLwu5jOcFRPM65lwAAAA=",
                                "cellCode": "6A",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLinAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDFoLhYFOL+HIITE
MlxgV+j0VzjBNratOK9giQuyvr4zT/J2efYjRyWVdpi3JLwu5jOcFjzeIr1wAAAA=",
                                "cellCode": "6C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
```

```
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLinAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDNoBCgOdXsKRQ2I
YLjEq9HsqnGGaWledVrBFhNhfXxmn+Ts9+xCjk8u6TFuSXxZyGc8Ll5s+vFwAAAA=",
                                "cellCode": "6D",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLkHAXJm2DTiA2hGBjTLqI6O7V+vFu2LwSDLSDwkhnkHiUmBm
Ga0oKw54rFxjd9k3XKtgqQhyur7hp/s7AIabk5bK+0Jbll4V8wfMCQBRir1wAAAA=",
                                "cellCode": "6E",
```





```
                                    "totalPrice": {
                                        "amount": 608.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 608.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLonAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDFoLhYFOL+HIITE
MlxgV+j0VzjBNratOK9giQuyvr4zT/J2efYjRyWVdpi3JLwu5jOcFceP3qVwAAAA=",
                                "cellCode": "7C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLonAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDNoBCgOdXsKRQ2I
YLjEq9HsqnGGaWledVrBFhNhfXxmn+Ts9+xCjk8u6TFuSXxZyGc8LaU9BulwAAAA=",
                                "cellCode": "7D",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLqHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDNoRCgOdXsKRQ2I
YLjEq9HsqnGEa3VW1VrBFhNhfXxmn+Ts9+xCjk8u6TFuSXxZyGc8LvsAdqVwAAAA=",
                                "cellCode": "7E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 608.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 608.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjJ3U9JRckktTi7KLCjJzM9TssorzcnRUXLMzS/NK1GyMjUx0LMw0FF
yLi0qSs1LrgRqcXUPAOpxzEvOzMlJLKp0TixJTc8vAskEpyaWKNUCAKKL8/NcAAAA",
                                "cellCode": "7F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLgnAnFm2DTiA2hGBjTLqI6O7Z+vEe2LQRNAYDhZEuL+HMITE
0lxgVzJEKZ+i+a5uhVbBFhNjftUzzUo9hH2J0cluXaU/yy0ou4/0AsK7EwFwAAAA=",
                                "cellCode": "8A",
```

```
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLinBXFm2DTiA2hGBjTLqI6O7V+vFumLgSNNoeCgOdTvyRfGR
oziEodHvMnKCrsi6aUsFkEWJ3fWWc5u907HwIVi5jE21RflnIJjwvg+aYeVwAAAA=",
                                "cellCode": "8B",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUULgLi7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGp2BwkCnE38kHxm
acwgK/R4zJ+imrYuqVDBZhNhdXxmn+Ts9Ox+ClcvYRFuUXxayCc8LroMrcVwAAAA=",
                                "cellCode": "8C",
```



```
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUULgLi7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGt0AhYFOJ/
5IPjI05xAU+j1mTtBNWxdVqWCyCLG7vjJO83d6dj4EK5exibYovyxkE54Xti+dYlwAAAA=",
                                "cellCode": "8D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awkXBeEu7GcbdAKxIQQbY9JFRHev1o93w6aVYNCOUOjp9BKOHBL
DcIlRodtT4QzT1LpqtYItIsT++sowzd/p2IcYnVzWZdqS/LKQy3heqAJy01wAAAA=",
                                "cellCode": "8F",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
```

```
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 540.80,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 9,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLgnInFm2DTiA2hGBjTLqI6O7V+vFu2LQSNHoDhYFOL+HIITE
0lxgVzJ4KZ+i2qauuVrBFhNhfXxmn+TuGfYjRyWVdpi3JLwu5jOcFTnq7xlwAAAA=",
                                "cellCode": "9A",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUSLCnJXFm2DTiA2hGBjTLqI6O7V+vFumLgSNNoeCgOdTvyRfGR
oziEodHvMnKCrsi6aUsFkEWJ3fWWc5u907HwIVi5jE21RflnIJjwvfTLnf1wAAAA=",
                                "cellCode": "9B",
```

```
                                "cellAvailability": "Occupied",
```



```
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELkLi7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGp2BwkCnE38kHxm
acwgK/R4zJ+imrYuqVDBZhNhdXxmn+Ts9Ox+ClcvYRFuUXxayCc8LUFdUd1wAAAA=",
                                "cellCode": "9C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYSLCnIXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDLoRCgOdXsKRQ2I
YLjEq9HsqnGFq3VStVrBFhNhfXxmn+Ts9+xCjk8u6TFuSXxZyGc8LZZ5RbFwAAAA=",
                                "cellCode": "9E",
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUrJ0U9JRckktTi7KLCjJzM9TssorzcnRUXLMzS/NK1GyMjUx0LMw0FF
yLi0qSs1LrgRqcXUPAOpxzEvOzMlJLKp0TixJTc8vAskEpyaWKNUCAFbWDdVcAAAA",
                                "cellCode": "9F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0cFTSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI1MdCzMNB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAeUEN5XQAAAA==",
                                "cellCode": "10A",
```



```
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0cFLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIxMNUzM9B
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAtGB/AXQAAAA==",
                                "cellCode": "10B",
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4n+IHAXFm2DTiA2hGBjTLqI6O7V+vFumLgSNKpygMJApxN/
JB8ZmnMICv0eMyfotmuKulQwWYTYXd8Zp/k7PTsfgpXL2ERblF8WsgnPCxjRGttdAAAA",
```

```
                                "cellCode": "10D",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 473.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYRBtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDGo9QmGg00s4ckg
MwyVGhX5PhTNMo9uq0wq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5ATW0qdNdAAAA",
                                "cellCode": "10E",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 405.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0cFPSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI1MdCzMNB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAG/PVqXQAAAA==",
                                "cellCode": "10F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 11,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxWLSwqAIBBAryKzjshW0U4s2gadQGwIwcaYJiiiu6fb93nBphWhB60NVDDg6TkcEhJ
lNt5BlKNV4Y68IflHYUa5M3u6SKDvtK7bpgJ7MRdfpmkuAfkQo+PHOsEtcTELOoHvB9eK0ONyAAAA",
                                "cellCode": "11A",
```



```
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs0REubHkqjzBtiZtMasxiuTd7V6/nxe0XxAayPMOEujxtOwOcZ4
CG24nytCicEdekeyjMKDQtbu/SKCpyyKtsgT0xRx9nMYpBmTdthl+tBFcPUczoxH4fimg50RyAAAA",
                                "cellCode": "11B",
```



```
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs0REuWnJVXmCbU3aYlZjtkje3e71+3lB+xWhg7LUkMGAl2V3ivM
U2Xg7UYZWhQfyhmQfhRHFrj98IIGurau8KTLQgTn5NE1zCsi6fTf8aCO4eU5mQSPw/eJ1PExyAAAA",
                                "cellCode": "11C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs0REuWnJVXmCbU3aYlZjtkje3e71+3lB+xWhg7IcIIMBL8vuFOc
psvF2ogytCg/kDck+CiOKXX/
4QAJdW1d5U2SgA3PyaZrmFJB1+2740UZw85zMgkbg+wGTXD92cgAAAA==",
                                "cellCode": "11D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
```

```
                                ]
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs0REuWnJVXmCbU3aYlZjtkje3e71+3lB+xWhg7IcIYMBL8vuFOc
psvF2ogytCg/kDck+CiOKXX/
4QAJdW1d5U2SgA3PyaZrmFJB1+2740UZw85zMgkbg+wFYieR+cgAAAA==",
                                "cellCode": "11E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLOwqAMAxAr1Iyi1gncZP6WQVPUGqQgqYSU1DEu9uu7/OCCStCC1qPUECPl2N/
ig+U2HB7UZZWhQfyhuQehQmlrjtCJIG20bqsqwJMZM4+T9OcA3J+3y0/
xgpugbNZ0Ap8P6aj09lyAAAA",
```

```
                        }
                    ]
                },
                {
                    "rowNumber": 12,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxWLSwqAIBBAryKzjkhX0S4s2gadQGwIocaYRiiiu6fb93nBxhWhA216qGDAy3M4JUT
KbLyDKEerwgN5Q/KPwoxy1x8xkUDXal2bpgKbmIsv0zSXgHzYd8ePdYJb5GIWdALfD+DLE/ZyAAAA",
                                "cellCode": "12A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 811.20,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 811.20,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxWLSwrDIBBAryKzDqVtSgruWluyDeQEooMIOpbJBCKld69u3+cLpngEDZfrEwZ44eY
4fiQWaux9RFGWvMKMHJBcVdhQ6x657CSg77fxNJ0HMDtz932alx6QiylZrsYKhsLdrGgFfn8e4SRRcgA
AAA==",
```

```
                                "cellCode": "12B",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                ]
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs+Qvyk1LrsoTbGvSFrMao0je3e71+3lB+wWhhbzQkECPp2V3iPM
U2HA7UYYWhTvyimQfhQGFrtv9RQJtU5VpnSWgL+bo4zROMSDrts3wo43g6jmaGY3A9wPVNP9ZcgAAAA=
=",
                                "cellCode": "12C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs+Qvyk1LrsoTbGvSFrMao0je3e71+3lB+wWhhbzoIYEeT8vuEOc
psOF2ogwtCnfkFck+CgMKXbf7iwTapirTOktAX8zRx2mcYkDWbZvhRxvB1XM0MxqB7wekHfxjcgAAAA=
=",
```

```
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxWLzQpAQBCAX2Wbs+Qvyk1LrsoTbGvSFrMao0je3e71+3lB+wWhhbwYIIEeT8vuEOc
psOF2ogwtCnfkFck+CgMKXbf7iwTapirTOktAX8zRx2mcYkDWbZvhRxvB1XM0MxqB7wdvyCdrcgAAAA=
=",
```

```
                                "cellCode": "12E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 743.60,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": [
                                    {
                                        "padisCode": "E",
                                        "description": "Exit and emergency exit"
                                    }
                                ]
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxWLOwqAMAxAr1Iyi1gncZP6WQVPUGqQgqYSU1DEu9uu7/OCCStCC7oeoYAeL8f+FB8
oseH2oiytCg/kDck9ChNKXXeESAJto3VZVwWYyJx9nqY5B+T8vlt+jBXcAmezoBX4fpHiEMxyAAAA",
                                "cellCode": "12F",
```



```
                {
                    "rowNumber": 13,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0dlTSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgALrXW8XQAAAA==",
                                "cellCode": "13A",
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLOwqAMBAFwLu8Ogh+sEinUWwFTxDiIoG4kTUpRLy7Wg9zw8SVoFHWPRQGOp34I/
nI0JxDUOj2mDlBl21VVI2CySLE7vrOOM3f6dj5EKxcxibaovyykE14XvWOVHBdAAAA",
                                "cellCode": "13B",
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRWtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHRjoTDQ6SUcOSS
G4RKjQr+nwhlGd3VVtwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AbBvNbldAAAA",
                                "cellCode": "13C",
                                "cellAvailability": "Occupied",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
```

```
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRWtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQzQGGg00s4ckg
MwyVGhX5PhTOM7uqqbhVsESH213fGaf5Ozz7E6OSyLtOW5JeFXMbzAqjDg6pdAAAA",
                                "cellCode": "13D",
```

```
                                "cellAvailability": "Occupied",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRWtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQzQmGg00s4ckg
MwyVGhX5PhTOM7uqqbhVsESH213fGaf5Ozz7E6OSyLtOW5JeFXMbzAu0i4mNdAAAA",
                                "cellCode": "13E",
```



```
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0dlPSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgATAcOvXQAAAA==",
                                "cellCode": "13F",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFELgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1noDDQ6SUcOSS
G5hKjgtlT4Qzd9nXV1Qq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G88YMKr10AAAA=",
                                "cellCode": "14A",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHTTQ2Gg00s4ckg
MwyVGhW5PhTOMbuuqbhRsESH213fGaf5Oxz7E6OSyLtOW5JeFXMbzAg+gK2NdAAAA",
                                "cellCode": "14B",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
```

```
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQSJtHAXFm2DTiA2hGBjTLqI6O7V+vFuuLwSLFrjoDDQGSQeJWa
G5ZqSQr/nygW27XSjjYKrIsTh+s44zd/pOcSUvFzOF9qy/LKQL3heSkFKql0AAAA=",
                                "cellCode": "14C",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXGm2DTiA2hGBjTLqI6O7V+vFu2LwSDNrOQcHRGSQeJWa
G4ZqSwrDnygWm7XWjOwVbRYjD9Z1xmr8zcIgpebmsL7Rl+WUhX/C8Uu38uV0AAAA=",
                                "cellCode": "14D",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXJm2DTiA2hGBjTLqI6O7V+vFu2LwSDNrOQWGkM0g8Ssw
MwzUlhWHPlQtM2+tGdwq2ihCH6ztumr8zcIgpebmsL7Rl+WUhX/C8FwydcF0AAAA=",
                                "cellCode": "14E",
```



```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mKIHAX9rMNOoHYEIKNMekiortX68e7YeJK0KiaEQo9nU78kXx
kaM4hKHR7zJyg67YsmlLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L+kvvLxdAAAA",
```





```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0dVTSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAPV3WpXQAAAA==",
                                "cellCode": "15A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRFtXBXFm2DTiA2hGBjTLqI6O7V+vFumLgSNMqmh8JApxN/
JB8ZmnMICt0eMyfosq2KqlYwWYTYXd8Zp/k7HTsfgpXL2ERblF8WsgnPC/F0VGVdAAAA",
                                "cellCode": "15B",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHRroTDQ6SUcOSS
G4RKjQr+nwhlGd3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AbSVNaxdAAAA",
                                "cellCode": "15C",
```

```
                                "cellAvailability": "Occupied",
```



```
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ7QGGg00s4ckg
MwyVGhX5PhTOM7uqqbhRsESH213fGaf5Ozz7E6OSyLtOW5JeFXMbzAqw5g79dAAAA",
                                "cellCode": "15D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ7QmGg00s4ckg
MwyVGhX5PhTOM7uqqbhRsESH213fGaf5Ozz7E6OSyLtOW5JeFXMbzAunY4nZdAAAA",
                                "cellCode": "15E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0dVPSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAX+8O6XQAAAA==",
                                "cellCode": "15F",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
```

```
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 16,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0c1TSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgANKvWjXQAAAA==",
                                "cellCode": "16A",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHTbQ2Gg00s4ckg
MwyVGhW5PhTOMbuuqbhRsESH213fGaf5Oxz7E6OSyLtOW5JeFXMbzAvMJ1G9dAAAA",
                                "cellCode": "16B",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAnFm2DTiA2hGBjTLqI6O7V+vFuuLwSDNreQWGgM0g8Ssw
MwzUlBbvnygWm7XWjOwVXRYjD9Z1xmr9jOcSUvFzOF9qy/LKQL3hetui1pl0AAAA=",
                                "cellCode": "16C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXJm2DTiA2hGBjTLqI6O7V+vFu2LwSDNreQWGkM0g8Ssw
MwzUlhWHPlQtM2+tGdwq2ihCH6ztumr8zcIgpebmsL7Rl+WUhX/C866VifF0AAAA=",
                                "cellCode": "16E",
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjI0c1PSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAVhkOwXQAAAA==",
                                "cellCode": "16F",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFELgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1voDDQ6SUcOSS
G5hKjgtlT4Qzd9nXV1Qq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G88/6KpV0AAAA=",
                                "cellCode": "17A",
```



```
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRFFLgri7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGmXbQ2Gg04k/
ko8MzTkEhW6PmRN02VRFVSuYLELsru+M0/ydjp0PwcplbKItyi8L2YTnBQ3dq2ldAAAA",
                                "cellCode": "17B",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGFLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AVCQfLNdAAAA",
```

```
                                "cellCode": "17D",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGFLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboTDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5ARVxHXpdAAAA",
                                "cellCode": "17E",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mKIHAX9rMNOoHYEIKNMekiortX68e7YeJK0KjaEQo9nU78kXx
kaM4hKHR7zJyg67YsmlLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L+tSPLZdAAAA",
                                "cellCode": "17F",
```



```
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 18,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjK0cFTSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgD5dwuFXQAAAA==",
                                "cellCode": "18A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRFRLgri7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGmXbQ2Gg04k/
ko8MzTkEhW6PmRN02VRFVSuYLELsru+M0/ydjp0PwcplbKItyi8L2YTnBQdUKkldAAAA",
                                "cellCode": "18B",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrqzUBjo9BKOHBL
DcIlRod9T4Qyj27qqGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8QrVLgF0AAAA=",
                                "cellCode": "18C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AVoZ/ZNdAAAA",
                                "cellCode": "18D",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboTDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AR/4nFpdAAAA",
                                "cellCode": "18E",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjK0cFPSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgDh272WXQAAAA==",
                                "cellCode": "18F",
```



```
"H4sIAAAAAAAAA6tWcs5PSVWyUjK0dFTSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAHo3SDXQAAAA==",
                                "cellCode": "19A",
```



```
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRFBLkri7ZBJxAbQrAxJl1EdPdq/Xg3TFwJGmXbQ2Gg04k/
ko8MzTkEhW6PmRN02VRFVSuYLELsru+M0/ydjp0PwcplbKItyi8L2YTnBfmAVU9dAAAA",
                                "cellCode": "19B",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrqzUBjo9BKOHBL
DcIlRod9T4Qyj27qqGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8vGE0hl0AAAA=",
                                "cellCode": "19C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AaTNgpVdAAAA",
                                "cellCode": "19D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
```

```
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRGBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboTDQ6SUcOSS
G4RKjQr+nwhlGt3VVNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AeEs41xdAAAA",
                                "cellCode": "19E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjK0dFPSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjIyN9AzMdB
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgAfD8KQXQAAAA==",
                                "cellCode": "19F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tYREELgTi7ZBJxAbQrAxJl1EdPdq/Xg3XF4JBq22UBjoDBKPEjP
DcE1Jwe65coFpe910WsFVEeJwfWec5u9YDjElL5fzhbYsvyzkC54XWDHxWF0AAAA=",
                                "cellCode": "20A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIycFLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgCmEtCUXQAAAA==",
                                "cellCode": "20B",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURJtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHRtoTDQ6SUcOSS
G4RKjQr+nwhmm6XSlWwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G84/OxXV0AAAA=",
                                "cellCode": "20C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
```

```
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURJtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ9QGGg00s4ckg
MwyVGhX5PhTNM0+lKtwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AftfB05dAAAA",
                                "cellCode": "20D",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURJtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ9QmGg00s4ckg
MwyVGhX5PhTNM0+lKtwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5Ab6+ZoddAAAA",
                                "cellCode": "20E",
```



```
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awmJIHAX9rMNOoHYEIKNMekiortX68e7YdNKMKj1CIWeTi/
hyCExDJcYFbo9Fc4wdaurRivYIkLsr+8M0/ydjn2I0cllXaYtyS8LuYznBUCdR0tdAAAA",
                                "cellCode": "20F",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURFELgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGm1joDDQ6SUcOSS
G5hKjgtlT4Qzd9nXV1Qq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8puWOXl0AAAA=",
                                "cellCode": "21A",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHTdQ2Gg00s4ckg
MwyVGhW5PhTNM3epKNwq2iBD76zvjNH+nYx9idHJZl2lL8stCLuN5AVjGr5JdAAAA",
                                "cellCode": "21B",
```



```
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHRroTDS5SWcOSS
G4RKjwnCkwhmm7XWjOwVbRIj9Xc80L/UM7EOMTm7rMu1JflnJZbwfHSfOW10AAAA=",
                                "cellCode": "21C",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ7QmGky0s4c0g
MwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g/BYt4SF0AAAA=",
                                "cellCode": "21D",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ7QWGky0s4c0g
MwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g/QGoZgV0AAAA=",
                                "cellCode": "21E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mKIHAX9rMNOoHYEIKNMekiortX68e7YeJK0KirEQo9nU78kXx
kaM4hKHR7zJyg67YsmlLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L75JOE1dAAAA",
                                "cellCode": "21F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURIELgTi7ZBJxAbQrAxJl1EdPdq/Xg3XF4JBlpbKAx0BolHiZl
huKakYPdcucDovm26VsFVEeJwfWec5u9YDjElL5fzhbYsvyzkC54XpJgOVF0AAAA=",
                                "cellCode": "22A",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
```

```
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
```

```
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDLTuoTDQ6SUcOSS
G4RKjQrenwhmmbnWlGwVbRIj99Z1xmr/TsQ8xOrmsy7Ql+WUhl/G8WrsvmF0AAAA=",
                                "cellCode": "22B",
```

```
                                "cellAvailability": "Occupied",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDLS2UBjp8hLOHBL
DcIlRYThS4QzT9rrRnYItIsT+rmeal3oG9iFGJ7d1mfYkv6zkMt4PH1pOUV0AAAA=",
                                "cellCode": "22C",
```



```
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDLQeoTDS5SWcOSS
G4RKjwnCkwhmm7XWjOwVbRIj9Xc80L/UM7EOMTm7rMu1JflnJZbwfB/b4Ql0AAAA=",
```

```
                                "cellCode": "22D",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDLSeoDDS5SWcOSS
G4RKjwnCkwhmm7XWjOwVbRIj9Xc80L/UM7EOMTm7rMu1JflnJZbwfQheZi10AAAA=",
                                "cellCode": "22E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mQIHAX9rMNOoHYEIKNMekiortX68e7YdNKMNB6hEJPp5dw5JA
YhkuMCt2eCmcY3dZVUyvYIkLsr+8M0/ydjn2I0cllXaYtyS8LuYznBbw0uEddAAAA",
                                "cellCode": "22F",
```



```
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 23,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tURUELgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1roDDQ6SUcOSS
G5hKjgtlT4Qzd9HXV1Qq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8WkxxUl0AAAA=",
                                "cellCode": "23A",
```



```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIydlLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgCkb1CeXQAAAA==",
                                "cellCode": "23B",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRZtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHRjoTDQ6SUcOSS
G4RKjQr+nwhmm7nSlWwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G84Y4xV10AAAA=",
                                "cellCode": "23C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRZtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQzQGGg00s4ckg
MwyVGhX5PhTNM3elKtwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5Afkih0RdAAAA",
                                "cellCode": "23D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRZtHAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQzQmGg00s4ckg
MwyVGhX5PhTNM3elKtwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5AbzD5o1dAAAA",
                                "cellCode": "23E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
```

```
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4moIHAX9rMNOoHYEIKNMekiortX68e7YeJK0KjqEQo9nU78kXx
kaM4hKHR7zJygq7YsmlLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L0Lgx0FdAAAA",
                                "cellCode": "23F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREELgTi7ZBJxAbQrAxJl1EdPds/XgPbNoIGl1voDDS5SWcOSS
G5hKjgjlS4QzdDW3Ttwq2iBD7u55pXuox7EOMTm7rMu1JflnJZbwfoGIOQV0AAAA=",
                                "cellCode": "24A",
```



```
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHTTQ2Gg00s4ckg
MwyVGhW5PhTNM3epKNwq2iBD76zvjNH+nYx9idHJZl2lL8stCLuN5AV5BL41dAAAA",
                                "cellCode": "24B",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHRnoTDS5SWcOSS
G4RKjwnCkwhmm7XWjOwVbRIj9Xc80L/UM7EOMTm7rMu1JflnJZbwfG6BORF0AAAA=",
                                "cellCode": "24C",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ3QmGky0s4c0g
MwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g/Awz4V10AAAA=",
                                "cellCode": "24D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
```

```
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ3QWGky0s4c0g
MwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g/Ru2Znl0AAAA=",
                                "cellCode": "24E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awmJIHAX9rMNOoHYEIKNMekiortX68e7YdNKMKibEQo9nV7CkUN
iGC4xKnR7Kpxh6lZXjVawRYTYX98Zpvk7HfsQo5PLukxbkl8WchnPC7jOuFJdAAAA",
                                "cellCode": "24F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 25,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREEbgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1noDDQ6SUcOSS
G5hKjgtlT4Qzd9HXV1gq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8XrZxR10AAAA=",
                                "cellCode": "25A",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIydVLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgCglVCLXQAAAA==",
                                "cellCode": "25B",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHRroTDQ6SUcOSS
G4RKjQr+nwhmm7nSlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G85XQxQl0AAAA=",
                                "cellCode": "25C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
```

```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ7QGGg00s4ckg
MwyVGhX5PhTNM3elKNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5Af3Yh1FdAAAA",
                                "cellCode": "25D",
```

```
                                "cellAvailability": "AvailablePaid",
```

```
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtXAXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHQ7QmGg00s4ckg
MwyVGhX5PhTNM3elKNwq2iBD76zvjNH+nZx9idHJZl2lL8stCLuN5Abg55phdAAAA",
                                "cellCode": "25E",
```



```
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mIInAX9rMNOoHYEIKNMekiortX68e7YeJK0KiaEQo9nU78kXx
kaM4hKHR7zJygq7Ys6lLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L0Yax1RdAAAA",
                                "cellCode": "25F",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 26,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREFLgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1noDDQ6SUcOSS
G5hKjgtlT4Qzd9HXV1gq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8XMvxTV0AAAA=",
                                "cellCode": "26A",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHBXFm2DTiA2hGBjTLqI6O7V+vFu2LQSDHTbQ2Gg00s4ckg
```

```
MwyVGhW5PhTNM3epKNwq2iBD76zvjNH+nYx9idHJZl2lL8stCLuN5AaLo0IFdAAAA",
                                "cellCode": "26B",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHRvoTDS5SWcOSS
G4RKjwnCkwhmm7XWjOwVbRIj9Xc80L/UM7EOMTm7rMu1JflnJZbwf5wmxSF0AAAA=",
                                "cellCode": "26C",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ/
QmGky0s4c0gMwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g//6UHW10AAAA=",
                                "cellCode": "26D",
```



```
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJtHAXFm2DTiA2hGBjTLqI6O7Z+vEe2LQRDHQ/
QWGky0s4c0gMwyVGheFIhTNM2+tGdwq2iBD7u55pXuoZ2IcYndzWZdqT/LKSy3g/ukRmkl0AAAA=",
                                "cellCode": "26E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mIKHAX9rMNOoHYEIKNMekiortX68e7YeJK0KiaEQo9nU78kXx
kaM4hKHR7zJygq7Ys6lLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L0RnR15dAAAA",
                                "cellCode": "26F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREELgTi7ZBJxAbQrAxJl1EdPds/XgPbNoIGt1goDDS5SWcOSS
G5hKjgjlS4QzdDW3Ttwq2iBD7u55pXuox7EOMTm7rMu1JflnJZbwfoh+OS10AAAA=",
                                "cellCode": "27A",
```



```
"H4sIAAAAAAAAA6tWcs5PSVWyUjIyd1LSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgBcPK+HXQAAAA==",
                                "cellCode": "27B",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJFLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrqzUBjo9BKOHBL
DcIlRod9T4QxTt7rSjYItIsT++s44zd/p2YcYnVzWZdqS/LKQy3heGd3OTl0AAAA=",
                                "cellCode": "27C",
```



```
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJFLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhmmbnWlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8AXF4XV0AAAA=",
                                "cellCode": "27D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
```

```
                        },
                        {
```



```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8awmJIHAX9rMNOoHYEIKNMekiortX68e7YdNKMKjbEQo9nV7CkUN
iGC4xKnR7Kpxh6lZXjVawRYTYX98Zpvk7HfsQo5PLukxbkl8WchnPC7qzOFhdAAAA",
```

```
                                "cellCode": "27F",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                },
                {
                    "rowNumber": 28,
                    "cells": [
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREULgTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1voDDQ6SUcOSS
G5hKjgtlT4QzddHXV1gq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8qJYPa10AAAA=",
                                "cellCode": "28A",
```



```
"H4sIAAAAAAAAA6tWcs5PSVWyUjKycFLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgBWtS6nXQAAAA==",
                                "cellCode": "28B",
```



```
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrqzUBjo9BKOHBL
DcIlRod9T4QxTt7rSjYItIsT++s44zd/p2YcYnVzWZdqS/LKQy3heE1RPbl0AAAA=",
                                "cellCode": "28C",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhmmbnWlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8C/j5fV0AAAA=",
                                "cellCode": "28D",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJRLgLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboTDQ6SUcOSS
G4RKjQr+nwhmmbnWlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8ThmYtF0AAAA=",
                                "cellCode": "28E",
```

```
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mIoHAX9rMNOoHYEIKNMekiortX68e7YeJK0KjaEQo9nU78kXx
kaM4hKHR7zJygq6Ys6lLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L7A6uXhdAAAA",
                                "cellCode": "28F",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tUREELkTi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJGk1voDDQ6SUcOSS
G5hKjgtlT4QzddHXV1gq2iBD76zvjNH/HsA8xOrmsy7Ql+WUhl/G8VkJwbV0AAAA=",
                                "cellCode": "29A",
```



```
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
```

```
"H4sIAAAAAAAAA6tWcs5PSVWyUjKydFLSUXJJLU4uyiwoyczPU7LKK83J0VFyzM0vzStRsjI0M9IzMtF
Rci4tKkrNS64E6nF1DwDqccxLzszJSSyqdE4sSU3PLwLJBKcmlijVAgCoYVGhXQAAAA==",
                                "cellCode": "29B",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBrqzUBjo9BKOHBL
DcIlRod9T4QxTt7rSjYItIsT++s44zd/p2YcYnVzWZdqS/LKQy3he7YAwaF0AAAA=",
                                "cellCode": "29C",
```

```
                                "cellAvailability": "AvailablePaid",
```



```
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboDDQ6SUcOSS
G4RKjQr+nwhmmbnWlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G89SyGe10AAAA=",
                                "cellCode": "29D",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLQQqAIBAF0Lv8tQRJBLkLi7ZBJxAbQrAxJl1EdPdq/Xg3bFoJBroboTDQ6SUcOSS
G4RKjQr+nwhmmbnWlGwVbRIj99Z1xmr/Tsw8xOrmsy7Ql+WUhl/G8sM3nsl0AAAA=",
                                "cellCode": "29E",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 162.24,
                                        "currency": "EGP"
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        },
                        {
```

```
                            "cellCategory": "Seat",
                            "cellDetails": {
                                "cellID":
"H4sIAAAAAAAAAxXLTQqAIBAG0Lt8a4mIIHIX9rMNOoHYEIKNMekiortX68e7YeJK0KjaEQo9nU78kXx
kaM4hKHR7zJygq6Ys6lLBZBFid31nmObvdOx8CFYuYxNtUX5ZyCY8L07uxn5dAAAA",
                                "cellCode": "29F",
                                "cellAvailability": "AvailablePaid",
                                "seatPriceDetails": {
                                    "totalPrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
                                    },
                                    "basePrice": {
                                        "amount": 270.40,
                                        "currency": "EGP"
```

```
                                    },
                                    "taxesPrice": {
                                        "amount": 0,
                                        "currency": "EGP"
                                    }
                                },
                                "cellCharacteristics": []
                            }
                        }
                    ]
                }
            ]
        }
    }
}
Book || Hold Request:
{
    "fareConfirmResponseId": "{{fareConfirmResponseId}}",
    "SelectedOfferId": "{{fareCheckOfferId}}",
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "selectedBundles": [],
      "PassengersSelectedAncillaries": {
        "A1": {
            "SetSegmentsAncaillaries": {
                "G9$BAH/SHJ$3241740$20260520175000$20260520200000": [
                    {
                        "AdditionalServiceCategory": "Baggage",
                        "AncillaryCode":
"H4sIAAAAAAAAA6tWcs5PSVWyUvLLV3BKTFfSUXJJLU4uyiwoyczPQxZ2zM0vzStRsjLQMzDQUXIuLSp
KzUuuBKpwdQ8ASeclZ+bkJBZVOieWpKbnF4FkgBrTE9NTlWoBQdm9aGUAAAA=",
                        "Quantity": "1"
                    }
                ]
            }
            // "SetJourneysAncaillaries": {
            //     "QRs1&QRs2": [
            //         {
            //             "AdditionalServiceCategory": "Other",
            //             "AncillaryCode": "CT1&QRa2&QRpa1",
            //             "Quantity": "1"
            //         },
            //         {
            //             "AdditionalServiceCategory": "Baggage",
            //             "AncillaryCode": "CT1&QRa3&QRpa2",
            //             "Quantity": "1"
            //         }
            //     ]
            // }
        },
        "C2": {
             "SetSegmentsAncaillaries": {
                "G9$BAH/SHJ$3219682$20260409202000$20260409223000": [
                    {
                        "AdditionalServiceCategory": "Baggage",
                        "AncillaryCode":
"H4sIAAAAAAAAA6tWcs5PSVWyUjIyUPBOVzBUCMhMTU5V0lFySS1OLsosKMnMz8Mi65ibX5pXomRlYmy
kZ2aio+RcWlSUmpdcCVTq6h4AUpCXnJmTk1hU6ZxYkpqeXwSScUpMT09MT1WqBQBe3BASdQAAAA==",
                        "Quantity": "1"
                    }
                ]
            }
            // "SetJourneysAncaillaries": {
            //     "QRs1&QRs2": [
```

```
            //         {
            //             "AdditionalServiceCategory": "Other",
            //             "AncillaryCode": "CT1&QRa2&QRpa1",
            //             "Quantity": "1"
            //         },
            //         {
            //             "AdditionalServiceCategory": "Baggage",
            //             "AncillaryCode": "CT1&QRa3&QRpa2",
            //             "Quantity": "1"
            //         }
            //     ]
            // }
        }
    }
}
Book || Hold Responce:
{
    "supplier": "AirArabia",
    "pnr": "674DW9",
    "gdsPNR": "",
    "bookingToken":
"H4sIAAAAAAAAA62TXVPiMBSG/8qZjBc6UzEtlGrv+BBRV2UEd2d24SK0x5IxTdi0BR2H/
76nFEVn4WJn7UW/
3jcnb56TvLIrFv56ZXdWJlJ3MculFrk0+m5e3jMSSe3iXNi8sNgVOY5kiixkHveax9w/
9vjIDUKfh5z/ZA5rWSsXQu02eqVrY7wf9Em8ODtot/onw/
7VQd1ruEGDH5R+7nvcDXzOt58eLy8a2FMymeW3RTpFu67g8gb9fs/
YknZubP7NROuFdExcpqBZdphGaFNasCLDjZB6tF3A7iqU8y/
LhxqkWaTyuqdEwsJHoTJ02PnvQs5T1HnlqPJXcAK+mkxWE4eNSLvT+EO8lI51S4aYlIOu8eV/
OG3ncVh7XXdaaBVjPES7kBFexixsNn33zCmFWL0Lt2LdvYHFVBYp1ZujHYjndmXqIYlu3fdqnNNIY56k
TjpKZBmWe4adew1GM2bVGtofdBbqQimHxZhFVq53WcVF6kgVb8Fw41s5ewIHwZ7A34UqcGdcIhPUAu8r
4l4oMxUKOmYh42P3rHxBO9ZtkSQiQQjB4yd1DtfJWN8gGUMYCh0vZTQDesKSTgfZhyhykqxZwikYvRQ2
zmiAieWjrLYdqbQrIP3wy4FiDrmB09lYd4SOUKk368NG+GeYzX3df1C5TCnsbp6B79bqX8KzT1SmIgkh
IGYwLjj32jBAmxk6WHCZYwqHN+IZ6tfJ0Vg3SrLQmWH0hDFsoFc4Q7gnmvUtzWFOpekVyj6MtQc9iwif
GB++cTv6THQLtAYdi7HMYWGKaIYWqG+t8y51me9lPVn9ATXOXsBcBQAA",
    "voidCapability": "VoidNotAllowed",
    "tickets": {
        "I3/A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725701",
            "carrierCode": "G9"
        },
        "A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725699",
            "carrierCode": "G9"
        },
        "C2": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725700",
            "carrierCode": "G9"
        }
    },
    "passengersSelectedAncillaries": {
        "A1": {
            "segmentsSelectedAncillaries": {},
            "journyesSelectedAncillaries": {}
        },
        "C2": {
            "segmentsSelectedAncillaries": {},
            "journyesSelectedAncillaries": {}
        }
    },
    "journeys": {
        "G9$BAH/SHJ$144032884$20260520175000$20260520200000": {
```

```
            "origin": "BAH",
            "destination": "SHJ",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$BAH/SHJ$144032884$20260520175000$20260520200000"
            ]
        }
    },
    "flightSegments": {
        "G9$BAH/SHJ$144032884$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": null
        }
    },
    "priceClasses": {
        "66519_E24_Premium": {
            "priceClassName": "Premium",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "66577_E24_Value": {
            "priceClassName": "Value",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Global Covid-19 Cover",
                "Baggage : 20/30 Kg",
                "Meal : Sandwich and water",
                "Seat : row 8 onwards",
                "Modification : One modification, up to 8h",
                "Cancellation : Up to 8h"
            ]
        },
        "66569_E24_Ultimate": {
            "priceClassName": "Ultimate",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Handbag: 7 Kg + Personal Item (Max 3Kg)",
                "40 Kg Checked Baggage",
                "Seat: Row 3 onwards",
                "Standard Meal",
                "2 Free Modification (Up to 8h)",
                "Cancellation: Up to 8h. Credit voucher at AED 200"
            ]
        }
    },
    "baggageDetails": {
        "66519_E24_Premium": {
            "carryOnBaggage": "Unknown",
            "checkInBaggage": "Unknown"
        },
        "66577_E24_Value": {
            "carryOnBaggage": "Unknown",
            "checkInBaggage": "Unknown"
        },
```

```
        "66569_E24_Ultimate": {
            "carryOnBaggage": "Handbag: 7 Kg + Personal Item (Max 3Kg)",
            "checkInBaggage": "40 Kg Checked Baggage"
        }
    },
    "passengersList": {
        "A1": {
            "title": "MR",
            "name": {
                "first": "Mostafa",
                "middle": null,
                "last": "Ibrahim"
            },
            "birthDate": "2000-02-15T00:00:00Z",
            "gender": "Male",
            "passengerTypeCode": "ADT",
            "contactRefId": "97-15-09700784",
            "travelDocument": {
                "name": {
                    "first": "Mostafa",
                    "middle": null,
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-10-01T00:00:00Z",
                "issuanceDate": "2023-10-01T00:00:00Z",
                "documentNumber": "A1234561",
                "documentType": "Passport",
                "gender": "Male",
                "birthCountry": "EG",
                "birthDate": "2000-02-15T00:00:00Z",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": null,
            "nationality": "EG",
            "residentCountry": "EG",
            "age": 26
        },
        "C2": {
            "title": "MISS",
            "name": {
                "first": "Laila",
                "middle": "Omar",
                "last": "Ibrahim"
            },
            "birthDate": "2016-03-10T00:00:00Z",
            "gender": "Female",
            "passengerTypeCode": "CHD",
            "contactRefId": "97-15-09700784",
            "travelDocument": {
                "name": {
                    "first": "Laila",
                    "middle": "Omar",
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-22T00:00:00Z",
                "issuanceDate": "2021-03-10T00:00:00Z",
                "documentNumber": "F2233445",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "2016-03-10T00:00:00Z",
                "issuanceCountryCode": "EG"
```

```
            },
            "parentPaxRefId": null,
            "nationality": "EG",
            "residentCountry": "EG",
            "age": 10
        },
        "I3/A1": {
            "title": "MS",
            "name": {
                "first": "Lina",
                "middle": null,
                "last": "Ibrahim"
            },
            "birthDate": "2025-01-05T00:00:00Z",
            "gender": "Female",
            "passengerTypeCode": "INF",
            "contactRefId": "97-15-09700784",
            "travelDocument": {
                "name": {
                    "first": "Lina",
                    "middle": null,
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-04T00:00:00Z",
                "issuanceDate": "2025-01-10T00:00:00Z",
                "documentNumber": "INF1234501",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "2025-01-05T00:00:00Z",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": "A1",
            "nationality": "EG",
            "residentCountry": "EG",
            "age": 1
        }
    },
    "contacts": {
        "97-15-09700784": {
            "email": "moontravel626@gmail.com",
            "phone": {
                "type": "Personal",
                "countryDialingCode": "+971",
                "phoneNumber": "509700784"
            },
            "address": {
                "line1": null,
                "line2": null,
                "city": "DUBAI",
                "countryCode": "AE"
            }
        }
    },
    "selectedOffer": {
        "offerId": "69372cc2-6220-42dd-923d-e0100a6e18be",
        "offerJourneys": [
            "G9$BAH/SHJ$144032884$20260520175000$20260520200000"
        ],
        "passengerFareBreakdown": [
            {
                "passengerRefId": "A1",
                "paxTotalAmount": {
```

```
                    "amount": 15840.18,
                    "currency": "EGP"
                },
                "paxTotalAncillaryAmount": {
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerRefId": "C2",
                "paxTotalAmount": {
                    "amount": 15840.18,
                    "currency": "EGP"
```

```
                },
                "paxTotalAncillaryAmount": {
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerRefId": "I3/A1",
                "paxTotalAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
                "paxTotalAncillaryAmount": {
```

```
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 0.00,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 0.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 0.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 0.00,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            }
        ],
        "priceDetails": {
            "totalAncillariesAmount": {
                "amount": 0,
                "currency": "EGP"
            },
            "totalPassengersAncillaries": [],
            "totalAmount": {
                "amount": 33302.74,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 16829.98,
                "currency": "EGP"
            },
            "totalBaseAmount": {
```

```
                "amount": 16472.77,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
                    "code": "BH",
                    "amount": {
                        "amount": 2704.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "HM",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "API1",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "E5POSCROS1",
                    "amount": {
                        "amount": 13855.58,
                        "currency": "EGP"
                    }
                }
            ],
            "discount": null
        },
        "refundability": "UnKnown",
        "isDealCodeApplied": false,
        "appliedDealCode": null,
        "isPromoted": false,
        "appliedPromotionCode": null
    },
    "isBspCommissionApplied": false
}
Retrive Request:
{
    "supplier" : "{{Supplier_Name}}",
    "CredentialsSelector" : "{{Credentials_Selector}}",
    "pnr": "{{pnr}}"
    // "gdsPNR": "",
    // "bookingToken":"{{bookingToken}}",
    // "SurName":"x"
}
Retrive Responce:
{
    "fareType": "None",
    "bookedCredentialsSelector": "EGY",
    "holdExpirationDate": null,
    "bookingStatus": "Booked",
    "supplier": "AirArabia",
    "pnr": "674DW9",
    "gdsPNR": "",
    "bookingToken":
"H4sIAAAAAAAAA62TXVPiMBSG/8qZjBc6UzEtlGrv+BBRV2UEd2d24SK0x5IxTdi0BR2H/
76nFEVn4WJn7UW/
```

```
3jcnb56TvLIrFv56ZXdWJlJ3MculFrk0+m5e3jMSSe3iXNi8sNgVOY5kiixkHveax9w/
9vjIDUKfh5z/ZA5rWSsXQu02eqVrY7wf9Em8ODtot/onw/
7VQd1ruEGDH5R+7nvcDXzOt58eLy8a2FMymeW3RTpFu67g8gb9fs/
YknZubP7NROuFdExcpqBZdphGaFNasCLDjZB6tF3A7iqU8y/
LhxqkWaTyuqdEwsJHoTJ02PnvQs5T1HnlqPJXcAK+mkxWE4eNSLvT+EO8lI51S4aYlIOu8eV/
OG3ncVh7XXdaaBVjPES7kBFexixsNn33zCmFWL0Lt2LdvYHFVBYp1ZujHYjndmXqIYlu3fdqnNNIY56k
TjpKZBmWe4adew1GM2bVGtofdBbqQimHxZhFVq53WcVF6kgVb8Fw41s5ewIHwZ7A34UqcGdcIhPUAu8r
4l4oMxUKOmYh42P3rHxBO9ZtkSQiQQjB4yd1DtfJWN8gGUMYCh0vZTQDesKSTgfZhyhykqxZwikYvRQ2
zmiAieWjrLYdqbQrIP3wy4FiDrmB09lYd4SOUKk368NG+GeYzX3df1C5TCnsbp6B79bqX8KzT1SmIgkh
IGYwLjj32jBAmxk6WHCZYwqHN+IZ6tfJ0Vg3SrLQmWH0hDFsoFc4Q7gnmvUtzWFOpekVyj6MtQc9iwif
GB++cTv6THQLtAYdi7HMYWGKaIYWqG+t8y51me9lPVn9ATXOXsBcBQAA",
    "voidCapability": "VoidNotAllowed",
    "tickets": {
        "I3/A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725701",
            "carrierCode": "G9"
        },
        "A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725699",
            "carrierCode": "G9"
        },
        "C2": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725700",
            "carrierCode": "G9"
        }
    },
    "passengersSelectedAncillaries": {},
    "journeys": {
        "G9$BAH/SHJ$144032884$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$BAH/SHJ$144032884$20260520175000$20260520200000"
            ]
        }
    },
    "flightSegments": {
        "G9$BAH/SHJ$144032884$20260520175000$20260520200000": {
            "origin": "BAH",
            "destination": "SHJ",
            "departureDateTime": "2026-05-20T17:50:00",
            "arrivalDateTime": "2026-05-20T20:00:00",
            "departureTerminal": "MainT",
            "arrivalTerminal": null,
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9104",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9104",
            "equipment": null
        }
    },
    "priceClasses": {
        "66519_E24_Premium": {
            "priceClassName": "Premium",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "66577_E24_Value": {
            "priceClassName": "Value",
```

```
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Global Covid-19 Cover",
                "Baggage : 20/30 Kg",
                "Meal : Sandwich and water",
                "Seat : row 8 onwards",
                "Modification : One modification, up to 8h",
                "Cancellation : Up to 8h"
            ]
        },
        "66569_E24_Ultimate": {
            "priceClassName": "Ultimate",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Handbag: 7 Kg + Personal Item (Max 3Kg)",
                "40 Kg Checked Baggage",
                "Seat: Row 3 onwards",
                "Standard Meal",
                "2 Free Modification (Up to 8h)",
                "Cancellation: Up to 8h. Credit voucher at AED 200"
            ]
        }
    },
    "baggageDetails": {
        "66519_E24_Premium": {
            "carryOnBaggage": "Unknown",
            "checkInBaggage": "Unknown"
        },
        "66577_E24_Value": {
            "carryOnBaggage": "Unknown",
            "checkInBaggage": "Unknown"
        },
        "66569_E24_Ultimate": {
            "carryOnBaggage": "Handbag: 7 Kg + Personal Item (Max 3Kg)",
            "checkInBaggage": "40 Kg Checked Baggage"
        }
    },
    "passengersList": {
        "I3/A1": {
            "title": "MS",
            "name": {
                "first": "Lina",
                "middle": null,
                "last": "Ibrahim"
            },
            "birthDate": "0001-01-01T00:00:00Z",
            "gender": "Female",
            "passengerTypeCode": "INF",
            "contactRefId": "971509700784",
            "travelDocument": {
                "name": {
                    "first": "Lina",
                    "middle": null,
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-04T00:00:00Z",
                "issuanceDate": "0001-01-01T00:00:00",
                "documentNumber": "INF1234501",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "0001-01-01T00:00:00",
                "issuanceCountryCode": "EG"
```

```
            },
            "parentPaxRefId": "A1",
            "nationality": "EG",
            "residentCountry": null,
            "age": null
        },
        "A1": {
            "title": "MR",
            "name": {
                "first": "Mostafa",
                "middle": null,
                "last": "Ibrahim"
            },
            "birthDate": "0001-01-01T00:00:00Z",
            "gender": "Male",
            "passengerTypeCode": "ADT",
            "contactRefId": "971509700784",
            "travelDocument": {
                "name": {
                    "first": "Mostafa",
                    "middle": null,
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-10-01T00:00:00Z",
                "issuanceDate": "0001-01-01T00:00:00",
                "documentNumber": "A1234561",
                "documentType": "Passport",
                "gender": "Male",
                "birthCountry": "EG",
                "birthDate": "0001-01-01T00:00:00",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": null,
            "nationality": "EG",
            "residentCountry": null,
            "age": null
        },
        "C2": {
            "title": "MISS",
            "name": {
                "first": "Laila",
                "middle": null,
                "last": "Ibrahim"
            },
            "birthDate": "0001-01-01T00:00:00Z",
            "gender": "Female",
            "passengerTypeCode": "CHD",
            "contactRefId": "971509700784",
            "travelDocument": {
                "name": {
                    "first": "Laila",
                    "middle": null,
                    "last": "Ibrahim"
                },
                "nationality": "EG",
                "expirationDate": "2029-01-22T00:00:00Z",
                "issuanceDate": "0001-01-01T00:00:00",
                "documentNumber": "F2233445",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "0001-01-01T00:00:00",
                "issuanceCountryCode": "EG"
```

```
            },
            "parentPaxRefId": null,
            "nationality": "EG",
            "residentCountry": null,
            "age": null
        }
    },
    "contacts": {
        "971509700784": {
            "email": "moontravel626@gmail.com",
            "phone": {
                "type": "Personal",
                "countryDialingCode": "+971",
                "phoneNumber": "509700784"
            },
            "address": {
                "line1": null,
                "line2": null,
                "city": "DUBAI",
                "countryCode": "AE"
            }
        }
    },
    "selectedOffer": {
        "offerId": "f7d511dd-b291-401b-82ef-d77e8fa58706",
        "offerJourneys": [
            "G9$BAH/SHJ$144032884$20260520175000$20260520200000"
        ],
        "passengerFareBreakdown": [
            {
                "passengerRefId": "A1",
                "paxTotalAmount": {
                    "amount": 15840.18,
                    "currency": "EGP"
                },
                "paxTotalAncillaryAmount": {
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerRefId": "C2",
                "paxTotalAmount": {
                    "amount": 15840.18,
                    "currency": "EGP"
                },
                "paxTotalAncillaryAmount": {
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 8414.99,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 7425.19,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API1",
```

```
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 6927.79,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerRefId": "I3/A1",
                "paxTotalAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
                "paxTotalAncillaryAmount": {
                    "amount": 0,
                    "currency": "EGP"
                },
                "passengerAncillaries": [],
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 0.00,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 1622.40,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "BH",
                        "amount": {
                            "amount": 0.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HM",
                        "amount": {
                            "amount": 0.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E5POSCROS1",
                        "amount": {
                            "amount": 0.00,
```

```
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$BAH/SHJ$144032884$20260520175000$20260520200000",
                        "priceClassRefId": "66519_E24_Premium",
                        "baggageDetailsRefId": "66519_E24_Premium",
                        "cabinCode": "Economy",
                        "rbd": "P"
                    }
                ],
                "discount": null
            }
        ],
        "priceDetails": {
            "totalAncillariesAmount": {
                "amount": 0,
                "currency": "EGP"
            },
            "totalPassengersAncillaries": [],
            "totalAmount": {
                "amount": 33302.74,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 16829.98,
                "currency": "EGP"
            },
            "totalBaseAmount": {
                "amount": 16472.77,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
                    "code": "BH",
                    "amount": {
                        "amount": 2704.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "HM",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "API1",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "E5POSCROS1",
                    "amount": {
                        "amount": 13855.58,
                        "currency": "EGP"
                    }
                }
```

```
            ],
            "discount": null
        },
```

```
        "refundability": "UnKnown",
```

```
        "isDealCodeApplied": false,
```

```
        "appliedDealCode": null,
```

```
        "isPromoted": false,
```

```
        "appliedPromotionCode": null
    },
```

- `"isBspCommissionApplied": false }` 

