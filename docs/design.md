# CopyTree Design Language

This document codifies the overall design language of the CopyTree website so designers and developers can build new pages and components with consistent look, feel, and behavior.

## Brand essence

- Calm, modern, technical. A “Deep Forest” aesthetic expresses trust, clarity, and focus.
- Substance over spectacle. Subtle glows, fine textures, and glass surfaces add polish without distracting from content.
- AI-friendly by structure. Visual clarity, hierarchy, and semantic tokens help the experience feel understandable and consistent.

## Core principles

1. Readability first: high contrast, generous line-height, disciplined spacing.
2. Restraint in color: green primary, with rare accent flourishes; neutrals carry most surfaces.
3. Subtle depth: use blur, noise, thin borders, and soft shadows instead of heavy drops.
4. Cohesive motion: brief, calm transitions; don’t move content unless it improves comprehension.
5. Theme parity: both light and dark modes feel native, not inverted.

## Color system

Defined in `src/app.css` using OKLCH and semantic tokens.

- Neutrals
  - Light: `--background: #ffffff`, zinc grays for borders/structure.
  - Dark: `--background: #050506`, `--foreground: #fafafa` for crisp contrast.
- Primary (Green, hue ~149)
  - Semantic: `--primary`, `--ring`, and a calibrated scale `--color-primary-50..950` per theme.
  - Usage: primary actions, active states, focus rings, subtle glows.
- Secondary/Tertiary
  - Emerald and Teal families provide tonal variety (`--color-emerald-*`, `--color-teal-*`). Use sparingly.
- Functional
  - Success: emerald-500; Warning: amber; Error: red-500.

Guidelines

- Default surfaces use neutrals; elevate with a 1px border and a very soft shadow.
- Limit saturated green to key actions and highlights.
- Prefer OKLCH tokens over hard-coded hex for consistency across themes.

## Typography

- Headings: Space Grotesk — contemporary, geometric voice for titles and brand.
- Body: Inter — highly legible for docs/content.
- Defaults
  - Base size: 16px.
  - Line-height: ~1.7 for readability.
  - Heading sizes set per component/page context; avoid global glow on headings.

Guidelines

- Keep headings concise; rely on spacing for hierarchy.
- Use typography plugin classes for prose in docs when appropriate.

## Spacing and layout

- Container: `.max-w-container` (1672px) with responsive horizontal padding.
- Vertical rhythm: prefer `py-24 md:py-32` for section blocks; use gradient hairline separators when needed.
- Grid: Tailwind utilities; keep consistent gaps (8/12/16/24px multiples).

## Depth and materials

- Glassmorphism
  - Backdrop blur (`backdrop-blur-xl`) with theme tints: `bg-white/70` light, `dark:bg-zinc-950/55` dark.
  - Thin borders using `--color-border` at 40–60% opacity.
- Noise texture
  - Low-contrast overlay at 0.04–0.08 opacity; 128px tile; `mix-blend-overlay`.
- Shadows
  - Use `shadow-md` to `shadow-xl` sparingly; avoid hard drops. Prefer edge gradients to imply elevation.
- Edge gradients
  - 1px hairlines at top/bottom of glass surfaces for crisp depth without muddiness.

## Interaction and motion

- Timing: 150–200ms; easing via `--ease-responsive` or standard Tailwind easings.
- Focus: visible `ring-2 ring-primary` with `ring-offset-background` on glass.
- Hover
  - Text links: color shift from muted to foreground; optional 2px underbar animation on nav.
  - Buttons: slight brightness and a soft radial glow using `--color-button-glow-*`.
- Reduced motion: respect `prefers-reduced-motion`; avoid large translations.

## Components

### Header

- Sticky, glass header with rounded bottom and thin border.
- Layers: blur + tint, noise overlay, top/bottom edge gradients.
- Navigation: muted-foreground → foreground on hover; centered underbar for hover/active.
- Actions: Primary “Install” CTA, secondary “GitHub”, theme toggle. Mobile menu mirrors links with large tap targets.

### Buttons

- Primary: filled `bg-primary` with subtle glow halo and clear focus ring.
- Secondary: bordered neutral surface (`border-border/60 bg-background/60`), hover to muted.
- Destructive: red emphasis conservatively used.

### Cards/Surfaces

- Neutral background with border and soft shadow.
- Optional gradient-border hover effect for interactive cards.

### Docs

- Use `@tailwindcss/typography` for content blocks.
- Code blocks: line numbers supported; ensure adequate contrast in both themes.

## Theming

- Theme selection is pre-applied in `app.html` via `localStorage` and `prefers-color-scheme`.
- All colors and effects should reference semantic tokens from `:root` or `.dark` in `app.css`.
- Avoid hard-coded theme-specific values in components where a token exists.

## Accessibility

- Maintain 4.5:1 contrast for body text; 3:1 for large headings allowed but prefer higher where feasible.
- Always provide visible focus; use `aria-current` for active nav; label interactive icons.
- Ensure touch targets are at least 44px.

## Assets

- Noise texture path: `/noise-texture.png` (placed under `static`). Tile at 128px.
- Icons: crisp SVG, consistent stroke weights. Prefer inline SVG for theming and accessibility.

## Do/Don’t

- Do:
  - Use semantic colors and tokens.
  - Keep animations subtle and purposeful.
  - Use borders and edge gradients to add depth to glass surfaces.
- Don’t:
  - Overuse saturated green or heavy shadows.
  - Introduce inconsistent glow colors.
  - Animate layout in ways that cause reflow or distract from reading.

## Implementation references

- Tokens and theme: `src/app.css`
- Global shell: `src/routes/+layout.svelte`
- Header example: `src/lib/components/layout/Header.svelte`
