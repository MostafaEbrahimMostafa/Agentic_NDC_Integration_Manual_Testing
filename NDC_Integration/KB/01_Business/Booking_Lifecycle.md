# Booking Lifecycle

How a booking moves through the API, from Search to its final state. The **contract** for each step
is in SPEC.md §2; the **ID hand-off** between steps is SPEC §3.3; the **expected state per flow
family** is SPEC §6.3. This page is the picture that ties them together.

## 1. The chain

```
                    ┌──────────────┐
                    │    Search    │  offers[]  (searchResponseId, offerId)
                    └──────┬───────┘
                           ▼
              ┌─────────────────────────┐
              │ FareConfirm  or Upselling│  re-priced offer (fareConfirmResponseId, selectedOfferId)
              └──────┬──────────────────┘
                     │  optional: GetOfferBundles (if haveBundles)
                     ▼
   V1 ───────────────┼───────────────── V2
   (passengers go    │                 AddPassenger
    inside Book/Hold)│                    │ optional enrichment:
                     │                    │  GetAncillary · SeatMap · FareCheck
                     ▼                    ▼
          ┌──────────────────┐    ┌──────────────────┐
          │       Book       │    │       Hold       │  (if canBeHeld)
          │ (pay + ticket)   │    │ (reserve, expiry)│
          └────────┬─────────┘    └────────┬─────────┘
                   │                       │  Retrieve
                   │                       ▼
                   │              FareConfirmAfterHold (PnrReprice)
                   │                       │  Retrieve
                   │            ┌──────────┴───────────┐
                   │            ▼                      ▼
                   │      BookAfterHold          CancelAfterHold
                   │            │                      │
                   ▼            ▼                      ▼
                Retrieve ──► Void (if allowed)     Cancelled
```

## 2. States

```
                Hold                 BookAfterHold
   (none) ───────────────► OnHold ─────────────────► Booked/Ticketed ──Void──► Voided / Cancelled
     │                       │                              ▲
     │                       │ CancelAfterHold              │
     │                       ▼                              │
     │                   Cancelled                          │
     │                       ▲                              │
     │        hold expires   │                              │
     │      (OnHold → expired, supplier-defined)            │
     └──────────────────────── Book ────────────────────────┘
```

| State | How you get there | What should be true | SPEC |
|---|---|---|---|
| Offer | Search / FareConfirm | Price reconciles (base + taxes = total), flags (`haveBundles`, `canBeHeld`, `offerHasAncillary`, `offerHasSeat`) present | §2.1, §2.2 |
| OnHold | Hold | `pnr`/`gdsPNR`, `bookingToken`, `holdExpirationDate`; no ticket; `voidCapability` = `VoidNotAllowed` | §2.10, §6.3 B |
| Booked / Ticketed | Book or BookAfterHold | Ticket numbers; `voidCapability` present; Retrieve shows the same price and passengers | §2.9, §2.13, §6.3 A/D |
| Voided | Void on a ticketed booking | `voided: true`; Retrieve shows cancelled; second Void rejected | §2.15, §6.3 C/E |
| Cancelled (hold) | CancelAfterHold | `cancelled: true`; Retrieve should no longer say OnHold | §2.14, §6.3 F |

## 3. Business rules worth knowing before you test

- **Capability gates the chain.** Not every supplier supports Hold, Void, bundles, ancillaries or
  seat maps. Check the supplier file in [../02_Suppliers/](../02_Suppliers/README.md) and SPEC §4.6
  before scheduling a flow; unsupported steps return `409 OperationNotSupported` → the test is
  BLOCKED, not FAIL.
- **IDs must chain.** Each call carries the previous step's ids. Using ids from a different search,
  supplier or selector is a negative test (expected: rejection). Many suppliers wrongly accept a
  wrong `ResponseId` — a recurring defect pattern.
- **Seats & ancillaries in V2** are chosen after AddPassenger and must be sent on FareCheck *and*
  Book, or the totals will not match (see AirArabiaPlus lessons).
- **Hold has an expiry.** Post-expiry cases (BookAfterHold on an expired hold) can only run after the
  deadline — plan them across days.
- **Void has a window.** Usually same day; "Void a ticket from yesterday" needs bookings left overnight.
- **Every hold or ticket is real on the supplier side.** Cancel/void what you can; list the rest
  in the report's Cleanup section.
- **Price must stay consistent** from FareConfirm → (FareCheck) → Book → Retrieve. A mismatch is a
  defect, but first check that you sent the same selections on every step.
