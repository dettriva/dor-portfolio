<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    :title="isDark ? 'Modo claro' : 'Modo oscuro'"
  >
    <div class="toggle-track">
      <!-- Sol -->
      <div class="toggle-sun">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </div>
      
      <!-- Luna -->
      <div class="toggle-moon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </div>
      
      <!-- Thumb -->
      <div class="toggle-thumb">
        <div class="thumb-glow"></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  position: relative;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.toggle-track {
  position: relative;
  width: 60px;
  height: 30px;
  background: linear-gradient(135deg, #87CEEB 0%, #4FACFE 50%, #00C9FF 100%);
  border-radius: 100px;
  padding: 4px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(79, 172, 254, 0.3);
}

/* Modo oscuro - track */
.is-dark .toggle-track {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(15, 52, 96, 0.5);
}

/* Sol */
.toggle-sun {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #FFD700;
  transition: all 0.4s ease;
  opacity: 1;
}

.toggle-sun svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
}

.is-dark .toggle-sun {
  opacity: 0;
  transform: translateY(-50%) rotate(-90deg) scale(0.5);
}

/* Luna */
.toggle-moon {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #F5F3CE;
  transition: all 0.4s ease;
  opacity: 0;
}

.toggle-moon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 4px rgba(245, 243, 206, 0.6));
}

.is-dark .toggle-moon {
  opacity: 1;
  transform: translateY(-50%) rotate(0deg) scale(1);
}

:not(.is-dark) .toggle-moon {
  transform: translateY(-50%) rotate(90deg) scale(0.5);
}

/* Thumb */
.toggle-thumb {
  position: relative;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%);
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.is-dark .toggle-thumb {
  transform: translateX(30px);
  background: linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%);
}

.thumb-glow {
  position: absolute;
  inset: 2px;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE4B3 100%);
  border-radius: 50%;
  transition: all 0.4s ease;
}

.is-dark .thumb-glow {
  background: linear-gradient(135deg, #C9D6FF 0%, #E2E2E2 100%);
}

/* Hover effects */
.theme-toggle:hover .toggle-track {
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(79, 172, 254, 0.4);
}

.is-dark.theme-toggle:hover .toggle-track {
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(15, 52, 96, 0.6);
}

.theme-toggle:hover .toggle-thumb {
  transform: scale(1.05);
}

.is-dark.theme-toggle:hover .toggle-thumb {
  transform: translateX(30px) scale(1.05);
}

/* Focus visible */
.theme-toggle:focus-visible .toggle-track {
  outline: 2px solid var(--accent-500, #f97316);
  outline-offset: 2px;
}

/* Active - efecto de presión */
.theme-toggle:active .toggle-thumb {
  width: 26px;
}

.is-dark.theme-toggle:active .toggle-thumb {
  transform: translateX(26px);
}

/* Estrellas en modo oscuro (decoración extra) */
.is-dark .toggle-track::before,
.is-dark .toggle-track::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.7;
  animation: twinkle 2s ease-in-out infinite;
}

.is-dark .toggle-track::before {
  top: 8px;
  left: 12px;
  animation-delay: 0s;
}

.is-dark .toggle-track::after {
  top: 18px;
  left: 20px;
  animation-delay: 1s;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}
</style>