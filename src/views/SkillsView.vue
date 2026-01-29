<template>
  <div class="animate-fade-in">
    <!-- Fondo decorativo -->
    <div class="group relative">
      <!-- Fondo como en contacto -->
      <div class="absolute inset-0"></div>
      <!-- Cabecera -->
      <PageHeader 
        :title="t('skills.title')"
        :subtitle="t('skills.subtitle')"
        category="Expertise"
        :info="statsInfo"
        :progress="true"
      />
    </div>

    <!-- Estadísticas adicionales -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-8">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-code"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ skills.length }}+</div>
            <div class="stat-label">Habilidades</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">2</div>
            <div class="stat-label">Años Exp.</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-briefcase"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">2+</div>
            <div class="stat-label">Proyectos</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-heart"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">100%</div>
            <div class="stat-label">Dedicación</div>
          </div>
        </div>
      </div>

      <!-- Filtros por categoría -->
      <div class="filter-section">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 class="filter-title">Filtrar por categoría</h2>
          <div class="flex items-center gap-3">
            <button 
              v-if="selectedCategories.length > 0"
              @click="clearFilters"
              class="clear-btn"
            >
              <i class="pi pi-times"></i>
              <span>Limpiar</span>
            </button>
            
            <!-- Botón cambiar vista -->
            <button 
              @click="toggleViewMode"
              class="view-toggle-btn"
              :title="viewMode === 'grid' ? 'Vista lista' : 'Vista grid'"
            >
              <i :class="viewMode === 'grid' ? 'pi pi-list' : 'pi pi-th-large'"></i>
              <span class="hidden sm:inline text-sm">{{ viewMode === 'grid' ? 'Lista' : 'Grid' }}</span>
            </button>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="category in categories"
            :key="category.id"
            @click="toggleCategory(category.id)"
            class="category-btn"
            :class="{ 'category-btn-active': selectedCategories.includes(category.id) }"
          >
            <i :class="category.icon"></i>
            <span>{{ category.name }}</span>
          </button>
        </div>
      </div>

      <!-- Grid/Lista de habilidades - JUSTO DEBAJO DE LOS FILTROS -->
      <div class="skills-container">
        <transition-group
          name="skills-list"
          tag="div"
          :class="[
            'skills-grid',
            viewMode === 'grid' ? 'skills-grid-mode' : 'skills-list-mode'
          ]"
        >
          <div 
            v-for="(skill, index) in filteredSkills" 
            :key="skill.name"
            class="skill-item"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <TarjetaHabilidad 
              :skill="skill" 
              :view-mode="viewMode"
              :highlight="selectedCategories.length > 0 && 
                          selectedCategories.some(cat => skill.categories?.includes(cat))"
            />
          </div>
        </transition-group>

        <!-- Mensaje si no hay resultados -->
        <div 
          v-if="filteredSkills.length === 0" 
          class="empty-state"
        >
          <div class="empty-icon">
            <i class="pi pi-search"></i>
          </div>
          <h3 class="empty-title">No se encontraron habilidades</h3>
          <p class="empty-text">
            Intenta con otra categoría o elimina los filtros
          </p>
          <button 
            @click="clearFilters"
            class="empty-btn"
          >
            <i class="pi pi-refresh"></i>
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- ==================== CTA SECTION MEJORADA ==================== -->
      <div class="cta-section" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <!-- Fondo con gradiente animado -->
        <div class="cta-bg-gradient"></div>
        
        <!-- Patrón de puntos -->
        <div class="cta-pattern"></div>
        
        <!-- Elementos decorativos flotantes -->
        <div class="floating-elements">
          <div class="floating-icon floating-1">
            <i class="pi pi-book"></i>
          </div>
          <div class="floating-icon floating-2">
            <i class="pi pi-lightbulb"></i>
          </div>
          <div class="floating-icon floating-3">
            <i class="pi pi-cog"></i>
          </div>
          <div class="floating-icon floating-4">
            <i class="pi pi-graduation-cap"></i>
          </div>
          <div class="floating-icon floating-5">
            <i class="pi pi-bolt"></i>
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
            <span class="badge-icon">📚</span>
            Siempre aprendiendo
          </div>
          
          <!-- Icono principal con animación -->
          <div class="cta-icon-wrapper">
            <div class="cta-icon-bg"></div>
            <div class="cta-icon">
              <i class="pi pi-sparkles"></i>
            </div>
            <div class="cta-icon-ring"></div>
          </div>
          
          <!-- Texto -->
          <h3 class="cta-title">¿Necesitas una habilidad específica?</h3>
          <p class="cta-text">
            Siempre estoy aprendiendo nuevas tecnologías. Si necesitas algo 
            específico para tu proyecto, ¡hablemos!
          </p>
          
          <!-- Botones -->
          <div class="cta-buttons">
            <RouterLink to="/contacto" class="cta-button-primary">
              <span>Contactar ahora</span>
              <i class="pi pi-send"></i>
            </RouterLink>
            <button @click="downloadCV" class="cta-button-secondary">
              <i class="pi pi-download"></i>
              <span>Descargar CV</span>
            </button>
          </div>
          
          <!-- Stats mini -->
          <div class="cta-stats">
            <div class="stat-item">
              <span class="stat-number">∞</span>
              <span class="stat-label">Curiosidad</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Aprendiendo</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Adaptable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import TarjetaHabilidad from '@/components/TarjetaHabilidad.vue'
