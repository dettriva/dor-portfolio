<template>
  <div class="animate-fade-in">
    <!-- PageHeader -->
    <PageHeader 
      :title="t('about.title')" 
      :subtitle="t('about.subtitle')"
      category="Perfil"
      :info="headerInfo"
    />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      <!-- Hero Section con perfil -->
      <div class="hero-section mt-6">
        <!-- Fondo decorativo -->
        <div class="hero-bg"></div>
        <div class="hero-pattern"></div>
        
        <!-- Elementos flotantes -->
        <div class="hero-floating">
          <div class="floating-element el-1">
            <i class="pi pi-code"></i>
          </div>
          <div class="floating-element el-2">
            <i class="pi pi-heart"></i>
          </div>
          <div class="floating-element el-3">
            <i class="pi pi-star"></i>
          </div>
        </div>
        
        <div class="hero-content">
          <!-- Avatar -->
          <div class="hero-avatar-wrapper">
            <div class="avatar-glow"></div>
            <div class="avatar-ring"></div>
            <img
              :src="profileImg"
              alt="Foto de perfil"
              class="hero-avatar"
            />
            <div class="avatar-badge">
              <span class="badge-dot"></span>
              Disponible
            </div>
          </div>
          
          <!-- Info principal -->
          <div class="hero-info">
            <div class="hero-greeting">¡Hola! Soy</div>
            <h1 class="hero-name">{{ cv.name }}</h1>
            <div class="hero-role">
              <span class="role-icon">
                <i class="pi pi-code"></i>
              </span>
              {{ cv.role }}
            </div>
            
            <!-- Ubicación -->
            <div class="hero-location">
              <i class="pi pi-map-marker"></i>
              <span>{{ cv.location || 'Tenerife, España' }}</span>
              <span class="location-separator">•</span>
              <span class="location-remote">
                <i class="pi pi-wifi"></i>
                Trabajo remoto
              </span>
            </div>
            
            <!-- Botones de acción -->
            <div class="hero-actions">
              <RouterLink to="/contacto" class="action-primary">
                <i class="pi pi-send"></i>
                <span>Contactar</span>
              </RouterLink>
              <a :href="`mailto:${cv.email}`" class="action-secondary">
                <i class="pi pi-envelope"></i>
                <span>{{ cv.email }}</span>
              </a>
            </div>
            
            <!-- Redes sociales -->
            <div class="hero-socials">
              <a 
                v-for="social in cv.socials" 
                :key="social.platform"
                :href="social.url"
                target="_blank"
                class="social-btn"
                :aria-label="social.platform"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div 
          v-for="(stat, index) in cv.stats" 
          :key="stat.label"
          class="stat-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="animateStatValue($event, stat.value)"
        >
          <div class="stat-icon">
            <i :class="getStatIcon(stat.label)"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value" :data-value="stat.value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
          <div class="stat-particles">
            <span v-for="n in 6" :key="n" class="particle"></span>
          </div>
        </div>
      </div>

      <!-- Sección Sobre mí - MEJORADA -->
      <div 
        class="about-section"
        ref="aboutSection"
        :class="{ 'in-view': aboutInView }"
      >
        <div class="section-header">
          <div class="section-icon pulse-icon">
            <i class="pi pi-user"></i>
          </div>
          <div>
            <h2 class="section-title">Sobre mí</h2>
            <p class="section-subtitle">Conóceme un poco más</p>
          </div>
        </div>
        
        <div class="about-content">
          <!-- Texto con efecto de typing -->
          <div class="about-text-wrapper">
            <p class="about-text typing-effect" v-if="aboutInView">
              {{ t('about.intro') }}
            </p>
            <p class="about-text" v-if="aboutInView" style="animation-delay: 0.5s">
              {{ cv.summary }}
            </p>
          </div>
          
          <!-- Decoración interactiva -->
          <div class="about-decoration">
            <div class="code-snippet" @click="toggleCodeAnimation">
              <div class="code-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="file-name">yo.js</span>
              </div>
              <div class="code-body">
                <div class="code-line" v-for="(line, i) in codeLines" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
                  <span class="line-number">{{ i + 1 }}</span>
                  <span class="code-content" v-html="line"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mi Historia - MEJORADA CON TIMELINE INTERACTIVO -->
      <div 
        class="story-section"
        ref="storySection"
        :class="{ 'in-view': storyInView }"
      >
        <div class="section-header">
          <div class="section-icon">
            <i class="pi pi-book"></i>
          </div>
          <div>
            <h2 class="section-title">Mi Historia</h2>
            <p class="section-subtitle">El camino que me trajo hasta aquí</p>
          </div>
        </div>
        
        <!-- Timeline interactivo -->
        <div class="story-timeline">
          <div class="timeline-line">
            <div class="timeline-progress" :style="{ height: `${timelineProgress}%` }"></div>
          </div>
          
          <div 
            v-for="(story, index) in storyItems" 
            :key="story.title"
            class="story-card"
            :class="{ 'active': activeStory === index }"
            @mouseenter="setActiveStory(index)"
            @mouseleave="clearActiveStory"
            @mousemove="handleStoryTilt($event, index)"
            :style="getStoryStyle(index)"
          >
            <!-- Partículas de fondo -->
            <div class="story-particles">
              <span v-for="n in 8" :key="n" class="story-particle" :style="getParticleStyle(n)"></span>
            </div>
            
            <div class="story-number">{{ String(index + 1).padStart(2, '0') }}</div>
            
            <!-- Punto del timeline -->
            <div class="timeline-dot" :class="{ 'pulse': activeStory === index }">
              <span class="dot-inner"></span>
              <span class="dot-ring"></span>
              <span class="dot-ring ring-2"></span>
            </div>
            
            <div class="story-icon-wrapper">
              <div class="story-icon">
                <i :class="story.icon"></i>
              </div>
              <div class="icon-orbit">
                <span class="orbit-dot"></span>
              </div>
            </div>
            
            <h3 class="story-title">{{ story.title }}</h3>
            <p class="story-description">{{ story.description }}</p>
            
            <!-- Barra de progreso animada -->
            <div class="story-progress">
              <div class="progress-bar" :style="{ width: activeStory === index ? '100%' : '0%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mis Valores - MEJORADA CON EFECTOS 3D -->
      <div 
        class="values-section"
        ref="valuesSection"
        :class="{ 'in-view': valuesInView }"
      >
        <div class="section-header">
          <div class="section-icon heartbeat">
            <i class="pi pi-heart"></i>
          </div>
          <div>
            <h2 class="section-title">Mis Valores</h2>
            <p class="section-subtitle">Lo que guía mi forma de trabajar</p>
          </div>
        </div>
        
        <div class="values-grid">
          <div 
            v-for="(value, index) in values" 
            :key="value.title"
            class="value-card"
            :class="{ 'flipped': flippedValues.includes(index) }"
            @mouseenter="handleValueHover(index, $event)"
            @mouseleave="handleValueLeave(index)"
            @mousemove="handleValueTilt($event, index)"
            @click="flipValue(index)"
            :style="getValueStyle(index)"
          >
            <!-- Frente de la tarjeta -->
            <div class="value-front">
              <div class="value-bg-pattern"></div>
              <div class="value-icon-wrapper">
                <div class="value-icon">
                  <i :class="value.icon"></i>
                </div>
                <div class="value-icon-glow"></div>
              </div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-description">{{ value.description }}</p>
              <div class="value-hint">
                <i class="pi pi-sync"></i>
                <span>Click para más</span>
              </div>
            </div>
            
            <!-- Reverso de la tarjeta -->
            <div class="value-back">
              <div class="value-back-content">
                <div class="value-emoji">{{ value.emoji }}</div>
                <p class="value-quote">"{{ value.quote }}"</p>
                <div class="value-tags">
                  <span v-for="tag in value.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
            
            <!-- Partículas al hover -->
            <div class="value-particles" v-if="hoveredValue === index">
              <span v-for="n in 12" :key="n" class="v-particle"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Lo que hago - SERVICIOS MEJORADOS -->
      <div 
        class="services-section"
        ref="servicesSection"
        :class="{ 'in-view': servicesInView }"
      >
        <div class="section-header">
          <div class="section-icon rotate-icon">
            <i class="pi pi-th-large"></i>
          </div>
          <div>
            <h2 class="section-title">Lo que hago</h2>
            <p class="section-subtitle">Servicios y especialidades</p>
          </div>
        </div>
        
        <div class="services-grid">
          <div 
            v-for="(service, index) in enhancedServices" 
            :key="service.id"
            class="service-card"
            :class="{ 'expanded': expandedService === index }"
            @mouseenter="handleServiceHover(index)"
            @mouseleave="handleServiceLeave(index)"
            @mousemove="handleServiceTilt($event, index)"
            :style="getServiceStyle(index)"
            role="article"
            :aria-expanded="expandedService === index"
          >
            <!-- Fondo animado -->
            <div class="service-bg">
              <div class="service-gradient" :style="{ background: service.gradient }"></div>
              <div class="service-pattern"></div>
            </div>
            
            <!-- Icono con animación -->
            <div class="service-icon-wrapper">
              <div class="service-icon" :style="{ background: service.iconBg }">
                <i :class="service.icon"></i>
              </div>
              <div class="service-icon-ring"></div>
              <div class="service-icon-particles">
                <span v-for="n in 6" :key="n"></span>
              </div>
            </div>
            
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <!-- Tags con animación -->
            <div class="service-tags">
              <span 
                v-for="(tag, tagIndex) in service.tags" 
                :key="tag"
                :style="{ animationDelay: `${tagIndex * 0.1}s` }"
              >
                {{ tag }}
              </span>
            </div>
            
            <!-- Contenido expandido con transición -->
            <Transition name="expand">
              <div class="service-expanded" v-if="expandedService === index">
                <div class="service-skills">
                  <div 
                    v-for="(skill, skillIndex) in service.skills" 
                    :key="skill.name"
                    class="skill-bar"
                    :style="{ animationDelay: `${skillIndex * 0.1}s` }"
                  >
                    <span class="skill-name">{{ skill.name }}</span>
                    <div class="skill-progress">
                      <div 
                        class="skill-fill" 
                        :style="{ 
                          width: expandedService === index ? skill.level + '%' : '0%',
                          transitionDelay: `${skillIndex * 0.15}s`
                        }"
                      ></div>
                    </div>
                    <span class="skill-percent">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </Transition>
            
            <!-- Botón de expansión mejorado -->
            <button 
              class="service-expand-btn"
              @click.stop="toggleServiceExpand(index)"
              :aria-label="expandedService === index ? 'Cerrar detalles' : 'Ver detalles de tecnologías'"
              :aria-pressed="expandedService === index"
            >
              <span class="expand-text">{{ expandedService === index ? 'Cerrar' : 'Ver tecnologías' }}</span>
              <i 
                class="pi" 
                :class="expandedService === index ? 'pi-chevron-up' : 'pi-chevron-down'"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Más allá del código - MEJORADA -->
      <div 
        class="personal-section"
        ref="personalSection"
        :class="{ 'in-view': personalInView }"
      >
        <div class="section-header">
          <div class="section-icon sparkle-icon">
            <i class="pi pi-sparkles"></i>
          </div>
          <div>
            <h2 class="section-title">Más allá del código</h2>
            <p class="section-subtitle">Intereses y curiosidades</p>
          </div>
        </div>
        
        <div class="personal-content">
          <!-- Intereses interactivos -->
          <div class="interests-card">
            <div class="interests-header">
              <i class="pi pi-palette"></i>
              <h3>Mis intereses</h3>
            </div>
            <div class="interests-grid">
              <div 
                v-for="(interest, index) in interests" 
                :key="interest.name"
                class="interest-item"
                :class="{ 'active': activeInterest === index, 'bouncing': bouncingInterest === index }"
                @mouseenter="setActiveInterest(index)"
                @mouseleave="clearActiveInterest"
                @click="bounceInterest(index)"
              >
                <div class="interest-emoji-wrapper">
                  <span class="interest-emoji">{{ interest.emoji }}</span>
                  <span class="emoji-shadow">{{ interest.emoji }}</span>
                </div>
                <div class="interest-info">
                  <span class="interest-name">{{ interest.name }}</span>
                  <span class="interest-detail">{{ interest.detail }}</span>
                </div>
                <div class="interest-tooltip" v-if="activeInterest === index">
                  {{ interest.funFact }}
                </div>
              </div>
            </div>
          </div>

          <!-- Fun Facts interactivos -->
          <div class="facts-card">
            <div class="facts-header">
              <i class="pi pi-info-circle"></i>
              <h3>Datos curiosos</h3>
            </div>
            
            <!-- Carrusel de facts sin flechas -->
            <div class="facts-carousel">
              <div class="facts-slider">
                <Transition name="fact-slide" mode="out-in">
                  <div 
                    :key="currentFactIndex"
                    class="fact-slide"
                  >
                    <div class="fact-icon">{{ funFacts[currentFactIndex].emoji }}</div>
                    <p class="fact-text">{{ funFacts[currentFactIndex].text }}</p>
                  </div>
                </Transition>
              </div>
            </div>
            
            <!-- Indicadores del carrusel - click para navegar -->
            <div class="facts-dots">
              <span 
                v-for="(_, index) in funFacts" 
                :key="index"
                class="dot"
                :class="{ 'active': currentFactIndex === index }"
                @click="goToFact(index)"
              ></span>
            </div>
            
            <!-- Barra de progreso del auto-rotate -->
            <div class="facts-progress">
              <div class="facts-progress-bar" :key="currentFactIndex"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actualmente - MEJORADA -->
      <div 
        class="current-section"
        ref="currentSection"
        :class="{ 'in-view': currentInView }"
      >
        <div class="section-header">
          <div class="section-icon clock-icon">
            <i class="pi pi-clock"></i>
          </div>
          <div>
            <h2 class="section-title">Actualmente</h2>
            <p class="section-subtitle">En qué estoy enfocado ahora mismo</p>
          </div>
        </div>
        
        <div class="current-grid">
          <div 
            v-for="(item, index) in currentItems" 
            :key="item.label"
            class="current-card"
            :class="{ 'active': activeCurrentItem === index }"
            @mouseenter="setActiveCurrentItem(index)"
            @mouseleave="clearActiveCurrentItem"
            @click="cycleCurrentValue(index)"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <!-- Fondo con gradiente animado -->
            <div class="current-bg" :style="{ background: item.gradient }"></div>
            
            <div class="current-emoji-wrapper">
              <span class="current-emoji">{{ item.emoji }}</span>
              <div class="emoji-pulse"></div>
            </div>
            
            <div class="current-content">
              <span class="current-label">{{ item.label }}</span>
              <div class="current-value-wrapper">
                <TransitionGroup name="value-change" tag="div">
                  <span 
                    :key="item.currentValue || item.value"
                    class="current-value"
                  >
                    {{ item.currentValue || item.value }}
                  </span>
                </TransitionGroup>
              </div>
            </div>
            
            <!-- Indicador de ciclo -->
            <div class="cycle-indicator" v-if="item.alternateValues">
              <i class="pi pi-sync"></i>
            </div>
            
            <!-- Barra de progreso -->
            <div class="current-progress">
              <div 
                class="progress-fill" 
                :style="{ width: activeCurrentItem === index ? '100%' : '0%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="cta-bg-gradient"></div>
        <div class="cta-pattern"></div>
        
        <div class="floating-elements">
          <div class="floating-icon floating-1">
            <i class="pi pi-comments"></i>
          </div>
          <div class="floating-icon floating-2">
            <i class="pi pi-heart"></i>
          </div>
          <div class="floating-icon floating-3">
            <i class="pi pi-star"></i>
          </div>
          
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
        </div>
        
        <div class="cta-content" :style="cardStyle">
          <div class="cta-badge">
            <span class="badge-dot"></span>
            Disponible para proyectos
          </div>
          
          <div class="cta-icon-wrapper">
            <div class="cta-icon-bg"></div>
            <div class="cta-icon">
              <i class="pi pi-headphones"></i>
            </div>
            <div class="cta-icon-ring"></div>
          </div>
          
          <h3 class="cta-title">¿Trabajamos juntos?</h3>
          <p class="cta-text">
            Estoy siempre abierto a nuevos proyectos y colaboraciones interesantes.
            ¡No dudes en contactarme!
          </p>
          
          <div class="cta-buttons">
            <RouterLink to="/contacto" class="cta-button-primary">
              <span>Iniciar conversación</span>
              <i class="pi pi-arrow-right"></i>
            </RouterLink>
            <RouterLink to="/proyectos" class="cta-button-secondary">
              <i class="pi pi-folder"></i>
              <span>Ver proyectos</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import cvRaw from '@/data/cv.json'

