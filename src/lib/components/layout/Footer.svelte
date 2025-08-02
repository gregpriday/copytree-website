<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-background border-t border-border text-foreground py-6 md:py-8">
  <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div class="text-xs text-muted-foreground opacity-80">
        © {currentYear} CopyTree. All rights reserved.
      </div>
      <nav class="flex gap-6">
        <a 
          href="/docs" 
          class="text-sm text-foreground hover:text-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
        >
          Documentation
        </a>
        <a 
          href="/privacy" 
          class="text-sm text-foreground hover:text-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
        >
          Privacy
        </a>
        <a 
          href="/terms" 
          class="text-sm text-foreground hover:text-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
        >
          Terms
        </a>
        <a 
          href="https://github.com/gregpriday/copytree" 
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-foreground hover:text-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none rounded-md"
        >
          GitHub
        </a>
      </nav>
    </div>
  </div>
</footer>