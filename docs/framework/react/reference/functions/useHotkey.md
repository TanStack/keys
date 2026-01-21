---
id: useHotkey
title: useHotkey
---

# Function: useHotkey()

```ts
function useHotkey(
   hotkey, 
   callback, 
   options): void;
```

Defined in: [useHotkey.ts:63](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkey.ts#L63)

React hook for registering a keyboard hotkey.

Uses the singleton HotkeyManager for efficient event handling.
The callback receives both the keyboard event and a context object
containing the hotkey string and parsed hotkey.

## Parameters

### hotkey

The hotkey string (e.g., 'Mod+S', 'Escape')

`Hotkey` | `ParsedHotkey`

### callback

`HotkeyCallback`

The function to call when the hotkey is pressed

### options

[`UseHotkeyOptions`](../interfaces/UseHotkeyOptions.md) = `{}`

Options for the hotkey behavior

## Returns

`void`

## Examples

```tsx
function SaveButton() {
  useHotkey('Mod+S', (event, { hotkey, parsedHotkey }) => {
    console.log(`${hotkey} was pressed`)
    handleSave()
  }, { preventDefault: true })

  return <button>Save</button>
}
```

```tsx
function Modal({ isOpen, onClose }) {
  // Only active when modal is open
  useHotkey('Escape', () => {
    onClose()
  }, { enabled: isOpen })

  if (!isOpen) return null
  return <div className="modal">...</div>
}
```

```tsx
function Editor() {
  // Prevent repeated triggering while holding
  useHotkey('Mod+S', () => {
    save()
  }, { preventDefault: true, requireReset: true })

  return <div>...</div>
}
```
