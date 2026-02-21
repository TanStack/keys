import {
  KEY_DISPLAY_SYMBOLS,
  MAC_MODIFIER_SYMBOLS,
  MODIFIER_ORDER,
  STANDARD_MODIFIER_LABELS,
  detectPlatform,
} from './constants'
import { parseHotkey } from './parse'
import type { FormatDisplayOptions, Hotkey, ParsedHotkey } from './hotkey'

/**
 * Converts a hotkey sequence array to a display string.
 *
 * @param sequence - Array of hotkey strings that form the sequence
 * @returns A space-separated string (e.g. ['G','G'] → 'G G')
 *
 * @example
 * ```ts
 * formatHotkeySequence(['G', 'G'])      // 'G G'
 * formatHotkeySequence(['D', 'I', 'W']) // 'D I W'
 * ```
 */
export function formatHotkeySequence(sequence: Array<Hotkey>): string {
  return sequence.join(' ')
}

/**
 * Converts a ParsedHotkey back to a hotkey string.
 *
 * @param parsed - The parsed hotkey object
 * @returns A hotkey string in canonical form
 *
 * @example
 * ```ts
 * formatHotkey({ key: 'S', ctrl: true, shift: true, alt: false, meta: false, modifiers: ['Control', 'Shift'] })
 * // Returns: 'Control+Shift+S'
 * ```
 */
export function formatHotkey(parsed: ParsedHotkey): string {
  const parts: Array<string> = []

  // Add modifiers in canonical order
  for (const modifier of MODIFIER_ORDER) {
    if (parsed.modifiers.includes(modifier)) {
      parts.push(modifier)
    }
  }

  // Add the key
  parts.push(parsed.key)

  return parts.join('+')
}

/**
 * Formats a hotkey for display in a user interface.
 *
 * On macOS, uses symbols (⌘⇧S).
 * On Windows/Linux, uses text (Ctrl+Shift+S).
 *
 * @param hotkey - The hotkey string or ParsedHotkey to format
 * @param options - Formatting options
 * @returns A formatted string suitable for display
 *
 * @example
 * ```ts
 * formatForDisplay('Mod+Shift+S', { platform: 'mac' })
 * // Returns: '⇧⌘S'
 *
 * formatForDisplay('Mod+Shift+S', { platform: 'windows' })
 * // Returns: 'Ctrl+Shift+S'
 *
 * formatForDisplay('Escape')
 * // Returns: 'Esc' (on all platforms)
 * ```
 */
export function formatForDisplay(
  hotkey: Hotkey | (string & {}) | ParsedHotkey,
  options: FormatDisplayOptions = {},
): string {
  const platform = options.platform ?? detectPlatform()
  const parsed =
    typeof hotkey === 'string' ? parseHotkey(hotkey, platform) : hotkey

  if (platform === 'mac') {
    return formatForMac(parsed)
  }

  return formatForStandard(parsed)
}

/**
 * Formats a hotkey for macOS display using symbols.
 */
function formatForMac(parsed: ParsedHotkey): string {
  const parts: Array<string> = []

  // Add modifiers in macOS order (typically Control, Option, Shift, Command)
  // But we'll use our canonical order and just use symbols
  for (const modifier of MODIFIER_ORDER) {
    if (parsed.modifiers.includes(modifier)) {
      parts.push(MAC_MODIFIER_SYMBOLS[modifier])
    }
  }

  // Add the key (use symbol if available, otherwise the key itself)
  const keyDisplay = KEY_DISPLAY_SYMBOLS[parsed.key] ?? parsed.key
  parts.push(keyDisplay)

  // On Mac, modifiers are typically concatenated without separators
  return parts.join('')
}

/**
 * Formats a hotkey for Windows/Linux display using text labels.
 */
function formatForStandard(parsed: ParsedHotkey): string {
  const parts: Array<string> = []

  // Add modifiers in canonical order
  for (const modifier of MODIFIER_ORDER) {
    if (parsed.modifiers.includes(modifier)) {
      parts.push(STANDARD_MODIFIER_LABELS[modifier])
    }
  }

  // Add the key (use symbol/short form if available)
  const keyDisplay = KEY_DISPLAY_SYMBOLS[parsed.key] ?? parsed.key
  parts.push(keyDisplay)

  // On Windows/Linux, use + as separator
  return parts.join('+')
}

/**
 * Formats a hotkey using platform-agnostic labels.
 * Uses 'Cmd' on Mac and 'Ctrl' for Control, etc.
 *
 * @param hotkey - The hotkey string or ParsedHotkey to format
 * @param platform - The target platform
 * @returns A formatted string with platform-appropriate labels
 */
