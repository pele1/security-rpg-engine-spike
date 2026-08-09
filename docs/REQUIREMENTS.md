# Technology Spike Requirements

## Objective

Compare RPGJS and GDevelop as foundations for a small, exciting, isometric information-security RPG that can be developed with strong AI/coding-agent assistance and deployed as a static website.

The spike is successful only if it reveals practical differences between the engines. It is not a beauty contest and not a full game project.

## Must-have requirements

### 1. Browser deployment

The final spike implementation for each engine must produce browser-runnable files suitable for static hosting. A runtime backend must not be required.

### 2. Isometric presentation

The playable scene must visibly use an isometric perspective or isometric tile/grid presentation. A conventional orthogonal top-down map does not satisfy the requirement.

### 3. Repository-owned scenario semantics

The important game semantics must remain understandable from repository text files. This includes, at minimum:

- characters;
- dialogue text;
- choices;
- scenario flags/state;
- outcomes;
- logical asset references.

Engine-specific adapters are allowed. Opaque editor state must not be the only source of truth.

### 4. AI/coding-agent editability

A coding agent must be able to perform a meaningful content change without opening the visual editor. The mandatory change test is defined in `docs/TEST-PLAN.md`.

### 5. External asset workflow

Graphics and sounds must exist as replaceable files and be referenceable from text/configuration. The engine editor must not be the only practical way to create or replace those assets.

### 6. Core RPG interaction

Each implementation must provide:

- controllable player movement;
- NPC interaction;
- branching dialogue;
- conditional/stateful behavior;
- a controlled door/boundary;
- distinct outcomes;
- restart/replay capability.

### 7. Maintainable diff behavior

Normal content changes should ideally result in small, reviewable diffs. Large generated project files are acceptable only if unavoidable and must be documented as a weakness.

## Should-have requirements

- Map content can be created or modified in structured/textual form.
- Engine supports easy addition of more scenes later.
- Asset naming and references can remain stable even when image files are regenerated.
- Local development loop is understandable to a non-game-engine specialist.
- Builds can be automated in CI.
- The engine has a healthy ecosystem, documentation, and active maintenance.

## Nice-to-have requirements

- Visual editor remains available for manual map tuning.
- Built-in dialogue/RPG helpers reduce custom runtime code.
- Agent-specific tooling or official AI integration exists.
- Mobile-browser compatibility is reasonable.
- Save/load can be added later without architectural rework.

## Out of scope

The first spike does not require:

- production-ready art;
- backend APIs;
- user accounts;
- analytics;
- combat;
- inventory depth;
- leveling;
- multiplayer;
- procedural generation;
- runtime LLM calls;
- final accessibility/localization implementation.

## Evaluation weights

| Criterion | Weight |
|---|---:|
| AI / coding-agent editability | 25% |
| Isometric implementation quality | 20% |
| Story/events as maintainable data | 15% |
| Static web deployment | 15% |
| External asset pipeline | 10% |
| Existing RPG capabilities | 10% |
| Visual editor usefulness | 5% |

Scores are recorded on a 1–5 scale in `docs/DECISION.md` after both implementations have been tested.

## Knock-out conditions

An implementation should not be selected as the foundation if any of these remain true after a reasonable spike attempt:

1. A backend is required to run the single-player game.
2. Isometric presentation is impractical or fundamentally unsupported for the intended small-office map style.
3. Meaningful story/content changes inherently require manual work in the editor.
4. External generated graphics cannot be handled as normal replaceable files.
5. A production web build cannot be created reliably.
