---
'@tanstack/hotkeys': patch
---

fix: handle dead keys in `matchesKeyboardEvent`

When `event.key` is `'Dead'` (length 4), the existing `event.code` fallback—gated behind `eventKey.length === 1`—was never reached, causing hotkeys to silently fail.

This most commonly affects macOS, where `Option+letter` combinations like `Option+E`, `Option+I`, `Option+U`, and `Option+N` produce dead keys for accent composition. It also affects Windows and Linux users with international keyboard layouts (e.g., US-International, German, French) where certain key combinations produce dead keys.

Added an early check: when `event.key` normalizes to `'Dead'`, immediately fall back to `event.code` to extract the physical key via the `Key*`/`Digit*` prefixes. Punctuation dead keys (e.g., `'` on US-International, where `event.code` is `'Quote'`) correctly return `false` since their codes don't match letter or digit patterns.
