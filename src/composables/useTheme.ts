// src/composables/useTheme.ts
// Manages dark/light theme with system preference support and localStorage persistence
import { ref, computed, onUnmounted } from 'vue'

export type Theme = 'light' | 'dark'

// Global theme state (shared across all components using this composable)
const theme = ref<Theme>('light')

// Store media query listener for cleanup
let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null
let mediaQuery: MediaQueryList | null = null

export function useTheme() {

  // Initialize theme on app load
  const initTheme = () => {
    // 1. Check localStorage for saved preference
    const saved = localStorage.getItem('theme') as Theme | null

    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    } else {
      // 2. Fall back to system preference
      if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
      }
    }

    applyTheme(theme.value)

    // 3. Listen for system preference changes (only if no manual preference)
    mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (mediaQuery) {
      mediaQueryListener = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      }
      mediaQuery.addEventListener('change', mediaQueryListener)
    }
  }

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement

    html.classList.remove('light', 'dark')
    html.classList.add(newTheme)

    // Update meta theme-color for mobile browsers
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', newTheme === 'dark' ? '#0a0a0f' : '#ffffff')
  }

  // Set specific theme
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  // Cleanup listener on unmount (prevents memory leak)
  const cleanup = () => {
    if (mediaQuery && mediaQueryListener) {
      mediaQuery.removeEventListener('change', mediaQueryListener)
      mediaQueryListener = null
      mediaQuery = null
    }
  }

  // Computed properties for easy template binding
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  return {
    theme,
    isDark,
    isLight,
    initTheme,
    setTheme,
    toggleTheme,
    cleanup
  }
}