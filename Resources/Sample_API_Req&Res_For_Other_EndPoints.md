```
samples API Requets & Responce For Bundle  Upselling & void & Cancel &
FareConfirmAfterHold & BookAfterHold
Bunlde Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "fareConfirmResponseId": "{{fareConfirmResponseId}}",
    "SelectedOfferId": "{{fareConfirmSelectedOfferId}}"
```

```
}
Bundle Responce:
{
    "offerJourneys": {
"G9$DAC/SHJ$3235686$20260530093500$20260530130500,G9$SHJ/RUH$3235892$20260530151
000$20260530161500": {
            "origin": "DAC",
            "destination": "RUH",
            "bundleReferences": [
                "66519",
                "66577",
                "66569"
            ]
        }
    },
    "bundleChoices": {
        "66519": {
            "bundleCode": "66519",
            "bundleName": "Premium",
            "bundlePrices": [
                {
                    "passengerType": "ADT",
                    "totalPrice": {
                        "amount": 1352.00,
                        "currency": "EGP"
                    },
                    "totalTax": {
                        "amount": 0,
                        "currency": "EGP"
                    },
                    "feePrice": {
                        "amount": 1352.00,
                        "currency": "EGP"
                    }
                }
            ],
            "includedServices": [
                "",
                "BAGGAGE",
                "MEAL",
                "FLEXI_CHARGES"
            ]
        },
        "66577": {
            "bundleCode": "66577",
            "bundleName": "Value",
            "bundlePrices": [
                {
                    "passengerType": "ADT",
                    "totalPrice": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    },
                    "totalTax": {
```

```
                        "amount": 0,
                        "currency": "EGP"
                    },
                    "feePrice": {
                        "amount": 1825.20,
                        "currency": "EGP"
                    }
                }
            ],
            "includedServices": [
                "Global Covid-19 Cover",
                "Baggage : 20/30 Kg",
                "Meal : Sandwich and water",
                "Seat : row 8 onwards",
                "Modification : One modification, up to 8h",
                "Cancellation : Up to 8h",
                "BAGGAGE",
                "SEAT_MAP",
                "MEAL",
                "FLEXI_CHARGES"
            ]
        },
        "66569": {
            "bundleCode": "66569",
            "bundleName": "Ultimate",
            "bundlePrices": [
                {
                    "passengerType": "ADT",
                    "totalPrice": {
                        "amount": 2501.20,
                        "currency": "EGP"
                    },
                    "totalTax": {
                        "amount": 0,
                        "currency": "EGP"
                    },
                    "feePrice": {
                        "amount": 2501.20,
                        "currency": "EGP"
                    }
                }
            ],
            "includedServices": [
                "Handbag: 7 Kg + Personal Item (Max 3Kg)",
                "40 Kg Checked Baggage",
                "Seat: Row 3 onwards",
                "Standard Meal",
                "2 Free Modification (Up to 8h)",
                "Cancellation: Up to 8h. Credit voucher at AED 200",
                "BAGGAGE",
                "SEAT_MAP",
                "MEAL",
                "FLEXI_CHARGES"
            ]
        }
    }
}
Upselling Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "searchResponseId": "{{searchResponseId}}",
    "selectedOfferId": "{{offerId}}"
}
```

```
Upselling Responce:
{
    "responseId": "74799d8d-7410-4f65-befd-a922673ce3f1",
    "supplier": "TKConnect",
    "journeys": {
        "PJ_1_F_1": {
            "origin": "CAI",
            "destination": "IST",
            "numberOfStops": 0,
            "segmentRefIds": [
                "SEG_M_1"
            ]
        },
        "PJ_2_F_1": {
            "origin": "IST",
            "destination": "CAI",
            "numberOfStops": 0,
            "segmentRefIds": [
                "SEG_M_2"
            ]
        }
    },
    "flightSegments": {
        "SEG_M_1": {
            "origin": "CAI",
            "destination": "IST",
            "departureDateTime": "2026-05-22T21:45:00",
            "arrivalDateTime": "2026-05-23T00:05:00",
            "departureTerminal": "3",
            "arrivalTerminal": null,
            "flightTime": 140,
            "operatingCarrierCode": "TK",
            "operatingFlightNumber": "695",
            "marketingCarrierCode": "TK",
            "marketingFlightNumber": "695",
            "equipment": "A321 NEO"
        },
        "SEG_M_2": {
            "origin": "IST",
            "destination": "CAI",
            "departureDateTime": "2026-05-24T01:55:00",
            "arrivalDateTime": "2026-05-24T04:20:00",
            "departureTerminal": null,
            "arrivalTerminal": "3",
            "flightTime": 145,
            "operatingCarrierCode": "TK",
            "operatingFlightNumber": "692",
            "marketingCarrierCode": "TK",
            "marketingFlightNumber": "692",
            "equipment": "A330-300"
        }
    },
    "priceClasses": {
        "PC_7": {
            "priceClassName": "Prime Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_6": {
            "priceClassName": "Flex Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_9": {
```

```
            "priceClassName": "Business Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_1": {
            "priceClassName": "Extra Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_8": {
            "priceClassName": "Prime Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_5": {
            "priceClassName": "Flex Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_2": {
            "priceClassName": "Eco Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_3": {
            "priceClassName": "Eco Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        },
        "PC_4": {
            "priceClassName": "Extra Fly",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": []
        }
    },
    "baggageDetails": {
        "FBA3_SEG_1_PAX_6": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_1_PAX_4": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_1_PAX_5": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_1_PAX_2": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_1_PAX_3": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
```

```
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_1_PAX_1": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA1_SEG_2_PAX_6": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA1_SEG_2_PAX_5": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA2_SEG_2_PAX_4": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA2_SEG_2_PAX_2": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
```

