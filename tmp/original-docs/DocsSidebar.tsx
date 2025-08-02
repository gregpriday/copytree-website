'use client';

import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  title: string;
}

interface DocsSidebarProps {
  sections: Section[];
  activeSection: string;
}

export default function DocsSidebar({ sections, activeSection }: DocsSidebarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // The header is 60px tall. Let's make it sticky just after it passes.
      setIsSticky(window.scrollY > 60); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update indicator position when activeSection changes
  useEffect(() => {
    if (!navRef.current) return;

    const activeIndex = sections.findIndex(section => section.id === activeSection);
    if (activeIndex === -1) return;

    const navItems = navRef.current.querySelectorAll('li');
    const activeItem = navItems[activeIndex];

    if (activeItem) {
      const { offsetTop, offsetHeight } = activeItem as HTMLElement;
      setIndicatorStyle({
        top: offsetTop,
        height: offsetHeight
      });
    }
  }, [activeSection, sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      // Scroll to position, accounting for the 60px static header + 20px margin
      window.scrollTo({
        top: absoluteTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <nav className={`sticky transition-all duration-300 ${isSticky ? 'top-20' : 'top-8'}`}>
        <div className="relative">
          {/* Animated indicator pill */}
          <div
            className="absolute -left-2 flex items-center transition-all duration-300 ease-out"
            style={{
              top: `${indicatorStyle.top}px`,
              height: `${indicatorStyle.height}px`,
            }}
            aria-hidden="true"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 w-2 h-2 bg-primary-400 rounded-full blur-sm animate-breathing" />
              {/* Main pill */}
              <div className="relative w-2 h-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-sm" />
            </div>
          </div>
          
          <ul ref={navRef} className="space-y-1 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className={`
                    block py-1.5 pl-4 pr-2 transition-all duration-200
                    ${activeSection === section.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Minimal Quick Actions */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex gap-4 text-xs">
            <a
              href="https://github.com/gregpriday/copytree/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Issues
            </a>
            <a
              href="https://github.com/gregpriday/copytree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}