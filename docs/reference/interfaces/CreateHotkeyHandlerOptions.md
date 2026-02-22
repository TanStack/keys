---
id: CreateHotkeyHandlerOptions
title: CreateHotkeyHandlerOptions
---

# Interface: CreateHotkeyHandlerOptions

Defined in: [match.ts:110](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/match.ts#L110)

Options for creating a hotkey handler.

## Properties

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [match.ts:116](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/match.ts#L116)

The target platform for resolving 'Mod'

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [match.ts:112](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/match.ts#L112)

Prevent the default browser action when the hotkey matches. Defaults to true

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [match.ts:114](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/match.ts#L114)

Stop event propagation when the hotkey matches. Defaults to true