```
        "FBA2_SEG_2_PAX_3": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA2_SEG_2_PAX_1": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA1_SEG_1_PAX_6": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA1_SEG_1_PAX_5": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA3_SEG_2_PAX_6": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
        "FBA3_SEG_2_PAX_4": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
```

```
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
```

```
        "FBA3_SEG_2_PAX_5": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
```

```
        "FBA3_SEG_2_PAX_2": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
```

```
        "FBA3_SEG_2_PAX_3": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
```

```
        "FBA3_SEG_2_PAX_1": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 1 Piece(s)"
        },
```

```
        "FBA2_SEG_1_PAX_4": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
```

```
        "FBA2_SEG_1_PAX_2": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
```

```
        },
```

```
        "FBA2_SEG_1_PAX_3": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
        "FBA2_SEG_1_PAX_1": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 0 Pieces"
        },
```

```
        "FBA4_SEG_1_PAX_4": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
```

```
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_1_PAX_2": {
```

```
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_1_PAX_3": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_1_PAX_1": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_2_PAX_4": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_2_PAX_2": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_2_PAX_3": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        },
```

```
        "FBA4_SEG_2_PAX_1": {
            "carryOnBaggage": "Type: CarryOn | Weight: 8 KG | Description: 1
PIECE X 8 KG CABIN BAGGAGE | Pieces: 1 Piece(s)",
            "checkInBaggage": "Type: Checked | Weight: 0 | Description: No
description available | Pieces: 2 Piece(s)"
        }
    },
    "upsellOffers": [
        {
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
2&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMqJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi0yLTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
5V9CwBqBIaU2SQzZjIzYWJkMi1kMTY5LTRmNDYtYTAwMC0xOThhM2Y4ZTViYjjZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
```

```
                        "amount": 2391.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
```

```
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA1_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 23745.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
```

```
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
```

```
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 17796.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
```

```
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
```

```
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 134440.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 87864.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
```

```
3&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtM6JUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi0zLTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
```

```
5V9CwBqBIaU2SQzY2RhNjQ2Yi1hMjg0LTRmMzgtOTI3OC0xOTJhMjczMGJiMDLZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
```

```
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
```

```
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2391.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA1_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 23745.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 17796.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 134440.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 87864.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
```

```
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
4&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtNKJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi00LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
5V9CwBqBIaU2SQ1MDUxNmUxNy1iZDkzLTRkYjUtYjQ0ZC1mMWQ1YmI2NTJhMTTZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2444.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA1_SEG_2_PAX_5",
```

```
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 24382.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
```

```
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 18274.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 136776.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
```

```
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 90200.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
5&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtNaJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi01LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
5V9CwBqBIaU2SRjOTBhMTkxZi1mZDkyLTQ4OWItOTJiNS1jM2YwNjZmNTI0NTHZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
```

```
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2444.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
```

```
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA1_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 24382.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
```

```
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
```

```
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 18274.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
```

```
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
```

```
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 136776.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 90200.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
                "appliedPromotionCode": "",
```

```
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
6&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtNqJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi02LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
5V9CwBqBIaU2SQ0OGQ3YjAxYy0yYjYyLTQxNzYtOWU4Ni0wYzRmZDNjMDUyNDbZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2444.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 24648.00,
                        "currency": "EGP"
                    },
```

```
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 18486.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 137732.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 91156.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
```

```
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
```

```
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
7&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtN6JUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi03LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
5V9CwBqBIaU2SQ5NjRkNTcyZC04ZTIwLTRhOWYtYTNiOC01MTA1ODYzMGQwODDZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2550.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
```

```
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25286.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
```

```
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 18964.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
```

```
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 140176.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 93600.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
```

```
8&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtOKJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi04LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
```

```
5V9CwBqBIaU2SRkNmIyNWYxNi1lZjhjLTQxYzEtYjViYi1iZjFjNWNlZDk4YTHZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
```

```
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
```

# `AAAAAP////` 

```
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
```

```
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2550.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
```

```
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25286.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
```

```
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 18964.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
```

```
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 140176.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 93600.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
                            "currency": "EGP"
```

```
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
```

```
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
```

```
9&3AAR2SNNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtOaJUS4HZJU1ENEUyMDNEQzE2Qz
k0RjFCQjI3MzlBQjM5RUNGMUVGNi05LTGWpVBBWF81pVBBWF82pVBBWF8xpVBBWF8ypVBBWF8zpVBBWF
80k6RGdWxsoTDX/
```

```
5V9CwBqBIaU2SRmNWI0ZDdhYS1hOTZkLTRkMjktYmI1My03NWZmZTY3ZjkwMDfZJDc0Nzk5ZDhkLTc0M
TAtNGY2NS1iZWZkLWE5MjI2NzNjZTNmMZaaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfMcDAo0FEVMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfMsDAo0FEVMCaxwz/
AAAAAP////GIbgkAwMDAwKVQQVhfM8DAo0NIRMCaxwz/AAAAAP////
GIbgkAwMDAwKVQQVhfNMDAo0NIRMCaxwz/AAAAAP////GIbgkAwMDAwKVQQVhfNcDAo0lORsCaxwz/
AAAAAP////
```

```
GIbgkAwMDAwKVQQVhfNsDAo0lORsChMMDAgqdTRUdfTV8xnKNDQUmjSVNU1v9qEM5c1v9qEO8soTPAzI
yiVEujNjk1olRLozY5NahBMzIxIE5FT6dTRUdfTV8ynKNJU1SjQ0FJ1v9qElp01v9qEnxwwKEzzJGiVE
ujNjkyolRLozY5MqhBMzMwLTMwMMDAwMDAwA==",
```

```
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2550.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA1_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
```

```
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25551.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 19177.00,
                        "currency": "EGP"
```

```
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 141132.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 94556.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
```

```
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
```

