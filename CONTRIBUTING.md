# Contributing

Keep the collection dependency-free unless a feature cannot reasonably be demonstrated with platform APIs.

New effects should:

- have a focused module
- avoid permanent animation loops when idle
- include a standalone example
- retain keyboard and pointer usability where applicable
- document performance implications
- preserve semantic DOM content whenever possible

Run `npm test` and `npm run check` before submitting changes.