// Tipos
interface Social {
  platform: string
  url: string
  icon: string
}

interface Stat {
  value: string
  label: string
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
}

const { t } = useI18n()
const cv = computed(() => cvRaw as {
  name: string
  role: string
  email: string
  location: string
  summary: string
  socials: Social[]
  stats: Stat[]
  services: Service[]
})

const profileImg = new URL('@/assets/profile.png', import.meta.url).href

const headerInfo = computed(() => {
  return `${cv.value.role} • ${cv.value.location || 'España'}`
})

// ==================== INTERSECTION OBSERVERS ====================
const aboutSection = ref<HTMLElement | null>(null)
const storySection = ref<HTMLElement | null>(null)
const valuesSection = ref<HTMLElement | null>(null)
const servicesSection = ref<HTMLElement | null>(null)
const personalSection = ref<HTMLElement | null>(null)
const currentSection = ref<HTMLElement | null>(null)

const aboutInView = ref(false)
const storyInView = ref(false)
const valuesInView = ref(false)
const servicesInView = ref(false)
const personalInView = ref(false)
const currentInView = ref(false)

let observers: IntersectionObserver[] = []

onMounted(() => {
  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  }

  const createObserver = (element: HTMLElement | null, callback: (val: boolean) => void) => {
    if (!element) return null
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(true)
        }
      })
    }, options)
    observer.observe(element)
    return observer
  }

  const obs1 = createObserver(aboutSection.value, (val) => aboutInView.value = val)
  const obs2 = createObserver(storySection.value, (val) => storyInView.value = val)
  const obs3 = createObserver(valuesSection.value, (val) => valuesInView.value = val)
  const obs4 = createObserver(servicesSection.value, (val) => servicesInView.value = val)
  const obs5 = createObserver(personalSection.value, (val) => personalInView.value = val)
  const obs6 = createObserver(currentSection.value, (val) => currentInView.value = val)
  
  observers = [obs1, obs2, obs3, obs4, obs5, obs6].filter(Boolean) as IntersectionObserver[]

  // Auto-rotate facts
  factInterval = setInterval(nextFact, 5000)
})

