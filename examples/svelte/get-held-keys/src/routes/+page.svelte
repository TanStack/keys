<script lang="ts">
  import {
    getHeldKeys,
    getHeldKeyCodesMap,
  } from '../../../../../packages/svelte-hotkeys/dist'

  const heldKeys = getHeldKeys()
  const heldKeyCodesMap = getHeldKeyCodesMap()
</script>

<div
  style="display: flex; gap: 10px; flex-direction: column; height:300px; width:300px; background-color: #f0f0f0; padding: 10px;"
>
  <p>Press any keys to see them here:</p>

  <p>
    Held keys: <strong>{heldKeys.length > 0 ? heldKeys.join(' + ') : 'None'}</strong>
  </p>

  {#if Object.keys(heldKeyCodesMap).length > 0}
    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
      {#each Object.entries(heldKeyCodesMap) as [key, code]}
        <kbd style="padding: 2px 6px; background: #ddd; border-radius: 3px;">
          {key} <small>({code})</small>
        </kbd>
      {/each}
    </div>
  {/if}
</div>
