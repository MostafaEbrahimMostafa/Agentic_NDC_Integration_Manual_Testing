```
Sample API Request & Response for v1
Search Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "isdebug": true,
    "searchCriteria": [
        {
            "origin": "SHJ",
            "destination": "BAH",
            "date": "2026-05-20"
        }
        // ,
        //  {
        //     "origin": "BAH",
        //     "destination": "SHJ",
        //     "date": "2026-05-20"
        // }
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
    "responseId": "fcd62f65-1a97-46df-bb02-311beb41db14",
    "supplier": "AirArabia",
    "journeys": {
        "G9$SHJ/BAH$3249681$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3249681$20260520140000$20260520140000"
            ]
        },
        "G9$SHJ/BAH$3223689$20260520050000$20260520051000": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3223689$20260520050000$20260520051000"
            ]
        },
        "G9$SHJ/BAH$3223979$20260520070000$20260520071000": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3223979$20260520070000$20260520071000"
            ]
        },
        "G9$SHJ/BAH$3237667$20260520035500$20260520041000": {
```

```
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3237667$20260520035500$20260520041000"
            ]
        },
        "G9$SHJ/BAH$3241664$20260520081000$20260520082500": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3241664$20260520081000$20260520082500"
            ]
        }
    },
    "flightSegments": {
        "G9$SHJ/BAH$3249681$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T14:00:00",
            "arrivalDateTime": "2026-05-20T14:00:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 60,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G95122",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G95122",
            "equipment": null
        },
        "G9$SHJ/BAH$3223689$20260520050000$20260520051000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T05:00:00",
            "arrivalDateTime": "2026-05-20T05:10:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G92220",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G92220",
            "equipment": null
        },
        "G9$SHJ/BAH$3223979$20260520070000$20260520071000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T07:00:00",
            "arrivalDateTime": "2026-05-20T07:10:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 70,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G92221",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G92221",
            "equipment": null
        },
        "G9$SHJ/BAH$3237667$20260520035500$20260520041000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T03:55:00",
            "arrivalDateTime": "2026-05-20T04:10:00",
```

```
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 75,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9107",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9107",
            "equipment": null
        },
        "G9$SHJ/BAH$3241664$20260520081000$20260520082500": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T08:10:00",
            "arrivalDateTime": "2026-05-20T08:25:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 75,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G9101",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G9101",
            "equipment": null
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "Basic",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Cancellation/modification charges will be calculated at the
time of cancellation, minimum 200 AED."
            ]
        }
    },
    "baggageDetails": {
        "1": {
            "carryOnBaggage": "10 Kg (7 Kg bag + 3 Kg personal item)",
            "checkInBaggage": "No Checked baggage"
        }
    },
    "offers": [
        {
            "offerId": "85abef19-27ed-451b-93b9-
57014a6113b8&x6pj0gAAALKSl5Gb1v9qDb5gBgD7FNkwRzkkU0hKL0JBSCQzMjQ5NjgxJDIwMjYwNTI
wMTQwMDAwDwDwF6ZHOTUxMjKjU0hKoKNCQUilTWFpblTCoDyTkqNBRFShMZKjQ0hEBwDwHUlORqExANk
hVElEJDE3Nzg1OTUxNzY2Nzc2OTcyMzkxLWFwcC0yMTc1kpGTTwAATgDwBNb/
agz5gJOSAQGSAgGSAwHAoVk=",
            "offerJourneys": [
                "G9$SHJ/BAH$3249681$20260520140000$20260520140000"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 2247.03,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 162.24,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
```

```
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 16.23,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 2247.03,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 162.24,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
```

```
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 16.23,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 408.31,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 27.04,
                        "currency": "EGP"
```

```
                    },
                    "taxesAndFees": [
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 2.71,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
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
                    "amount": 5253.89,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 4902.37,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 351.52,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 2028.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 35.17,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCHARGE/TPCHARGE",
                        "amount": {
                            "amount": 1216.80,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "06f5f2eb-d59b-4c05-b67b-
```

