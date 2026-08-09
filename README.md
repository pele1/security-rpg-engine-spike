# Security RPG Engine Spike

Technical spike to compare **RPGJS** and **GDevelop** as foundations for a small, browser-deployable, AI-assisted isometric information-security RPG.

The goal is not to build the final game yet. Both engines will implement the same small playable scenario from shared, repository-owned specifications and assets so that we can compare them fairly.

## Core principles

- Same scenario and acceptance criteria for both engines.
- Story, dialogue, events, configuration, and assets should remain editable outside a visual editor wherever practical.
- AI coding agents should be able to make meaningful gameplay changes through repository files.
- External graphics and audio assets remain normal files in the repository and are not locked into an editor-only workflow.
- The final single-player game must be deployable as a small static website without a required backend.
- Isometric presentation is required for the spike.

## Planned implementations

- `rpgjs/` — RPGJS implementation.
- `gdevelop/` — GDevelop implementation.
- `shared/` — engine-neutral scenario, schema, asset references, and shared design input.
- `docs/` — requirements, test plan, findings, and final decision record.

## Initial spike scenario

**Badge Incident**: a short office-security scene in which a visitor asks the player to let them through a badge-controlled door. The player can comply, redirect the visitor to reception, or verify the visitor's identity. Different choices produce different outcomes without presenting the experience as a conventional quiz.

The detailed specification is added in the foundation PR.