```
        },
        {
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
10&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTCiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTAtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDRiOGIzMDM0LTQ0MzUtNDA3Zi05YjJjLWM2OGMxODAxNTUzMNkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
```

```
                    "paxBaseAmount": {
                        "amount": 2550.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
```

```
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA1_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25551.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
```

```
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
```

```
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 19177.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
```

```
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
```

```
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 141132.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 94556.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
11&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTGiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTEtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDIxNTFjZjM2LWEyMjktNDI4YS05OGNmLTEyN2MxM2ZjMDkwY9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2603.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25923.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 19442.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 142512.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 95936.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
```

```
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
12&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTKiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTItMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJGU1ODE4NGVmLWRkZGMtNGU2YS05ZGRjLTUzZDhiM2I3ZWRmN9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2656.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
```

```
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
```

```
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 26454.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
```

```
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
```

```
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 19867.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
```

```
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 144530.80,
                    "currency": "EGP"
```

```
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 97954.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
13&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTOiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTMtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
```

```
lX0LAGoEhpTZJGQzYTg2M2VhLTU4MjktNGQ5NS1iNzI3LTc0NmMwNDllYmFiMtkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
```

```
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2656.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 26454.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
```

```
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 19867.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
```

```
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 144530.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 97954.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
```

```
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
14&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTSiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTQtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
```

```
lX0LAGoEhpTZJDljNTA2ODMyLTc4MGEtNDQwNS1hNjMzLTg5MWQxMWE0N2FjNNkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2710.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
```

```
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
```

```
                    },
                    "paxBaseAmount": {
                        "amount": 27092.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
```

```
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 20345.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
```

```
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
```

```
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 146870.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 100294.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
15&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTWiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTUtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDk1OWJiZTBkLWIxY2EtNDRkNi1hNWRlLTIyZWYzYzFkNzg4M9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
```

```
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
```

```
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 27092.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
```

```
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 20345.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
```

```
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 146870.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 100294.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
```

```
16&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTaiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTYtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
```

```
EFYXzSTpEZ1bGyhMNf/
```

```
lX0LAGoEhpTZJDVmODBjY2I3LWVlNGUtNDlhZS1iYjg5LThhZGYyYjk2ZWRmYtkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
```

```
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2816.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
```

```
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 28260.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
```

```
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 10685.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 21195.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 7118.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
```

```
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 151118.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 46576.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 104542.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 28472.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
```

```
        },
        {
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
17&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTeiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTctMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJGYzNWE5ZWY1LWE5NjgtNDRjYS1hOGNkLTEwNGRjZTYwMDc4NdkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2710.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA1_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
```

```
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 26826.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
```

```
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 20133.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA2_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_3",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 152926.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 53588.80,
```

```
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 99338.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
18&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTiiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTgtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDkyODBmMTY0LWExMDQtNDk4My1iYzE5LWVmNmU0YjM3ZDZkZNkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
```

```
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2763.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
```

```
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 27729.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
```

```
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 20823.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
```

```
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_1",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 156218.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 53588.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 102630.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
                            "currency": "EGP"
                        }
                    }
                ],
                "discount": null,
                "isDealCodeApplied": false,
                "appliedDealCode": null,
                "isPromoted": false,
```

```
                "appliedPromotionCode": "",
                "offerAncillaries": null
            },
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
19&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTmiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMTktMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
```

```
lX0LAGoEhpTZJDMwZWQwNjE5LWU4ZWMtNGFiZC04ZDFhLTMzYzU2MTA5NThlY9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2816.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 28366.00,
```

```
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 21302.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_5",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 158556.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 53588.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 104968.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
20&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjCiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjAtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDg3YjQ0MTRkLWNlMTctNGU1ZC05N2Y4LWI1NmQyN2I2YjYxM9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 1916.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2975.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
```

```
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
```

```
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 29535.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
```

```
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12438.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 22151.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "O"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_8",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        }
```

```
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 162910.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 53588.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 109322.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
```

```
21&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjGiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjEtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
```

```
lX0LAGoEhpTZJDdmNmQ1MTgwLTZjZWItNDI4Ny05N2MwLTJmMDhhMGFjN2ZmM9kkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
```

```
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 2166.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 2975.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA1_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 29482.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 22098.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA2_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 164198.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 55088.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 109110.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 2400.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
```

```
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
22&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjKiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjItMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDMwNTZmZmJiLWUxMWQtNDQ0ZC1iMzZiLTJlNzk1MDNlMTIzNtkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 2166.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3028.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
```

```
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 30385.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
```

```
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 22789.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 167492.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 55088.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
```

```
                    "amount": 112404.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 2400.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
```

```
        },
        {
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
23&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjOiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjMtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDIxYjdjNWM5LTE0MWItNDBiMy1iMDNlLTFiY2VmNmIyM2FlOdkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
```

```
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 2166.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3081.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
```

```
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 31022.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
```

```
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 23267.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
```

```
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 169828.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 55088.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 114740.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 2400.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "refundability": "UnKnown",
            "haveBundles": false,
            "canBeHeld": true
        },
        {
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
24&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjSiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjQtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDA0Zjk1MDc3LTFlZWItNDQ3Yi04MjQyLTU5ZmUxNmFhNjNiYtkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 2166.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3241.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 32191.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
```

```
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 12688.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 24170.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 8871.00,
                                "currency": "EGP"
                            }
                        },
```

```
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
```

```
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "Economy",
                            "rbd": "S"
                        }
                    ],
                    "discount": null
                }
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 174292.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 55088.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 119204.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 2400.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
```

```
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 35484.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
```

```
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
```

