---
id: assertValidHotkey
title: assertValidHotkey
---

# Function: assertValidHotkey()

```ts
function assertValidHotkey(hotkey): void;
```

Defined in: [validate.ts:191](https://github.com/TanStack/keys/blob/main/packages/keys/src/validate.ts#L191)

Validates a hotkey and throws an error if invalid.
Useful for development-time validation.

## Parameters

### hotkey

`string`

The hotkey string to validate

## Returns

`void`

## Throws

Error if the hotkey is invalid

## Example

```ts
assertValidHotkey('Mod+S') // OK
assertValidHotkey('') // Throws Error: Invalid hotkey: Hotkey cannot be empty
```
