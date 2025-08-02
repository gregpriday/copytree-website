# CopyTree Website

The official website for CopyTree - AI-friendly file sharing that transforms complex codebases into optimized, AI-ready formats.

🌐 **Live Site**: [https://copytree.dev](https://copytree.dev)  
📦 **Main Project**: [CopyTree CLI](https://github.com/gregpriday/copytree)

## About

CopyTree revolutionizes how developers share codebases with AI assistants like Claude, ChatGPT, Grok, and Gemini. This website showcases the tool's capabilities and provides comprehensive documentation for users.

## Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Language**: Pure JavaScript (migrated from TypeScript)
- **Styling**: Tailwind CSS v4 with custom OKLCH color system
- **Syntax Highlighting**: Shiki with GitHub Dark theme
- **Icons**: Lucide Svelte + Custom SVG components
- **Image Processing**: Enhanced images with AVIF/WebP generation
- **Search**: Fuse.js for documentation search
- **Theme System**: Light/Dark/System theme support

## Features

### 🎨 **Modern Design System**

- OKLCH color definitions for precise color reproduction
- Glass morphism effects with backdrop blur
- Responsive design with mobile-first approach
- Professional typography using Inter and Space Grotesk

### 🖼️ **Optimized Media**

- Enhanced image processing with multiple format generation
- Automatic AVIF/WebP/PNG optimization
- Proper aspect ratio handling and responsive images

### 📝 **Comprehensive Documentation**

- Interactive documentation with search functionality
- Syntax-highlighted code examples
- Tabbed content organization
- Scroll-tracking navigation

### 🎯 **Interactive Components**

- Animated terminal demonstrations
- Live code copying functionality
- Theme switching with system preference detection
- Smooth page transitions and micro-interactions

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── shared/          # Reusable UI components
│   │   ├── layout/          # Header, Footer
│   │   ├── home/            # Homepage components
│   │   ├── docs/            # Documentation system
│   │   └── prompts/         # AI prompts browser
│   ├── stores/              # Svelte stores (theme, etc.)
│   └── prompts/             # Prompt configurations
├── routes/                  # SvelteKit routing
└── static/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/gregpriday/copytree-website.git
cd copytree-website

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The site will be available at `http://localhost:5173`

### Building

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Run Svelte checks:

```bash
npm run check
```

Format code:

```bash
npm run format
```

Lint code:

```bash
npm run lint
```

## Deployment

The website is optimized for static deployment and can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Build Output

The production build generates:

- Optimized JavaScript bundles with code splitting
- Enhanced images in multiple formats (AVIF, WebP, PNG)
- Minified CSS with critical path optimization
- Static HTML for SEO and performance

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Development Guidelines

- Use Svelte 5 runes (`$state`, `$effect`, `$derived`) for reactivity
- Follow the existing JSDoc patterns for type safety
- Maintain the design system consistency
- Ensure all components are accessible
- Test across different themes (light/dark/system)

## Architecture Notes

### Svelte 5 Migration

This project was migrated from TypeScript to pure JavaScript while maintaining type safety through JSDoc annotations. Key migration aspects:

- **Runes**: All components use modern Svelte 5 runes
- **Type Safety**: JSDoc provides IntelliSense and type checking
- **Performance**: Optimized bundle sizes with tree shaking
- **Compatibility**: Maintains all original functionality

### Theme System

The theme system uses CSS custom properties with OKLCH color space:

```css
:root {
	--primary: oklch(0.7 0.15 250);
	--background: oklch(0.98 0.01 250);
}

[data-theme='dark'] {
	--primary: oklch(0.8 0.15 250);
	--background: oklch(0.08 0.01 250);
}
```

### Component Architecture

Components follow a consistent pattern:

- Props defined with JSDoc types
- State management using Svelte 5 runes
- Responsive design with Tailwind classes
- Accessibility considerations built-in

## License

This website is open source and available under the [MIT License](LICENSE).

## Related Projects

- **[CopyTree CLI](https://github.com/gregpriday/copytree)** - The main CopyTree tool
- **[Svelte](https://svelte.dev)** - The web framework used
- **[SvelteKit](https://kit.svelte.dev)** - The application framework
- **[Tailwind CSS](https://tailwindcss.com)** - The utility-first CSS framework

---

Built with ❤️ using Svelte 5 and modern web technologies.
