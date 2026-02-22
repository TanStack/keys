---
id: PUNCTUATION_CODE_TO_KEY
title: PUNCTUATION_CODE_TO_KEY
---

# Variable: PUNCTUATION\_CODE\_TO\_KEY

```ts
const PUNCTUATION_CODE_TO_KEY: Record<string, PunctuationKey>;
```

Defined in: [constants.ts:320](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/constants.ts#L320)

Maps `KeyboardEvent.code` values to their corresponding unshifted punctuation key.

Used by the hotkey matcher as a fallback when `event.key` doesn't match
due to Shift changing the produced character (e.g., `Shift+/` produces `?`
in `event.key` but `event.code` remains `Slash`).

This is analogous to the existing `event.code` fallbacks for letters (`KeyA`→`A`)
and digits (`Digit4`→`4`), extended to cover punctuation keys.

Based on the US QWERTY layout, which is the standard for `event.code` values.
