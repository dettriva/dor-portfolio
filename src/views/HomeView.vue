<template>
  <main class="home-page" role="main" aria-label="Página principal del portafolio">
    
    <!-- ==================== HERO SECTION ==================== -->
    <section 
      class="hero-section"
      aria-labelledby="hero-title"
    >
      <!-- Header con badge -->
      <div class="section-header">
        <div class="header-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">PORTAFOLIO</span>
        </div>
        <div class="header-line"></div>
      </div>

      <!-- Contenido del Hero -->
      <div class="hero-grid">
        <!-- Columna izquierda: Información -->
        <div class="hero-content">
          <p class="hero-greeting">{{ t('home.greeting') || 'Hola, soy' }}</p>
          
          <h1 id="hero-title" class="hero-title">
            {{ cv.name || 'Tu Nombre' }}
            <span class="title-underline"></span>
          </h1>
          
          <p class="hero-role">{{ cv.title || 'Full Stack Developer' }}</p>
          
          <p class="hero-description">
            {{ t('home.subheadline') || 'Desarrollo aplicaciones web modernas, accesibles y de alto rendimiento. Especializado en crear experiencias digitales excepcionales.' }}
          </p>

          <!-- Stats pills -->
          <div class="hero-stats">
            <div class="stat-pill">
              <i class="pi pi-star-fill" aria-hidden="true"></i>
              <span>{{ projectsCount }}+ proyectos</span>
            </div>
            <div class="stat-pill">
              <i class="pi pi-clock" aria-hidden="true"></i>
              <span>{{ yearsExperience }} años experiencia</span>
            </div>
            <div class="stat-pill stat-pill-success">
              <i class="pi pi-check-circle" aria-hidden="true"></i>
              <span>Disponible</span>
            </div>
          </div>

          <!-- Tech stack -->
          <div class="hero-tech">
            <span class="tech-label">Stack principal:</span>
            <div class="tech-list">
              <span 
                v-for="tech in mainTechs" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-actions">
            <button 
              @click="navigateTo('/proyectos')"
              class="btn btn-primary"
              aria-label="Ver mis proyectos"
            >
              <i class="pi pi-folder-open" aria-hidden="true"></i>
              <span>{{ t('home.ctaProjects') || 'Ver Proyectos' }}</span>
              <i class="pi pi-arrow-right btn-arrow" aria-hidden="true"></i>
            </button>
            
            <button 
              @click="navigateTo('/contacto')"
              class="btn btn-secondary"
              aria-label="Contactar conmigo"
            >
              <i class="pi pi-send" aria-hidden="true"></i>
              <span>{{ t('home.ctaContact') || 'Contactar' }}</span>
            </button>
          </div>
        </div>

        <!-- Columna derecha: Card de perfil -->
        <div class="hero-visual">
          <div class="profile-card">
            <!-- Header del card -->
            <div class="profile-header">
              <div class="profile-avatar">
                <span class="avatar-initials">{{ getInitials() }}</span>
                <span class="avatar-status" aria-label="Disponible"></span>
              </div>
              <div class="profile-info">
                <span class="profile-name">{{ cv.name || 'Tu Nombre' }}</span>
                <span class="profile-role">{{ cv.title || 'Full Stack' }}</span>
              </div>
            </div>

            <!-- Stats grid -->
            <div class="profile-stats">
              <div class="profile-stat">
                <div class="stat-icon">
                  <i class="pi pi-calendar" aria-hidden="true"></i>
                </div>
                <div class="stat-data">
                  <span class="stat-value">{{ yearsExperience }}+</span>
                  <span class="stat-label">Años Exp.</span>
                </div>
              </div>

              <div class="profile-stat">
                <div class="stat-icon">
                  <i class="pi pi-code" aria-hidden="true"></i>
                </div>
                <div class="stat-data">
                  <span class="stat-value">{{ projectsCount }}+</span>
                  <span class="stat-label">Proyectos</span>
                </div>
              </div>

              <div class="profile-stat">
                <div class="stat-icon">
                  <i class="pi pi-star" aria-hidden="true"></i>
                </div>
                <div class="stat-data">
                  <span class="stat-value">{{ clientsCount }}+</span>
                  <span class="stat-label">Clientes</span>
                </div>
              </div>

              <div class="profile-stat">
                <div class="stat-icon">
                  <i class="pi pi-heart" aria-hidden="true"></i>
                </div>
                <div class="stat-data">
                  <span class="stat-value stat-value-accent">100%</span>
                  <span class="stat-label">Dedicación</span>
                </div>
              </div>
            </div>

            <!-- Code snippet decorativo -->
            <div class="profile-code" aria-hidden="true">
              <code>
                <span class="code-keyword">const</span> 
                <span class="code-var">developer</span> = {
                <br>&nbsp;&nbsp;passion: <span class="code-string">"∞"</span>,
                <br>&nbsp;&nbsp;coffee: <span class="code-string">"☕️"</span>
                <br>};
              </code>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <button 
        class="scroll-indicator"
        @click="scrollToSection('features')"
        aria-label="Ver más contenido"
      >
        <span class="scroll-text">Explorar más</span>
        <i class="pi pi-chevron-down" aria-hidden="true"></i>
      </button>
    </section>

    <!-- ==================== FEATURES SECTION ==================== -->
    <section 
      id="features"
      class="features-section"
      aria-labelledby="features-title"
    >
      <!-- Header -->
      <div class="section-header">
        <div class="header-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">CARACTERÍSTICAS</span>
        </div>
        <div class="header-line"></div>
      </div>

      <h2 id="features-title" class="section-title">
        ¿Por qué este portafolio?
        <span class="title-underline"></span>
      </h2>
      
      <p class="section-description">
        Una aplicación moderna construida con las mejores tecnologías del desarrollo web actual.
      </p>

      <!-- Stats pills -->
      <div class="section-stats">
        <div class="stat-pill">
          <i class="pi pi-star-fill" aria-hidden="true"></i>
          <span>Tecnología moderna</span>
        </div>
        <div class="stat-pill">
          <i class="pi pi-clock" aria-hidden="true"></i>
          <span>Alto rendimiento</span>
        </div>
        <div class="stat-pill">
          <i class="pi pi-check-circle" aria-hidden="true"></i>
          <span>100% responsive</span>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <!-- Feature 1: SPA -->
        <article class="feature-card feature-card-orange">
          <div class="feature-card-bg"></div>
          <div class="feature-card-content">
            <div class="feature-icon">
              <i class="pi pi-compass" aria-hidden="true"></i>
            </div>
            
            <span class="feature-category">ARQUITECTURA</span>
            <h3 class="feature-title">Aplicación SPA</h3>
            <p class="feature-description">
              Navegación fluida sin recargas con Vue Router y arquitectura modular de componentes.
            </p>
            
            <div class="feature-tags">
              <span class="feature-tag">Vue 3</span>
              <span class="feature-tag">Vue Router</span>
              <span class="feature-tag">TypeScript</span>
            </div>
          </div>
        </article>

        <!-- Feature 2: Datos -->
        <article class="feature-card feature-card-blue">
          <div class="feature-card-bg"></div>
          <div class="feature-card-content">
            <div class="feature-icon">
              <i class="pi pi-database" aria-hidden="true"></i>
            </div>
            
            <span class="feature-category">DATOS</span>
            <h3 class="feature-title">Contenido Dinámico</h3>
            <p class="feature-description">
              CV en JSON y sistema de traducciones i18n para fácil mantenimiento y escalabilidad.
            </p>
            
            <div class="feature-tags">
              <span class="feature-tag">JSON</span>
              <span class="feature-tag">Vue i18n</span>
              <span class="feature-tag">Reactivity</span>
            </div>
          </div>
        </article>

        <!-- Feature 3: Diseño -->
        <article class="feature-card feature-card-purple">
          <div class="feature-card-bg"></div>
          <div class="feature-card-content">
            <div class="feature-icon">
              <i class="pi pi-palette" aria-hidden="true"></i>
            </div>
            
            <span class="feature-category">UI/UX</span>
            <h3 class="feature-title">Diseño Moderno</h3>
            <p class="feature-description">
              Interfaz elegante con Tailwind CSS, animaciones fluidas y diseño 100% responsive.
            </p>
            
            <div class="feature-tags">
              <span class="feature-tag">Tailwind</span>
              <span class="feature-tag">PrimeVue</span>
              <span class="feature-tag">CSS3</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Quick Features -->
      <div class="quick-features">
        <div class="quick-feature">
          <div class="qf-icon">
            <i class="pi pi-mobile" aria-hidden="true"></i>
          </div>
          <div class="qf-content">
            <span class="qf-title">Responsive</span>
            <span class="qf-text">Todos los dispositivos</span>
          </div>
        </div>

        <div class="quick-feature">
          <div class="qf-icon">
            <i class="pi pi-bolt" aria-hidden="true"></i>
          </div>
          <div class="qf-content">
            <span class="qf-title">Rápido</span>
            <span class="qf-text">Optimizado</span>
          </div>
        </div>

        <div class="quick-feature">
          <div class="qf-icon">
            <i class="pi pi-code" aria-hidden="true"></i>
          </div>
          <div class="qf-content">
            <span class="qf-title">Limpio</span>
            <span class="qf-text">Código modular</span>
          </div>
        </div>

        <div class="quick-feature">
          <div class="qf-icon">
            <i class="pi pi-eye" aria-hidden="true"></i>
          </div>
          <div class="qf-content">
            <span class="qf-title">Accesible</span>
            <span class="qf-text">WCAG 2.1</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== CTA SECTION ==================== -->
    <section 
      class="cta-section"
      aria-labelledby="cta-title"
      @mousemove="handleMouseMove" 
      @mouseleave="handleMouseLeave"
    >
      <!-- Fondo con gradiente animado -->
      <div class="cta-bg-gradient"></div>
      
      <!-- Patrón de puntos -->
      <div class="cta-pattern"></div>
      
      <!-- Elementos decorativos flotantes -->
      <div class="floating-elements" aria-hidden="true">
        <div class="floating-icon floating-1">
          <i class="pi pi-code"></i>
        </div>
        <div class="floating-icon floating-2">
          <i class="pi pi-bolt"></i>
        </div>
        <div class="floating-icon floating-3">
          <i class="pi pi-star"></i>
        </div>
        <div class="floating-icon floating-4">
          <i class="pi pi-heart"></i>
        </div>
        <div class="floating-icon floating-5">
          <i class="pi pi-sparkles"></i>
        </div>
        
        <!-- Formas geométricas -->
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
      
      <!-- Contenido principal -->
      <div class="cta-content" :style="cardStyle">
        <!-- Badge superior -->
        <div class="cta-badge">
          <span class="cta-badge-dot"></span>
          Disponible para proyectos
        </div>
        
        <!-- Icono principal con animación -->
        <div class="cta-icon-wrapper">
          <div class="cta-icon-bg"></div>
          <div class="cta-icon">
            <i class="pi pi-comments"></i>
          </div>
          <div class="cta-icon-ring"></div>
        </div>
        
        <!-- Texto -->
        <h2 id="cta-title" class="cta-title">¿Tienes un proyecto en mente?</h2>
        <p class="cta-text">
          Me encantaría ayudarte a convertir tu idea en realidad. 
          Hablemos sobre cómo puedo contribuir a tu próximo proyecto.
        </p>
        
        <!-- Botones -->
        <div class="cta-buttons">
          <button 
            @click="navigateTo('/contacto')" 
            class="cta-button-primary"
          >
            <span>Iniciar conversación</span>
            <i class="pi pi-arrow-right"></i>
          </button>
          <a href="mailto:danieledtt06@gmail.com" class="cta-button-secondary">
            <i class="pi pi-envelope"></i>
            <span>Email directo</span>
          </a>
        </div>
        
        <!-- Stats mini -->
        <div class="cta-stats">
          <div class="cta-stat-item">
            <span class="cta-stat-number">24h</span>
            <span class="cta-stat-label">Respuesta</span>
          </div>
          <div class="cta-stat-divider"></div>
          <div class="cta-stat-item">
            <span class="cta-stat-number">10+</span>
            <span class="cta-stat-label">Proyectos</span>
          </div>
          <div class="cta-stat-divider"></div>
          <div class="cta-stat-item">
            <span class="cta-stat-number">100%</span>
            <span class="cta-stat-label">Dedicación</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { throttle } from '@/utils/throttle'
