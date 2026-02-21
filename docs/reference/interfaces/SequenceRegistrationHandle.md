---
id: SequenceRegistrationHandle
title: SequenceRegistrationHandle
---

# Interface: SequenceRegistrationHandle

Defined in: [sequence-manager.ts:91](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L91)

A handle returned from SequenceManager.register() that allows updating
the callback and options without re-registering the sequence.

## Example

```ts
const handle = manager.register(['G', 'G'], callback, options)

handle.callback = newCallback
handle.setOptions({ timeout: 500 })
handle.unregister()
```

## Properties

### callback

```ts
callback: HotkeyCallback;
```

Defined in: [sequence-manager.ts:94](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L94)

***

### id

```ts
readonly id: string;
```

Defined in: [sequence-manager.ts:92](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L92)

***

### isActive

```ts
readonly isActive: boolean;
```

Defined in: [sequence-manager.ts:93](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L93)

***

### setOptions()

```ts
setOptions: (options) => void;
```

Defined in: [sequence-manager.ts:95](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L95)

#### Parameters

##### options

`Partial`\<[`SequenceOptions`](SequenceOptions.md)\>

#### Returns

`void`

***

### unregister()

```ts
unregister: () => void;
```

Defined in: [sequence-manager.ts:96](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L96)

#### Returns

`void`
