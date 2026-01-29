<template>
  <div v-if="showIntro" class="epic-intro-wrapper" @mousemove="trackMouse">
    
    <!-- Canvas para partículas -->
    <canvas ref="bgCanvas" class="epic-bg-canvas"></canvas>
    
    <!-- Capas de fondo -->
    <div class="epic-bg-layers">
      <div class="epic-layer-gradient"></div>
      <div class="epic-layer-grid"></div>
      <div class="epic-layer-scanlines"></div>
    </div>
    
    <!-- Mouse glow -->
    <div class="epic-mouse-glow" :style="{ left: mouse.x + 'px', top: mouse.y + 'px' }"></div>

    <!-- FASE 1: TERMINAL -->
    <Transition name="epic-fade">
      <div v-if="phase === 1" class="epic-phase">
        <div class="epic-terminal">
          <div class="epic-terminal-chrome">
            <div class="epic-chrome-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="epic-chrome-title">root@portfolio ~ zsh</div>
          </div>
          <div class="epic-terminal-content" ref="terminalEl">
            <div 
              v-for="(line, i) in terminalOutput" 
              :key="i" 
              class="epic-term-line" 
              :class="'epic-' + line.type"
            >
              <span class="epic-prompt" v-if="line.type === 'input'">
                <span class="epic-user">visitor</span>@<span class="epic-host">portfolio</span>:~$
              </span>
              <span class="epic-prompt epic-sys" v-else-if="line.type === 'system'">[SYS]</span>
              <span class="epic-prompt epic-ok" v-else-if="line.type === 'success'">[✓]</span>
              <span class="epic-prompt epic-warn" v-else-if="line.type === 'warning'">[!]</span>
              <span class="epic-text" v-html="line.text"></span>
              <span class="epic-cursor" v-if="i === terminalOutput.length - 1 && isTyping">▊</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- FASE 2: GLITCH -->
    <Transition name="epic-glitch">
      <div v-if="phase === 2" class="epic-phase epic-phase-glitch">
        <div class="epic-glitch-container">
          <div class="epic-glitch-text" data-text="ACCESO AUTORIZADO">ACCESO AUTORIZADO</div>
          <div class="epic-glitch-sub">Cargando perfil de usuario...</div>
        </div>
        <div class="epic-binary-rain">
          <div v-for="n in 20" :key="n" class="epic-bin-col" :style="{ left: (n * 5) + '%', animationDelay: (n * 0.1) + 's' }">
            <span v-for="m in 12" :key="m">{{ Math.random() > 0.5 ? '1' : '0' }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- FASE 3: WARP -->
    <Transition name="epic-warp">
      <div v-if="phase === 3" class="epic-phase epic-phase-warp">
        <div class="epic-tunnel">
          <div v-for="n in 12" :key="n" class="epic-tunnel-ring" :style="{ animationDelay: (n * 0.1) + 's' }"></div>
        </div>
        <div class="epic-stars">
          <div v-for="n in 60" :key="n" class="epic-star" :style="getStarStyle(n)"></div>
        </div>
        <div class="epic-warp-hud">
          <div class="epic-speed">{{ warpSpeed.toLocaleString() }} <span>km/s</span></div>
        </div>
      </div>
    </Transition>

    <!-- FASE 4: AVATAR -->
    <Transition name="epic-reveal">
      <div v-if="phase === 4" class="epic-phase epic-phase-avatar">
        <div class="epic-avatar-container" :class="{ 'epic-show': avatarVisible }">
          <div class="epic-avatar-glow"></div>
          <img :src="profileImg" alt="Avatar" class="epic-avatar-img" />
          <div class="epic-avatar-ring"></div>
        </div>
        
        <div class="epic-welcome" :class="{ 'epic-show': showWelcome }">
          <div class="epic-welcome-l1">Bienvenido al portafolio de</div>
          <div class="epic-welcome-l2">{{ userName }}</div>
          <div class="epic-welcome-l3">{{ userRole }}</div>
        </div>
        
        <button v-if="showEnterBtn" class="epic-enter-btn" @click="finishIntro">
          <span>EXPLORAR</span>
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </Transition>

    <!-- Explosión -->
    <div class="epic-explosion" :class="{ 'epic-active': exploding }">
      <div class="epic-exp-flash"></div>
      <div class="epic-exp-ring epic-r1"></div>
      <div class="epic-exp-ring epic-r2"></div>
    </div>

    <!-- HUD -->
    <div class="epic-hud">
      <div class="epic-progress">
        <div class="epic-progress-dots">
          <span v-for="n in 4" :key="n" :class="{ 'epic-active': phase >= n }"></span>
        </div>
        <div class="epic-progress-bar">
          <div class="epic-bar-fill" :style="{ width: totalProgress + '%' }"></div>
        </div>
      </div>
      
      <button class="epic-skip-btn" @click="skipIntro">
        SKIP <kbd>ESC</kbd>
      </button>
      
      <div class="epic-side-left">
        <div>SYS: <span>ACTIVE</span></div>
        <div>MEM: <span>{{ memUsage }}MB</span></div>
      </div>
      
      <div class="epic-side-right">
        <div>FPS: <span>{{ fps }}</span></div>
        <div>PHASE: <span>{{ phase }}/4</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import cvRaw from '@/data/cv.json'

const router = useRouter()
const cv = cvRaw as any
const profileImg = new URL('@/assets/profile.png', import.meta.url).href

// Estado
const showIntro = ref(true)
const phase = ref(1)
const totalProgress = ref(0)
const exploding = ref(false)

// Mouse
const mouse = reactive({ x: 0, y: 0 })
const trackMouse = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

// Refs
const bgCanvas = ref<HTMLCanvasElement | null>(null)
const terminalEl = ref<HTMLElement | null>(null)

// Stats
const fps = ref(60)
const memUsage = ref(256)
let animFrameId: number | null = null
let frameCount = 0
let lastFpsTime = 0

// Terminal
const terminalOutput = ref<Array<{type: string, text: string}>>([])
const isTyping = ref(true)

const commands = [
  { type: 'input', text: 'ssh visitor@portfolio.dev', delay: 45 },
  { type: 'system', text: 'Connecting...', delay: 25 },
  { type: 'success', text: 'Connection established', delay: 0 },
  { type: 'input', text: 'cat welcome.txt', delay: 45 },
  { type: 'output', text: '═══════════════════════════════════', delay: 0 },
  { type: 'output', text: '  BIENVENIDO AL SISTEMA PORTFOLIO', delay: 0 },
  { type: 'output', text: '═══════════════════════════════════', delay: 0 },
  { type: 'input', text: 'sudo load-profile --user=dev', delay: 40 },
  { type: 'success', text: 'Acceso autorizado', delay: 0 },
  { type: 'input', text: './init-experience.sh --epic', delay: 40 },
  { type: 'success', text: 'Módulo visual: <span class="epic-hl">OK</span>', delay: 0 },
  { type: 'success', text: 'Módulo interactivo: <span class="epic-hl">OK</span>', delay: 0 },
  { type: 'warning', text: 'Nivel épico: <span class="epic-hl-warn">MÁXIMO</span>', delay: 0 },
  { type: 'input', text: 'start', delay: 45 },
  { type: 'system', text: 'Iniciando...', delay: 25 },
]

// Warp
const warpSpeed = ref(0)

const getStarStyle = (n: number) => {
  const angle = Math.random() * 360
  const dist = 20 + Math.random() * 60
  return {
    '--epic-angle': angle + 'deg',
    '--epic-dist': dist + '%',
    '--epic-delay': (Math.random() * 2) + 's',
    '--epic-dur': (0.5 + Math.random()) + 's',
    '--epic-size': (1 + Math.random() * 2) + 'px'
  }
}

// Avatar
const avatarVisible = ref(false)
const showWelcome = ref(false)
const showEnterBtn = ref(false)
const userName = computed(() => cv.name || 'Developer')
const userRole = computed(() => cv.role || 'Full Stack Developer')

// Particles
let particles: Array<{x: number, y: number, vx: number, vy: number, size: number, alpha: number}> = []

const initCanvas = () => {
  const canvas = bgCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1
    })
  }
  
  const animate = () => {
    if (!showIntro.value) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120 && dist > 0) {
        p.vx += (dx / dist) * 0.015
        p.vy += (dy / dist) * 0.015
      }
      
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
      
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (speed > 1.5) {
        p.vx = (p.vx / speed) * 1.5
        p.vy = (p.vy / speed) * 1.5
      }
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`
      ctx.fill()
    })
    
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
        if (d < 80) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(249, 115, 22, ${(80 - d) / 320})`
          ctx.stroke()
        }
      })
    })
    
    frameCount++
    const now = performance.now()
    if (now - lastFpsTime >= 1000) {
      fps.value = frameCount
      frameCount = 0
      lastFpsTime = now
    }
    
    animFrameId = requestAnimationFrame(animate)
  }
  
  animate()
}

