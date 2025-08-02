<script lang="ts">
  import { Button } from '../shared';
</script>

<section class="relative py-16 bg-zinc-950 overflow-hidden">
  <!-- Forest background pattern -->
  <div 
    class="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjJDNTVFO3N0b3Atb3BhY2l0eTowLjMiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTBCOTgxO3N0b3Atb3BhY2l0eTowLjIiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzE0QjhBNjtzdG9wLW9wYWNpdHk6MC4xIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2dyYWQxKSIgc3Ryb2tlLXdpZHRoPSIwLjUiPgogICAgPHBhdGggZD0iTTIwLDEwIEwzMCw1IEw0MCwxMCBMNDAsMjAgTDMwLDI1IEwyMCwyMCBaIiAvPgogICAgPHBhdGggZD0iTTQwLDEwIEw1MCwxNSBMNTAsMjUgTDQwLDMwIEwzMCwyNSBMMzAsMTUgWiIgLz4KICAgIDxwYXRoIGQ9Ik0xMCwyMCBMMjAsMjAgTDIwLDMwIEwxMCwzNSBMMCwzMCBMMCwyMCBaIiAvPgogICAgPHBhdGggZD0iTTMwLDM1IEw0MCwzMCBMNTAsMzUgTDUwLDQ1IEw0MCw1MCBMMzAsNDUgWiIgLz4KICAgIDxwYXRoIGQ9Ik0xMCwzNSBMMjAsNDAgTDIwLDUwIEwxMCw1NSBMMCw1MCBMMCw0MCBaIiAvPgogICAgPHBhdGggZD0iTTIwLDQwIEwzMCwzNSBMMzAsNDUgTDIwLDUwIFoiIC8+CiAgPC9nPgogIDxnIGZpbGw9InVybCgjZ3JhZDEpIiBvcGFjaXR5PSIwLjE1Ij4KICAgIDxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjEuNSIgLz4KICAgIDxjaXJjbGUgY3g9IjQ1IiBjeT0iOCIgcj0iMSIgLz4KICAgIDxjaXJjbGUgY3g9IjM1IiBjeT0iNTIiIHI9IjEuMiIgLz4KICAgIDxjaXJjbGUgY3g9IjgiIGN5PSI0NSIgcj0iMC44IiAvPgogICAgPGNpcmNsZSBjeD0iNTIiIGN5PSIzMCIgcj0iMSIgLz4KICA8L2c+Cjwvc3ZnPg==')] bg-[length:120px_120px]"
  ></div>
  
  <!-- Left side background image -->
  <div class="absolute left-0 top-1/2 -translate-y-1/2 -left-1/4 opacity-20 blur-sm z-0">
    <img
      src="/images/home/intelligent-file-copying.png"
      alt="Background decoration"
      width="1536"
      height="1024"
      class="w-[600px] h-[400px] object-cover"
      loading="lazy"
    />
  </div>
  
  <!-- Right side background image -->
  <div class="absolute right-0 top-1/2 -translate-y-1/2 -right-1/4 opacity-20 blur-sm z-0">
    <img
      src="/images/home/ai-friendly.png"
      alt="Background decoration"
      width="1536"
      height="1024"
      class="w-[600px] h-[400px] object-cover"
      loading="lazy"
    />
  </div>
  
  <!-- Gradient overlay for better text readability -->
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/90 to-transparent z-10"></div>
  
  <div class="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
      Ready to Transform Your Workflow?
    </h2>
    
    <p class="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed mb-8">
      Install CopyTree Now and Unlock AI-Powered Coding.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center p-4">
      <a href="#getting-started">
        <Button size="lg" class="relative group px-5 py-2.5 text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg hover:from-emerald-700 hover:to-emerald-800 hover:brightness-110 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-visible">
          <!-- Subtle ambient glow -->
          <div class="absolute -inset-0.5 bg-emerald-500/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="relative z-10">Get CopyTree</span>
        </Button>
      </a>
      
      <a href="/docs">
        <Button variant="ghost" class="text-zinc-300 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          Read Documentation
        </Button>
      </a>
      
      <a
        href="https://github.com/gregpriday/copytree"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" class="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          View on GitHub
        </Button>
      </a>
    </div>
    
    <p class="mt-8 text-sm text-zinc-500">
      Free and open-source CLI tool
    </p>
  </div>
  
  <div class="relative z-20 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mt-8 opacity-50"></div>
</section>