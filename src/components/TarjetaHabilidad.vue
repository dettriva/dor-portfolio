<template>
  <div 
    class="skill-card"
    :class="[
      viewMode === 'list' ? 'skill-card-list' : 'skill-card-grid',
      `skill-card-${getLevelCategory()}`,
      { 'skill-card-highlight': highlight }
    ]"
    @mousemove="handleMouseMove"
  >
    <!-- Fondo con gradiente suave (SIN ROTACIÓN) -->
    <div class="skill-bg">
      <div class="skill-bg-gradient"></div>
      <div class="skill-bg-pattern"></div>
    </div>
    
    <!-- Borde animado brillante -->
    <div class="skill-border-glow"></div>
    
    <!-- Partículas flotantes -->
    <div class="skill-particles">
      <span v-for="n in 6" :key="n" class="particle" :style="getParticleStyle(n)"></span>
    </div>
    
    <!-- Badge decorativo con animación -->
    <div class="skill-badge" :class="getBadgeClass()">
      <span class="badge-emoji">{{ getLevelEmoji() }}</span>
      <div class="badge-ring"></div>
      <div class="badge-glow"></div>
    </div>
    
    <!-- Contenido -->
    <div class="skill-content">
      <!-- Header -->
      <div class="skill-header">
        <div class="skill-icon-wrapper">
          <div class="skill-icon" :class="getIconClass()">
            <i :class="skill.icon || 'pi pi-code'" class="skill-icon-svg"></i>
          </div>
          <div class="skill-icon-ring"></div>
          <div class="skill-icon-particles">
            <span v-for="n in 4" :key="n"></span>
          </div>
        </div>
        
        <div class="skill-info">
          <h3 class="skill-name">{{ skill.name }}</h3>
          <div class="skill-level-badge" :class="getLevelBadgeClass()">
            <span class="level-emoji">{{ getLevelEmoji() }}</span>
            <span class="level-text">{{ getLevelText() }}</span>
            <div class="level-shine"></div>
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <p v-if="skill.description" class="skill-description">
        {{ skill.description }}
      </p>

      <!-- Barra de progreso MEJORADA -->
      <div class="skill-progress-container">
        <div class="skill-progress-bar">
          <!-- Barra principal -->
          <div 
            class="skill-progress-fill"
            :class="getProgressClass()"
            :style="{ width: `${skill.level}%` }"
          >
            <div class="skill-progress-shine"></div>
            <div class="skill-progress-pulse"></div>
          </div>
          
          <!-- Marcadores de nivel -->
          <div class="progress-markers">
            <span class="marker" style="left: 40%"></span>
            <span class="marker" style="left: 65%"></span>
            <span class="marker" style="left: 85%"></span>
          </div>
        </div>
        
        <!-- Porcentaje SIMPLE - solo texto -->
        <span class="skill-percentage" :class="getProgressClass()">{{ skill.level }}%</span>
      </div>

      <!-- Footer mejorado -->
      <div class="skill-footer">
        <div v-if="skill.categories && skill.categories.length" class="skill-tags">
          <span 
            v-for="(category, index) in skill.categories.slice(0, 3)" 
            :key="category"
            class="skill-tag"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <i class="pi pi-tag"></i>
            {{ getCategoryName(category) }}
          </span>
        </div>
        
        <div v-if="skill.whereUsed" class="skill-where-used">
          <i class="pi pi-map-marker"></i>
          <span>{{ skill.whereUsed }}</span>
        </div>
      </div>
    </div>

    <!-- Efecto de luz que sigue el mouse -->
    <div 
      class="skill-spotlight" 
      :style="{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { SkillCard } from '@/types/portfolio'
import { throttle } from '@/utils/throttle'

interface Props {
  skill: SkillCard
  viewMode?: 'grid' | 'list'
  highlight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  viewMode: 'grid',
  highlight: false
})

const mousePos = reactive({ x: 50, y: 50 })

// Throttled mouse handler for better performance (~60fps)
const handleMouseMove = throttle((e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  mousePos.x = ((e.clientX - rect.left) / rect.width) * 100
  mousePos.y = ((e.clientY - rect.top) / rect.height) * 100
}, 16)

