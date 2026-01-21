---
id: Modifier
title: Modifier
---

# Type Alias: Modifier

```ts
type Modifier = 
  | "Control"
  | "Ctrl"
  | "Shift"
  | "Alt"
  | "Option"
  | "Command"
  | "Cmd"
  | "CommandOrControl"
  | "Mod";
```

Defined in: [types.ts:13](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L13)

All supported modifier key names, including aliases.
- Control/Ctrl: The Control key
- Shift: The Shift key
- Alt/Option: The Alt key (Option on macOS)
- Command/Cmd: The Command key (macOS only)
- CommandOrControl/Mod: Command on macOS, Control on other platforms