import cvRaw from '@/data/cv.json'

const router = useRouter()
const { t } = useI18n()

// CV data - single source of truth
const cv = computed(() => cvRaw)

// Computed stats from CV data for consistency
const yearsExperience = computed(() => {
  // Calculate from CV experience or use default
  return cv.value.experience?.length ? 2 : 1
})

const projectsCount = computed(() => {
  // Could be derived from a projects array in cv.json
  return 10
})

const clientsCount = computed(() => {
  return cv.value.experience?.length || 2
})

// Main technologies (could also come from cv.json)
const mainTechs = ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js']

// Get initials from name
const getInitials = () => {
  const name = cv.value.name || 'Dev'
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

// Navigation helper
const navigateTo = (path: string) => {
  router.push(path)
}

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// CTA parallax effect state
const mouseX = ref(0)
const mouseY = ref(0)

// Throttled mouse handler for performance (~60fps)
const handleMouseMove = throttle((e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  mouseX.value = x * 10
  mouseY.value = y * 10
}, 16)

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const cardStyle = computed(() => ({
  transform: `translateX(${mouseX.value}px) translateY(${mouseY.value}px)`
}))
</script>

<style scoped>
/* ==================== BASE STYLES ==================== */
.home-page {
  animation: pageEnter 0.6s ease-out;
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ==================== SECTION HEADER ==================== */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent-50);
  border: 1px solid var(--accent-200);
  border-radius: 100px;
  transition: all 0.3s ease;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-500);
  border-radius: 50%;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--accent-600);
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-500) 0%, transparent 100%);
  border-radius: 1px;
  max-width: 60px;
}

