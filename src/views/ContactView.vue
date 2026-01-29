<template>
  <div class="animate-fade-in">
    <!-- PageHeader -->
    <div class="relative z-10">
      <PageHeader :title="t('contact.title')" :subtitle="t('contact.subtitle')" category="Contacto"
        info="Respuesta en 24h • Disponible para proyectos" />
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      <!-- Tarjetas de contacto rápido -->
      <div class="quick-contact-grid mt-6">
        <a href="mailto:danieledtt06@gmail.com" class="quick-contact-card">
          <div class="quick-icon">
            <i class="pi pi-envelope"></i>
          </div>
          <div class="quick-content">
            <span class="quick-label">Email</span>
            <span class="quick-value">danieledtt06@gmail.com</span>
          </div>
          <i class="pi pi-arrow-right quick-arrow"></i>
        </a>

        <a href="tel:+34123456789" class="quick-contact-card">
          <div class="quick-icon">
            <i class="pi pi-phone"></i>
          </div>
          <div class="quick-content">
            <span class="quick-label">Teléfono</span>
            <span class="quick-value">+34 123 456 789</span>
          </div>
          <i class="pi pi-arrow-right quick-arrow"></i>
        </a>

        <div class="quick-contact-card">
          <div class="quick-icon">
            <i class="pi pi-map-marker"></i>
          </div>
          <div class="quick-content">
            <span class="quick-label">Ubicación</span>
            <span class="quick-value">Tenerife, España</span>
          </div>
          <div class="quick-badge">
            <span class="badge-dot"></span>
            Remoto
          </div>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="contact-layout">

        <!-- Formulario (izquierda) -->
        <div class="form-section">
          <div class="form-card">
            <!-- Header del formulario -->
            <div class="form-header">
              <div class="form-header-icon">
                <i class="pi pi-send"></i>
              </div>
              <div>
                <h2 class="form-title">Envíame un mensaje</h2>
                <p class="form-subtitle">Respondo en menos de 24 horas</p>
              </div>
            </div>

            <!-- Formulario -->
            <form class="form-body" @submit.prevent="submit">
              <!-- Nombre -->
              <div class="form-group">
                <label for="name" class="form-label">
                  <i class="pi pi-user"></i>
                  Nombre completo
                </label>
                <div class="input-wrapper">
                  <InputText id="name" v-model="form.name" class="form-input"
                    :class="{ 'input-error': errors.name, 'input-success': form.name && !errors.name }"
                    placeholder="¿Cómo te llamas?" />
                  <div class="input-icon">
                    <i v-if="form.name && !errors.name" class="pi pi-check text-emerald-500"></i>
                    <i v-else-if="errors.name" class="pi pi-times text-rose-500"></i>
                  </div>
                </div>
                <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email" class="form-label">
                  <i class="pi pi-envelope"></i>
                  Correo electrónico
                </label>
                <div class="input-wrapper">
                  <InputText id="email" v-model="form.email" type="email" class="form-input"
                    :class="{ 'input-error': errors.email, 'input-success': form.email && validateEmail(form.email) && !errors.email }"
                    placeholder="danieledtt06@gmail.com" />
                  <div class="input-icon">
                    <i v-if="form.email && validateEmail(form.email) && !errors.email"
                      class="pi pi-check text-emerald-500"></i>
                    <i v-else-if="errors.email" class="pi pi-times text-rose-500"></i>
                  </div>
                </div>
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>

              <!-- Asunto (nuevo) -->
              <div class="form-group">
                <label for="subject" class="form-label">
                  <i class="pi pi-tag"></i>
                  Asunto
                </label>
                <div class="subject-options">
                  <button v-for="option in subjectOptions" :key="option.id" type="button" class="subject-btn"
                    :class="{ 'subject-btn-active': form.subject === option.id }" @click="form.subject = option.id">
                    <i :class="option.icon"></i>
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <!-- Mensaje -->
              <div class="form-group">
                <label for="message" class="form-label">
                  <i class="pi pi-comment"></i>
                  Mensaje
                </label>
                <div class="textarea-wrapper">
                  <Textarea id="message" v-model="form.message" rows="4" class="form-textarea"
                    :class="{ 'input-error': errors.message, 'input-success': form.message && !errors.message }"
                    placeholder="Cuéntame sobre tu proyecto o consulta..." autoResize />
                  <div class="textarea-counter">
                    {{ form.message.length }} / 500
                  </div>
                </div>
                <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
              </div>

              <!-- Botón enviar -->
              <button type="submit" class="submit-btn">
                <span class="submit-btn-content">
                  <i class="pi pi-send"></i>
                  Enviar mensaje
                </span>
                <div class="submit-btn-bg"></div>
              </button>

              <!-- Nota de privacidad -->
              <p class="privacy-note">
                <i class="pi pi-shield"></i>
                Tu información está segura y no será compartida
              </p>
            </form>
          </div>
        </div>

        <!-- Sidebar (derecha) -->
        <div class="sidebar-section">

          <!-- Card de disponibilidad -->
          <div class="sidebar-card availability-card">
            <div class="availability-header">
              <div class="availability-indicator">
                <span class="indicator-dot"></span>
              </div>
              <div>
                <h3 class="availability-title">Disponible</h3>
                <p class="availability-text">para nuevos proyectos</p>
              </div>
            </div>
            <div class="availability-info">
              <div class="info-item">
                <i class="pi pi-clock"></i>
                <span>Respuesta en 24h</span>
              </div>
              <div class="info-item">
                <i class="pi pi-calendar"></i>
                <span>Lun - Vie, 9:00 - 18:00</span>
              </div>
              <div class="info-item">
                <i class="pi pi-globe"></i>
                <span>Zona horaria: GMT+1</span>
              </div>
            </div>
          </div>

          <!-- Card de preferencia de contacto -->
          <div class="sidebar-card prefer-card">
            <h3 class="prefer-title">
              <i class="pi pi-heart"></i>
              Forma preferida
            </h3>
            <p class="prefer-text">
              Para proyectos y colaboraciones, prefiero el
              <strong>formulario</strong> o <strong>email</strong>.
              Para consultas rápidas, puedes contactarme por
              <strong>LinkedIn</strong>.
            </p>
          </div>

          <!-- Redes sociales -->
          <div class="sidebar-card social-card">
            <h3 class="social-title">Sígueme en redes</h3>
            <div class="social-grid">
              <a href="https://linkedin.com" target="_blank" class="social-link social-linkedin">
                <i class="pi pi-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Pepepe14" target="_blank" class="social-link social-github">
                <i class="pi pi-github"></i>
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" class="social-link social-twitter">
                <i class="pi pi-twitter"></i>
                <span>Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" class="social-link social-instagram">
                <i class="pi pi-instagram"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <!-- FAQ rápido -->
          <div class="sidebar-card faq-card">
            <h3 class="faq-title">
              <i class="pi pi-question-circle"></i>
              Preguntas frecuentes
            </h3>
            <div class="faq-list">
              <details class="faq-item">
                <summary class="faq-question">¿Cuánto tardas en responder?</summary>
                <p class="faq-answer">Normalmente respondo en menos de 24 horas en días laborables.</p>
              </details>
              <details class="faq-item">
                <summary class="faq-question">¿Trabajas en remoto?</summary>
                <p class="faq-answer">Sí, trabajo principalmente en remoto con clientes de todo el mundo.</p>
              </details>
              <details class="faq-item">
                <summary class="faq-question">¿Qué tipo de proyectos aceptas?</summary>
                <p class="faq-answer">Desarrollo web, aplicaciones móviles, y consultoría técnica.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Toast position="bottom-right" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'