// Sequences
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const typeLine = async (cmd: typeof commands[0]) => {
  const line = { type: cmd.type, text: '' }
  terminalOutput.value.push(line)
  
  if (cmd.delay > 0) {
    for (let i = 0; i <= cmd.text.length; i++) {
      line.text = cmd.text.slice(0, i)
      await sleep(cmd.delay)
    }
  } else {
    line.text = cmd.text
  }
  
  await sleep(80)
  if (terminalEl.value) {
    terminalEl.value.scrollTop = terminalEl.value.scrollHeight
  }
}

const runPhase1 = async () => {
  for (const cmd of commands) {
    if (!showIntro.value) return
    await typeLine(cmd)
    totalProgress.value = Math.min(25, totalProgress.value + 1.8)
  }
  isTyping.value = false
  await sleep(400)
  if (showIntro.value) { phase.value = 2; runPhase2() }
}

const runPhase2 = async () => {
  const dur = 2200
  const start = Date.now()
  while (Date.now() - start < dur && showIntro.value) {
    totalProgress.value = 25 + ((Date.now() - start) / dur) * 25
    await sleep(50)
  }
  if (showIntro.value) { phase.value = 3; runPhase3() }
}

const runPhase3 = async () => {
  const dur = 2500
  const start = Date.now()
  while (Date.now() - start < dur && showIntro.value) {
    const p = (Date.now() - start) / dur
    warpSpeed.value = Math.floor(p * 299792)
    totalProgress.value = 50 + p * 25
    await sleep(30)
  }
  if (showIntro.value) { phase.value = 4; runPhase4() }
}