// Determinar categoría de nivel según el porcentaje
const getLevelCategory = (): 'basico' | 'intermedio' | 'avanzado' | 'experto' => {
  const level = props.skill.level
  if (level < 40) return 'basico'
  if (level < 65) return 'intermedio'
  if (level < 85) return 'avanzado'
  return 'experto'
}

// Mapeo de niveles a emojis
const getLevelEmoji = (): string => {
  const category = getLevelCategory()
  const emojiMap = {
    'basico': '🌱',
    'intermedio': '🌿',
    'avanzado': '🔥',
    'experto': '⚡'
  }
  return emojiMap[category]
}

// Mapeo de niveles a texto
const getLevelText = (): string => {
  const category = getLevelCategory()
  const textMap = {
    'basico': 'Básico',
    'intermedio': 'Intermedio',
    'avanzado': 'Avanzado',
    'experto': 'Experto'
  }
  return textMap[category]
}

// Clases según nivel
const getIconClass = () => `skill-icon-${getLevelCategory()}`
const getProgressClass = () => `skill-progress-${getLevelCategory()}`
const getBadgeClass = () => `skill-badge-${getLevelCategory()}`
const getLevelBadgeClass = () => `level-badge-${getLevelCategory()}`

// Estilos de partículas
const particleConfigs = [
  { x: 10, y: 20, size: 3, duration: 3, delay: 0 },
  { x: 85, y: 15, size: 4, duration: 3.5, delay: 0.5 },
  { x: 75, y: 70, size: 2, duration: 2.8, delay: 1 },
  { x: 20, y: 80, size: 3, duration: 3.2, delay: 0.3 },
  { x: 50, y: 30, size: 2, duration: 2.5, delay: 0.8 },
  { x: 90, y: 50, size: 3, duration: 3, delay: 0.2 }
]

const getParticleStyle = (n: number) => {
  const config = particleConfigs[(n - 1) % particleConfigs.length]
  return {
    '--p-x': `${config.x}%`,
    '--p-y': `${config.y}%`,
    '--p-size': `${config.size}px`,
    '--p-duration': `${config.duration}s`,
    '--p-delay': `${config.delay}s`
  }
}

// Nombre de categoría
const getCategoryName = (categoryId: string): string => {
  const categoryMap: Record<string, string> = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'database': 'BD',
    'devops': 'DevOps',
    'mobile': 'Mobile',
    'design': 'Diseño',
    'tools': 'Tools',
    'soft': 'Soft Skills'
  }
  return categoryMap[categoryId] || categoryId
}
</script>

<style scoped>
/* ==================== VARIABLES POR NIVEL ==================== */
.skill-card-basico {
  --level-color: #10b981;
  --level-color-light: #34d399;
  --level-glow: rgba(16, 185, 129, 0.5);
}

.skill-card-intermedio {
  --level-color: #3b82f6;
  --level-color-light: #60a5fa;
  --level-glow: rgba(59, 130, 246, 0.5);
}

.skill-card-avanzado {
  --level-color: #f59e0b;
  --level-color-light: #fbbf24;
  --level-glow: rgba(245, 158, 11, 0.5);
}

.skill-card-experto {
  --level-color: #ef4444;
  --level-color-light: #f87171;
  --level-glow: rgba(239, 68, 68, 0.5);
}

/* ==================== BASE CARD ==================== */
.skill-card {
  position: relative;
  background: var(--bg-card);
  border-radius: 1.5rem;
  border: 1px solid var(--border-primary);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.skill-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 40px var(--level-glow);
  border-color: var(--level-color);
}

:root.dark .skill-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

:root.dark .skill-card:hover {
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 50px var(--level-glow);
}

.skill-card-grid {
  height: 100%;
}

/* ==================== FONDOS - SIN ROTACIÓN ==================== */
.skill-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.skill-bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--level-color) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.skill-card:hover .skill-bg-gradient {
  opacity: 0.1;
}

:root.dark .skill-card:hover .skill-bg-gradient {
  opacity: 0.15;
}

