<template>
  <main class="experience-page" role="main">
    
    <!-- ==================== HEADER ==================== -->
    <PageHeader 
      :title="t('experience.title') || 'Mi Experiencia'"
      :subtitle="t('experience.subtitle') || 'Un recorrido por mi carrera profesional y formación académica'"
      category="Trayectoria"
      :info="`${cv.experience?.length || 0} posiciones • ${cv.education?.length || 0} títulos`"
    >
      <template #action>
        <button @click="downloadCV" class="download-btn">
          <i class="pi pi-download"></i>
          <span>{{ t('experience.download') || 'Descargar CV' }}</span>
        </button>
      </template>
    </PageHeader>

    <!-- ==================== JOURNEY STATS ==================== -->
    <section class="journey-stats" aria-label="Estadísticas de trayectoria">
      <div 
        v-for="(stat, index) in journeyStats" 
        :key="index"
        class="stat-card"
        :style="{ '--delay': `${index * 0.1}s` }"
      >
        <div class="stat-icon" :style="{ background: stat.gradient }">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-content">
          <span class="stat-number" :class="{ 'stat-active': stat.isActive }">
            <span v-if="stat.isActive" class="pulse-dot"></span>
            {{ stat.value }}
          </span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
        <div class="stat-decoration"></div>
      </div>
    </section>

    <!-- ==================== EXPERIENCE SECTION ==================== -->
    <section class="content-section" aria-labelledby="exp-title">
      <header class="section-header">
        <div class="section-icon-wrapper">
          <div class="section-icon">
            <i class="pi pi-briefcase"></i>
          </div>
          <div class="section-icon-ring"></div>
        </div>
        <div class="section-text">
          <h2 id="exp-title" class="section-title">Experiencia Profesional</h2>
          <p class="section-subtitle">Roles y responsabilidades que han definido mi carrera</p>
        </div>
        <div class="section-line"></div>
      </header>

      <!-- Experience Timeline -->
      <div class="exp-timeline">
        <div class="timeline-track" aria-hidden="true">
          <div class="track-progress" :style="{ height: `${timelineProgress}%` }"></div>
        </div>

        <article 
          v-for="(exp, index) in cv.experience" 
          :key="index"
          class="exp-card"
          :class="{ 'exp-card-current': index === 0 }"
          :style="{ '--index': index }"
        >
          <!-- Timeline Node -->
          <div class="timeline-node">
            <div class="node-dot" :class="{ 'node-current': index === 0 }"></div>
            <div class="node-pulse" v-if="index === 0"></div>
          </div>

          <!-- Card Content -->
          <div class="exp-content">
            <!-- Card Header -->
            <header class="exp-header">
              <div class="exp-period">
                <i class="pi pi-calendar"></i>
                <span>{{ exp.period }}</span>
                <span v-if="index === 0" class="current-badge">Actual</span>
              </div>
              <div class="exp-company-badge">
                <i class="pi pi-building"></i>
                <span>{{ exp.company }}</span>
              </div>
            </header>

            <!-- Title -->
            <h3 class="exp-title">{{ exp.title }}</h3>

            <!-- Achievements -->
            <div class="exp-achievements">
              <div 
                v-for="(bullet, idx) in exp.bullets?.slice(0, 4)" 
                :key="idx"
                class="achievement"
                :style="{ '--ach-delay': `${idx * 0.1}s` }"
              >
                <div class="achievement-marker">
                  <i class="pi pi-check"></i>
                </div>
                <p>{{ bullet }}</p>
              </div>
            </div>

            <!-- Technologies -->
            <footer class="exp-footer">
              <div class="exp-techs">
                <span 
                  v-for="(tech, tIdx) in exp.technologies?.slice(0, 5)" 
                  :key="tech"
                  class="tech-tag"
                  :style="{ '--tech-delay': `${tIdx * 0.05}s` }"
                >
                  {{ tech }}
                </span>
                <span v-if="exp.technologies?.length > 5" class="tech-more">
                  +{{ exp.technologies.length - 5 }}
                </span>
              </div>
            </footer>

            <!-- Decorative Elements -->
            <div class="exp-glow" aria-hidden="true"></div>
            <div class="exp-pattern" aria-hidden="true"></div>
          </div>
        </article>
      </div>
    </section>

    <!-- ==================== EDUCATION SECTION ==================== -->
    <section class="content-section education-section" aria-labelledby="edu-title">
      <header class="section-header">
        <div class="section-icon-wrapper section-icon-blue">
          <div class="section-icon">
            <i class="pi pi-graduation-cap"></i>
          </div>
          <div class="section-icon-ring"></div>
        </div>
        <div class="section-text">
          <h2 id="edu-title" class="section-title">Formación Académica</h2>
          <p class="section-subtitle">Base educativa que sustenta mis conocimientos</p>
        </div>
        <div class="section-line section-line-blue"></div>
      </header>

      <!-- Education Cards -->
      <div class="edu-grid">
        <article 
          v-for="(edu, index) in cv.education" 
          :key="index"
          class="edu-card"
          :style="{ '--index': index }"
        >
          <!-- Year Badge -->
          <div class="edu-year-wrapper">
            <span class="edu-year">{{ edu.period }}</span>
          </div>

          <!-- Content -->
          <div class="edu-content">
            <h3 class="edu-title">{{ edu.title }}</h3>
            
            <div class="edu-institution">
              <i class="pi pi-building"></i>
              <span>{{ edu.institution }}</span>
            </div>

            <!-- Details -->
            <ul v-if="edu.details && edu.details.length" class="edu-details">
              <li v-for="(detail, idx) in edu.details" :key="idx">
                <span class="detail-bullet"></span>
                {{ detail }}
              </li>
            </ul>

            <!-- Status -->
            <div v-if="edu.status" class="edu-status" :class="getStatusClass(edu.status)">
              <i :class="getStatusIcon(edu.status)"></i>
              <span>{{ edu.status }}</span>
            </div>
          </div>

          <!-- Decorative -->
          <div class="edu-decoration" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="80" cy="20" r="40" fill="currentColor" opacity="0.05"/>
              <circle cx="90" cy="30" r="20" fill="currentColor" opacity="0.08"/>
            </svg>
          </div>
        </article>
      </div>
    </section>

    <!-- ==================== SKILLS OVERVIEW ==================== -->
    <section class="skills-section" aria-labelledby="skills-title">
      <header class="skills-header">
        <div class="header-accent">
          <span class="accent-dot"></span>
          <span class="accent-text">COMPETENCIAS DESTACADAS</span>
          <span class="accent-line"></span>
        </div>
        <h2 id="skills-title" class="visually-hidden">Competencias clave</h2>
      </header>

      <div class="skills-showcase">
        <div 
          v-for="(skill, index) in keySkills" 
          :key="index"
          class="showcase-card"
          :style="{ '--index': index, '--color': skill.color }"
        >
          <div class="showcase-icon">
            <i :class="skill.icon"></i>
            <div class="icon-glow"></div>
          </div>
          
          <div class="showcase-info">
            <span class="showcase-name">{{ skill.name }}</span>
            <span class="showcase-level">{{ skill.level }}</span>
          </div>
          
          <div class="showcase-progress">
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: skill.percent + '%' }">
                <div class="progress-shine"></div>
              </div>
            </div>
            <span class="progress-value">{{ skill.percent }}%</span>
          </div>

          <div class="showcase-bg" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <!-- ==================== LINKS SECTION ==================== -->
    <section v-if="cv.links && cv.links.length" class="links-section" aria-labelledby="links-title">
      <header class="section-header">
        <div class="section-icon-wrapper section-icon-purple">
          <div class="section-icon">
            <i class="pi pi-link"></i>
          </div>
          <div class="section-icon-ring"></div>
        </div>
        <div class="section-text">
          <h2 id="links-title" class="section-title">Enlaces Relevantes</h2>
          <p class="section-subtitle">Recursos y perfiles profesionales</p>
        </div>
        <div class="section-line section-line-purple"></div>
      </header>

      <div class="links-grid">
        <a 
          v-for="(link, index) in cv.links" 
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-card"
          :style="{ '--index': index }"
        >
          <div class="link-icon">
            <i class="pi pi-external-link"></i>
          </div>
          <div class="link-content">
            <span class="link-name">{{ link.label }}</span>
            <span class="link-url">{{ link.description || link.url }}</span>
          </div>
          <div class="link-arrow">
            <i class="pi pi-arrow-up-right"></i>
          </div>
          <div class="link-hover-bg" aria-hidden="true"></div>
        </a>
      </div>
    </section>

    <!-- ==================== CTA SECTION ==================== -->
    <section class="cta-section" aria-labelledby="cta-title">
      <div class="cta-wrapper">
        <div class="cta-background" aria-hidden="true">
          <div class="cta-gradient"></div>
          <div class="cta-particles">
            <span v-for="n in 8" :key="n" :style="getCtaParticleStyle(n)"></span>
          </div>
        </div>

        <div class="cta-content">
          <div class="cta-icon">
            <i class="pi pi-file-pdf"></i>
            <div class="cta-icon-ring"></div>
          </div>
          
          <div class="cta-text">
            <h3 id="cta-title">¿Quieres saber más?</h3>
            <p>Descarga mi CV completo en PDF con todos los detalles de mi trayectoria profesional</p>
          </div>
          
          <button @click="downloadCV" class="cta-button">
          <i class="pi pi-download"></i>
          <span>Descargar CV Completo</span>
        </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/PageHeader.vue'
