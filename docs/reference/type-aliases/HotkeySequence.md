---
id: HotkeySequence
title: HotkeySequence
---

# Type Alias: HotkeySequence

```ts
type HotkeySequence = Hotkey[];
```

Defined in: [sequence-manager.ts:41](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L41)

A sequence of hotkeys for Vim-style shortcuts.

## Example

```ts
const gotoTop: HotkeySequence = ['G', 'G']  // gg
const deleteLine: HotkeySequence = ['D', 'D']  // dd
const deleteWord: HotkeySequence = ['D', 'I', 'W']  // diw
```