```
            "offerId": "MD4E203DC16C94F1BB2739AB39ECF1EF6-
25&3AAR2SRNRDRFMjAzREMxNkM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjWiVEuB2SZNRDRFMjAzREMxN
kM5NEYxQkIyNzM5QUIzOUVDRjFFRjYtMjUtMZalUEFYXzWlUEFYXzalUEFYXzGlUEFYXzKlUEFYXzOlU
EFYXzSTpEZ1bGyhMNf/
lX0LAGoEhpTZJDdjYzc3MTkzLTdjZDktNDM5My04NmEwLWYwYjllNTJmM2M1NNkkNzQ3OTlkOGQtNzQx
MC00ZjY1LWJlZmQtYTkyMjY3M2NlM2YxlprHDP8AAAAA////
8YhuCQDAwMDApVBBWF8xwMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8ywMCjQURUwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF8zwMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF80wMCjQ0hEwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF81wMCjSU5GwJrHDP8AAAAA////
8YhuCQDAwMDApVBBWF82wMCjSU5GwKEwwMCCp1NFR19NXzGco0NBSaNJU1TW/2oQzlzW/
2oQ7yyhM8DMjKJUS6M2OTWiVEujNjk1qEEzMjEgTkVPp1NFR19NXzKco0lTVKNDQUnW/2oSWnTW/
2oSfHDAoTPMkaJUS6M2OTKiVEujNjkyqEEzMzAtMzAwwMDAwMDA",
            "offerJourneys": [
                "PJ_1_F_1",
                "PJ_2_F_1"
            ],
            "passengerFareBreakdown": [
                {
                    "passengerTypeCode": "INF",
                    "paxTotalTaxAmount": {
                        "amount": 2166.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 3347.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
```

```
                            "baggageDetailsRefId": "FBA3_SEG_1_PAX_5",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA3_SEG_2_PAX_5",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "ADT",
                    "paxTotalTaxAmount": {
                        "amount": 14441.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 33466.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 10624.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_1",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
```

```
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_1",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                },
                {
                    "passengerTypeCode": "CHD",
                    "paxTotalTaxAmount": {
                        "amount": 14441.80,
                        "currency": "EGP"
                    },
                    "paxBaseAmount": {
                        "amount": 25126.00,
                        "currency": "EGP"
                    },
                    "taxesAndFees": [
                        {
                            "code": "YR",
                            "amount": {
                                "amount": 10624.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EG",
                            "amount": {
                                "amount": 400.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "EQ",
                            "amount": {
                                "amount": 107.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "JK",
                            "amount": {
                                "amount": 100.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O2",
                            "amount": {
                                "amount": 15.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "O9",
                            "amount": {
                                "amount": 54.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "Q7",
                            "amount": {
                                "amount": 2.00,
```

```
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "QH",
                            "amount": {
                                "amount": 1328.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "S4",
                            "amount": {
                                "amount": 212.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XK",
                            "amount": {
                                "amount": 150.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "XL",
                            "amount": {
                                "amount": 10.80,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "M6",
                            "amount": {
                                "amount": 188.00,
                                "currency": "EGP"
                            }
                        },
                        {
                            "code": "TR",
                            "amount": {
                                "amount": 1251.00,
                                "currency": "EGP"
                            }
                        }
                    ],
                    "segmentDetails": [
                        {
                            "segmentRefId": "SEG_M_1",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_1_PAX_3",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        },
                        {
                            "segmentRefId": "SEG_M_2",
                            "priceClassRefId": "PC_9",
                            "baggageDetailsRefId": "FBA4_SEG_2_PAX_3",
                            "cabinCode": "BUSINESS",
                            "rbd": "J"
                        }
                    ],
                    "discount": null
                }
```

```
            ],
            "priceDetails": {
                "totalAmount": {
                    "amount": 185978.80,
                    "currency": "EGP"
                },
                "totalTaxAmount": {
                    "amount": 62100.80,
                    "currency": "EGP"
                },
                "totalBaseAmount": {
                    "amount": 123878.00,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 2400.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 642.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 600.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 90.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 324.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q7",
                        "amount": {
                            "amount": 12.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 7968.00,
                            "currency": "EGP"
                        }
                    },
```

```
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 900.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 64.80,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YR",
                        "amount": {
                            "amount": 42496.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 848.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "M6",
                        "amount": {
                            "amount": 752.00,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "TR",
                        "amount": {
                            "amount": 5004.00,
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
    ]
}
BookAfterHold Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "pnr": "{{pnr}}",
    "gdsPnr": "{{gdsPNR}}",
    "bookingToken": "{{bookingToken}}"
}
```

```
BookAfterHold Responce:
{
    "tickets": {},
    "creationDate": "2026-05-05T00:00:00",
    "isBspCommissionApplied": false,
    "supplier": "TravelportNdc",
    "pnr": "HD2NHB",
    "gdsPNR": "GBR9DS",
    "bookingToken": "62db3ef8-1d54-4203-88f6-9ee45ad7e970",
    "journeys": {
        "Flight_01?Flight_02": {
            "origin": "CAI",
            "destination": "JED",
            "numberOfStops": 1,
            "segmentRefIds": [
                "Flight_01",
                "Flight_02"
            ]
        }
    },
    "flightSegments": {
        "Flight_01": {
            "origin": "CAI",
            "destination": "DXB",
            "departureDateTime": "2026-06-02T02:45:00",
            "arrivalDateTime": "2026-06-02T07:10:00",
            "departureTerminal": "2",
            "arrivalTerminal": "3",
            "flightTime": 205,
            "operatingCarrierCode": "EK",
            "operatingFlightNumber": "926",
            "marketingCarrierCode": "EK",
            "marketingFlightNumber": "926",
            "equipment": "388"
        },
        "Flight_02": {
            "origin": "DXB",
            "destination": "JED",
            "departureDateTime": "2026-06-02T15:45:00",
            "arrivalDateTime": "2026-06-02T17:45:00",
            "departureTerminal": "3",
            "arrivalTerminal": "1",
            "flightTime": 180,
            "operatingCarrierCode": "EK",
            "operatingFlightNumber": "803",
            "marketingCarrierCode": "EK",
            "marketingFlightNumber": "803",
            "equipment": "388"
        }
    },
    "priceClasses": {
        "INF_Flight_01": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
            "rulesAndPenalties": []
        },
        "ADT_Flight_01": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
            "rulesAndPenalties": []
        },
        "CNN_Flight_01": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
```

