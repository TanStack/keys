---
id: normalizeHotkey
title: normalizeHotkey
---

# Function: normalizeHotkey()

```ts
function normalizeHotkey(hotkey, platform): string;
```

Defined in: [parse.ts:91](https://github.com/TanStack/keys/blob/main/packages/keys/src/parse.ts#L91)

Normalizes a hotkey string to its canonical form.

The canonical form uses:
- Full modifier names (Control, Alt, Shift, Meta)
- Modifiers in order: Control+Alt+Shift+Meta
- Uppercase letters for single-character keys
- Proper casing for special keys (Escape, not escape)

## Parameters

### hotkey

`string`

The hotkey string to normalize

### platform

The target platform for resolving 'Mod' (defaults to auto-detection)

`"mac"` | `"windows"` | `"linux"`

## Returns

`string`

The normalized hotkey string

## Example

```ts
normalizeHotkey('mod+shift+s') // On Mac: 'Shift+Meta+S'
normalizeHotkey('ctrl+a') // 'Control+A'
normalizeHotkey('esc') // 'Escape'
```
