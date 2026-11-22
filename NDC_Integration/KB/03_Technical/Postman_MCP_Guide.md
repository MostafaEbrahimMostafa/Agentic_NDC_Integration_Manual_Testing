# Postman MCP Guide: run a specific collection from Claude Code

How to run one Postman collection (with one environment) through the Postman MCP server, from the
Claude Code chat in VS Code.

`Last verified: 2026-11-22 / Postman workspace "QC Team" / server @postman/postman-mcp-server`

---

## 1. When to use it

| Use the Postman MCP server for | Use the harness (`NDC_Integration/Harness/`) for |
|---|---|
| A quick smoke run of a whole collection | Test-case CSV runs with one verdict per TC-ID |
| Checking a collection still works after an edit | Evidence: full request/response, correlation IDs |
| Reading / comparing / updating collections and environments | Run JSONL, MD/HTML reports, bug reports |
| | Bug re-tests (`Retest/runner.js`), Bug Registry |

An MCP collection run gives you Postman's pass/fail per request and per test script. It does not
write the run JSONL, keep evidence files or apply the SPEC rules. Anything you want to report as a
QA result or a defect still goes through the skills (Execute_Test_cases → Generate_QA_Report →
Generate_Bug_Report).

---

## 2. One-time setup

1. **Postman API key.** In Postman: Settings → API Keys → Generate. Never paste it in chat,
   tickets or commits.
2. **Config.** The repo root has `.mcp.json` with the `postman` server
   (`npx -y @postman/postman-mcp-server`). The key goes in `env.POSTMAN_API_KEY`, either:
   - as `"${POSTMAN_API_KEY}"` plus `setx POSTMAN_API_KEY "<key>"` in your own terminal (preferred), or
   - pasted directly into `.mcp.json`. The file is in `.gitignore`, so it is never committed.
3. **Enable.** `.claude/settings.local.json` has `"enabledMcpjsonServers": ["postman"]`.
4. **Start or reload.** The server reads the key only when it starts. After any key change:
   type `/mcp` → select `postman` → **Reconnect** (or close all VS Code windows and reopen).
5. **Check.** Ask Claude: *"Check the Postman MCP connection."* Claude calls `getAuthenticatedUser`;
   you should see your Postman user and team, not `401 Invalid API Key`.

---

## 3. Find the collection and environment IDs

Ask Claude in plain words; it calls the read-only tools for you:

```
List my Postman workspaces.
List the collections in the "Final NDC CI Collection" workspace.
List the environments in the "Final NDC CI Collection" workspace.
Show the folders and requests of collection NDC_Integrations_Staging_V2.
```

The run tool needs the **UID** form `<ownerId>-<uuid>`, not the short id.

### Known NDC collections (2026-11-22)

| Workspace | Collection | Collection UID |
|---|---|---|
| Final NDC CI Collection | NDC_Integrations_Staging_V2 | `39545075-1c01cc86-1c77-496f-8dc8-32dc1a58fed4` |
| Final NDC CI Collection | NDC Integrations Avilability | `39545075-3042fc86-f602-47bb-8edd-608e32ac3b12` |
| Final NDC CI Collection | NDC Integrations Re-Issue | `39545075-ca8049b7-290e-4d23-85d3-7745974c87fc` |
| NDC Integration | NDC_Integrations_Staging_Scripts_V1 | `39545075-8918f79f-e38f-4e12-a597-64c264fd16ee` |
| NDC Integration | NDC Integrations 2026 CI - V1 + V2 Automated | `39545075-97b9731a-e747-4858-ab41-b7fcb1331c29` |
| NDC Integration | OmanAir Ancillary --V2 | `39545075-ece44b35-8455-4043-bf74-2f336ae375fe` |
| NDC Integration | FlyAdeal Ancill | `39545075-36842258-7d1d-44e5-a525-8753b16a5524` |
| NDC Integration | FlyAdeal Upselling | `39545075-b6c4b2b5-b7ed-4888-a0bf-b2ffcb00cb82` |
| NDC Integration | Accelya Standard V21 | `39545075-13c32f83-4b5c-4a80-9bc7-c6bd6be6c152` |

### Known environments (2026-11-22)

| Workspace | Environment | Environment ID | Use for runs? |
|---|---|---|---|
| Final NDC CI Collection | STAG_ENV | `ee7c68f3-0453-45bc-88f4-b4253ae7a400` | Yes (staging) |
| Final NDC CI Collection | NDC Integrations 2026 CI - Staging | `94230b6c-1167-432a-bca7-68d9b00052f0` | Yes (staging) |
| Final NDC CI Collection | NDC Integrations Re-Issue Env | `c41e97a5-b63e-4dfc-98dc-4e69224d922e` | Check its host first (the Re-Issue runs used a uat host) |
| Final NDC CI Collection | Production | `f4b38c60-585b-4529-b76f-74802ebf6308` | **No** - see §6 |
| NDC Integration | Production Env | `e33e056e-5ad0-481c-9a30-ba0ea095652c` | **No** - see §6 |
| NDC Integration | Oman Air, FlyAdeal, Gulf air, AirArabia, AirCairo, RiyadhAir, Accelya_env_AEGEAN, RC3/RC4 Regression, Basic Flow | (ask Claude to list them) | Check host + supplier first |

