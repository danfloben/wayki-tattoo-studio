'use strict'

// ─────────────────────────────────────────────────────────────────────────────
//  Wayki Tattoo Studio — Build Script
//  Lee contenido de Sanity CMS y genera los archivos HTML estáticos.
//  Uso: node scripts/build.js
// ─────────────────────────────────────────────────────────────────────────────

const { createClient } = require('@sanity/client')
const imageUrlBuilder  = require('@sanity/image-url')
const fs               = require('fs')
const path             = require('path')

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT     = path.join(__dirname, '..')
const SECTIONS = path.join(ROOT, 'sections')
const BASE_URL = 'https://danfloben.github.io/wayki-tattoo-studio'
const RAW_BASE = 'https://raw.githubusercontent.com/danfloben/wayki-tattoo-studio/main'
const WA_NUM   = process.env.WA_NUMBER || '51993054099'

// ── Sanity client ─────────────────────────────────────────────────────────────
const PROJECT_ID = process.env.SANITY_PROJECT_ID
if (!PROJECT_ID) {
  console.error('❌  SANITY_PROJECT_ID no está configurado.')
  console.error('    Agrega el secreto en GitHub → Settings → Secrets → SANITY_PROJECT_ID')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   'production',
  useCdn:    false,
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)
const imgUrl  = (src, width) =>
  src ? builder.image(src).width(width || 1600).auto('format').fit('max').url() : ''
const imgUrlSq = (src, size) =>
  src ? builder.image(src).width(size || 800).height(size || 800).fit('crop').auto('format').url() : ''

// ── Helpers ───────────────────────────────────────────────────────────────────
const sec = (name) => fs.readFileSync(path.join(SECTIONS, name), 'utf-8')

const WA_HREF = (msg, wa) =>
  `https://wa.me/${wa || WA_NUM}?text=${encodeURIComponent(msg)}`

const STARS_SVG = (n = 5) =>
  Array(n).fill(
    `<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#be0000;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
  ).join('')

const PLATFORM_ICON = {
  google: `<svg viewBox="0 0 24 24" style="width:14px;height:14px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#1877f2;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#e1306c;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
}

const SERVICE_ICONS = {
  tattoo:  `<path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41L3 17.25V21h3.75l9.88-9.88 1.41 1.41 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 0 0 .05-1.35zM6.92 19H5v-1.92l9.06-9.06 1.92 1.92z"/>`,
  piercing:`<path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>`,
  ink:     `<path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8h3a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 15h-1v-8h1v8zm2 0h-1v-8h1v8zm4-10H6V5h12v3z"/>`,
  merch:   `<path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>`,
}

// ─────────────────────────────────────────────────────────────────────────────
//  GENERADORES DE SECCIONES
// ─────────────────────────────────────────────────────────────────────────────

function genHero(hero, s) {
  const wa = s?.whatsapp || WA_NUM
  const slides = (hero?.slides || []).map((slide, i) =>
    `      <div class="hero-slide${i === 0 ? ' active' : ''}" style="background-image:url('${imgUrl(slide, 1920)}');"></div>`
  ).join('\n')

  return `  <!-- HERO -->
  <section id="inicio" class="hero-bg relative min-h-screen flex items-center justify-center">
    <div id="hero-slides" style="position:absolute;inset:0;z-index:0;">
${slides || `      <div class="hero-slide active" style="background-image:url('./banner_1.jpg');"></div>
      <div class="hero-slide" style="background-image:url('./banner_2.jpg');"></div>
      <div class="hero-slide" style="background-image:url('./banner_3.jpg');"></div>
      <div class="hero-slide" style="background-image:url('./banner_4.jpg');"></div>`}
    </div>
    <div class="hero-overlay absolute inset-0" style="z-index:1;"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] rounded-full pointer-events-none"
         style="background:radial-gradient(ellipse,rgba(190,0,0,0.18) 0%,transparent 70%);z-index:2;"></div>
    <div class="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-20" style="z-index:3;">
      <img src="./logo.png" alt="Wayki Tattoo Studio Logo"
           class="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mb-10 reveal"
           style="box-shadow:0 0 60px rgba(190,0,0,0.45);border:2px solid rgba(190,0,0,0.4);" />
      <span class="section-label reveal delay-1">${hero?.eyebrow || 'Arequipa · Perú · Est. 2013'}</span>
      <h1 class="reveal delay-2"
          style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(48px,8vw,96px);line-height:0.95;letter-spacing:-0.03em;color:#e2e2e2;margin-bottom:24px;">
        ${hero?.headline || 'EL ARTE'}<br/><span style="color:#be0000;">${hero?.headlineAccent || 'EN TU PIEL'}</span>
      </h1>
      <p class="reveal delay-3 max-w-xl"
         style="font-family:'Manrope',sans-serif;font-size:17px;color:#a0a0a0;line-height:1.7;margin-bottom:48px;">
        ${hero?.subtitle || 'Transformamos tus ideas en obras maestras permanentes. Realismo, color, fineline y más — con los más altos estándares de arte e higiene.'}
      </p>
      <div class="reveal delay-4 flex flex-wrap gap-4 justify-center">
        <a href="portafolio.html" class="btn-primary" data-i18n="hero_cta1">${hero?.ctaPrimary || 'Ver Portafolio'}</a>
        <a href="contacto.html"  class="btn-ghost"   data-i18n="hero_cta2">${hero?.ctaSecondary || 'Reservar Cita'}</a>
      </div>
    </div>
  </section>`
}

