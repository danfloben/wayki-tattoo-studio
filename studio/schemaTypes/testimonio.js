import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonio',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del cliente',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha (texto descriptivo)',
      type: 'string',
      description: 'Ej: Hace 10 meses · Hace 4 años · Hace un año',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'texto',
      title: 'Texto de la reseña',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Puntuación (estrellas)',
      type: 'number',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ 5 estrellas', value: 5 },
          { title: '⭐⭐⭐⭐  4 estrellas', value: 4 },
          { title: '⭐⭐⭐   3 estrellas', value: 3 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'plataforma',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: [
          { title: 'Google Review', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
        ],
        layout: 'radio',
      },
      initialValue: 'google',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 1,
    }),
  ],

  orderings: [
    {
      title: 'Orden de aparición',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'nombre',
      subtitle: 'texto',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle?.slice(0, 60) + '...',
    }),
  },
})
