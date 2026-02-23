import { createVuePlugin } from '@tanstack/devtools-utils/vue'
import { HotkeysDevtoolsPanel } from './VueHotkeysDevtools'

const [hotkeysDevtoolsPlugin, hotkeysDevtoolsNoOpPlugin] = createVuePlugin({
  name: 'TanStack Hotkeys',
  Component: HotkeysDevtoolsPanel,
})

export { hotkeysDevtoolsPlugin, hotkeysDevtoolsNoOpPlugin }
