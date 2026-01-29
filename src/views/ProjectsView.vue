<template>
  <main class="projects-page" role="main">
    
    <!-- ==================== HEADER ==================== -->
    <PageHeader 
      title="Proyectos"
      subtitle="Una colección de mis trabajos más recientes e innovadores en desarrollo web y aplicaciones."
      category="Portafolio"
      :info="`${projects.length} proyectos • ${liveProjects} en producción`"
    />

    <!-- ==================== STATS CARDS ==================== -->
    <section class="stats-showcase" aria-label="Estadísticas de proyectos">
      <div 
        v-for="(stat, index) in projectStats" 
        :key="index"
        class="stat-card"
        :style="{ '--index': index, '--accent': stat.color }"
      >
        <div class="stat-card-icon">
          <i :class="stat.icon"></i>
        </div>
        <span class="stat-card-value">{{ stat.value }}</span>
        <span class="stat-card-label">{{ stat.label }}</span>
      </div>
    </section>

    <!-- ==================== FILTERS ==================== -->
    <section class="filters-wrapper" aria-label="Filtros de proyectos">
      <span class="filters-title">Explorar por categoría</span>
      <div class="filters-track">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          class="filter-pill"
          :class="{ 'filter-active': activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          <i :class="filter.icon"></i>
          <span>{{ filter.label }}</span>
          <span class="pill-count">{{ getFilterCount(filter.id) }}</span>
        </button>
      </div>
    </section>

    <!-- ==================== PROJECTS GRID ==================== -->
    <section class="projects-section" aria-labelledby="projects-title">
      <h2 id="projects-title" class="visually-hidden">Lista de proyectos</h2>
      
      <div class="projects-grid">
        <article 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="project-card"
          :style="{ '--index': index }"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <!-- Glow Effect -->
          <div class="card-glow" :style="{ '--glow-color': project.color }"></div>
          
          <!-- Card Inner -->
          <div class="card-inner">
            <!-- Visual Header -->
            <div class="project-visual" :style="{ '--gradient': project.gradient }">
              <!-- Animated Background -->
              <div class="visual-bg">
                <div class="visual-gradient"></div>
                <div class="visual-pattern"></div>
                <div class="visual-orbs">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              
              <!-- Main Icon -->
              <div class="visual-icon-wrapper">
                <div class="visual-icon">
                  <i :class="project.icon"></i>
                </div>
                <div class="icon-ring"></div>
                <div class="icon-particles">
                  <span v-for="n in 4" :key="n"></span>
                </div>
              </div>
              
              <!-- Status Badge -->
              <div class="project-status" :class="`status-${project.status}`">
                <span v-if="project.status === 'live'" class="status-dot"></span>
                <i v-else-if="project.status === 'private'" class="pi pi-lock"></i>
                <i v-else-if="project.status === 'wip'" class="pi pi-wrench"></i>
                <span>{{ getStatusText(project.status) }}</span>
              </div>
              
              <!-- Year Badge -->
              <div class="project-year">
                {{ project.year }}
              </div>
            </div>
            
            <!-- Content Body -->
            <div class="project-body">
              <!-- Category -->
              <div class="project-category">
                <span class="category-dot" :style="{ background: project.color }"></span>
                {{ project.category }}
              </div>
              
              <!-- Title -->
              <h3 class="project-title">{{ project.title }}</h3>
              
              <!-- Description -->
              <p class="project-description">{{ project.description }}</p>
              
              <!-- Tech Stack -->
              <div class="project-stack">
                <span 
                  v-for="(tech, tIdx) in project.stack.slice(0, 4)" 
                  :key="tech"
                  class="stack-tag"
                  :style="{ '--tech-delay': `${tIdx * 0.05}s` }"
                >
                  {{ tech }}
                </span>
                <span v-if="project.stack.length > 4" class="stack-more">
                  +{{ project.stack.length - 4 }}
                </span>
              </div>
              
              <!-- Footer -->
              <div class="project-footer">
                <div class="project-meta">
                  <span class="meta-item">
                    <i class="pi pi-clock"></i>
                    {{ project.duration }}
                  </span>
                </div>
                
                <a 
                  v-if="project.link && project.status !== 'private'"
                  :href="project.link" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                >
                  <span>{{ project.linkText || 'Ver proyecto' }}</span>
                  <i class="pi pi-arrow-right"></i>
                </a>
                <span v-else-if="project.status === 'private'" class="project-link-disabled">
                  <i class="pi pi-lock"></i>
                  <span>Privado</span>
                </span>
              </div>
            </div>
          </div>
          
          <!-- Hover Border Effect -->
          <div class="card-border" :style="{ '--border-color': project.color }"></div>
        </article>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="pi pi-folder-open"></i>
        </div>
        <h3>No hay proyectos en esta categoría</h3>
        <p>Prueba seleccionando otro filtro</p>
        <button @click="activeFilter = 'all'" class="empty-btn">
          Ver todos los proyectos
        </button>
      </div>
    </section>

    <!-- ==================== FEATURED PROJECT ==================== -->
    <section v-if="featuredProject" class="featured-section" aria-labelledby="featured-title">
      <header class="section-header">
        <div class="header-badge">
          <i class="pi pi-star-fill"></i>
          <span>PROYECTO DESTACADO</span>
        </div>
        <div class="header-line"></div>
      </header>
      
      <article class="featured-card">
        <div class="featured-visual" :style="{ '--gradient': featuredProject.gradient }">
          <div class="featured-bg">
            <div class="featured-gradient"></div>
            <div class="featured-pattern"></div>
          </div>
          <div class="featured-icon">
            <i :class="featuredProject.icon"></i>
          </div>
          <div class="featured-particles">
            <span v-for="n in 6" :key="n" :style="getParticleStyle(n)"></span>
          </div>
        </div>
        
        <div class="featured-content">
          <div class="featured-badges">
            <span class="badge-category">{{ featuredProject.category }}</span>
            <span class="badge-status" :class="`status-${featuredProject.status}`">
              <span v-if="featuredProject.status === 'live'" class="status-dot"></span>
              {{ getStatusText(featuredProject.status) }}
            </span>
          </div>
          
          <h3 id="featured-title" class="featured-title">{{ featuredProject.title }}</h3>
          <p class="featured-description">{{ featuredProject.fullDescription || featuredProject.description }}</p>
          
          <div class="featured-stack">
            <span v-for="tech in featuredProject.stack" :key="tech" class="featured-tech">
              {{ tech }}
            </span>
          </div>
          
          <div class="featured-actions">
            <a 
              v-if="featuredProject.link"
              :href="featuredProject.link" 
              target="_blank"
              class="featured-btn-primary"
            >
              <span>Ver proyecto</span>
              <i class="pi pi-external-link"></i>
            </a>
            <a 
              v-if="featuredProject.github"
              :href="featuredProject.github" 
              target="_blank"
              class="featured-btn-secondary"
            >
              <i class="pi pi-github"></i>
              <span>Código fuente</span>
            </a>
          </div>
        </div>
      </article>
    </section>

    <!-- ==================== CTA SECTION ==================== -->
    <section class="cta-section" aria-labelledby="cta-title">
      <div class="cta-wrapper">
        <!-- Background -->
        <div class="cta-background">
          <div class="cta-gradient"></div>
          <div class="cta-orbs">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="cta-content">
          <div class="cta-badge">
            <span class="badge-dot"></span>
            Disponible para proyectos
          </div>
          
          <div class="cta-icon">
            <i class="pi pi-comments"></i>
            <div class="cta-icon-ring"></div>
          </div>
          
          <h3 id="cta-title" class="cta-title">¿Tienes un proyecto en mente?</h3>
          <p class="cta-text">
            Me encantaría ayudarte a convertir tu idea en realidad. 
            Hablemos sobre cómo puedo contribuir a tu próximo proyecto.
          </p>
          
          <div class="cta-buttons">
            <RouterLink to="/contacto" class="cta-btn-primary">
              <span>Iniciar conversación</span>
              <i class="pi pi-arrow-right"></i>
            </RouterLink>
            <a href="mailto:danieledtt06@gmail.com" class="cta-btn-secondary">
              <i class="pi pi-envelope"></i>
              <span>Email directo</span>
            </a>
          </div>
          
          <div class="cta-stats">
            <div class="cta-stat">
              <span class="cta-stat-value">24h</span>
              <span class="cta-stat-label">Respuesta</span>
            </div>
            <div class="cta-stat-divider"></div>
            <div class="cta-stat">
              <span class="cta-stat-value">{{ projects.length }}+</span>
              <span class="cta-stat-label">Proyectos</span>
            </div>
            <div class="cta-stat-divider"></div>
            <div class="cta-stat">
              <span class="cta-stat-value">100%</span>
              <span class="cta-stat-label">Dedicación</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'

