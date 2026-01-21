---
id: matchesKeyboardEvent
title: matchesKeyboardEvent
---

# Function: matchesKeyboardEvent()

```ts
function matchesKeyboardEvent(
   event, 
   hotkey, 
   platform): boolean;
```

Defined in: [match.ts:31](https://github.com/TanStack/keys/blob/main/packages/keys/src/match.ts#L31)

Checks if a KeyboardEvent matches a hotkey.

Uses the `key` property from KeyboardEvent for matching (not `code`).
Letter keys are matched case-insensitively.

## Parameters

### event

`KeyboardEvent`

The KeyboardEvent to check

### hotkey

The hotkey string or ParsedHotkey to match against

[`Hotkey`](../type-aliases/Hotkey.md) | [`ParsedHotkey`](../interfaces/ParsedHotkey.md)

### platform

The target platform for resolving 'Mod' (defaults to auto-detection)

`"mac"` | `"windows"` | `"linux"`

## Returns

`boolean`

True if the event matches the hotkey

## Example

```ts
document.addEventListener('keydown', (event) => {
  if (matchesKeyboardEvent(event, 'Mod+S')) {
    event.preventDefault()
    handleSave()
  }
})
```