```
            "rulesAndPenalties": []
        },
        "INF_Flight_02": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
            "rulesAndPenalties": []
        },
        "ADT_Flight_02": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
            "rulesAndPenalties": []
        },
        "CNN_Flight_02": {
            "priceClassName": "Economy Saver",
            "fareDescription": "PrivateFare",
            "rulesAndPenalties": []
        }
    },
    "baggageDetails": {
        "product_11INF": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 5 Kilograms , Weight 11
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY5KG 11LBUPTO 45LI
115LCM , 1PC",
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , Height 115 Centimeters , Height 45 Inches , UPTO50LB 23KG
AND45LI 115LCM , 1PC"
```

```
        },
        "product_12INF": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 5 Kilograms , Weight 11
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY5KG 11LBUPTO 45LI
115LCM , 1PC",
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , Height 115 Centimeters , Height 45 Inches , UPTO50LB 23KG
AND45LI 115LCM , 1PC"
```

```
        },
        "product_11ADT": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 7 Kilograms , Weight 15
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY7KG 15LB UPTO45LI
115LCM , 1PC",
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM , 2PC || SecondCheckedBag: 1
piece , Weight 50 Pounds , Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM ,
2PC"
```

```
        },
        "product_12ADT": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 7 Kilograms , Weight 15
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY7KG 15LB UPTO45LI
115LCM , 1PC",
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM , 2PC || SecondCheckedBag: 1
piece , Weight 50 Pounds , Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM ,
2PC"
```

```
        },
        "product_11CNN": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 7 Kilograms , Weight 15
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY7KG 15LB UPTO45LI
115LCM , 1PC",
```

```
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM , 2PC || SecondCheckedBag: 1
piece , Weight 50 Pounds , Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM ,
2PC"
```

```
        },
        "product_12CNN": {
            "carryOnBaggage": "CarryOn: 1 piece , Weight 7 Kilograms , Weight 15
```

```
Pounds , Height 115 Centimeters , Height 45 Inches , CARRY7KG 15LB UPTO45LI
115LCM , 1PC",
            "checkInBaggage": "FirstCheckedBag: 1 piece , Weight 50 Pounds ,
Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM , 2PC || SecondCheckedBag: 1
piece , Weight 50 Pounds , Weight 23 Kilograms , UPTO50LB 23KG MAX59IN 150CM ,
2PC"
        }
    },
    "passengersList": {
        "travelerRefId_1": {
            "title": "MISS",
            "name": {
                "first": "LAILA OMAR",
                "middle": null,
                "last": "IBRAHIM"
            },
            "birthDate": "2016-03-10T00:00:00",
            "gender": "Female",
            "passengerTypeCode": "CHD",
            "contactRefId": "travelerRefId_1",
            "travelDocument": {
                "name": {
                    "first": "LAILA OMAR",
                    "middle": null,
                    "last": "IBRAHIM"
                },
                "nationality": null,
                "expirationDate": "2029-01-22T00:00:00",
                "issuanceDate": "2021-03-10T00:00:00",
                "documentNumber": "F2233445",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "2016-03-10T00:00:00",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": null,
            "nationality": null,
            "residentCountry": null,
            "age": null
        },
        "travelerRefId_2": {
            "title": "MR",
            "name": {
                "first": "MOSTAFA",
                "middle": null,
                "last": "IBRAHIM"
            },
            "birthDate": "2000-02-15T00:00:00",
            "gender": "Male",
            "passengerTypeCode": "ADT",
            "contactRefId": "travelerRefId_2",
            "travelDocument": {
                "name": {
                    "first": "MOSTAFA",
                    "middle": null,
                    "last": "IBRAHIM"
                },
                "nationality": null,
                "expirationDate": "2029-10-01T00:00:00",
                "issuanceDate": "2023-10-01T00:00:00",
                "documentNumber": "A1234561",
                "documentType": "Passport",
                "gender": "Male",
```

```
                "birthCountry": "EG",
                "birthDate": "2000-02-15T00:00:00",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": null,
            "nationality": null,
            "residentCountry": null,
            "age": null
        },
        "travelerRefId_3": {
            "title": "MS",
            "name": {
                "first": "LINA",
                "middle": null,
                "last": "IBRAHIM"
            },
            "birthDate": "2025-01-05T00:00:00",
            "gender": "Female",
            "passengerTypeCode": "INF",
            "contactRefId": "travelerRefId_3",
            "travelDocument": {
                "name": {
                    "first": "LINA",
                    "middle": null,
                    "last": "IBRAHIM"
                },
                "nationality": null,
                "expirationDate": "2029-01-04T00:00:00",
                "issuanceDate": "2025-01-10T00:00:00",
                "documentNumber": "INF1234501",
                "documentType": "Passport",
                "gender": "Female",
                "birthCountry": "EG",
                "birthDate": "2025-01-05T00:00:00",
                "issuanceCountryCode": "EG"
            },
            "parentPaxRefId": null,
            "nationality": null,
            "residentCountry": null,
            "age": null
        }
    },
    "contacts": {
        "travelerRefId_1": {
            "email": null,
            "phone": {
                "type": "Other",
                "countryDialingCode": null,
                "phoneNumber": "971509700784"
            },
            "address": {
                "line1": "FZ HQ",
                "line2": "FZ HQ",
                "city": "DUBAI",
                "countryCode": "AE"
            }
        },
        "travelerRefId_2": {
            "email": "MOONTRAVEL626@GMAIL.COM",
            "phone": {
                "type": "Other",
                "countryDialingCode": null,
                "phoneNumber": "971509700784"
            },
```

