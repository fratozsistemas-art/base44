import React, { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Theme modes
 */
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

/**
 * ThemeToggle Component
 * Provides theme switching functionality with system preference detection
 */
export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to system
    return localStorage.getItem('theme') || THEME_MODES.SYSTEM;
  });

  const [resolvedTheme, setResolvedTheme] = useState(THEME_MODES.DARK);

  useEffect(() => {
    const root = document.documentElement;
    
    // Function to resolve theme based on system preference
    const getResolvedTheme = (currentTheme) => {
      if (currentTheme === THEME_MODES.SYSTEM) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? THEME_MODES.DARK
          : THEME_MODES.LIGHT;
      }
      return currentTheme;
    };

    const resolved = getResolvedTheme(theme);
    setResolvedTheme(resolved);

    // Apply theme class
    root.classList.remove(THEME_MODES.LIGHT, THEME_MODES.DARK);
    root.classList.add(resolved);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolved === THEME_MODES.DARK ? '#0f172a' : '#ffffff'
      );
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === THEME_MODES.SYSTEM) {
        const newResolved = getResolvedTheme(THEME_MODES.SYSTEM);
        setResolvedTheme(newResolved);
        root.classList.remove(THEME_MODES.LIGHT, THEME_MODES.DARK);
        root.classList.add(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const themeOptions = [
    { 
      value: THEME_MODES.LIGHT, 
      label: 'Light', 
      icon: Sun,
      description: 'Light mode'
    },
    { 
      value: THEME_MODES.DARK, 
      label: 'Dark', 
      icon: Moon,
      description: 'Dark mode'
    },
    { 
      value: THEME_MODES.SYSTEM, 
      label: 'System', 
      icon: Monitor,
      description: 'Follow system preference'
    }
  ];

  const currentOption = themeOptions.find(opt => opt.value === theme) || themeOptions[2];
  const CurrentIcon = currentOption.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`touch-target ${className}`}
          aria-label="Toggle theme"
          title="Change theme"
        >
          <CurrentIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={`flex items-center gap-3 cursor-pointer ${
                theme === option.value ? 'bg-accent' : ''
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <div className="flex-1">
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </div>
              {theme === option.value && (
                <span className="text-primary text-lg" aria-label="Selected">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * useTheme hook for programmatic theme access
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || THEME_MODES.SYSTEM;
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return { theme, setTheme: changeTheme, THEME_MODES };
}

export default ThemeToggle;
