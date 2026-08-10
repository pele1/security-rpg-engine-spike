# Shared Asset Workflow

This directory is the engine-neutral visual source of truth for the spike.

## Source and committed outputs

`source/office-asset-sheet-v1.png` is the original AI-generated asset atlas. Do not edit or duplicate it inside an engine project.

`manifest.json` defines stable asset IDs, crop rectangles, target paths, tags, and the composition of the office-lobby backdrop. The deterministic extractor writes normal, reviewable Git assets under `generated/`:

```text
source/office-asset-sheet-v1.png
        + manifest.json
        | npm run generate:assets (from rpgjs/)
        v
generated/
```

The first experiment commits only the reception desk, secure door, security gate, workstation cluster, plants set, and composed office-lobby backdrop. These PNGs use Git LFS so pull-request diffs contain small text pointers instead of unsupported binary blobs while checked-out files remain directly inspectable images. Run `git lfs install` once in a new development environment.

When the atlas or manifest changes, run `npm run generate:assets`, inspect the PNGs, and commit them with the source change. `npm run verify:assets` regenerates the expected bytes in memory and fails if a committed PNG is missing or stale.

## Engine consumption

RPGJS does not generate its own canonical artwork. `npm run sync:shared` clears its derived public copy, copies `shared/assets/generated/` to `rpgjs/public/assets/shared/`, and copies the committed backdrop to the Tiled input directory. Both destinations are disposable engine/build inputs; the files under `shared/assets/generated/` are authoritative and can later be consumed by GDevelop.

`npm run dev` and `npm run build` first verify the committed files and then sync them. CI performs the same verification, so changing crop or composition metadata without committing regenerated PNGs fails visibly.

## Rules

- Keep graphics and audio as normal replaceable files.
- Commit generated shared PNGs; do not treat them as ephemeral CI-only output.
- Prefer stable logical asset IDs over engine-specific names.
- Engine import metadata may live inside `rpgjs/` or `gdevelop/`, but it must consume the shared generated files.
- Do not use an engine editor as the only place where art or audio exists.
- When a new source sheet is generated, preserve the old source under `source/` and add/update crop metadata instead of silently overwriting provenance.

Character animation remains a separate concern because directional/walk-frame consistency needs stricter sprite-sheet control than environmental props.
