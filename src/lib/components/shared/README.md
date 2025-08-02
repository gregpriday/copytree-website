# Shared Components

This directory contains reusable Svelte components that have been migrated from the React version of the CopyTree website.

## Components

### Button

A versatile button component using class-variance-authority (CVA) for styling variants.

**Props:**
- `variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'` - Button style variant
- `size?: 'default' | 'sm' | 'lg'` - Button size
- `class?: string` - Additional CSS classes
- `type?: 'button' | 'submit' | 'reset'` - HTML button type
- `disabled?: boolean` - Whether the button is disabled
- `onclick?: (event: MouseEvent) => void` - Click handler

**Usage:**
```svelte
<script>
  import { Button } from '$lib/components/shared';
</script>

<Button>Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button size="lg" onclick={() => console.log('clicked')}>Large Button</Button>
```

### LogoIcon

SVG logo component with configurable sizes.

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Logo size (sm: 28px, md: 64px, lg: 80px, xl: 96px)
- `class?: string` - Additional CSS classes

**Usage:**
```svelte
<script>
  import { LogoIcon } from '$lib/components/shared';
</script>

<LogoIcon size="lg" />
<LogoIcon class="text-primary" />
```

### ThemeToggle

Theme switching component that cycles between light, dark, and system themes.

**Props:**
- `class?: string` - Additional CSS classes
- `showLabel?: boolean` - Whether to show the theme label text

**Usage:**
```svelte
<script>
  import { ThemeToggle } from '$lib/components/shared';
</script>

<ThemeToggle />
<ThemeToggle showLabel={true} />
```

## Theme Management

The theme system is managed via Svelte stores located in `$lib/stores/theme.ts`.

**Available exports:**
- `theme` - Writable store containing current theme setting ('light' | 'dark' | 'system')
- `resolvedTheme` - Readable store containing resolved theme after system preference
- `setTheme(newTheme: string)` - Function to set theme
- `cycleTheme()` - Function to cycle through themes

**Usage:**
```svelte
<script>
  import { theme, setTheme, cycleTheme } from '$lib/stores/theme';
  
  // Read current theme
  console.log($theme);
  
  // Set specific theme
  setTheme('dark');
  
  // Cycle through themes
  cycleTheme();
</script>
```

## Features

- **TypeScript Support**: All components are fully typed
- **Svelte 5 Runes**: Uses modern Svelte 5 reactivity patterns
- **CVA Integration**: Button component uses class-variance-authority for variant management
- **Theme Persistence**: Theme preference is saved to localStorage
- **System Theme Detection**: Automatically detects and respects system color scheme
- **Accessibility**: Proper ARIA labels and semantic HTML
- **CSS Custom Properties**: Integrates with existing CSS theme variables

## Migration Notes

These components maintain the same API and functionality as their React counterparts while adapting to Svelte patterns:

- React `className` prop becomes `class`
- React event handlers like `onClick` become `onclick`
- React `children` becomes Svelte's `{@render children?.()}`
- React `useTheme` hook becomes Svelte stores
- React `forwardRef` becomes `bind:this` and exported element references