<!-- You are Codex acting as the implementation agent.

Implement only the ticket below.

Rules:

- Keep the change minimal.
- Do not touch unrelated files.
- Follow AGENTS.md.
- Add or update tests when behavior changes.
- Do not merge anything.
- Open or prepare a PR/diff for review.
- Report tests run and known risks.

Ticket:

<PASTE TICKET HERE> -->

You are Codex acting as the implementation lead with subagents.

You must follow `AGENTS.md`.

Goal:
Implement multiple tickets using subagents, but only when the tickets are safe to run in parallel.

Important rules:

1. Do not merge anything.
2. One ticket = one isolated branch or worktree.
3. One ticket = one PR or one clearly separated diff.
4. Do not let two subagents edit the same file at the same time.
5. If two tickets touch the same files, shared types, migrations, auth logic, or public API contracts, do NOT run them in parallel. Run them sequentially.
6. Keep each ticket scoped. Do not perform unrelated refactors.
7. Each subagent must summarize changes, tests, risks, and files touched.
8. The main agent must wait for all subagents to finish before producing the final report.
9. If any ticket is ambiguous, blocked, or risky, stop that ticket and report the blocker instead of guessing.
10. Do not mark work complete unless tests or validation steps were run, or explain clearly why they were not run.

Tickets:

001-project-scaffold.md

002-item-form.md

003-template-engine.md

004-post-preview.md

005-local-storage.md

Before spawning subagents, analyze the tickets and classify them:

## Parallel safety analysis

For each ticket, state:

* Expected files to touch
* Whether it can run in parallel
* Conflicts with other tickets
* Required dependency order
* Risk level: low / medium / high

Then choose one execution mode:

## Execution mode

Choose exactly one:

1. PARALLEL_SUBAGENTS
   Use this only if tickets do not overlap in files or behavior.

2. MIXED
   Run independent tickets in parallel, but run dependent tickets sequentially.

3. SERIAL_ONLY
   Use this if tickets overlap or affect shared architecture.

If using subagents:

* Spawn one subagent per safe ticket.
* Give each subagent only one ticket.
* Each subagent must work in its own branch or worktree.
* Each subagent must not edit files outside its scope.
* Each subagent must prepare a PR/diff but must not merge.

Subagent instruction template:

## Subagent: Ticket <number>

You are responsible only for this ticket:

<Paste exact ticket>

Rules:

* Read `AGENTS.md`.
* Implement only this ticket.
* Use branch name from the ticket, or create one using `ai/task-xxx-short-name`.
* Do not edit unrelated files.
* Add or update tests if behavior changes.
* Run relevant tests.
* Prepare a PR or diff.
* Report:

  * Summary
  * Files changed
  * Tests run
  * Tests not run and why
  * Known risks
  * Suggested PR title
  * Suggested PR description

After all subagents finish, produce this final report:

# Codex multi-ticket implementation report

## Execution mode used

PARALLEL_SUBAGENTS / MIXED / SERIAL_ONLY

## Ticket results

For each ticket:

* Status: done / blocked / needs review
* Branch or worktree
* PR link or diff location
* Files changed
* Tests run
* Risks
* Human review notes

## Cross-ticket conflict check

Check whether any tickets conflict with each other.

## Recommended review order

Tell the human which PR should be reviewed first.

## Do not merge

Confirm that no branch was merged.

If there is any chance of file conflict between tickets, prefer SERIAL_ONLY over parallel execution.