```
f277ad56e549&x7Bj0gAAALKQl5Gb1v9qDT/QBgD3FkIo2TBHOSRTSEovQkFIJDMyMjM2ODkkMjAyNjA
1MjAwNTAwMDAPAPAbMTAwMKZHOTIyMjCjU0hKoKNCQUilTWFpblTCoEaTkqNBRFShMZKjQ0hEBwDwHUl
ORqExANkhVElEJDE3Nzg1OTUxNzY2Nzc2OTcyMzkxLWFwcC0yMTc1kpGTTwAATgDwBNb/
agz5gJOSAQGSAgGSAwHAoVk=",
```

```
            "offerJourneys": [
```

```
                "G9$SHJ/BAH$3223689$20260520050000$20260520051000"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
```

```
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223689$20260520050000$20260520051000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223689$20260520050000$20260520051000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 567.84,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 162.24,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223689$20260520050000$20260520051000",
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
                    "amount": 10667.28,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 5394.48,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 5272.80,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 2028.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 527.28,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCHARGE/TPCHARGE",
                        "amount": {
                            "amount": 1216.80,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "6f73c0d2-e966-4c28-b706-
174befde86b8&x7Bj0gAAALKQl5Gb1v9qDVvwBgD3Fl5I2TBHOSRTSEovQkFIJDMyMjM5NzkkMjAyNjA
1MjAwNzAwMDAPAPAbMTAwMKZHOTIyMjGjU0hKoKNCQUilTWFpblTCoEaTkqNBRFShMZKjQ0hEBwDwHUl
ORqExANkhVElEJDE3Nzg1OTUxNzY2Nzc2OTcyMzkxLWFwcC0yMTc1kpGTTwAATgDwBNb/
agz5gJOSAQGSAgGSAwHAoVk=",
```

```
            "offerJourneys": [
                "G9$SHJ/BAH$3223979$20260520070000$20260520071000"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
```

```
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223979$20260520070000$20260520071000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223979$20260520070000$20260520071000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 567.84,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 162.24,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
```

```
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3223979$20260520070000$20260520071000",
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
                    "amount": 10667.28,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 5394.48,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 5272.80,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 2028.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 527.28,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "TPCHARGE/TPCHARGE",
                        "amount": {
                            "amount": 1216.80,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "aab2c764-3db9-4116-
928b-9adbd73dcc96&x7Bj0gAAALGQl5Gb1v9qDTCUBgD2FjQY2TBHOSRTSEovQkFIJDMyMzc2NjckMj
AyNjA1MjAwMzU1MDAPAPAbNDEwMDClRzkxMDejU0hKoKNCQUilTWFpblTCoEuTkqNBRFShMZKjQ0hEBw
DwBUlORqExANkhVElEJDE3Nzg1OTUxXwDwBTc2OTcyMzkxLWFwcC0yMTc1kpGTTwAATgDwBNb/
agz5gJOSAQGSAgGSAwHAoVk=",
```

```
            "offerJourneys": [
                "G9$SHJ/BAH$3237667$20260520035500$20260520041000"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 9520.39,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3617.96,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
```

```
                            "amount": {
                                "amount": 361.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
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
"G9$SHJ/BAH$3237667$20260520035500$20260520041000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 9520.39,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3617.96,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 361.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
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
"G9$SHJ/BAH$3237667$20260520035500$20260520041000",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 567.84,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 162.24,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3237667$20260520035500$20260520041000",
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
                    "amount": 28466.90,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 19608.58,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 8858.32,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 2028.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 885.84,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCHARGE/TPCHARGE",
                        "amount": {
                            "amount": 1216.80,
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
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "717715ca-fa01-4870-b383-
29ff1ea7878c&x69j0gAAALGQl5Gb1v9qDWxYBgD3Fm/
c2TBHOSRTSEovQkFIJDMyNDE2NjQkMjAyNjA1MjAwODEwMDAPAPAaMjUwMKVHOTEwMaNTSEqgo0JBSKV
NYWluVMKgS5OSo0FEVKExkqNDSEQHAPAdSU5GoTEA2SFUSUQkMTc3ODU5NTE3NjY3NzY5NzIzOTEtYXB
wLTIxNzWSkZNPAABOAPAE1v9qDPmAk5IBAZICAZIDAcChWQ==",
```