/* ==================== SECTION TITLE ==================== */
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.title-underline {
  display: block;
  width: 80px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
  margin-top: 0.75rem;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

/* ==================== STAT PILLS ==================== */
.hero-stats,
.section-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--accent-50);
  border: 1px solid var(--accent-200);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent-600);
  transition: all 0.3s ease;
}

.stat-pill:hover {
  background: var(--accent-100);
  transform: translateY(-2px);
}

.stat-pill i { font-size: 0.875rem; }

.stat-pill-success {
  background: var(--success-light);
  border-color: var(--success);
  color: var(--success);
}

/* ==================== HERO SECTION ==================== */
.hero-section {
  padding: 2rem 0 4rem;
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
  }
}

.hero-content { display: flex; flex-direction: column; }

.hero-greeting {
  font-size: 1rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.hero-role {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: var(--accent-500);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 540px;
  transition: color 0.3s ease;
}

/* Tech Stack */
.hero-tech {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tech-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

.tech-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.tech-tag {
  padding: 0.375rem 0.875rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 100px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  border-color: var(--accent-500);
  color: var(--accent-500);
  transform: translateY(-1px);
}

/* Hero Actions */
.hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.45);
}

.btn-primary .btn-arrow { transition: transform 0.3s ease; }
.btn-primary:hover .btn-arrow { transform: translateX(3px); }

