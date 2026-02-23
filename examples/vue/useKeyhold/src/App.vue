<script setup lang="ts">
import { useKeyHold } from '@tanstack/vue-hotkeys'

const isShiftHeld = useKeyHold('Shift')
const isControlHeld = useKeyHold('Control')
const isAltHeld = useKeyHold('Alt')
const isMetaHeld = useKeyHold('Meta')
const isSpaceHeld = useKeyHold('Space')
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
    <h1>useKeyHold</h1>
    <p>Returns a boolean indicating if a specific key is currently held.</p>
    
    <h2>Modifier Key States</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 2rem 0;">
      <div
        :style="{
          padding: '2rem',
          background: isShiftHeld ? '#4caf50' : '#f5f5f5',
          color: isShiftHeld ? 'white' : 'black',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.2s',
        }"
      >
        <div style="font-size: 1.5rem; font-weight: bold;">Shift</div>
        <div>{{ isShiftHeld ? 'HELD' : 'Released' }}</div>
      </div>
      
      <div
        :style="{
          padding: '2rem',
          background: isControlHeld ? '#4caf50' : '#f5f5f5',
          color: isControlHeld ? 'white' : 'black',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.2s',
        }"
      >
        <div style="font-size: 1.5rem; font-weight: bold;">Control</div>
        <div>{{ isControlHeld ? 'HELD' : 'Released' }}</div>
      </div>
      
      <div
        :style="{
          padding: '2rem',
          background: isAltHeld ? '#4caf50' : '#f5f5f5',
          color: isAltHeld ? 'white' : 'black',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.2s',
        }"
      >
        <div style="font-size: 1.5rem; font-weight: bold;">Alt</div>
        <div>{{ isAltHeld ? 'HELD' : 'Released' }}</div>
      </div>
      
      <div
        :style="{
          padding: '2rem',
          background: isMetaHeld ? '#4caf50' : '#f5f5f5',
          color: isMetaHeld ? 'white' : 'black',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.2s',
        }"
      >
        <div style="font-size: 1.5rem; font-weight: bold;">Meta (⌘/⊞)</div>
        <div>{{ isMetaHeld ? 'HELD' : 'Released' }}</div>
      </div>
    </div>

    <h2>Space Bar Demo</h2>
    <div
      :style="{
        padding: '3rem',
        background: isSpaceHeld ? '#2196f3' : '#f5f5f5',
        color: isSpaceHeld ? 'white' : 'black',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        transition: 'all 0.2s',
        margin: '2rem 0',
      }"
    >
      {{ isSpaceHeld ? '🚀 SPACE HELD!' : 'Hold Space Bar' }}
    </div>

    <h2>Usage</h2>
    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>import { useKeyHold } from '@tanstack/vue-hotkeys'

const isShiftHeld = useKeyHold('Shift')

// isShiftHeld is a reactive ref (boolean)</code></pre>
  </div>
</template>
