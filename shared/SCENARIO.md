# Badge Incident — Shared Scenario Specification

## Goal of the spike

Create the same short, playable information-security RPG scene in RPGJS and GDevelop. The player should experience a small social-engineering situation through normal RPG interaction rather than a training quiz.

Target playtime: **2–4 minutes**.

## Setting

A stylized isometric modern software-development office with a reception area and a badge-controlled entrance to a restricted developer zone.

The scene should include, at minimum:

- Player character.
- Reception desk/receptionist.
- Visitor near the secure door.
- Badge-controlled secure door.
- Visible developer area behind the door.
- A few office props to make the scene feel inhabited rather than like a test room.

The exact art can be placeholder-quality during the technology spike, but the composition must visibly read as isometric.

## Opening state

The player enters or starts in the public/reception side of the office. The apparent objective is deliberately mundane:

> Get to your desk in the developer area.

The security problem should not be announced in advance.

When the player approaches or talks to the visitor, the visitor says that their badge is not working and asks to be let through the secure door. They imply urgency and legitimacy without behaving like an obvious attacker.

Suggested visitor line:

> "Hey, perfect timing. My badge stopped working again. Could you let me through? I'm already late for the DevOps meeting."

Wording may differ slightly by engine implementation, but intent and available decisions should remain equivalent.

## Required decision paths

### Path A — Let the visitor in

The player agrees to help and opens/allows access through the secure door.

Required consequence:

- Visitor enters the restricted area.
- A short delayed consequence makes clear that something suspicious has happened.
- Do not immediately display "Wrong answer".

Example consequence: an alert message, concerned colleague, or endpoint/security notification indicates that an unknown visitor was seen near a development workstation.

Outcome classification: `unsafe_access_granted`.

### Path B — Send visitor to reception

The player tells the visitor to resolve access through reception.

Required consequence:

- Visitor does not enter the restricted area through the player.
- Reception interaction or short follow-up confirms that this was the appropriate process.
- Keep the tone natural and brief rather than congratulatory training language.

Outcome classification: `verified_process`.

### Path C — Ask who they are meeting

The player asks for more context before acting.

Required consequence:

- Visitor gives a plausible answer such as "Daniel from DevOps".
- This opens at least one follow-up decision, e.g. verify with reception or decide to trust the explanation.
- This branch exists to test dialogue state and conditional options.

Outcome classification depends on the subsequent choice.

## World interaction requirements

The implementation must include:

1. Player movement through the isometric office.
2. Proximity/action interaction with the visitor.
3. Branching dialogue with at least three initial choices.
4. A secure door that changes state or access behavior.
5. At least one persistent scenario flag, e.g. `visitorVerified`, `visitorAdmitted`, or equivalent.
6. A visible or audible reaction to the final outcome.
7. Restart/replay capability sufficient for testing alternate paths.

## Security-learning design principles

- No multiple-choice quiz screen detached from the game world.
- No explicit "phishing/social engineering lesson" before the decision.
- The unsafe choice should be plausible.
- The safe path should feel like normal workplace behavior, not heroic security expertise.
- Consequences should teach through context.

## AI-first content principle

Scenario semantics must remain accessible to a coding agent in text-based repository files. The implementation may have engine-specific adapters, but changing a character, dialogue line, condition, choice, or asset reference should not inherently require manual editor interaction.

## Asset intent

Use logical asset IDs rather than hard-coding assumptions about generated images. Initial expected IDs:

- `player_employee`
- `visitor_external`
- `receptionist`
- `secure_badge_door`
- `office_floor_tiles`
- `office_wall_tiles`
- `developer_workstation`
- `reception_desk`
- `badge_denied_sfx`
- `badge_granted_sfx`
- `office_ambient`

Actual filenames can be chosen during implementation and documented in an asset manifest.

## Explicitly out of scope for the first spike

- Combat.
- Character progression.
- Inventory systems except if trivially needed for the badge interaction.
- Multiplayer.
- Backend services.
- Authentication.
- AI calls at runtime.
- Large maps.
- Final production-quality art.
- Full security-awareness campaign mechanics.
