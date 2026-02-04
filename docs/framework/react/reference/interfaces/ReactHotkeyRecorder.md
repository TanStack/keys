---
id: ReactHotkeyRecorder
title: ReactHotkeyRecorder
---

# Interface: ReactHotkeyRecorder

Defined in: [useHotkeyRecorder.ts:9](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L9)

## Properties

### cancelRecording()

```ts
cancelRecording: () => void;
```

Defined in: [useHotkeyRecorder.ts:19](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L19)

Cancel recording without saving

#### Returns

`void`

***

### isRecording

```ts
isRecording: boolean;
```

Defined in: [useHotkeyRecorder.ts:11](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L11)

Whether recording is currently active

***

### recordedHotkey

```ts
recordedHotkey: Hotkey | null;
```

Defined in: [useHotkeyRecorder.ts:13](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L13)

The currently recorded hotkey (for live preview)

***

### startRecording()

```ts
startRecording: () => void;
```

Defined in: [useHotkeyRecorder.ts:15](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L15)

Start recording a new hotkey

#### Returns

`void`

***

### stopRecording()

```ts
stopRecording: () => void;
```

Defined in: [useHotkeyRecorder.ts:17](https://github.com/TanStack/keys/blob/main/packages/react-keys/src/useHotkeyRecorder.ts#L17)

Stop recording (same as cancel)

#### Returns

`void`
