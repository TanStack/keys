import {
  formatHotkeySequence,
  getSequenceManager,
  HotkeyCallback,
  HotkeyCallbackContext,
  HotkeySequence,
  SequenceOptions,
  SequenceRegistrationHandle,
} from '@tanstack/hotkeys'
import { getDefaultHotkeysOptions } from './HotkeysCtx'

export interface CreateHotkeySequenceOptions extends Omit<
  SequenceOptions,
  'target'
> {
  /**
   * The DOM element to attach the event listener to.
   * Can be a Svelte ref, direct DOM element, or null.
   * Defaults to document.
   */
  target?: HTMLElement | Document | Window | null
}

export function createHotkeySequence(
  sequence: HotkeySequence,
  callback: HotkeyCallback,
  options: CreateHotkeySequenceOptions = {},
): void {
  const mergedOptions = {
    ...getDefaultHotkeysOptions().hotkeySequence,
    ...options,
  } as CreateHotkeySequenceOptions

  let manager = $state(getSequenceManager())

  // Stable ref for registration handle
  let registrationRef = $state<SequenceRegistrationHandle | null>(null)

  // Refs to capture current values for use in effect without adding dependencies
  let callbackRef = $state(callback)
  let optionsRef = $state(mergedOptions)
  let managerRef = $state(manager)

  $effect(() => {
    callbackRef = callback
    optionsRef = mergedOptions
    managerRef = manager
  })

  // Track previous target and sequence to detect changes requiring re-registration
  let prevTargetRef = $state<HTMLElement | Document | Window | null>(null)
  let prevSequenceRef = $state<string | null>(null)

  // Normalize to hotkey sequence string (join with spaces)
  let hotkeySequenceString = $derived.by(() => formatHotkeySequence(sequence))

  // Extract options without target (target is handled separately)
  let { target: _target, ...optionsWithoutTarget } = $derived(mergedOptions)

  $effect(() => {
    if (sequence.length === 0) {
      return
    }

    // Resolve target inside the effect so refs are already attached after mount
    const resolvedTarget = optionsRef?.target
      ? optionsRef.target
      : typeof document !== 'undefined'
        ? document
        : null

    // Skip if no valid target (SSR or ref still null)
    if (!resolvedTarget) {
      return
    }

    // Check if we need to re-register (target or sequence changed)
    const targetChanged =
      prevTargetRef !== null && prevTargetRef !== resolvedTarget
    const sequenceChanged =
      prevSequenceRef !== null && prevSequenceRef !== hotkeySequenceString

    // If we have an active registration and target/sequence changed, unregister first
    if (registrationRef?.isActive && (targetChanged || sequenceChanged)) {
      registrationRef.unregister()
      registrationRef = null
    }

    // Register if needed (no active registration)
    if (!registrationRef || !registrationRef.isActive) {
      registrationRef = manager.register(sequence, callback, {
        ...optionsRef,
        target: resolvedTarget,
      })
    }

    // Update tracking refs
    prevTargetRef = resolvedTarget
    prevSequenceRef = hotkeySequenceString

    // Cleanup on unmount
    return () => {
      if (registrationRef?.isActive) {
        registrationRef.unregister()
        registrationRef = null
      }
    }
  })

  // Sync callback and options on EVERY render
  $effect(() => {
    if (registrationRef?.isActive) {
      registrationRef.callback = (
        event: KeyboardEvent,
        context: HotkeyCallbackContext,
      ) => callbackRef(event, context)
      registrationRef.setOptions(optionsWithoutTarget)
    }
  })
}
