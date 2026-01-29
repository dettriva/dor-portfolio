<template>
  <div class="navbar-wrapper">
    <nav 
      class="navbar" 
      :class="{ 'navbar-scrolled': isScrolled }"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div class="navbar-container">
        
        <!-- ==================== LOGO ==================== -->
        <RouterLink to="/" class="navbar-logo" aria-label="Inicio">
          <div class="logo-mark">
            <span class="logo-bracket">{</span>
            <span class="logo-letter">DD</span>
            <span class="logo-bracket">}</span>
          </div>
        </RouterLink>

        <!-- ==================== NAV DESKTOP ==================== -->
        <div class="navbar-center">
          <div class="nav-pills" role="menubar">
            <!-- Indicador flotante -->
            <div 
              class="nav-indicator" 
              :style="indicatorStyle"
              aria-hidden="true"
            ></div>
            
            <!-- Items -->
            <RouterLink
              v-for="(item, index) in navItems"
              :key="item.route"
              :to="item.route"
              class="nav-pill"
              :class="{ 'nav-pill-active': isActive(item.route) }"
              :ref="el => setNavRef(el, index)"
              role="menuitem"
              :aria-current="isActive(item.route) ? 'page' : undefined"
              @mouseenter="handleHover(index)"
              @mouseleave="handleHoverEnd"
            >
              <span class="pill-text">{{ item.label }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- ==================== ACTIONS ==================== -->
        <div class="navbar-end">
          <!-- Theme Toggle Switch -->
          <button 
            class="theme-switch"
            @click="toggleTheme"
            :class="{ 'is-dark': isDark }"
            :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
            role="switch"
            :aria-checked="isDark"
          >
            <span class="switch-track">
              <!-- Estrellas (modo oscuro) -->
              <span class="switch-stars">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <!-- Nubes (modo claro) -->
              <span class="switch-clouds">
                <span></span>
                <span></span>
              </span>
              <!-- Thumb con icono -->
              <span class="switch-thumb">
                <i class="pi pi-sun thumb-sun"></i>
                <i class="pi pi-moon thumb-moon"></i>
              </span>
            </span>
          </button>

          <!-- CTA Desktop -->
          <RouterLink 
            to="/contacto" 
            class="nav-cta"
            :class="{ 'nav-cta-active': isActive('/contacto') }"
          >
            <span class="cta-content">
              <span class="cta-label">Contactar</span>
              <i class="pi pi-arrow-up-right"></i>
            </span>
            <span class="cta-bg"></span>
          </RouterLink>

          <!-- Mobile Menu Button -->
          <button
            class="menu-trigger"
            @click="openMenu"
            aria-label="Abrir menú de navegación"
            aria-haspopup="true"
            :aria-expanded="isMenuOpen"
          >
            <span class="trigger-icon">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- ==================== MOBILE MENU ==================== -->
    <Teleport to="body">
      <!-- Overlay -->
      <Transition name="overlay">
        <div 
          v-if="isMenuOpen" 
          class="menu-overlay"
          @click="closeMenu"
          aria-hidden="true"
        ></div>
      </Transition>

      <!-- Panel -->
      <Transition name="panel">
        <aside 
          v-if="isMenuOpen"
          class="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <!-- Header -->
          <header class="panel-header">
            <div class="panel-brand">
              <div class="brand-mark">
                <span>{</span>
                <span>DD</span>
                <span>}</span>
              </div>
              <span class="brand-label">Navegación</span>
            </div>
            <button 
              class="panel-close"
              @click="closeMenu"
              aria-label="Cerrar menú"
              ref="closeButtonRef"
            >
              <i class="pi pi-times"></i>
            </button>
          </header>

          <!-- Navigation -->
          <nav class="panel-nav" role="navigation">
            <ul class="panel-list" role="menu">
              <li v-for="(item, index) in navItems" :key="item.route">
                <RouterLink
                  :to="item.route"
                  class="panel-link"
                  :class="{ 'panel-link-active': isActive(item.route) }"
                  @click="handleNavClick(item.route)"
                  role="menuitem"
                  :style="{ '--delay': `${index * 0.05}s` }"
                >
                  <span class="link-index">0{{ index + 1 }}</span>
                  <span class="link-content">
                    <span class="link-label">{{ item.label }}</span>
                    <span class="link-desc">{{ item.description }}</span>
                  </span>
                  <span class="link-arrow">
                    <i class="pi pi-arrow-right"></i>
                  </span>
                </RouterLink>
              </li>
            </ul>
          </nav>

          <!-- CTA -->
          <div class="panel-cta">
            <RouterLink 
              to="/contacto" 
              class="cta-card"
              @click="handleNavClick('/contacto')"
            >
              <div class="cta-card-content">
                <div class="cta-card-icon">
                  <i class="pi pi-envelope"></i>
                </div>
                <div class="cta-card-text">
                  <span class="cta-card-title">¿Tienes un proyecto?</span>
                  <span class="cta-card-subtitle">Hablemos de tu idea</span>
                </div>
              </div>
              <div class="cta-card-action">
                <i class="pi pi-arrow-up-right"></i>
              </div>
            </RouterLink>
          </div>

          <!-- Footer -->
          <footer class="panel-footer">
            <div class="footer-socials">
              <a 
                v-for="social in socials" 
                :key="social.name"
                :href="social.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-link"
                :aria-label="social.name"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
            <p class="footer-copy">© {{ currentYear }} Daniele Dettori. Todos los derechos reservados.</p>
          </footer>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

// ==================== STATE ====================
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const hoveredIndex = ref<number | null>(null)
const activeIndex = ref(0)
const navRefs = ref<(HTMLElement | null)[]>([])
const closeButtonRef = ref<HTMLElement | null>(null)
const currentYear = new Date().getFullYear()

// ==================== NAV ITEMS ====================
const navItems = computed(() => [
  { label: t('nav.home'), route: '/', description: 'Página principal' },
  { label: t('nav.about'), route: '/sobre-mi', description: 'Conóceme mejor' },
  { label: t('nav.skills'), route: '/habilidades', description: 'Stack tecnológico' },
  { label: t('nav.projects'), route: '/proyectos', description: 'Trabajos realizados' },
  { label: t('nav.experience'), route: '/experiencia', description: 'Mi trayectoria' }
])

const socials = [
  { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com/Pepepe14' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://www.linkedin.com/in/daniele-dettori-47463a337/' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' }
]

// ==================== COMPUTED ====================
const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const indicatorStyle = computed(() => {
  const index = hoveredIndex.value !== null ? hoveredIndex.value : activeIndex.value
  const el = navRefs.value[index]
  
  if (!el) return { opacity: 0 }
  
  return {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
    opacity: 1
  }
})

// ==================== METHODS ====================
const setNavRef = (el: any, index: number) => {
  if (el) navRefs.value[index] = el.$el || el
}

const handleHover = (index: number) => {
  hoveredIndex.value = index
}

const handleHoverEnd = () => {
  hoveredIndex.value = null
}

const updateActiveIndex = () => {
  const index = navItems.value.findIndex(item => isActive(item.route))
  if (index !== -1) activeIndex.value = index
}

const openMenu = () => {
  isMenuOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    closeButtonRef.value?.focus()
  })
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleNavClick = (path: string) => {
  closeMenu()
  if (route.path !== path) {
    router.push(path)
  }
}

// ==================== SCROLL HANDLING ====================
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// ==================== KEYBOARD ====================
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

// ==================== LIFECYCLE ====================
onMounted(() => {
  // Scroll
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)

  // Initial state
  handleScroll()
  updateActiveIndex()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

// Watch route changes
watch(() => route.path, () => {
  updateActiveIndex()
})
</script>

<style scoped>
/* ==================== VARIABLES ==================== */
.navbar-wrapper {
  --nav-height: 80px;
  --nav-bg: rgba(255, 255, 255, 0.85);
  --nav-border: rgba(0, 0, 0, 0.06);
}

:root.dark .navbar-wrapper {
  --nav-bg: rgba(15, 15, 20, 0.9);
  --nav-border: rgba(255, 255, 255, 0.08);
}

/* ==================== NAVBAR ==================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  padding-top: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 0.4s ease;
}

.navbar-scrolled::before {
  border-bottom-color: var(--nav-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

:root.dark .navbar-scrolled::before {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.navbar-container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .navbar-container {
    padding: 0 1.5rem;
  }
}

/* ==================== LOGO ==================== */
.navbar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar-logo:hover {
  transform: translateY(-2px);
}

.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: var(--gradient-primary);
  border-radius: 14px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 700;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.navbar-logo:hover .logo-mark {
  transform: rotate(-5deg) scale(1.05);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.logo-bracket {
  font-size: 1rem;
  opacity: 0.7;
}

.logo-letter {
  font-size: 1.25rem;
  margin: 0 1px;
}

/* ==================== NAV CENTER ==================== */
.navbar-center {
  display: none;
}

@media (min-width: 1024px) {
  .navbar-center {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}

.nav-pills {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 100px;
  transition: all 0.3s ease;
}

.nav-indicator {
  position: absolute;
  top: 0.375rem;
  left: 0;
  height: calc(100% - 0.75rem);
  background: var(--gradient-primary);
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.nav-pill {
  position: relative;
  z-index: 1;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 100px;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-pill:hover {
  color: var(--text-primary);
}

.nav-pill-active {
  color: white !important;
}

.nav-pill-active:hover {
  color: white !important;
}

.pill-text {
  position: relative;
  z-index: 1;
}

/* ==================== NAV END ==================== */
.navbar-end {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Theme Switch */
.theme-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.switch-track {
  position: relative;
  width: 64px;
  height: 32px;
  background: linear-gradient(135deg, #54a0ff, #48dbfb, #0abde3);
  border-radius: 100px;
  transition: background 0.5s ease;
  overflow: hidden;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(84, 160, 255, 0.3);
}

.theme-switch.is-dark .switch-track {
  background: linear-gradient(135deg, #1e3a5f, #2c3e50, #1a252f);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(30, 58, 95, 0.4);
}

/* Estrellas */
.switch-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.switch-stars span {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s ease 0.1s;
}

.switch-stars span:nth-child(1) {
  top: 9px;
  left: 14px;
  width: 2px;
  height: 2px;
}

.switch-stars span:nth-child(2) {
  top: 19px;
  left: 9px;
  width: 3px;
  height: 3px;
}

.switch-stars span:nth-child(3) {
  top: 11px;
  left: 24px;
  width: 2px;
  height: 2px;
}

.theme-switch.is-dark .switch-stars span {
  opacity: 1;
  transform: scale(1);
  animation: twinkle 2s ease-in-out infinite;
}

.theme-switch.is-dark .switch-stars span:nth-child(2) {
  animation-delay: 0.5s;
}

.theme-switch.is-dark .switch-stars span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Nubes */
.switch-clouds {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.switch-clouds span {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 100px;
  transition: all 0.4s ease;
}

.switch-clouds span:nth-child(1) {
  width: 18px;
  height: 9px;
  top: 7px;
  right: 9px;
  opacity: 1;
}

.switch-clouds span:nth-child(2) {
  width: 13px;
  height: 7px;
  top: 17px;
  right: 15px;
  opacity: 0.7;
}

.theme-switch.is-dark .switch-clouds span {
  opacity: 0;
  transform: translateX(10px);
}

/* Thumb */
.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  background: linear-gradient(145deg, #fff5cd, #ffd93d, #f9ca24);
  border-radius: 50%;
  box-shadow: 
    0 2px 10px rgba(249, 202, 36, 0.5),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.8);
  transition: 
    transform 0.5s cubic-bezier(0.68, -0.2, 0.32, 1.2),
    background 0.4s ease,
    box-shadow 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.theme-switch.is-dark .switch-thumb {
  transform: translateX(32px);
  background: linear-gradient(145deg, #f5f6fa, #dfe6e9, #b2bec3);
  box-shadow: 
    0 2px 10px rgba(178, 190, 195, 0.5),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
}

/* Iconos dentro del thumb */
.thumb-sun,
.thumb-moon {
  position: absolute;
  font-size: 0.9375rem;
  transition: all 0.4s cubic-bezier(0.68, -0.2, 0.32, 1.2);
}

.thumb-sun {
  color: #e67e22;
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.thumb-moon {
  color: #576574;
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-switch.is-dark .thumb-sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.theme-switch.is-dark .thumb-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* Hover effect */
.theme-switch:hover .switch-thumb {
  box-shadow: 
    0 4px 15px rgba(249, 202, 36, 0.6),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.theme-switch.is-dark:hover .switch-thumb {
  box-shadow: 
    0 4px 15px rgba(178, 190, 195, 0.6),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.9);
  transform: translateX(32px) scale(1.05);
}

/* Active/Click effect */
.theme-switch:active .switch-thumb {
  transform: scale(0.95);
}

.theme-switch.is-dark:active .switch-thumb {
  transform: translateX(32px) scale(0.95);
}

/* CTA Button */
.nav-cta {
  display: none;
  position: relative;
  overflow: hidden;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .nav-cta {
    display: flex;
  }
}

.cta-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.cta-content i {
  font-size: 0.75rem;
  color: white;
  transition: transform 0.3s ease;
}

.nav-cta:hover .cta-content i {
  transform: translate(2px, -2px);
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  transition: all 0.3s ease;
}

.nav-cta:hover .cta-bg {
  transform: scale(1.05);
}

.nav-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-400), var(--accent-600));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.nav-cta:hover::before {
  opacity: 1;
}

/* Menu Trigger */
.menu-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .menu-trigger {
    display: none;
  }
}

.menu-trigger:hover {
  background: var(--accent-50);
  border-color: var(--accent-400);
}

:root.dark .menu-trigger:hover {
  background: rgba(249, 115, 22, 0.1);
}

.trigger-icon {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 18px;
}

.trigger-icon span {
  display: block;
  height: 2px;
  background: var(--accent-500);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.trigger-icon span:first-child {
  width: 100%;
}

.trigger-icon span:last-child {
  width: 60%;
}

.menu-trigger:hover .trigger-icon span:last-child {
  width: 100%;
}

/* ==================== MOBILE OVERLAY ==================== */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9998;
}

:root.dark .menu-overlay {
  background: rgba(0, 0, 0, 0.8);
}

/* ==================== MOBILE PANEL ==================== */
.menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 380px;
  background: var(--bg-primary);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.15);
}

:root.dark .menu-panel {
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
}

/* Panel Header */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-secondary);
}

.panel-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: var(--gradient-primary);
  border-radius: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.8125rem;
  color: white;
}

.brand-mark span:first-child,
.brand-mark span:last-child {
  opacity: 0.7;
  font-size: 0.6875rem;
}

.brand-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.panel-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.panel-close:hover {
  background: var(--accent-50);
  border-color: var(--accent-400);
}

:root.dark .panel-close:hover {
  background: rgba(249, 115, 22, 0.1);
}

.panel-close i {
  font-size: 1rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.panel-close:hover i {
  color: var(--accent-500);
}

/* Panel Nav */
.panel-nav {
  flex: 1;
  padding: 1.5rem;
}

.panel-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.panel-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid transparent;
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: linkEnter 0.4s ease-out backwards;
  animation-delay: var(--delay);
}

@keyframes linkEnter {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
}

.panel-link:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-200);
  transform: translateX(4px);
}

:root.dark .panel-link:hover {
  border-color: var(--accent-700);
}

.panel-link-active {
  background: var(--accent-50);
  border-color: var(--accent-200);
}

:root.dark .panel-link-active {
  background: rgba(249, 115, 22, 0.1);
  border-color: var(--accent-600);
}

.link-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--accent-500);
  opacity: 0.6;
}

.panel-link-active .link-index {
  opacity: 1;
}

.link-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.link-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.panel-link-active .link-label {
  color: var(--accent-600);
}

:root.dark .panel-link-active .link-label {
  color: var(--accent-400);
}

.link-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.link-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--bg-card);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.link-arrow i {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.panel-link:hover .link-arrow {
  background: var(--accent-500);
}

.panel-link:hover .link-arrow i {
  color: white;
  transform: translateX(2px);
}

.panel-link-active .link-arrow {
  background: var(--accent-100);
}

:root.dark .panel-link-active .link-arrow {
  background: rgba(249, 115, 22, 0.2);
}

.panel-link-active .link-arrow i {
  color: var(--accent-500);
}

/* Panel CTA */
.panel-cta {
  padding: 0 1.5rem;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: var(--gradient-primary);
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
}

.cta-card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cta-card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.cta-card-icon i {
  font-size: 1.25rem;
  color: white;
}

.cta-card-title {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: white;
}

.cta-card-subtitle {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.cta-card-action {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.cta-card-action i {
  font-size: 0.875rem;
  color: white;
  transition: transform 0.3s ease;
}

.cta-card:hover .cta-card-action {
  background: rgba(255, 255, 255, 0.3);
}

.cta-card:hover .cta-card-action i {
  transform: translate(2px, -2px);
}

/* Panel Footer */
.panel-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border-secondary);
  margin-top: auto;
}

.footer-socials {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
}

.social-link i {
  font-size: 1.125rem;
}

.footer-copy {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  margin: 0;
}

/* ==================== ANIMATIONS ==================== */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.panel-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 480px) {
  .menu-panel {
    max-width: 100%;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar::before,
  .logo-mark,
  .nav-indicator,
  .nav-pill,
  .nav-cta,
  .menu-trigger,
  .panel-link,
  .cta-card,
  .social-link,
  .switch-thumb,
  .switch-track,
  .switch-stars span,
  .switch-clouds span,
  .thumb-sun,
  .thumb-moon {
    transition: none !important;
    animation: none !important;
  }
}

:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 2px;
}

.nav-pill:focus-visible,
.menu-trigger:focus-visible,
.panel-close:focus-visible,
.theme-switch:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 2px;
}

.theme-switch:focus-visible {
  border-radius: 100px;
}
</style>