```
using NDC.Integrations.Domain.Models.SharedTypes;
```

```
namespace NDC.Integrations.Domain.Models.SharedTypes.V2
{
```

- `// Canonical IATA PADIS seat-characteristic descriptions. This is a domainlevel fact (not` 

- `// supplier/infrastructure-specific), which is why it lives here rather than in Infrastructure -` 

- `// CellCharacteristicType.Description is computed from this table so every integrated supplier` 

- `// produces the identical description for a given PadisCode. public static class PadisSeatCharacteristicHelper {` 

```
        private static readonly Dictionary<string, string> PadisCodeDescriptions
= new()
```

```
        {
```

```
            { "Unknown", "Unspecified seat characteristic" },
```

```
            { "1", "Restricted seat - General" },
```

```
            { "2", "Leg rest available" },
            { "3", "Individual video screen - Choice of movies" },
            { "4", "Not a window seat" },
            { "6", "Near galley seat" },
            { "7", "Near toilet seat" },
            { "8", "No seat at this location" },
            { "9", "Center seat (not window, not aisle)" },
            { "10", "Seat designated for RBD \"A\"" },
            { "11", "Seat designated for RBD \"B\"" },
            { "12", "Seat designated for RBD \"C\"" },
            { "13", "Seat designated for RBD \"D\"" },
            { "14", "Seat designated for RBD \"F\"" },
            { "15", "Seat designated for RBD \"H\"" },
            { "16", "Seat designated for RBD \"J\"" },
            { "17", "Seat designated for RBD \"K\"" },
            { "18", "Seat designated for RBD \"L\"" },
            { "19", "Seat designated for RBD \"M\"" },
            { "20", "Seat designated for RBD \"P\"" },
            { "21", "Seat designated for RBD \"Q\"" },
            { "22", "Seat designated for RBD \"R\"" },
            { "23", "Seat designated for RBD \"S\"" },
            { "24", "Seat designated for RBD \"T\"" },
            { "25", "Seat designated for RBD \"V\"" },
            { "26", "Seat designated for RBD \"W\"" },
            { "27", "Seat designated for RBD \"Y\"" },
            { "28", "Not fitted" },
            { "A", "Aisle seat" },
            { "AA", "All available aisle seats" },
            { "AB", "Seat adjacent to bar" },
            { "AC", "Seat adjacent to - closet" },
            { "AG", "Seat adjacent to galley" },
            { "AJ", "Adjacent aisle seats" },
            { "AL", "Seat adjacent to lavatory" },
            { "AM", "Individual movie screen - No choice of movie selection" },
            { "AR", "No seat - airphone" },
            { "AS", "Individual airphone" },
            { "AT", "Seat adjacent to table" },
            { "AU", "Seat adjacent to stairs to upper deck" },
            { "AV", "Only available seats" },
            { "AW", "All available window seats" },
            { "B", "Seat with bassinet facility" },
            { "BA", "No seat - bar" },
            { "BK", "Blocked Seat for preferred passenger in adjacent seat" },
            { "C", "Crew seat" },
            { "CC", "Center section seat(s)" },
            { "CH", "Chargeable seat" },
```

```
            { "CL", "No seat - closet" },
            { "CS", "Conditional seat-contact airline" },
            { "D", "No seat - exit door" },
            { "DE", "Deportee" },
            { "E", "Exit and emergency exit" },
            { "EA", "Not on exit seat" },
            { "EC", "Electronic connection for lap top or FAX machine" },
            { "EK", "Economy comfort seat" },
            { "EX", "No seat - emergency Exit" },
            { "F", "Added seat" },
            { "FC", "Front of cabin class/compartment" },
            { "G", "Seat at forward end of cabin" },
            { "GF", "General facility" },
            { "GN", "No seat - galley" },
            { "GR", "Group seat - offered to travellers belonging to a group" },
            { "H", "Seat with facilities for handicapped/incapacitated
passenger" },
            { "I", "Seat suitable for adult with an infant" },
            { "IA", "Inside aisle seats" },
            { "IE", "Seat not suitable for child" },
            { "J", "Rear facing seat" },
            { "K", "Bulkhead seat" },
            { "KA", "Bulkhead seat with movie screen" },
            { "KN", "Bulkhead, no seat" },
            { "L", "Leg space seat" },
            { "LA", "No seat – lavatory" },
            { "LB", "Rear facing lie flat seat" },
            { "LE", "Left facing lie flat seat more left angle" },
            { "LF", "Lie flat seat" },
            { "LG", "No seat - luggage storage" },
            { "LH", "Restricted seat - offered on long-haul segments" },
            { "LL", "Left facing lie flat seat" },
            { "LR", "Right facing lie flat seat" },
            { "LS", "Left side of aircraft" },
            { "LT", "Right facing lie flat seat more right angle" },
            { "M", "Seat without a movie view" },
            { "MA", "Medically OK to travel" },
            { "MS", "Middle seat" },
            { "N", "No smoking seat" },
            { "O", "Preferential seat" },
            { "OW", "Overwing seat(s)" },
            { "P", "Extra seat for comfort - arm rest can be raised" },
            { "PC", "Pet cabin" },
            { "Q", "Seat in a quiet zone" },
            { "RS", "Right side of aircraft" },
            { "S", "Smoking seat" },
            { "SC", "Skycouch" },
            { "SO", "No seat - storage space" },
            { "ST", "No seat - stairs to upper deck" },
            { "T", "Rear/Tail section of aircraft" },
            { "TA", "No seat - table" },
            { "U", "Seat suitable for unaccompanied minors" },
            { "UP", "Upper deck" },
            { "V", "Seat to be left vacant or offered last" },
            { "W", "Window seat" },
            { "WA", "Window and aisle together" },
            { "X", "No facility seat (indifferent seat)" },
            { "Z", "Buffer zone seat" },
            { "1A", "Seat not allowed for infant" },
            { "1B", "Seat not allowed for medical" },
            { "1C", "Seat not allowed for unaccompanied minor" },
            { "1D", "Restricted recline seat" },
            { "1M", "Seat with movie view" },
            { "1W", "Window seat without window" },
```

```
            { "3A", "Individual video screen - No choice of movie" },
            { "3B", "Individual video screen-Choice of movies, games,
information, etc" },
            { "6A", "In front of galley seat" },
            { "6B", "Behind galley seat" },
            { "7A", "In front of toilet seat" },
            { "7B", "Behind toilet seat" },
            { "70", "Individual video screen - services unspecified" },
            { "71", "No seat --access to handicapped lavatory" },
            { "72", "Undesirable seat" }
        };
```

```
        public static string GetCharacteristicByPadisCode(string padiscode)
        {
            if (string.IsNullOrWhiteSpace(padiscode))
            {
                return "Invalid PadisCode: PadisCode cannot be null or empty";
            }
```

```
            if (PadisCodeDescriptions.TryGetValue(padiscode, out string
description))
            {
                return description;
            }
```

```
            return $"Invalid PadisCode: '{padiscode}' not found";
        }
```

```
        // TrimStart('_') strips the C# identifier prefix on numeric PADIS codes
(enum member "_17" ->
        // lookup key "17"); alphabetic codes like "A"/"W"/"E" are unaffected.
Centralizing this here means
```

```
        // every caller (mappers, and CellCharacteristicType.Description itself)
gets it right automatically.
        public static string GetCharacteristicByPadisCode(PadisCode padisCode)
        {
```

```
            return
GetCharacteristicByPadisCode(padisCode.ToString().TrimStart('_'));
        }
    }
}
```