.btn-secondary {
  background: var(--bg-card);
  color: var(--accent-500);
  border: 2px solid var(--accent-500);
}

.btn-secondary:hover {
  background: var(--accent-50);
  transform: translateY(-2px);
}

.btn:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 2px;
}

/* ==================== PROFILE CARD ==================== */
.hero-visual { display: flex; justify-content: center; }

.profile-card {
  width: 100%;
  max-width: 380px;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-secondary);
}

.profile-avatar {
  position: relative;
  width: 56px;
  height: 56px;
  background: var(--gradient-primary);
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-initials { font-size: 1.25rem; font-weight: 700; color: white; }

.avatar-status {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  background: var(--success);
  border: 3px solid var(--bg-card);
  border-radius: 50%;
}

.profile-info { display: flex; flex-direction: column; min-width: 0; }

.profile-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.profile-role {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

/* Profile Stats */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.profile-stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.profile-stat:hover { background: var(--accent-50); }

.stat-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-icon i {
  font-size: 1rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.stat-data { display: flex; flex-direction: column; }

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.stat-value-accent { color: var(--accent-500); }

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

/* Profile Code - mantiene colores oscuros fijos */
.profile-code {
  background: #1e1e1e;
  border-radius: 0.75rem;
  padding: 1rem;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-keyword { color: #c586c0; }
.code-var { color: #9cdcfe; }
.code-string { color: #ce9178; }

/* ==================== SCROLL INDICATOR ==================== */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 3rem auto 0;
  padding: 0.75rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  border-color: var(--accent-500);
  transform: translateY(-2px);
}

.scroll-text {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

.scroll-indicator i {
  color: var(--accent-500);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

/* ==================== FEATURES SECTION ==================== */
.features-section {
  padding: 4rem 0;
  border-top: 1px solid var(--border-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }

/* Feature Card - mantiene gradientes coloridos para ambos temas */
.feature-card {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.feature-card:hover { transform: translateY(-6px); }

.feature-card-bg {
  position: absolute;
  inset: 0;
  opacity: 0.95;
}

.feature-card-orange .feature-card-bg {
  background: linear-gradient(145deg, #fef3c7 0%, #fdba74 50%, #fb923c 100%);
}

.feature-card-blue .feature-card-bg {
  background: linear-gradient(145deg, #dbeafe 0%, #93c5fd 50%, #60a5fa 100%);
}

.feature-card-purple .feature-card-bg {
  background: linear-gradient(145deg, #ede9fe 0%, #c4b5fd 50%, #a78bfa 100%);
}

/* Ajustes para modo oscuro */
:root.dark .feature-card-bg { opacity: 0.85; }

.feature-card-content { position: relative; padding: 2rem; }

.feature-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
}

.feature-icon i { font-size: 1.5rem; color: #374151; }

.feature-category {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
}

.feature-description {
  font-size: 0.9375rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.feature-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.feature-tag {
  padding: 0.25rem 0.75rem;
  background: white;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

/* Quick Features */
.quick-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) { .quick-features { grid-template-columns: repeat(4, 1fr); } }

.quick-feature {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 0.875rem;
  transition: all 0.3s ease;
}

.quick-feature:hover {
  border-color: var(--accent-400);
  box-shadow: var(--shadow-glow);
}

.qf-icon {
  width: 44px;
  height: 44px;
  background: var(--gradient-primary);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.qf-icon i { font-size: 1rem; color: white; }

.qf-content { display: flex; flex-direction: column; min-width: 0; }

.qf-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.qf-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

/* ==================== CTA SECTION ==================== */
.cta-section {
  margin-top: 4rem;
  padding: 3.5rem;
  background: var(--bg-card);
  border-radius: 1.75rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.cta-bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 20%, var(--accent-100) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, var(--accent-200) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, var(--accent-50) 0%, transparent 70%);
  animation: gradientShift 8s ease-in-out infinite;
  opacity: 0.6;
}

:root.dark .cta-bg-gradient { opacity: 0.3; }

@keyframes gradientShift {
  0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.4; transform: scale(1.05) rotate(1deg); }
}

.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-300) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.15;
}

/* ==================== FLOATING ELEMENTS ==================== */
.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  width: 48px;
  height: 48px;
  background: var(--bg-card);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  animation: float 6s ease-in-out infinite;
}

.floating-icon i { font-size: 1.25rem; color: var(--accent-500); }

.floating-1 { top: 15%; left: 8%; animation-delay: 0s; }

.floating-2 { top: 20%; right: 12%; animation-delay: -1s; width: 40px; height: 40px; }
.floating-2 i { font-size: 1rem; color: var(--warning); }

.floating-3 { bottom: 25%; left: 5%; animation-delay: -2s; width: 36px; height: 36px; }
.floating-3 i { font-size: 0.875rem; color: var(--accent-400); }

.floating-4 { bottom: 20%; right: 8%; animation-delay: -3s; }
.floating-4 i { color: #f472b6; }

.floating-5 { top: 60%; right: 5%; animation-delay: -4s; width: 32px; height: 32px; }
.floating-5 i { font-size: 0.75rem; color: var(--warning); }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-12px) rotate(3deg); }
  75% { transform: translateY(8px) rotate(-3deg); }
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  animation: floatShape 10s ease-in-out infinite;
}

.shape-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--accent-100) 0%, var(--accent-200) 100%);
  top: -30px;
  right: 15%;
  animation-delay: -2s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-200) 0%, var(--accent-300) 100%);
  bottom: -20px;
  left: 10%;
  animation-delay: -4s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-100) 0%, var(--accent-400) 100%);
  top: 40%;
  left: -20px;
  animation-delay: -6s;
}

@keyframes floatShape {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -15px) scale(1.05); }
  66% { transform: translate(-5px, 10px) scale(0.95); }
}