.skill-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--level-color) 1px, transparent 0);
  background-size: 24px 24px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.skill-card:hover .skill-bg-pattern {
  opacity: 0.08;
}

/* ==================== BORDE BRILLANTE ==================== */
.skill-border-glow {
  position: absolute;
  inset: -2px;
  border-radius: 1.6rem;
  background: linear-gradient(135deg, var(--level-color), var(--level-color-light), var(--level-color));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.skill-card:hover .skill-border-glow {
  opacity: 0.6;
}

/* ==================== PARTÍCULAS ==================== */
.skill-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  left: var(--p-x);
  top: var(--p-y);
  width: var(--p-size);
  height: var(--p-size);
  background: var(--level-color);
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 6px var(--level-color);
}

.skill-card:hover .particle {
  animation: particleFloat var(--p-duration) ease-in-out infinite;
  animation-delay: var(--p-delay);
}

@keyframes particleFloat {
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-15px) scale(1.3);
  }
}

/* ==================== BADGE MEJORADO ==================== */
.skill-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-card:hover .skill-badge {
  transform: scale(1.2) rotate(15deg);
}

.skill-badge-basico {
  background: linear-gradient(135deg, #10b981, #34d399);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.5);
}

.skill-badge-intermedio {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.5);
}

.skill-badge-avanzado {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.5);
}

.skill-badge-experto {
  background: linear-gradient(135deg, #ef4444, #f87171);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.5);
}

.badge-emoji {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 2;
  animation: emojiPulse 2s ease-in-out infinite;
}

@keyframes emojiPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.badge-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--level-color);
  border-radius: 50%;
  opacity: 0;
  animation: ringPulse 1.5s ease-out infinite;
}

.skill-card:hover .badge-ring {
  opacity: 1;
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

.badge-glow {
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, var(--level-glow) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover .badge-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* ==================== CONTENIDO ==================== */
.skill-content {
  position: relative;
  padding: 1.75rem;
  z-index: 1;
}

/* ==================== HEADER ==================== */
.skill-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.skill-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.skill-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
}

.skill-card:hover .skill-icon {
  transform: scale(1.15) rotate(8deg);
}

/* Iconos por nivel */
.skill-icon-basico {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.skill-icon-intermedio {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.skill-icon-avanzado {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.skill-icon-experto {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

:root.dark .skill-icon-basico {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.2));
}

:root.dark .skill-icon-intermedio {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.2));
}

:root.dark .skill-icon-avanzado {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.2));
}

:root.dark .skill-icon-experto {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(248, 113, 113, 0.2));
}

.skill-icon-ring {
  position: absolute;
  inset: -4px;
  border: 2px dashed var(--level-color);
  border-radius: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover .skill-icon-ring {
  opacity: 0.6;
  animation: iconRingSpin 8s linear infinite;
}

@keyframes iconRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.skill-icon-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.skill-icon-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--level-color);
  border-radius: 50%;
  opacity: 0;
}

.skill-card:hover .skill-icon-particles span {
  animation: iconParticle 0.8s ease-out forwards;
}

.skill-icon-particles span:nth-child(1) { top: 0; left: 50%; --tx: 0; --ty: -15px; animation-delay: 0s; }
.skill-icon-particles span:nth-child(2) { top: 50%; right: 0; --tx: 15px; --ty: 0; animation-delay: 0.1s; }
.skill-icon-particles span:nth-child(3) { bottom: 0; left: 50%; --tx: 0; --ty: 15px; animation-delay: 0.2s; }
.skill-icon-particles span:nth-child(4) { top: 50%; left: 0; --tx: -15px; --ty: 0; animation-delay: 0.3s; }

@keyframes iconParticle {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
}

.skill-icon-svg {
  font-size: 2rem;
  color: var(--level-color);
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.skill-card:hover .skill-icon-svg {
  transform: scale(1.1);
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  transition: all 0.3s ease;
}

.skill-card:hover .skill-name {
  color: var(--level-color);
}

/* ==================== LEVEL BADGE MEJORADO ==================== */
.skill-level-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.level-badge-basico {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #047857;
}

.level-badge-intermedio {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1d4ed8;
}

.level-badge-avanzado {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #b45309;
}

.level-badge-experto {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #b91c1c;
}

:root.dark .level-badge-basico {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.2));
  color: #34d399;
}