```
            "offerJourneys": [
                "G9$SHJ/BAH$3241664$20260520081000$20260520082500"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "ST",
```

```
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3241664$20260520081000$20260520082500",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 2413.32,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "F6SHJ",
                            "amount": {
                                "amount": 676.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "ST",
                            "amount": {
                                "amount": 1014.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "API",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 182.52,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TP",
                            "amount": {
                                "amount": 67.60,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3241664$20260520081000$20260520082500",
                            "priceClassRefId": "1",
                            "baggageDetailsRefId": "1",
                            "cabinCode": "ECONOMY",
                            "rbd": "P"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 567.84,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 1622.40,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "HLSHJ",
                            "amount": {
                                "amount": 162.24,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "TPCharge/TPCharge",
                            "amount": {
                                "amount": 405.60,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId":
"G9$SHJ/BAH$3241664$20260520081000$20260520082500",
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
                    "amount": 10667.28,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 5394.48,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 5272.80,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 1352.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 2028.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 527.28,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 135.20,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCHARGE/TPCHARGE",
                        "amount": {
                            "amount": 1216.80,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
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
LocationCode=\"SHJ\" />\n        <ns2:DestinationLocation
LocationCode=\"BAH\" />\n        <ns2:TravelPreferences>\n
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
```

```
xmlns:ns1=\"http://www.opentravel.org/OTA/2003/05\"><ns1:OTA_AirAvailRS
EchoToken=\"11868765275150-1300257933\" PrimaryLangID=\"en-us\"
RetransmissionIndicator=\"false\" SequenceNmbr=\"1\"
TransactionIdentifier=\"TID$17785951766776972391-app-2175\"
Version=\"2006.01\"><ns1:Success /><ns1:Warnings
/><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T14:00:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T14:00:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"BAH\"
MultiAirportCityInd=\"false\">Bahrain</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T14:00:00\" DepartureDateTime=\"2026-05-
20T14:00:00\" FlightNumber=\"G95122\" JourneyDuration=\"PT1H0M0.000S\"
RPH=\"G9$SHJ/BAH$3249681$20260520140000$20260520140000\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"SHJ\" Terminal=\"\" /><ns1:ArrivalAirport LocationCode=\"BAH\"
Terminal=\"MainT\"
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></ns1:OriginDestinationInformation><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T05:00:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T05:10:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"BAH\"
MultiAirportCityInd=\"false\">Bahrain</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T05:10:00\" DepartureDateTime=\"2026-05-
20T05:00:00\" FlightNumber=\"G92220\" JourneyDuration=\"PT1H10M0.000S\"
RPH=\"G9$SHJ/BAH$3223689$20260520050000$20260520051000\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"SHJ\" Terminal=\"\" /><ns1:ArrivalAirport LocationCode=\"BAH\"
Terminal=\"MainT\"
```

```
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></ns1:OriginDestinationInformation><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T07:00:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T07:10:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"BAH\"
MultiAirportCityInd=\"false\">Bahrain</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T07:10:00\" DepartureDateTime=\"2026-05-
20T07:00:00\" FlightNumber=\"G92221\" JourneyDuration=\"PT1H10M0.000S\"
RPH=\"G9$SHJ/BAH$3223979$20260520070000$20260520071000\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"SHJ\" Terminal=\"\" /><ns1:ArrivalAirport LocationCode=\"BAH\"
Terminal=\"MainT\"
```

```
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></ns1:OriginDestinationInformation><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T03:55:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
```

```
CrossDateAllowedIndicator=\"false\">2026-05-20T04:10:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"BAH\"
```

