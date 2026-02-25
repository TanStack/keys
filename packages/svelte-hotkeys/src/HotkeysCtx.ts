import { createContext, Snippet } from 'svelte'
import { CreateHotkeyOptions } from './createHotkey.svelte'
import { HotkeyRecorderOptions } from '@tanstack/hotkeys'
import { CreateHotkeySequenceOptions } from './createHotkeySequence.svelte'

export interface HotkeysProviderOptions {
  hotkey?: Partial<CreateHotkeyOptions>
  hotkeyRecorder?: Partial<HotkeyRecorderOptions>
  hotkeySequence?: Partial<CreateHotkeySequenceOptions>
}

export interface HotkeysProviderProps {
  children: Snippet
  defaultOptions?: HotkeysProviderOptions
}

export const DEFAULT_OPTIONS: HotkeysProviderOptions = {}

interface HotkeysContextValue {
  defaultOptions: HotkeysProviderOptions
}

const [getHotkeysContext, setHotkeysContext] =
  createContext<HotkeysContextValue | null>()

export { getHotkeysContext, setHotkeysContext }

export function getDefaultHotkeysOptions(): HotkeysProviderOptions {
  return getHotkeysContext()?.defaultOptions ?? DEFAULT_OPTIONS
}
