---
id: SequenceManager
title: SequenceManager
---

# Class: SequenceManager

Defined in: [sequence-manager.ts:119](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L119)

Manages keyboard sequence matching for Vim-style shortcuts.

This class allows registering multi-key sequences like 'g g' or 'd d'
that trigger callbacks when the full sequence is pressed within
a configurable timeout.

## Example

```ts
const matcher = SequenceManager.getInstance()

// Register 'g g' to go to top
const unregister = matcher.register(['G', 'G'], (event, context) => {
  scrollToTop()
}, { timeout: 500 })

// Later, to unregister:
unregister()
```

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: [sequence-manager.ts:501](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L501)

Destroys the manager and removes all listeners.

#### Returns

`void`

***

### getRegistrationCount()

```ts
getRegistrationCount(): number;
```

Defined in: [sequence-manager.ts:494](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L494)

Gets the number of registered sequences.

#### Returns

`number`

***

### register()

```ts
register(
   sequence, 
   callback, 
   options): SequenceRegistrationHandle;
```

Defined in: [sequence-manager.ts:165](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L165)

Registers a hotkey sequence handler.

#### Parameters

##### sequence

[`HotkeySequence`](../type-aliases/HotkeySequence.md)

Array of hotkey strings that form the sequence

##### callback

[`HotkeyCallback`](../type-aliases/HotkeyCallback.md)

Function to call when the sequence is completed

##### options

[`SequenceOptions`](../interfaces/SequenceOptions.md) = `{}`

Options for the sequence behavior

#### Returns

[`SequenceRegistrationHandle`](../interfaces/SequenceRegistrationHandle.md)

A handle to update or unregister the sequence

***

### resetAll()

```ts
resetAll(): void;
```

Defined in: [sequence-manager.ts:484](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L484)

Resets all sequence progress.

#### Returns

`void`

***

### getInstance()

```ts
static getInstance(): SequenceManager;
```

Defined in: [sequence-manager.ts:140](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L140)

Gets the singleton instance of SequenceManager.

#### Returns

`SequenceManager`

***

### resetInstance()

```ts
static resetInstance(): void;
```

Defined in: [sequence-manager.ts:150](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L150)

Resets the singleton instance. Useful for testing.

#### Returns

`void`