```
MultiAirportCityInd=\"false\">Bahrain</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T04:10:00\" DepartureDateTime=\"2026-05-
20T03:55:00\" FlightNumber=\"G9107\" JourneyDuration=\"PT1H15M0.000S\"
RPH=\"G9$SHJ/BAH$3237667$20260520035500$20260520041000\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"SHJ\" Terminal=\"\" /><ns1:ArrivalAirport LocationCode=\"BAH\"
Terminal=\"MainT\"
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></ns1:OriginDestinationInformation><ns1:OriginDestinationInformation
SameAirportInd=\"false\"><ns1:DepartureDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T08:10:00</ns1:DepartureDateTime><
ns1:ArrivalDateTime
CrossDateAllowedIndicator=\"false\">2026-05-20T08:25:00</ns1:ArrivalDateTime><ns
1:OriginLocation AlternateLocationInd=\"false\" LocationCode=\"SHJ\"
MultiAirportCityInd=\"false\">Sharjah</ns1:OriginLocation><ns1:DestinationLocati
on AlternateLocationInd=\"false\" LocationCode=\"BAH\"
MultiAirportCityInd=\"false\">Bahrain</ns1:DestinationLocation><ns1:OriginDestin
ationOptions><ns1:OriginDestinationOption><ns1:FlightSegment
ArrivalDateTime=\"2026-05-20T08:25:00\" DepartureDateTime=\"2026-05-
20T08:10:00\" FlightNumber=\"G9101\" JourneyDuration=\"PT1H15M0.000S\"
RPH=\"G9$SHJ/BAH$3241664$20260520081000$20260520082500\"
SmokingAllowed=\"false\" returnFlag=\"false\"><ns1:DepartureAirport
LocationCode=\"SHJ\" Terminal=\"\" /><ns1:ArrivalAirport LocationCode=\"BAH\"
Terminal=\"MainT\"
/></ns1:FlightSegment></ns1:OriginDestinationOption></ns1:OriginDestinationOptio
ns></
ns1:OriginDestinationInformation><ns1:AAAirAvailRSExt><ns1:PricedItineraries><ns
1:PricedItinerary
SequenceNumber=\"1\"><ns1:AirItinerary><ns1:OriginDestinationOptions><ns1:Origin
DestinationOption><ns1:FlightSegment ArrivalDateTime=\"2026-05-20T05:10:00\"
DepartureDateTime=\"2026-05-20T05:00:00\" FlightNumber=\"G92220\"
RPH=\"G9$SHJ/BAH$3223689$20260520050000$20260520051000\"
```

```
returnFlag=\"false\"><ns1:DepartureAirport LocationCode=\"SHJ\" Terminal=\"\"
/><ns1:ArrivalAirport LocationCode=\"BAH\" Terminal=\"MainT\"
```

```
/></ns1:FlightSegment></ns1:OriginDestinationOption><ns1:AABundledServiceExt
applicableOnd=\"SHJ/BAH\"
```

```
applicableOndSequence=\"0\"><ns1:bundledService><ns1:bunldedServiceId>66519</
ns1:bunldedServiceId><ns1:bundledServiceName>Premium</
```

```
ns1:bundledServiceName><ns1:perPaxBundledFee>1352.00</
```

```
ns1:perPaxBundledFee><ns1:bookingClasses>Y1</
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
ns1:perPaxBundledFee><ns1:bookingClasses>Y1</
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
```

```
ns1:bundledService><ns1:bundledService><ns1:bunldedServiceId>66569</
```

```
ns1:bunldedServiceId><ns1:bundledServiceName>Ultimate</
```

```
ns1:bundledServiceName><ns1:perPaxBundledFee>2751.32</
```

```
ns1:perPaxBundledFee><ns1:bookingClasses>Y1</
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
PricingSource=\"Published\"><ns1:ItinTotalFare
NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"5272.80\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"390.00\" CurrencyCode=\"AED\"
DecimalPlaces=\"2\" /><ns1:TotalFare Amount=\"10667.28\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /><ns1:TotalEquivFare Amount=\"789.00\" CurrencyCode=\"AED\"
DecimalPlaces=\"2\" /><ns1:TotalFareWithCCFee Amount=\"10667.28\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:TotalEquivFareWithCCFee
Amount=\"789.00\" CurrencyCode=\"AED\" DecimalPlaces=\"2\"
/></ns1:ItinTotalFare><ns1:PTC_FareBreakdowns><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"ADT\"
Quantity=\"1\"
```

