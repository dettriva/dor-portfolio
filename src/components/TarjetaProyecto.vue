<template>
  <article class="group relative h-full">
    <!-- Efecto de fondo con gradiente -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-100/0 to-orange-400/0 
                rounded-2xl group-hover:from-primary-500/3 group-hover:via-primary-100/8 group-hover:to-orange-400/3 
                transition-all duration-700 -z-10"></div>
    
    <!-- Tarjeta principal -->
    <div class="project-card relative backdrop-blur-sm border rounded-2xl p-6 h-full
                flex flex-col shadow-soft hover:shadow-hard transition-all duration-500
                group-hover:translate-y-[-4px] overflow-hidden">
      
      <!-- Encabezado con efecto de brillo -->
      <div class="flex items-start justify-between gap-4 mb-5 relative">
        <!-- Línea decorativa lateral -->
        <div class="absolute -left-6 top-0 w-1 h-12 bg-gradient-to-b from-primary-400 to-orange-400 
                    rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Título del proyecto -->
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-bold text-dark-900 mb-1 leading-tight">
            {{ project.title }}
          </h3>
          
        </div>
        
        <!-- Botón de acción con efecto hover -->
        <div class="relative">
          <div class="absolute inset-0 bg-primary-500/20 rounded-full blur-md 
                      group-hover:bg-primary-500/30 transition-all duration-500"></div>
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="relative w-14 h-8 flex items-center justify-center bg-gradient-to-br from-primary-500 to-orange-500 
                   text-white rounded-xl shadow-md hover:shadow-lg hover:scale-110 
                   transition-all duration-300 group/link"
            aria-label="Ver proyecto"
          >
            <i class="pi pi-external-link text-sm"></i>
            <!-- Efecto hover en el botón -->
            <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-800 text-white text-xs 
                        px-2 py-1 rounded opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 
                        whitespace-nowrap pointer-events-none">
              Ver proyecto
            </span>
          </a>
        </div>
      </div>

      <!-- Descripción del proyecto -->
      <div class="mb-5 flex-1">
        <p class="text-dark-600 leading-relaxed line-clamp-3 group-hover:line-clamp-none 
                  transition-all duration-300">
          {{ project.description }}
        </p>
      </div>

      <!-- Tags con gradiente de color según tipo -->
      <div v-if="project.tags?.length" class="mt-auto pt-4 border-t border-primary-100/50">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(tag, index) in project.tags" 
            :key="tag"
            :class="getTagColor(index)"
            class="text-xs font-medium px-3 py-1.5 rounded-full border 
                   hover:scale-105 transition-transform duration-200 cursor-default"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Efecto de esquina decorativa -->
      <div class="absolute bottom-0 right-0 w-16 h-16 overflow-hidden -z-10">
        <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-tl from-primary-500/10 to-transparent 
                    transform rotate-45"></div>
      </div>
    </div>

    <!-- Efecto hover de borde completo -->
    <div class="absolute inset-0 border-2 border-transparent rounded-2xl 
                group-hover:border-primary-300/30 transition-all duration-500 pointer-events-none"></div>
  </article>
</template>

<script setup lang="ts">
import type { ProjectCard } from '@/types/portfolio'

defineProps<{
  project: ProjectCard
}>()

// Dynamic tag colors based on position for visual variety
const tagColors = [
  'bg-primary-50 text-primary-700 border-primary-200',
  'bg-orange-50 text-orange-700 border-orange-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-purple-50 text-purple-700 border-purple-200',
]

const getTagColor = (index: number) => tagColors[index % tagColors.length]
</script>

<style scoped>
/* Card base with theme support */
.project-card {
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-color: var(--border-primary, rgba(249, 115, 22, 0.1));
}

.project-card:hover {
  border-color: var(--accent-200, rgba(249, 115, 22, 0.3));
}

:root.dark .project-card {
  background: var(--bg-card, rgba(18, 18, 26, 0.95));
}

/* Title */
.project-card h3 {
  color: var(--text-primary);
}

/* Description */
.project-card p {
  color: var(--text-secondary);
}

/* Line clamp for description */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tooltip animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group-hover\/link\:opacity-100 {
  animation: fadeInUp 0.3s ease-out forwards;
}

/* Hover glow effect */
.group:hover .project-card {
  box-shadow: 0 20px 60px -15px rgba(249, 115, 22, 0.15);
}

:root.dark .group:hover .project-card {
  box-shadow: 0 20px 60px -15px rgba(249, 115, 22, 0.25);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: none;
  }
}
</style>