// State
const activeFilter = ref('all')
const hoveredProject = ref<string | null>(null)

// Projects Data
const projects = ref([
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    category: 'E-commerce',
    categoryId: 'web',
    description: 'Plataforma de comercio electrónico completa con carrito de compras y pasarela de pago integrada.',
    fullDescription: 'Plataforma de comercio electrónico completa con carrito de compras, gestión de inventario, pasarela de pago integrada con Stripe, panel de administración y sistema de notificaciones.',
    icon: 'pi pi-shopping-cart',
    status: 'live',
    year: '2024',
    duration: '3 meses',
    stack: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
    link: '#',
    linkText: 'Ver tienda',
    featured: true
  },
  {
    id: 'dashboard',
    title: 'Sistema de Gestión',
    category: 'Dashboard',
    categoryId: 'dashboard',
    description: 'Sistema de gestión empresarial con dashboard interactivo y reportes en tiempo real.',
    icon: 'pi pi-chart-line',
    status: 'live',
    year: '2023',
    duration: '4 meses',
    stack: ['React', 'Express', 'MongoDB', 'Chart.js'],
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 50%, #fb923c 100%)',
    link: '#',
    linkText: 'Ver demo'
  },
  {
    id: 'mobile-app',
    title: 'App Móvil',
    category: 'Mobile App',
    categoryId: 'mobile',
    description: 'Aplicación móvil nativa para iOS y Android con funciones offline y notificaciones push.',
    icon: 'pi pi-mobile',
    status: 'live',
    year: '2024',
    duration: '5 meses',
    stack: ['React Native', 'Firebase', 'Redux', 'Expo'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)',
    link: '#',
    linkText: 'App Store'
  },
  {
    id: 'api-rest',
    title: 'API REST',
    category: 'Backend',
    categoryId: 'backend',
    description: 'API REST robusta con autenticación JWT, documentación Swagger y alta escalabilidad.',
    icon: 'pi pi-server',
    status: 'live',
    year: '2023',
    duration: '2 meses',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
    link: '#',
    linkText: 'Documentación',
    github: '#'
  },
  {
    id: 'analytics',
    title: 'Dashboard Analytics',
    category: 'Analytics',
    categoryId: 'dashboard',
    description: 'Dashboard de análisis de datos con gráficos interactivos y visualización en tiempo real.',
    icon: 'pi pi-chart-bar',
    status: 'private',
    year: '2024',
    duration: '3 meses',
    stack: ['D3.js', 'WebSockets', 'Redis', 'Node.js'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
    link: null
  },
  {
    id: 'landing',
    title: 'Landing Page',
    category: 'Marketing',
    categoryId: 'web',
    description: 'Landing page moderna y responsive con alto porcentaje de conversión y SEO optimizado.',
    icon: 'pi pi-globe',
    status: 'live',
    year: '2023',
    duration: '2 semanas',
    stack: ['Next.js', 'Tailwind', 'Vercel', 'Framer Motion'],
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
    link: '#',
    linkText: 'Visitar sitio'
  }
])

