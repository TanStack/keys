---
'@tanstack/hotkeys': patch
---

Use `event.code` for punctuation key matching to handle Shift-affected keys

Punctuation keys like `/` produce different characters when Shift is pressed (`?`), causing `event.key` to mismatch. The matcher now falls back to `event.code` (e.g., `Slash`, `Comma`) to reliably identify the physical key, matching the existing approach for letters and digits.

Shifted punctuation in hotkey strings is also normalized automatically: `Mod+?` becomes `Mod+Shift+/`.
