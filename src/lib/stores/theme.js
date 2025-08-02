import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme type: 'light' | 'dark' | 'system'
export const theme = writable('system');

// Resolved theme after system preference is applied
export const resolvedTheme = writable('light');

// Initialize theme store
function initTheme() {
  if (!browser) return;

  // Get theme from localStorage or default to 'system'
  const storedTheme = localStorage.getItem('theme') || 'system';
  theme.set(storedTheme);

  // Function to get system preference
  const getSystemPreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Function to apply theme to DOM
  /** @param {string} currentTheme */
  const applyTheme = (currentTheme) => {
    const root = document.documentElement;
    const systemTheme = getSystemPreference();
    const effectiveTheme = currentTheme === 'system' ? systemTheme : currentTheme;
    
    // Update resolved theme
    resolvedTheme.set(effectiveTheme);
    
    // Apply theme class to root element
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Apply initial theme
  applyTheme(storedTheme);

  // Listen for theme changes
  theme.subscribe((currentTheme) => {
    if (!browser) return;
    
    // Save to localStorage
    localStorage.setItem('theme', currentTheme);
    
    // Apply theme
    applyTheme(currentTheme);
  });

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    theme.update(currentTheme => {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
      return currentTheme;
    });
  });
}

// Set theme function
/** @param {string} newTheme */
export function setTheme(newTheme) {
  theme.set(newTheme);
}

// Cycle through themes
export function cycleTheme() {
  theme.update(currentTheme => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  });
}

// Initialize when browser is available
if (browser) {
  initTheme();
}