```
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"1825.20\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"135.00\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes><ns1:Tax Amount=\"676.00\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"F6SHJ\" TaxName=\"UAE-Pax
Facility Fee P2P F6\" /><ns1:Tax Amount=\"1014.00\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"ST\" TaxName=\"UAE-Dept Tax ST\" /><ns1:Tax
Amount=\"67.60\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"API\"
TaxName=\"UAE-API Charge Dept API\" /><ns1:Tax Amount=\"182.52\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"HLSHJ\" TaxName=\"TEST
PERCENTAGE\" /><ns1:Tax Amount=\"67.60\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"TP\" TaxName=\"UAE-Dept PSS Fee TP\"
/></ns1:Taxes><ns1:Fees><ns1:Fee Amount=\"405.60\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" FeeCode=\"TPCharge/TPCharge\" /></ns1:Fees><ns1:TotalFare
Amount=\"4238.52\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
/></ns1:PassengerFare><ns1:TravelerRefNumber RPH=\"A1\"
```

```
/></ns1:PTC_FareBreakdown><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"CHD\"
Quantity=\"1\"
```

```
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"1825.20\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"135.00\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes><ns1:Tax Amount=\"676.00\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"F6SHJ\" TaxName=\"UAE-Pax
Facility Fee P2P F6\" /><ns1:Tax Amount=\"1014.00\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"ST\" TaxName=\"UAE-Dept Tax ST\" /><ns1:Tax
Amount=\"67.60\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"API\"
TaxName=\"UAE-API Charge Dept API\" /><ns1:Tax Amount=\"182.52\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"HLSHJ\" TaxName=\"TEST
PERCENTAGE\" /><ns1:Tax Amount=\"67.60\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" TaxCode=\"TP\" TaxName=\"UAE-Dept PSS Fee TP\"
/></ns1:Taxes><ns1:Fees><ns1:Fee Amount=\"405.60\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" FeeCode=\"TPCharge/TPCharge\" /></ns1:Fees><ns1:TotalFare
Amount=\"4238.52\" CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
/></ns1:PassengerFare><ns1:TravelerRefNumber RPH=\"C2\"
/></ns1:PTC_FareBreakdown><ns1:PTC_FareBreakdown
PricingSource=\"Published\"><ns1:PassengerTypeQuantity Age=\"0\" Code=\"INF\"
Quantity=\"1\"
```

```
/><ns1:FareBasisCodes><ns1:FareBasisCode>P</ns1:FareBasisCode></ns1:FareBasisCod
es><ns1:PassengerFare NegotiatedFare=\"false\"><ns1:BaseFare Amount=\"1622.40\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" /><ns1:EquiBaseFare Amount=\"120.00\"
CurrencyCode=\"AED\" DecimalPlaces=\"2\" /><ns1:Taxes><ns1:Tax Amount=\"162.24\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" TaxCode=\"HLSHJ\" TaxName=\"TEST
PERCENTAGE\" /></ns1:Taxes><ns1:Fees><ns1:Fee Amount=\"405.60\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\" FeeCode=\"TPCharge/TPCharge\"
/></ns1:Fees><ns1:TotalFare Amount=\"2190.24\" CurrencyCode=\"EGP\"
DecimalPlaces=\"2\" /></ns1:PassengerFare><ns1:TravelerRefNumber
RPH=\"I3/A1\"
```

```
/></ns1:PTC_FareBreakdown></ns1:PTC_FareBreakdowns><ns1:AvailableFlexiFares
InBoundFlexiAvailable=\"false\" OutBoundFlexiAvailable=\"true\"><ns1:FlexiFare
```

