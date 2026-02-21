---
id: SequenceRegistrationHandle
title: SequenceRegistrationHandle
---

# Interface: SequenceRegistrationHandle

Defined in: [sequence-manager.ts:105](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L105)

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

Defined in: [sequence-manager.ts:108](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L108)

***

### id

```ts
readonly id: string;
```

Defined in: [sequence-manager.ts:106](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L106)

***

### isActive

```ts
readonly isActive: boolean;
```

Defined in: [sequence-manager.ts:107](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L107)

***

### setOptions()

```ts
setOptions: (options) => void;
```

Defined in: [sequence-manager.ts:109](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L109)

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

Defined in: [sequence-manager.ts:110](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/sequence-manager.ts#L110)

#### Returns

`void`
