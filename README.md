# Documentación Técnica del Portafolio Web Personal

**Autor:** Daniele Dettori
**Curso:** 2º CFGS Desarrollo de Aplicaciones Web (DAW)
**Asignatura:** Diseño de Interfaces Web (DOR)
**Fecha:** Enero 2025

---

## Índice

1. [Introducción](#1-introducción)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Componentes Principales](#4-componentes-principales)
5. [Sistema de Temas (Dark/Light Mode)](#5-sistema-de-temas-darklight-mode)
6. [Internacionalización (i18n)](#6-internacionalización-i18n)
7. [Enrutamiento y Navegación](#7-enrutamiento-y-navegación)
8. [Optimizaciones Realizadas](#8-optimizaciones-realizadas)
9. [Accesibilidad](#9-accesibilidad)
10. [Instalación y Uso](#10-instalación-y-uso)

---

## 1. Introducción

Este documento técnico describe el desarrollo de un portafolio web personal utilizando tecnologías modernas de frontend. El proyecto demuestra competencias en:

- Desarrollo con frameworks JavaScript modernos (Vue 3)
- Gestión de estado con Composition API
- Diseño responsive y accesible
- Implementación de sistemas de diseño con CSS custom properties
- Buenas prácticas de desarrollo web

### Objetivo del Proyecto

Crear un sitio web profesional que presente mi perfil como desarrollador, mis habilidades técnicas, proyectos realizados y experiencia profesional, todo ello con una interfaz moderna, accesible y optimizada.

---

## 2. Stack Tecnológico

### Framework Principal
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js 3** | 3.5.0 | Framework reactivo para construir interfaces de usuario |
| **TypeScript** | 5.6.3 | Tipado estático para mayor robustez del código |
| **Vite** | 5.4.21 | Bundler y servidor de desarrollo ultrarrápido |

### Librerías de UI y Estilos
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Tailwind CSS** | 3.4.19 | Framework de utilidades CSS |
| **PrimeVue** | 4.0.0 | Biblioteca de componentes UI |
| **PrimeFlex** | 3.3.1 | Sistema de grid flexible |
| **PrimeIcons** | 7.0.0 | Iconografía consistente |

### Routing e Internacionalización
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue Router** | 4.5.0 | Navegación SPA (Single Page Application) |
| **Vue I18n** | 9.14.0 | Soporte multiidioma |

### Justificación de Elecciones

**¿Por qué Vue 3 con Composition API?**
- Mejor organización del código por funcionalidad (no por opciones)
- Reutilización de lógica mediante composables
- Mejor soporte para TypeScript
- Menor curva de aprendizaje comparado con otras alternativas

**¿Por qué Tailwind CSS?**
- Desarrollo rápido con clases de utilidad
- Consistencia en el diseño
- Purga automática de CSS no utilizado (menor bundle)
- Fácil personalización mediante `tailwind.config.js`

**¿Por qué Vite?**
- Inicio instantáneo del servidor de desarrollo (ESM nativo)
- Hot Module Replacement (HMR) ultrarrápido
- Configuración mínima
- Optimización automática para producción

---

## 3. Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── assets/                 # Recursos estáticos
│   ├── css/
│   │   └── themes.css      # Variables CSS para temas
│   └── profile.png         # Imagen de perfil
│
├── components/             # Componentes reutilizables
│   ├── AppNav.vue          # Navegación principal
│   ├── PageHeader.vue      # Cabeceras de sección
│   ├── TarjetaProyecto.vue # Card de proyecto
│   ├── TarjetaHabilidad.vue# Card de habilidad
│   ├── CtaSection.vue      # Sección Call-to-Action reutilizable
│   └── ThemeToggle.vue     # Interruptor de tema
│
├── composables/            # Lógica reutilizable
│   └── useTheme.ts         # Gestión del tema claro/oscuro
│
├── data/                   # Datos estáticos
│   └── cv.json             # Información del CV
│
├── locales/                # Traducciones
│   └── es.json             # Textos en español
│
├── plugins/                # Plugins de Vue
│   └── i18n.ts             # Configuración de internacionalización
│
├── router/                 # Configuración de rutas
│   └── index.ts            # Definición de rutas
│
├── styles/                 # Estilos globales
│   └── app.css             # Tailwind + animaciones custom
│
├── types/                  # Definiciones TypeScript
│   └── portfolio.ts        # Interfaces del proyecto
│
├── utils/                  # Utilidades
│   └── throttle.ts         # Funciones throttle/debounce
│
├── views/                  # Vistas/Páginas
│   ├── WelcomeView.vue     # Pantalla de bienvenida
│   ├── HomeView.vue        # Página principal
│   ├── AboutView.vue       # Sobre mí
│   ├── SkillsView.vue      # Habilidades
│   ├── ProjectsView.vue    # Proyectos
│   ├── ExperienceView.vue  # Experiencia
│   └── ContactView.vue     # Contacto
│
├── App.vue                 # Componente raíz
└── main.ts                 # Punto de entrada
```

### Patrón de Diseño: Composición sobre Herencia

Vue 3 Composition API permite organizar el código por **funcionalidad** en lugar de por tipo de opción:

```typescript
// Composable: useTheme.ts
export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')
  const isDark = computed(() => theme.value === 'dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }

  return { theme, isDark, toggleTheme }
}
```

Este composable se puede usar en cualquier componente:

```typescript
// En cualquier componente
const { isDark, toggleTheme } = useTheme()
```

---

## 4. Componentes Principales

### 4.1 AppNav.vue - Navegación Principal

**Responsabilidades:**
- Navegación desktop con indicador animado
- Menú móvil con panel deslizante
- Toggle de tema integrado
- Detección de scroll para efectos visuales

**Características técnicas:**

```vue
<script setup lang="ts">
// Uso del composable de tema
const { isDark, toggleTheme } = useTheme()

// Detección de scroll con passive listener (mejor rendimiento)
window.addEventListener('scroll', handleScroll, { passive: true })

// Indicador de navegación animado
const indicatorStyle = computed(() => {
  const el = navRefs.value[activeIndex.value]
  return {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`
  }
})
</script>
```

**Accesibilidad implementada:**
- `role="navigation"` y `aria-label` para lectores de pantalla
- `aria-current="page"` en el enlace activo
- Soporte completo de teclado (Escape cierra menú)
- Focus trap en el menú móvil

### 4.2 TarjetaHabilidad.vue - Card de Habilidad

**Sistema de niveles:**

```typescript
const getLevelCategory = () => {
  const level = props.skill.level
  if (level < 40) return 'basico'      // Verde
  if (level < 65) return 'intermedio'  // Azul
  if (level < 85) return 'avanzado'    // Amarillo
  return 'experto'                      // Rojo
}
```

**Efecto de spotlight con mouse (optimizado con throttle):**

```typescript
import { throttle } from '@/utils/throttle'

const handleMouseMove = throttle((e: MouseEvent) => {
  const rect = card.getBoundingClientRect()
  mousePos.x = ((e.clientX - rect.left) / rect.width) * 100
  mousePos.y = ((e.clientY - rect.top) / rect.height) * 100
}, 16) // ~60fps
```

### 4.3 CtaSection.vue - Call-to-Action Reutilizable

Componente creado para eliminar duplicación de código:

```vue
<template>
  <section class="cta-section">
    <div class="cta-icon">
      <i :class="icon"></i>
    </div>
    <div class="cta-text">
      <span v-if="badge" class="cta-badge">{{ badge }}</span>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="cta-actions">
      <RouterLink v-if="primaryAction" :to="primaryAction.to">
        {{ primaryAction.label }}
      </RouterLink>
    </div>
  </section>
</template>
```

---

## 5. Sistema de Temas (Dark/Light Mode)

### Arquitectura del Sistema

El sistema de temas se basa en **CSS Custom Properties** (variables CSS) que cambian según la clase del documento raíz:

```css
/* themes.css - Tema claro (por defecto) */
:root {
  --bg-body: #fafafa;
  --bg-card: #ffffff;
  --text-primary: #1a1a2e;
  --accent-500: #f97316;
}

/* Tema oscuro */
:root.dark {
  --bg-body: #0a0a0f;
  --bg-card: #12121a;
  --text-primary: #f8fafc;
  --accent-500: #fb923c;
}
```

### Composable useTheme (con limpieza de memoria)

```typescript
// composables/useTheme.ts
let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null
let mediaQuery: MediaQueryList | null = null

const cleanup = () => {
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
    mediaQueryListener = null
    mediaQuery = null
  }
}

export function useTheme() {
  const initTheme = () => {
    cleanup() // Limpiar listeners anteriores

    const saved = localStorage.getItem('theme')
    if (saved) {
      theme.value = saved as 'light' | 'dark'
    } else {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      theme.value = mediaQuery.matches ? 'dark' : 'light'

      mediaQueryListener = (e) => {
        if (!localStorage.getItem('theme')) {
          theme.value = e.matches ? 'dark' : 'light'
          applyTheme()
        }
      }
      mediaQuery.addEventListener('change', mediaQueryListener)
    }
    applyTheme()
  }

  return { theme, isDark, toggleTheme, initTheme, cleanup }
}
```

---

## 6. Internacionalización (i18n)

### Configuración

```typescript
// plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import es from '@/locales/es.json'

export default createI18n({
  legacy: false,        // Composition API mode
  locale: 'es',
  fallbackLocale: 'es',
  messages: { es }
})
```

### Uso en Componentes

```vue
<script setup>
const { t, tm } = useI18n()
// t() para strings simples
// tm() para objetos/arrays
</script>

<template>
  <h1>{{ t('home.greeting') }}</h1>
  <div v-for="skill in tm('skills.cards')">
    {{ skill.name }}
  </div>
</template>
```

---

## 7. Enrutamiento y Navegación

### Configuración de Rutas

```typescript
// router/index.ts
const routes = [
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/WelcomeView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  // ... más rutas
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})
```

### Guard de Navegación - Primera Visita

```typescript
router.beforeEach((to, from, next) => {
  const hasVisited = sessionStorage.getItem('hasVisited')

  if (!hasVisited && to.path !== '/welcome') {
    sessionStorage.setItem('hasVisited', 'true')
    next('/welcome')
  } else {
    next()
  }
})
```

---

## 8. Optimizaciones Realizadas

### 8.1 Eliminación de Código Duplicado

| Problema | Solución |
|----------|----------|
| PrimeVue registrado dos veces en `main.ts` | Consolidado en una sola llamada `app.use()` |
| Lógica de tema duplicada en `AppNav.vue` | Usar composable `useTheme` |
| Google Fonts + @fontsource | Eliminado Google Fonts (usa solo @fontsource) |
| CTAs duplicadas en varias vistas | Creado componente `CtaSection.vue` reutilizable |
| Animaciones CSS duplicadas | Consolidadas en `app.css` |

### 8.2 Eliminación de Código No Utilizado

- `BackgroundDecor.vue`: Componente eliminado (no se usaba)
- `scrollProgress` en `App.vue`: Estado eliminado (no se renderizaba)
- `isHovered` en `TarjetaHabilidad.vue`: Estado eliminado (no se usaba)

### 8.3 Mejoras de Rendimiento

```typescript
// Throttle para eventos de mouse (evita sobrecarga)
import { throttle } from '@/utils/throttle'

const handleMouseMove = throttle((e: MouseEvent) => {
  // Actualizar posición cada 16ms máximo (~60fps)
}, 16)

// Event listeners con passive: true
window.addEventListener('scroll', handleScroll, { passive: true })

// Limpieza de event listeners (prevención de memory leaks)
onUnmounted(() => {
  cleanup()
})
```

### 8.4 Bundle Size

La optimización reduce:
- Una petición HTTP externa (Google Fonts eliminado)
- ~15-20KB de CSS no necesario
- Mejor tiempo de First Contentful Paint (FCP)

---

## 9. Accesibilidad

### Estándares Implementados (WCAG 2.1)

#### Semántica HTML

```html
<main role="main">
  <section aria-labelledby="skills-title">
    <h2 id="skills-title">Habilidades</h2>
  </section>
</main>

<nav role="navigation" aria-label="Navegación principal">
  <a aria-current="page">Inicio</a>
</nav>
```

#### Navegación por Teclado

```typescript
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}
```

#### Soporte para Movimiento Reducido

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Indicadores de Foco Visibles

```css
:focus-visible {
  outline: 3px solid var(--accent-400);
  outline-offset: 2px;
}
```

---

## 10. Instalación y Uso

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/dettriva/dor-project.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

### Personalización

- Cambia textos y arrays en:
  - `src/data/cv.json`
  - `src/locales/es.json` (proyectos/habilidades)
- Sustituye:
  - `src/assets/profile.png` por tu foto
  - `public/cv.pdf` por tu CV real

---

## Conclusión

Este portafolio demuestra competencias en:

1. **Desarrollo Frontend Moderno**: Vue 3, TypeScript, Composition API
2. **Diseño de Sistemas**: CSS Custom Properties, temas dinámicos
3. **UX/UI**: Animaciones, responsive design, micro-interacciones
4. **Accesibilidad**: WCAG 2.1, semántica HTML, navegación por teclado
5. **Optimización**: Lazy loading, eliminación de código muerto, rendimiento
6. **Buenas Prácticas**: Código limpio, separación de responsabilidades, tipado

---

**Repositorio:** [GitHub - dettriva/dor-project](https://github.com/dettriva/dor-project)

---

*Documento generado para la asignatura DOR - 2º DAW*
