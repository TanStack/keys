import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
} from 'solid-js'
import {
  HotkeyManager,
  KeyStateTracker,
  SequenceManager,
} from '@tanstack/hotkeys'
import type { Accessor } from 'solid-js'
import type {
  HotkeyRegistration,
  SequenceRegistrationView,
} from '@tanstack/hotkeys'

interface HotkeysDevtoolsContextType {
  registrations: Accessor<Array<HotkeyRegistration>>
  sequenceRegistrations: Accessor<Array<SequenceRegistrationView>>
  heldKeys: Accessor<Array<string>>
  heldCodes: Accessor<Record<string, string>>
}

const HotkeysDevtoolsContext = createContext<HotkeysDevtoolsContextType>({
  registrations: () => [],
  sequenceRegistrations: () => [],
  heldKeys: () => [],
  heldCodes: () => ({}),
})

export function HotkeysContextProvider(props: { children: any }) {
  const manager = HotkeyManager.getInstance()
  const sequenceManager = SequenceManager.getInstance()
  const tracker = KeyStateTracker.getInstance()

  // Create local signals that will be updated by subscriptions
  const [registrations, setRegistrations] = createSignal<
    Array<HotkeyRegistration>
  >(Array.from(manager.registrations.state.values()))
  const [sequenceRegistrations, setSequenceRegistrations] = createSignal<
    Array<SequenceRegistrationView>
  >(Array.from(sequenceManager.registrations.state.values()))
  const [heldKeys, setHeldKeys] = createSignal<Array<string>>(
    tracker.store.state.heldKeys,
  )
  const [heldCodes, setHeldCodes] = createSignal<Record<string, string>>(
    tracker.store.state.heldCodes,
  )

  // Subscribe to HotkeyManager registrations store
  createEffect(() => {
    const unsubscribe = manager.registrations.subscribe(() => {
      setRegistrations(Array.from(manager.registrations.state.values()))
    }).unsubscribe
    onCleanup(() => unsubscribe())
  })

  // Subscribe to SequenceManager registrations store
  createEffect(() => {
    const unsubscribe = sequenceManager.registrations.subscribe(() => {
      setSequenceRegistrations(
        Array.from(sequenceManager.registrations.state.values()),
      )
    }).unsubscribe
    onCleanup(() => unsubscribe())
  })

  // Subscribe to KeyStateTracker store
  createEffect(() => {
    const unsubscribe = tracker.store.subscribe(() => {
      setHeldKeys(tracker.store.state.heldKeys)
      setHeldCodes(tracker.store.state.heldCodes)
    }).unsubscribe
    onCleanup(() => unsubscribe())
  })

  return (
    <HotkeysDevtoolsContext.Provider
      value={{
        registrations,
        sequenceRegistrations,
        heldKeys,
        heldCodes,
      }}
    >
      {props.children}
    </HotkeysDevtoolsContext.Provider>
  )
}

export function useHotkeysDevtoolsState() {
  return useContext(HotkeysDevtoolsContext)
}
