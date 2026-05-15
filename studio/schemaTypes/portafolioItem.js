import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portafolioItem',
  title: 'Portafolio',
  type: 'document',
  fields: [
    defineField({
      name: 'imagen',
      title: 'Imagen del tatuaje',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Descripción de la imagen (para SEO)',
      type: 'string',
      description: 'Ej: Tatuaje realismo brazo — Wayki Tattoo Studio',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'estilo',
      title: 'Estilo del tatuaje',
      type: 'string',
      options: {
        list: [
          'Realismo',
          'Color',
          'Blackwork',
          'Fineline',
          'Tradicional',
          'Ornamental',
          'Geométrico',
          'Acuarela',
          'Lettering',
          'Neotradicional',
          'Otro',
        ],
        layout: 'dropdown',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'artista',
      title: 'Artista',
      type: 'reference',
      to: [{ type: 'artista' }],
    }),
  ],

  preview: {
    select: {
      title: 'alt',
      subtitle: 'estilo',
      media: 'imagen',
    },
  },
})
