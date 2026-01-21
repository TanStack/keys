---
id: parseHotkey
title: parseHotkey
---

# Function: parseHotkey()

```ts
function parseHotkey(hotkey, platform): ParsedHotkey;
```

Defined in: [parse.ts:24](https://github.com/TanStack/keys/blob/main/packages/keys/src/parse.ts#L24)

Parses a hotkey string into its component parts.

## Parameters

### hotkey

`string`

The hotkey string to parse (e.g., 'Mod+Shift+S')

### platform

The target platform for resolving 'Mod' (defaults to auto-detection)

`"mac"` | `"windows"` | `"linux"`

## Returns

[`ParsedHotkey`](../interfaces/ParsedHotkey.md)

A ParsedHotkey object with the key and modifier flags

## Example

```ts
parseHotkey('Mod+S') // On Mac: { key: 'S', ctrl: false, shift: false, alt: false, meta: true, modifiers: ['Meta'] }
parseHotkey('Mod+S') // On Windows: { key: 'S', ctrl: true, shift: false, alt: false, meta: false, modifiers: ['Control'] }
parseHotkey('Control+Shift+A') // { key: 'A', ctrl: true, shift: true, alt: false, meta: false, modifiers: ['Control', 'Shift'] }
```
