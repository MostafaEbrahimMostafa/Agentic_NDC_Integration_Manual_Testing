# Bug reports — SeatMap_TestCases.csv run, FlyAdeal / EGY (2026-08-25)

Source run: `NDC_Integration/Artifacts/Logs/20260825-121852_SeatMap-FlyAdeal-EGY.{jsonl,md}`

- [BUG-01](BUG-01_GetSeatMap_isSeatMapRequired.md) — GetSeatMap returns an unhandled 500 ServerError (instead of a graceful rejection) when the offer's `isSeatMapRequired` flag is false. Medium severity.
- [BUG-02](BUG-02_GetSeatMap_ResponseId.md) — GetSeatMap returns an unhandled 500 ServerError (instead of a 400 validation error) when the mandatory `ResponseId` field is omitted, inconsistent with how the other three mandatory fields are validated. Low severity.
