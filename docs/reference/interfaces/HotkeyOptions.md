---
id: HotkeyOptions
title: HotkeyOptions
---

# Interface: HotkeyOptions

Defined in: [types.ts:301](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L301)

Options for registering a hotkey.

## Extended by

- [`SequenceOptions`](SequenceOptions.md)

## Properties

### enabled?

```ts
optional enabled: boolean;
```

Defined in: [types.ts:313](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L313)

Whether the hotkey is enabled. Defaults to true

***

### eventType?

```ts
optional eventType: "keydown" | "keyup";
```

Defined in: [types.ts:309](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L309)

The event type to listen for. Defaults to 'keydown'

***

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [types.ts:307](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L307)

The target platform for resolving 'Mod'

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [types.ts:303](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L303)

Prevent the default browser action when the hotkey matches

***

### requireReset?

```ts
optional requireReset: boolean;
```

Defined in: [types.ts:311](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L311)

If true, only trigger once until all keys are released. Default: false

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [types.ts:305](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L305)

Stop event propagation when the hotkey matches
