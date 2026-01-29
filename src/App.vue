<template>
  <!-- PANTALLA DE CARGA INICIAL -->
  <div 
    v-if="!isReady" 
    class="initial-loader"
    :class="{ 'fade-out': isFading }"
  >
    <div class="loader-spinner"></div>
  </div>

  <div v-show="isReady" class="app-wrapper theme-transition">
    <!-- Fondo decorativo -->
    <div v-if="!isWelcomePage" class="app-bg-decoration">
      <div class="bg-blob blob-1"></div>
      <div class="bg-blob blob-2"></div>
      <div class="bg-blob blob-3"></div>
    </div>

    <!-- Contenedor principal -->
    <div class="relative flex flex-col min-h-screen">
      
      <!-- ===== HEADER ===== -->
      <header v-if="!isWelcomePage" class="app-header theme-transition">
        <div class="mx-auto px-4 sm:px-6 max-w-app">
          <div class="header-inner">
            <AppNav />
            
            <!-- Acciones del header (Theme Toggle) -->
            <div class="header-actions">
              <ThemeToggle />
            </div>
          </div>
        </div>
        

      </header>

      <!-- ===== MAIN ===== -->
      <main :class="isWelcomePage ? '' : 'flex-1 px-4 sm:px-6 py-6 sm:py-8'">
        <div :class="isWelcomePage ? '' : 'mx-auto max-w-app'">
          <RouterView v-slot="{ Component }">
            <transition name="page-fade" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </transition>
          </RouterView>
        </div>
      </main>

      <!-- ===== FOOTER ===== -->
      <footer v-if="!isWelcomePage" class="app-footer theme-transition" role="contentinfo">
        <div class="footer-top-line"></div>

        <div class="footer-content">
          <!-- Navegación central -->
          <nav class="footer-nav" aria-label="Navegación del footer">
            <div class="nav-title">
              <span class="nav-line"></span>
              <span class="nav-text">Explora</span>
              <span class="nav-line"></span>
            </div>
            <ul class="nav-links">
              <li v-for="link in navLinks" :key="link.route">
                <RouterLink :to="link.route" class="nav-link theme-transition">
                  <span class="nav-link-icon">
                    <i :class="link.icon"></i>
                  </span>
                  <span>{{ link.label }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>

          <!-- Brand + Social -->
          <div class="footer-brand">
            <div class="brand-main">
              <div class="brand-logo theme-transition">
                <span class="bracket">{</span>
                <span class="initials">{{ getInitials() }}</span>
                <span class="bracket">}</span>
              </div>
              <div class="brand-info">
                <span class="brand-name">{{ cv.name || 'Developer' }}</span>
                <span class="brand-title">{{ cv.title || 'Full Stack Developer' }}</span>
              </div>
            </div>

            <div class="social-section">
              <div class="social-label">Conectemos</div>
              <div class="social-links">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-link theme-transition"
                  :aria-label="social.name"
                >
                  <i :class="social.icon"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="footer-bottom">
            <span class="copyright">
              © {{ new Date().getFullYear() }} · Crafted with
              <span class="emoji">❤️</span>
              & lots of
              <span class="emoji">☕</span>
            </span>
            
            <div class="tech-badges">
              <span class="badge badge-vue"><i class="pi pi-bolt"></i> Vue 3</span>
              <span class="badge badge-ts"><i class="pi pi-code"></i> TypeScript</span>
              <span class="badge badge-tw"><i class="pi pi-palette"></i> Tailwind</span>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <!-- Toast -->
    <Toast position="bottom-right" class="mb-16" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Toast from 'primevue/toast'
import AppNav from '@/components/AppNav.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useTheme } from '@/composables/useTheme'
import cvRaw from '@/data/cv.json'

const { t } = useI18n()
const route = useRoute()
const { initTheme } = useTheme()

// Estado de carga
const isReady = ref(false)
const isFading = ref(false)

const cv = ref(cvRaw)

const isWelcomePage = computed(() => route.path === '/welcome')

const getInitials = () => {
  const name = cv.value.name || 'Dev'
  return name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
}

const navLinks = computed(() => ([
  { label: t('nav.home'), icon: 'pi pi-home', route: '/' },
  { label: t('nav.about'), icon: 'pi pi-user', route: '/sobre-mi' },
  { label: t('nav.skills'), icon: 'pi pi-bolt', route: '/habilidades' },
  { label: t('nav.projects'), icon: 'pi pi-folder', route: '/proyectos' },
  { label: t('nav.experience'), icon: 'pi pi-briefcase', route: '/experiencia' },
  { label: t('nav.contact'), icon: 'pi pi-envelope', route: '/contacto' },
]))

const socialLinks = [
  { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com/Pepepe14' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://www.linkedin.com/in/daniele-dettori-47463a337/' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
  { name: 'Email', icon: 'pi pi-at', url: 'mailto:danieledtt06@gmail.com' },
]


watch(() => route.path, () => {
  if (!isReady.value) {
    setTimeout(() => {
      isFading.value = true
      setTimeout(() => {
        isReady.value = true
      }, 300)
    }, 50)
  }
}, { immediate: true })

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
/* ==================== LOADER ==================== */
.initial-loader {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  background: #050508;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.initial-loader.fade-out {
  opacity: 0;
  pointer-events: none;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(249, 115, 22, 0.15);
  border-top-color: #f97316;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ==================== APP WRAPPER ==================== */
.app-wrapper {
  min-height: 100vh;
  background: var(--bg-body);
}

/* ==================== FONDOS DECORATIVOS ==================== */
.app-bg-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  transition: opacity 0.5s ease;
}

.blob-1 {
  top: -8rem;
  right: -8rem;
  width: 20rem;
  height: 20rem;
  background: var(--accent-500);
  opacity: 0.06;
}

.blob-2 {
  bottom: -8rem;
  left: -8rem;
  width: 18rem;
  height: 18rem;
  background: var(--accent-400);
  opacity: 0.05;
}

.blob-3 {
  top: 30%;
  left: 20%;
  width: 12rem;
  height: 12rem;
  background: var(--accent-300);
  opacity: 0.04;
}

/* ==================== HEADER ==================== */
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--header-bg);
  backdrop-filter: var(--backdrop-blur);
  border-bottom: 1px solid var(--border-secondary);
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  gap: 1rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ==================== PAGE TRANSITIONS ==================== */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-enter-from { opacity: 0; transform: translateY(8px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ==================== FOOTER ==================== */
.app-footer {
  margin-top: auto;
  background: var(--footer-bg);
}

.footer-top-line {
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--accent-300) 20%, 
    var(--accent-500) 50%, 
    var(--accent-300) 80%, 
    transparent 100%
  );
  opacity: 0.6;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 1.5rem;
}

/* Footer Nav */
.footer-nav {
  text-align: center;
  margin-bottom: 2.5rem;
}

.nav-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.nav-line {
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-400), transparent);
  opacity: 0.5;
}