import cvRaw from '@/data/cv.json'

const { t } = useI18n()
const cv = computed(() => cvRaw)

// Timeline progress animation
const timelineProgress = ref(0)

onMounted(() => {
  setTimeout(() => {
    timelineProgress.value = 100
  }, 500)
})

// Calcular años totales de experiencia
const totalYears = computed(() => {
  return 2
})

// Journey stats data
const journeyStats = computed(() => [
  {
    value: `${totalYears.value}+`,
    label: 'Años de experiencia',
    icon: 'pi pi-clock',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    isActive: false
  },
  {
    value: cv.value.experience?.length || 0,
    label: 'Posiciones ocupadas',
    icon: 'pi pi-briefcase',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    isActive: false
  },
  {
    value: cv.value.education?.length || 0,
    label: 'Títulos obtenidos',
    icon: 'pi pi-graduation-cap',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    isActive: false
  },
  {
    value: 'Activo',
    label: 'Estado actual',
    icon: 'pi pi-check-circle',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    isActive: true
  }
])

// Skills destacadas
const keySkills = [
  { name: 'Frontend', level: 'Avanzado', percent: 90, icon: 'pi pi-desktop', color: '#f97316' },
  { name: 'Backend', level: 'Intermedio', percent: 75, icon: 'pi pi-server', color: '#3b82f6' },
  { name: 'Base de Datos', level: 'Intermedio', percent: 70, icon: 'pi pi-database', color: '#8b5cf6' },
  { name: 'DevOps', level: 'Básico', percent: 50, icon: 'pi pi-cloud', color: '#10b981' },
]

