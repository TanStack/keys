---
id: HotkeyCallbackContext
title: HotkeyCallbackContext
---

# Interface: HotkeyCallbackContext

Defined in: [types.ts:268](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L268)

Context passed to hotkey callbacks along with the keyboard event.

## Properties

### hotkey

```ts
hotkey: Hotkey;
```

Defined in: [types.ts:270](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L270)

The original hotkey string that was registered

***

### parsedHotkey

```ts
parsedHotkey: ParsedHotkey;
```

Defined in: [types.ts:272](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L272)

The parsed representation of the hotkey
