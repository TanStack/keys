<script lang="ts">
  import { DEFAULT_OPTIONS, setHotkeysContext } from './HotkeysCtx'

  import type { HotkeysProviderProps } from './HotkeysCtx'

  let { children, defaultOptions = DEFAULT_OPTIONS }: HotkeysProviderProps =
    $props()

  setHotkeysContext({
    get defaultOptions() {
      return defaultOptions
    },
  })
</script>

{@render children()}