import type { SkillCard } from '@/types/portfolio'

const { t, tm } = useI18n()

// Estados
const viewMode = ref<'grid' | 'list'>('grid')
const selectedCategories = ref<string[]>([])

// Estado para el efecto parallax suave
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

// Datos
const skills = computed(() => (tm('skills.cards') as unknown as SkillCard[]) ?? [])

// Información de estadísticas para el PageHeader
const statsInfo = computed(() => {
  const count = skills.value.length
  const years = 2
  return `${count} habilidades • ${years} años de experiencia • Dominio técnico completo`
})

// Categorías para filtrado
const categories = computed(() => [
  { id: 'frontend', name: 'Frontend', icon: 'pi pi-desktop' },
  { id: 'backend', name: 'Backend', icon: 'pi pi-server' },
  { id: 'database', name: 'Bases de datos', icon: 'pi pi-database' },
  { id: 'devops', name: 'DevOps', icon: 'pi pi-cloud' },
  { id: 'mobile', name: 'Mobile', icon: 'pi pi-mobile' },
  { id: 'design', name: 'Diseño', icon: 'pi pi-palette' },
  { id: 'tools', name: 'Herramientas', icon: 'pi pi-wrench' },
  { id: 'soft', name: 'Soft Skills', icon: 'pi pi-users' }
])

// Habilidades filtradas
const filteredSkills = computed(() => {
  if (selectedCategories.value.length === 0) {
    return skills.value
  }
  
  return skills.value.filter(skill => {
    if (!skill.categories) return false
    return selectedCategories.value.some(cat => 
      skill.categories.includes(cat)
    )
  })
})

// Métodos
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const toggleCategory = (categoryId: string) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const clearFilters = () => {
  selectedCategories.value = []
}

const downloadCV = () => {
  const link = document.createElement('a')
  link.href = '/cv.pdf'
  link.download = 'CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
/* ==================== ANIMACIONES ==================== */
.animate-fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== STAT CARDS ==================== */
.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
  border-color: var(--accent-300);
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
}

:root.dark .stat-icon {
  background: linear-gradient(135deg, var(--accent-900), var(--accent-800));
}

.stat-icon i {
  font-size: 1.5rem;
  color: var(--accent-500);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-500);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-weight: 500;
  transition: color 0.3s ease;
}

/* ==================== FILTER SECTION ==================== */
.filter-section {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.filter-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.clear-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background: var(--bg-card);
  border: 1px solid var(--error-light);
  color: var(--error);
  font-weight: 500;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--error-light);
  border-color: var(--error);
}

:root.dark .clear-btn {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

:root.dark .clear-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

.view-toggle-btn {
  padding: 0.5rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  color: var(--text-secondary);
  font-weight: 500;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-toggle-btn:hover {
  border-color: var(--accent-400);
  background: var(--accent-50);
  color: var(--accent-500);
}

:root.dark .view-toggle-btn:hover {
  background: var(--accent-900);
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-primary);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: var(--accent-400);
  background: var(--accent-50);
  color: var(--accent-600);
  transform: translateY(-2px);
}

:root.dark .category-btn:hover {
  background: var(--accent-900);
  color: var(--accent-400);
}

.category-btn-active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--accent-500);
  box-shadow: var(--shadow-glow);
}

.category-btn-active:hover {
  background: linear-gradient(135deg, var(--accent-600), var(--accent-500));
  color: white;
  transform: translateY(-2px) scale(1.02);
}

/* ==================== SKILLS CONTAINER ==================== */
.skills-container {
  margin-bottom: 3rem;
}

.skills-grid {
  display: grid;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.skills-grid-mode {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .skills-grid-mode {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .skills-grid-mode {
    grid-template-columns: repeat(3, 1fr);
  }
}

.skills-list-mode {
  grid-template-columns: 1fr;
}

.skill-item {
  animation: fadeInUp 0.5s ease-out backwards;
}

/* ==================== EMPTY STATE ==================== */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-card);
  border: 2px dashed var(--border-primary);
  border-radius: 1.5rem;
  transition: all 0.3s ease;
}

