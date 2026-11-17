# Second-opinion prompt (fresh sub-agent, before any defect is filed)

Used by guardrail **G-3** in [AI_Guardrails.md](AI_Guardrails.md). The second opinion has to be
**independent**, so the sub-agent gets the evidence and the rule. It never gets the first verdict.

## How to run it

1. Start a **new** sub-agent (Agent tool, `general-purpose`). Do not fork, because a fork inherits
   the first verdict.
2. Fill in the template below. Give it **only**:
   - the saved request and response file(s): repo-relative paths, plus a `line` for a `.jsonl`;
   - the SPEC rule as a verbatim quote with its section (or the KB fact with its file, for
     `LIVE-CONFIRMED`);
   - supplier, host, selector and version.
3. **Never include:** the test-case title, the words "bug", "defect", "fail", "broken" or "confirm",
   the first agent's verdict or reasoning, the per-run bug ID, the registry row, the ADO ticket, or
   the field you think is wrong. List the files that hold the evidence, but do not point at the
   "suspicious" path.
4. Copy its JSON answer into the finding line as `second_opinion`
   (`log-schema.md` → *Guardrail fields*): `rule_met`, `summary`, `evidence_refs`,
   `by: "fresh-subagent"`, `prompt: ".claude/Skills/_shared/second-opinion-prompt.md"`.
   Do not edit its answer. If it disagrees (`yes`) or says `cannot_tell`, `verify-evidence.js` gates
   the defect as **NEEDS-HUMAN**: show both views to the user.

## Template

```text
You are reviewing saved API evidence for the NDC Integration API. Work only from the files below.
Do not call any API. Do not edit any file. Never print API keys or raw supplier payloads
(supplierRequest / supplierResponse / OriginalSupplier*).

Context: supplier <S>, host <H>, credentialsSelector <C>, API version <V>.

Saved calls (repo-relative; for .jsonl read the given line; a body may be stored as a JSON string):
<n>. <endpoint> - <path>[ line <N>][ hop <h>]
...

Rule to check (<SPEC §x.y | KB file>, verbatim):
"<quote>"

Questions:
1. What do these responses show that is relevant to the rule? Quote JSON paths and values.
   Search the WHOLE response (all levels, e.g. segment- and journey-level), and the other saved
   calls, before concluding that something is missing.
2. Is the rule met by these responses? Answer yes, no or cannot_tell.
3. What would you need to see to change your answer?

Reply with JSON only:
{"rule_met":"yes|no|cannot_tell",
 "summary":"<2-3 sentences>",
 "observations":["<path> = <value> in <file>", "..."],
 "evidence_refs":[{"source":"<file>","line":<N or omit>,"path":"<JSONPath>","op":"equals|exists|notExists|...","value":<value>}],
 "would_change_if":"<one line>"}
```

`evidence_refs` use the operators in `NDC_Integration/Harness/Retest/lib/assert.js` (`exists`,
`notExists`, `equals`, `notEquals`, `in`, `notIn`, `matches`, `gt`, `lt`, `equalsStep`,
`notEqualsStep` …). `verify-evidence.js` re-checks them, so a reviewer citation that does not hold is
caught too.