function genServicios(servicios) {
  const cards = servicios.map((svc, i) => {
    const icon = SERVICE_ICONS[svc.icono] || SERVICE_ICONS.tattoo
    return `
        <div class="svc-card reveal delay-${i + 1}">
          <div class="svc-icon"><svg viewBox="0 0 24 24">${icon}</svg></div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#e2e2e2;margin-bottom:10px;">${svc.nombre}</h3>
          <p style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;line-height:1.65;margin-bottom:16px;">${svc.descripcion}</p>
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#be0000;">${svc.tag || ''}</span>
        </div>`
  }).join('')

  return `  <!-- SERVICIOS -->
  <section id="servicios" class="py-24 md:py-32" style="background:#121414;">
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="mb-16 reveal">
        <span class="section-label" data-i18n="svc_label">Lo que hacemos</span>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
          <span class="slash">/</span><span data-i18n="svc_title">Nuestros Servicios</span>
        </h2>
        <div class="red-line mt-4"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${cards}
      </div>
    </div>
  </section>`
}

function genPortafolio(items) {
  const cards = items.map((item) => {
    const url = imgUrl(item.imagen, 900)
    const thumb = imgUrlSq(item.imagen, 600)
    return `
          <div class="port-card glightbox" data-gallery="portfolio" data-href="${url}" data-alt="${item.alt || ''}" data-desc="${item.estilo || ''}">
            <img src="${thumb}" alt="${item.alt || 'Tatuaje — Wayki Tattoo Studio'}" loading="lazy" />
            <div class="port-overlay">
              <span class="port-label">${item.estilo || 'Tattoo'}</span>
            </div>
          </div>`
  }).join('')

  return `  <!-- PORTAFOLIO -->
  <section id="portafolio" style="background:#0d0f0f;padding:96px 0;position:relative;overflow:hidden;">
    <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" style="opacity:0.03;">
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:900;font-size:300px;line-height:1;color:#be0000;white-space:nowrap;">INK</span>
    </div>
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16 reveal">
        <div>
          <span class="section-label" data-i18n="port_label">Nuestro trabajo</span>
          <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
            <span class="slash">/</span><span data-i18n="port_title">Portafolio</span>
          </h2>
          <div class="red-line mt-4"></div>
        </div>
        <a href="https://wa.me/${WA_NUM}?text=${encodeURIComponent('Hola! Quiero ver más trabajos y consultar un diseño.')}" target="_blank"
           class="btn-ghost mt-6 md:mt-0" style="padding:10px 24px;font-size:12px;" data-i18n="port_cta">
          Consultar diseño ↗
        </a>
      </div>
      <div style="columns:3;column-gap:12px;" class="masonry-grid">
        ${cards}
      </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"><\/script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true, zoomable: false });
      });
    <\/script>
    <style>
      .masonry-grid { columns:3;column-gap:12px; }
      @media(max-width:768px){.masonry-grid{columns:2;}}
      @media(max-width:480px){.masonry-grid{columns:1;}}
      .port-card { break-inside:avoid;margin-bottom:12px;overflow:hidden;border:1px solid #2a2d2d;position:relative;cursor:pointer; }
      .port-card img { width:100%;height:auto;object-fit:cover;filter:grayscale(30%);transition:transform 0.6s ease,filter 0.6s ease;display:block; }
      .port-card:hover img { transform:scale(1.04);filter:grayscale(0%); }
      .port-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(190,0,0,0.6) 0%,transparent 50%);opacity:0;transition:opacity 0.4s ease;display:flex;align-items:flex-end;padding:16px; }
      .port-card:hover .port-overlay { opacity:1; }
      .port-label { font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,0.6);padding:5px 10px; }
    </style>
  </section>`
}

