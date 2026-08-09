# Engine Decision Record

## Status

**Pending spike execution.** Do not select an engine until both implementations have completed the mandatory tests, especially the AI change test and static production build.

## Weighted scorecard

Score each criterion from 1 (poor) to 5 (excellent). Weighted score = score × weight.

| Criterion | Weight | RPGJS score | RPGJS weighted | GDevelop score | GDevelop weighted |
|---|---:|---:|---:|---:|---:|
| AI / coding-agent editability | 25% | TBD | TBD | TBD | TBD |
| Isometric implementation quality | 20% | TBD | TBD | TBD | TBD |
| Story/events as maintainable data | 15% | TBD | TBD | TBD | TBD |
| Static web deployment | 15% | TBD | TBD | TBD | TBD |
| External asset pipeline | 10% | TBD | TBD | TBD | TBD |
| Existing RPG capabilities | 10% | TBD | TBD | TBD | TBD |
| Visual editor usefulness | 5% | TBD | TBD | TBD | TBD |
| **Total** | **100%** |  | **TBD** |  | **TBD** |

## Knock-out review

### RPGJS

- Static backend-free build: TBD
- Practical isometric presentation: TBD
- Repository-only meaningful story edit: TBD
- External replaceable assets: TBD
- Reliable production web build: TBD

### GDevelop

- Static backend-free build: TBD
- Practical isometric presentation: TBD
- Repository-only meaningful story edit: TBD
- External replaceable assets: TBD
- Reliable production web build: TBD

## Qualitative decision questions

1. Which implementation lets an AI agent make a new security scenario with the least opaque engine-specific editing?
2. Which implementation produces the most reviewable Git diffs?
3. Which implementation lets a human refine maps visually without making the agent workflow fragile?
4. Which implementation makes externally generated art/audio easiest to regenerate and replace?
5. Which platform would still feel maintainable after five or ten short security RPG episodes?
6. What important capability would require us to build a custom platform layer in each engine?

## Decision

TBD after execution.

## Rationale

TBD after execution.

## Follow-up experiment

If RPGJS is promising but limited without its optional Studio/agent tooling, run a separate **RPGJS + Studio** follow-up only after the open-source baseline has been scored. Do not mix that result into the initial engine comparison without labeling it separately.
