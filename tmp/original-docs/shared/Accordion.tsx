'use client';

import { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
}

export default function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-2 not-prose">
      {items.map((item) => (
        <div key={item.id} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-background hover:bg-muted/50 transition-colors duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <span className="font-medium text-foreground text-left">{item.title}</span>
            <svg
              className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                openItems.includes(item.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openItems.includes(item.id)
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 py-4 bg-muted border-t border-border">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}