.nav-text {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent-500);
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 100px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
}

.nav-link:hover {
  background: var(--accent-50);
  border-color: var(--accent-400);
  color: var(--accent-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.nav-link-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-50);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.nav-link:hover .nav-link-icon {
  background: var(--accent-500);
}

.nav-link-icon i {
  font-size: 0.6rem;
  color: var(--accent-500);
}

.nav-link:hover .nav-link-icon i {
  color: white;
}

/* Footer Brand */
.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-secondary);
  border-bottom: 1px solid var(--border-secondary);
}

@media (min-width: 768px) {
  .footer-brand {
    flex-direction: row;
    justify-content: space-between;
  }
}

.brand-main {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--gradient-subtle);
  border: 1px solid var(--border-primary);
  border-radius: 0.875rem;
}

.brand-logo .bracket {
  font-size: 1.375rem;
  font-weight: 300;
  font-family: 'Monaco', 'Consolas', monospace;
  color: var(--text-muted);
}

.brand-logo .initials {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent-500);
  margin: 0 0.2rem;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.brand-title {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* Social */
.social-section {
  text-align: center;
}

@media (min-width: 768px) {
  .social-section { text-align: right; }
}

.social-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 0.625rem;
  color: var(--text-tertiary);
  text-decoration: none;
}

.social-link:hover {
  background: var(--gradient-primary);
  border-color: var(--accent-500);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.social-link i {
  font-size: 1rem;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.copyright {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.emoji {
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

.emoji:last-child {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 100px;
  font-size: 0.625rem;
  font-weight: 600;
}

.badge i {
  font-size: 0.5rem;
}

.badge-vue {
  background: rgba(66, 184, 131, 0.12);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.25);
}

.badge-ts {
  background: rgba(49, 120, 198, 0.12);
  color: #3178c6;
  border: 1px solid rgba(49, 120, 198, 0.25);
}

.badge-tw {
  background: rgba(56, 189, 248, 0.12);
  color: #0ea5e9;
  border: 1px solid rgba(56, 189, 248, 0.25);
}

/* ==================== TOAST ==================== */
:deep(.p-toast) {
  z-index: 9999;
}

:deep(.p-toast .p-toast-message) {
  backdrop-filter: blur(10px);
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  color: var(--text-primary);
}
</style>