```
ApplicableJourneyType=\"Outbound\"><ns1:FlexiFareAmount Amount=\"0.00\"
CurrencyCode=\"EGP\" DecimalPlaces=\"2\"
/><ns1:FlexibilityDescription>Flexibility</ns1:FlexibilityDescription><ns1:Allow
edFlexiOperations><ns1:FlexiOperations AllowedOperationName=\"1 Modification(s)
up to 24 hours before departure\" FlexiOperationCutoverTimeInMinutes=\"1440\"
NumberOfAllowedOperations=\"1\" /><ns1:FlexiOperations AllowedOperationName=\"2
Cancellation(s) up to 12 hours before departure\"
FlexiOperationCutoverTimeInMinutes=\"720\" NumberOfAllowedOperations=\"2\"
/></ns1:AllowedFlexiOperations><ns1:PerPaxFlexifareBDS
/><ns1:FlexiRuleCode>OFFER_TEMPLATE:3104</ns1:FlexiRuleCode></ns1:FlexiFare></
ns1:AvailableFlexiFares></ns1:AirItineraryPricingInfo></ns1:PricedItinerary></
ns1:PricedItineraries></ns1:AAAirAvailRSExt><ns1:Errors
/></ns1:OTA_AirAvailRS></soap:Body></soap:Envelope>"
}
Fare Confirm Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "searchResponseId": "{{searchResponseId}}",
    "selectedOfferId": "{{offerId}}"
}
Fare Confirm Responce:
{
    "responseId": "333c0794-4ecd-4838-bc06-3e3d73414aac",
    "supplier": "AirArabia",
    "journeys": {
        "G9$SHJ/BAH$3249681$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$3249681$20260520140000$20260520140000"
            ]
        }
    },
    "flightSegments": {
        "G9$SHJ/BAH$3249681$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T14:00:00",
            "arrivalDateTime": "2026-05-20T14:00:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 60,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G95122",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G95122",
            "equipment": null
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "Basic",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Cancellation/modification charges will be calculated at the
time of cancellation, minimum 200 AED."
            ]
        }
    },
    "baggageDetails": {
        "1": {
            "carryOnBaggage": "10 Kg (7 Kg bag + 3 Kg personal item)",
```

```
            "checkInBaggage": "No Checked baggage"
        }
    },
    "selectedOffer": {
        "offerId": "d45ae3d1-b080-4cba-
b63f-639928ac444d&x8hj0gAAANKSnJGb1v9qDb5gBgD7FNkwRzkkU0hKL0JBSCQzMjQ5NjgxJDIwMj
YwNTIwMTQwMDAwDwDwTaZHOTUxMjKjU0hKoKNCQUilTWFpblTCwDyRkqNBRFShMaZPbmVXYXnZIVRJRC
QxNzc4NTk1MTc2Njc3Njk3MjM5MS1hcHAtMjE3NZGiQTGRokMykaVJMy9BMZGTVQAAVADxDtb/
agz5gMCSpzUyNTMuODmjRUdQkqc0OTAyLjM3DQCwpjM1MS41MqNFR1A=",
        "offerJourneys": [
            "G9$SHJ/BAH$3249681$20260520140000$20260520140000"
        ],
        "passengerFareBreakdown": [
            {
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 2247.03,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 162.24,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 676.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 1014.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 16.23,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCharge/TPCharge",
                        "amount": {
                            "amount": 405.60,
                            "currency": "EGP"
```

```
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 2247.03,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 162.24,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 676.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 1014.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 16.23,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCharge/TPCharge",
                        "amount": {
```

```
                            "amount": 405.60,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 408.31,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 27.04,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 2.71,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCharge/TPCharge",
                        "amount": {
                            "amount": 405.60,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$SHJ/BAH$3249681$20260520140000$20260520140000",
```

```
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
                "amount": 5253.89,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 4902.37,
                "currency": "EGP"
```