import PageHeader from '@/components/PageHeader.vue'

const { t } = useI18n()
const toast = useToast()

// Opciones de asunto
const subjectOptions = [
  { id: 'project', label: 'Proyecto', icon: 'pi pi-briefcase' },
  { id: 'collaboration', label: 'Colaboración', icon: 'pi pi-users' },
  { id: 'consulting', label: 'Consultoría', icon: 'pi pi-lightbulb' },
  { id: 'other', label: 'Otro', icon: 'pi pi-ellipsis-h' }
]

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive<{ name?: string; email?: string; message?: string }>({})

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function validate() {
  errors.name = form.name.trim() ? undefined : 'El nombre es obligatorio'
  errors.email = form.email.trim()
    ? (validateEmail(form.email) ? undefined : 'Email inválido')
    : 'El email es obligatorio'
  errors.message = form.message.trim() ? undefined : 'El mensaje es obligatorio'

  return !errors.name && !errors.email && !errors.message
}

function submit() {
  if (!validate()) return

  toast.add({
    severity: 'success',
    summary: '¡Mensaje enviado!',
    detail: 'Me pondré en contacto contigo pronto.',
    life: 4000,
  })

  // Reset
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<style scoped>
/* ==================== ANIMACIONES ==================== */
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

/* ==================== QUICK CONTACT GRID ==================== */
.quick-contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .quick-contact-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.quick-contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.quick-contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-300);
}