// Partículas del CTA
const ctaParticleConfigs = [
  { x: 10, y: 20, size: 4, duration: 4 },
  { x: 85, y: 15, size: 6, duration: 5 },
  { x: 75, y: 70, size: 3, duration: 3.5 },
  { x: 20, y: 80, size: 5, duration: 4.5 },
  { x: 50, y: 30, size: 4, duration: 4 },
  { x: 90, y: 50, size: 3, duration: 3 },
  { x: 30, y: 60, size: 5, duration: 5 },
  { x: 60, y: 85, size: 4, duration: 4.5 }
]

const getCtaParticleStyle = (n: number) => {
  const config = ctaParticleConfigs[(n - 1) % ctaParticleConfigs.length]
  return {
    left: `${config.x}%`,
    top: `${config.y}%`,
    width: `${config.size}px`,
    height: `${config.size}px`,
    animationDuration: `${config.duration}s`,
    animationDelay: `${(n - 1) * 0.3}s`
  }
}

// Función para descargar CV
const downloadCV = () => {
  const link = document.createElement('a')
  link.href = '/cv.pdf'
  link.download = `CV_${cv.value.name?.replace(/\s+/g, '_') || 'Portfolio'}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Clases para estados
const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'Completado': 'status-completed',
    'En curso': 'status-progress',
    'Pendiente': 'status-pending',
    'Certificado': 'status-certified',
  }
  return map[status] || 'status-default'
}

const getStatusIcon = (status: string) => {
  const map: Record<string, string> = {
    'Completado': 'pi pi-check-circle',
    'En curso': 'pi pi-spin pi-spinner',
    'Pendiente': 'pi pi-clock',
    'Certificado': 'pi pi-verified',
  }
  return map[status] || 'pi pi-info-circle'
}
</script>

<style scoped>
/* ==================== BASE & ANIMATIONS ==================== */
.experience-page {
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

/* ==================== DOWNLOAD BUTTON ==================== */
.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  border-radius: 0.875rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.45);
}

.download-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

/* ==================== JOURNEY STATS ==================== */
.journey-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .journey-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  text-align: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: statEnter 0.6s ease-out backwards;
  animation-delay: var(--delay);
}

@keyframes statEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}

.stat-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-300);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.15);
}

:root.dark .stat-card:hover {
  border-color: var(--accent-600);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.2);
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.stat-icon i {
  font-size: 1.5rem;
  color: white;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  transition: color 0.3s ease;
}

.stat-number.stat-active {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  color: #10b981;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { opacity: 0.8; transform: scale(1.1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: color 0.3s ease;
}

.stat-decoration {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--accent-100) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.5;
  pointer-events: none;
}

:root.dark .stat-decoration {
  background: radial-gradient(circle, var(--accent-900) 0%, transparent 70%);
}

/* ==================== SECTION HEADER ==================== */
.section-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.section-icon-wrapper {
  position: relative;
}

.section-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

:root.dark .section-icon {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.1));
}

.section-icon i {
  font-size: 1.75rem;
  color: var(--accent-500);
}

.section-icon-ring {
  position: absolute;
  inset: -4px;
  border: 2px dashed var(--accent-300);
  border-radius: 1.5rem;
  opacity: 0;
  animation: ringRotate 20s linear infinite;
  transition: opacity 0.3s ease;
}

.section-header:hover .section-icon-ring {
  opacity: 0.6;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.section-icon-blue .section-icon {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

:root.dark .section-icon-blue .section-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
}

.section-icon-blue .section-icon i {
  color: #3b82f6;
}

.section-icon-blue .section-icon-ring {
  border-color: rgba(59, 130, 246, 0.3);
}

.section-icon-purple .section-icon {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
}

:root.dark .section-icon-purple .section-icon {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
}

.section-icon-purple .section-icon i {
  color: #8b5cf6;
}

.section-icon-purple .section-icon-ring {
  border-color: rgba(139, 92, 246, 0.3);
}

.section-text {
  flex: 1;
  min-width: 200px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 1.75rem;
  }
}

.section-subtitle {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin: 0.375rem 0 0;
  transition: color 0.3s ease;
}

.section-line {
  flex: 1;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-500), transparent);
  border-radius: 2px;
  min-width: 60px;
  max-width: 120px;
}

.section-line-blue {
  background: linear-gradient(90deg, #3b82f6, transparent);
}

.section-line-purple {
  background: linear-gradient(90deg, #8b5cf6, transparent);
}

/* ==================== EXPERIENCE TIMELINE ==================== */
.content-section {
  margin-bottom: 5rem;
}

.exp-timeline {
  position: relative;
  padding-left: 3rem;
}

@media (min-width: 768px) {
  .exp-timeline {
    padding-left: 4rem;
  }
}

.timeline-track {
  position: absolute;
  left: 11px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--border-primary);
  border-radius: 2px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .timeline-track {
    left: 11px;
  }
}

.track-progress {
  width: 100%;
  background: linear-gradient(180deg, var(--accent-500), var(--accent-300));
  border-radius: 2px;
  transition: height 1.5s ease-out;
}

.exp-card {
  position: relative;
  margin-bottom: 2rem;
  animation: cardEnter 0.6s ease-out backwards;
  animation-delay: calc(var(--index) * 0.15s + 0.3s);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
}

.exp-card:last-child {
  margin-bottom: 0;
}

/* Timeline Node */
.timeline-node {
  position: absolute;
  left: -3rem;
  top: 2rem;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .timeline-node {
    left: -4rem;
  }
}

.node-dot {
  width: 26px;
  height: 26px;
  background: var(--bg-card);
  border: 4px solid var(--accent-400);
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s ease;
}

.node-dot.node-current {
  background: var(--accent-500);
  border-color: var(--accent-500);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
}

.exp-card:hover .node-dot {
  transform: scale(1.15);
  border-color: var(--accent-500);
}

.node-pulse {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 2px solid var(--accent-400);
  border-radius: 50%;
  animation: nodePulse 2s ease-out infinite;
}

@keyframes nodePulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

/* Experience Card Content */
.exp-content {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  .exp-content {
    padding: 2rem;
  }
}

.exp-card:hover .exp-content {
  border-color: var(--accent-300);
  box-shadow: 0 16px 48px rgba(249, 115, 22, 0.12);
  transform: translateX(8px);
}

:root.dark .exp-card:hover .exp-content {
  border-color: var(--accent-600);
  box-shadow: 0 16px 48px rgba(249, 115, 22, 0.2);
}

.exp-card-current .exp-content {
  background: linear-gradient(135deg, var(--accent-50), var(--bg-card));
  border-color: var(--accent-200);
}

:root.dark .exp-card-current .exp-content {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.08), var(--bg-card));
  border-color: var(--accent-700);
}

.exp-glow {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.exp-card:hover .exp-glow {
  opacity: 1;
}

.exp-pattern {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-200) 1px, transparent 0);
  background-size: 16px 16px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

:root.dark .exp-pattern {
  background-image: radial-gradient(circle at 2px 2px, var(--accent-800) 1px, transparent 0);
}

.exp-card:hover .exp-pattern {
  opacity: 0.5;
}

/* Card Header */
.exp-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.exp-period {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent-100);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent-600);
  transition: all 0.3s ease;
}

:root.dark .exp-period {
  background: rgba(249, 115, 22, 0.15);
  color: var(--accent-400);
}

.exp-period i {
  font-size: 0.75rem;
}

.current-badge {
  padding: 0.25rem 0.625rem;
  background: var(--gradient-primary);
  border-radius: 100px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.exp-company-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

:root.dark .exp-company-badge {
  background: var(--bg-tertiary);
}

.exp-company-badge i {
  font-size: 0.75rem;
  color: var(--accent-500);
}

.exp-title {
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 1.25rem;
  line-height: 1.3;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .exp-title {
    font-size: 1.5rem;
  }
}

/* Achievements */
.exp-achievements {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.achievement {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  animation: achievementEnter 0.4s ease-out backwards;
  animation-delay: calc(var(--ach-delay) + 0.4s);
}

@keyframes achievementEnter {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
}

.achievement-marker {
  width: 24px;
  height: 24px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.achievement-marker i {
  font-size: 0.625rem;
  color: white;
}

.achievement p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

/* Technologies Footer */
.exp-footer {
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-secondary);
}

.exp-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.375rem 0.875rem;
  background: var(--bg-card);
  border: 1px solid var(--accent-200);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-500);
  transition: all 0.3s ease;
  animation: techEnter 0.3s ease-out backwards;
  animation-delay: calc(var(--tech-delay) + 0.5s);
}

@keyframes techEnter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
}

:root.dark .tech-tag {
  background: var(--bg-tertiary);
  border-color: var(--accent-700);
}

.tech-tag:hover {
  background: var(--accent-500);
  border-color: var(--accent-500);
  color: white;
  transform: translateY(-2px);
}

.tech-more {
  padding: 0.375rem 0.875rem;
  background: var(--bg-secondary);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

:root.dark .tech-more {
  background: var(--bg-tertiary);
}

/* ==================== EDUCATION SECTION ==================== */
.education-section {
  background: var(--bg-secondary);
  margin-left: calc(-1 * var(--page-padding, 1rem));
  margin-right: calc(-1 * var(--page-padding, 1rem));
  padding: 3rem var(--page-padding, 1rem);
  border-radius: 2rem;
  transition: background 0.3s ease;
}

:root.dark .education-section {
  background: var(--bg-tertiary);
}

.edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .edu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.edu-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.75rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: eduEnter 0.5s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s + 0.2s);
}

@keyframes eduEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

.edu-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 12px 36px rgba(59, 130, 246, 0.12);
  transform: translateY(-6px);
}

:root.dark .edu-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 12px 36px rgba(59, 130, 246, 0.2);
}

.edu-year-wrapper {
  margin-bottom: 1rem;
}

.edu-year {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #1d4ed8;
  transition: all 0.3s ease;
}

:root.dark .edu-year {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(96, 165, 250, 0.15));
  color: #60a5fa;
}

.edu-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.625rem;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.edu-institution {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.edu-institution i {
  font-size: 0.875rem;
  color: #3b82f6;
}

.edu-details {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edu-details li {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  transition: color 0.3s ease;
}

.detail-bullet {
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.edu-status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-completed {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

:root.dark .status-completed {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-progress {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

:root.dark .status-progress {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.status-pending {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

:root.dark .status-pending {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.status-certified {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

:root.dark .status-certified {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}

.edu-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  color: #3b82f6;
  pointer-events: none;
}

/* ==================== SKILLS SHOWCASE ==================== */
.skills-section {
  margin-bottom: 5rem;
}

.skills-header {
  margin-bottom: 2rem;
}

.header-accent {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.accent-dot {
  width: 10px;
  height: 10px;
  background: var(--accent-500);
  border-radius: 50%;
  animation: accentPulse 2s ease-in-out infinite;
}

@keyframes accentPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.accent-text {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent-500);
}

.accent-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-500), transparent);
  border-radius: 1px;
}

.skills-showcase {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .skills-showcase {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .skills-showcase {
    grid-template-columns: repeat(4, 1fr);
  }
}

.showcase-card {
  position: relative;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: showcaseEnter 0.5s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes showcaseEnter {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
}

.showcase-card:hover {
  transform: translateY(-8px);
  border-color: var(--color);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
}

:root.dark .showcase-card:hover {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.showcase-icon {
  position: relative;
  width: 52px;
  height: 52px;
  background: var(--color);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  transition: transform 0.3s ease;
}

.showcase-card:hover .showcase-icon {
  transform: scale(1.1) rotate(5deg);
}

.showcase-icon i {
  font-size: 1.5rem;
  color: white;
}

.icon-glow {
  position: absolute;
  inset: -8px;
  background: var(--color);
  border-radius: 1.25rem;
  opacity: 0;
  filter: blur(12px);
  transition: opacity 0.3s ease;
}

.showcase-card:hover .icon-glow {
  opacity: 0.3;
}

.showcase-info {
  margin-bottom: 1rem;
}

.showcase-name {
  display: block;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.125rem;
  transition: color 0.3s ease;
}

.showcase-level {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

.showcase-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-track {
  flex: 1;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  transition: background 0.3s ease;
}

:root.dark .progress-track {
  background: var(--bg-tertiary);
}

.progress-fill {
  height: 100%;
  background: var(--color);
  border-radius: 4px;
  position: relative;
  transition: width 1s ease-out;
  overflow: hidden;
}

.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressShine 2s ease-in-out infinite;
}

@keyframes progressShine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.progress-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color);
  min-width: 40px;
  text-align: right;
}

.showcase-bg {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.showcase-card:hover .showcase-bg {
  opacity: 0.05;
}

/* ==================== LINKS SECTION ==================== */
.links-section {
  margin-bottom: 5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.link-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: linkEnter 0.4s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes linkEnter {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
}

.link-card:hover {
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.12);
}

:root.dark .link-card:hover {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
}

.link-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

:root.dark .link-icon {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(167, 139, 250, 0.15));
}

.link-card:hover .link-icon {
  transform: scale(1.1);
}

.link-icon i {
  font-size: 1.25rem;
  color: #8b5cf6;
}

.link-content {
  flex: 1;
  min-width: 0;
}

.link-name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.125rem;
  transition: color 0.3s ease;
}

.link-url {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.link-arrow {
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.link-card:hover .link-arrow {
  color: #8b5cf6;
  transform: translate(4px, -4px);
}

.link-hover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.link-card:hover .link-hover-bg {
  opacity: 1;
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
  z-index: 0;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
}

.cta-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.cta-particles span {
  position: absolute;
  background: rgba(249, 115, 22, 0.6);
  border-radius: 50%;
  animation: ctaFloat 4s ease-in-out infinite;
}

@keyframes ctaFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

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
  animation: ctaRing 3s ease-in-out infinite;
}

@keyframes ctaRing {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.cta-text {
  flex: 1;
}

.cta-text h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
}

.cta-text p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 400px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(249, 115, 22, 0.5);
}

.cta-button:active {
  transform: translateY(-1px);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 640px) {
  .exp-timeline {
    padding-left: 2.5rem;
  }
  
  .timeline-track {
    left: 9px;
  }
  
  .timeline-node {
    left: -2.5rem;
    width: 22px;
  }
  
  .node-dot {
    width: 22px;
    height: 22px;
  }
  
  .node-pulse {
    width: 22px;
    height: 22px;
  }
  
  .download-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .track-progress {
    transition: none;
    height: 100%;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 3px;
}

.link-card:focus-visible,
.download-btn:focus-visible,
.cta-button:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 3px;
}
</style>