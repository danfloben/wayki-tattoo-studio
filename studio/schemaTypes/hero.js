import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero / Portada',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'slides',
      title: 'Imágenes de fondo (slideshow)',
      type: 'array',
      description: 'Agrega entre 2 y 5 imágenes. Se mostrarán como slideshow automático.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (R) => R.min(1).max(6),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Texto pequeño sobre el título',
      type: 'string',
      description: 'Ej: Arequipa · Perú · Est. 2013',
      initialValue: 'Arequipa · Perú · Est. 2013',
    }),
    defineField({
      name: 'headline',
      title: 'Título principal (primera línea)',
      type: 'string',
      description: 'Ej: EL ARTE',
      initialValue: 'EL ARTE',
    }),
    defineField({
      name: 'headlineAccent',
      title: 'Título principal (segunda línea, en rojo)',
      type: 'string',
      description: 'Ej: EN TU PIEL',
      initialValue: 'EN TU PIEL',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
      initialValue: 'Transformamos tus ideas en obras maestras permanentes. Realismo, color, fineline y más — con los más altos estándares de arte e higiene.',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Texto botón principal',
      type: 'string',
      initialValue: 'Ver Portafolio',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Texto botón secundario',
      type: 'string',
      initialValue: 'Reservar Cita',
    }),
  ],

  preview: {
    select: { title: 'headline', subtitle: 'headlineAccent' },
    prepare: ({ title, subtitle }) => ({ title: `${title} ${subtitle}` }),
  },
})