:root.dark .quick-contact-card:hover {
  border-color: var(--accent-600);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.15);
}

.quick-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.875rem;
  background: linear-gradient(135deg, var(--accent-100), var(--accent-200));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

:root.dark .quick-icon {
  background: linear-gradient(135deg, var(--accent-900), var(--accent-800));
}

.quick-contact-card:hover .quick-icon {
  background: var(--gradient-primary);
}

.quick-icon i {
  font-size: 1.25rem;
  color: var(--accent-500);
  transition: color 0.3s ease;
}

.quick-contact-card:hover .quick-icon i {
  color: white;
}

.quick-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.quick-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.quick-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.quick-arrow {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.quick-contact-card:hover .quick-arrow {
  color: var(--accent-500);
  transform: translateX(4px);
}

.quick-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--success-light);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--success);
  transition: all 0.3s ease;
}

:root.dark .quick-badge {
  background: rgba(16, 185, 129, 0.15);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.3);
  }
}

/* ==================== CONTACT LAYOUT ==================== */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1.5fr 1fr;
    gap: 2.5rem;
  }
}

/* ==================== FORM SECTION ==================== */
.form-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem 2rem;
  background: linear-gradient(135deg, var(--accent-50), var(--accent-100));
  border-bottom: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

:root.dark .form-header {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05));
}

.form-header-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-glow);
}

.form-header-icon i {
  font-size: 1.5rem;
  color: white;
}

.form-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.form-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
  transition: color 0.3s ease;
}

.form-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.625rem;
  transition: color 0.3s ease;
}

.form-label i {
  font-size: 0.875rem;
  color: var(--accent-500);
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-right: 2.5rem;
  border: 1.5px solid var(--border-primary);
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  transition: all 0.3s ease;
}

:root.dark .form-input {
  background: var(--bg-tertiary);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-500);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

:root.dark .form-input:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input.input-error {
  border-color: var(--error);
  background: var(--error-light);
}

:root.dark .form-input.input-error {
  background: rgba(239, 68, 68, 0.1);
}

.form-input.input-success {
  border-color: var(--success);
  background: var(--bg-card);
}

.input-icon {
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon i {
  font-size: 1rem;
}

.form-error {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--error);
  margin-top: 0.5rem;
}

/* Subject options */
.subject-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.subject-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1.5px solid var(--border-primary);
  border-radius: 0.625rem;
  background: var(--bg-card);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.subject-btn:hover {
  border-color: var(--accent-400);
  background: var(--accent-50);
  color: var(--accent-600);
}

:root.dark .subject-btn:hover {
  background: var(--accent-900);
  color: var(--accent-400);
}

.subject-btn-active {
  border-color: var(--accent-500);
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-glow);
}

.subject-btn-active:hover {
  background: linear-gradient(135deg, var(--accent-600), var(--accent-500));
  color: white;
}

.subject-btn i {
  font-size: 0.875rem;
}

/* Textarea */
.textarea-wrapper {
  position: relative;
}

.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-bottom: 2rem;
  border: 1.5px solid var(--border-primary);
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--bg-secondary);
  resize: none;
  transition: all 0.3s ease;
  min-height: 120px;
}

:root.dark .form-textarea {
  background: var(--bg-tertiary);
}

.form-textarea:focus {
  outline: none;
  border-color: var(--accent-500);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

:root.dark .form-textarea:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
}

.form-textarea::placeholder {
  color: var(--text-muted);
}

.form-textarea.input-error {
  border-color: var(--error);
  background: var(--error-light);
}

:root.dark .form-textarea.input-error {
  background: rgba(239, 68, 68, 0.1);
}

.form-textarea.input-success {
  border-color: var(--success);
  background: var(--bg-card);
}

.textarea-counter {
  position: absolute;
  bottom: 0.75rem;
  right: 0.875rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

/* Submit button */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.875rem;
  background: var(--gradient-primary);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--shadow-glow);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.submit-btn-content i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.submit-btn:hover .submit-btn-content i {
  transform: translateX(4px) rotate(-15deg);
}

.submit-btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-600), var(--accent-500));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-btn:hover .submit-btn-bg {
  opacity: 1;
}

.privacy-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.privacy-note i {
  color: var(--success);
}

