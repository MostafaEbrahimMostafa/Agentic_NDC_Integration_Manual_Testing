# Optimize Prompt — Reusable Prompt Template

Copy the block below, paste your raw request in it, and send it. You get back a structured,
complete prompt plus questions for anything missing. Nothing is executed until you say "go".

---

Use Optimize_Prompt on this request:

> [Paste your raw request here, as you would normally type it]

1. Classify it (generate / execute / retest / report / analyze / bug / spec-update /
   testdata-sweep) and name the next skill.
2. Fill the required slots only from my words or from repo facts I confirm. Do not guess.
3. Link the KB file and SPEC sections that apply. Do not paste their text.
4. Show me before/after, what changed, and one numbered list of questions for missing slots.
5. Wait for my answers or "go". Do not run anything yet.

**Stop and ask me, don't guess:**
- supplier, host, credentials selector or version is missing (CLAUDE.md rule 5)
- the request implies Book / BookAfterHold / Void / CancelAfterHold on a non-staging host
- a bug ID has no run slug, or a file I named does not exist

---

## Notes for filling this in

- Use it for test runs, retests and test-case generation. Skip it for one-line questions or a
  template from this folder that is already fully filled in.
- The result follows the template of the skill it hands over to (e.g.
  `Execute_Test_Cases_Prompt_Template.md`), so you can save a good rewrite as your own template.
- Worked examples: `.claude/Skills/Optimize_Prompt/references/examples.md`.
