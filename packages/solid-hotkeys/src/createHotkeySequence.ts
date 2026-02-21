import { createEffect, onCleanup } from 'solid-js'
import { getSequenceManager } from '@tanstack/hotkeys'
import { useDefaultHotkeysOptions } from './HotkeysProvider'
import type {
  HotkeyCallback,
  HotkeySequence,
  SequenceOptions,
  SequenceRegistrationHandle,
} from '@tanstack/hotkeys'

export interface CreateHotkeySequenceOptions extends Omit<
  SequenceOptions,
  'enabled'
> {
  /** Whether the sequence is enabled. Defaults to true. */
  enabled?: boolean
}

/**
 * SolidJS primitive for registering a keyboard shortcut sequence (Vim-style).
 *
 * This primitive allows you to register multi-key sequences like 'g g' or 'd d'
 * that trigger when the full sequence is pressed within a timeout.
 *
 * @param sequence - Array of hotkey strings that form the sequence (or accessor function)
 * @param callback - Function to call when the sequence is completed
 * @param options - Options for the sequence behavior (or accessor function)
 *
 * @example
 * ```tsx
 * function VimEditor() {
 *   // 'g g' to go to top
 *   createHotkeySequence(['G', 'G'], () => {
 *     scrollToTop()
 *   })
 *
 *   // 'd d' to delete line
 *   createHotkeySequence(['D', 'D'], () => {
 *     deleteLine()
 *   })
 *
 *   // 'd i w' to delete inner word
 *   createHotkeySequence(['D', 'I', 'W'], () => {
 *     deleteInnerWord()
 *   }, { timeout: 500 })
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function createHotkeySequence(
  sequence: HotkeySequence | (() => HotkeySequence),
  callback: HotkeyCallback,
  options:
    | CreateHotkeySequenceOptions
    | (() => CreateHotkeySequenceOptions) = {},
): void {
  const defaultOptions = useDefaultHotkeysOptions()
  const manager = getSequenceManager()

  let registration: SequenceRegistrationHandle | null = null

  createEffect(() => {
    // Resolve reactive values
    const resolvedSequence =
      typeof sequence === 'function' ? sequence() : sequence
    const resolvedOptions = typeof options === 'function' ? options() : options

    const mergedOptions = {
      ...defaultOptions.hotkeySequence,
      ...resolvedOptions,
    } as CreateHotkeySequenceOptions

    const {
      enabled = true,
      target: _target,
      ...optionsWithoutTarget
    } = mergedOptions

    if (!enabled || resolvedSequence.length === 0) {
      return
    }

    // Resolve target: when explicitly provided (even as null), use it and skip if null.
    // When not provided, default to document. Matches createHotkey.
    const resolvedTarget =
      'target' in mergedOptions
        ? (mergedOptions.target ?? null)
        : typeof document !== 'undefined'
          ? document
          : null

    if (!resolvedTarget) {
      return
    }

    // Unregister previous registration if it exists
    if (registration?.isActive) {
      registration.unregister()
      registration = null
    }

    // Register the sequence
    registration = manager.register(resolvedSequence, callback, {
      ...optionsWithoutTarget,
      target: resolvedTarget,
      enabled: true,
    })

    // Sync callback and options on every effect run
    if (registration.isActive) {
      registration.callback = callback
      registration.setOptions(optionsWithoutTarget)
    }

    // Cleanup on disposal
    onCleanup(() => {
      if (registration?.isActive) {
        registration.unregister()
        registration = null
      }
    })
  })
}