// Filters
const filters = [
  { id: 'all', label: 'Todos', icon: 'pi pi-th-large' },
  { id: 'web', label: 'Web', icon: 'pi pi-globe' },
  { id: 'mobile', label: 'Mobile', icon: 'pi pi-mobile' },
  { id: 'backend', label: 'Backend', icon: 'pi pi-server' },
  { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-chart-line' }
]

// Computed
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter(p => p.categoryId === activeFilter.value)
})

const liveProjects = computed(() => {
  return projects.value.filter(p => p.status === 'live').length
})

const featuredProject = computed(() => {
  return projects.value.find(p => p.featured)
})

const projectStats = computed(() => [
  { value: projects.value.length, label: 'Proyectos', icon: 'pi pi-folder', color: '#f97316' },
  { value: liveProjects.value, label: 'En producción', icon: 'pi pi-check-circle', color: '#10b981' },
  { value: '95%', label: 'Satisfacción', icon: 'pi pi-heart-fill', color: '#ec4899' },
  { value: '2+', label: 'Años exp.', icon: 'pi pi-clock', color: '#6366f1' }
])

// Methods
const getFilterCount = (filterId: string) => {
  if (filterId === 'all') return projects.value.length
  return projects.value.filter(p => p.categoryId === filterId).length
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    'live': 'Live',
    'private': 'Privado',
    'wip': 'En desarrollo'
  }
  return map[status] || status
}

