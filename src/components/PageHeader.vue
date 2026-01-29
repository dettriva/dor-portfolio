<template>
  <section class="relative py-16 md:py-20 overflow-hidden">
    <!-- Fondo con formas orgánicas suaves -->
    <div class="absolute inset-0 -z-10">
      <div class="header-bg-shape header-bg-shape-1"></div>
      <div class="header-bg-shape header-bg-shape-2"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Layout principal - más abierto y fluido -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        
        <!-- Lado izquierdo: Contenido textual -->
        <div class="flex-1 max-w-2xl">
          
          <!-- Badge de categoría flotante -->
          <div v-if="category" class="inline-flex items-center gap-3 mb-6 group cursor-default">
            <div class="category-pill">
              <span class="pill-dot"></span>
              <span class="pill-text">{{ category }}</span>
            </div>
            <div class="pill-line"></div>
          </div>
          
          <!-- Título con estilo editorial grande -->
          <h1 class="page-title">
            <span class="title-text">{{ title }}</span>
            <span class="title-decoration"></span>
          </h1>
          
          <!-- Subtítulo elegante -->
          <p v-if="subtitle" class="page-subtitle">
            {{ subtitle }}
          </p>
          
          <!-- Info chips (si hay info) -->
          <div v-if="info" class="info-chips">
            <div class="chip" v-for="(item, index) in infoItems" :key="index">
              <i :class="chipIcons[index % chipIcons.length]"></i>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Lado derecho: Visual/Acciones -->
        <div class="flex flex-col items-start lg:items-end gap-6">
          
          <!-- Card de progreso con efecto de fuego -->
          <div v-if="progress" class="progress-card">
            <!-- Contenedor del efecto de fuego -->
            <div class="fire-container">
              <!-- Partículas de fuego -->
              <div class="fire-particles">
                <span v-for="n in 12" :key="n" class="fire-particle" :style="getFireParticleStyle(n)"></span>
              </div>
              
              <!-- Chispas -->
              <div class="sparks">
                <span v-for="n in 8" :key="'spark-' + n" class="spark" :style="getSparkStyle(n)"></span>
              </div>
              
              <!-- Glow suave de fondo -->
              <div class="fire-glow"></div>
              <div class="fire-glow-inner"></div>
              
              <!-- Anillo de fuego exterior -->
              <div class="fire-ring"></div>
              
              <div class="progress-visual">
                <svg class="progress-ring" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#f97316"/>
                      <stop offset="50%" stop-color="#fbbf24"/>
                      <stop offset="100%" stop-color="#f97316"/>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle class="ring-bg" cx="60" cy="60" r="52"/>
                  <circle class="ring-fill" cx="60" cy="60" r="52" filter="url(#glow)"/>
                </svg>
                <div class="progress-center">
                  <span class="progress-number">75</span>
                  <span class="progress-percent">%</span>
                </div>
              </div>
            </div>
            
            <div class="progress-info">
              <span class="progress-label">Dominio</span>
              <span class="progress-sublabel">Nivel técnico</span>
            </div>
          </div>
          
          <!-- Slot para acciones -->
          <div v-if="$slots.action" class="action-wrapper">
            <slot name="action"></slot>
          </div>
        </div>
      </div>
      
      <!-- Sección adicional -->
      <div v-if="$slots.default" class="mt-12">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  category?: string
  info?: string
  progress?: boolean
}>()

// Dividir info en items separados por •
const infoItems = computed(() => {
  if (!props.info) return []
  return props.info.split('•').map(item => item.trim()).filter(Boolean)
})

// Iconos para los chips
const chipIcons = ['pi pi-star-fill', 'pi pi-clock', 'pi pi-verified', 'pi pi-bolt']

// Estilos para partículas de fuego
const fireParticleConfigs = [
  { angle: 0, distance: 48, size: 6, duration: 2.4, delay: 0 },
  { angle: 30, distance: 52, size: 4, duration: 2.8, delay: 0.2 },
  { angle: 60, distance: 50, size: 5, duration: 2.2, delay: 0.4 },
  { angle: 90, distance: 54, size: 4, duration: 2.6, delay: 0.3 },
  { angle: 120, distance: 48, size: 6, duration: 3.0, delay: 0.5 },
  { angle: 150, distance: 52, size: 5, duration: 2.4, delay: 0.1 },
  { angle: 180, distance: 50, size: 4, duration: 2.8, delay: 0.6 },
  { angle: 210, distance: 54, size: 6, duration: 2.2, delay: 0.4 },
  { angle: 240, distance: 48, size: 5, duration: 2.6, delay: 0.2 },
  { angle: 270, distance: 52, size: 4, duration: 3.0, delay: 0.5 },
  { angle: 300, distance: 50, size: 6, duration: 2.4, delay: 0.3 },
  { angle: 330, distance: 54, size: 5, duration: 2.8, delay: 0.1 }
]

