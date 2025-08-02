# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run build` - Build production version (use this to verify changes)
- `npm run preview` - Preview production build locally
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Run Prettier code formatting check
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:unit` - Run unit tests with Vitest

**IMPORTANT: Do NOT run `npm run dev` as it starts a blocking development server. Use `npm run build` instead to verify your changes work correctly.**

## Project Overview

**CopyTree SvelteKit Website** - A conversion of the original Next.js marketing website to SvelteKit 2.0, showcasing the CopyTree developer tool. CopyTree converts entire codebases into AI-friendly formats for use with large language models.

### Core Functionality (from CopyTree tool)
- **Intelligent File Copying**: Automatically selects relevant files based on project type, respecting .gitignore
- **15+ File Transformers**: Supports PDFs, images, code summaries, and various file formats
- **AI-Optimized Output**: Generates XML/JSON formats designed for large context windows
- **Profile System**: Default profile with custom YAML creation for tailored file selection
- **Git Integration**: Can focus on recent changes or specific commits
- **GitHub Repo Support**: Works directly with GitHub URLs

## Architecture Overview

This is a **SvelteKit 2.0** marketing website using:
- **Framework**: SvelteKit with App Router and Svelte 5
- **Styling**: Tailwind CSS v4 with custom theme
- **Components**: Svelte 5 with JavaScript (strict mode enabled via jsconfig.json)
- **Code Highlighting**: Shiki for syntax highlighting
- **Icons**: Lucide Svelte for consistent iconography
- **Search**: Fuse.js for fuzzy search functionality
- **Build Tool**: Vite with SvelteKit plugin
- **Testing**: Vitest with browser testing support
- **Code Quality**: Prettier for formatting, svelte-check for type checking
- **Theme System**: Custom dark/light/system theme toggle with localStorage persistence

### Project Structure
- `/src/routes` - SvelteKit routes and pages
  - `+page.svelte` - Homepage assembling all marketing sections
  - `+layout.svelte` - Root layout with metadata, fonts, Header/Footer
  - `/docs` - Documentation pages with comprehensive sections
  - `/prompts` - Prompts exploration and management pages
  - `/api/prompts` - Server-side API endpoints for prompt handling
- `/src/lib/components` - Reusable Svelte components organized by domain
  - `/home` - Landing page sections (Hero, Features, VideoSection, GettingStarted, CallToAction)
  - `/layout` - Site-wide components (Header, Footer)
  - `/prompts` - Prompt-related components (Hero, CodeViewer, CopyButton, PromptExplorer)
  - `/docs` - Documentation components (DocsHero, DocsSidebar, sections, shared utilities)
  - `/shared` - Reusable UI components (Button, ThemeToggle, LogoIcon, CopyCommand, CodeBlock)
- `/src/lib/stores` - Svelte stores for state management
  - `theme.js` - Theme management with system preference detection
- `/src/lib/prompts` - Prompt configuration and actions
- `/src/lib/assets` - Images and static assets for components
- `/static` - Static assets including favicons, logos, and prompt files

### Key Design Patterns
- **Component Organization**: Domain-driven folder structure (home, layout, prompts, docs, shared)
- **Theming**: Tailwind v4 with inline `@theme` configuration in `app.css`
- **Color System**: OKLCH colors for wide gamut support, semantic color tokens
- **State Management**: Svelte stores for theme and application state
- **Modern Effects**: CSS-based animations, subtle gradients, glass morphism
- **Code Highlighting**: Shiki integration for beautiful syntax highlighting
- **Search Integration**: Fuse.js for fuzzy search across documentation
- **Icon System**: Lucide Svelte for consistent iconography

## SvelteKit-Specific Patterns

### File Naming Conventions
- `+page.svelte` - Route pages
- `+layout.svelte` - Layout components
- `+page.server.ts` - Server-side page logic
- `+layout.server.ts` - Server-side layout logic

### Component Architecture (Svelte 5 with Runes)
- **Reactive state**: Use `$state()` for component state instead of `let`
- **Computed values**: Use `$derived()` instead of `$:` reactive statements
- **Props**: Use `let { prop } = $props()` instead of `export let prop`
- **Event handling**: Use `onclick={handler}` instead of `on:click={handler}` 
- **Snippets**: Use `{#snippet name()}{/snippet}` and `{@render name()}` instead of slots
- **Effects**: Use `$effect()` for side effects instead of `onMount`/lifecycle hooks
- **Stores**: Import and use with `$` syntax for auto-subscription (unchanged)
- **Conditional rendering**: Use `{#if}` blocks (unchanged)
- **Iterations**: Use `{#each}` blocks (unchanged)

### Import Patterns
- Use `$lib` alias for library imports: `import { Component } from '$lib/components'`
- Use `$app` for SvelteKit-specific imports: `import { browser } from '$app/environment'`

## Design System & Visual Identity

### Design Philosophy
- **Sophisticated minimalism** - Drawing from Linear's systematic approach and Supabase's dark elegance
- **AI-forward design language** - Focus on productivity and intelligence
- **Developer empathy** - Quick to scan, easy to understand, delightful to use
- **Refined restraint** - Every pixel should earn its place

### Tailwind v4 Implementation
- Uses new CSS-first configuration with `@theme` directive in `app.css`
- Custom color palette defined with OKLCH colors
- Semantic color tokens that adapt to light/dark themes
- Modern CSS features: cascade layers, color-mix(), custom properties

### Component Styling Conventions
- **Theme-aware**: All components support light/dark/system themes
- **Semantic colors**: Use `bg-background`, `text-foreground`, `border-border` etc.
- **Hover states**: Subtle transform and color transitions
- **Focus states**: Accessible keyboard navigation with ring utilities
- **Glass effects**: `bg-zinc-900/50 backdrop-blur-sm` for modern depth

### Animation Patterns
- **CSS-only animations**: Performance-first approach
- **Timing hierarchy**: 150ms (micro), 200ms (standard), 300ms (state changes), 500ms (page transitions)
- **Reduced motion**: Respects user preference for reduced motion

## Development Notes

### Agent Usage Requirements

**CRITICAL: When creating any Svelte components, you MUST use the `svelte5-component-creator` agent.** This agent is specifically designed to:
- Ensure proper Svelte 5 runes syntax and patterns
- Maintain consistency with existing component architecture
- Follow established styling conventions with Tailwind v4
- Implement proper snippet system (replacing slots)
- Use correct TypeScript patterns with `$props()` and `$state()`

**For Tailwind v4 styling questions or complex CSS implementations, also leverage available Tailwind experts** to ensure proper use of the new CSS-first configuration and semantic color tokens.

### JavaScript Configuration
- JavaScript project using jsconfig.json with strict checking enabled
- Uses SvelteKit's generated config for proper path resolution
- ESModule interop and bundler module resolution for modern JS features
- Consistent casing and source map support enabled

### Important Development Notes
- **Project status**: Fully converted from Next.js to SvelteKit with comprehensive features
- **Component syntax**: Always use Svelte 5 runes syntax - see Component Architecture section above
- **Event handling**: Use Svelte 5 event syntax (`onclick={handler}` not `on:click={handler}`)
- **State management**: Use `$state()` and `$derived()` for component state, Svelte stores for global state
- **Routing**: Uses SvelteKit's file-based routing with server-side functionality
- **Component creation**: Always use the `svelte5-component-creator` agent for any new components
- **Testing**: Vitest configured with browser testing and Playwright for e2e testing
- **Code Quality**: Prettier handles formatting, no separate linting - run `npm run format` before commits

### Theme Implementation
- Theme toggle cycles through light → dark → system
- Persisted in localStorage with SSR-safe initialization
- System preference detection with media query listeners
- CSS custom properties update based on theme state

### Performance Considerations
- Vite for fast development builds and HMR
- SvelteKit's automatic code splitting
- Static asset optimization
- Lazy loading for non-critical components