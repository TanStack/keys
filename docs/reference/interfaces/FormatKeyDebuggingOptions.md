---
id: FormatKeyDebuggingOptions
title: FormatKeyDebuggingOptions
---

# Interface: FormatKeyDebuggingOptions

Defined in: [format.ts:187](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/format.ts#L187)

Options for formatting a single key for debugging display.

## Properties

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [format.ts:189](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/format.ts#L189)

The target platform. Defaults to auto-detection.

***

### source?

```ts
optional source: "key" | "code";
```

Defined in: [format.ts:198](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/format.ts#L198)

Whether the input value comes from `event.key` or `event.code`.

- `'key'` (default): Applies rich platform-aware formatting (modifier
  labels, special-key symbols, etc.).
- `'code'`: Returns the value unchanged — physical key codes like
  `"MetaLeft"` or `"KeyA"` are already descriptive for debugging.
