---
id: HotkeyManager
title: HotkeyManager
---

# Class: HotkeyManager

Defined in: [manager.ts:56](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L56)

Singleton manager for hotkey registrations.

This class provides a centralized way to register and manage keyboard hotkeys.
It uses a single event listener for efficiency, regardless of how many hotkeys
are registered.

## Example

```ts
const manager = HotkeyManager.getInstance()

const unregister = manager.register('Mod+S', (event, context) => {
  console.log('Save triggered!')
}, { preventDefault: true })

// Later, to unregister:
unregister()
```

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: [manager.ts:520](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L520)

Destroys the manager and removes all listeners.

#### Returns

`void`

***

### getRegistrationCount()

```ts
getRegistrationCount(): number;
```

Defined in: [manager.ts:491](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L491)

Gets the number of registered hotkeys.

#### Returns

`number`

***

### isRegistered()

```ts
isRegistered(hotkey, target?): boolean;
```

Defined in: [manager.ts:502](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L502)

Checks if a specific hotkey is registered.

#### Parameters

##### hotkey

[`Hotkey`](../type-aliases/Hotkey.md)

The hotkey string to check

##### target?

Optional target element to match (if provided, both hotkey and target must match)

`HTMLElement` | `Document` | `Window`

#### Returns

`boolean`

True if a matching registration exists

***

### register()

```ts
register(
   hotkey, 
   callback, 
   options): HotkeyRegistrationHandle;
```

Defined in: [manager.ts:120](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L120)

Registers a hotkey handler and returns a handle for updating the registration.

The returned handle allows updating the callback and options without
re-registering, which is useful for avoiding stale closures in React.

#### Parameters

##### hotkey

[`Hotkey`](../type-aliases/Hotkey.md)

The hotkey string to listen for

##### callback

[`HotkeyCallback`](../type-aliases/HotkeyCallback.md)

The function to call when the hotkey is pressed

##### options

[`HotkeyOptions`](../interfaces/HotkeyOptions.md) = `{}`

Options for the hotkey behavior

#### Returns

[`HotkeyRegistrationHandle`](../interfaces/HotkeyRegistrationHandle.md)

A handle for managing the registration

#### Example

```ts
const handle = manager.register('Mod+S', callback, { preventDefault: true })

// Update callback without re-registering (avoids stale closures)
handle.callback = newCallback

// Update options
handle.setOptions({ enabled: false })

// Unregister when done
handle.unregister()
```

***

### getInstance()

```ts
static getInstance(): HotkeyManager;
```

Defined in: [manager.ts:78](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L78)

Gets the singleton instance of HotkeyManager.

#### Returns

`HotkeyManager`

***

### resetInstance()

```ts
static resetInstance(): void;
```

Defined in: [manager.ts:88](https://github.com/TanStack/keys/blob/main/packages/keys/src/manager.ts#L88)

Resets the singleton instance. Useful for testing.

#### Returns

`void`
