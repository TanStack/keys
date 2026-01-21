---
id: CreateHotkeyHandlerOptions
title: CreateHotkeyHandlerOptions
---

# Interface: CreateHotkeyHandlerOptions

Defined in: [match.ts:69](https://github.com/TanStack/keys/blob/main/packages/keys/src/match.ts#L69)

Options for creating a hotkey handler.

## Properties

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [match.ts:75](https://github.com/TanStack/keys/blob/main/packages/keys/src/match.ts#L75)

The target platform for resolving 'Mod'

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [match.ts:71](https://github.com/TanStack/keys/blob/main/packages/keys/src/match.ts#L71)

Prevent the default browser action when the hotkey matches

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [match.ts:73](https://github.com/TanStack/keys/blob/main/packages/keys/src/match.ts#L73)

Stop event propagation when the hotkey matches
