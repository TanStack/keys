---
id: PUNCTUATION_KEYS
title: PUNCTUATION_KEYS
---

# Variable: PUNCTUATION\_KEYS

```ts
const PUNCTUATION_KEYS: Set<PunctuationKey>;
```

Defined in: [constants.ts:294](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/constants.ts#L294)

Set of all valid punctuation keys commonly used in keyboard shortcuts.

These are the unshifted (base) characters as they appear in `KeyboardEvent.key`
on a US keyboard layout. Common shortcuts include:
- `Mod+/` - Toggle comment
- `Mod+[` / `Mod+]` - Indent/outdent
- `Mod+=` / `Mod+-` - Zoom in/out

Shifted variants (e.g., `?` from `Shift+/`) are not listed separately.
Instead, use `Mod+Shift+/` to register the shifted form. The matcher uses
`event.code` to reliably identify the physical key regardless of shift state.

## See

[PUNCTUATION\_CODE\_TO\_KEY](PUNCTUATION_CODE_TO_KEY.md) for the event.code → key mapping used in matching