const particleConfigs = [
  { x: 10, y: 20, size: 4, duration: 3 },
  { x: 85, y: 15, size: 6, duration: 4 },
  { x: 75, y: 70, size: 3, duration: 3.5 },
  { x: 20, y: 80, size: 5, duration: 4.5 },
  { x: 50, y: 30, size: 4, duration: 3 },
  { x: 90, y: 50, size: 3, duration: 3.5 }
]

const getParticleStyle = (n: number) => {
  const config = particleConfigs[(n - 1) % particleConfigs.length]
  return {
    left: `${config.x}%`,
    top: `${config.y}%`,
    width: `${config.size}px`,
    height: `${config.size}px`,
    animationDuration: `${config.duration}s`,
    animationDelay: `${(n - 1) * 0.5}s`
  }
}
</script>

<style scoped>
/* ==================== BASE ==================== */
.projects-page {
  animation: pageEnter 0.6s ease-out;
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ==================== STATS SHOWCASE ==================== */
.stats-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .stats-showcase {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  text-align: center;
  animation: statEnter 0.5s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s);
  transition: all 0.3s ease;
}

@keyframes statEnter {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

:root.dark .stat-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.stat-card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border-radius: 0.875rem;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-card-icon {
  transform: scale(1.1);
  background: var(--accent);
}

.stat-card-icon i {
  font-size: 1.25rem;
  color: var(--accent);
  transition: color 0.3s ease;
}

.stat-card:hover .stat-card-icon i {
  color: white;
}

.stat-card-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.stat-card-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ==================== FILTERS ==================== */
.filters-wrapper {
  margin-bottom: 2.5rem;
}

.filters-title {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filters-track {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.125rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-pill:hover {
  border-color: var(--accent-300);
  color: var(--accent-500);
  background: var(--bg-secondary);
}

.filter-pill.filter-active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.filter-pill i {
  font-size: 0.875rem;
}

.pill-count {
  padding: 0.125rem 0.5rem;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  font-size: 0.6875rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

:root.dark .pill-count {
  background: rgba(255, 255, 255, 0.1);
}

.filter-active .pill-count {
  background: rgba(255, 255, 255, 0.25);
}

/* ==================== PROJECTS GRID ==================== */
.projects-section {
  margin-bottom: 4rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ==================== PROJECT CARD ==================== */
.project-card {
  position: relative;
  animation: cardEnter 0.5s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: var(--glow-color);
  border-radius: 1.5rem;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.project-card:hover .card-glow {
  opacity: 0.3;
}

.card-inner {
  position: relative;
  background: var(--bg-card);
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--border-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .card-inner {
  transform: translateY(-8px);
  border-color: transparent;
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  padding: 2px;
  background: linear-gradient(135deg, transparent 30%, var(--border-color) 50%, transparent 70%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover .card-border {
  opacity: 1;
}

/* ==================== PROJECT VISUAL ==================== */
.project-visual {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.visual-bg {
  position: absolute;
  inset: 0;
}

.visual-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient);
  transition: transform 0.6s ease;
}

.project-card:hover .visual-gradient {
  transform: scale(1.1);
}

:root.dark .visual-gradient {
  opacity: 0.6;
}

.visual-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0.5;
}

:root.dark .visual-pattern {
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0);
}

.visual-orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.visual-orbs span {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: orbFloat 6s ease-in-out infinite;
}

.visual-orbs span:nth-child(1) {
  width: 60px;
  height: 60px;
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.visual-orbs span:nth-child(2) {
  width: 40px;
  height: 40px;
  bottom: 20px;
  left: -10px;
  animation-delay: -2s;
}

.visual-orbs span:nth-child(3) {
  width: 30px;
  height: 30px;
  top: 50%;
  right: 20%;
  animation-delay: -4s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -10px) scale(1.1); }
}

/* Visual Icon */
.visual-icon-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.visual-icon {
  width: 72px;
  height: 72px;
  background: var(--bg-card);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover .visual-icon {
  transform: scale(1.15) rotate(5deg);
}

.visual-icon i {
  font-size: 1.75rem;
  color: var(--accent-500);
}

.icon-ring {
  position: absolute;
  inset: -6px;
  border: 2px dashed var(--accent-300);
  border-radius: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .icon-ring {
  opacity: 0.6;
  animation: iconRingSpin 10s linear infinite;
}

@keyframes iconRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.icon-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-500);
  border-radius: 50%;
  opacity: 0;
}

.project-card:hover .icon-particles span {
  animation: iconParticleBurst 0.6s ease-out forwards;
}

.icon-particles span:nth-child(1) { top: 0; left: 50%; --tx: 0; --ty: -20px; animation-delay: 0s; }
.icon-particles span:nth-child(2) { top: 50%; right: 0; --tx: 20px; --ty: 0; animation-delay: 0.1s; }
.icon-particles span:nth-child(3) { bottom: 0; left: 50%; --tx: 0; --ty: 20px; animation-delay: 0.2s; }
.icon-particles span:nth-child(4) { top: 50%; left: 0; --tx: -20px; --ty: 0; animation-delay: 0.3s; }

@keyframes iconParticleBurst {
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
}

/* Status Badge */
.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  background: var(--bg-card);
  border-radius: 100px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.project-card:hover .project-status {
  transform: translateY(-2px);
}

.status-live {
  color: #10b981;
}

.status-private {
  color: var(--text-muted);
}

.status-wip {
  color: #f59e0b;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.project-status i {
  font-size: 0.625rem;
}

/* Year Badge */
.project-year {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.375rem 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: white;
}

/* ==================== PROJECT BODY ==================== */
.project-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-category {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: 0.625rem;
}

.category-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: var(--accent-500);
}

.project-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1.25rem;
  flex: 1;
  transition: color 0.3s ease;
}

/* Tech Stack */
.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.stack-tag {
  padding: 0.375rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  animation: stackEnter 0.3s ease-out backwards;
  animation-delay: var(--tech-delay);
}

@keyframes stackEnter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
}

:root.dark .stack-tag {
  background: var(--bg-tertiary);
}

.stack-tag:hover {
  background: var(--accent-100);
  border-color: var(--accent-300);
  color: var(--accent-600);
  transform: translateY(-2px);
}

:root.dark .stack-tag:hover {
  background: var(--accent-900);
  border-color: var(--accent-600);
  color: var(--accent-400);
}

.stack-more {
  padding: 0.375rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* Project Footer */
.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-secondary);
  margin-top: auto;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.meta-item i {
  font-size: 0.75rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-500);
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-link:hover {
  color: var(--accent-600);
}

:root.dark .project-link:hover {
  color: var(--accent-400);
}

.project-link i {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.project-link:hover i {
  transform: translateX(4px);
}

.project-link-disabled {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.project-link-disabled i {
  font-size: 0.625rem;
}

/* ==================== EMPTY STATE ==================== */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.empty-icon i {
  font-size: 2rem;
  color: var(--text-muted);
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.empty-state p {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin: 0 0 1.5rem;
}

.empty-btn {
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* ==================== FEATURED SECTION ==================== */
.featured-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent-100);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--accent-600);
}

:root.dark .header-badge {
  background: rgba(249, 115, 22, 0.15);
  color: var(--accent-400);
}

.header-badge i {
  font-size: 0.875rem;
  color: var(--accent-500);
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-500), transparent);
  border-radius: 1px;
  max-width: 100px;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.4s ease;
}

@media (min-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr 1.2fr;
  }
}