/* ==================== CTA CONTENT ==================== */
.cta-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 480px;
  transition: transform 0.3s ease-out;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-overlay);
  backdrop-filter: blur(8px);
  border: 1px solid var(--accent-200);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-500);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.cta-badge-dot {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.cta-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.75rem;
}

.cta-icon-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-100) 0%, var(--accent-200) 100%);
  border-radius: 1.5rem;
  transform: rotate(-6deg);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-section:hover .cta-icon-bg { transform: rotate(6deg) scale(1.05); }

.cta-icon {
  position: absolute;
  inset: 0;
  background: var(--bg-card);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-section:hover .cta-icon { transform: scale(1.08); }

.cta-icon i { font-size: 2.5rem; color: var(--accent-500); }

.cta-icon-ring {
  position: absolute;
  inset: -8px;
  border: 2px dashed var(--accent-300);
  border-radius: 1.75rem;
  animation: spinRing 20s linear infinite;
}

@keyframes spinRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.875rem 0;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.cta-text {
  font-size: 1rem;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin: 0 0 2rem 0;
  transition: color 0.3s ease;
}

/* ==================== CTA BUTTONS ==================== */
.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  align-items: center;
  margin-bottom: 2rem;
}

@media (min-width: 480px) { .cta-buttons { flex-direction: row; justify-content: center; } }

