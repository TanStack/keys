<script lang="ts">
  import { createHotkeyRecorder } from '../../../../../packages/svelte-hotkeys/dist'

  let savedHotkey = $state<string | null>(null)

  const recorder = createHotkeyRecorder({
    onRecord: (hotkey) => {
      savedHotkey = hotkey
      console.log('Recorded:', hotkey)
    },
    onCancel: () => {
      console.log('Recording cancelled')
    },
  })
</script>

<div
  style="display: flex; gap: 10px; flex-direction: column; height:300px; width:300px; background-color: #f0f0f0; padding: 10px;"
>
  <p>
    {#if recorder.isRecording}
      Press a key combination...
    {:else if savedHotkey}
      Saved: <kbd>{savedHotkey}</kbd>
    {:else}
      No hotkey set
    {/if}
  </p>

  {#if recorder.recordedHotkey}
    <p>Live preview: <kbd>{recorder.recordedHotkey}</kbd></p>
  {/if}

  <button onclick={() => recorder.startRecording()}>
    {recorder.isRecording ? 'Recording...' : 'Record Shortcut'}
  </button>

  {#if recorder.isRecording}
    <button onclick={() => recorder.cancelRecording()}>Cancel</button>
  {/if}
</div>