```
            "address": null
        },
        "travelerRefId_3": {
            "email": "MOONTRAVEL626@GMAIL.COM",
            "phone": {
                "type": "Other",
                "countryDialingCode": null,
                "phoneNumber": "971509700784"
            },
            "address": null
        }
    },
    "selectedOffer": {
        "offerId": "offer_1",
        "offerJourneys": [
            "Flight_01?Flight_02"
        ],
        "passengerFareBreakdown": [
            {
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 445,
                    "currency": "AED"
                },
                "paxBaseAmount": {
                    "amount": 1390,
                    "currency": "AED"
                },
                "taxesAndFees": [
                    {
                        "code": "YQ",
                        "amount": {
                            "amount": 190,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "E3",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "F6",
                        "amount": {
                            "amount": 50,
                            "currency": "AED"
                        }
                    },
```

```
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 100,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "ZR",
                        "amount": {
                            "amount": 5,
                            "currency": "AED"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "Flight_01",
                        "priceClassRefId": "ADTFlight_01",
                        "baggageDetailsRefId": "product_11ADT",
                        "cabinCode": "Economy",
                        "rbd": "Q"
                    },
                    {
                        "segmentRefId": "Flight_02",
                        "priceClassRefId": "ADTFlight_02",
                        "baggageDetailsRefId": "product_12ADT",
                        "cabinCode": "Economy",
                        "rbd": "Q"
```

```
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 445,
                    "currency": "AED"
                },
                "paxBaseAmount": {
                    "amount": 1040,
                    "currency": "AED"
                },
                "taxesAndFees": [
                    {
                        "code": "YQ",
                        "amount": {
                            "amount": 190,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "E3",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "F6",
                        "amount": {
                            "amount": 50,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
```

```
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 100,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "ZR",
                        "amount": {
                            "amount": 5,
                            "currency": "AED"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "Flight_01",
                        "priceClassRefId": "CNNFlight_01",
                        "baggageDetailsRefId": "product_11CNN",
                        "cabinCode": "Economy",
                        "rbd": "Q"
                    },
                    {
                        "segmentRefId": "Flight_02",
                        "priceClassRefId": "CNNFlight_02",
                        "baggageDetailsRefId": "product_12CNN",
                        "cabinCode": "Economy",
                        "rbd": "Q"
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 190,
                    "currency": "AED"
                },
                "paxBaseAmount": {
                    "amount": 140,
                    "currency": "AED"
                },
```

```
                "taxesAndFees": [
                    {
                        "code": "E3",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EG",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 10,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 100,
                            "currency": "AED"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 20,
                            "currency": "AED"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "Flight_01",
                        "priceClassRefId": "INFFlight_01",
                        "baggageDetailsRefId": "product_11INF",
                        "cabinCode": "Economy",
```

```
                        "rbd": "Q"
                    },
                    {
                        "segmentRefId": "Flight_02",
                        "priceClassRefId": "INFFlight_02",
                        "baggageDetailsRefId": "product_12INF",
                        "cabinCode": "Economy",
                        "rbd": "Q"
                    }
                ],
                "discount": null
            }
        ],
        "priceDetails": {
            "totalAmount": {
                "amount": 3650,
                "currency": "AED"
            },
            "totalTaxAmount": {
                "amount": 1080,
                "currency": "AED"
            },
            "totalBaseAmount": {
                "amount": 2570,
                "currency": "AED"
            },
            "taxesAndFees": [
                {
                    "code": "YQ",
                    "amount": {
                        "amount": 380,
                        "currency": "AED"
                    }
                },
                {
                    "code": "E3",
                    "amount": {
                        "amount": 30,
                        "currency": "AED"
                    }
                },
                {
                    "code": "EG",
                    "amount": {
                        "amount": 60,
                        "currency": "AED"
                    }
                },
                {
                    "code": "EQ",
                    "amount": {
                        "amount": 30,
                        "currency": "AED"
                    }
                },
                {
                    "code": "F6",
                    "amount": {
                        "amount": 100,
                        "currency": "AED"
                    }
                },
                {
                    "code": "JK",
```

```
                    "amount": {
                        "amount": 30,
                        "currency": "AED"
                    }
                },
                {
                    "code": "O2",
                    "amount": {
                        "amount": 30,
                        "currency": "AED"
                    }
                },
                {
                    "code": "O9",
                    "amount": {
                        "amount": 30,
                        "currency": "AED"
                    }
                },
                {
                    "code": "QH",
                    "amount": {
                        "amount": 300,
                        "currency": "AED"
                    }
                },
                {
                    "code": "S4",
                    "amount": {
                        "amount": 20,
                        "currency": "AED"
                    }
                },
                {
                    "code": "XK",
                    "amount": {
                        "amount": 60,
                        "currency": "AED"
                    }
                },
                {
                    "code": "ZR",
                    "amount": {
                        "amount": 10,
                        "currency": "AED"
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
    }
}
Void Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
```

