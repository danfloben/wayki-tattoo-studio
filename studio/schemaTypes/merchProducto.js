import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'merchProducto',
  title: 'Producto Merch',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del producto',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Categoría',
      type: 'string',
      description: 'Ej: Tintas · Ropa · Accesorios · Regalo',
      options: {
        list: ['Tintas', 'Ropa', 'Accesorios', 'Regalo', 'Otro'],
        layout: 'dropdown',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción corta',
      type: 'string',
      description: 'Ej: 6 colores esenciales · S / M / L / XL',
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'string',
      description: 'Ej: S/. 120 · desde S/. 150',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge sobre la imagen (opcional)',
      type: 'string',
      description: 'Ej: Pro · Nuevo · Oferta · Agotado',
    }),
    defineField({
      name: 'badgeHot',
      title: '¿Badge destacado en rojo?',
      type: 'boolean',
      description: 'Si está activado, el badge aparece en rojo.',
      initialValue: false,
    }),
    defineField({
      name: 'whatsappMsg',
      title: 'Mensaje de WhatsApp al hacer "Pedir ahora"',
      type: 'string',
      description: 'Texto que se envía. Ej: Hola! Me interesa el SiVola Ink Set Básico.',
      validation: (R) => R.required(),
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
      subtitle: 'precio',
      media: 'imagen',
    },
  },
})