onUnmounted(() => {
  observers.forEach(obs => obs.disconnect())
  if (factInterval) clearInterval(factInterval)
})

// ==================== CÓDIGO SNIPPET PARA SOBRE MÍ ====================
const codeLines = [
  '<span class="keyword">const</span> <span class="variable">yo</span> = {',
  '  <span class="property">nombre</span>: <span class="string">"Desarrollador"</span>,',
  '  <span class="property">pasión</span>: <span class="string">"Crear cosas geniales"</span>,',
  '  <span class="property">café</span>: <span class="number">Infinity</span>,',
  '  <span class="property">aprendiendo</span>: <span class="boolean">true</span>,',
  '  <span class="method">trabajar</span>() {',
  '    <span class="keyword">return</span> <span class="string">"magia ✨"</span>',
  '  }',
  '};'
]

const codeAnimating = ref(false)
const toggleCodeAnimation = () => {
  codeAnimating.value = !codeAnimating.value
}

// ==================== MI HISTORIA ====================
const storyItems = [
  {
    icon: 'pi pi-play',
    title: 'El inicio',
    description: 'Mi viaje en el desarrollo comenzó con la curiosidad de entender cómo funcionaban las páginas web. Lo que empezó como hobby se convirtió en pasión.'
  },
  {
    icon: 'pi pi-bolt',
    title: 'El aprendizaje',
    description: 'Cada proyecto ha sido una oportunidad para aprender algo nuevo. La tecnología evoluciona constantemente, y eso es lo emocionante.'
  },
  {
    icon: 'pi pi-forward',
    title: 'Hoy',
    description: 'Sigo aprendiendo cada día. Me motiva crear soluciones que faciliten la vida de las personas y mejoren su experiencia digital.'
  }
]

const activeStory = ref<number | null>(null)
const timelineProgress = ref(0)
const storyTilts = reactive<Record<number, { x: number; y: number }>>({})

const setActiveStory = (index: number) => {
  activeStory.value = index
  timelineProgress.value = ((index + 1) / storyItems.length) * 100
}

const clearActiveStory = () => {
  activeStory.value = null
}

const handleStoryTilt = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  storyTilts[index] = { x: x * 15, y: y * -15 }
}

const getStoryStyle = (index: number) => {
  const tilt = storyTilts[index]
  if (!tilt) return {}
  return {
    transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
  }
}

const particleConfigs = [
  { x: 15, y: 20, size: 3, driftX: 12, driftY: -8 },
  { x: 75, y: 15, size: 4, driftX: -10, driftY: -12 },
  { x: 85, y: 45, size: 2, driftX: 8, driftY: 10 },
  { x: 25, y: 70, size: 5, driftX: -15, driftY: -5 },
  { x: 60, y: 80, size: 3, driftX: 10, driftY: 8 },
  { x: 40, y: 35, size: 4, driftX: -8, driftY: -15 },
  { x: 90, y: 75, size: 2, driftX: 12, driftY: -10 },
  { x: 10, y: 50, size: 3, driftX: -12, driftY: 6 }
]