```
    "pnr": "{{pnr}}",
    "gdsPNR": "{{gdsPNR}}",
    "bookingToken": "{{bookingToken}}",
    "surName": "Tallat",
    "voidTickets": [
    ]
}
Void Responce:
{
    "voided": true,
    "voidedTickets": [
        {
            "ticketStatus": "Voided",
            "ticketNumber": "91022010236592",
            "carrierCode": "WY"
        },
        {
            "ticketStatus": "Voided",
            "ticketNumber": "91022010236603",
            "carrierCode": "WY"
        },
        {
            "ticketStatus": "Voided",
            "ticketNumber": "91022010236614",
            "carrierCode": "WY"
        }
    ],
    "passengersVoidedAncillaries": {}
}
FareConfirmAfterHold Request:
{
    "supplier": "{{Supplier_Name}}",
    "credentialsSelector": "{{Credentials_Selector}}",
    "pnr": "{{pnr}}",
    "gdsPNR": "{{gdsPNR}}",
    "bookingToken": "{{bookingToken}}",
    "surName": ""
}
FareConfirmAfterHoldResponce:
{
    "supplier": "SabreAtpco",
    "journeys": {
        "1": {
            "origin": "CAI",
            "destination": "JED",
            "numberOfStops": 1,
            "segmentRefIds": [
                "1",
                "2"
            ]
        }
    },
    "flightSegments": {
        "1": {
            "origin": "CAI",
            "destination": "MCT",
            "departureDateTime": "2026-07-10T18:50:00",
            "arrivalDateTime": "2026-07-10T23:45:00",
            "departureTerminal": "2",
            "arrivalTerminal": "",
            "flightTime": 235,
            "operatingCarrierCode": "WY",
            "operatingFlightNumber": "406",
```

```
            "marketingCarrierCode": "WY",
            "marketingFlightNumber": "406",
            "equipment": "7M8"
        },
        "2": {
            "origin": "MCT",
            "destination": "JED",
            "departureDateTime": "2026-07-11T10:55:00",
            "arrivalDateTime": "2026-07-11T13:15:00",
            "departureTerminal": "",
            "arrivalTerminal": "1",
            "flightTime": 200,
            "operatingCarrierCode": "WY",
            "operatingFlightNumber": "689",
            "marketingCarrierCode": "WY",
            "marketingFlightNumber": "689",
            "equipment": "738"
        }
    },
    "priceClasses": {
        "1": {
            "priceClassName": "RCMOEGIN",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "CANCELLATION",
                "CHANGE FEE",
                "NO SHOW",
                "BASIC SEAT",
                "PREMIUM SEAT",
                "MILES EARNING",
                "MILES UPGRADE",
                "CABIN BAG 7KG X 1",
                "CABIN BAG 7KG X 2",
                "CHECKED BAG",
                "3 HOURS LOUNGE ACCESS",
                "MEAL 1",
                "EASY PASS",
                "SECURITY FAST TRACK",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> Before), (PenaltyChangeable => True), (PenaltyAmount => 0), (PenaltyCurrency
=> EGP), ",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> After), (PenaltyChangeable => True), (PenaltyAmount => 0), (PenaltyCurrency
=> EGP), ",
```

```
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
Before), (PenaltyRefundable => True), (PenaltyAmount => 0), (PenaltyCurrency =>
EGP), ",
```

```
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
After), (PenaltyRefundable => True), (PenaltyAmount => 0), (PenaltyCurrency =>
EGP), "
            ]
        },
        "2": {
            "priceClassName": "RCMOEG",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "CANCELLATION",
                "CHANGE FEE",
                "NO SHOW",
                "BASIC SEAT",
                "PREMIUM SEAT",
                "MILES EARNING",
                "MILES UPGRADE",
                "CABIN BAG 7KG X 1",
```

```
                "CABIN BAG 7KG X 2",
                "CHECKED BAG",
                "3 HOURS LOUNGE ACCESS",
                "MEAL 1",
                "EASY PASS",
                "SECURITY FAST TRACK",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> Before), (PenaltyChangeable => True), (PenaltyAmount => 2565),
(PenaltyCurrency => EGP), ",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> After), (PenaltyChangeable => True), (PenaltyAmount => 2565),
(PenaltyCurrency => EGP), ",
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
Before), (PenaltyRefundable => True), (PenaltyAmount => 8975), (PenaltyCurrency
=> EGP), ",
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
After), (PenaltyRefundable => True), (PenaltyAmount => 8975), (PenaltyCurrency
=> EGP), "
            ]
        },
        "3": {
            "priceClassName": "RCMOEGCH",
            "fareDescription": "PublicFare",
            "rulesAndPenalties": [
                "CANCELLATION",
                "CHANGE FEE",
                "NO SHOW",
                "BASIC SEAT",
                "PREMIUM SEAT",
                "MILES EARNING",
                "MILES UPGRADE",
                "CABIN BAG 7KG X 1",
                "CABIN BAG 7KG X 2",
                "CHECKED BAG",
                "3 HOURS LOUNGE ACCESS",
                "MEAL 1",
                "EASY PASS",
                "SECURITY FAST TRACK",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> Before), (PenaltyChangeable => True), (PenaltyAmount => 2565),
(PenaltyCurrency => EGP), ",
                "Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability
=> After), (PenaltyChangeable => True), (PenaltyAmount => 2565),
(PenaltyCurrency => EGP), ",
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
Before), (PenaltyRefundable => True), (PenaltyAmount => 8975), (PenaltyCurrency
=> EGP), ",
                "Penalty Rule: (PenaltyType => Refund), (PenaltyApplicability =>
After), (PenaltyRefundable => True), (PenaltyAmount => 8975), (PenaltyCurrency
=> EGP), "
            ]
        }
    },
    "baggageDetails": {
        "0": {
            "carryOnBaggage": "1 pieces/ UP TO 15 POUNDS/7 KILOGRAMS/ UP TO 41
LINEAR INCHES/105 LINEAR CENTIMETERS/ Weight: 7/ Weight Unit: kg/ ",
            "checkInBaggage": "Weight: 30/ Weight Unit: kg/ "
        },
        "1": {
            "carryOnBaggage": "",
            "checkInBaggage": "Weight: 10/ Weight Unit: kg/ "
        }
    },
```

