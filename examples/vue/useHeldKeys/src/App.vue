<script setup lang="ts">
import { formatKeyForDebuggingDisplay, useHeldKeyCodes, useHeldKeys } from '@tanstack/vue-hotkeys'

const heldKeys = useHeldKeys()
const heldCodes = useHeldKeyCodes()
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
    <h1>useHeldKeys</h1>
    <p>Returns an array of all currently pressed keys.</p>
    
    <div style="margin: 2rem 0; padding: 2rem; background: #f5f5f5; border-radius: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
      <template v-if="heldKeys.length > 0">
        <kbd
          v-for="(key, index) in heldKeys"
          :key="key"
          style="background: #333; color: white; padding: 0.5rem 1rem; border-radius: 4px; font-family: monospace;"
        >
          {{ formatKeyForDebuggingDisplay(key) }}
          <small v-if="heldCodes[key]" style="opacity: 0.6; font-size: 0.8em;">
            {{ formatKeyForDebuggingDisplay(heldCodes[key], { source: 'code' }) }}
          </small>
        </kbd>
        <span v-if="index < heldKeys.length - 1">+</span>
      </template>
      <span v-else style="opacity: 0.5;">Press any keys...</span>
    </div>

    <div>Keys held: <strong>{{ heldKeys.length }}</strong></div>
    
    <h2 style="margin-top: 2rem;">Usage</h2>
    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>import { useHeldKeys } from '@tanstack/vue-hotkeys'

const heldKeys = useHeldKeys()

// heldKeys is a reactive ref containing array of key names</code></pre>
  </div>
</template>
