# AGENTS.md

## Purpose

This repository is a technology spike comparing RPGJS and GDevelop for an AI-assisted isometric information-security RPG that is ultimately deployed as a static website.

## Non-negotiable experiment rules

1. Do not optimize one engine by silently weakening the shared requirements.
2. `shared/` is the engine-neutral source of truth for scenario semantics and asset intent.
3. Keep story, dialogue, choices, event definitions, NPC metadata, and asset references outside editor-only state wherever reasonably possible.
4. Prefer small, readable text-based changes over large opaque generated project diffs.
5. Do not embed generated binary assets into source code or editor databases. Store them as normal files under `shared/assets/` or an explicitly documented engine-specific asset directory.
6. The playable spike must not require a backend at runtime.
7. Isometric presentation is part of the acceptance criteria; do not replace it with a top-down orthogonal map just to simplify implementation.
8. The security lesson should emerge through play and consequences, not through quiz questions or lecture-style popups.
9. Do not add unrelated RPG systems (combat, crafting, leveling, etc.) unless needed to evaluate an engine capability.
10. Document engine-specific compromises in `docs/FINDINGS.md` instead of hiding them.

## Shared scenario contract

The initial scenario is **Badge Incident**. Read these files before implementation:

- `shared/SCENARIO.md`
- `shared/scenario.json`
- `shared/scenario.schema.json`
- `docs/REQUIREMENTS.md`
- `docs/TEST-PLAN.md`

An engine implementation may translate the shared scenario into native structures, but the shared semantic model must remain recognizable and maintainable.

## AI change test

After each implementation works, it must survive a repository-only modification without manual editor work:

> Add a developer NPC named Daniel near the secure door. If the player asks Daniel about the visitor, Daniel says he does not know them. This unlocks a new visitor dialogue option. Add an external placeholder asset reference for Daniel.

Record which files changed, whether an editor was required, and whether the diff remained understandable.

## Implementation folders

- `rpgjs/`: RPGJS-specific code and configuration.
- `gdevelop/`: GDevelop-specific project files and helper code.
- `shared/`: engine-independent scenario data and asset inputs.
- `docs/`: experiment documentation and decision record.

## Asset policy

Generated art and sound are replaceable inputs. Keep stable logical IDs in scenario/config files and map those IDs to filenames. Temporary placeholders are acceptable during the spike, but document them clearly.

## Validation

At minimum, each engine implementation must demonstrate:

- browser playability;
- isometric scene presentation;
- player movement;
- NPC interaction;
- branching dialogue;
- a badge-controlled door or equivalent secure boundary;
- consequence/state change from player choices;
- external asset loading;
- production/static web build;
- repository-only AI change test.

Do not declare an engine successful if only the editor preview works.