/* ==================== SIDEBAR ==================== */
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 1.25rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.sidebar-card:hover {
  box-shadow: var(--shadow-md);
}

/* Availability card */
.availability-card {
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border-color: rgba(16, 185, 129, 0.2);
}

:root.dark .availability-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08));
  border-color: rgba(16, 185, 129, 0.3);
}

.availability-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.availability-indicator {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

:root.dark .availability-indicator {
  background: var(--bg-tertiary);
}

.indicator-dot {
  width: 12px;
  height: 12px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

.availability-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--success);
  margin: 0;
}

.availability-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s ease;
}

.availability-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.info-item i {
  font-size: 0.875rem;
  color: var(--success);
  width: 1rem;
}

/* Prefer card */
.prefer-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  transition: color 0.3s ease;
}

.prefer-title i {
  color: var(--accent-500);
}

.prefer-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

.prefer-text strong {
  color: var(--accent-500);
  font-weight: 600;
}

/* Social card */
.social-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  transition: color 0.3s ease;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.social-link i {
  font-size: 1rem;
}

.social-link:hover {
  transform: translateY(-2px);
}

.social-linkedin {
  background: #eff6ff;
  color: #2563eb;
}

:root.dark .social-linkedin {
  background: rgba(37, 99, 235, 0.15);
}

.social-linkedin:hover {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.social-github {
  background: #f3f4f6;
  color: #1f2937;
}

:root.dark .social-github {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.social-github:hover {
  background: #1f2937;
  color: white;
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.3);
}

:root.dark .social-github:hover {
  background: rgba(255, 255, 255, 0.2);
}

.social-twitter {
  background: #f0f9ff;
  color: #0ea5e9;
}

:root.dark .social-twitter {
  background: rgba(14, 165, 233, 0.15);
}

.social-twitter:hover {
  background: #0ea5e9;
  color: white;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.social-instagram {
  background: #fdf2f8;
  color: #ec4899;
}

:root.dark .social-instagram {
  background: rgba(236, 72, 153, 0.15);
}

.social-instagram:hover {
  background: linear-gradient(135deg, #ec4899, #f97316);
  color: white;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
}

/* FAQ card */
.faq-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  transition: color 0.3s ease;
}

.faq-title i {
  color: var(--accent-500);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  border: 1px solid var(--border-secondary);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item[open] {
  border-color: var(--accent-300);
  background: var(--accent-50);
}

:root.dark .faq-item[open] {
  border-color: var(--accent-600);
  background: rgba(249, 115, 22, 0.08);
}

.faq-question {
  padding: 0.875rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  list-style: none;
  transition: all 0.3s ease;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question::before {
  content: '+';
  float: right;
  font-size: 1rem;
  color: var(--accent-500);
  transition: transform 0.3s ease;
}

.faq-item[open] .faq-question::before {
  transform: rotate(45deg);
}

.faq-question:hover {
  color: var(--accent-500);
}

.faq-answer {
  padding: 0 1rem 0.875rem 1rem;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .form-header {
    padding: 1.25rem 1.5rem;
  }

  .form-body {
    padding: 1.5rem;
  }

  .form-header-icon {
    width: 3rem;
    height: 3rem;
  }

  .form-title {
    font-size: 1.25rem;
  }

  .subject-options {
    flex-direction: column;
  }

  .subject-btn {
    width: 100%;
    justify-content: center;
  }

  .social-grid {
    grid-template-columns: 1fr;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .quick-contact-card,
  .form-input,
  .form-textarea,
  .subject-btn,
  .submit-btn,
  .social-link,
  .faq-item {
    transition: none;
  }
  
  .badge-dot,
  .indicator-dot {
    animation: none;
  }
}

:focus-visible {
  outline: 3px solid var(--ring-color);
  outline-offset: 2px;
}

/* ==================== PRIMEVUE OVERRIDES ==================== */
:deep(.p-inputtext),
:deep(.p-textarea) {
  width: 100%;
  font-family: inherit;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-primary);
}

:root.dark :deep(.p-inputtext),
:root.dark :deep(.p-textarea) {
  background: var(--bg-tertiary);
}

:deep(.p-inputtext:enabled:focus),
:deep(.p-textarea:enabled:focus) {
  box-shadow: none;
  border-color: var(--accent-500);
  background: var(--bg-card);
}

:deep(.p-inputtext::placeholder),
:deep(.p-textarea::placeholder) {
  color: var(--text-muted);
}
</style>