.featured-card:hover {
  border-color: var(--accent-300);
  box-shadow: 0 20px 60px rgba(249, 115, 22, 0.15);
}

:root.dark .featured-card:hover {
  border-color: var(--accent-600);
  box-shadow: 0 20px 60px rgba(249, 115, 22, 0.2);
}

.featured-visual {
  position: relative;
  min-height: 250px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .featured-visual {
    min-height: 350px;
  }
}

.featured-bg {
  position: absolute;
  inset: 0;
}

.featured-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient);
  transition: transform 0.6s ease;
}

.featured-card:hover .featured-gradient {
  transform: scale(1.1);
}

:root.dark .featured-gradient {
  opacity: 0.6;
}

.featured-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0);
  background-size: 24px 24px;
}

.featured-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: var(--bg-card);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.featured-card:hover .featured-icon {
  transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
}

.featured-icon i {
  font-size: 2.5rem;
  color: var(--accent-500);
}

.featured-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.featured-particles span {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat 4s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
}

.featured-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .featured-content {
    padding: 2.5rem;
  }
}

.featured-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.badge-category {
  padding: 0.375rem 0.875rem;
  background: var(--accent-100);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-600);
}

:root.dark .badge-category {
  background: rgba(249, 115, 22, 0.15);
  color: var(--accent-400);
}

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
}

