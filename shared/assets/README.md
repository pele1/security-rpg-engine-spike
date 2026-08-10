# Shared Asset Workflow

This directory is the engine-neutral visual source of truth for the spike.

## Source sheet

`source/office-asset-sheet-v1.png` is the original AI-generated transparent asset atlas. Do not edit or duplicate it inside an engine project.

`manifest.json` defines stable asset IDs, crop rectangles, target paths, tags, and the composition of the current office-lobby backdrop. The manifest is intentionally engine-neutral so RPGJS and GDevelop can derive the same artwork from the same source.

## RPGJS pipeline

`rpgjs/scripts/generate-shared-assets.mjs` reads this manifest during `npm run dev` and `npm run build`.

It:

1. crops the reusable assets from the source atlas;
2. trims transparent margins;
3. writes the derived files to `rpgjs/public/assets/shared/`;
4. composes `scene/office-lobby-backdrop.png` from the extracted assets;
5. copies the generated backdrop into the Tiled source directory before RPGJS processes the map.

Derived PNG files are build products. The source sheet plus manifest are the maintained source.

## Rules

- Keep graphics and audio as normal replaceable files.
- Prefer stable logical asset IDs over engine-specific names.
- Engine import metadata may live inside `rpgjs/` or `gdevelop/`, but it must point back to shared assets or derived outputs.
- Do not use an engine editor as the only place where art or audio exists.
- AI-generated source art may be replaced without rewriting scenario semantics.
- When a new source sheet is generated, preserve the old source under `source/` and add/update crop metadata instead of silently overwriting provenance.

## Current high-value assets

The manifest currently extracts the secure door, security gate, reception desk, security signage, sofa area, developer workstations, meeting furniture, glass meeting room, storage, server racks, plants, glass/window modules, stairs, interaction icons, and floor tiles.

Character animation remains a separate concern because directional/walk-frame consistency needs stricter sprite-sheet control than environmental props.
