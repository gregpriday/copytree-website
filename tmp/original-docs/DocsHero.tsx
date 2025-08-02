import SearchBar from './SearchBar';

export default function DocsHero() {
  return (
    <section className="relative h-auto flex items-center justify-center bg-background py-12 border-b border-border">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 z-[1] overflow-hidden opacity-[0.15] dark:opacity-20" 
        style={{
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
        }}
      >
        {/* Light mode grid */}
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: 'url("/grid-pattern.svg")',
            backgroundPosition: 'center',
            backgroundSize: '60px 60px',
            backgroundRepeat: 'repeat'
          }}
        />
        {/* Dark mode grid */}
        <div 
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: 'url("/grid-pattern-dark.svg")',
            backgroundPosition: 'center',
            backgroundSize: '60px 60px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[3] opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'url(/noise-texture.png)', backgroundRepeat: 'repeat' }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-8">
          CopyTree Documentation
        </h1>
        
        {/* Search Bar */}
        <div>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}