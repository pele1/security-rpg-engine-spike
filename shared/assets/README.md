# Shared Asset Workflow

This directory contains engine-neutral source assets or placeholders for the spike.

## Rules

- Keep graphics and audio as normal replaceable files.
- Use stable logical asset IDs from `shared/scenario.json`.
- Engine-specific import metadata may live inside `rpgjs/` or `gdevelop/`, but those files must point back to normal external assets.
- Do not use an engine editor as the only place where art or audio exists.
- AI-generated assets may be replaced at any time without rewriting scenario semantics.

## Expected logical IDs

### Characters

- `player_employee`
- `visitor_external`
- `receptionist`

### Environment

- `secure_badge_door`
- `office_floor_tiles`
- `office_wall_tiles`
- `developer_workstation`
- `reception_desk`

### Audio

- `badge_denied_sfx`
- `badge_granted_sfx`
- `office_ambient`

The first implementation may use clearly documented placeholders. Final visual style is deliberately outside the technology-spike scope.
