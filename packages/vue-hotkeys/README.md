<div align="center">
  <img src="./media/header_hotkeys.png" alt="TanStack Hotkeys" />
</div>

<br />

<div align="center">
	<a href="https://www.npmjs.com/package/@tanstack/hotkeys" target="\_parent">
	  <img alt="" src="https://img.shields.io/npm/dm/@tanstack/hotkeys.svg" alt="npm downloads" />
	</a>
	<a href="https://github.com/TanStack/hotkeys" target="\_parent">
	  <img alt="" src="https://img.shields.io/github/stars/TanStack/hotkeys.svg?style=social&label=Star" alt="GitHub stars" />
	</a>
	<a href="https://bundlephobia.com/result?p=@tanstack/vue-hotkeys@latest" target="\_parent">
	  <img alt="" src="https://badgen.net/bundlephobia/minzip/@tanstack/vue-hotkeys@latest" alt="Bundle size" />
	</a>
</div>

<div align="center">
	<a href="#badge">
	  <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
	</a>
	<a href="#badge">
	  <img src="https://img.shields.io/github/v/release/tanstack/hotkeys" alt="Release"/>
	</a>
	<a href="https://twitter.com/tan_stack">
	  <img src="https://img.shields.io/twitter/follow/tan_stack.svg?style=social" alt="Follow @TanStack"/>
	</a>
</div>

<div align="center">

### [Become a Sponsor!](https://github.com/sponsors/tannerlinsley/)

</div>

# TanStack Hotkeys for Vue

> [!NOTE]
> TanStack Hotkeys is pre-alpha (prototyping phase). We are actively developing the library and are open to feedback and contributions.

Type-safe keyboard shortcuts for Vue. Template-string bindings, parsed objects, a cross-platform `Mod` key, a singleton Hotkey Manager, and utilities for cheatsheet UIs—built to stay SSR-friendly.

- Type-safe bindings — template strings (`Mod+Shift+S`, `Escape`) or parsed objects for full control
- Flexible options — `keydown`/`keyup`, `preventDefault`, `stopPropagation`, conditional enabled, `requireReset`
- Cross-platform Mod — maps to Cmd on macOS and Ctrl on Windows/Linux
- Batteries included — validation + matching, sequences (Vim-style), key-state tracking, recorder UI helpers, Vue composables, and devtools (in progress)

### <a href="https://tanstack.com/hotkeys">Read the docs →</a>

## Installation

```bash
pnpm add @tanstack/vue-hotkeys
# or
npm install @tanstack/vue-hotkeys
# or
yarn add @tanstack/vue-hotkeys
```

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { useHotkey } from '@tanstack/vue-hotkeys'

const count = ref(0)

// Basic hotkey
useHotkey('Mod+S', (event) => {
  event.preventDefault()
  console.log('Save triggered!')
})

// Reactive options
const isModalOpen = ref(false)
useHotkey('Escape', () => {
  isModalOpen.value = false
}, { enabled: isModalOpen })

// Scoped to an element
const editorRef = ref(null)
useHotkey('Mod+K', () => {
  // Only triggers when editor is focused
  console.log('Command palette!')
}, { target: editorRef })
</script>

<template>
  <div>
    <button @click="count++">Count: {{ count }}</button>
    <div ref="editorRef" contenteditable>
      Focus me and press Mod+K
    </div>
  </div>
</template>
```

## Features

### Composables

- `useHotkey` — Register a keyboard shortcut
- `useHotkeySequence` — Register multi-key sequences (Vim-style like 'g g')
- `useHeldKeys` — Track currently pressed keys
- `useKeyHold` — Check if a specific key is held
- `useHotkeyRecorder` — Record hotkeys from user input
- `HotkeysProvider` — Provide default options to all hotkeys

### Advanced Usage

```vue
<script setup>
import { useHotkeySequence, useHeldKeys, useHotkeyRecorder } from '@tanstack/vue-hotkeys'

// Vim-style sequences
useHotkeySequence(['G', 'G'], () => {
  scrollToTop()
})

// Track all held keys
const heldKeys = useHeldKeys()

// Record new shortcuts
const recorder = useHotkeyRecorder({
  onRecord: (hotkey) => {
    console.log('Recorded:', hotkey)
  }
})
</script>

<template>
  <div>
    <div>Pressed keys: {{ heldKeys.join(' + ') }}</div>
    <button @click="recorder.startRecording()">
      {{ recorder.isRecording ? 'Recording...' : 'Record Shortcut' }}
    </button>
  </div>
</template>
```

## License

MIT © [Tanner Linsley](https://github.com/tannerlinsley)
