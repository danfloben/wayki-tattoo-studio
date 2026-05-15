import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicio',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del servicio',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Etiqueta (badge rojo)',
      type: 'string',
      description: 'Ej: Servicio principal · Disponible · Marca propia',
    }),
    defineField({
      name: 'icono',
      title: 'Ícono',
      type: 'string',
      options: {
        list: [
          { title: '✏️  Tatuaje (pluma)', value: 'tattoo' },
          { title: '⭕  Piercing (círculo)', value: 'piercing' },
          { title: '🫙  Tinta SiVola (botella)', value: 'ink' },
          { title: '🛍️  Merch (bolsa)', value: 'merch' },
        ],
        layout: 'radio',
      },
      initialValue: 'tattoo',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: '1 = primero, 4 = último',
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
    select: { title: 'nombre', subtitle: 'tag' },
  },
})
