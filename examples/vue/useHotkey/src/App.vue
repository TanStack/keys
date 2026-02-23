<script setup lang="ts">
import { ref } from 'vue'
import {  formatForDisplay, useHotkey } from '@tanstack/vue-hotkeys'
import type {Hotkey} from '@tanstack/vue-hotkeys';

const lastHotkey = ref<Hotkey | null>(null)
const saveCount = ref(0)
const incrementCount = ref(0)
const enabled = ref(true)
const activeTab = ref(1)

// Scoped shortcuts state
const modalOpen = ref(false)
const editorContent = ref('')
const sidebarShortcutCount = ref(0)
const modalShortcutCount = ref(0)
const editorShortcutCount = ref(0)

// Refs for scoped shortcuts
const sidebarRef = ref<HTMLDivElement | null>(null)
const modalRef = ref<HTMLDivElement | null>(null)
const editorRef = ref<HTMLTextAreaElement | null>(null)

// ============================================================================
// Basic Hotkeys
// ============================================================================

// Basic hotkey with callback context
useHotkey('Mod+S', (_event, { hotkey, parsedHotkey }) => {
  lastHotkey.value = hotkey
  saveCount.value++
  console.log('Hotkey triggered:', hotkey)
  console.log('Parsed hotkey:', parsedHotkey)
})

// requireReset prevents repeated triggering while holding keys
useHotkey(
  'Mod+K',
  (_event, { hotkey }) => {
    lastHotkey.value = hotkey
    incrementCount.value++
  },
  { requireReset: true },
)

// Conditional hotkey (enabled/disabled)
useHotkey(
  'Mod+E',
  (_event, { hotkey }) => {
    lastHotkey.value = hotkey
    alert('This hotkey can be toggled!')
  },
  { enabled: enabled.value },
)

// ============================================================================
// Number Key Combinations (Tab/Section Switching)
// ============================================================================

useHotkey('Mod+1', () => {
  lastHotkey.value = 'Mod+1'
  activeTab.value = 1
})

useHotkey('Mod+2', () => {
  lastHotkey.value = 'Mod+2'
  activeTab.value = 2
})

useHotkey('Mod+3', () => {
  lastHotkey.value = 'Mod+3'
  activeTab.value = 3
})

// ============================================================================
// Scoped Hotkeys
// ============================================================================

// Sidebar-scoped hotkey
useHotkey(
  'Mod+B',
  () => {
    sidebarShortcutCount.value++
  },
  { target: sidebarRef },
)

// Modal-scoped hotkey
useHotkey(
  'Escape',
  () => {
    modalShortcutCount.value++
    modalOpen.value = false
  },
  { target: modalRef, enabled: modalOpen },
)

// Editor-scoped hotkey
useHotkey(
  'Mod+/',
  (event) => {
    event.preventDefault()
    editorShortcutCount.value++
    const start = editorRef.value?.selectionStart || 0
    const end = editorRef.value?.selectionEnd || 0
    const text = editorContent.value
    const beforeSelection = text.substring(0, start)
    const selection = text.substring(start, end)
    const afterSelection = text.substring(end)
    
    editorContent.value = beforeSelection + '// ' + selection + afterSelection
  },
  { target: editorRef },
)
</script>

<template>
  <div class="app">
    <header>
      <h1>useHotkey</h1>
      <p>
        Register keyboard shortcuts with the useHotkey composable. Supports scoped
        shortcuts, conditional enabling, and cross-platform Mod key.
      </p>
    </header>

    <main>
      <section class="demo-section">
        <h2>Last Hotkey Pressed</h2>
        <div class="hotkey-display">
          {{ lastHotkey ? formatForDisplay(lastHotkey) : 'None yet' }}
        </div>
      </section>

      <section class="demo-section">
        <h2>Basic Hotkeys</h2>
        <div class="hotkey-list">
          <div class="hotkey-item">
            <kbd>{{ formatForDisplay('Mod+S') }}</kbd>
            <span>Save (triggered {{ saveCount }} times)</span>
          </div>
          <div class="hotkey-item">
            <kbd>{{ formatForDisplay('Mod+K') }}</kbd>
            <span>Increment (triggered {{ incrementCount }} times)</span>
          </div>
          <div class="hotkey-item">
            <kbd>{{ formatForDisplay('Mod+E') }}</kbd>
            <span>Alert ({{ enabled ? 'enabled' : 'disabled' }})</span>
            <button @click="enabled = !enabled">
              {{ enabled ? 'Disable' : 'Enable' }}
            </button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Tab Switching</h2>
        <div class="tabs">
          <button
            v-for="tab in [1, 2, 3]"
            :key="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            Tab {{ tab }} <kbd>{{ formatForDisplay(`Mod+${tab}`) }}</kbd>
          </button>
        </div>
        <div class="tab-content">
          <div v-if="activeTab === 1">Content for Tab 1</div>
          <div v-else-if="activeTab === 2">Content for Tab 2</div>
          <div v-else-if="activeTab === 3">Content for Tab 3</div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Scoped Hotkeys</h2>
        
        <div class="scoped-demo">
          <div ref="sidebarRef" tabindex="0" class="scoped-box sidebar">
            <h3>Sidebar (focus me)</h3>
            <p>Press <kbd>{{ formatForDisplay('Mod+B') }}</kbd> while focused</p>
            <p>Triggered {{ sidebarShortcutCount }} times</p>
          </div>

          <div class="scoped-box">
            <h3>Modal</h3>
            <button @click="modalOpen = true">Open Modal</button>
            <div v-if="modalOpen" class="modal-overlay">
              <div ref="modalRef" tabindex="0" class="modal">
                <p>Press <kbd>Escape</kbd> to close</p>
                <p>Triggered {{ modalShortcutCount }} times</p>
                <button @click="modalOpen = false">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="editor-demo">
          <h3>Code Editor</h3>
          <p>Focus and press <kbd>{{ formatForDisplay('Mod+/') }}</kbd> to comment</p>
          <textarea
            ref="editorRef"
            v-model="editorContent"
            class="code-editor"
            placeholder="Type some code here..."
          ></textarea>
          <p class="editor-stats">Comment shortcut used {{ editorShortcutCount }} times</p>
        </div>
      </section>
    </main>
  </div>
</template>