const getFireParticleStyle = (n: number) => {
  const config = fireParticleConfigs[(n - 1) % fireParticleConfigs.length]
  const rad = (config.angle * Math.PI) / 180
  const x = Math.cos(rad) * config.distance
  const y = Math.sin(rad) * config.distance
  
  return {
    '--start-x': `${x}px`,
    '--start-y': `${y}px`,
    '--size': `${config.size}px`,
    '--duration': `${config.duration}s`,
    '--delay': `${config.delay}s`
  }
}

// Estilos para chispas
const sparkConfigs = [
  { angle: 45, speed: 3.0 },
  { angle: 90, speed: 3.5 },
  { angle: 135, speed: 2.8 },
  { angle: 180, speed: 3.2 },
  { angle: 225, speed: 3.4 },
  { angle: 270, speed: 3.0 },
  { angle: 315, speed: 2.9 },
  { angle: 360, speed: 3.6 }
]

const getSparkStyle = (n: number) => {
  const config = sparkConfigs[(n - 1) % sparkConfigs.length]
  return {
    '--angle': `${config.angle}deg`,
    '--speed': `${config.speed}s`,
    '--delay': `${(n - 1) * 0.4}s`
  }
}
</script>

<style scoped>
/* ==================== FONDOS ==================== */
.header-bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  transition: opacity 0.3s ease;
}

.header-bg-shape-1 {
  top: 0;
  right: 0;
  width: 24rem;
  height: 24rem;
  background: linear-gradient(to bottom-left, var(--accent-100), transparent);
  opacity: 0.4;
}

.header-bg-shape-2 {
  bottom: 0;
  left: 0;
  width: 20rem;
  height: 20rem;
  background: linear-gradient(to top-right, var(--accent-200), transparent);
  opacity: 0.3;
}

:root.dark .header-bg-shape-1,
:root.dark .header-bg-shape-2 {
  opacity: 0.1;
}

/* ==================== BADGE CATEGORÍA ==================== */
.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--accent-200);
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

:root.dark .category-pill {
  border-color: var(--accent-500);
  background: rgba(249, 115, 22, 0.1);
}

.group:hover .category-pill {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-400);
}

.pill-dot {
  width: 8px;
  height: 8px;
  background: var(--gradient-primary);
  border-radius: 50%;
  animation: pulse-soft 3s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.15); }
}

.pill-text {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-600);
  transition: color 0.3s ease;
}

:root.dark .pill-text {
  color: var(--accent-400);
}

.pill-line {
  width: 3rem;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-400), transparent);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.group:hover .pill-line {
  width: 5rem;
}

/* ==================== TÍTULO ==================== */
.page-title {
  position: relative;
  margin-bottom: 1.5rem;
}

.title-text {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .title-text {
    font-size: 3.75rem;
  }
}

@media (min-width: 1024px) {
  .title-text {
    font-size: 4.5rem;
  }
}

.title-decoration {
  display: block;
  width: 80px;
  height: 5px;
  margin-top: 1rem;
  background: var(--gradient-primary);
  border-radius: 999px;
  animation: grow-line 0.8s ease-out forwards;
  transform-origin: left;
  transform: scaleX(0);
}

@keyframes grow-line {
  to { transform: scaleX(1); }
}

/* ==================== SUBTÍTULO ==================== */
.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin: 0 0 2rem 0;
  max-width: 32rem;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .page-subtitle {
    font-size: 1.375rem;
  }
}

/* ==================== INFO CHIPS ==================== */
.info-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: linear-gradient(135deg, var(--accent-50), var(--accent-100));
  border: 1px solid var(--accent-200);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent-700);
  transition: all 0.3s ease;
}

:root.dark .chip {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1));
  border-color: var(--accent-500);
  color: var(--accent-400);
}

.chip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.chip i {
  font-size: 0.875rem;
  color: var(--accent-500);
}

/* ==================== PROGRESS CARD CON FUEGO ==================== */
.progress-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  box-shadow: var(--shadow-card);
  transition: all 0.4s ease;
  position: relative;
  overflow: visible;
}

