<script lang="ts">
  import DocsHero from './DocsHero.svelte';
  import DocsScrollTracker, { type Section } from './DocsScrollTracker.svelte';
  import { GeometricDivider } from '../shared/index.js';
  
  // Import all section components
  import Overview from './sections/Overview.svelte';
  import Installation from './sections/Installation.svelte';
  import QuickStart from './sections/QuickStart.svelte';
  import Usage from './sections/Usage.svelte';
  import Configuration from './sections/Configuration.svelte';
  import Profiles from './sections/Profiles.svelte';
  import Transformers from './sections/Transformers.svelte';
  import CommandsReference from './sections/CommandsReference.svelte';
  import AdvancedFeatures from './sections/AdvancedFeatures.svelte';
  import Troubleshooting from './sections/Troubleshooting.svelte';

  // Define sections for navigation matching the original React component
  const sections: Section[] = [
    { id: 'overview', title: 'Overview' },
    { id: 'installation', title: 'Installation' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'usage', title: 'Usage' },
    { id: 'configuration', title: 'Configuration' },
    { id: 'profiles', title: 'Profiles' },
    { id: 'transformers', title: 'Transformers' },
    { id: 'commands', title: 'Commands Reference' },
    { id: 'advanced', title: 'Advanced Features' },
    { id: 'troubleshooting', title: 'Troubleshooting' },
  ];
</script>

<!-- Hero Section -->
<DocsHero />

<!-- Main Content Area -->
<div class="relative">
  <div class="max-w-container mx-auto px-6 md:px-9 py-12">
    <div class="flex gap-12">
      <!-- Sidebar with scroll tracking -->
      <DocsScrollTracker {sections} />
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="space-y-12">
          <!-- Overview Section -->
          <section id="overview" class="scroll-mt-[90px]">
            <Overview />
          </section>
          
          <GeometricDivider />
          
          <!-- Installation Section -->
          <section id="installation" class="scroll-mt-[90px]">
            <Installation />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Quick Start Section -->
          <section id="quick-start" class="scroll-mt-[90px]">
            <QuickStart />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Usage Section -->
          <section id="usage" class="scroll-mt-[90px]">
            <Usage />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Configuration Section -->
          <section id="configuration" class="scroll-mt-[90px]">
            <Configuration />
          </section>
          
          <GeometricDivider />
          
          <!-- Profiles Section -->
          <section id="profiles" class="scroll-mt-[90px]">
            <Profiles />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Transformers Section -->
          <section id="transformers" class="scroll-mt-[90px]">
            <Transformers />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Commands Reference Section -->
          <section id="commands" class="scroll-mt-[90px]">
            <CommandsReference />
          </section>
          
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <!-- Advanced Features Section -->
          <section id="advanced" class="scroll-mt-[90px]">
            <AdvancedFeatures />
          </section>
          
          <GeometricDivider />
          
          <!-- Troubleshooting Section -->
          <section id="troubleshooting" class="scroll-mt-[90px]">
            <Troubleshooting />
          </section>
        </div>
      </div>
    </div>
  </div>
</div>