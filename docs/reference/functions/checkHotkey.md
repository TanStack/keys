---
id: checkHotkey
title: checkHotkey
---

# Function: checkHotkey()

```ts
function checkHotkey(hotkey): boolean;
```

Defined in: [validate.ts:212](https://github.com/TanStack/keys/blob/main/packages/keys/src/validate.ts#L212)

Validates a hotkey and logs warnings to the console.
Useful for development-time feedback.

## Parameters

### hotkey

`string`

The hotkey string to validate

## Returns

`boolean`

True if the hotkey is valid (may still have warnings)

## Example

```ts
checkHotkey('Alt+C')
// Console: Warning: Alt+C may not work reliably on macOS...
// Returns: true
```
