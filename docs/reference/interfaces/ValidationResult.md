---
id: ValidationResult
title: ValidationResult
---

# Interface: ValidationResult

Defined in: [hotkey.ts:373](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/hotkey.ts#L373)

Result of validating a hotkey string.

## Properties

### errors

```ts
errors: string[];
```

Defined in: [hotkey.ts:379](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/hotkey.ts#L379)

Error messages about invalid syntax

***

### valid

```ts
valid: boolean;
```

Defined in: [hotkey.ts:375](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/hotkey.ts#L375)

Whether the hotkey is valid (can still have warnings)

***

### warnings

```ts
warnings: string[];
```

Defined in: [hotkey.ts:377](https://github.com/TanStack/hotkeys/blob/main/packages/hotkeys/src/hotkey.ts#L377)

Warning messages about potential issues
