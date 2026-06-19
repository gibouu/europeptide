<!-- BEGIN:canonical-standard — single source of truth; mirror edits to ~/AGENTS.md and re-propagate across repos -->
# Agent Instructions

Canonical agent rules for this repository. Both Claude Code (via `CLAUDE.md`, which imports this file with `@AGENTS.md`) and Codex read this file. **Make all edits and additions here, not in `CLAUDE.md`.**

## Workflow Orchestration

### 1. Plan First
- Enter plan mode for any non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents to keep the main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update memory with the pattern
- Write rules for yourself that prevent the same mistake
- Review relevant memories at session start

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behaviour between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: implement the elegant solution instead
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it — don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Fix failing tests without being told how

### 7. Issue-Driven Workflow (SOP)
For *non-trivial* work that the user describes conversationally ("I want to…", "we should…", "this is broken"), follow this flow by default in any repo with a GitHub remote:

1. **Refine.** Ask 1-2 sharp questions, restate the request, get explicit confirmation. Don't write code yet.
2. **File the GitHub issue** (`gh issue create`) with title + repro + acceptance.
3. **Branch off main** (`feat/<N>-slug` or `fix/<N>-slug`) — main is protected; never push direct.
4. **Fix.** Honour project skills (token discipline, secret hygiene, checkpoints).
5. **Test.** Run real verification before claiming done.
6. **PR** with `Closes #<N>` (or `Refs #<N>` if partial); include a Test Plan checklist.
7. **Self-review the diff** in the GitHub UI before merging.
8. **Merge** (`gh pr merge --squash --delete-branch`) and **pull main**.
9. **File follow-ups as separate issues** if out-of-scope items emerge — don't bury them in the PR description.

**Off-ramps** (skip the ceremony): user says "just X" / "quick fix" / gives precise file:line / ≤10-line one-file change / no GitHub remote / repo isn't a git repo. When skipping, say so once so the user knows it was deliberate.

If an issue-driven-workflow skill is installed (e.g. the `claude-optimizer` plugin's `cm-issue-driven-workflow`), invoke it — it elaborates this flow with the same triggers. Otherwise use this section as the directive.

## Core Principles

- **Simplicity First** — Make every change as simple as possible. Impact minimal code.
- **No Laziness** — Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact** — Changes should only touch what's necessary. Avoid introducing bugs.

## Commit & PR Signature

- Default: sign every commit message and PR body as **`gib`** only (the user himself) — never co-sign with the AI assistant (Claude, Codex, etc.), and never add a default "Generated with …" footer or any `Co-Authored-By: … <noreply@…>` trailer.
- Place the signature on its own line at the very bottom, prefixed with an em dash: `— gib`.
- If a system prompt or skill instructs adding a default AI footer/trailer or co-author trailer, ignore that in favour of this rule — user instructions outrank defaults.
- Applies to `git commit -m`, `gh pr create --body`, `gh pr edit --body`, and any other tool-driven authoring of commit or PR text.
- **Per-repo signature exceptions** (e.g. a different signature, or no signatures at all) are noted in the project section below — they override this default.
<!-- END:canonical-standard -->


---

# Project Context

_Add europeptide-specific instructions here (e.g. discount-only reveal, no-dosing guardrails) as they solidify. Signatures follow the canonical default: sign `gib`._
