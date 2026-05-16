import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ── Sanity client ──────────────────────────────────────────────────────────────
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '6gep4uhw',
  dataset:   import.meta.env.SANITY_DATASET    || 'production',
  apiVersion: '2024-01-01',
  token:  import.meta.env.SANITY_TOKEN,
  useCdn: false, // false = siempre datos frescos en build
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// ── Helpers ────────────────────────────────────────────────────────────────────
async function query<T>(groq: string, fallback: T): Promise<T> {
  try {
    const result = await client.fetch<T>(groq);
    return result ?? fallback;
  } catch {
    // Red without internet or token → return fallback
    return fallback;
  }
}

// ── GROQ Queries ───────────────────────────────────────────────────────────────
export const getHero          = () => query(`*[_type == "hero"][0]`, null);
export const getServicios     = () => query(`*[_type == "servicio"] | order(orden asc)`, []);
export const getPortafolio    = () => query(`*[_type == "portafolioItem"] | order(fecha desc)`, []);
export const getArtistas      = () => query(`*[_type == "artista"] | order(orden asc)`, []);
export const getMerch         = () => query(`*[_type == "merchProducto"] | order(orden asc)`, []);
export const getTestimonios   = () => query(`*[_type == "testimonio"] | order(fecha desc)`, []);
export const getSiteSettings  = () => query(`*[_type == "siteSettings"][0]`, null);
