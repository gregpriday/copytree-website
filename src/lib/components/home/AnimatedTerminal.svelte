<script>
  /** @type {{ text: string, type: 'prompt' | 'command' | 'output' | 'installing', id: number }} */
  let VisibleLine;

  const commandSequence = [
    { 
      command: '$ npm install -g copytree',
      installing: '⠋ Installing copytree...',
      output: '✓ Installed copytree',
      installDuration: 2000,
      pauseAfter: 1500, // Pause to "read" the output
    },
    { 
      command: '$ copytree .',
      installing: '⠋ Processing files...',
      output: '✅ 144 files [803.2 KB] copied to clipboard',
      installDuration: 500,
      pauseAfter: 2500, // Good pause to absorb the clipboard message
    },
    {
      command: '$ copytree -r',
      installing: '⠋ Processing files...',
      output: '📎 144 files [803.2 KB] copied as file reference',
      installDuration: 500,
      pauseAfter: 3000, // Final pause on the file save message
    },
  ];

  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

  /** @type {VisibleLine[]} */
  let visibleLines = $state([]);
  let isDone = $state(false);
  /** @type {number | null} */
  let currentTypingLineId = $state(null);
  /** @type {HTMLDivElement} */
  let terminalRef;
  /** @type {ReturnType<typeof setInterval> | null} */
  let spinnerInterval = null;
  
  /** @param {number} ms */
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function animateTerminal() {
    // Initial pause before starting the animation
    await wait(750);
    
    let lineId = 0;
    
    for (let stepIndex = 0; stepIndex < commandSequence.length; stepIndex++) {
      const step = commandSequence[stepIndex];
      const [prompt, ...cmdParts] = step.command.split(' ');
      const commandText = cmdParts.join(' ');
      
      lineId++;
      const currentLineId = lineId;
      
      // Show the prompt
      visibleLines = (() => {
        const newLine = { text: prompt, type: /** @type {'command'} */('command'), id: currentLineId };
        if (visibleLines.length >= 2) {
          return [visibleLines[1], newLine];
        }
        return [...visibleLines, newLine];
      })();
      
      // Wait before starting to type (progressively longer as user reads output)
      const thinkingDelay = stepIndex === 0 ? 300 : stepIndex === 1 ? 800 : 1200;
      await wait(thinkingDelay);
      
      // Now start typing
      currentTypingLineId = currentLineId;
      
      let typedCommand = '';
      for (let i = 0; i < commandText.length; i++) {
        typedCommand = commandText.substring(0, i + 1);
        const fullCommand = `${prompt} ${typedCommand}`;
        
        visibleLines = visibleLines.map(line => 
          line.id === currentLineId ? { ...line, text: fullCommand } : line
        );
        await wait(40 + Math.random() * 40); // Variable typing speed for more natural feel
      }
      
      currentTypingLineId = null;
      
      // Pre-execution pause before "hitting Enter"
      await wait(400);
      
      // Simulate pressing Enter - show new line immediately
      if (step.installing) {
        lineId++;
        const installingLineId = lineId;
        let spinnerIndex = 0;
        
        // For copytree command, add extra delay before showing "Processing files..."
        if (stepIndex === 1) {
          await wait(200);
        }
        
        visibleLines = (() => {
          const newLine = { text: step.installing, type: /** @type {'installing'} */('installing'), id: installingLineId };
          if (visibleLines.length >= 2) {
            return [visibleLines[1], newLine];
          }
          return [...visibleLines, newLine];
        })();
        
        // Wait for slide animation to complete
        await wait(350); // Wait for slide-in animation
        
        // Animate spinner
        spinnerInterval = setInterval(() => {
          spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
          const spinnerText = step.installing.replace(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏]/, spinnerFrames[spinnerIndex]);
          visibleLines = visibleLines.map(line => 
            line.id === installingLineId ? { ...line, text: spinnerText } : line
          );
        }, 80);
        
        await wait(step.installDuration || 1500);
        
        if (spinnerInterval) {
          clearInterval(spinnerInterval);
        }
        
        // Replace with success message
        visibleLines = visibleLines.map(line => 
          line.id === installingLineId ? { ...line, text: step.output, type: 'output' } : line
        );
      } else {
        // Show output immediately for non-installing commands
        await wait(200); // Small pause to simulate Enter press
        
        lineId++;
        visibleLines = (() => {
          const newLine = { text: step.output, type: /** @type {'output'} */('output'), id: lineId };
          if (visibleLines.length >= 2) {
            return [visibleLines[1], newLine];
          }
          return [...visibleLines, newLine];
        })();
        
        // Wait for slide animation to complete
        await wait(350);
      }
      
      await wait(step.pauseAfter);
    }
    isDone = true;
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const currentRef = terminalRef;
          if (currentRef) {
            observer.unobserve(currentRef);
          }
          await animateTerminal();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = terminalRef;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (spinnerInterval) {
        clearInterval(spinnerInterval);
      }
    };
  });
</script>

<div bind:this={terminalRef} class="w-full my-8">
  <!-- Container adapts to theme using Tailwind's dark mode -->
  <div class="bg-background/90 backdrop-blur-sm border border-border shadow-lg dark:shadow-none rounded-lg overflow-hidden">
    <!-- Terminal header - adapts to theme -->
    <div class="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      <span class="text-xs font-medium ml-2 text-muted-foreground">
        Terminal
      </span>
    </div>
    
    <!-- Terminal content - always dark for authenticity -->
    <div class="bg-zinc-950 px-4 py-3 font-mono text-sm">
      <div class="relative h-12">
        {#each visibleLines as line, index (line.id)}
          <div 
            class="absolute w-full transition-all duration-300 ease-out"
            style="transform: translateY({index * 1.5}rem)"
          >
            {#if line.type === 'output'}
              <span class="text-cyan-400">{line.text}</span>
            {:else if line.type === 'installing'}
              <span class="text-zinc-500">{line.text}</span>
            {:else}
              <span class="text-emerald-400">$ </span>
              <span class="text-zinc-300">{line.text.substring(2)}</span>
              <span 
                class="inline-block w-2 h-4 animate-pulse ml-1 bg-emerald-400 transition-colors duration-150 {
                  !isDone && currentTypingLineId === line.id ? 'opacity-100' : 'opacity-0'
                }"
                style="transform: translateY(3px)"
              ></span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>