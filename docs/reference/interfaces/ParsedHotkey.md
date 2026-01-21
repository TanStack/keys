---
id: ParsedHotkey
title: ParsedHotkey
---

# Interface: ParsedHotkey

Defined in: [types.ts:226](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L226)

A parsed representation of a hotkey string.

## Properties

### alt

```ts
alt: boolean;
```

Defined in: [types.ts:234](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L234)

Whether the Alt key is required

***

### ctrl

```ts
ctrl: boolean;
```

Defined in: [types.ts:230](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L230)

Whether the Control key is required

***

### key

```ts
key: string;
```

Defined in: [types.ts:228](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L228)

The non-modifier key (e.g., 'S', 'Escape', 'F1')

***

### meta

```ts
meta: boolean;
```

Defined in: [types.ts:236](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L236)

Whether the Meta (Command) key is required

***

### modifiers

```ts
modifiers: CanonicalModifier[];
```

Defined in: [types.ts:238](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L238)

List of canonical modifier names that are required

***

### shift

```ts
shift: boolean;
```

Defined in: [types.ts:232](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L232)

Whether the Shift key is required
