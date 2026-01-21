---
id: SequenceOptions
title: SequenceOptions
---

# Interface: SequenceOptions

Defined in: [types.ts:335](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L335)

Options for hotkey sequence matching.

## Extends

- [`HotkeyOptions`](HotkeyOptions.md)

## Properties

### enabled?

```ts
optional enabled: boolean;
```

Defined in: [types.ts:313](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L313)

Whether the hotkey is enabled. Defaults to true

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`enabled`](HotkeyOptions.md#enabled)

***

### eventType?

```ts
optional eventType: "keydown" | "keyup";
```

Defined in: [types.ts:309](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L309)

The event type to listen for. Defaults to 'keydown'

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`eventType`](HotkeyOptions.md#eventtype)

***

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [types.ts:307](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L307)

The target platform for resolving 'Mod'

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`platform`](HotkeyOptions.md#platform)

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [types.ts:303](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L303)

Prevent the default browser action when the hotkey matches

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`preventDefault`](HotkeyOptions.md#preventdefault)

***

### requireReset?

```ts
optional requireReset: boolean;
```

Defined in: [types.ts:311](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L311)

If true, only trigger once until all keys are released. Default: false

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`requireReset`](HotkeyOptions.md#requirereset)

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [types.ts:305](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L305)

Stop event propagation when the hotkey matches

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`stopPropagation`](HotkeyOptions.md#stoppropagation)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [types.ts:337](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L337)

Timeout between keys in milliseconds. Default: 1000