.progress-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(249, 115, 22, 0.25);
  border-color: var(--accent-400);
}

/* ==================== CONTENEDOR DE FUEGO ==================== */
.fire-container {
  position: relative;
  width: 80px;
  height: 80px;
}

/* Glow de fondo - SUAVE tipo respiración */
.fire-glow {
  position: absolute;
  inset: -15px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%);
  border-radius: 50%;
  animation: fire-glow-breathe 4s ease-in-out infinite;
  pointer-events: none;
}

.fire-glow-inner {
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 60%);
  border-radius: 50%;
  animation: fire-glow-breathe 3s ease-in-out infinite;
  animation-delay: 1s;
  pointer-events: none;
}

/* Animación tipo respiración - SUAVE SIN PARPADEO */
@keyframes fire-glow-breathe {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.1); 
  }
}

/* Anillo de fuego exterior - rotación continua */
.fire-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: 
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    linear-gradient(135deg, #f97316, #fbbf24, #f97316, #fbbf24) border-box;
  animation: fire-ring-rotate 8s linear infinite;
  pointer-events: none;
}

@keyframes fire-ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ==================== PARTÍCULAS DE FUEGO - FLUIDAS ==================== */
.fire-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.fire-particle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--size, 5px);
  height: var(--size, 5px);
  background: radial-gradient(circle, #fbbf24, #f97316);
  border-radius: 50%;
  transform: translate(var(--start-x), var(--start-y));
  animation: fire-particle-float var(--duration, 2.4s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  box-shadow: 0 0 6px 2px rgba(251, 191, 36, 0.5);
  opacity: 0.7;
}

/* Animación de partículas - FLUIDA sin saltos de opacidad */
@keyframes fire-particle-float {
  0%, 100% {
    transform: translate(var(--start-x), var(--start-y)) scale(0.8);
  }
  50% {
    transform: translate(
      calc(var(--start-x) * 1.15), 
      calc(var(--start-y) - 12px)
    ) scale(1.1);
  }
}

/* ==================== CHISPAS - FLUIDAS ==================== */
.sparks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.spark {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 2px;
  background: #fef3c7;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px #fbbf24, 0 0 6px 2px rgba(249, 115, 22, 0.4);
  animation: spark-drift var(--speed, 3s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  transform-origin: center;
  opacity: 0.8;
}

/* Animación de chispas - FLUIDA, movimiento ondulante */
@keyframes spark-drift {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-35px) scale(0.9);
  }
  50% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-48px) scale(1.1);
  }
}

/* ==================== PROGRESS VISUAL ==================== */
.progress-visual {
  position: relative;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: var(--accent-100);
  stroke-width: 8;
  transition: stroke 0.3s ease;
}

:root.dark .ring-bg {
  stroke: rgba(249, 115, 22, 0.2);
}

.ring-fill {
  fill: none;
  stroke: url(#progressGradient);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 327;
  stroke-dashoffset: 327;
  animation: fill-ring 1.5s ease-out forwards;
  filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.5));
}

@keyframes fill-ring {
  to {
    stroke-dashoffset: 82;
  }
}

.progress-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.progress-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-500);
  line-height: 1;
  text-shadow: 0 0 12px rgba(249, 115, 22, 0.4);
}

.progress-percent {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-400);
  margin-top: 2px;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.progress-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.progress-sublabel {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

/* ==================== ACTION WRAPPER ==================== */
.action-wrapper {
  display: flex;
  gap: 0.75rem;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1024px) {
  .progress-card {
    order: -1;
  }
}

@media (max-width: 640px) {
  .info-chips {
    gap: 0.5rem;
  }
  
  .chip {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
  }
  
  .fire-container,
  .progress-visual {
    width: 70px;
    height: 70px;
  }
  
  .progress-number {
    font-size: 1.25rem;
  }
  
  .fire-glow {
    inset: -12px;
  }
  
  .fire-glow-inner {
    inset: -6px;
  }
}

/* ==================== REDUCE MOTION ==================== */
@media (prefers-reduced-motion: reduce) {
  .title-decoration,
  .ring-fill,
  .pill-dot,
  .fire-particle,
  .spark,
  .fire-glow,
  .fire-glow-inner,
  .fire-ring {
    animation: none;
  }
  
  .title-decoration {
    transform: scaleX(1);
  }
  
  .ring-fill {
    stroke-dashoffset: 82;
  }
}
</style>