```
            },
            "totalBaseAmount": {
                "amount": 351.52,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
                    "code": "F6SHJ",
                    "amount": {
                        "amount": 1352.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "ST",
                    "amount": {
                        "amount": 2028.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "API",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "HLSHJ",
                    "amount": {
                        "amount": 35.17,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "TP",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "TPCHARGE/TPCHARGE",
                    "amount": {
                        "amount": 1216.80,
                        "currency": "EGP"
                    }
                }
            ],
            "discount": null,
            "isDealCodeApplied": false,
            "appliedDealCode": null,
            "isPromoted": false,
            "appliedPromotionCode": "",
            "offerAncillaries": null
        },
        "refundability": "UnKnown",
        "haveBundles": false,
        "canBeHeld": true
    }
}
Book || Hold Request:
{
    "Supplier": "{{Supplier_Name}}",
```

```
    "CredentialsSelector": "{{Credentials_Selector}}",
    "fareConfirmResponseId": "{{fareConfirmResponseId}}",
    "selectedOfferId": "{{selectedOfferId}}",
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
```

```
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
```

```
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
```

```
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
```

```
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
```

```
        //         "name": {
        //             "first": "Karim",
        //             "middle": "",
        //             "last": "Hassan"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2029-03-09T00:00:00.000Z",
        //         "issuanceDate": "2024-03-15T00:00:00.000Z",
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
        //         "last": "Adel"
        //     },
        //     "nationality": "EG",
        //     "residentCountry": "EG",
        //     "birthDate": "2024-05-02T00:00:00.000Z",
        //     "gender": "male",
        //     "passengerTypeCode": "INF",
        //     "ParentPaxRefId": "Pax4",
        //     "contactRefId": "0",
        //     "travelDocument": {
        //         "name": {
        //             "first": "Yazan",
```

```
        //             "middle": "Omar",
        //             "last": "Adel"
        //         },
        //         "nationality": "EG",
        //         "expirationDate": "2029-05-01T00:00:00.000Z",
        //         "issuanceDate": "2024-05-10T00:00:00.000Z",
        //         "documentNumber": "INF1234504",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2024-05-02T00:00:00.000Z",
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
        //     "birthDate": "2024-08-12T00:00:00.000Z",
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
        //         "issuanceDate": "2024-08-20T00:00:00.000Z",
        //         "documentNumber": "INF9876540",
        //         "documentType": "PASSPORT",
        //         "gender": "male",
        //         "birthCountry": "EG",
        //         "birthDate": "2024-08-12T00:00:00.000Z",
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
                "phoneNumber": "509700784"
            },
            "Address": {
                "Line1": "FZ HQ",
                "Line2": "FZ HQ",
                "City": "DUBAI",
                "CountryCode": "AE"
            }
        }
    },
    "selectedBundles": [
```

```
    ]
}
Book || Hold Responce:
{
    "voidCapability": "VoidNotAllowed",
    "tickets": {
        "I3/A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725015",
            "carrierCode": "G9"
        },
        "A1": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725013",
            "carrierCode": "G9"
        },
        "C2": {
            "ticketStatus": "Booked",
            "ticketNumber": "5142375725014",
            "carrierCode": "G9"
        }
    },
    "holdExpirationDate": null,
    "supplier": "AirArabia",
    "pnr": "6RVXKX",
    "gdsPNR": "",
    "bookingToken":
"H4sIAAAAAAAAA6tW8lKyyivNydFRClGyUvLPSw1PrFTSUXJTsoquVgpOTc9NzSvxTq0EyrlbqgR7eOk
7OXqoGBuZWJpZGKoYGRiZGZgaGRiaGAABGhdkSk5mekZJSGZuqpKVmUFtbC0ADW0lHG8AAAA=",
    "journeys": {
        "G9$SHJ/BAH$144028986$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "numberOfStops": 0,
            "segmentRefIds": [
                "G9$SHJ/BAH$144028986$20260520140000$20260520140000"
            ]
        }
    },
    "flightSegments": {
        "G9$SHJ/BAH$144028986$20260520140000$20260520140000": {
            "origin": "SHJ",
            "destination": "BAH",
            "departureDateTime": "2026-05-20T14:00:00",
            "arrivalDateTime": "2026-05-20T14:00:00",
            "departureTerminal": null,
            "arrivalTerminal": "MainT",
            "flightTime": 60,
            "operatingCarrierCode": "G9",
            "operatingFlightNumber": "G95122",
            "marketingCarrierCode": "G9",
            "marketingFlightNumber": "G95122",
            "equipment": null
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "Basic",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "Cancellation/modification charges will be calculated at the
time of cancellation, minimum 200 AED."
            ]
        }
```

