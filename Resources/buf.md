[V2][AirArabiaPlus][Book] – paxTotalAncillaryAmount Differs Between Book/FareCheck and Retrieve for the Same Booking


📄 Description
For a bundle booking with a child, FareCheck and Book report paxTotalAncillaryAmount 399.52 per passenger (totalAncillariesAmount 799.04) while Retrieve reports 297.44 (594.88) for the same booking. The grand total (12529.66) is identical in all three, and paxTotalAmount only adds up with the Retrieve figure (1352 + 3376.62 + 297.44 + 811.2 = 5837.26).

Affected test cases: OW-BUN-02, RT-BUN-01 (run 20261109-084356_AirArabiaPlus-USA-OneAPI-Regression-ne6).

🔁 Steps to Reproduce
Search COK-SHJ or SHJ-COK for 1 ADT + 1 CHD + 1 INF → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary(selectedBundles) → SeatMap → FareCheck → Book → Retrieve.
❌ Actual Result
Book/FareCheck: "paxTotalAncillaryAmount": 399.52   |   Retrieve: "paxTotalAncillaryAmount": 297.44

Invoices and receipts built from the breakdown disagree with the total; price-reconciliation checks fail (OW-BUN-02, RT-BUN-01).

✅ Expected Result
the same ancillary amount in every response; paxTotalAmount = base + tax + ancillary + bundle

SPEC §2.1 reconciliation: per-passenger parts must add up to paxTotalAmount.

