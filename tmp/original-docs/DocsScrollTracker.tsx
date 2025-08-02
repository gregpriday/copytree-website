'use client';

import { useState, useEffect } from 'react';
import DocsSidebar from './DocsSidebar';

interface Section {
  id: string;
  title: string;
}

interface DocsScrollTrackerProps {
  sections: Section[];
}

export default function DocsScrollTracker({ sections }: DocsScrollTrackerProps) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 90;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <DocsSidebar 
      sections={sections} 
      activeSection={activeSection} 
    />
  );
}