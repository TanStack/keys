---
id: SHIFTED_KEY_MAP
title: SHIFTED_KEY_MAP
---

# Variable: SHIFTED\_KEY\_MAP

```ts
const SHIFTED_KEY_MAP: Record<string, PunctuationKey>;
```

Defined in: [constants.ts:343](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/constants.ts#L343)

Maps shifted punctuation characters to their base (unshifted) key.

Used by the parser to normalize shifted punctuation in hotkey strings.
For example, writing `Mod+?` is automatically normalized to `Mod+Shift+/`,
since `?` is just the shifted form of `/` on a US keyboard.

Based on the US QWERTY layout.