.cta-button-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 1.75rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--shadow-glow);
  position: relative;
  overflow: hidden;
}

.cta-button-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-500) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-button-primary:hover::before { opacity: 1; }
.cta-button-primary span, .cta-button-primary i { position: relative; z-index: 1; }

.cta-button-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.45);
}

.cta-button-primary i { font-size: 0.875rem; transition: transform 0.3s ease; }
.cta-button-primary:hover i { transform: translateX(4px); }

.cta-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 0.875rem;
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.cta-button-secondary:hover {
  border-color: var(--accent-500);
  color: var(--accent-500);
  background: var(--accent-50);
  transform: translateY(-2px);
}

.cta-button-secondary i { font-size: 1rem; }

/* ==================== CTA STATS ==================== */
.cta-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.25rem 2rem;
  background: var(--bg-overlay);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border: 1px solid var(--border-secondary);
}

.cta-stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

.cta-stat-number { font-size: 1.125rem; font-weight: 700; color: var(--accent-500); }

.cta-stat-label {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.cta-stat-divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, var(--border-primary), transparent);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .cta-section { padding: 2.5rem 1.5rem; min-height: auto; }
  .floating-icon { display: none; }
  .floating-shape { opacity: 0.2; }
  .cta-icon-wrapper { width: 80px; height: 80px; }
  .cta-icon i { font-size: 2rem; }
  .cta-title { font-size: 1.5rem; }
  .cta-stats { flex-wrap: wrap; gap: 1rem; padding: 1rem 1.25rem; }
  .cta-stat-divider { display: none; }
}

@media (max-width: 640px) {
  .hero-actions { flex-direction: column; }
  .btn { width: 100%; }
  .profile-stats { grid-template-columns: 1fr; }
  .scroll-indicator { display: none; }
  .quick-features { grid-template-columns: 1fr; }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 2px;
}
</style>