export function formatWithLabels(
  hotkey: Hotkey | (string & {}),
  platform: 'mac' | 'windows' | 'linux' = detectPlatform(),
): string {
  const parsed =
    typeof hotkey === 'string' ? parseHotkey(hotkey, platform) : hotkey
  const parts: Array<string> = []

  // Custom labels for more readable output
  const labels: Record<string, string> = {
    Control: 'Ctrl',
    Alt: platform === 'mac' ? 'Option' : 'Alt',
    Shift: 'Shift',
    Meta: platform === 'mac' ? 'Cmd' : 'Win',
  }

  for (const modifier of MODIFIER_ORDER) {
    if (parsed.modifiers.includes(modifier)) {
      parts.push(labels[modifier] ?? modifier)
    }
  }

  // Add the key
  parts.push(parsed.key)

  return parts.join('+')
}

// =============================================================================
// Debugging Display Labels
// =============================================================================

/**
 * Maps canonical modifier names to debugging-friendly labels per platform.
 */
const MODIFIER_DEBUG_LABELS: Record<string, Record<string, string>> = {
  mac: { Meta: 'Mod (Cmd)', Control: 'Ctrl', Alt: 'Opt', Shift: 'Shift' },
  windows: { Control: 'Mod (Ctrl)', Meta: 'Win', Alt: 'Alt', Shift: 'Shift' },
  linux: { Control: 'Mod (Ctrl)', Meta: 'Super', Alt: 'Alt', Shift: 'Shift' },
}

/**
 * Options for formatting a single key for debugging display.
 */
export interface FormatKeyDebuggingOptions {
  /** The target platform. Defaults to auto-detection. */
  platform?: 'mac' | 'windows' | 'linux'
  /**
   * Whether the input value comes from `event.key` or `event.code`.
   *
   * - `'key'` (default): Applies rich platform-aware formatting (modifier
   *   labels, special-key symbols, etc.).
   * - `'code'`: Returns the value unchanged — physical key codes like
   *   `"MetaLeft"` or `"KeyA"` are already descriptive for debugging.
   */
  source?: 'key' | 'code'
}

/**
 * Formats a single key name for debugging/devtools display.
 *
 * Unlike `formatForDisplay` which formats full hotkey strings for end-user UIs,
 * this function formats individual key names (from `event.key`) with rich
 * platform-aware labels suitable for debugging tools and developer-facing displays.
 *
 * Features:
 * - Modifier keys show their platform role (e.g., "Mod (Cmd)" for Meta on Mac)
 * - On macOS, modifier keys are prefixed with their symbol (e.g., "⌘ Mod (Cmd)")
 * - Special keys use display symbols (ArrowUp -> "↑", Escape -> "Esc")
 * - Regular keys pass through unchanged
 *
 * @param key - A single key name (e.g., "Meta", "Shift", "ArrowUp", "A")
 * @param options - Formatting options
 * @returns A formatted label suitable for debugging display
 *
 * @example
 * ```ts
 * // On macOS:
 * formatKeyForDebuggingDisplay('Meta')    // '⌘ Mod (Cmd)'
 * formatKeyForDebuggingDisplay('Control') // '⌃ Ctrl'
 * formatKeyForDebuggingDisplay('Alt')     // '⌥ Opt'
 * formatKeyForDebuggingDisplay('Shift')   // '⇧ Shift'
 *
 * // On Windows:
 * formatKeyForDebuggingDisplay('Control') // 'Mod (Ctrl)'
 * formatKeyForDebuggingDisplay('Meta')    // 'Win'
 *
 * // Special keys (all platforms):
 * formatKeyForDebuggingDisplay('ArrowUp') // '↑'
 * formatKeyForDebuggingDisplay('Escape')  // 'Esc'
 * formatKeyForDebuggingDisplay('Space')   // '␣'
 *
 * // Regular keys pass through:
 * formatKeyForDebuggingDisplay('A')       // 'A'
 *
 * // With source: 'code', values pass through unchanged:
 * formatKeyForDebuggingDisplay('MetaLeft', { source: 'code' })  // 'MetaLeft'
 * formatKeyForDebuggingDisplay('KeyA', { source: 'code' })      // 'KeyA'
 * ```
 */
export function formatKeyForDebuggingDisplay(
  key: string,
  options: FormatKeyDebuggingOptions = {},
): string {
  // For event.code values, pass through unchanged — they're already
  // descriptive for debugging (e.g. "MetaLeft", "KeyA", "ShiftRight").
  if (options.source === 'code') {
    return key
  }

  const platform = options.platform ?? detectPlatform()

  // Check if it's a modifier key
  const modLabel = MODIFIER_DEBUG_LABELS[platform]?.[key]
  if (modLabel) {
    // On Mac, prefix modifier labels with their symbol
    if (platform === 'mac') {
      const symbol =
        MAC_MODIFIER_SYMBOLS[key as keyof typeof MAC_MODIFIER_SYMBOLS]
      if (symbol) {
        return `${symbol} ${modLabel}`
      }
    }
    return modLabel
  }

  // Check if it's a special key with a display symbol
  const symbol = KEY_DISPLAY_SYMBOLS[key]
  if (symbol) {
    return symbol
  }

  // Regular key — pass through
  return key
}
