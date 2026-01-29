<template>
  <section class="cta-section" aria-labelledby="cta-title">
    <div class="cta-wrapper">
      <!-- Background -->
      <div class="cta-background" aria-hidden="true">
        <div class="cta-gradient"></div>
        <div class="cta-pattern"></div>
      </div>

      <!-- Content -->
      <div class="cta-content">
        <!-- Icon -->
        <div class="cta-icon">
          <i :class="icon" aria-hidden="true"></i>
          <div class="cta-icon-ring"></div>
        </div>

        <!-- Text -->
        <div class="cta-text">
          <span v-if="badge" class="cta-badge">{{ badge }}</span>
          <h3 :id="titleId" class="cta-title">{{ title }}</h3>
          <p class="cta-description">{{ description }}</p>
        </div>

        <!-- Actions -->
        <div class="cta-actions">
          <RouterLink
            v-if="primaryAction"
            :to="primaryAction.to"
            class="cta-button cta-button-primary"
          >
            <i v-if="primaryAction.icon" :class="primaryAction.icon" aria-hidden="true"></i>
            <span>{{ primaryAction.label }}</span>
          </RouterLink>

          <button
            v-if="secondaryAction"
            @click="secondaryAction.onClick"
            class="cta-button cta-button-secondary"
          >
            <i v-if="secondaryAction.icon" :class="secondaryAction.icon" aria-hidden="true"></i>
            <span>{{ secondaryAction.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ActionButton {
  label: string
  icon?: string
  to?: string
  onClick?: () => void
}

interface Props {
  title: string
  description: string
  icon?: string
  badge?: string
  primaryAction?: ActionButton
  secondaryAction?: ActionButton
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'pi pi-sparkles'
})

// Generate unique ID for accessibility
const titleId = computed(() => `cta-title-${Math.random().toString(36).substr(2, 9)}`)
</script>

<style scoped>
.cta-section {
  margin-top: 4rem;
  margin-bottom: 2rem;
}

.cta-wrapper {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
}

/* Background */
.cta-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
}

.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(249, 115, 22, 0.15) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.5;
}

/* Content */
.cta-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
}

@media (min-width: 768px) {
  .cta-content {
    flex-direction: row;
    text-align: left;
    padding: 3rem;
  }
}

/* Icon */
.cta-icon {
  position: relative;
  width: 72px;
  height: 72px;
  background: var(--gradient-primary);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cta-icon i {
  font-size: 2rem;
  color: white;
}

.cta-icon-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid rgba(249, 115, 22, 0.4);
  border-radius: 1.5rem;
  animation: ringPulse 3s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

/* Text */
.cta-text {
  flex: 1;
}

.cta-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: rgba(249, 115, 22, 0.2);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fb923c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.cta-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
}

.cta-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
}

/* Actions */
.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 480px) {
  .cta-actions {
    flex-direction: row;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
}

.cta-button-primary {
  background: var(--gradient-primary);
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
}

.cta-button-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(249, 115, 22, 0.5);
}

.cta-button-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cta-button-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 640px) {
  .cta-content {
    padding: 2rem 1.5rem;
  }

  .cta-icon {
    width: 60px;
    height: 60px;
  }

  .cta-icon i {
    font-size: 1.5rem;
  }

  .cta-title {
    font-size: 1.25rem;
  }

  .cta-button {
    width: 100%;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .cta-icon-ring {
    animation: none;
  }
}

:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 3px;
}
</style>