const getParticleStyle = (n: number) => {
  const config = particleConfigs[(n - 1) % particleConfigs.length]
  return {
    '--delay': `${(n - 1) * 0.4}s`,
    '--duration': `${3 + (n % 3)}s`,
    '--x': `${config.x}%`,
    '--y': `${config.y}%`,
    '--size': `${config.size}px`,
    '--drift-x': `${config.driftX}px`,
    '--drift-y': `${config.driftY}px`
  }
}

// ==================== MIS VALORES ====================
const values = [
  { 
    icon: 'pi pi-heart', 
    title: 'Pasión', 
    description: 'Amo lo que hago. Cada proyecto es una oportunidad para crear algo significativo.',
    emoji: '❤️',
    quote: 'La pasión es el combustible del éxito',
    tags: ['Dedicación', 'Entusiasmo', 'Compromiso']
  },
  { 
    icon: 'pi pi-book', 
    title: 'Aprendizaje', 
    description: 'Nunca dejo de aprender. La tecnología evoluciona y yo con ella.',
    emoji: '📚',
    quote: 'Cada día es una oportunidad para aprender',
    tags: ['Curiosidad', 'Crecimiento', 'Evolución']
  },
  { 
    icon: 'pi pi-users', 
    title: 'Colaboración', 
    description: 'Los mejores resultados nacen del trabajo en equipo y la comunicación.',
    emoji: '🤝',
    quote: 'Juntos llegamos más lejos',
    tags: ['Equipo', 'Comunicación', 'Sinergia']
  },
  { 
    icon: 'pi pi-check-square', 
    title: 'Calidad', 
    description: 'El detalle importa. Código limpio, accesible y mantenible.',
    emoji: '✨',
    quote: 'La excelencia está en los detalles',
    tags: ['Precisión', 'Limpieza', 'Excelencia']
  }
]

const flippedValues = ref<number[]>([])
const hoveredValue = ref<number | null>(null)
const valueTilts = reactive<Record<number, { x: number; y: number }>>({})

const flipValue = (index: number) => {
  if (flippedValues.value.includes(index)) {
    flippedValues.value = flippedValues.value.filter(i => i !== index)
  } else {
    flippedValues.value.push(index)
  }
}

const handleValueHover = (index: number, e: MouseEvent) => {
  hoveredValue.value = index
}

const handleValueLeave = (index: number) => {
  hoveredValue.value = null
  valueTilts[index] = { x: 0, y: 0 }
}

const handleValueTilt = (e: MouseEvent, index: number) => {
  if (flippedValues.value.includes(index)) return
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  valueTilts[index] = { x: x * 20, y: y * -20 }
}

const getValueStyle = (index: number) => {
  const tilt = valueTilts[index]
  if (!tilt || flippedValues.value.includes(index)) return {}
  return {
    transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
  }
}

// ==================== SERVICIOS ====================
const enhancedServices = computed(() => {
  const gradients = [
    'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.05))',
    'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05))',
    'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.05))',
    'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.05))'
  ]
  const iconBgs = [
    'linear-gradient(135deg, #fef3c7, #fde68a)',
    'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    'linear-gradient(135deg, #fce7f3, #fbcfe8)'
  ]
  const skills = [
    [
      { name: 'Vue.js', level: 90 },
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 88 }
    ],
    [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 82 }
    ],
    [
      { name: 'React Native', level: 75 },
      { name: 'Flutter', level: 70 },
      { name: 'Firebase', level: 85 }
    ],
    [
      { name: 'Figma', level: 88 },
      { name: 'Prototipos', level: 85 },
      { name: 'Design Systems', level: 82 }
    ]
  ]
  
  return cv.value.services.map((service, index) => ({
    ...service,
    gradient: gradients[index % gradients.length],
    iconBg: iconBgs[index % iconBgs.length],
    skills: skills[index % skills.length]
  }))
})

const expandedService = ref<number | null>(null)
const serviceTilts = reactive<Record<number, { x: number; y: number }>>({})

const handleServiceHover = (index: number) => {
  // Solo efecto visual, no expandir
}

const handleServiceLeave = (index: number) => {
  // Resetear tilt al salir
  serviceTilts[index] = { x: 0, y: 0 }
}

const handleServiceTilt = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  serviceTilts[index] = { x: x * 10, y: y * -10 }
}

const toggleServiceExpand = (index: number) => {
  // Si ya está expandido, cerrar. Si no, abrir este y cerrar otros
  if (expandedService.value === index) {
    expandedService.value = null
  } else {
    expandedService.value = index
  }
}

const getServiceStyle = (index: number) => {
  const tilt = serviceTilts[index]
  if (!tilt) return {}
  return {
    transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
  }
}

// ==================== INTERESES ====================
const interests = [
  { emoji: '🎮', name: 'Gaming', detail: 'RPGs y estrategia', funFact: '¡Más de 500 horas en mi juego favorito!' },
  { emoji: '📖', name: 'Lectura', detail: 'Ciencia ficción', funFact: 'Asimov es mi autor favorito' },
  { emoji: '🎵', name: 'Música', detail: 'Lo-fi & Rock', funFact: 'Programo mejor con música' },
  { emoji: '☕', name: 'Café', detail: 'Combustible diario', funFact: '3+ tazas al día' }
]

const activeInterest = ref<number | null>(null)
const bouncingInterest = ref<number | null>(null)

const setActiveInterest = (index: number) => {
  activeInterest.value = index
}

const clearActiveInterest = () => {
  activeInterest.value = null
}

const bounceInterest = (index: number) => {
  bouncingInterest.value = index
  setTimeout(() => {
    bouncingInterest.value = null
  }, 600)
}

// ==================== FUN FACTS CAROUSEL ====================
const funFacts = [
  { id: 1, emoji: '🐍', text: 'Mi primer "Hola Mundo" fue en Python' },
  { id: 2, emoji: '🌙', text: 'Prefiero el modo oscuro para programar' },
  { id: 3, emoji: '☕', text: 'El café es mi combustible diario' },
  { id: 4, emoji: '📑', text: 'Siempre tengo 20+ pestañas abiertas' },
  { id: 5, emoji: '🎧', text: 'No puedo programar sin música' }
]

const currentFactIndex = ref(0)
let factInterval: ReturnType<typeof setInterval> | null = null

const nextFact = () => {
  currentFactIndex.value = (currentFactIndex.value + 1) % funFacts.length
}

const goToFact = (index: number) => {
  currentFactIndex.value = index
  // Reiniciar el intervalo para que no cambie inmediatamente después del click
  if (factInterval) {
    clearInterval(factInterval)
    factInterval = setInterval(nextFact, 5000)
  }
}

