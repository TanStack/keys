<script setup lang="ts">
import { ref } from 'vue'
import { useHotkey, useHotkeyRecorder, formatForDisplay, type Hotkey } from '@tanstack/vue-hotkeys'

const shortcuts = ref<Record<string, Hotkey | ''>>({
  save: 'Mod+K',
  open: 'Mod+E',
  new: 'Mod+G',
})

const recordingActionId = ref<string | null>(null)

const recorder = useHotkeyRecorder({
  onRecord: (hotkey: Hotkey) => {
    if (recordingActionId.value) {
      shortcuts.value[recordingActionId.value] = hotkey || ''
      recordingActionId.value = null
    }
  },
  onCancel: () => {
    recordingActionId.value = null
  },
  onClear: () => {
    if (recordingActionId.value) {
      shortcuts.value[recordingActionId.value] = ''
      recordingActionId.value = null
    }
  },
})

const startRecording = (actionId: string) => {
  recordingActionId.value = actionId
  recorder.startRecording()
}

// Use the recorded shortcuts
const saveCount = ref(0)
const openCount = ref(0)
const newCount = ref(0)

useHotkey(() => shortcuts.value.save, () => saveCount.value++, { enabled: !recorder.isRecording })
useHotkey(() => shortcuts.value.open, () => openCount.value++, { enabled: !recorder.isRecording })
useHotkey(() => shortcuts.value.new, () => newCount.value++, { enabled: !recorder.isRecording })
</script>

<template>
  <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
    <h1>useHotkeyRecorder</h1>
    <p>Record keyboard shortcuts from user input.</p>

    <div v-if="recorder.isRecording" style="margin: 2rem 0; padding: 2rem; background: #ff9800; color: white; border-radius: 8px; text-align: center;">
      <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
        Recording... Press keys now
      </div>
      <div v-if="recorder.recordedHotkey" style="font-size: 2rem; font-family: monospace;">
        {{ formatForDisplay(recorder.recordedHotkey) }}
      </div>
      <div style="margin-top: 1rem; opacity: 0.9;">
        Press <kbd style="background: white; color: #ff9800; padding: 0.25rem 0.5rem; border-radius: 4px;">Escape</kbd> to cancel or 
        <kbd style="background: white; color: #ff9800; padding: 0.25rem 0.5rem; border-radius: 4px;">Backspace</kbd> to clear
      </div>
    </div>

    <h2>Custom Shortcuts</h2>
    <div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
      <div
        v-for="(actionId, key) in { save: 'Save', open: 'Open', new: 'New' }"
        :key="key"
        style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;"
      >
        <div style="flex: 1;">
          <strong>{{ actionId }}</strong>
          <div style="opacity: 0.7; font-size: 0.9rem;">
            Triggered: {{ key === 'save' ? saveCount : key === 'open' ? openCount : newCount }} times
          </div>
        </div>
        <kbd
          v-if="shortcuts[key]"
          style="background: #333; color: white; padding: 0.5rem 1rem; border-radius: 4px; font-family: monospace; min-width: 100px; text-align: center;"
        >
          {{ formatForDisplay(shortcuts[key] as Hotkey) }}
        </kbd>
        <span v-else style="opacity: 0.5; min-width: 100px; text-align: center;">Not set</span>
        <button
          @click="startRecording(key)"
          :disabled="recorder.isRecording"
          style="padding: 0.5rem 1rem; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Record
        </button>
      </div>
    </div>

    <h2 style="margin-top: 2rem;">Usage</h2>
    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>import { useHotkeyRecorder } from '@tanstack/vue-hotkeys'

const recorder = useHotkeyRecorder({
  onRecord: (hotkey) => {
    console.log('Recorded:', hotkey)
  }
})

// recorder.isRecording - reactive boolean
// recorder.recordedHotkey - reactive Hotkey | null
// recorder.startRecording() - start recording
// recorder.stopRecording() - stop recording
// recorder.cancelRecording() - cancel recording</code></pre>
  </div>
</template>