const runPhase4 = async () => {
  await sleep(250)
  if (!showIntro.value) return
  avatarVisible.value = true
  totalProgress.value = 80
  
  await sleep(500)
  if (!showIntro.value) return
  showWelcome.value = true
  totalProgress.value = 90
  
  await sleep(1200)
  if (!showIntro.value) return
  showEnterBtn.value = true
  totalProgress.value = 100
}

// Finish
const finishIntro = () => {
  sessionStorage.setItem('introSeen', 'true')
  exploding.value = true
  
  setTimeout(() => {
    cleanup()
    showIntro.value = false
    router.replace('/')
  }, 700)
}

const skipIntro = () => {
  sessionStorage.setItem('introSeen', 'true')
  cleanup()
  showIntro.value = false
  router.replace('/')
}

const cleanup = () => {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }
  particles = []
}

// Events
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' || e.key === ' ') {
    e.preventDefault()
    skipIntro()
  }
}

const handleResize = () => {
  if (bgCanvas.value) {
    bgCanvas.value.width = window.innerWidth
    bgCanvas.value.height = window.innerHeight
  }
}

// Lifecycle
onMounted(() => {
  if (sessionStorage.getItem('introSeen') === 'true') {
    showIntro.value = false
    router.replace('/')
    return
  }
  
  lastFpsTime = performance.now()
  initCanvas()
  
  setInterval(() => {
    memUsage.value = 200 + Math.floor(Math.random() * 100)
  }, 500)
  
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
  
  setTimeout(() => runPhase1(), 400)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  cleanup()
})
</script>

<style scoped>
/* ==================== WRAPPER ==================== */
.epic-intro-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background: #050508;
  overflow: hidden;
}

.epic-bg-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.epic-bg-layers {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.epic-layer-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(251, 146, 60, 0.05) 0%, transparent 50%);
}

.epic-layer-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.epic-layer-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px);
}

.epic-mouse-glow {
  position: fixed;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 2;
}

