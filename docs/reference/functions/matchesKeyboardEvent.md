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

Defined in: [match.ts:37](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/match.ts#L37)

Checks if a KeyboardEvent matches a hotkey.

Uses the `key` property from KeyboardEvent for matching, with a fallback to `code`
for letter keys (A-Z), digit keys (0-9), and punctuation keys when `key` produces
unexpected characters (e.g., macOS Option+letter, Shift+number, or Shift+punctuation).
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
