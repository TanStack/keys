---
id: validateHotkey
title: validateHotkey
---

# Function: validateHotkey()

```ts
function validateHotkey(hotkey): ValidationResult;
```

Defined in: [validate.ts:37](https://github.com/TanStack/keys/blob/main/packages/keys/src/validate.ts#L37)

Validates a hotkey string and returns any warnings or errors.

Checks for:
- Valid syntax (modifier+...+key format)
- Known modifiers
- Known keys
- Potential issues like Alt+letter on macOS or Shift+number

## Parameters

### hotkey

`string`

The hotkey string to validate

## Returns

[`ValidationResult`](../interfaces/ValidationResult.md)

A ValidationResult with validity status, warnings, and errors

## Example

```ts
validateHotkey('Mod+S')
// { valid: true, warnings: [], errors: [] }

validateHotkey('Alt+C')
// { valid: true, warnings: ['Alt+letter shortcuts may not work reliably on macOS...'], errors: [] }

validateHotkey('Shift+1')
// { valid: true, warnings: ['Shift+number produces different characters on different keyboard layouts...'], errors: [] }

validateHotkey('')
// { valid: false, warnings: [], errors: ['Hotkey cannot be empty'] }
```
