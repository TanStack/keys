<script lang="ts">
  import { getIsKeyHeld } from '../../../../../packages/svelte-hotkeys/dist'

  const isShiftHeld = getIsKeyHeld('Shift')
  const isControlHeld = getIsKeyHeld('Control')
  const isAltHeld = getIsKeyHeld('Alt')
</script>

<div
  style="display: flex; gap: 10px; flex-direction: column; height:300px; width:300px; background-color: #f0f0f0; padding: 10px;"
>
  <p>Hold modifier keys to see their state:</p>

  <div style="display: flex; gap: 8px;">
    <kbd
      style="padding: 4px 10px; border-radius: 4px; background: {isShiftHeld ? '#4caf50' : '#ddd'}; color: {isShiftHeld ? 'white' : 'black'};"
    >
      Shift
    </kbd>
    <kbd
      style="padding: 4px 10px; border-radius: 4px; background: {isControlHeld ? '#4caf50' : '#ddd'}; color: {isControlHeld ? 'white' : 'black'};"
    >
      Ctrl
    </kbd>
    <kbd
      style="padding: 4px 10px; border-radius: 4px; background: {isAltHeld ? '#4caf50' : '#ddd'}; color: {isAltHeld ? 'white' : 'black'};"
    >
      Alt
    </kbd>
  </div>
</div>
