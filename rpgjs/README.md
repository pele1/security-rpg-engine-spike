# RPGJS Implementation

This directory will contain the RPGJS implementation of the shared **Badge Incident** spike.

Before implementation, read:

- `../AGENTS.md`
- `../shared/SCENARIO.md`
- `../shared/scenario.json`
- `../docs/REQUIREMENTS.md`
- `../docs/TEST-PLAN.md`

## Implementation rule

Prefer consuming or transforming `shared/scenario.json` rather than manually duplicating story semantics into unrelated engine-specific code. If direct consumption is impractical, document the adapter/generation approach and the reason in `../docs/FINDINGS.md`.

## First implementation target

- Isometric office scene.
- Player movement.
- Visitor/receptionist NPCs.
- Three-way visitor dialogue.
- Secure door state.
- Required outcome feedback.
- Static browser production build.

Do not add RPGJS Studio to the baseline experiment. Test the open-source/code-first path first.
