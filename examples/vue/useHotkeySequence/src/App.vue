<script setup lang="ts">
import { ref } from 'vue'
import { useHotkey, useHotkeySequence } from '@tanstack/vue-hotkeys'

const lastSequence = ref<string | null>(null)
const history = ref<Array<string>>([])

const addToHistory = (action: string) => {
  lastSequence.value = action
  history.value = [...history.value.slice(-9), action]
}

// Vim-style sequences
useHotkeySequence(['G', 'G'], () => addToHistory('gg → Go to top'))
useHotkeySequence(['Shift+G'], () => addToHistory('G → Go to bottom'))
useHotkeySequence(['D', 'D'], () => addToHistory('dd → Delete line'))
useHotkeySequence(['Y', 'Y'], () => addToHistory('yy → Yank (copy) line'))
useHotkeySequence(['D', 'W'], () => addToHistory('dw → Delete word'))
useHotkeySequence(['C', 'I', 'W'], () => addToHistory('ciw → Change inner word'))

// Arrow key sequences
useHotkeySequence(
  ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'],
  () => addToHistory('↑↑↓↓ → Konami code (partial)'),
  { timeout: 1500 }
)

// Clear history with Escape
useHotkey('Escape', () => {
  lastSequence.value = null
  history.value = []
})
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
    <h1>useHotkeySequence</h1>
    <p>Register multi-key sequences (like Vim commands).</p>
    
    <div v-if="lastSequence" style="margin: 2rem 0; padding: 2rem; background: #4caf50; color: white; border-radius: 8px; text-align: center; font-size: 1.5rem;">
      {{ lastSequence }}
    </div>

    <h2>Vim-Style Commands</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Sequence</th>
          <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>g</kbd> <kbd>g</kbd></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Go to top</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>G</kbd> (Shift+G)</td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Go to bottom</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>d</kbd> <kbd>d</kbd></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Delete line</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>y</kbd> <kbd>y</kbd></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Yank (copy) line</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>d</kbd> <kbd>w</kbd></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Delete word</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; border: 1px solid #ddd;"><kbd>c</kbd> <kbd>i</kbd> <kbd>w</kbd></td>
          <td style="padding: 0.75rem; border: 1px solid #ddd;">Change inner word</td>
        </tr>
      </tbody>
    </table>

    <h2>History</h2>
    <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px; min-height: 100px;">
      <div v-if="history.length === 0" style="opacity: 0.5;">Try typing a sequence...</div>
      <div v-else>
        <div v-for="(item, index) in history" :key="index" style="padding: 0.5rem 0;">
          {{ item }}
        </div>
      </div>
    </div>

    <p style="margin-top: 1rem; opacity: 0.7;">Press <kbd>Escape</kbd> to clear history</p>

    <h2 style="margin-top: 2rem;">Usage</h2>
    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>import { useHotkeySequence } from '@tanstack/vue-hotkeys'

useHotkeySequence(['G', 'G'], () => {
  console.log('Go to top!')
})</code></pre>
  </div>
</template>

<style>
kbd {
  background: #333;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}
</style>