function genNosotros(s) {
  const photo = s?.studioPhoto ? imgUrl(s.studioPhoto, 800) : './studio.webp'
  const wa    = s?.whatsapp || WA_NUM

  return `  <!-- NOSOTROS -->
  <section id="nosotros" style="background:#121414;padding:96px 0;position:relative;overflow:hidden;">
    <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" style="opacity:0.04;">
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:900;font-size:320px;line-height:1;color:#be0000;white-space:nowrap;">WAYKI</span>
    </div>
    <div class="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
      <div class="reveal-left">
        <span class="section-label" data-i18n="about_label">Quiénes somos</span>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;margin-bottom:16px;">
          <span class="slash">/</span><span data-i18n="about_title">Arte y Precisión</span>
        </h2>
        <div class="red-line mb-8"></div>
        <p style="font-family:'Manrope',sans-serif;font-size:16px;color:#a0a0a0;line-height:1.8;margin-bottom:16px;">
          ${s?.aboutP1 || 'Wayki Tattoo Studio no es solo un lugar para tatuarse — es un santuario para la expresión artística.'}
        </p>
        <p style="font-family:'Manrope',sans-serif;font-size:16px;color:#a0a0a0;line-height:1.8;margin-bottom:32px;">
          ${s?.aboutP2 || 'Combinamos técnicas tradicionales con una visión moderna, usando nuestras propias tintas <strong style="color:#e2e2e2;">SiVola</strong>.'}
        </p>
        <p style="font-family:'Manrope',sans-serif;font-size:15px;font-style:italic;color:#be0000;margin-bottom:40px;">
          ${s?.aboutQuote || '"Tu piel es el lienzo, nuestra tinta es el alma."'}
        </p>
        <div class="flex flex-wrap gap-10">
          <div>
            <div class="stat-num">${s?.yearsExperience || '10+'}</div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#555;" data-i18n="about_years">Años</span>
          </div>
          <div>
            <div class="stat-num">${s?.clientCount || '5k+'}</div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#555;" data-i18n="about_clients">Clientes</span>
          </div>
          <div>
            <div class="stat-num">${s?.artistCount || '2-3'}</div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#555;" data-i18n="about_artists">Artistas</span>
          </div>
          <div>
            <div class="stat-num">∞</div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#555;" data-i18n="about_styles">Estilos</span>
          </div>
        </div>
      </div>
      <div class="reveal-right">
        <div class="about-img-wrap relative" style="transform:rotate(2deg);">
          <div style="border:1px solid #2a2d2d;padding:8px;background:#1a1c1c;">
            <img src="${photo}" alt="${s?.studioName || 'Wayki Tattoo Studio'} — Arequipa, Perú"
                 style="width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center;display:block;filter:grayscale(10%);" loading="lazy" />
          </div>
          <div style="position:absolute;bottom:-20px;left:-20px;background:#be0000;padding:16px 24px;border:1px solid rgba(255,255,255,0.15);">
            <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#fff;font-weight:600;display:block;">${s?.certBadge || 'Arte Certificado'}</span>
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.1em;">${s?.city || 'Arequipa · Perú'}</span>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

function genArtistas(artistas, s) {
  const wa = s?.whatsapp || WA_NUM

  const cards = artistas.map((a, i) => {
    const foto = a.foto ? imgUrl(a.foto, 700) : './artista_1.webp'
    const waMsg = a.whatsappMsg || `Hola! Quiero una cita con ${a.nombre}.`
    const igUrl = a.instagram || s?.instagram || '#'
    const igHandle = a.instagramHandle || s?.instagramHandle || '@waykitattoostudio'

    return `
      <div class="reveal delay-${i + 1}" style="max-width:420px;">
        <div style="background:#1a1c1c;border:1px solid #2a2d2d;transition:border-color 0.3s,box-shadow 0.3s;"
             onmouseover="this.style.borderColor='#be0000';this.style.boxShadow='0 12px 40px rgba(190,0,0,0.15)';"
             onmouseout="this.style.borderColor='#2a2d2d';this.style.boxShadow='none';">
          <div style="position:relative;aspect-ratio:3/4;overflow:hidden;background:#0d0f0f;">
            <img src="${foto}" alt="${a.nombre} — Wayki Tattoo Studio"
                 style="width:100%;height:100%;object-fit:cover;object-position:top;filter:grayscale(20%);transition:transform 0.6s ease,filter 0.6s ease;"
                 onmouseover="this.style.transform='scale(1.04)';this.style.filter='grayscale(0)';"
                 onmouseout="this.style.transform='scale(1)';this.style.filter='grayscale(20%)';" />
            <div style="position:absolute;top:16px;left:16px;background:#be0000;padding:5px 12px;">
              <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#fff;">${a.badge || 'Artista'}</span>
            </div>
          </div>
          <div style="padding:24px 24px 28px;">
            <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#be0000;">WAYKI TATTOO</span>
            <h3 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px;color:#e2e2e2;letter-spacing:-0.02em;margin:8px 0 4px;">${a.nombre}</h3>
            <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;margin-bottom:16px;">${a.especialidad || ''}</p>
            <div style="width:40px;height:2px;background:#be0000;margin-bottom:16px;"></div>
            <p style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;line-height:1.7;margin-bottom:20px;">${a.bio || ''}</p>
            <div style="display:flex;align-items:center;gap:12px;">
              <a href="${igUrl}" target="_blank"
                 style="display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#555;text-decoration:none;text-transform:uppercase;transition:color 0.2s;"
                 onmouseover="this.style.color='#be0000'" onmouseout="this.style.color='#555'">
                <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:currentColor;flex-shrink:0;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                ${igHandle}
              </a>
              <a href="${WA_HREF(waMsg, wa)}" target="_blank"
                 style="margin-left:auto;display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid #2a2d2d;color:#a0a0a0;padding:8px 16px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;transition:background 0.2s,border-color 0.2s,color 0.2s;"
                 onmouseover="this.style.background='#be0000';this.style.borderColor='#be0000';this.style.color='#fff';"
                 onmouseout="this.style.background='transparent';this.style.borderColor='#2a2d2d';this.style.color='#a0a0a0';"
                 data-i18n="artists_book">Reservar</a>
            </div>
          </div>
        </div>
      </div>`
  }).join('')

  return `  <!-- ARTISTAS -->
  <section id="artistas" style="background:#121414;padding:96px 0;position:relative;overflow:hidden;">
    <div style="position:absolute;right:0;top:50%;transform:translateY(-50%);pointer-events:none;user-select:none;opacity:0.03;">
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:900;font-size:260px;line-height:1;color:#be0000;white-space:nowrap;">ARTIST</span>
    </div>
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16 reveal">
        <div>
          <span class="section-label" data-i18n="artists_label">Nuestro equipo</span>
          <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
            <span class="slash">/</span><span data-i18n="artists_title">Los Artistas</span>
          </h2>
          <div class="red-line mt-4"></div>
          <p style="font-family:'Manrope',sans-serif;font-size:15px;color:#a0a0a0;line-height:1.7;margin-top:16px;max-width:480px;" data-i18n="artists_desc">
            Cada tatuaje es una historia. Conoce a los artistas detrás de cada obra maestra.
          </p>
        </div>
        <a href="${WA_HREF('Hola! Quiero consultar con un artista.', wa)}" target="_blank"
           class="btn-ghost mt-6 md:mt-0" style="padding:10px 24px;font-size:12px;" data-i18n="artists_cta">
          Consultar disponibilidad ↗
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${cards}
      </div>
    </div>
  </section>`
}

function genMerch(productos, s) {
  const wa = s?.whatsapp || WA_NUM

  const cards = productos.map((p, i) => {
    const foto    = p.imagen ? imgUrlSq(p.imagen, 600) : `./galeria/IMG20260208185421.webp`
    const badgeHtml = p.badge
      ? `<span class="merch-badge${p.badgeHot ? ' merch-badge-hot' : ''}">${p.badge}</span>`
      : ''
    const waHref  = WA_HREF(p.whatsappMsg || `Hola! Me interesa ${p.nombre}.`, wa)

    return `
        <div class="merch-card reveal delay-${i + 1}">
          <div class="merch-img-wrap">
            <img src="${foto}" alt="${p.nombre} — Wayki Tattoo Studio" />
            ${badgeHtml}
          </div>
          <div class="merch-info">
            <span class="merch-tag">${p.tag || ''}</span>
            <h4 class="merch-title">${p.nombre}</h4>
            <p class="merch-desc">${p.descripcion || ''}</p>
            <div class="merch-price">${p.precio || ''}</div>
            <a href="${waHref}" target="_blank" class="merch-btn" data-i18n="merch_btn">Pedir ahora</a>
          </div>
        </div>`
  }).join('')

  return `  <!-- MERCH -->
  <section id="merch" style="background:#0d0f0f;padding:96px 0;position:relative;overflow:hidden;">
    <div class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" style="opacity:0.03;">
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:900;font-size:280px;line-height:1;color:#be0000;white-space:nowrap;">MERCH</span>
    </div>
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16 reveal">
        <div>
          <span class="section-label" data-i18n="merch_label">Tienda Wayki</span>
          <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
            <span class="slash">/</span><span data-i18n="merch_title">Merch &amp; Supply</span>
          </h2>
          <div class="red-line mt-4"></div>
          <p style="font-family:'Manrope',sans-serif;font-size:15px;color:#a0a0a0;line-height:1.7;margin-top:16px;max-width:480px;" data-i18n="merch_desc">
            Lleva la cultura Wayki más allá de la piel. Ropa, accesorios y nuestra línea de tintas SiVola.
          </p>
        </div>
        <a href="${WA_HREF('Hola! Quiero consultar sobre el merch Wayki.', wa)}" target="_blank"
           class="btn-ghost mt-6 md:mt-0" style="padding:10px 24px;font-size:12px;" data-i18n="merch_wa">
          Consultar por WhatsApp ↗
        </a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        ${cards}
      </div>
    </div>
  </section>
  <style>
    .merch-card { background:#1a1c1c;border:1px solid #2a2d2d;display:flex;flex-direction:column;transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s; }
    .merch-card:hover { border-color:#be0000;transform:translateY(-4px);box-shadow:0 12px 32px rgba(190,0,0,0.15); }
    .merch-img-wrap { position:relative;aspect-ratio:1/1;overflow:hidden;background:#fff; }
    .merch-img-wrap img { width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;display:block; }
    .merch-card:hover .merch-img-wrap img { transform:scale(1.05); }
    .merch-badge { position:absolute;top:10px;right:10px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;background:#1a1c1c;color:#a0a0a0;padding:4px 8px;border:1px solid #2a2d2d; }
    .merch-badge-hot { background:#be0000!important;color:#fff!important;border-color:#be0000!important; }
    .merch-info { padding:18px 16px 20px;display:flex;flex-direction:column;flex:1; }
    .merch-tag { font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#be0000; }
    .merch-title { font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e2e2e2;line-height:1.3;margin:6px 0 4px; }
    .merch-desc { font-family:'Manrope',sans-serif;font-size:12px;color:#555;margin-bottom:12px; }
    .merch-price { font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#be0000;margin-bottom:14px; }
    .merch-btn { display:block;text-align:center;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;padding:10px;border:1px solid #2a2d2d;color:#a0a0a0;transition:background 0.2s,border-color 0.2s,color 0.2s;margin-top:auto; }
    .merch-btn:hover { background:#be0000;border-color:#be0000;color:#fff; }
  </style>`
}

function genTestimonios(testimonios, s) {
  const wa = s?.whatsapp || WA_NUM
  const reviewLink = s?.googleReviewLink || 'https://g.page/r/waykitattoostudio/review'

  const cards = testimonios.map((t, i) => {
    const platform = PLATFORM_ICON[t.plataforma] || PLATFORM_ICON.google
    const platformLabel = t.plataforma === 'google' ? 'Google Review'
      : t.plataforma === 'facebook' ? 'Facebook' : 'Instagram'

    return `
        <div class="reveal delay-${i + 1}" style="background:#1a1c1c;border:1px solid #2a2d2d;padding:28px;display:flex;flex-direction:column;gap:16px;transition:border-color 0.3s;" onmouseover="this.style.borderColor='#be0000'" onmouseout="this.style.borderColor='#2a2d2d'">
          <div class="flex items-center justify-between">
            <div>
              <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#e2e2e2;">${t.nombre}</span>
              <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;color:#555;display:block;margin-top:2px;text-transform:uppercase;">${t.fecha}</span>
            </div>
            <div style="display:flex;gap:2px;">${STARS_SVG(t.rating || 5)}</div>
          </div>
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:#be0000;opacity:0.4;flex-shrink:0;"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
          <p style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;line-height:1.75;flex:1;">${t.texto}</p>
          <div style="height:1px;background:#2a2d2d;"></div>
          <div class="flex items-center gap-2">
            ${platform}
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#555;letter-spacing:0.08em;">${platformLabel}</span>
          </div>
        </div>`
  }).join('')

  return `  <!-- TESTIMONIOS -->
  <section id="testimonios" style="background:#0d0f0f;padding:96px 0;position:relative;overflow:hidden;">
    <div class="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
         style="width:800px;height:2px;background:linear-gradient(to right,transparent,#be0000,transparent);opacity:0.4;"></div>
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="mb-16 reveal">
        <span class="section-label" data-i18n="test_label">Lo que dicen de nosotros</span>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
          <span class="slash">/</span><span data-i18n="test_title">Reseñas</span>
        </h2>
        <div class="red-line mt-4"></div>
        <div class="flex items-center gap-2 mt-6">
          ${PLATFORM_ICON.google}
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#555;" data-i18n="test_google">5.0 · Google Reviews</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${cards}
        <!-- CTA card -->
        <div class="reveal delay-6 flex flex-col items-center justify-center gap-5 p-8 text-center"
             style="background:radial-gradient(circle at 50% 30%,#2a0000,#121414);border:1px solid #be0000;min-height:280px;">
          <div style="display:flex;gap:3px;">${STARS_SVG(5).replace(/14px/g, '20px')}</div>
          <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#e2e2e2;line-height:1.2;" data-i18n="test_cta_score">5.0 en Google</span>
          <span style="font-family:'Manrope',sans-serif;font-size:13px;color:#a0a0a0;line-height:1.6;" data-i18n="test_cta_desc">¿Ya eres parte de nuestra familia Wayki? Déjanos tu reseña.</span>
          <a href="${reviewLink}" target="_blank" class="btn-primary" style="padding:10px 24px;font-size:11px;" data-i18n="test_cta_btn">
            Dejar reseña en Google
          </a>
        </div>
      </div>
    </div>
  </section>`
}

function genContacto(s) {
  const wa      = s?.whatsapp || WA_NUM
  const phone   = s?.phone || '+51 993 054 099'
  const email   = s?.email || 'waykitattoostudio@gmail.com'
  const address = s?.address || 'Calle Campo Redondo 100, Cercado'
  const city    = s?.city || 'Arequipa — Perú'
  const hours   = s?.hours || 'Lun – Sáb: 10:00 am – 8:00 pm'
  const mapsUrl = s?.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.3082!2d-71.5375!3d-16.4090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a5b3c0f6cff%3A0x0!2sCalle%20Campo%20Redondo%20100%2C%20Arequipa!5e0!3m2!1ses!2spe!4v1'
  const photo   = s?.studioPhoto ? imgUrl(s.studioPhoto, 900) : './studio.webp'
  const ig      = s?.instagram || 'https://www.instagram.com/waykitattoostudio/'
  const fb      = s?.facebook  || 'https://www.facebook.com/waykitattoostudio'
  const tt      = s?.tiktok    || 'https://www.tiktok.com/@waykitattoostudio1'
  const pt      = s?.pinterest || 'https://co.pinterest.com/waykitattoostudio/'

  return `  <!-- CONTACTO -->
  <section id="contacto" style="background:#0d0f0f;padding:96px 0;position:relative;overflow:hidden;">
    <div class="max-w-[1280px] mx-auto px-6 md:px-10">
      <div class="mb-16 reveal">
        <span class="section-label" data-i18n="contact_label">Hablemos</span>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,4vw,48px);letter-spacing:-0.02em;color:#e2e2e2;">
          <span class="slash">/</span><span data-i18n="contact_title">Reserva tu Cita</span>
        </h2>
        <div class="red-line mt-4"></div>
      </div>
      <div class="grid md:grid-cols-2 gap-16 md:gap-24">
        <div class="reveal-left">
          <p style="font-family:'Manrope',sans-serif;font-size:15px;color:#a0a0a0;line-height:1.7;margin-bottom:40px;" data-i18n="contact_intro">
            Cuéntanos tu idea y te ayudamos a transformarla en una obra de arte. También puedes escribirnos directamente por WhatsApp.
          </p>
          <form id="contact-form" onsubmit="handleSubmit(event)" novalidate style="display:flex;flex-direction:column;gap:32px;">
            <div>
              <label style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555;display:block;margin-bottom:8px;" data-i18n="form_name">Nombre completo</label>
              <input type="text" name="nombre" placeholder="Tu nombre..." class="form-field" required />
            </div>
            <div>
              <label style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555;display:block;margin-bottom:8px;" data-i18n="form_phone">WhatsApp / Teléfono</label>
              <input type="tel" name="tel" placeholder="+51 999 999 999" class="form-field" />
            </div>
            <div>
              <label style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555;display:block;margin-bottom:8px;" data-i18n="form_service">Tipo de servicio</label>
              <select name="servicio" class="form-field" style="cursor:pointer;">
                <option value="" style="background:#1a1c1c;" data-i18n="form_svc_ph">Selecciona un servicio...</option>
                <option value="tatuaje-realismo" style="background:#1a1c1c;">Tatuaje — Realismo (B&G o Color)</option>
                <option value="tatuaje-fineline" style="background:#1a1c1c;">Tatuaje — Fineline / Delicado</option>
                <option value="tatuaje-blackwork" style="background:#1a1c1c;">Tatuaje — Blackwork / Ornamental</option>
                <option value="tatuaje-tradicional" style="background:#1a1c1c;">Tatuaje — Tradicional / Neotradicional</option>
                <option value="tatuaje-color" style="background:#1a1c1c;">Tatuaje — Color / Ilustración</option>
                <option value="piercing" style="background:#1a1c1c;">Piercing</option>
                <option value="sivola" style="background:#1a1c1c;">SiVola Ink — Consulta de tintas</option>
                <option value="merch" style="background:#1a1c1c;">Merch — Productos Wayki</option>
                <option value="otro" style="background:#1a1c1c;">Otro / No sé aún</option>
              </select>
            </div>
            <div>
              <label style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555;display:block;margin-bottom:8px;" data-i18n="form_idea">Describe tu idea</label>
              <textarea name="idea" placeholder="¿Qué tienes en mente? Cuéntanos el diseño, tamaño, zona del cuerpo..." class="form-field" rows="4" style="resize:vertical;"></textarea>
            </div>
            <div class="flex flex-col gap-4">
              <button type="submit" class="btn-primary" style="width:100%;justify-content:center;" data-i18n="form_send">Enviar por WhatsApp</button>
              <a href="mailto:${email}" class="btn-ghost" style="width:100%;justify-content:center;">
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;flex-shrink:0;"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span data-i18n="form_email_btn">Email</span>
              </a>
            </div>
            <div id="form-success" style="display:none;font-family:'JetBrains Mono',monospace;font-size:13px;color:#be0000;padding:16px;border:1px solid #be0000;letter-spacing:0.05em;" data-i18n="form_success">
              ✓ Abriendo WhatsApp... Te contactamos pronto.
            </div>
          </form>
        </div>
        <div class="reveal-right flex flex-col gap-8">
          <div style="overflow:hidden;border:1px solid #2a2d2d;position:relative;">
            <img src="${photo}" alt="Wayki Tattoo Studio"
                 style="width:100%;height:260px;object-fit:cover;object-position:center;display:block;filter:grayscale(20%);transition:filter 0.5s,transform 0.5s;"
                 onmouseover="this.style.filter='grayscale(0)';this.style.transform='scale(1.03)';"
                 onmouseout="this.style.filter='grayscale(20%)';this.style.transform='scale(1)';" />
            <div style="position:absolute;bottom:0;left:0;right:0;padding:14px 18px;background:linear-gradient(to top,rgba(13,15,15,0.9),transparent);">
              <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#be0000;">Wayki Tattoo Studio</span><br/>
              <span style="font-family:'Manrope',sans-serif;font-size:12px;color:#a0a0a0;">${city} · Est. 2013</span>
            </div>
          </div>
          <div style="border:1px solid #2a2d2d;padding:28px;background:#1a1c1c;">
            <h4 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#e2e2e2;margin-bottom:20px;" data-i18n="contact_find">Encuéntranos</h4>
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-3">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#be0000;flex-shrink:0;margin-top:2px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;line-height:1.6;">${address}<br/>${city}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#be0000;flex-shrink:0;"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="https://wa.me/${wa}" target="_blank" style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#be0000'" onmouseout="this.style.color='#a0a0a0'">${phone}</a>
              </div>
              <div class="flex items-center gap-3">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#be0000;flex-shrink:0;"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a href="mailto:${email}" style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#be0000'" onmouseout="this.style.color='#a0a0a0'">${email}</a>
              </div>
              <div class="flex items-center gap-3">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#be0000;flex-shrink:0;"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                <span style="font-family:'Manrope',sans-serif;font-size:14px;color:#a0a0a0;" data-i18n="contact_hours">${hours}</span>
              </div>
            </div>
          </div>
          <div style="border:1px solid #2a2d2d;overflow:hidden;filter:grayscale(80%) contrast(1.1);height:200px;">
            <iframe src="${mapsUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación Wayki Tattoo Studio"></iframe>
          </div>
          <div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555;display:block;margin-bottom:14px;" data-i18n="contact_follow">Síguenos</span>
            <div class="grid grid-cols-2 gap-3">
              <a href="${ig}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid #2a2d2d;background:#1a1c1c;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#a0a0a0;text-decoration:none;text-transform:uppercase;transition:border-color 0.2s,color 0.2s,background 0.2s;" onmouseover="this.style.borderColor='#be0000';this.style.color='#e2e2e2';this.style.background='#230000';" onmouseout="this.style.borderColor='#2a2d2d';this.style.color='#a0a0a0';this.style.background='#1a1c1c';">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;flex-shrink:0;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
              <a href="${fb}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid #2a2d2d;background:#1a1c1c;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#a0a0a0;text-decoration:none;text-transform:uppercase;transition:border-color 0.2s,color 0.2s,background 0.2s;" onmouseover="this.style.borderColor='#be0000';this.style.color='#e2e2e2';this.style.background='#230000';" onmouseout="this.style.borderColor='#2a2d2d';this.style.color='#a0a0a0';this.style.background='#1a1c1c';">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;flex-shrink:0;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a href="${tt}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid #2a2d2d;background:#1a1c1c;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#a0a0a0;text-decoration:none;text-transform:uppercase;transition:border-color 0.2s,color 0.2s,background 0.2s;" onmouseover="this.style.borderColor='#be0000';this.style.color='#e2e2e2';this.style.background='#230000';" onmouseout="this.style.borderColor='#2a2d2d';this.style.color='#a0a0a0';this.style.background='#1a1c1c';">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;flex-shrink:0;"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/></svg>
                TikTok
              </a>
              <a href="${pt}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid #2a2d2d;background:#1a1c1c;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#a0a0a0;text-decoration:none;text-transform:uppercase;transition:border-color 0.2s,color 0.2s,background 0.2s;" onmouseover="this.style.borderColor='#be0000';this.style.color='#e2e2e2';this.style.background='#230000';" onmouseout="this.style.borderColor='#2a2d2d';this.style.color='#a0a0a0';this.style.background='#1a1c1c';">
                <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;flex-shrink:0;"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

// ─────────────────────────────────────────────────────────────────────────────
//  ENSAMBLADO DE PÁGINAS
// ─────────────────────────────────────────────────────────────────────────────

function buildPage({ out, body, title, desc, url, image }) {
  const head    = sec('00-head.html')
    .replace(/%%PAGE_TITLE%%/g,  title)
    .replace(/%%PAGE_DESC%%/g,   desc)
    .replace(/%%PAGE_URL%%/g,    `${BASE_URL}/${url}`)
    .replace(/%%PAGE_IMAGE%%/g,  image)
  const nav     = sec('01-navbar.html')
  const footer  = sec('08-footer.html')
  const scripts = sec('09-scripts.html')

  const html = [head, nav, body, footer, scripts].join('\n')
  fs.writeFileSync(path.join(ROOT, out), html, 'utf-8')
  console.log(`  ✓ ${out}`)
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔄  Wayki Build — Fetching from Sanity...\n')

  const [settings, hero, servicios, artistas, portfolio, merch, testimonios] = await Promise.all([
    client.fetch(`*[_type == "siteSettings"][0]`),
    client.fetch(`*[_type == "hero"][0]`),
    client.fetch(`*[_type == "servicio"] | order(orden asc)`),
    client.fetch(`*[_type == "artista"] | order(orden asc)`),
    client.fetch(`*[_type == "portafolioItem"] | order(_createdAt desc)`),
    client.fetch(`*[_type == "merchProducto"] | order(orden asc)`),
    client.fetch(`*[_type == "testimonio"] | order(orden asc)`),
  ])

  console.log(`  📦  Settings: ${settings ? '✓' : '⚠ vacío'}`)
  console.log(`  📦  Hero: ${hero ? '✓' : '⚠ vacío'}`)
  console.log(`  📦  Servicios: ${servicios.length}`)
  console.log(`  📦  Artistas: ${artistas.length}`)
  console.log(`  📦  Portafolio: ${portfolio.length}`)
  console.log(`  📦  Merch: ${merch.length}`)
  console.log(`  📦  Testimonios: ${testimonios.length}`)
  console.log('')

  const studioImg = settings?.studioPhoto
    ? imgUrl(settings.studioPhoto, 1200)
    : `${RAW_BASE}/studio.webp`

  const ogDefault = `${RAW_BASE}/studio.webp`

  console.log('📄  Generando páginas...\n')

  buildPage({
    out:   'index.html',
    body:  [genHero(hero, settings), genServicios(servicios)].join('\n'),
    title: 'Wayki Tattoo Studio | Arte en tu Piel — Arequipa, Perú',
    desc:  'Estudio de tatuajes profesional en Arequipa, Perú. Realismo, color, fineline y más con tintas SiVola. Más de 10 años de experiencia.',
    url:   'index.html',
    image: ogDefault,
  })

  buildPage({
    out:   'portafolio.html',
    body:  genPortafolio(portfolio),
    title: 'Portafolio | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Galería de tatuajes: realismo, blackwork, color, fineline y más. Cada obra diseñada a medida.',
    url:   'portafolio.html',
    image: portfolio[0]?.imagen ? imgUrl(portfolio[0].imagen, 1200) : ogDefault,
  })

  buildPage({
    out:   'artistas.html',
    body:  genArtistas(artistas, settings),
    title: 'Artistas | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Conoce a los artistas de Wayki Tattoo Studio. Especialistas en realismo, color, blackwork y fineline.',
    url:   'artistas.html',
    image: artistas[0]?.foto ? imgUrl(artistas[0].foto, 1200) : ogDefault,
  })

  buildPage({
    out:   'nosotros.html',
    body:  genNosotros(settings),
    title: 'Nosotros | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Más de 10 años transformando ideas en arte permanente. Somos el estudio de tatuajes de referencia en Arequipa.',
    url:   'nosotros.html',
    image: studioImg,
  })

  buildPage({
    out:   'resenas.html',
    body:  genTestimonios(testimonios, settings),
    title: 'Reseñas | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Más de 5.000 clientes satisfechos. Lee las reseñas de Wayki Tattoo Studio en Google.',
    url:   'resenas.html',
    image: ogDefault,
  })

  buildPage({
    out:   'merch.html',
    body:  genMerch(merch, settings),
    title: 'Merch & Supply | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Tintas SiVola, ropa y accesorios Wayki. Lleva la cultura del tatuaje más allá de la piel.',
    url:   'merch.html',
    image: merch[0]?.imagen ? imgUrl(merch[0].imagen, 1200) : ogDefault,
  })

  buildPage({
    out:   'contacto.html',
    body:  genContacto(settings),
    title: 'Contacto | Wayki Tattoo Studio — Arequipa, Perú',
    desc:  'Reserva tu cita en Wayki Tattoo Studio. Calle Campo Redondo 100, Cercado, Arequipa. Lun–Sáb 10am–8pm.',
    url:   'contacto.html',
    image: studioImg,
  })

  console.log('\n✅  Build completado!\n')
}

main().catch((err) => {
  console.error('\n❌  Error en el build:', err.message)
  process.exit(1)
})
