# =====================================================================================
#  NdcV1.Extracted.ps1  -  REUSABLE, pre-extracted constants from the Postman artifacts
# =====================================================================================
#  Purpose: so an execution run never has to re-parse the Postman collection/environment.
#  Dot-source this, then dot-source NdcV1.Harness.ps1.
#
#  Source of truth (re-run Update-NdcExtracted.ps1 if any of these change):
#    Postman_Collection/Collection_V1/NDC_Integrations_Staging_Scripts_V1.postman_collection.json
#    Postman_Collection/Environment/STAG_ENV.postman_environment.json
#  Extracted: 2026-08-05
#
#  ASCII-only source on purpose: Windows PowerShell 5.1 reads .ps1 as ANSI, so a
#  UTF-8 em dash in this file becomes a parse error. Do not paste smart quotes/dashes here.
# =====================================================================================

# ---------------------------------------------------------------- environments
# STAG_ENV.postman_environment.json values
$Global:NdcEnvs = @{
  STAG = @{
    Name     = "STAG_ENV (canonical staging from the Postman environment file)"
    BaseUrl  = "https://ndc-integration-stg-ne-3.azurewebsites.net/"
    Supplier = "TravelportNdc"
    CredSel  = "UAE"
    IsStaging = $true
  }
  # Alternate staging deployment used in the 2026-08-05 run; user-confirmed as a safe
  # (non-production) target and explicitly authorized for booking endpoints that run.
  SUPPLIER_STG = @{
    Name     = "ndc-supplier-integration-staging (alternate staging deployment)"
    BaseUrl  = "https://ndc-supplier-integration-staging.azurewebsites.net/"
    Supplier = "TravelportNdc"
    CredSel  = "UAE"
    IsStaging = $true
  }
}

# ---------------------------------------------------------------- headers (SPEC 1.5)
# Static staging key extracted from Collection_V1's request headers.
# Staging-only credential. Do not put a production key in this file.
$Global:NdcHeaders = @{
  "x-api-key" = "ttdb2dc2-58c5-481c-84b5-95350a3a7978-f61360c2-f536-4b19-9a25-97b8f17ce4dc"
  "Client-Id" = "NDC-Core"
}

# ---------------------------------------------------------------- V1 endpoint paths
# Exact paths/casing from the saved Collection_V1 requests (SPEC 1.2 / 2.n).
# NOTE: Upselling is saved as {{requestUrl}}api/FlightSearch/UpSelling in the collection --
# requestUrl is an unset environment variable (SPEC 2.3 defect). The path below is the
# corrected form; the defect itself is reproduced deliberately by TC-UPSELL-NEG-01 /
# FLOW-V1-08-NEG by passing -OverrideBaseUrl "".
$Global:NdcV1Paths = @{
  Search        = "api/FlightSearch/Search"
  FareConfirm   = "api/FlightSearch/FareConfirm"
  Upselling     = "api/FlightSearch/UpSelling"
  Bundles       = "api/bundles/GetOfferBundles"
  Book          = "api/FlightBooking/Book"
  Hold          = "api/FlightBooking/Hold"
  Retrieve      = "api/FlightBooking/RetrieveBooking"
  PnrReprice    = "api/FlightBooking/PnrReprice"
  BookAfterHold = "api/FlightBooking/BookAfterHold"
  CancelHold    = "api/FlightBooking/CancelAfterHold"
  Void          = "api/FlightBooking/Void"
}

# Collection request name -> endpoint key, for traceability back to the collection
$Global:NdcV1RequestNames = @{
  Search        = "CI_FlightSearchRequest"
  FareConfirm   = "CI_FareConfirmRequest"
  Upselling     = "CI_UpsellingRQ"
  Bundles       = "GetOfferBundles"
  Book          = "CI_FlightBookRequest"
  Hold          = "CI_FlightHoldRequest"
  Retrieve      = "CI_RetreiveBooking"
  PnrReprice    = "CI_FareConfirmAfterHold"
  BookAfterHold = "CI_BookAfterHold"
  CancelHold    = "CI_CancelHold"
  Void          = "CI_Void"
}

