import { HotkeyManager, SequenceManager } from '@tanstack/hotkeys'
import { useStyles } from '../styles/use-styles'
import type {
  HotkeyRegistration,
  SequenceRegistrationView,
} from '@tanstack/hotkeys'

type ActionButtonsProps = {
  registration: HotkeyRegistration | SequenceRegistrationView
}

function isSequenceRegistration(
  reg: HotkeyRegistration | SequenceRegistrationView,
): reg is SequenceRegistrationView {
  return 'sequence' in reg && Array.isArray(reg.sequence)
}

export function ActionButtons(props: ActionButtonsProps) {
  const styles = useStyles()

  const handleTrigger = () => {
    const reg = props.registration
    if (isSequenceRegistration(reg)) {
      SequenceManager.getInstance().triggerSequence(reg.id)
    } else {
      HotkeyManager.getInstance().triggerRegistration(reg.id)
    }
  }

  return (
    <div class={styles().actionsRow}>
      <button class={styles().actionButton} onMouseDown={handleTrigger}>
        <span class={styles().actionDotGreen} />
        Trigger
      </button>
    </div>
  )
}
