# RPGJS Implementation

This directory contains the RPGJS v5 baseline implementation of the shared **Badge Incident** spike.

## What is implemented

- RPGJS v5 beta project structure based on the current official `rpgjs/starter` v5 branch.
- Vite-based browser build.
- Local in-browser RPG server; no external backend is required for the single-player spike.
- Tiled map pipeline via `@rpgjs/tiledmap`.
- An isometric `office-lobby.tmx` map (`orientation="isometric"`).
- Player, visitor and receptionist entities.
- The three initial visitor choices and the second verification branch.
- Contextual outcome feedback.
- External SVG placeholder spritesheets that can be replaced without using an RPG editor.
- Automatic copy of the repository-owned `../shared/scenario.json` into the static web build.
- GitHub Actions build validation.

## Source of truth

Read before changing gameplay:

- `../AGENTS.md`
- `../shared/SCENARIO.md`
- `../shared/scenario.json`
- `../docs/REQUIREMENTS.md`
- `../docs/TEST-PLAN.md`

`shared/scenario.json` remains the semantic source of truth. The current RPGJS event implementation is a thin hand-written adapter used to get the first playable baseline running. A later spike step will determine how much of that adapter can be generated or interpreted directly from the shared JSON.

## Run locally

Requires Node.js 22 or a compatible current Node.js release.

```bash
cd rpgjs
npm install
npm run dev
```

The `predev` hook copies `../shared/scenario.json` to `public/data/scenario.json` automatically.

## Build the static website

```bash
cd rpgjs
npm install
npm run build
```

The deployable output is `rpgjs/dist/`. It includes the game, Tiled map files and a copy of the shared scenario JSON. No runtime backend is intended for this baseline.

## Asset workflow

Temporary character graphics live under `public/spritesheets/` as ordinary SVG files. The isometric floor tile is an ordinary SVG referenced by the Tiled tileset. These are deliberately placeholders: future AI-generated or artist-created assets should replace files or be added as new repository assets rather than being embedded in editor-only state.

## Current limitations / next tests

This commit is the setup/baseline, not the final engine verdict. The following remain explicit spike tasks:

1. Confirm the browser build in CI and interactively.
2. Improve the office map from a floor skeleton to a representative small office scene.
3. Represent the badge-controlled door visually and make its state change observable in-world.
4. Reduce the remaining semantic duplication between `shared/scenario.json` and RPGJS event code.
5. Perform the repository-only Daniel AI change test from `../docs/TEST-PLAN.md`.
6. Perform the map-change test without opening Tiled or RPGJS Studio.

RPGJS Studio is intentionally not part of this baseline.
