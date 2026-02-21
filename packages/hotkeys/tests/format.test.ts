import { describe, expect, it } from 'vitest'
import {
  formatForDisplay,
  formatHotkey,
  formatHotkeySequence,
  formatKeyForDebuggingDisplay,
  formatWithLabels,
} from '../src/format'
import type { ParsedHotkey } from '../src/hotkey'

describe('formatHotkeySequence', () => {
  it('should join sequence with spaces', () => {
    expect(formatHotkeySequence(['G', 'G'])).toBe('G G')
    expect(formatHotkeySequence(['D', 'I', 'W'])).toBe('D I W')
  })

  it('should handle single-key sequence', () => {
    expect(formatHotkeySequence(['Escape'])).toBe('Escape')
  })
})

describe('formatHotkey', () => {
  it('should format a simple key', () => {
    const parsed: ParsedHotkey = {
      key: 'A',
      ctrl: false,
      shift: false,
      alt: false,
      meta: false,
      modifiers: [],
    }
    expect(formatHotkey(parsed)).toBe('A')
  })

  it('should format with single modifier', () => {
    const parsed: ParsedHotkey = {
      key: 'S',
      ctrl: true,
      shift: false,
      alt: false,
      meta: false,
      modifiers: ['Control'],
    }
    expect(formatHotkey(parsed)).toBe('Control+S')
  })

  it('should format with multiple modifiers in canonical order', () => {
    const parsed: ParsedHotkey = {
      key: 'S',
      ctrl: true,
      shift: true,
      alt: false,
      meta: false,
      modifiers: ['Control', 'Shift'],
    }
    expect(formatHotkey(parsed)).toBe('Control+Shift+S')
  })

  it('should format with all modifiers', () => {
    const parsed: ParsedHotkey = {
      key: 'A',
      ctrl: true,
      shift: true,
      alt: true,
      meta: true,
      modifiers: ['Control', 'Alt', 'Shift', 'Meta'],
    }
    expect(formatHotkey(parsed)).toBe('Control+Alt+Shift+Meta+A')
  })

  it('should format special keys', () => {
    const parsed: ParsedHotkey = {
      key: 'Escape',
      ctrl: false,
      shift: false,
      alt: false,
      meta: false,
      modifiers: [],
    }
    expect(formatHotkey(parsed)).toBe('Escape')
  })
})

describe('formatForDisplay', () => {
  describe('macOS format', () => {
    it('should use symbols for modifiers', () => {
      expect(formatForDisplay('Control+A', { platform: 'mac' })).toBe('⌃A')
      expect(formatForDisplay('Shift+A', { platform: 'mac' })).toBe('⇧A')
      expect(formatForDisplay('Alt+A', { platform: 'mac' })).toBe('⌥A')
      expect(formatForDisplay('Command+A', { platform: 'mac' })).toBe('⌘A')
    })

    it('should combine multiple modifier symbols', () => {
      expect(formatForDisplay('Control+Shift+A', { platform: 'mac' })).toBe(
        '⌃⇧A',
      )
      expect(formatForDisplay('Command+Shift+S', { platform: 'mac' })).toBe(
        '⇧⌘S',
      )
    })

    it('should resolve Mod to Command symbol', () => {
      expect(formatForDisplay('Mod+S', { platform: 'mac' })).toBe('⌘S')
      expect(formatForDisplay('Mod+Shift+S', { platform: 'mac' })).toBe('⇧⌘S')
    })

    it('should use symbols for special keys', () => {
      expect(formatForDisplay('Escape', { platform: 'mac' })).toBe('Esc')
      expect(formatForDisplay('Enter', { platform: 'mac' })).toBe('↵')
      expect(formatForDisplay('Backspace', { platform: 'mac' })).toBe('⌫')
      expect(formatForDisplay('ArrowUp', { platform: 'mac' })).toBe('↑')
    })
  })

  describe('Windows/Linux format', () => {
    it('should use text labels with + separator', () => {
      expect(formatForDisplay('Control+A', { platform: 'windows' })).toBe(
        'Ctrl+A',
      )
      expect(formatForDisplay('Shift+A', { platform: 'windows' })).toBe(
        'Shift+A',
      )
      expect(formatForDisplay('Alt+A', { platform: 'windows' })).toBe('Alt+A')
    })

    it('should combine multiple modifiers', () => {
      expect(formatForDisplay('Control+Shift+A', { platform: 'windows' })).toBe(
        'Ctrl+Shift+A',
      )
    })

    it('should resolve Mod to Ctrl', () => {
      expect(formatForDisplay('Mod+S', { platform: 'windows' })).toBe('Ctrl+S')
      expect(formatForDisplay('Mod+S', { platform: 'linux' })).toBe('Ctrl+S')
    })

    it('should use short names for special keys', () => {
      expect(formatForDisplay('Escape', { platform: 'windows' })).toBe('Esc')
      expect(formatForDisplay('ArrowUp', { platform: 'windows' })).toBe('↑')
    })
  })

  describe('with ParsedHotkey input', () => {
    it('should accept ParsedHotkey objects', () => {
      const parsed: ParsedHotkey = {
        key: 'S',
        ctrl: false,
        shift: true,
        alt: false,
        meta: true,
        modifiers: ['Shift', 'Meta'],
      }
      expect(formatForDisplay(parsed, { platform: 'mac' })).toBe('⇧⌘S')
    })
  })
})