.featured-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 1rem;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .featured-title {
    font-size: 2rem;
  }
}

.featured-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 1.5rem;
  flex: 1;
}

.featured-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.featured-tech {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

:root.dark .featured-tech {
  background: var(--bg-tertiary);
}

.featured-tech:hover {
  border-color: var(--accent-300);
  color: var(--accent-500);
}

.featured-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.featured-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.featured-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
}

.featured-btn-primary i {
  font-size: 0.875rem;
}

.featured-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.featured-btn-secondary:hover {
  border-color: var(--accent-300);
  color: var(--accent-500);
}

.featured-btn-secondary i {
  font-size: 1.125rem;
}

/* ==================== CTA SECTION ==================== */
.cta-section {
  margin-bottom: 2rem;
}

.cta-wrapper {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
}

.cta-orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.cta-orbs span {
  position: absolute;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.15);
  animation: ctaOrbFloat 8s ease-in-out infinite;
}

.cta-orbs span:nth-child(1) {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -50px;
  animation-delay: 0s;
}

.cta-orbs span:nth-child(2) {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  animation-delay: -3s;
}

.cta-orbs span:nth-child(3) {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 30%;
  animation-delay: -5s;
}

@keyframes ctaOrbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.1); }
}

.cta-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
}

@media (min-width: 768px) {
  .cta-content {
    padding: 4rem 3rem;
  }
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.cta-icon {
  position: relative;
  width: 80px;
  height: 80px;
  background: var(--gradient-primary);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.cta-icon i {
  font-size: 2rem;
  color: white;
}

.cta-icon-ring {
  position: absolute;
  inset: -6px;
  border: 2px dashed rgba(249, 115, 22, 0.5);
  border-radius: 1.5rem;
  animation: ctaRingSpin 15s linear infinite;
}

@keyframes ctaRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.75rem;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 2rem;
  }
}

.cta-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 2rem;
  max-width: 480px;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 480px) {
  .cta-buttons {
    flex-direction: row;
  }
}

.cta-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 1.75rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.875rem;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
  transition: all 0.3s ease;
}

.cta-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
}

.cta-btn-primary i {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.cta-btn-primary:hover i {
  transform: translateX(4px);
}

.cta-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.875rem;
  transition: all 0.3s ease;
}

.cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.cta-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.cta-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.cta-stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent-400);
}

.cta-stat-label {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
}

.cta-stat-divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 640px) {
  .stats-bar {
    gap: 0.75rem;
  }
  
  .stat-chip {
    padding: 0.625rem 1rem;
  }
  
  .project-visual {
    height: 150px;
  }
  
  .visual-icon {
    width: 60px;
    height: 60px;
  }
  
  .visual-icon i {
    font-size: 1.5rem;
  }
  
  .cta-stats {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }
  
  .cta-stat-divider {
    display: none;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  .projects-page,
  .project-card,
  .stat-chip,
  .card-inner,
  .visual-gradient,
  .visual-icon,
  .featured-icon,
  .status-dot,
  .badge-dot,
  .icon-ring,
  .visual-orbs span,
  .cta-orbs span,
  .featured-particles span {
    animation: none !important;
    transition: none !important;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 3px;
}

.filter-btn:focus-visible,
.project-link:focus-visible,
.cta-btn-primary:focus-visible,
.cta-btn-secondary:focus-visible,
.featured-btn-primary:focus-visible,
.featured-btn-secondary:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 3px;
}
</style>