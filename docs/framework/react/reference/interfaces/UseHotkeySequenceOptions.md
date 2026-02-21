---
id: UseHotkeySequenceOptions
title: UseHotkeySequenceOptions
---

# Interface: UseHotkeySequenceOptions

Defined in: [useHotkeySequence.ts:12](https://github.com/TanStack/hotkeys/blob/main/packages/react-hotkeys/src/useHotkeySequence.ts#L12)

## Extends

- `Omit`\<`SequenceOptions`, `"target"`\>

## Properties

### target?

```ts
optional target: 
  | HTMLElement
  | Document
  | Window
  | RefObject<HTMLElement | null>
  | null;
```

Defined in: [useHotkeySequence.ts:21](https://github.com/TanStack/hotkeys/blob/main/packages/react-hotkeys/src/useHotkeySequence.ts#L21)

The DOM element to attach the event listener to.
Can be a React ref, direct DOM element, or null.
Defaults to document.