describe('formatWithLabels', () => {
  it('should use readable labels on Mac', () => {
    expect(formatWithLabels('Command+S', 'mac')).toBe('Cmd+S')
    expect(formatWithLabels('Alt+A', 'mac')).toBe('Option+A')
    expect(formatWithLabels('Control+C', 'mac')).toBe('Ctrl+C')
  })

  it('should use readable labels on Windows', () => {
    expect(formatWithLabels('Control+S', 'windows')).toBe('Ctrl+S')
    expect(formatWithLabels('Alt+A', 'windows')).toBe('Alt+A')
    expect(formatWithLabels('Meta+A', 'windows')).toBe('Win+A')
  })

  it('should resolve Mod appropriately', () => {
    expect(formatWithLabels('Mod+S', 'mac')).toBe('Cmd+S')
    expect(formatWithLabels('Mod+S', 'windows')).toBe('Ctrl+S')
  })

  it('should handle multiple modifiers', () => {
    expect(formatWithLabels('Mod+Shift+S', 'mac')).toBe('Shift+Cmd+S')
    expect(formatWithLabels('Mod+Shift+S', 'windows')).toBe('Ctrl+Shift+S')
  })
})

describe('formatKeyForDebuggingDisplay', () => {
  describe('macOS', () => {
    it('should show symbol-prefixed modifier labels', () => {
      expect(formatKeyForDebuggingDisplay('Meta', { platform: 'mac' })).toBe(
        '⌘ Mod (Cmd)',
      )
      expect(formatKeyForDebuggingDisplay('Control', { platform: 'mac' })).toBe(
        '⌃ Ctrl',
      )
      expect(formatKeyForDebuggingDisplay('Alt', { platform: 'mac' })).toBe(
        '⌥ Opt',
      )
      expect(formatKeyForDebuggingDisplay('Shift', { platform: 'mac' })).toBe(
        '⇧ Shift',
      )
    })

    it('should annotate only the Mod key (Meta on Mac)', () => {
      const meta = formatKeyForDebuggingDisplay('Meta', { platform: 'mac' })
      expect(meta).toContain('Mod')
      const ctrl = formatKeyForDebuggingDisplay('Control', { platform: 'mac' })
      expect(ctrl).not.toContain('Mod')
    })
  })

  describe('Windows', () => {
    it('should show Mod annotation on Control', () => {
      expect(
        formatKeyForDebuggingDisplay('Control', { platform: 'windows' }),
      ).toBe('Mod (Ctrl)')
    })

    it('should show Win for Meta', () => {
      expect(
        formatKeyForDebuggingDisplay('Meta', { platform: 'windows' }),
      ).toBe('Win')
    })

    it('should show Alt and Shift without symbols', () => {
      expect(formatKeyForDebuggingDisplay('Alt', { platform: 'windows' })).toBe(
        'Alt',
      )
      expect(
        formatKeyForDebuggingDisplay('Shift', { platform: 'windows' }),
      ).toBe('Shift')
    })
  })

  describe('Linux', () => {
    it('should show Mod annotation on Control', () => {
      expect(
        formatKeyForDebuggingDisplay('Control', { platform: 'linux' }),
      ).toBe('Mod (Ctrl)')
    })

    it('should show Super for Meta', () => {
      expect(formatKeyForDebuggingDisplay('Meta', { platform: 'linux' })).toBe(
        'Super',
      )
    })

    it('should show Alt and Shift without symbols', () => {
      expect(formatKeyForDebuggingDisplay('Alt', { platform: 'linux' })).toBe(
        'Alt',
      )
      expect(formatKeyForDebuggingDisplay('Shift', { platform: 'linux' })).toBe(
        'Shift',
      )
    })
  })

  describe('special keys', () => {
    it('should use display symbols for special keys', () => {
      expect(formatKeyForDebuggingDisplay('ArrowUp', { platform: 'mac' })).toBe(
        '↑',
      )
      expect(
        formatKeyForDebuggingDisplay('ArrowDown', { platform: 'windows' }),
      ).toBe('↓')
      expect(
        formatKeyForDebuggingDisplay('Escape', { platform: 'linux' }),
      ).toBe('Esc')
      expect(formatKeyForDebuggingDisplay('Space', { platform: 'mac' })).toBe(
        '␣',
      )
      expect(formatKeyForDebuggingDisplay('Enter', { platform: 'mac' })).toBe(
        '↵',
      )
      expect(
        formatKeyForDebuggingDisplay('Backspace', { platform: 'mac' }),
      ).toBe('⌫')
      expect(formatKeyForDebuggingDisplay('Tab', { platform: 'mac' })).toBe('⇥')
    })
  })

  describe('regular keys', () => {
    it('should pass through regular keys unchanged', () => {
      expect(formatKeyForDebuggingDisplay('A', { platform: 'mac' })).toBe('A')
      expect(formatKeyForDebuggingDisplay('z', { platform: 'windows' })).toBe(
        'z',
      )
      expect(formatKeyForDebuggingDisplay('1', { platform: 'linux' })).toBe('1')
    })
  })

  describe('source: code', () => {
    it('should pass through event.code values unchanged', () => {
      expect(formatKeyForDebuggingDisplay('MetaLeft', { source: 'code' })).toBe(
        'MetaLeft',
      )
      expect(
        formatKeyForDebuggingDisplay('ShiftRight', { source: 'code' }),
      ).toBe('ShiftRight')
      expect(formatKeyForDebuggingDisplay('KeyA', { source: 'code' })).toBe(
        'KeyA',
      )
      expect(formatKeyForDebuggingDisplay('Space', { source: 'code' })).toBe(
        'Space',
      )
      expect(formatKeyForDebuggingDisplay('Escape', { source: 'code' })).toBe(
        'Escape',
      )
    })

    it('should ignore platform when source is code', () => {
      expect(
        formatKeyForDebuggingDisplay('MetaLeft', {
          source: 'code',
          platform: 'mac',
        }),
      ).toBe('MetaLeft')
      expect(
        formatKeyForDebuggingDisplay('MetaLeft', {
          source: 'code',
          platform: 'windows',
        }),
      ).toBe('MetaLeft')
    })
  })
})
