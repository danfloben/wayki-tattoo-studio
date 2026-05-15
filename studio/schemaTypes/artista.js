import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'artista',
  title: 'Artista',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre completo',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto del artista',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (etiqueta sobre la foto)',
      type: 'string',
      description: 'Ej: Artista Principal · Artista · Guest Artist',
      initialValue: 'Artista',
    }),
    defineField({
      name: 'especialidad',
      title: 'Especialidad',
      type: 'string',
      description: 'Ej: Realismo · Color · Blackwork',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía corta',
      type: 'text',
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram @usuario',
      type: 'string',
      description: 'Ej: @waykitattoostudio',
    }),
    defineField({
      name: 'whatsappMsg',
      title: 'Mensaje WhatsApp para reservar cita',
      type: 'string',
      description: 'Texto que se envía al hacer clic en Reservar. Ej: Hola! Quiero una cita con Angel.',
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
      subtitle: 'especialidad',
      media: 'foto',
    },
  },
})
