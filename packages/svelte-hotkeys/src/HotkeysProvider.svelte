<script lang="ts">
  import {
    DEFAULT_OPTIONS,
    HotkeysProviderProps,
    setHotkeysContext,
  } from './HotkeysCtx'

  let { children, defaultOptions = DEFAULT_OPTIONS }: HotkeysProviderProps =
    $props()

  $effect(() => {
    setHotkeysContext({ defaultOptions })
  })
</script>

{@render children()}
