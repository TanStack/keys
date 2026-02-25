<script lang="ts">
  import { createHotkeySequence } from '../../../../../packages/svelte-hotkeys/dist'

  let divRef = $state<HTMLDivElement | null>(null)

  createHotkeySequence(
    ['K', 'S'],
    () => {
      console.log('K K pressed')

      if (divRef) {
        divRef.style.backgroundColor = 'green'
      }
    },
    {
      target: () => divRef,
    },
  )
</script>

<div
  tabindex={0}
  bind:this={divRef}
  style="display: flex; gap: 10px; flex-direction: column; height:300px; width:300px; background-color: #f0f0f0; padding: 10px;"
></div>
