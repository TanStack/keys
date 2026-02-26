<script lang="ts">
  import favicon from '$lib/assets/favicon.svg'
  import HotkeysProvider from '../../../../../packages/svelte-hotkeys/dist/HotkeysProvider.svelte'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<HotkeysProvider>{@render children()}</HotkeysProvider>