// ==================== ACTUALMENTE ====================
const currentItems = ref([
  { 
    emoji: '📚', 
    label: 'Aprendiendo', 
    value: 'Vue 3 + TypeScript',
    alternateValues: ['React Native', 'Rust', 'AI/ML'],
    currentValue: 'Vue 3 + TypeScript',
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(251, 146, 60, 0.03))'
  },
  { 
    emoji: '🔨', 
    label: 'Construyendo', 
    value: 'Este portafolio',
    alternateValues: ['Apps móviles', 'APIs REST', 'Dashboards'],
    currentValue: 'Este portafolio',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.03))'
  },
  { 
    emoji: '🎯', 
    label: 'Objetivo', 
    value: 'Fullstack Developer',
    alternateValues: ['Tech Lead', 'Emprendedor', 'Mentor'],
    currentValue: 'Fullstack Developer',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.03))'
  },
  { 
    emoji: '🎧', 
    label: 'Escuchando', 
    value: 'Lo-fi beats',
    alternateValues: ['Rock clásico', 'Jazz', 'Podcasts'],
    currentValue: 'Lo-fi beats',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(244, 114, 182, 0.03))'
  }
])

const activeCurrentItem = ref<number | null>(null)

const setActiveCurrentItem = (index: number) => {
  activeCurrentItem.value = index
}

const clearActiveCurrentItem = () => {
  activeCurrentItem.value = null
}

const cycleCurrentValue = (index: number) => {
  const item = currentItems.value[index]
  if (item.alternateValues) {
    const allValues = [item.value, ...item.alternateValues]
    const currentIndex = allValues.indexOf(item.currentValue || item.value)
    const nextIndex = (currentIndex + 1) % allValues.length
    item.currentValue = allValues[nextIndex]
  }
}

// ==================== STATS ANIMATION ====================
const animateStatValue = (e: Event, value: string) => {
  const target = e.currentTarget as HTMLElement
  target.classList.add('counting')
  setTimeout(() => {
    target.classList.remove('counting')
  }, 1000)
}

// Parallax effect para CTA
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  mouseX.value = x * 10
  mouseY.value = y * 10
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const cardStyle = computed(() => ({
  transform: `translateX(${mouseX.value}px) translateY(${mouseY.value}px)`
}))

// Función para obtener icono de stat según label
const getStatIcon = (label: string) => {
  const icons: Record<string, string> = {
    'Años experiencia': 'pi pi-calendar',
    'Proyectos': 'pi pi-briefcase',
    'Clientes': 'pi pi-users',
    'Satisfacción': 'pi pi-star-fill'
  }
  return icons[label] || 'pi pi-chart-bar'
}
</script>

<style scoped>
/* ==================== ANIMACIONES BASE ==================== */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de entrada para secciones */
.about-section,
.story-section,
.values-section,
.services-section,
.personal-section,
.current-section {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-section.in-view,
.story-section.in-view,
.values-section.in-view,
.services-section.in-view,
.personal-section.in-view,
.current-section.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* ==================== HERO SECTION ==================== */
.hero-section {
  position: relative;
  background: var(--bg-card);
  border-radius: 1.75rem;
  padding: 3rem;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  margin-bottom: 2rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 0% 0%, var(--accent-100) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 100%, var(--accent-200) 0%, transparent 50%);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

:root.dark .hero-bg {
  opacity: 0.15;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-300) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.15;
}

.hero-floating {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  animation: float 6s ease-in-out infinite;
  transition: background 0.3s ease;
}

.floating-element i {
  font-size: 1rem;
  color: var(--accent-500);
}

.el-1 { top: 10%; right: 15%; animation-delay: 0s; }
.el-2 { bottom: 20%; right: 10%; animation-delay: -2s; }
.el-2 i { color: #ec4899; }
.el-3 { top: 30%; right: 5%; animation-delay: -4s; width: 32px; height: 32px; }
.el-3 i { font-size: 0.75rem; color: #fbbf24; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    text-align: left;
    gap: 3rem;
  }
}

/* Avatar */
.hero-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, var(--accent-400) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.2;
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.1); opacity: 0.4; }
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border: 2px dashed var(--accent-300);
  border-radius: 50%;
  animation: spin-slow 20s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg-card);
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 2;
}

.avatar-badge {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: var(--bg-card);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--success);
  box-shadow: var(--shadow-md);
  z-index: 3;
  transition: background 0.3s ease, color 0.3s ease;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

/* Hero info */
.hero-info {
  flex: 1;
}

.hero-greeting {
  font-size: 1rem;
  color: var(--accent-500);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.hero-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .hero-name {
    font-size: 3rem;
  }
}

.hero-role {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  border-radius: 999px;
  font-weight: 600;
  color: var(--accent-700);
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

:root.dark .hero-role {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
  color: var(--accent-400);
}

.role-icon {
  width: 24px;
  height: 24px;
  background: var(--bg-card);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.role-icon i {
  font-size: 0.75rem;
  color: var(--accent-500);
}

.hero-location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .hero-location {
    justify-content: flex-start;
  }
}

.hero-location i {
  color: var(--accent-500);
}

.location-separator {
  color: var(--border-primary);
}

.location-remote {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--success);
}

.location-remote i {
  color: var(--success);
  font-size: 0.75rem;
}

/* Hero actions */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-actions {
    justify-content: flex-start;
  }
}

.action-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow);
}

.action-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
}

.action-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.action-secondary:hover {
  border-color: var(--accent-500);
  color: var(--accent-500);
  background: var(--accent-50);
}

/* Hero socials */
.hero-socials {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
}

@media (min-width: 768px) {
  .hero-socials {
    justify-content: flex-start;
  }
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: var(--gradient-primary);
  border-color: var(--accent-500);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

/* ==================== STATS GRID ==================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-300);
}

.stat-card.counting .stat-value {
  animation: countPulse 0.3s ease-out 3;
}

@keyframes countPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); color: var(--accent-600); }
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

:root.dark .stat-icon {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
}

.stat-card:hover .stat-icon {
  background: var(--gradient-primary);
  transform: rotate(10deg) scale(1.1);
}

.stat-card:hover .stat-icon i {
  color: white;
}

.stat-icon i {
  font-size: 1.25rem;
  color: var(--accent-500);
  transition: color 0.3s ease;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-500);
  line-height: 1.2;
  transition: all 0.3s ease;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s ease;
}

.stat-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-particles {
  opacity: 1;
}

.stat-particles .particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-500);
  border-radius: 50%;
  animation: particleFly 1s ease-out infinite;
}

.stat-particles .particle:nth-child(1) { left: 20%; top: 30%; animation-delay: 0s; }
.stat-particles .particle:nth-child(2) { left: 40%; top: 20%; animation-delay: 0.1s; }
.stat-particles .particle:nth-child(3) { left: 60%; top: 40%; animation-delay: 0.2s; }
.stat-particles .particle:nth-child(4) { left: 80%; top: 25%; animation-delay: 0.3s; }
.stat-particles .particle:nth-child(5) { left: 30%; top: 60%; animation-delay: 0.4s; }
.stat-particles .particle:nth-child(6) { left: 70%; top: 70%; animation-delay: 0.5s; }

@keyframes particleFly {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-30px) scale(0); opacity: 0; }
}

/* ==================== SECTION STYLES ==================== */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.875rem;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-glow);
}

.section-icon i {
  font-size: 1.25rem;
  color: white;
}

/* Animaciones especiales para iconos de sección */
.pulse-icon {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4); }
}