:root.dark .level-badge-intermedio {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.2));
  color: #60a5fa;
}

:root.dark .level-badge-avanzado {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.2));
  color: #fbbf24;
}

:root.dark .level-badge-experto {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(248, 113, 113, 0.2));
  color: #f87171;
}

.skill-card:hover .skill-level-badge {
  transform: scale(1.05);
  box-shadow: 0 4px 12px var(--level-glow);
}

.level-emoji {
  font-size: 1rem;
  line-height: 1;
}

.level-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.skill-card:hover .level-shine {
  animation: levelShine 1s ease-out;
}

@keyframes levelShine {
  to { left: 100%; }
}

/* ==================== DESCRIPCIÓN ==================== */
.skill-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
}

/* ==================== BARRA DE PROGRESO ==================== */
.skill-progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.skill-progress-bar {
  flex: 1;
  height: 0.625rem;
  background: var(--bg-secondary);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

:root.dark .skill-progress-bar {
  background: var(--bg-tertiary);
}

.skill-progress-fill {
  height: 100%;
  border-radius: 999px;
  position: relative;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fillProgress 1.5s ease-out;
  overflow: hidden;
}

@keyframes fillProgress {
  from { width: 0 !important; }
}

.skill-progress-basico {
  background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
}

.skill-progress-intermedio {
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
}

.skill-progress-avanzado {
  background: linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d);
}

.skill-progress-experto {
  background: linear-gradient(90deg, #ef4444, #f87171, #fca5a5);
}

.skill-progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shine 2.5s ease-in-out infinite;
}

@keyframes shine {
  to { left: 100%; }
}

.skill-progress-pulse {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--level-color), 0 0 20px var(--level-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover .skill-progress-pulse {
  opacity: 1;
  animation: pulseDot 1.5s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.3); }
}

/* Marcadores de nivel */
.progress-markers {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.progress-markers .marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--bg-card);
  opacity: 0.5;
}

/* ==================== PORCENTAJE - SIMPLE SIN FONDO ==================== */
.skill-percentage {
  font-size: 1.125rem;
  font-weight: 800;
  min-width: 3.5rem;
  text-align: right;
  transition: all 0.3s ease;
}

.skill-percentage.skill-progress-basico { color: #10b981; }
.skill-percentage.skill-progress-intermedio { color: #3b82f6; }
.skill-percentage.skill-progress-avanzado { color: #f59e0b; }
.skill-percentage.skill-progress-experto { color: #ef4444; }

.skill-card:hover .skill-percentage {
  transform: scale(1.15);
}

/* ==================== FOOTER ==================== */
.skill-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.1));
  color: var(--accent-500);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid rgba(251, 191, 36, 0.3);
  transition: all 0.3s ease;
  animation: tagAppear 0.4s ease-out backwards;
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
}

.skill-card:hover .skill-tag {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(251, 191, 36, 0.15));
}

.skill-tag i {
  font-size: 0.625rem;
}

.skill-where-used {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  padding: 0.375rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

:root.dark .skill-where-used {
  background: var(--bg-tertiary);
}

.skill-card:hover .skill-where-used {
  color: var(--level-color);
}

.skill-where-used i {
  font-size: 0.75rem;
  color: var(--accent-500);
}

/* ==================== SPOTLIGHT EFFECT ==================== */
.skill-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    var(--level-glow) 0%, 
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.skill-card:hover .skill-spotlight {
  opacity: 0.15;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .skill-icon {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .skill-icon-svg {
    font-size: 1.5rem;
  }
  
  .skill-name {
    font-size: 1.125rem;
  }
  
  .skill-badge {
    width: 3rem;
    height: 3rem;
  }
  
  .badge-emoji {
    font-size: 1.25rem;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  .skill-card,
  .skill-icon,
  .skill-badge,
  .skill-progress-fill,
  .skill-progress-shine,
  .particle,
  .badge-ring,
  .badge-glow {
    animation: none !important;
    transition: none !important;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 2px;
}
</style>