.empty-icon {
  width: 5rem;
  height: 5rem;
  margin: 0 auto 1.5rem;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.empty-icon i {
  font-size: 2rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.empty-text {
  font-size: 0.9375rem;
  color: var(--text-tertiary);
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.empty-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-btn:hover {
  background: linear-gradient(135deg, var(--accent-600), var(--accent-500));
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

/* ==================== CTA SECTION MEJORADA ==================== */
.cta-section {
  margin-top: 4rem;
  margin-bottom: 2rem;
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

/* Fondo con gradiente animado */
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
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 70%);
  opacity: 0.5;
}

@keyframes gradientShift {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05) rotate(1deg);
  }
}

/* Patrón de puntos */
.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, var(--accent-300) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: 0.15;
}

:root.dark .cta-pattern {
  background-image: radial-gradient(circle at 2px 2px, var(--accent-500) 1px, transparent 0);
  opacity: 0.08;
}

/* ==================== ELEMENTOS FLOTANTES ==================== */
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
  transition: background 0.3s ease;
}

.floating-icon i {
  font-size: 1.25rem;
  color: var(--accent-500);
}

.floating-1 {
  top: 15%;
  left: 8%;
  animation-delay: 0s;
}

.floating-2 {
  top: 20%;
  right: 12%;
  animation-delay: -1s;
  width: 42px;
  height: 42px;
}

.floating-2 i {
  font-size: 1.125rem;
  color: var(--warning);
}

.floating-3 {
  bottom: 25%;
  left: 5%;
  animation-delay: -2s;
  width: 38px;
  height: 38px;
}

.floating-3 i {
  font-size: 1rem;
  color: var(--accent-400);
}

.floating-4 {
  bottom: 18%;
  right: 8%;
  animation-delay: -3s;
}

.floating-4 i {
  color: #a855f7;
}

.floating-5 {
  top: 55%;
  right: 5%;
  animation-delay: -4s;
  width: 34px;
  height: 34px;
}

.floating-5 i {
  font-size: 0.875rem;
  color: var(--warning);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(3deg);
  }
  75% {
    transform: translateY(8px) rotate(-3deg);
  }
}

/* Formas geométricas decorativas */
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

:root.dark .shape-1,
:root.dark .shape-2,
:root.dark .shape-3 {
  opacity: 0.2;
}

@keyframes floatShape {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(10px, -15px) scale(1.05);
  }
  66% {
    transform: translate(-5px, 10px) scale(0.95);
  }
}

/* ==================== CONTENIDO CTA ==================== */
.cta-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 480px;
  transition: transform 0.3s ease-out;
}

/* Badge superior */
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
  transition: all 0.3s ease;
}

:root.dark .cta-badge {
  border-color: var(--accent-700);
}

.badge-icon {
  font-size: 1rem;
}

/* Icono principal */
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

:root.dark .cta-icon-bg {
  background: linear-gradient(135deg, var(--accent-900) 0%, var(--accent-800) 100%);
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

:root.dark .cta-icon-ring {
  border-color: var(--accent-600);
}

@keyframes spinRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Texto */
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

/* ==================== BOTONES ==================== */
.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  align-items: center;
  margin-bottom: 2rem;
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
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 0.875rem;
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

.cta-button-primary:hover::before {
  opacity: 1;
}

.cta-button-primary span,
.cta-button-primary i {
  position: relative;
  z-index: 1;
}

.cta-button-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.45);
}

.cta-button-primary i {
  font-size: 0.875rem;
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
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 0.875rem;
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button-secondary:hover {
  border-color: var(--accent-500);
  color: var(--accent-500);
  background: var(--accent-50);
  transform: translateY(-2px);
}

:root.dark .cta-button-secondary:hover {
  background: var(--accent-900);
}

.cta-button-secondary i {
  font-size: 1rem;
}

/* ==================== STATS ==================== */
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
  transition: all 0.3s ease;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent-500);
}

.cta-stats .stat-label {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, var(--border-primary), transparent);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
  
  .filter-section {
    padding: 1rem;
  }
  
  .cta-section {
    padding: 2.5rem 1.5rem;
    min-height: auto;
  }
  
  .floating-icon {
    display: none;
  }
  
  .floating-shape {
    opacity: 0.2;
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
  
  .cta-stats {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1.25rem;
  }
  
  .stat-divider {
    display: none;
  }
}

/* ==================== TRANSICIONES DE LISTA ==================== */
.skills-list-move {
  transition: all 0.5s ease;
}

.skills-list-enter-active,
.skills-list-leave-active {
  transition: all 0.3s ease;
}

.skills-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.skills-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
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