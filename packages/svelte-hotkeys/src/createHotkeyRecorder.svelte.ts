import { HotkeyRecorder } from '@tanstack/hotkeys'
import type { Hotkey, HotkeyRecorderOptions } from '@tanstack/hotkeys'
import { getDefaultHotkeysOptions } from './HotkeysCtx'
import { onDestroy } from 'svelte'

export interface SvelteHotkeyRecorder {
  /** Whether recording is currently active */
  isRecording: boolean
  /** The currently recorded hotkey (for live preview) */
  recordedHotkey: Hotkey | null
  /** Start recording a new hotkey */
  startRecording: () => void
  /** Stop recording (same as cancel) */
  stopRecording: () => void
  /** Cancel recording without saving */
  cancelRecording: () => void
}

/**
 * Svelte function for recording keyboard shortcuts.
 *
 * This function provides a thin wrapper around the framework-agnostic `HotkeyRecorder`
 * class, managing all the complexity of capturing keyboard events, converting them
 * to hotkey strings, and handling edge cases like Escape to cancel or Backspace/Delete
 * to clear.
 *
 * @param options - Configuration options for the recorder
 * @returns An object with recording state and control functions
 *
 * @example
 * ```svelte
 * <script>
 *   import { createHotkeyRecorder } from '@tanstack/svelte-hotkeys'
 *
 *   const recorder = createHotkeyRecorder({
 *     onRecord: (hotkey) => {
 *       console.log('Recorded:', hotkey) // e.g., "Mod+Shift S"
 *     },
 *     onCancel: () => {
 *       console.log('Recording cancelled')
 *     },
 *   })
 * </script>
 *
 * <div>
 *   <button on:click={recorder.startRecording}>
 *     {recorder.isRecording ? 'Recording...' : 'Edit Shortcut'}
 *   </button>
 *   {recorder.recordedHotkey && (
 *     <div>Recording: {recorder.recordedHotkey}</div>
 *   )}
 * </div>
 * ```
 */

export function createHotkeyRecorder(
  options: HotkeyRecorderOptions,
): SvelteHotkeyRecorder {
  const mergedOptions = {
    ...getDefaultHotkeysOptions().hotkeyRecorder,
    ...options,
  } as HotkeyRecorderOptions

  let recorderRef = $state<HotkeyRecorder | null>(null)

  // Create recorder instance once
  if (!recorderRef) {
    recorderRef = new HotkeyRecorder(mergedOptions)
  }

  // Sync options on every render (same pattern as createHotkey)
  // This ensures callbacks always have access to latest values
  $effect(() => {
    if (recorderRef) {
      recorderRef.setOptions(mergedOptions)
    }
  })

  let isRecording = $derived(recorderRef?.store.state.isRecording)
  let recordedHotkey = $derived(recorderRef?.store.state.recordedHotkey)

  onDestroy(() => {
    recorderRef?.destroy()
  })

  return {
    isRecording,
    recordedHotkey,
    startRecording: () => recorderRef?.start(),
    stopRecording: () => recorderRef?.stop(),
    cancelRecording: () => recorderRef?.cancel(),
  }
}