# ---------------------------------------------------------------- test passenger data
# From CI_FlightBookRequest's passengersList. The saved body has Pax1..Pax14 defined but
# ONLY Pax1 (ADT), Pax6 (CHD), Pax10 (INF) are uncommented -- i.e. the collection's real
# active default is 1 ADT / 1 CHD / 1 INF, NOT the 2/2/2 the TestCases CSV notes claim.
# Search's passenger counts must match this set, so use Get-NdcPax111 for the search body.
function Get-NdcPassengersList {
  return @{
    "Pax1" = @{
      title = "Mr"
      name = @{ first = "Mostafa"; middle = ""; last = "Ibrahim" }
      nationality = "EG"; residentCountry = "EG"
      birthDate = "2000-02-15T00:00:00.000Z"; gender = "male"
      passengerTypeCode = "ADT"; contactRefId = "0"
      travelDocument = @{
        name = @{ first = "Mostafa"; middle = ""; last = "Ibrahim" }
        nationality = "EG"; expirationDate = "2029-10-01T00:00:00.000Z"
        issuanceDate = "2023-10-01T00:00:00.000Z"; documentNumber = "A1234561"
        documentType = "PASSPORT"; gender = "male"; birthCountry = "EG"
        birthDate = "2000-02-15T00:00:00.000Z"; issuanceCountryCode = "EG"
      }
    }
    "Pax6" = @{
      title = "Miss"
      name = @{ first = "Laila"; middle = "Omar"; last = "Ibrahim" }
      nationality = "EG"; residentCountry = "EG"
      birthDate = "2016-03-10T00:00:00.000Z"; gender = "female"
      passengerTypeCode = "CHD"; contactRefId = "0"
      travelDocument = @{
        name = @{ first = "Laila"; middle = "Omar"; last = "Ibrahim" }
        nationality = "EG"; expirationDate = "2029-01-22T00:00:00.000Z"
        issuanceDate = "2021-03-10T00:00:00.000Z"; documentNumber = "F2233445"
        documentType = "PASSPORT"; gender = "female"; birthCountry = "EG"
        birthDate = "2016-03-10T00:00:00.000Z"; issuanceCountryCode = "EG"
      }
    }
    "Pax10" = @{
      title = "MS"
      name = @{ first = "Lina"; middle = "KADY"; last = "Ibrahim" }
      nationality = "EG"; residentCountry = "EG"
      birthDate = "2025-01-05T00:00:00.000Z"; gender = "female"
      passengerTypeCode = "INF"; ParentPaxRefId = "Pax1"; contactRefId = "0"
      travelDocument = @{
        name = @{ first = "Lina"; middle = "KADY"; last = "Ibrahim" }
        nationality = "EG"; expirationDate = "2029-01-04T00:00:00.000Z"
        issuanceDate = "2025-01-10T00:00:00.000Z"; documentNumber = "INF1234501"
        documentType = "PASSPORT"; gender = "female"; birthCountry = "EG"
        birthDate = "2025-01-05T00:00:00.000Z"; issuanceCountryCode = "EG"
      }
    }
  }
}

function Get-NdcContactsList {
  return @{
    "0" = @{
      Email = "moontravel626@gmail.com"
      phone = @{ type = "Mobile"; countryDialingCode = "+20"; phoneNumber = "01005747258" }
      Address = @{ Line1 = "FZ HQ"; Line2 = "FZ HQ"; City = "DUBAI"; CountryCode = "EG" }
    }
  }
}

# Passenger mix matching the active passengersList above (1 ADT / 1 CHD / 1 INF)
function Get-NdcPax111 {
  @(@{passengerTypeCode="ADT";count=1},
    @{passengerTypeCode="CHD";count=1},
    @{passengerTypeCode="INF";count=1})
}

# Surname of the ADT test passenger -- Void/PnrReprice surName matching (SPEC 2.15)
$Global:NdcTestSurname = "Ibrahim"

# Default search route/date used by the collection-style search
$Global:NdcDefaultRoute = @{ Origin = "CAI"; Destination = "JED"; Date = "2026-09-15" }

# ---------------------------------------------------------------- known collection defects
# Pre-recorded so a run does not have to re-derive them (SPEC 2.3 / 2.10 / 2.14).
$Global:NdcKnownCollectionDefects = @(
  @{ id = "COLL-01"; spec = "2.3";  endpoint = "Upselling (V1)"
     detail = "Saved URL uses {{requestUrl}}, an unset environment variable, so the URL resolves with an empty host." }
  @{ id = "COLL-02"; spec = "2.10"; endpoint = "Hold (V2)"
     detail = "Saved body references {{credentialsSelector}} (lowercase) but the env var is Credentials_Selector." }
  @{ id = "COLL-03"; spec = "2.14"; endpoint = "CancelAfterHold (V2)"
     detail = "Saved body omits quotes around {{Credentials_Selector}}, producing invalid JSON." }
)

Write-Host ("NdcV1.Extracted loaded (envs: " + (($Global:NdcEnvs.Keys) -join ", ") + ")")
