import {   onUnmounted, unref } from 'vue'
import { useStore } from '@tanstack/vue-store'
import { HotkeyRecorder } from '@tanstack/hotkeys'
import { useDefaultHotkeysOptions } from './HotkeysProviderContext'
import type {MaybeRefOrGetter, Ref} from 'vue';
import type { Hotkey, HotkeyRecorderOptions } from '@tanstack/hotkeys'

export interface VueHotkeyRecorder {
  /** Whether recording is currently active */
  isRecording: Ref<boolean>
  /** The currently recorded hotkey (for live preview) */
  recordedHotkey: Ref<Hotkey | null>
  /** Start recording a new hotkey */
  startRecording: () => void
  /** Stop recording (same as cancel) */
  stopRecording: () => void
  /** Cancel recording without saving */
  cancelRecording: () => void
}

/**
 * Vue composable for recording keyboard shortcuts.
 *
 * This composable provides a thin wrapper around the framework-agnostic `HotkeyRecorder`
 * class, managing all the complexity of capturing keyboard events, converting them
 * to hotkey strings, and handling edge cases like Escape to cancel or Backspace/Delete
 * to clear.
 *
 * @param options - Configuration options for the recorder
 * @returns An object with recording state and control functions
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useHotkeyRecorder } from '@tanstack/vue-hotkeys'
 *
 * const shortcut = ref<Hotkey>('Mod+S')
 *
 * const recorder = useHotkeyRecorder({
 *   onRecord: (hotkey) => {
 *     shortcut.value = hotkey
 *   },
 *   onCancel: () => {
 *     console.log('Recording cancelled')
 *   },
 * })
 * </script>
 *
 * <template>
 *   <div>
 *     <button @click="recorder.startRecording()">
 *       {{ recorder.isRecording ? 'Recording...' : 'Edit Shortcut' }}
 *     </button>
 *     <div v-if="recorder.recordedHotkey">
 *       Recording: {{ recorder.recordedHotkey }}
 *     </div>
 *   </div>
 * </template>
 * ```
 */
export function useHotkeyRecorder(
  options: MaybeRefOrGetter<HotkeyRecorderOptions>,
): VueHotkeyRecorder {
  const defaultOptions = useDefaultHotkeysOptions()

  // Merge default options with provided options
  const resolvedOptions = unref(options)
  const mergedOptions = {
    ...defaultOptions.hotkeyRecorder,
    ...resolvedOptions,
  } as HotkeyRecorderOptions

  // Create recorder instance
  const recorder = new HotkeyRecorder(mergedOptions)

  // Subscribe to recorder state using useStore
  const isRecording = useStore(recorder.store, (state) => state.isRecording)
  const recordedHotkey = useStore(
    recorder.store,
    (state) => state.recordedHotkey,
  )

  // Cleanup on unmount
  onUnmounted(() => {
    recorder.destroy()
  })

  return {
    isRecording: isRecording as Ref<boolean>,
    recordedHotkey: recordedHotkey as Ref<Hotkey | null>,
    startRecording: () => recorder.start(),
    stopRecording: () => recorder.stop(),
    cancelRecording: () => recorder.cancel(),
  }
}
