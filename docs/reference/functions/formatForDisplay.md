---
id: formatForDisplay
title: formatForDisplay
---

# Function: formatForDisplay()

```ts
function formatForDisplay(hotkey, options): string;
```

Defined in: [format.ts:77](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/format.ts#L77)

Formats a hotkey for display in a user interface.

On macOS, uses symbols (⌘⇧S).
On Windows/Linux, uses text (Ctrl+Shift+S).

## Parameters

### hotkey

The hotkey string or ParsedHotkey to format

[`Hotkey`](../type-aliases/Hotkey.md) | [`ParsedHotkey`](../interfaces/ParsedHotkey.md) | `string` & `object`

### options

[`FormatDisplayOptions`](../interfaces/FormatDisplayOptions.md) = `{}`

Formatting options

## Returns

`string`

A formatted string suitable for display

## Example

```ts
formatForDisplay('Mod+Shift+S', { platform: 'mac' })
// Returns: '⇧⌘S'

formatForDisplay('Mod+Shift+S', { platform: 'windows' })
// Returns: 'Ctrl+Shift+S'

formatForDisplay('Escape')
// Returns: 'Esc' (on all platforms)
```