```
    "selectedOffer": {
        "offerId": "bdb0bc5f-1e47-4b21-811f-5dd9a240af00",
        "offerJourneys": [
            "1"
        ],
        "passengerFareBreakdown": [
            {
                "passengerTypeCode": "ADT",
                "paxTotalTaxAmount": {
                    "amount": 6118.8,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 13462.0,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "YQF",
                        "amount": {
                            "amount": 2318,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YQI",
                        "amount": {
                            "amount": 258,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YRF",
                        "amount": {
                            "amount": 988,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EG3",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 99,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 100,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 15,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 50,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q73",
                        "amount": {
                            "amount": 2,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 1233,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 99,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 10.8,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "I2",
                        "amount": {
                            "amount": 129,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "OM2",
                        "amount": {
                            "amount": 129,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S6",
                        "amount": {
                            "amount": 283,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "E32",
                        "amount": {
                            "amount": 105,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "1",
                        "priceClassRefId": "2",
                        "baggageDetailsRefId": "0",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    },
                    {
                        "segmentRefId": "2",
                        "priceClassRefId": "2",
                        "baggageDetailsRefId": "0",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "CHD",
                "paxTotalTaxAmount": {
                    "amount": 6118.8,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 10750.0,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "YQF",
                        "amount": {
                            "amount": 2318,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YQI",
                        "amount": {
                            "amount": 258,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "YRF",
                        "amount": {
                            "amount": 988,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EG3",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 99,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 100,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 15,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 50,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q73",
                        "amount": {
                            "amount": 2,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 1233,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S4",
                        "amount": {
                            "amount": 99,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 10.8,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "I2",
                        "amount": {
                            "amount": 129,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "OM2",
                        "amount": {
                            "amount": 129,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "S6",
                        "amount": {
                            "amount": 283,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E32",
                        "amount": {
                            "amount": 105,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "1",
                        "priceClassRefId": "3",
                        "baggageDetailsRefId": "0",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    },
                    {
                        "segmentRefId": "2",
                        "priceClassRefId": "3",
                        "baggageDetailsRefId": "0",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    }
                ],
                "discount": null
            },
            {
                "passengerTypeCode": "INF",
                "paxTotalTaxAmount": {
                    "amount": 3185.8,
                    "currency": "EGP"
                },
                "paxBaseAmount": {
                    "amount": 1332.0,
                    "currency": "EGP"
                },
                "taxesAndFees": [
                    {
                        "code": "YRF",
                        "amount": {
                            "amount": 988,
                            "currency": "EGP"
```

```
                        }
                    },
                    {
                        "code": "EG3",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "EQ",
                        "amount": {
                            "amount": 99,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "JK",
                        "amount": {
                            "amount": 100,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O2",
                        "amount": {
                            "amount": 15,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "O9",
                        "amount": {
                            "amount": 50,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "Q73",
                        "amount": {
                            "amount": 2,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "QH",
                        "amount": {
                            "amount": 1233,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XK",
                        "amount": {
                            "amount": 150,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "XL",
                        "amount": {
                            "amount": 10.8,
                            "currency": "EGP"
                        }
```

```
                    },
                    {
                        "code": "S6",
                        "amount": {
                            "amount": 283,
                            "currency": "EGP"
                        }
                    },
                    {
                        "code": "E32",
                        "amount": {
                            "amount": 105,
                            "currency": "EGP"
                        }
                    }
                ],
                "segmentDetails": [
                    {
                        "segmentRefId": "1",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    },
                    {
                        "segmentRefId": "2",
                        "priceClassRefId": "1",
                        "baggageDetailsRefId": "1",
                        "cabinCode": "ECONOMY",
                        "rbd": "R"
                    }
                ],
                "discount": null
            }
        ],
        "priceDetails": {
            "totalAmount": {
                "amount": 40967.4,
                "currency": "EGP"
            },
            "totalTaxAmount": {
                "amount": 15423.4,
                "currency": "EGP"
            },
            "totalBaseAmount": {
                "amount": 25544.0,
                "currency": "EGP"
            },
            "taxesAndFees": [
                {
                    "code": "YQF",
                    "amount": {
                        "amount": 4636,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "YQI",
                    "amount": {
                        "amount": 516,
                        "currency": "EGP"
                    }
                },
                {
```

```
                    "code": "YRF",
                    "amount": {
                        "amount": 2964,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "EG3",
                    "amount": {
                        "amount": 450,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "EQ",
                    "amount": {
                        "amount": 297,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "JK",
                    "amount": {
                        "amount": 300,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "O2",
                    "amount": {
                        "amount": 45,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "O9",
                    "amount": {
                        "amount": 150,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "Q73",
                    "amount": {
                        "amount": 6,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "QH",
                    "amount": {
                        "amount": 3699,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "S4",
                    "amount": {
                        "amount": 198,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "XK",
```

```
                    "amount": {
                        "amount": 450,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "XL",
                    "amount": {
                        "amount": 32.4,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "I2",
                    "amount": {
                        "amount": 258,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "OM2",
                    "amount": {
                        "amount": 258,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "S6",
                    "amount": {
                        "amount": 849,
                        "currency": "EGP"
                    }
                },
                {
                    "code": "E32",
                    "amount": {
                        "amount": 315,
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
        "refundability": "PartiallyRefundable",
        "haveBundles": false,
        "canBeHeld": false
    }
}
CaneclHold Request:
{
  "supplier": "{{Supplier_Name}}",
  "credentialsSelector": "{{Credentials_Selector}}",
  "pnr": "{{pnr}}",
  "gdsPNR": "{{gdsPNR}}",
  "bookingToken": "{{bookingToken}}",
  "surName": "Tallat"
}
CancelHold Responce:
{
```

```
    "cancelled": true,
    "message": "Order : IMWJRN is Canceled"
}
```

