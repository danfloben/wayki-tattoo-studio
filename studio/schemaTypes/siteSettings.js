import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración General',
  type: 'document',
  // Solo puede haber un documento de este tipo
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'identidad',  title: '🏷️  Identidad' },
    { name: 'contacto',   title: '📞  Contacto' },
    { name: 'redes',      title: '📱  Redes sociales' },
    { name: 'nosotros',   title: '📖  Sección Nosotros' },
  ],
  fields: [
    // ── Identidad ─────────────────────────────────────────
    defineField({
      name: 'studioName',
      title: 'Nombre del estudio',
      type: 'string',
      group: 'identidad',
      initialValue: 'Wayki Tattoo Studio',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identidad',
      description: 'Ej: Arte en tu Piel — Arequipa, Perú',
      initialValue: 'Arte en tu Piel — Arequipa, Perú',
    }),
    defineField({
      name: 'established',
      title: 'Año de fundación',
      type: 'string',
      group: 'identidad',
      initialValue: 'Est. 2013',
    }),
    defineField({
      name: 'logo',
      title: 'Logo del estudio',
      type: 'image',
      group: 'identidad',
      options: { hotspot: true },
    }),
    defineField({
      name: 'studioPhoto',
      title: 'Foto del estudio (exterior/interior)',
      type: 'image',
      group: 'identidad',
      options: { hotspot: true },
    }),

    // ── Contacto ──────────────────────────────────────────
    defineField({
      name: 'whatsapp',
      title: 'Número WhatsApp (solo dígitos, con código de país)',
      type: 'string',
      group: 'contacto',
      description: 'Ej: 51993054099',
      initialValue: '51993054099',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono (texto para mostrar)',
      type: 'string',
      group: 'contacto',
      description: 'Ej: +51 993 054 099',
      initialValue: '+51 993 054 099',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contacto',
      initialValue: 'waykitattoostudio@gmail.com',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
      group: 'contacto',
      initialValue: 'Calle Campo Redondo 100, Cercado',
    }),
    defineField({
      name: 'city',
      title: 'Ciudad y país',
      type: 'string',
      group: 'contacto',
      initialValue: 'Arequipa — Perú',
    }),
    defineField({
      name: 'hours',
      title: 'Horario de atención',
      type: 'string',
      group: 'contacto',
      initialValue: 'Lun – Sáb: 10:00 am – 8:00 pm',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL del mapa de Google Maps (embed)',
      type: 'url',
      group: 'contacto',
      description: 'La URL que va dentro del iframe src="..."',
    }),
    defineField({
      name: 'googleReviewLink',
      title: 'Link para dejar reseña en Google',
      type: 'url',
      group: 'contacto',
      initialValue: 'https://g.page/r/waykitattoostudio/review',
    }),

    // ── Redes sociales ────────────────────────────────────
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'redes',
      initialValue: 'https://www.instagram.com/waykitattoostudio/',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram @usuario',
      type: 'string',
      group: 'redes',
      initialValue: '@waykitattoostudio',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'redes',
      initialValue: 'https://www.facebook.com/waykitattoostudio',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
      group: 'redes',
      initialValue: 'https://www.tiktok.com/@waykitattoostudio1',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest URL',
      type: 'url',
      group: 'redes',
      initialValue: 'https://co.pinterest.com/waykitattoostudio/',
    }),

    // ── Sección Nosotros ──────────────────────────────────
    defineField({
      name: 'aboutP1',
      title: 'Párrafo 1',
      type: 'text',
      rows: 3,
      group: 'nosotros',
      initialValue: 'Wayki Tattoo Studio no es solo un lugar para tatuarse — es un santuario para la expresión artística. Ubicados en el corazón de Arequipa, transformamos visiones en piezas maestras atemporales.',
    }),
    defineField({
      name: 'aboutP2',
      title: 'Párrafo 2',
      type: 'text',
      rows: 3,
      group: 'nosotros',
      initialValue: 'Combinamos técnicas tradicionales con una visión moderna y vanguardista, usando nuestras propias tintas SiVola para garantizar resultados de larga duración.',
    }),
    defineField({
      name: 'aboutQuote',
      title: 'Cita destacada',
      type: 'string',
      group: 'nosotros',
      initialValue: '"Tu piel es el lienzo, nuestra tinta es el alma."',
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Años de experiencia',
      type: 'string',
      group: 'nosotros',
      initialValue: '10+',
    }),
    defineField({
      name: 'clientCount',
      title: 'Número de clientes',
      type: 'string',
      group: 'nosotros',
      initialValue: '5k+',
    }),
    defineField({
      name: 'artistCount',
      title: 'Número de artistas',
      type: 'string',
      group: 'nosotros',
      initialValue: '2-3',
    }),
    defineField({
      name: 'certBadge',
      title: 'Badge de certificación',
      type: 'string',
      group: 'nosotros',
      initialValue: 'Arte Certificado',
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Configuración General del Sitio' }),
  },
})
