# GDevelop Implementation

This directory will contain the GDevelop implementation of the shared **Badge Incident** spike.

Before implementation, read:

- `../AGENTS.md`
- `../shared/SCENARIO.md`
- `../shared/scenario.json`
- `../docs/REQUIREMENTS.md`
- `../docs/TEST-PLAN.md`

## Implementation rule

Use GDevelop as engine/runtime, not as the sole owner of game semantics. Keep dialogue, choices, flags, outcomes, and logical asset references external/text-readable wherever practical. If GDevelop requires generated or serialized project state, document how it relates to the shared scenario and how much generated diff noise it creates.

## First implementation target

- Isometric office scene.
- Player movement.
- Visitor/receptionist NPCs.
- Three-way visitor dialogue.
- Secure door state.
- Required outcome feedback.
- Static browser production export.

The baseline should not depend on paid or cloud-only functionality.