.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.15); }
  28% { transform: scale(1); }
  42% { transform: scale(1.15); }
  70% { transform: scale(1); }
}

.rotate-icon:hover {
  animation: rotate360 0.6s ease-out;
}

@keyframes rotate360 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.sparkle-icon {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.3); }
}

.clock-icon i {
  animation: clockTick 1s steps(12) infinite;
}

@keyframes clockTick {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0.125rem 0 0 0;
  transition: color 0.3s ease;
}

/* ==================== ABOUT SECTION MEJORADA ==================== */
.about-section {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .about-content {
    grid-template-columns: 1fr 1fr;
    padding-left: 4rem;
  }
}

.about-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-text {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  animation: textReveal 0.8s ease-out forwards;
  opacity: 0;
  transition: color 0.3s ease;
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Código snippet decorativo - MANTIENE COLORES FIJOS */
.about-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-snippet {
  background: #1e1e1e;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.code-snippet:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-header .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-header .dot.red { background: #ff5f56; }
.code-header .dot.yellow { background: #ffbd2e; }
.code-header .dot.green { background: #27c93f; }

.file-name {
  margin-left: auto;
  font-size: 0.75rem;
  color: #888;
  font-family: monospace;
}

.code-body {
  padding: 1rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  gap: 1rem;
  opacity: 0;
  animation: codeFadeIn 0.4s ease-out forwards;
}

@keyframes codeFadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.line-number {
  color: #555;
  min-width: 1rem;
  text-align: right;
  user-select: none;
}

.code-content {
  color: #d4d4d4;
}

.code-content :deep(.keyword) { color: #c586c0; }
.code-content :deep(.variable) { color: #9cdcfe; }
.code-content :deep(.property) { color: #9cdcfe; }
.code-content :deep(.string) { color: #ce9178; }
.code-content :deep(.number) { color: #b5cea8; }
.code-content :deep(.boolean) { color: #569cd6; }
.code-content :deep(.method) { color: #dcdcaa; }

/* ==================== STORY SECTION - TIMELINE INTERACTIVO ==================== */
.story-section {
  margin-bottom: 2.5rem;
}

.story-timeline {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding-left: 2rem;
}

@media (min-width: 768px) {
  .story-timeline {
    grid-template-columns: repeat(3, 1fr);
    padding-left: 0;
  }
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--border-secondary);
  border-radius: 2px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .timeline-line {
    display: none;
  }
}

.timeline-progress {
  width: 100%;
  background: var(--gradient-primary);
  border-radius: 2px;
  transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.story-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.75rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
}

.story-card:hover,
.story-card.active {
  border-color: var(--accent-300);
  box-shadow: var(--shadow-glow);
  transform: translateY(-4px);
}

/* ==================== PARTÍCULAS DE FONDO - MODIFICADAS ==================== */
.story-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.story-particle {
  position: absolute;
  width: var(--size, 4px);
  height: var(--size, 4px);
  background: var(--accent-400);
  border-radius: 50%;
  left: var(--x, 50%);
  top: var(--y, 50%);
  opacity: 0;
  pointer-events: none;
}

.story-card:hover .story-particle,
.story-card.active .story-particle {
  animation: particleFloatSlow var(--duration, 4s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes particleFloatSlow {
  0% { 
    transform: translate(0, 0) scale(0.8); 
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  25% {
    transform: translate(calc(var(--drift-x) * 0.3), calc(var(--drift-y) * 0.3)) scale(1);
    opacity: 0.6;
  }
  50% { 
    transform: translate(var(--drift-x), var(--drift-y)) scale(1.1); 
    opacity: 0.5;
  }
  75% {
    transform: translate(calc(var(--drift-x) * 0.6), calc(var(--drift-y) * 0.6)) scale(0.9);
    opacity: 0.6;
  }
  90% {
    opacity: 0.4;
  }
  100% { 
    transform: translate(0, 0) scale(0.8); 
    opacity: 0;
  }
}

.story-number {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent-100);
  line-height: 1;
  transition: all 0.4s ease;
}

:root.dark .story-number {
  color: rgba(249, 115, 22, 0.1);
}

.story-card:hover .story-number {
  color: var(--accent-200);
  transform: scale(1.1);
}

:root.dark .story-card:hover .story-number {
  color: rgba(249, 115, 22, 0.2);
}

/* Timeline dot */
.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 2rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .timeline-dot {
    display: none;
  }
}

.dot-inner {
  width: 10px;
  height: 10px;
  background: var(--accent-500);
  border-radius: 50%;
  z-index: 2;
}

.dot-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--accent-300);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.timeline-dot.pulse .dot-ring {
  opacity: 1;
  animation: ringPulse 1s ease-out infinite;
}

.ring-2 {
  animation-delay: 0.3s !important;
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

.story-icon-wrapper {
  position: relative;
  margin-bottom: 1.25rem;
  width: fit-content;
}

.story-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
}

:root.dark .story-icon {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
}

.story-card:hover .story-icon,
.story-card.active .story-icon {
  background: var(--gradient-primary);
  transform: scale(1.1) rotate(5deg);
}

.story-icon i {
  font-size: 1.5rem;
  color: var(--accent-500);
  transition: all 0.4s ease;
}

.story-card:hover .story-icon i,
.story-card.active .story-icon i {
  color: white;
}

/* Órbita animada */
.icon-orbit {
  position: absolute;
  inset: -10px;
  border: 2px dashed var(--accent-200);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.story-card:hover .icon-orbit {
  opacity: 1;
  animation: orbitSpin 8s linear infinite;
}

.orbit-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--accent-500);
  border-radius: 50%;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.story-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.625rem 0;
  transition: color 0.3s ease;
}

.story-card:hover .story-title {
  color: var(--accent-500);
}

.story-description {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  transition: color 0.3s ease;
}

.story-progress {
  height: 3px;
  background: var(--bg-secondary);
  border-radius: 2px;
  overflow: hidden;
}

.story-progress .progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ==================== VALUES SECTION - FLIP CARDS 3D ==================== */
.values-section {
  margin-bottom: 2.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.value-card {
  position: relative;
  height: 280px;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.value-front,
.value-back {
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.value-front {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.value-back {
  background: var(--gradient-primary);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-card.flipped .value-front {
  transform: rotateY(-180deg);
}

.value-card.flipped .value-back {
  transform: rotateY(0deg);
}

.value-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-200) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.value-card:hover .value-bg-pattern {
  opacity: 0.3;
}

.value-icon-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.value-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
}

:root.dark .value-icon {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
}

.value-card:hover:not(.flipped) .value-icon {
  background: var(--gradient-primary);
  transform: scale(1.15) rotate(-5deg);
}

.value-icon i {
  font-size: 1.5rem;
  color: var(--accent-500);
  transition: all 0.4s ease;
}

.value-card:hover:not(.flipped) .value-icon i {
  color: white;
}

.value-icon-glow {
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, var(--accent-400) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.value-card:hover .value-icon-glow {
  opacity: 0.3;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.5; }
}

.value-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
}

.value-card:hover:not(.flipped) .value-title {
  color: var(--accent-500);
}

.value-description {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0 0 1rem 0;
  flex: 1;
  transition: color 0.3s ease;
}

.value-hint {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  color: var(--text-muted);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.value-card:hover .value-hint {
  opacity: 1;
  transform: translateY(0);
}

.value-hint i {
  font-size: 0.625rem;
  animation: rotateHint 2s linear infinite;
}

@keyframes rotateHint {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Reverso de la tarjeta */
.value-back-content {
  text-align: center;
  padding: 1.5rem;
  color: white;
}

.value-emoji {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: emojiFloat 2s ease-in-out infinite;
}

@keyframes emojiFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.value-quote {
  font-size: 0.9375rem;
  font-style: italic;
  margin: 0 0 1rem 0;
  opacity: 0.95;
}

.value-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  justify-content: center;
}

.value-tags span {
  padding: 0.25rem 0.625rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 500;
}

/* Partículas de valores */
.value-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.v-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-500);
  border-radius: 50%;
  animation: vParticleFly 1s ease-out forwards;
}

.v-particle:nth-child(1) { left: 10%; top: 50%; animation-delay: 0s; }
.v-particle:nth-child(2) { left: 20%; top: 30%; animation-delay: 0.05s; }
.v-particle:nth-child(3) { left: 30%; top: 70%; animation-delay: 0.1s; }
.v-particle:nth-child(4) { left: 40%; top: 20%; animation-delay: 0.15s; }
.v-particle:nth-child(5) { left: 50%; top: 80%; animation-delay: 0.2s; }
.v-particle:nth-child(6) { left: 60%; top: 40%; animation-delay: 0.25s; }
.v-particle:nth-child(7) { left: 70%; top: 60%; animation-delay: 0.3s; }
.v-particle:nth-child(8) { left: 80%; top: 25%; animation-delay: 0.35s; }
.v-particle:nth-child(9) { left: 90%; top: 55%; animation-delay: 0.4s; }
.v-particle:nth-child(10) { left: 15%; top: 45%; animation-delay: 0.45s; }
.v-particle:nth-child(11) { left: 85%; top: 75%; animation-delay: 0.5s; }
.v-particle:nth-child(12) { left: 45%; top: 15%; animation-delay: 0.55s; }

@keyframes vParticleFly {
  0% { transform: scale(0) translateY(0); opacity: 1; }
  100% { transform: scale(1) translateY(-40px); opacity: 0; }
}

/* ==================== SERVICES SECTION ==================== */
.services-section {
  margin-bottom: 2.5rem;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.75rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  transform-style: preserve-3d;
}

.service-card:hover {
  border-color: var(--accent-300);
  box-shadow: var(--shadow-glow);
}

.service-card.expanded {
  box-shadow: 0 24px 48px rgba(249, 115, 22, 0.18);
}

/* Fondo animado */
.service-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.service-gradient {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover .service-gradient {
  opacity: 1;
}

.service-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-200) 1px, transparent 0);
  background-size: 24px 24px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover .service-pattern {
  opacity: 0.2;
}

.service-icon-wrapper {
  position: relative;
  margin-bottom: 1.25rem;
  width: fit-content;
  z-index: 2;
}

.service-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;
}

.service-card:hover .service-icon {
  transform: scale(1.15) rotate(10deg);
  box-shadow: var(--shadow-glow);
}

.service-icon i {
  font-size: 1.5rem;
  color: var(--accent-500);
  transition: all 0.4s ease;
}

.service-icon-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid var(--accent-200);
  border-radius: 1.25rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon-ring {
  opacity: 1;
  animation: serviceRingPulse 1.5s ease-out infinite;
}

@keyframes serviceRingPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

.service-icon-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.service-icon-particles span {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-500);
  border-radius: 50%;
  opacity: 0;
}

.service-card:hover .service-icon-particles span {
  animation: serviceParticle 0.8s ease-out forwards;
}

.service-icon-particles span:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
.service-icon-particles span:nth-child(2) { top: 25%; right: 0; animation-delay: 0.1s; }
.service-icon-particles span:nth-child(3) { bottom: 25%; right: 0; animation-delay: 0.2s; }
.service-icon-particles span:nth-child(4) { bottom: 0; left: 50%; animation-delay: 0.3s; }
.service-icon-particles span:nth-child(5) { bottom: 25%; left: 0; animation-delay: 0.4s; }
.service-icon-particles span:nth-child(6) { top: 25%; left: 0; animation-delay: 0.5s; }

@keyframes serviceParticle {
  0% { transform: scale(0) translate(0, 0); opacity: 1; }
  100% { transform: scale(1) translate(var(--tx, 20px), var(--ty, -20px)); opacity: 0; }
}

.service-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.625rem 0;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.service-card:hover .service-title {
  color: var(--accent-500);
}

.service-description {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.service-tags span {
  padding: 0.25rem 0.625rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.3s ease;
  animation: tagAppear 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.service-card:hover .service-tags span {
  background: var(--accent-50);
  border-color: var(--accent-300);
  color: var(--accent-600);
  transform: translateY(-2px);
}

:root.dark .service-card:hover .service-tags span {
  background: rgba(249, 115, 22, 0.15);
  color: var(--accent-400);
}

/* Contenido expandido */
.service-expanded {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-secondary);
  position: relative;
  z-index: 2;
}

/* Transición de expansión */
.expand-enter-active {
  animation: expandIn 0.4s ease-out;
}

.expand-leave-active {
  animation: expandOut 0.3s ease-in;
}

@keyframes expandIn {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 200px;
    transform: translateY(0);
  }
}

@keyframes expandOut {
  from {
    opacity: 1;
    max-height: 200px;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
}

.service-skills {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: skillSlideIn 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes skillSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.skill-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  min-width: 80px;
  transition: color 0.3s ease;
}

.skill-progress {
  flex: 1;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-percent {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-500);
  min-width: 35px;
  text-align: right;
}

/* Botón de expansión mejorado */
.service-expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.service-expand-btn:hover {
  background: var(--accent-50);
  border-color: var(--accent-300);
}

:root.dark .service-expand-btn:hover {
  background: rgba(249, 115, 22, 0.1);
}

.service-expand-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--ring-color);
}

.service-expand-btn:active {
  transform: scale(0.98);
}

.service-card.expanded .service-expand-btn {
  background: var(--accent-50);
  border-color: var(--accent-500);
}

:root.dark .service-card.expanded .service-expand-btn {
  background: rgba(249, 115, 22, 0.15);
}

.expand-text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.service-expand-btn:hover .expand-text,
.service-card.expanded .expand-text {
  color: var(--accent-500);
}

.service-expand-btn i {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.service-expand-btn:hover i,
.service-card.expanded .service-expand-btn i {
  color: var(--accent-500);
}

.service-card.expanded .service-expand-btn i {
  transform: rotate(180deg);
}

/* ==================== PERSONAL SECTION ==================== */
.personal-section {
  margin-bottom: 2.5rem;
}

.personal-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .personal-content {
    grid-template-columns: 1fr 1fr;
  }
}

.interests-card,
.facts-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.75rem;
  transition: all 0.4s ease;
}

.interests-card:hover,
.facts-card:hover {
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-200);
}

.interests-header,
.facts-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-secondary);
}

.interests-header i,
.facts-header i {
  font-size: 1.25rem;
  color: var(--accent-500);
}

.interests-header h3,
.facts-header h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
  transition: color 0.3s ease;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
}

.interest-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
}

