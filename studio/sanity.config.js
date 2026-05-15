import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'wayki-tattoo',
  title: 'Wayki Tattoo Studio — Admin',

  projectId: '6gep4uhw',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido del sitio')
          .items([
            // Singletons
            S.listItem()
              .title('⚙️  Configuración General')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('🏠  Hero / Portada')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.divider(),
            // Lists
            S.documentTypeListItem('servicio').title('🔧  Servicios'),
            S.documentTypeListItem('artista').title('🎨  Artistas'),
            S.documentTypeListItem('portafolioItem').title('📸  Portafolio'),
            S.documentTypeListItem('merchProducto').title('👕  Merch & Productos'),
            S.documentTypeListItem('testimonio').title('⭐  Reseñas'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
