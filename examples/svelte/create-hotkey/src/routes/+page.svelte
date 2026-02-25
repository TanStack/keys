<script lang="ts">
  import {
    createHotkey,
    createHotkeySequence,
  } from '../../../../../packages/svelte-hotkeys/dist'

  let divRef = $state<HTMLDivElement | null>(null)

  createHotkey(
    'Mod+K',
    () => {
      console.log('Mod+K pressed')

      if (divRef) {
        divRef.style.backgroundColor = 'red'
      }
    },
    { target: divRef },
  )

  createHotkeySequence(['K', 'S'], () => {
    console.log('K K pressed')

    if (divRef) {
      divRef.style.backgroundColor = 'green'
    }
  })
</script>

<div
  bind:this={divRef}
  style="display: flex; gap: 10px; flex-direction: column; height:300px; width:300px; background-color: #f0f0f0; padding: 10px;"
>
  <button> Click me </button>
</div>
