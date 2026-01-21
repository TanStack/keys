---
id: ValidationResult
title: ValidationResult
---

# Interface: ValidationResult

Defined in: [types.ts:252](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L252)

Result of validating a hotkey string.

## Properties

### errors

```ts
errors: string[];
```

Defined in: [types.ts:258](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L258)

Error messages about invalid syntax

***

### valid

```ts
valid: boolean;
```

Defined in: [types.ts:254](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L254)

Whether the hotkey is valid (can still have warnings)

***

### warnings

```ts
warnings: string[];
```

Defined in: [types.ts:256](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L256)

Warning messages about potential issues
