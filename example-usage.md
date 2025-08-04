# SharedHero Component Usage Examples

The SharedHero component provides a clean, reusable hero section that follows the established design patterns from DocsHero and PromptsHero but without search functionality.

## Basic Usage

```svelte
<script>
	import { SharedHero } from '$lib/components/shared';
</script>

<SharedHero title="Page Title" />
```

## With Subtitle

```svelte
<script>
	import { SharedHero } from '$lib/components/shared';
</script>

<SharedHero
	title="Legal Information"
	subtitle="Our terms of service, privacy policy, and licensing information for CopyTree."
/>
```

## Props

- `title` (string, required): The main heading text
- `subtitle` (string, optional): Description text displayed below the title

## Features

- Grid pattern background with light/dark mode support
- Noise texture overlay for visual depth
- Semantic color tokens (background, foreground, border, muted-foreground)
- Reduced vertical padding (py-12 md:py-16) for space efficiency
- Responsive typography (text-3xl md:text-4xl)
- Proper Svelte 5 runes syntax with `$props()`
- Glass morphism effects and modern styling

## Design Integration

The component maintains visual consistency with existing hero components while being more streamlined and focused on typography hierarchy rather than interactive elements like search bars.
