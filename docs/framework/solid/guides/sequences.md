---
title: Sequences Guide
id: sequences
---

TanStack Hotkeys supports multi-key sequences -- shortcuts where you press keys one after another rather than simultaneously. This is commonly used for Vim-style navigation, cheat codes, or multi-step commands.

## Basic Usage

Use the `createHotkeySequence` primitive to register a key sequence:

```tsx
import { createHotkeySequence } from '@tanstack/solid-hotkeys'

function App() {
  // Vim-style: press g then g to scroll to top
  createHotkeySequence(['G', 'G'], () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
```

The first argument is an array of `Hotkey` strings representing each step in the sequence. The user must press them in order within the timeout window.

## Reactive Options

Solid's `createHotkeySequence` accepts **accessor functions** for reactive sequence and options:

```tsx
const [isVimMode, setIsVimMode] = createSignal(true)
const [sequence] = createSignal(['G', 'G'] as const)

createHotkeySequence(
  sequence,
  () => scrollToTop(),
  () => ({ enabled: isVimMode(), timeout: 1500 }),
)
```

## Sequence Options

The third argument is an options object (or accessor returning options):

```tsx
createHotkeySequence(['G', 'G'], callback, {
  timeout: 1000,  // Time allowed between keys (ms)
  enabled: true,  // Whether the sequence is active
  target: document, // Or from an accessor for scoped sequences
})
```

### `timeout`

The maximum time (in milliseconds) allowed between consecutive key presses. Defaults to `1000` (1 second).

```tsx
createHotkeySequence(['D', 'D'], () => deleteLine(), { timeout: 500 })
createHotkeySequence(['Shift+Z', 'Shift+Z'], () => forceQuit(), { timeout: 2000 })
```

### `enabled`

Controls whether the sequence is active. Defaults to `true`. Use an accessor for reactive control.

```tsx
const [isVimMode, setIsVimMode] = createSignal(true)

createHotkeySequence(['G', 'G'], () => scrollToTop(), () => ({
  enabled: isVimMode(),
}))
```

### `target`

The DOM element to attach the sequence listener to. Defaults to `document`. Can be from an accessor when the target becomes available after mount.

### Global Default Options via Provider

```tsx
import { HotkeysProvider } from '@tanstack/solid-hotkeys'

<HotkeysProvider
  defaultOptions={{
    hotkeySequence: { timeout: 1500 },
  }}
>
  <App />
</HotkeysProvider>
```

## Sequences with Modifiers

Each step in a sequence can include modifiers:

```tsx
createHotkeySequence(['Mod+K', 'Mod+C'], () => commentSelection())
createHotkeySequence(['G', 'Shift+G'], () => scrollToBottom())
```

## Common Sequence Patterns

### Vim-Style Navigation

```tsx
function VimNavigation() {
  createHotkeySequence(['G', 'G'], () => scrollToTop())
  createHotkeySequence(['G', 'Shift+G'], () => scrollToBottom())
  createHotkeySequence(['D', 'D'], () => deleteLine())
  createHotkeySequence(['D', 'W'], () => deleteWord())
  createHotkeySequence(['C', 'I', 'W'], () => changeInnerWord())
}
```

### Konami Code

```tsx
createHotkeySequence(
  [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'B', 'A',
  ],
  () => enableEasterEgg(),
  { timeout: 2000 },
)
```

### Multi-Step Commands

```tsx
createHotkeySequence(['H', 'E', 'L', 'P'], () => openHelp())
```

## How Sequences Work

The `SequenceManager` (singleton) handles all sequence registrations. When a key is pressed:

1. It checks if the key matches the next expected step in any registered sequence
2. If it matches, the sequence advances to the next step
3. If the timeout expires between steps, the sequence resets
4. When all steps are completed, the callback fires

### Overlapping Sequences

Multiple sequences can share the same prefix. The manager tracks progress for each sequence independently:

```tsx
createHotkeySequence(['D', 'D'], () => deleteLine())
createHotkeySequence(['D', 'W'], () => deleteWord())
createHotkeySequence(['D', 'I', 'W'], () => deleteInnerWord())
```

## The Sequence Manager

Under the hood, `createHotkeySequence` uses the singleton `SequenceManager`. You can also use the core `createSequenceMatcher` function for standalone sequence matching:

```tsx
import { createSequenceMatcher } from '@tanstack/solid-hotkeys'

const matcher = createSequenceMatcher(['G', 'G'], { timeout: 1000 })

document.addEventListener('keydown', (e) => {
  if (matcher.match(e)) {
    console.log('Sequence completed!')
  }
  console.log('Progress:', matcher.getProgress())
})
```