.interest-item:hover,
.interest-item.active {
  background: var(--accent-50);
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-glow);
}

:root.dark .interest-item:hover,
:root.dark .interest-item.active {
  background: rgba(249, 115, 22, 0.1);
}

.interest-item.bouncing {
  animation: interestBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes interestBounce {
  0%, 100% { transform: translateY(-4px) scale(1.02); }
  25% { transform: translateY(-20px) scale(1.05); }
  50% { transform: translateY(-4px) scale(1.02); }
  75% { transform: translateY(-12px) scale(1.03); }
}

.interest-emoji-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.interest-emoji {
  font-size: 1.75rem;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.interest-item:hover .interest-emoji {
  transform: scale(1.2);
}

.emoji-shadow {
  position: absolute;
  font-size: 1.75rem;
  opacity: 0.2;
  filter: blur(4px);
  transform: translateY(4px);
}

.interest-info {
  display: flex;
  flex-direction: column;
}

.interest-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.interest-detail {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.interest-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 0.75rem;
  background: var(--bg-tooltip);
  color: var(--text-tooltip);
  font-size: 0.6875rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  z-index: 10;
  animation: tooltipAppear 0.3s ease-out;
  box-shadow: var(--shadow-lg);
}

.interest-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--bg-tooltip);
}

@keyframes tooltipAppear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Facts carousel */
.facts-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.facts-slider {
  flex: 1;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.fact-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 0 1rem;
}