IDs change when a collection or environment is re-created. If a run says "not found", list them again.

---

## 4. Run a specific collection

### Step 1: check the environment before you run

The collection takes the host, supplier and credentials selector from the environment
(`baseUrl`, `Supplier_Name`, `Credentials_Selector`). Ask first:

```
Show the baseUrl, Supplier_Name and Credentials_Selector of environment STAG_ENV
(do not print x_api_key or any secret value).
```

Confirm the host is a **staging** host (`ndc-integration-stg-ne*`, see
`KB/03_Technical/Environments.md`) and the supplier is the one you mean to test.

### Step 2: ask Claude to run it

```
Run Postman collection NDC_Integrations_Staging_V2
(39545075-1c01cc86-1c77-496f-8dc8-32dc1a58fed4) with environment STAG_ENV
(ee7c68f3-0453-45bc-88f4-b4253ae7a400). Stop on the first error.
Summarise passed/failed requests and failed tests.
```

Claude calls `runCollection` with these parameters:

| Parameter | Meaning | Default | Suggested |
|---|---|---|---|
| `collectionId` | Collection **UID** (`<owner>-<uuid>`) | required | from §3 |
| `environmentId` | Environment id | none | always pass one |
| `stopOnError` / `stopOnFailure` | Finish the current request, then stop on an error / failed test | false | `stopOnError: true` for booking collections |
| `abortOnError` / `abortOnFailure` | Stop immediately | false | |
| `iterationCount` | How many times to run the whole collection | 1 | 1 |
| `requestTimeout` | Per-request timeout, ms | 60000 | 120000 for slow suppliers (Galileo, Sabre) |
| `scriptTimeout` | Pre-request/test script timeout, ms | 5000 | 5000 |

Requests run one after another, in collection order (this meets CLAUDE.md rule 9).

### Step 3: read the result

Claude returns the counts and the failing requests/tests. To keep a result:

- for a QA run with verdicts: use **Execute_Test_cases** (it records each TC in the JSONL and renders the report);
- for a defect: it must pass the gate in `.claude/Skills/_shared/AI_Guardrails.md` before a bug report is filed;
- list any Hold/PNR the run created in your notes (CLAUDE.md rule 8).

---

## 5. Run only part of a collection (one folder or flow)

`runCollection` has **no folder or request filter**: it always runs the whole collection.
To run only one folder:

1. **Copy and trim (in Postman).** Duplicate the collection (Claude can call `duplicateCollection`),
   delete the folders you do not want, run the copy, delete the copy afterwards.
2. **Postman CLI on your machine** (outside MCP), which does support folders:
   ```
   postman collection run <collection-uid> -e <environment-uid> -i "<folder name>"
   ```
3. **The harness**, for repeatable test-case runs (`KB/03_Technical/Harness_Guide.md`).

---

## 6. Safety rules (from CLAUDE.md)

- **Never run with a `Production` environment.** A whole-collection run includes Book, Hold,
  BookAfterHold, Void and CancelAfterHold.
- **Book / BookAfterHold / Void / CancelAfterHold only on staging**, unless the user explicitly
  authorises another host in the conversation. `ndc-supplier-integration` is **not** staging.
- **One supplier per run.** Do not run a collection whose environment points at a different
  supplier from the one under test.
- **One run at a time.** Parallel load caused false failures on Sabre, Galileo, AirArabiaPlus,
  FlyAdeal and TravelportNdc.
- **Secrets.** Never ask Claude to print `x_api_key`, supplier credentials or
  `supplierRequest` / `supplierResponse` bodies.
- **Do not edit shared environments to switch supplier.** `putEnvironment` changes it for the whole
  team. Duplicate the environment instead, or ask the owner.

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `401 Invalid API Key` | Server started before the key was set, or the key is incomplete/revoked | Fix the key, then `/mcp` → `postman` → Reconnect |
| `Invalid environment variables ... POSTMAN_API_KEY Required` | `${POSTMAN_API_KEY}` used but the variable is not set | `setx POSTMAN_API_KEY "<key>"`, close all VS Code windows, reopen |
| No `postman` tools in Claude Code | Server not enabled or not started | Check `.mcp.json` and `enabledMcpjsonServers`; run `/mcp` |
| Collection "not found" | Short id used, or collection re-created | Use the UID `<owner>-<uuid>`; list collections again |
| Every request fails with 401/403 from the NDC API | Environment has no valid `x_api_key` | Fix the environment value in Postman (never in chat) |
| Requests time out | Slow supplier | Raise `requestTimeout` (e.g. 120000) |