```
    },
    "baggageDetails": {
        "1": {
            "carryOnBaggage": "10 Kg (7 Kg bag + 3 Kg personal item)",
            "checkInBaggage": "No Checked baggage"
        }
    },
    "passengersList": {
        "A1": {
            "title": "MR",
            "name": {
                "first": "Mostafa",
                "middle": "",
                "last": "Ibrahim"
            },
            "birthDate": "2000-02-15T00:00:00Z",
            "gender": "Male",
            "passengerTypeCode": "ADT",
            "contactRefId": "97-15-09700784",
            "travelDocument": {
                "name": {
                    "first": "Mostafa",
                    "middle": "",
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
```

```
                "birthDate": "2016-03-10T00:00:00Z",
                "issuanceCountryCode": "EG"
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
                "middle": "",
                "last": "Ibrahim"
            },
            "birthDate": "2025-01-05T00:00:00Z",
            "gender": "Female",
            "passengerTypeCode": "INF",
            "contactRefId": "97-15-09700784",
            "travelDocument": {
                "name": {
                    "first": "Lina",
                    "middle": "",
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
        "97-15-": {
            "email": "moontravel626@gmail.com",
            "phone": {
                "type": "Personal",
                "countryDialingCode": "+971",
                "phoneNumber": "5"
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
        "offerId": "a020b763-457f-4bce-8bfa-e14b4c9eb0ed",
        "offerJourneys": [
            "G9$SHJ/BAH$144028986$20260520140000$20260520140000"
        ],
        "passengerFareBreakdown": [
            {
```

```
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 2247.03,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 162.24,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "API",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 1014.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 676.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 16.23,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCharge",
                        "amount": {
                            "amount": 405.60,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$SHJ/BAH$144028986$20260520140000$20260520140000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
                ],
                "discount": null
```

```
            },
            {
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 2247.03,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 162.24,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "TP",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "API",
                        "amount": {
                            "amount": 67.60,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "HLSHJ",
                        "amount": {
                            "amount": 16.23,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "F6SHJ",
                        "amount": {
                            "amount": 676.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "ST",
                        "amount": {
                            "amount": 1014.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TPCharge",
                        "amount": {
                            "amount": 405.60,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId":
"G9$SHJ/BAH$144028986$20260520140000$20260520140000",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "P"
                    }
```

```
                        "segmentRefId":
"G9$SHJ/BAH$144028986$20260520140000$20260520140000",
                        "priceClassRefId": "1",
```

```
        ],
        "priceDetails": {
            "totalAmount": {
                "amount": 5253.89,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 4902.37,
                "currency": "EGP"
            },
            "totalBaseAmount": {
                "amount": 351.52,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
```

```
                    "code": "HLSHJ",
                    "amount": {
                        "amount": 35.17,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "F6SHJ",
                    "amount": {
                        "amount": 1352.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "API",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "ST",
                    "amount": {
                        "amount": 2028.00,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "TP",
                    "amount": {
                        "amount": 135.20,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "TPCharge",
                    "amount": {
                        "amount": 1216.80,
                        "currency": "EGP"
                    }
                }
            ],
            "discount": null,
            "isDealCodeApplied": false,
            "appliedDealCode": null,
            "isPromoted": false,
            "appliedPromotionCode": "",
            "offerAncillaries": null
        },
        "refundability": "UnKnown",
        "haveBundles": false,
        "canBeHeld": false
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
```

```
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
```

```
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
```

```
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
```

```
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
```

```
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
```

```
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
```

```
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
```

```
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
```

