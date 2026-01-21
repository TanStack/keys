---
id: HotkeyRegistration
title: HotkeyRegistration
---

# Interface: HotkeyRegistration

Defined in: [types.ts:347](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L347)

A registered hotkey handler in the HotkeyManager.

## Properties

### callback

```ts
callback: HotkeyCallback;
```

Defined in: [types.ts:355](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L355)

The callback to invoke

***

### hasFired

```ts
hasFired: boolean;
```

Defined in: [types.ts:359](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L359)

Whether this registration has fired and needs reset (for requireReset)

***

### hotkey

```ts
hotkey: Hotkey;
```

Defined in: [types.ts:351](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L351)

The original hotkey string

***

### id

```ts
id: string;
```

Defined in: [types.ts:349](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L349)

Unique identifier for this registration

***

### options

```ts
options: HotkeyOptions;
```

Defined in: [types.ts:357](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L357)

Options for this registration

***

### parsedHotkey

```ts
parsedHotkey: ParsedHotkey;
```

Defined in: [types.ts:353](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L353)

The parsed hotkey
