import React, { createContext, use, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { HotkeyRecorderOptions } from '@tanstack/hotkeys'
import type { UseHotkeyOptions } from './useHotkey'
import type { UseHotkeySequenceOptions } from './useHotkeySequence'

export interface HotkeysProviderOptions {
  hotkey?: Partial<UseHotkeyOptions>
  hotkeyRecorder?: Partial<HotkeyRecorderOptions>
  hotkeySequence?: Partial<UseHotkeySequenceOptions>
}

interface HotkeysContextValue {
  defaultOptions: HotkeysProviderOptions
}

const HotkeysContext = createContext<HotkeysContextValue | null>(null)

export interface HotkeysProviderProps {
  children: ReactNode
  defaultOptions?: HotkeysProviderOptions
}

const DEFAULT_OPTIONS: HotkeysProviderOptions = {}

export function HotkeysProvider({
  children,
  defaultOptions = DEFAULT_OPTIONS,
}: HotkeysProviderProps) {
  const contextValue: HotkeysContextValue = useMemo(
    () => ({
      defaultOptions,
    }),
    [defaultOptions],
  )

  return (
    <HotkeysContext value={contextValue}>
      {children}
    </HotkeysContext>
  )
}

export function useHotkeysContext() {
  return use(HotkeysContext)
}

export function useDefaultHotkeysOptions() {
  const context = use(HotkeysContext)
  return context?.defaultOptions ?? {}
}
