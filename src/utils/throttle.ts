// src/utils/throttle.ts
// Lightweight throttle utility for performance optimization

/**
 * Creates a throttled version of a function that only executes at most once
 * per specified time interval. Useful for scroll and mouse move handlers.
 *
 * @param fn - The function to throttle
 * @param delay - Minimum time between function calls in milliseconds
 * @returns Throttled function
 *
 * @example
 * const throttledScroll = throttle(handleScroll, 16) // ~60fps
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    } else if (!timeoutId) {
      // Schedule a call for the end of the throttle period
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        timeoutId = null
        fn.apply(this, args)
      }, delay - timeSinceLastCall)
    }
  }
}

/**
 * Creates a debounced version of a function that delays execution until
 * after a specified time has passed since the last call.
 *
 * @param fn - The function to debounce
 * @param delay - Time to wait after last call before executing
 * @returns Debounced function
 *
 * @example
 * const debouncedSearch = debounce(handleSearch, 300)
 * input.addEventListener('input', debouncedSearch)
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
