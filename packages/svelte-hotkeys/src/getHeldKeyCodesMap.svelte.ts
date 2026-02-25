import { getKeyStateTracker } from '@tanstack/hotkeys'

/**
 * Svelte function that returns a map of currently held key names to their physical `event.code` values.
 *
 * This is useful for debugging which physical key was pressed (e.g. distinguishing
 * left vs right Shift via "ShiftLeft" / "ShiftRight").
 *
 * @returns Record mapping normalized key names to their `event.code` values
 *
 * ```svelte
 * <script>
 *   import { getHeldKeyCodesMap } from '@tanstack/svelte-hotkeys'
 *   const heldKeyCodesMap = getHeldKeyCodesMap()
 * </script>
 *
 * <div>
 *   {Object.entries(heldKeyCodesMap).map(([key, code]) => (
 *      <kbd key={key}>
 *          {key} <small>{code}</small>
 *      </kbd>
 *    ))}
 *  </div>
 * ```
 */
export function getHeldKeyCodesMap(): Record<string, string> {
  const tracker = getKeyStateTracker()

  const heldKeyCodesMap = $derived.by(() => tracker.store.state.heldCodes)

  return heldKeyCodesMap
}
