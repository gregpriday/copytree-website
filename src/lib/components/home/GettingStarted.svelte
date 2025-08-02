<script lang="ts">
  import { CodeBlock } from '$lib/components/shared';

  // Add a type for the step object for better type safety
  interface Step {
    number: string;
    title: string;
    description: string;
    code: string;
    language: string;
    isProTip?: boolean; // Optional property
  }

  const steps: Step[] = [
    {
      number: '01',
      title: 'Install CopyTree',
      description: 'Get started with a simple npm install command',
      code: 'npm install -g copytree',
      language: 'bash'
    },
    {
      number: '02',
      title: 'Copy Your Codebase',
      description: 'Run copytree in your project directory to copy it to your clipboard',
      code: 'copytree',
      language: 'bash'
    },
    {
      number: '03',
      title: 'Paste & Plan',
      description: 'Your codebase is now copied to clipboard in AI-ready format. Simply paste it into Claude, ChatGPT, Grok, or any AI assistant to start building.',
      code: '',
      language: ''
    },
    {
      number: 'PRO',
      title: 'Works with GitHub Repos',
      description: 'CopyTree works great with GitHub repos and integrates into workflows like pasting into AI for planning (as I do in my video):',
      code: 'copytree https://github.com/gregpriday/copytree',
      language: 'bash',
      isProTip: true,
    }
  ];
</script>

<section id="getting-started" class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-visible">
  <div class="max-w-5xl mx-auto overflow-visible">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
        Install in three simple steps.
      </h2>
      <p class="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
        From installation to AI-ready code in just a few steps
      </p>
    </div>
    
    <div class="space-y-10">
      {#each steps as step, index}
        <div class="group relative">
          <!-- Connection line -->
          {#if index < steps.length - 1}
            <div class="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
          {/if}
          
          <div class="flex gap-6">
            <!-- Step number -->
            <div class="flex-shrink-0 relative z-10">
              <div class="w-16 h-16 rounded-xl bg-background border-2 border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 shadow-sm box-border">
                {#if step.isProTip}
                  <div class="w-10 h-10">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <!-- GitHub Octocat icon -->
                      <g fill="currentColor">
                        <path d="M16 2C8.268 2 2 8.268 2 16c0 6.112 3.96 11.294 9.45 13.125.691.126.943-.3.943-.667 0-.329-.012-1.415-.018-2.566-3.844.835-4.656-1.63-4.656-1.63-.628-1.596-1.534-2.021-1.534-2.021-1.254-.857.095-.839.095-.839 1.387.097 2.116 1.424 2.116 1.424 1.233 2.114 3.236 1.503 4.025 1.149.125-.893.482-1.502.877-1.847-3.072-.35-6.303-1.536-6.303-6.835 0-1.509.539-2.744 1.424-3.711-.143-.35-.618-1.761.135-3.671 0 0 1.16-.373 3.801 1.421 1.102-.307 2.285-.46 3.461-.465 1.176.005 2.359.158 3.462.465 2.64-1.794 3.799-1.421 3.799-1.421.754 1.91.279 3.321.136 3.671.886.967 1.423 2.202 1.423 3.711 0 5.314-3.236 6.481-6.318 6.826.497.428.939 1.272.939 2.564 0 1.852-.017 3.344-.017 3.799 0 .371.25.799.949.664C26.042 27.288 30 22.11 30 16c0-7.732-6.268-14-14-14z" fill="url(#githubGradient)"/>
                        <!-- Add some highlight -->
                        <path d="M6.5 23.5c.3.6 1.2 1.2 2.5 1.5" stroke="url(#githubGradient)" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
                      </g>
                      <defs>
                        <linearGradient id="githubGradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22C55E"/>
                          <stop offset="1" stop-color="#059669"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                {:else}
                  <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80">
                    {step.number}
                  </span>
                {/if}
              </div>
            </div>
            
            <!-- Step content -->
            <div class="flex-1 overflow-visible">
              <h3 class="text-xl font-medium text-foreground mb-2">{step.title}</h3>
              <p class="text-muted-foreground mb-4">{step.description}</p>
              
              <!-- Terminal block - with padding for glow -->
              {#if step.code}
                <div class="relative px-8 -mx-8 transition-opacity duration-500 opacity-90 hover:opacity-100">
                  <CodeBlock 
                    code={step.code} 
                    language={step.language} 
                    glow={true} 
                    animate={true} 
                    animationSpeed={25} 
                    animationDelay={index * 100} 
                  />
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>