/* ==================== PHASES ==================== */
.epic-phase {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Transitions */
.epic-fade-enter-active,
.epic-fade-leave-active { transition: all 0.4s ease; }
.epic-fade-enter-from { opacity: 0; transform: scale(0.95); }
.epic-fade-leave-to { opacity: 0; transform: scale(1.05); }

.epic-glitch-enter-active { animation: epicGlitchIn 0.3s ease-out; }
.epic-glitch-leave-active { animation: epicGlitchOut 0.3s ease-in; }

@keyframes epicGlitchIn {
  0% { opacity: 0; transform: translateX(-50px) skewX(-5deg); }
  100% { opacity: 1; transform: translateX(0) skewX(0); }
}

@keyframes epicGlitchOut {
  0% { opacity: 1; }
  100% { opacity: 0; transform: translateX(50px) skewX(5deg); }
}

.epic-warp-enter-active { animation: epicWarpIn 0.4s ease-out; }
.epic-warp-leave-active { animation: epicWarpOut 0.3s ease-in; }

@keyframes epicWarpIn {
  0% { opacity: 0; transform: scale(2); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes epicWarpOut {
  0% { opacity: 1; }
  100% { opacity: 0; transform: scale(0); }
}

.epic-reveal-enter-active { transition: all 0.5s ease-out; }
.epic-reveal-leave-active { transition: all 0.3s ease-in; }
.epic-reveal-enter-from,
.epic-reveal-leave-to { opacity: 0; }

/* ==================== TERMINAL ==================== */
.epic-terminal {
  width: 90%;
  max-width: 700px;
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(249, 115, 22, 0.25);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(249, 115, 22, 0.08);
}

.epic-terminal-chrome {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(30, 30, 40, 0.9);
  border-bottom: 1px solid rgba(249, 115, 22, 0.1);
}

.epic-chrome-dots { display: flex; gap: 8px; }
.epic-chrome-dots span { width: 12px; height: 12px; border-radius: 50%; }
.epic-chrome-dots span:nth-child(1) { background: #ff5f57; }
.epic-chrome-dots span:nth-child(2) { background: #febc2e; }
.epic-chrome-dots span:nth-child(3) { background: #28c840; }

.epic-chrome-title {
  flex: 1;
  text-align: center;
  font-family: monospace;
  font-size: 0.8rem;
  color: #555;
}

.epic-terminal-content {
  padding: 1.25rem;
  min-height: 300px;
  max-height: 360px;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
}

.epic-term-line {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.epic-prompt { color: #4ade80; white-space: nowrap; }
.epic-prompt .epic-user { color: #4ade80; }
.epic-prompt .epic-host { color: #60a5fa; }
.epic-prompt.epic-sys { color: #fbbf24; }
.epic-prompt.epic-ok { color: #4ade80; }
.epic-prompt.epic-warn { color: #fbbf24; }

.epic-text { color: #aaa; }
.epic-input .epic-text { color: #fff; }
.epic-success .epic-text { color: #4ade80; }
.epic-warning .epic-text { color: #fbbf24; }
.epic-text :deep(.epic-hl) { color: #f97316; font-weight: bold; }
.epic-text :deep(.epic-hl-warn) { color: #fbbf24; font-weight: bold; }

.epic-cursor { color: #f97316; animation: epicBlink 0.5s step-end infinite; }

@keyframes epicBlink { 50% { opacity: 0; } }

/* ==================== GLITCH ==================== */
.epic-phase-glitch { text-align: center; }

.epic-glitch-container { z-index: 10; }

.epic-glitch-text {
  position: relative;
  font-size: clamp(1.8rem, 7vw, 4.5rem);
  font-weight: 900;
  color: white;
  text-shadow: 0 0 30px rgba(249, 115, 22, 0.8);
  animation: epicGlitchText 0.3s infinite;
}

@keyframes epicGlitchText {
  0%, 100% { text-shadow: -2px 0 #ff0040, 2px 0 #00ffff, 0 0 30px rgba(249, 115, 22, 0.8); }
  50% { text-shadow: 2px 0 #ff0040, -2px 0 #00ffff, 0 0 30px rgba(249, 115, 22, 0.8); }
}

.epic-glitch-sub {
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
  letter-spacing: 0.25em;
}

.epic-binary-rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.25;
  pointer-events: none;
}

.epic-bin-col {
  position: absolute;
  top: -100%;
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 14px;
  color: #f97316;
  animation: epicBinFall 4s linear infinite;
}

@keyframes epicBinFall {
  0% { transform: translateY(0); }
  100% { transform: translateY(300%); }
}

/* ==================== WARP ==================== */
.epic-phase-warp { perspective: 800px; }

.epic-tunnel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.epic-tunnel-ring {
  position: absolute;
  border: 2px solid rgba(249, 115, 22, 0.35);
  border-radius: 50%;
  animation: epicTunnelPulse 1.8s ease-out infinite;
}

@keyframes epicTunnelPulse {
  0% { width: 0; height: 0; opacity: 1; }
  100% { width: 180vmax; height: 180vmax; opacity: 0; }
}

.epic-stars { position: absolute; inset: 0; }

.epic-star {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--epic-size, 2px);
  height: var(--epic-size, 2px);
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 8px white;
  animation: epicStarWarp var(--epic-dur, 1s) linear infinite;
  animation-delay: var(--epic-delay, 0s);
}

@keyframes epicStarWarp {
  0% { transform: translate(-50%, -50%) rotate(var(--epic-angle, 0)) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(-50%, -50%) rotate(var(--epic-angle, 0)) translateX(var(--epic-dist, 50%)) scale(1); opacity: 0; }
}

.epic-warp-hud {
  position: absolute;
  bottom: 18%;
  text-align: center;
  z-index: 10;
}

.epic-speed {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f97316;
  font-family: monospace;
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}

.epic-speed span { font-size: 1rem; color: #888; }

/* ==================== AVATAR ==================== */
.epic-phase-avatar { gap: 1.5rem; }

.epic-avatar-container {
  position: relative;
  width: 180px;
  height: 180px;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.epic-avatar-container.epic-show { opacity: 1; transform: scale(1); }

.epic-avatar-glow {
  position: absolute;
  inset: -25px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: epicGlowPulse 2s ease-in-out infinite;
}

@keyframes epicGlowPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.15); opacity: 1; }
}

.epic-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.epic-avatar-ring {
  position: absolute;
  inset: -15px;
  border: 2px dashed rgba(249, 115, 22, 0.4);
  border-radius: 50%;
  animation: epicRingSpin 12s linear infinite;
}

@keyframes epicRingSpin { to { transform: rotate(360deg); } }

.epic-welcome {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.epic-welcome.epic-show { opacity: 1; transform: translateY(0); }

.epic-welcome-l1 { font-size: 1rem; color: #777; letter-spacing: 0.1em; }
.epic-welcome-l2 { font-size: 2.25rem; font-weight: 900; color: white; margin-top: 0.25rem; text-shadow: 0 0 25px rgba(249, 115, 22, 0.4); }
.epic-welcome-l3 { font-size: 1.1rem; color: #f97316; letter-spacing: 0.15em; margin-top: 0.25rem; }

.epic-enter-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: epicBtnAppear 0.5s ease-out;
}

@keyframes epicBtnAppear {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.epic-enter-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
}

.epic-enter-btn i { transition: transform 0.3s ease; }
.epic-enter-btn:hover i { transform: translateX(4px); }

/* ==================== EXPLOSION ==================== */
.epic-explosion {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
}

.epic-explosion.epic-active { opacity: 1; }

.epic-exp-flash {
  position: absolute;
  inset: 0;
  background: white;
  animation: epicFlash 0.7s ease-out forwards;
}

@keyframes epicFlash {
  0% { opacity: 0; }
  25% { opacity: 1; }
  100% { opacity: 0; }
}

.epic-exp-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #f97316;
  border-radius: 50%;
  animation: epicExpRing 0.8s ease-out forwards;
}

.epic-exp-ring.epic-r2 { animation-delay: 0.1s; border-color: #fbbf24; }

@keyframes epicExpRing {
  0% { width: 0; height: 0; opacity: 1; }
  100% { width: 350vmax; height: 350vmax; opacity: 0; }
}

/* ==================== HUD ==================== */
.epic-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

.epic-progress {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.epic-progress-dots { display: flex; gap: 16px; }

.epic-progress-dots span {
  width: 10px;
  height: 10px;
  border: 2px solid rgba(249, 115, 22, 0.3);
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
}

.epic-progress-dots span.epic-active {
  border-color: #f97316;
  background: #f97316;
}

.epic-progress-bar {
  width: 180px;
  height: 3px;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.epic-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fbbf24);
  transition: width 0.3s ease;
}

.epic-skip-btn {
  position: absolute;
  bottom: 35px;
  right: 35px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 6px;
  color: #555;
  font-family: monospace;
  font-size: 0.75rem;
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s ease;
}

.epic-skip-btn:hover {
  border-color: #f97316;
  color: #f97316;
}

.epic-skip-btn kbd {
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  font-size: 0.65rem;
}

.epic-side-left,
.epic-side-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-family: monospace;
  font-size: 0.65rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.epic-side-left { left: 20px; }
.epic-side-right { right: 20px; text-align: right; }
.epic-side-left span,
.epic-side-right span { color: #f97316; }

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .epic-terminal { width: 95%; }
  .epic-terminal-content { min-height: 240px; font-size: 0.75rem; }
  .epic-avatar-container { width: 140px; height: 140px; }
  .epic-welcome-l2 { font-size: 1.75rem; }
  .epic-side-left,
  .epic-side-right { display: none; }
  .epic-skip-btn { bottom: 20px; right: 20px; }
}
</style>