.fact-icon {
  font-size: 2.5rem;
  animation: factIconBounce 0.5s ease-out;
}

@keyframes factIconBounce {
  0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.fact-text {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  transition: color 0.3s ease;
}

/* Transición para el carrusel - mode out-in */
.fact-slide-enter-active {
  transition: all 0.3s ease-out;
}

.fact-slide-leave-active {
  transition: all 0.2s ease-in;
}

.fact-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.fact-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.facts-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.facts-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.facts-dots .dot:hover {
  background: var(--accent-400);
  transform: scale(1.2);
}

.facts-dots .dot.active {
  background: var(--accent-500);
  transform: scale(1.4);
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.4);
}

/* Barra de progreso del auto-rotate */
.facts-progress {
  height: 3px;
  background: var(--bg-secondary);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.facts-progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 2px;
  animation: progressFill 5s linear forwards;
}

@keyframes progressFill {
  from { width: 0%; }
  to { width: 100%; }
}

/* ==================== CURRENT SECTION ==================== */
.current-section {
  margin-bottom: 2.5rem;
}

.current-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .current-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.current-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
  animation: currentSlideIn 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes currentSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.current-card:hover,
.current-card.active {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-300);
}

.current-bg {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.current-card:hover .current-bg,
.current-card.active .current-bg {
  opacity: 1;
}

.current-emoji-wrapper {
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
}

.current-emoji {
  font-size: 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.current-card:hover .current-emoji,
.current-card.active .current-emoji {
  transform: scale(1.25) rotate(10deg);
}

.emoji-pulse {
  position: absolute;
  inset: -4px;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

:root.dark .emoji-pulse {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
}

.current-card:hover .emoji-pulse,
.current-card.active .emoji-pulse {
  opacity: 1;
  animation: emojiPulsate 1.5s ease-in-out infinite;
}

@keyframes emojiPulsate {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.current-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 2;
}

.current-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.current-value-wrapper {
  position: relative;
  overflow: hidden;
  height: 1.4em;
}

.current-value {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.current-card:hover .current-value {
  color: var(--accent-500);
}

/* Transición de valor */
.value-change-enter-active,
.value-change-leave-active {
  transition: all 0.3s ease;
}

.value-change-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.value-change-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  position: absolute;
}

.cycle-indicator {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.current-card:hover .cycle-indicator {
  opacity: 1;
}

.cycle-indicator i {
  font-size: 0.625rem;
  color: var(--text-muted);
  animation: spinSlow 3s linear infinite;
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.current-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bg-secondary);
  overflow: hidden;
}

.current-progress .progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ==================== CTA SECTION ==================== */
.cta-section {
  margin-top: 1rem;
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
  transition: background 0.3s ease;
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

:root.dark .cta-bg-gradient {
  opacity: 0.15;
}

@keyframes gradientShift {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.05); }
}

:root.dark .cta-bg-gradient {
  animation-name: gradientShiftDark;
}

@keyframes gradientShiftDark {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.1; transform: scale(1.05); }
}

.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-300) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.15;
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
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
  transition: background 0.3s ease;
}

.floating-icon i {
  font-size: 1.25rem;
  color: var(--accent-500);
}

.floating-1 { top: 15%; left: 8%; }
.floating-2 { top: 20%; right: 12%; animation-delay: -2s; }
.floating-2 i { color: #ec4899; }
.floating-3 { bottom: 20%; right: 8%; animation-delay: -4s; }
.floating-3 i { color: #fbbf24; }

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  animation: floatShape 10s ease-in-out infinite;
}

:root.dark .floating-shape {
  opacity: 0.15;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  top: -20px;
  right: 15%;
}

.shape-2 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-200), var(--accent-300));
  bottom: -10px;
  left: 10%;
  animation-delay: -5s;
}

@keyframes floatShape {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -10px) scale(1.05); }
}

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
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  border-radius: 1.5rem;
  transform: rotate(-6deg);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

:root.dark .cta-icon-bg {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.15));
}

.cta-section:hover .cta-icon-bg {
  transform: rotate(6deg) scale(1.05);
}

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
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta-section:hover .cta-icon {
  transform: scale(1.08);
}

.cta-icon i {
  font-size: 2.5rem;
  color: var(--accent-500);
}

.cta-icon-ring {
  position: absolute;
  inset: -8px;
  border: 2px dashed var(--accent-300);
  border-radius: 1.75rem;
  animation: spinRing 20s linear infinite;
}

@keyframes spinRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.875rem 0;
  transition: color 0.3s ease;
}

.cta-text {
  font-size: 1rem;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin: 0 0 2rem 0;
  transition: color 0.3s ease;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  align-items: center;
}

@media (min-width: 480px) {
  .cta-buttons {
    flex-direction: row;
    justify-content: center;
  }
}

.cta-button-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1rem 1.75rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.875rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--shadow-glow);
}

.cta-button-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.45);
}

.cta-button-primary i {
  transition: transform 0.3s ease;
}

.cta-button-primary:hover i {
  transform: translateX(4px);
}

.cta-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-weight: 600;
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

:root.dark .cta-button-secondary:hover {
  background: rgba(249, 115, 22, 0.1);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1.5rem;
  }
  
  .hero-avatar {
    width: 140px;
    height: 140px;
  }
  
  .hero-name {
    font-size: 2rem;
  }
  
  .floating-element {
    display: none;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .current-card {
    flex-direction: column;
    text-align: center;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    padding: 2.5rem 1.5rem;
    min-height: auto;
  }
  
  .floating-icon,
  .floating-shape {
    display: none;
  }
  
  .cta-icon-wrapper {
    width: 80px;
    height: 80px;
  }
  
  .cta-icon i {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .value-card {
    height: 260px;
  }
  
  .about-content {
    padding-left: 0;
  }
  
  .code-snippet {
    max-width: 100%;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 2px;
}
</style>